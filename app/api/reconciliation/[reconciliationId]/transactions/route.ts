import type { NextRequest } from "next/server";
import {
  buildUpstreamAuthHeaders,
  createJsonErrorResponse,
  forwardUpstreamJson,
  getReconciliationUpstreamBaseUrl,
  isValidReconciliationId,
} from "@/lib/reconciliation/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ reconciliationId: string }> }
) {
  const { reconciliationId } = await context.params;
  if (!isValidReconciliationId(reconciliationId)) {
    return createJsonErrorResponse("Invalid reconciliation ID.", 404);
  }

  const upstreamQuery = new URLSearchParams();
  const status = request.nextUrl.searchParams.get("status");
  const page = request.nextUrl.searchParams.get("page");
  const pageSize = request.nextUrl.searchParams.get("page_size");

  if (status) upstreamQuery.set("status", status);
  if (page) upstreamQuery.set("page", page);
  if (pageSize) upstreamQuery.set("page_size", pageSize);

  const queryString = upstreamQuery.toString();
  const suffix = queryString ? `?${queryString}` : "";

  try {
    const baseUrl = getReconciliationUpstreamBaseUrl();
    const upstream = await fetch(
      `${baseUrl}/${encodeURIComponent(reconciliationId)}/transactions${suffix}`,
      {
        method: "GET",
        headers: buildUpstreamAuthHeaders(request.headers),
        redirect: "error",
        cache: "no-store",
      }
    );
    return await forwardUpstreamJson(upstream);
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Unable to reach reconciliation API.";
    return createJsonErrorResponse(message, 502);
  }
}
