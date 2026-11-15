import "server-only";

import { NextResponse } from "next/server";

const RECONCILIATION_ID_PATTERN = /^[a-zA-Z0-9_-]{3,128}$/;

export function getReconciliationUpstreamBaseUrl(): string {
  const rawBase = process.env.OCR_API_BASE_URL?.trim();
  if (!rawBase) {
    throw new Error(
      "OCR_API_BASE_URL is not configured on the server environment."
    );
  }
  const normalized = rawBase.replace(/\/+$/, "");
  return normalized.endsWith("/reconciliation")
    ? normalized
    : `${normalized}/reconciliation`;
}

export function isValidReconciliationId(id: string): boolean {
  return RECONCILIATION_ID_PATTERN.test(id);
}

export function buildUpstreamAuthHeaders(incomingHeaders: Headers): HeadersInit {
  const apiKey = process.env.OCR_API_KEY?.trim();
  if (apiKey) {
    return {
      "X-API-Key": apiKey,
    };
  }

  const guestToken = incomingHeaders.get("x-reconciliation-token")?.trim();
  if (guestToken) {
    return {
      "X-Reconciliation-Token": guestToken,
    };
  }

  return {};
}

export function createJsonErrorResponse(
  error: string,
  status: number,
  extraHeaders?: HeadersInit
): NextResponse {
  const headers = new Headers(extraHeaders);
  headers.set("Cache-Control", "no-store");
  return NextResponse.json(
    {
      status: "error",
      error,
      status_code: status,
    },
    { status, headers }
  );
}

export async function forwardUpstreamJson(
  upstream: Response
): Promise<NextResponse> {
  const headers = new Headers();
  headers.set("Cache-Control", "no-store");

  const retryAfter = upstream.headers.get("retry-after");
  if (retryAfter) {
    headers.set("Retry-After", retryAfter);
  }

  const contentType = upstream.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    try {
      const data = await upstream.json();
      return NextResponse.json(data, { status: upstream.status, headers });
    } catch {
      return createJsonErrorResponse(
        "Invalid JSON response received from reconciliation service.",
        502,
        headers
      );
    }
  }

  const text = await upstream.text();
  return createJsonErrorResponse(
    text || `Upstream error (${upstream.status})`,
    upstream.status,
    headers
  );
}
