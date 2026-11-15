import assert from "node:assert/strict";
import http from "node:http";
import type { AddressInfo } from "node:net";
import { after, before, describe, it } from "node:test";
import { NextRequest } from "next/server";
import {
  buildSafeAttachmentDisposition,
  forwardUpstreamJson,
  getReconciliationUpstreamBaseUrl,
  mapUpstreamProxyError,
} from "@/lib/reconciliation/server";
import { POST as uploadHandler } from "@/app/api/reconciliation/upload/route";
import { GET as statusHandler } from "@/app/api/reconciliation/[reconciliationId]/route";
import { GET as transactionsHandler } from "@/app/api/reconciliation/[reconciliationId]/transactions/route";
import { GET as exportHandler } from "@/app/api/reconciliation/[reconciliationId]/export/route";

describe("server proxy utilities & API route handlers", () => {
  let server: http.Server;
  let baseUrl = "";
  const prevBaseUrl = process.env.OCR_API_BASE_URL;
  const prevApiKey = process.env.OCR_API_KEY;
  let lastSeenApiKey: string | string[] | undefined;
  let lastSeenPath = "";

  before(async () => {
    server = http.createServer((req, res) => {
      lastSeenApiKey = req.headers["x-api-key"];
      lastSeenPath = req.url ?? "";

      if (req.url === "/reconciliation/upload" && req.method === "POST") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            reconciliation_id: "rec_test_upload_001",
            status: "queued",
            phase: "Uploaded",
            progress: 5,
            message: "Queued for processing",
          })
        );
        return;
      }

      if (req.url === "/reconciliation/rec_html_err") {
        res.writeHead(502, { "Content-Type": "text/html" });
        res.end("<html><body><h1>502 Bad Gateway Internal Stack</h1></body></html>");
        return;
      }

      if (req.url === "/reconciliation/rec_test_001") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            reconciliation_id: "rec_test_001",
            status: "completed",
            phase: "Completed",
            progress: 100,
            message: "Done",
          })
        );
        return;
      }

      if (req.url?.startsWith("/reconciliation/rec_test_001/transactions")) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            category: "matched",
            total: 1,
            page: 1,
            page_size: 25,
            items: [],
          })
        );
        return;
      }

      if (req.url?.startsWith("/reconciliation/rec_test_001/export")) {
        res.writeHead(200, {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": 'attachment; filename="../../evil\\path.csv"',
        });
        res.end("id,amount\n1,100.00\n");
        return;
      }

      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ detail: "Not found" }));
    });

    await new Promise<void>((resolve) => {
      server.listen(0, "127.0.0.1", () => {
        const addr = server.address() as AddressInfo;
        baseUrl = `http://127.0.0.1:${addr.port}`;
        resolve();
      });
    });

    process.env.OCR_API_BASE_URL = baseUrl;
    process.env.OCR_API_KEY = "unit-test-secret-key";
  });

  after(async () => {
    if (prevBaseUrl === undefined) delete process.env.OCR_API_BASE_URL;
    else process.env.OCR_API_BASE_URL = prevBaseUrl;

    if (prevApiKey === undefined) delete process.env.OCR_API_KEY;
    else process.env.OCR_API_KEY = prevApiKey;

    await new Promise<void>((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    });
  });

  it("sanitizes missing upstream configuration without leaking env var names", async () => {
    const saved = process.env.OCR_API_BASE_URL;
    delete process.env.OCR_API_BASE_URL;

    try {
      assert.throws(() => getReconciliationUpstreamBaseUrl(), /UPSTREAM_NOT_CONFIGURED/);
      const res = mapUpstreamProxyError(new Error("UPSTREAM_NOT_CONFIGURED"));
      assert.equal(res.status, 503);
      const body = await res.json();
      assert.equal(body.status, "error");
      assert.equal(body.error, "Reconciliation service is temporarily unavailable.");
      assert.equal(JSON.stringify(body).includes("OCR_API_BASE_URL"), false);
    } finally {
      process.env.OCR_API_BASE_URL = saved;
    }
  });

  it("maps timeout errors to 504 and sanitizes HTML error bodies", async () => {
    const timeoutRes = mapUpstreamProxyError(new DOMException("Timed out", "TimeoutError"));
    assert.equal(timeoutRes.status, 504);

    const htmlUpstream = new Response("<!doctype html><html><body>Trace</body></html>", {
      status: 500,
      headers: { "Content-Type": "text/html" },
    });
    const sanitized = await forwardUpstreamJson(htmlUpstream);
    assert.equal(sanitized.status, 500);
    const body = await sanitized.json();
    assert.equal(body.status, "error");
    assert.equal(
      body.error,
      "Reconciliation service returned an unexpected response (500)."
    );
  });

  it("builds safe attachment Content-Disposition header", () => {
    assert.equal(
      buildSafeAttachmentDisposition(
        'attachment; filename="../../etc/passwd"; extra=1',
        "fallback.xlsx"
      ),
      'attachment; filename="passwd"'
    );
    assert.equal(
      buildSafeAttachmentDisposition(null, "rec_abc.csv"),
      'attachment; filename="rec_abc.csv"'
    );
  });

  it("validates upload POST requests strictly before proxying", async () => {
    const missingFilesForm = new FormData();
    const missingRes = await uploadHandler(
      new NextRequest("http://localhost:3000/api/reconciliation/upload", {
        method: "POST",
        body: missingFilesForm,
      })
    );
    assert.equal(missingRes.status, 422);

    const badExtForm = new FormData();
    badExtForm.append(
      "bank_statement",
      new File(["data"], "bank.xls", { type: "application/vnd.ms-excel" })
    );
    badExtForm.append(
      "business_ledger",
      new File(["date,amount\n2026-01-01,10"], "ledger.csv", { type: "text/csv" })
    );
    const badExtRes = await uploadHandler(
      new NextRequest("http://localhost:3000/api/reconciliation/upload", {
        method: "POST",
        body: badExtForm,
      })
    );
    assert.equal(badExtRes.status, 422);

    const badToleranceForm = new FormData();
    badToleranceForm.append(
      "bank_statement",
      new File(["date,amount\n2026-01-01,10"], "bank.csv", { type: "text/csv" })
    );
    badToleranceForm.append(
      "business_ledger",
      new File(["date,amount\n2026-01-01,10"], "ledger.csv", { type: "text/csv" })
    );
    badToleranceForm.append("date_tolerance_days", "99");
    const badTolRes = await uploadHandler(
      new NextRequest("http://localhost:3000/api/reconciliation/upload", {
        method: "POST",
        body: badToleranceForm,
      })
    );
    assert.equal(badTolRes.status, 422);

    const badWebhookForm = new FormData();
    badWebhookForm.append(
      "bank_statement",
      new File(["date,amount\n2026-01-01,10"], "bank.csv", { type: "text/csv" })
    );
    badWebhookForm.append(
      "business_ledger",
      new File(["date,amount\n2026-01-01,10"], "ledger.csv", { type: "text/csv" })
    );
    badWebhookForm.append("webhook_url", "http://insecure.example.com/hook");
    const badWebhookRes = await uploadHandler(
      new NextRequest("http://localhost:3000/api/reconciliation/upload", {
        method: "POST",
        body: badWebhookForm,
      })
    );
    assert.equal(badWebhookRes.status, 422);

    const okForm = new FormData();
    okForm.append(
      "bank_statement",
      new File(["date,amount\n2026-01-01,10"], "bank.csv", { type: "text/csv" })
    );
    okForm.append(
      "business_ledger",
      new File(["date,amount\n2026-01-01,10"], "ledger.csv", { type: "text/csv" })
    );
    okForm.append("date_tolerance_days", "2");
    okForm.append("description_matching", "true");
    const okRes = await uploadHandler(
      new NextRequest("http://localhost:3000/api/reconciliation/upload", {
        method: "POST",
        body: okForm,
      })
    );
    assert.equal(okRes.status, 200);
    assert.equal(okRes.headers.get("cache-control"), "no-store");
    assert.equal(lastSeenApiKey, "unit-test-secret-key");
    const okData = await okRes.json();
    assert.equal(okData.reconciliation_id, "rec_test_upload_001");
  });

  it("handles reconciliation status GET, malformed IDs, and HTML upstream responses", async () => {
    const badIdRes = await statusHandler(
      new NextRequest("http://localhost:3000/api/reconciliation/bad!id"),
      { params: Promise.resolve({ reconciliationId: "bad!id" }) }
    );
    assert.equal(badIdRes.status, 404);

    const htmlErrRes = await statusHandler(
      new NextRequest("http://localhost:3000/api/reconciliation/rec_html_err"),
      { params: Promise.resolve({ reconciliationId: "rec_html_err" }) }
    );
    assert.equal(htmlErrRes.status, 502);
    const htmlJson = await htmlErrRes.json();
    assert.equal(htmlJson.status, "error");
    assert.equal(htmlJson.error.includes("<html>"), false);

    const okRes = await statusHandler(
      new NextRequest("http://localhost:3000/api/reconciliation/rec_test_001"),
      { params: Promise.resolve({ reconciliationId: "rec_test_001" }) }
    );
    assert.equal(okRes.status, 200);
    assert.equal(okRes.headers.get("cache-control"), "no-store");
  });

  it("validates transactions GET filters, page bounds, and export downloads", async () => {
    const badCat = await transactionsHandler(
      new NextRequest(
        "http://localhost:3000/api/reconciliation/rec_test_001/transactions?status=invalid"
      ),
      { params: Promise.resolve({ reconciliationId: "rec_test_001" }) }
    );
    assert.equal(badCat.status, 422);

    const badPageSize = await transactionsHandler(
      new NextRequest(
        "http://localhost:3000/api/reconciliation/rec_test_001/transactions?page_size=501"
      ),
      { params: Promise.resolve({ reconciliationId: "rec_test_001" }) }
    );
    assert.equal(badPageSize.status, 422);

    const validTx = await transactionsHandler(
      new NextRequest(
        "http://localhost:3000/api/reconciliation/rec_test_001/transactions?status=matched&page=2&page_size=25"
      ),
      { params: Promise.resolve({ reconciliationId: "rec_test_001" }) }
    );
    assert.equal(validTx.status, 200);
    assert.equal(
      lastSeenPath,
      "/reconciliation/rec_test_001/transactions?status=matched&page=2&page_size=25"
    );

    const badFmt = await exportHandler(
      new NextRequest(
        "http://localhost:3000/api/reconciliation/rec_test_001/export?format=pdf"
      ),
      { params: Promise.resolve({ reconciliationId: "rec_test_001" }) }
    );
    assert.equal(badFmt.status, 422);

    const okCsv = await exportHandler(
      new NextRequest(
        "http://localhost:3000/api/reconciliation/rec_test_001/export?format=csv"
      ),
      { params: Promise.resolve({ reconciliationId: "rec_test_001" }) }
    );
    assert.equal(okCsv.status, 200);
    assert.equal(okCsv.headers.get("cache-control"), "no-store");
    assert.equal(okCsv.headers.get("x-content-type-options"), "nosniff");
    assert.equal(
      okCsv.headers.get("content-disposition"),
      'attachment; filename="path.csv"'
    );
  });
});
