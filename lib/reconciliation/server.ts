import "server-only";

import { NextResponse } from "next/server";
import {
  isValidReconciliationId,
  sanitizeDownloadFilename,
} from "./validation";

export { isValidReconciliationId };

export function getReconciliationUpstreamBaseUrl(): string {
  const rawBase = process.env.OCR_API_BASE_URL?.trim();
  if (!rawBase) {
    throw new Error("UPSTREAM_NOT_CONFIGURED");
  }
  let parsed: URL;
  try {
    parsed = new URL(rawBase);
  } catch {
    throw new Error("UPSTREAM_INVALID_URL");
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error("UPSTREAM_INVALID_PROTOCOL");
  }
  const normalized = rawBase.replace(/\/+$/, "");
  return normalized.endsWith("/reconciliation")
    ? normalized
    : `${normalized}/reconciliation`;
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
  headers.set("X-Content-Type-Options", "nosniff");
  return NextResponse.json(
    {
      status: "error",
      error,
      status_code: status,
    },
    { status, headers }
  );
}

export async function fetchUpstream(
  pathSuffix: string,
  incomingHeaders: Headers,
  options: {
    method: "GET" | "POST";
    body?: BodyInit;
    signal?: AbortSignal;
    timeoutMs?: number;
  }
): Promise<Response> {
  const baseUrl = getReconciliationUpstreamBaseUrl();
  const timeoutSignal = AbortSignal.timeout(options.timeoutMs ?? 20_000);
  const combinedSignal = options.signal
    ? AbortSignal.any([options.signal, timeoutSignal])
    : timeoutSignal;

  return fetch(`${baseUrl}${pathSuffix}`, {
    method: options.method,
    headers: buildUpstreamAuthHeaders(incomingHeaders),
    body: options.body,
    redirect: "error",
    cache: "no-store",
    signal: combinedSignal,
  });
}

export function mapUpstreamProxyError(
  err: unknown,
  fallbackMessage = "Unable to reach reconciliation service."
): NextResponse {
  if (err instanceof DOMException && err.name === "TimeoutError") {
    return createJsonErrorResponse(
      "Reconciliation service request timed out. Please try again.",
      504
    );
  }
  if (err instanceof Error) {
    if (
      err.message === "UPSTREAM_NOT_CONFIGURED" ||
      err.message === "UPSTREAM_INVALID_URL" ||
      err.message === "UPSTREAM_INVALID_PROTOCOL"
    ) {
      return createJsonErrorResponse(
        "Reconciliation service is temporarily unavailable.",
        503
      );
    }
    if (err.name === "AbortError") {
      return createJsonErrorResponse("Request was cancelled.", 499);
    }
  }
  return createJsonErrorResponse(fallbackMessage, 502);
}

export function buildSafeAttachmentDisposition(
  rawHeader: string | null,
  fallbackFilename: string
): string {
  const quoted = rawHeader ? /filename="([^"]+)"/i.exec(rawHeader)?.[1] : null;
  const plain =
    !quoted && rawHeader ? /filename=([^;]+)/i.exec(rawHeader)?.[1] : null;
  const safeName = sanitizeDownloadFilename(
    quoted ?? plain ?? null,
    fallbackFilename
  );
  return `attachment; filename="${safeName}"`;
}

export async function forwardUpstreamJson(
  upstream: Response
): Promise<NextResponse> {
  const headers = new Headers();
  headers.set("Cache-Control", "no-store");
  headers.set("X-Content-Type-Options", "nosniff");

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

  const rawText = await upstream.text();
  const trimmed = rawText.trim();
  const isHtmlOrOversized =
    trimmed.length > 500 || /<(?:!doctype|html|head|body)\b/i.test(trimmed);
  const safeMessage = isHtmlOrOversized
    ? `Reconciliation service returned an unexpected response (${upstream.status}).`
    : trimmed || `Upstream error (${upstream.status}).`;

  return createJsonErrorResponse(safeMessage, upstream.status, headers);
}
