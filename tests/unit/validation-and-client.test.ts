import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  RECONCILIATION_MAX_FILE_SIZE_BYTES,
  type ReconciliationStatusResponse,
} from "@/lib/reconciliation/types";
import {
  isValidEmail,
  isValidHttpsUrl,
  isValidReconciliationId,
  isValidTransactionCategory,
  sanitizeDownloadFilename,
  validateReconciliationFileMetadata,
} from "@/lib/reconciliation/validation";
import {
  createReconciliationClient,
  detectPdfPasswordIssue,
  ReconciliationApiError,
} from "@/lib/reconciliation/client";

describe("reconciliation validation helpers", () => {
  it("validates reconciliation IDs strictly", () => {
    assert.equal(isValidReconciliationId("rec_4f1c2a9be03d7781"), true);
    assert.equal(isValidReconciliationId("abc-123_XYZ"), true);
    assert.equal(isValidReconciliationId("  rec_ok  "), true);

    assert.equal(isValidReconciliationId(""), false);
    assert.equal(isValidReconciliationId("ab"), false);
    assert.equal(isValidReconciliationId("a".repeat(129)), false);
    assert.equal(isValidReconciliationId("rec!bad"), false);
    assert.equal(isValidReconciliationId("../secret"), false);
    assert.equal(isValidReconciliationId("rec/sub"), false);
  });

  it("validates allowed transaction categories", () => {
    for (const cat of [
      "matched",
      "unmatched_bank",
      "unmatched_ledger",
      "possible_duplicates",
      "amount_mismatches",
    ]) {
      assert.equal(isValidTransactionCategory(cat), true);
    }
    assert.equal(isValidTransactionCategory("all"), false);
    assert.equal(isValidTransactionCategory("other"), false);
  });

  it("validates HTTPS webhook URLs and emails", () => {
    assert.equal(isValidHttpsUrl("https://example.com/hooks/rec"), true);
    assert.equal(isValidHttpsUrl("http://example.com/hooks/rec"), false);
    assert.equal(isValidHttpsUrl("javascript:alert(1)"), false);
    assert.equal(isValidHttpsUrl("not a url"), false);

    assert.equal(isValidEmail("finance@company.com"), true);
    assert.equal(isValidEmail("bad-email"), false);
    assert.equal(isValidEmail("user@tld"), false);
  });

  it("validates file metadata size and extensions", () => {
    assert.equal(
      validateReconciliationFileMetadata({ name: "stmt.pdf", size: 1024 }),
      null
    );
    assert.equal(
      validateReconciliationFileMetadata({ name: "ledger.CSV", size: 512 }),
      null
    );
    assert.equal(
      validateReconciliationFileMetadata({ name: "scan.tiff", size: 2048 }),
      null
    );

    assert.match(
      validateReconciliationFileMetadata({ name: "empty.csv", size: 0 }) ?? "",
      /empty/i
    );
    assert.match(
      validateReconciliationFileMetadata({
        name: "huge.pdf",
        size: RECONCILIATION_MAX_FILE_SIZE_BYTES + 1,
      }) ?? "",
      /100 MB/i
    );
    assert.match(
      validateReconciliationFileMetadata({ name: "legacy.xls", size: 1024 }) ??
        "",
      /Legacy \.xls/i
    );
    assert.match(
      validateReconciliationFileMetadata({ name: "noext", size: 1024 }) ?? "",
      /valid file extension/i
    );
    assert.match(
      validateReconciliationFileMetadata({ name: "trailing.", size: 1024 }) ??
        "",
      /valid file extension/i
    );
    assert.match(
      validateReconciliationFileMetadata({ name: "script.exe", size: 1024 }) ??
        "",
      /not a supported/i
    );
  });

  it("sanitizes unsafe download filenames", () => {
    assert.equal(
      sanitizeDownloadFilename('../../etc/passwd";\r\n.xlsx', "fallback.xlsx"),
      "passwd.xlsx"
    );
    assert.equal(
      sanitizeDownloadFilename("...hidden.csv", "fallback.csv"),
      "hidden.csv"
    );
    assert.equal(
      sanitizeDownloadFilename(null, "rec_123.xlsx"),
      "rec_123.xlsx"
    );
    assert.equal(
      sanitizeDownloadFilename("a".repeat(200) + ".csv", "fallback.csv"),
      "fallback.csv"
    );
  });
});

describe("client password detection & polling behavior", () => {
  it("detects encrypted PDF password prompt target from API message", () => {
    assert.deepEqual(
      detectPdfPasswordIssue("Bank statement: Incorrect PDF password supplied."),
      {
        target: "bank_statement",
        reason: "incorrect",
        message: "Bank statement: Incorrect PDF password supplied.",
      }
    );
    assert.deepEqual(
      detectPdfPasswordIssue(
        "Business ledger: This PDF file is password-protected."
      ),
      {
        target: "business_ledger",
        reason: "missing",
        message: "Business ledger: This PDF file is password-protected.",
      }
    );
    assert.equal(
      detectPdfPasswordIssue("Generic validation error"),
      null
    );
  });

  it("recovers from up to 2 transient network errors during polling", async () => {
    const originalFetch = globalThis.fetch;
    let attempt = 0;

    const completedSnapshot: ReconciliationStatusResponse = {
      success: true,
      reconciliation_id: "rec_retry_ok_01",
      status: "completed",
      progress: 100,
      message: "Done",
      error: null,
      created_at: "2026-11-15T12:00:00Z",
      completed_at: "2026-11-15T12:00:05Z",
      result: {
        summary: {
          currency: "USD",
          amount_decimal_places: 2,
          matched: 4,
          unmatched_bank: 0,
          unmatched_ledger: 0,
          possible_duplicates: 0,
          amount_mismatches: 0,
          bank_transactions: 4,
          ledger_transactions: 4,
          amount_corrections: 0,
          date_tolerance_days: 2,
          description_matching: true,
          ledger_direction_convention: "bank",
        },
        balance_check: {
          bank_opening_balance: "10000.00",
          bank_closing_balance: "10400.00",
          calculated_closing_balance: "10400.00",
          difference: "0.00",
          status: "passed",
          opening_balance_source: "explicit",
          closing_balance_source: "explicit",
        },
        matched_transactions: [],
        unmatched_bank_transactions: [],
        unmatched_ledger_transactions: [],
        possible_duplicates: [],
        amount_mismatches: [],
        amount_corrections: [],
        warnings: [],
      },
    };

    globalThis.fetch = (async () => {
      attempt += 1;
      if (attempt <= 2) {
        throw new TypeError("Failed to fetch");
      }
      return new Response(JSON.stringify(completedSnapshot), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }) as typeof fetch;

    try {
      const client = createReconciliationClient();
      const result = await client.pollReconciliation("rec_retry_ok_01", {
        intervalMs: 1,
      });
      assert.equal(attempt, 3);
      assert.equal(result.reconciliation_id, "rec_retry_ok_01");
      assert.equal(result.status, "completed");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("throws ReconciliationApiError cleanly when status becomes failed", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = (async () =>
      new Response(
        JSON.stringify({
          reconciliation_id: "rec_failed_01",
          status: "failed",
          phase: "Extraction",
          progress: 25,
          message: "Corrupt PDF header",
          error: "Unable to read statement pages.",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      )) as typeof fetch;

    try {
      const client = createReconciliationClient();
      await assert.rejects(
        () =>
          client.pollReconciliation("rec_failed_01", {
            intervalMs: 1,
          }),
        (err: unknown) =>
          err instanceof ReconciliationApiError &&
          err.message === "Unable to read statement pages."
      );
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
