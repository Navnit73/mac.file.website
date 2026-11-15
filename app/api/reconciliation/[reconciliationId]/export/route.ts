import { NextResponse, type NextRequest } from "next/server";
import {
  buildSafeAttachmentDisposition,
  createJsonErrorResponse,
  fetchUpstream,
  forwardUpstreamJson,
  isValidReconciliationId,
  mapUpstreamProxyError,
} from "@/lib/reconciliation/server";

const ALLOWED_FORMATS = new Set(["xlsx", "csv"]);

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ reconciliationId: string }> }
) {
  const { reconciliationId } = await context.params;
  if (!isValidReconciliationId(reconciliationId)) {
    return createJsonErrorResponse("Invalid reconciliation ID.", 404);
  }

  const format = (
    request.nextUrl.searchParams.get("format") ?? "xlsx"
  ).toLowerCase();

  if (!ALLOWED_FORMATS.has(format)) {
    return createJsonErrorResponse(
      "Invalid export format. Expected 'xlsx' or 'csv'.",
      422
    );
  }

  try {
    const upstream = await fetchUpstream(
      `/${encodeURIComponent(reconciliationId)}/export?format=${format}`,
      request.headers,
      {
        method: "GET",
        signal: request.signal,
        timeoutMs: 45_000,
      }
    );

    if (!upstream.ok) {
      return await forwardUpstreamJson(upstream);
    }

    if (!upstream.body) {
      return createJsonErrorResponse(
        "Reconciliation export stream was empty.",
        502
      );
    }

    const headers = new Headers();
    headers.set("Cache-Control", "no-store");
    headers.set("X-Content-Type-Options", "nosniff");

    const contentType =
      upstream.headers.get("content-type") ??
      (format === "csv"
        ? "text/csv; charset=utf-8"
        : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    headers.set("Content-Type", contentType);
    headers.set(
      "Content-Disposition",
      buildSafeAttachmentDisposition(
        upstream.headers.get("content-disposition"),
        `${reconciliationId}.${format}`
      )
    );

    return new NextResponse(upstream.body, {
      status: upstream.status,
      headers,
    });
  } catch (err) {
    return mapUpstreamProxyError(
      err,
      "Unable to export reconciliation report."
    );
  }
}
