import type { NextRequest } from "next/server";
import {
  createJsonErrorResponse,
  fetchUpstream,
  forwardUpstreamJson,
  isValidReconciliationId,
  mapUpstreamProxyError,
} from "@/lib/reconciliation/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ reconciliationId: string }> }
) {
  const { reconciliationId } = await context.params;
  if (!isValidReconciliationId(reconciliationId)) {
    return createJsonErrorResponse("Invalid reconciliation ID.", 404);
  }

  try {
    const upstream = await fetchUpstream(
      `/${encodeURIComponent(reconciliationId)}`,
      request.headers,
      {
        method: "GET",
        signal: request.signal,
        timeoutMs: 15_000,
      }
    );
    return await forwardUpstreamJson(upstream);
  } catch (err) {
    return mapUpstreamProxyError(err, "Unable to reach reconciliation API.");
  }
}
