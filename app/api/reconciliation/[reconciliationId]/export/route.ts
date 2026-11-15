import { NextResponse, type NextRequest } from "next/server";
import {
  buildUpstreamAuthHeaders,
  createJsonErrorResponse,
  forwardUpstreamJson,
  getReconciliationUpstreamBaseUrl,
  isValidReconciliationId,
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
    const baseUrl = getReconciliationUpstreamBaseUrl();
    const upstream = await fetch(
      `${baseUrl}/${encodeURIComponent(reconciliationId)}/export?format=${format}`,
      {
        method: "GET",
        headers: buildUpstreamAuthHeaders(request.headers),
        redirect: "error",
        cache: "no-store",
      }
    );

    if (!upstream.ok) {
      return await forwardUpstreamJson(upstream);
    }

    const headers = new Headers();
    headers.set("Cache-Control", "no-store");

    const contentType =
      upstream.headers.get("content-type") ??
      (format === "csv"
        ? "text/csv; charset=utf-8"
        : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    headers.set("Content-Type", contentType);

    const contentDisposition =
      upstream.headers.get("content-disposition") ??
      `attachment; filename="${reconciliationId}.${format}"`;
    headers.set("Content-Disposition", contentDisposition);

    return new NextResponse(upstream.body, {
      status: upstream.status,
      headers,
    });
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Unable to export reconciliation report.";
    return createJsonErrorResponse(message, 502);
  }
}
