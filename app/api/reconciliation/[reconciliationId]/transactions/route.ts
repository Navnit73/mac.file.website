import type { NextRequest } from "next/server";
import {
  createJsonErrorResponse,
  fetchUpstream,
  forwardUpstreamJson,
  isValidReconciliationId,
  mapUpstreamProxyError,
} from "@/lib/reconciliation/server";
import { isValidTransactionCategory } from "@/lib/reconciliation/validation";

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
  const pageRaw = request.nextUrl.searchParams.get("page");
  const pageSizeRaw = request.nextUrl.searchParams.get("page_size");

  if (status !== null && status.length > 0) {
    if (!isValidTransactionCategory(status)) {
      return createJsonErrorResponse(
        "Invalid transaction category filter.",
        422
      );
    }
    upstreamQuery.set("status", status);
  }

  if (pageRaw !== null && pageRaw.length > 0) {
    const parsedPage = Number(pageRaw);
    if (!Number.isInteger(parsedPage) || parsedPage < 1 || parsedPage > 100_000) {
      return createJsonErrorResponse(
        "page must be an integer between 1 and 100000.",
        422
      );
    }
    upstreamQuery.set("page", String(parsedPage));
  }

  if (pageSizeRaw !== null && pageSizeRaw.length > 0) {
    const parsedPageSize = Number(pageSizeRaw);
    if (
      !Number.isInteger(parsedPageSize) ||
      parsedPageSize < 1 ||
      parsedPageSize > 500
    ) {
      return createJsonErrorResponse(
        "page_size must be an integer between 1 and 500.",
        422
      );
    }
    upstreamQuery.set("page_size", String(parsedPageSize));
  }

  const queryString = upstreamQuery.toString();
  const suffix = queryString ? `?${queryString}` : "";

  try {
    const upstream = await fetchUpstream(
      `/${encodeURIComponent(reconciliationId)}/transactions${suffix}`,
      request.headers,
      {
        method: "GET",
        signal: request.signal,
        timeoutMs: 20_000,
      }
    );
    return await forwardUpstreamJson(upstream);
  } catch (err) {
    return mapUpstreamProxyError(err, "Unable to reach reconciliation API.");
  }
}
