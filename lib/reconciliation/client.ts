import {
  RECONCILIATION_MAX_FILE_SIZE_MB,
  type ApiErrorEnvelope,
  type ExportFormat,
  type PdfPasswordPrompt,
  type ReconciliationStatusResponse,
  type TransactionsPageResponse,
  type TransactionsQueryParams,
  type UploadReconciliationParams,
  type UploadReconciliationResponse,
} from "./types";
import {
  isValidReconciliationId,
  sanitizeDownloadFilename,
  validateReconciliationFileMetadata,
} from "./validation";

const TOKEN_STORAGE_PREFIX = "rec-token:";

export type ReconciliationAuthMode = "proxy" | "guest";

export type ReconciliationClientConfig = {
  /** Base path for reconciliation endpoints. Defaults to `/api/reconciliation` (Next.js key-injected proxy). */
  basePath?: string;
  /** `"proxy"` relies on backend proxy auth; `"guest"` stores `access_token` in `sessionStorage` and sends `X-Reconciliation-Token`. */
  mode?: ReconciliationAuthMode;
  /** Optional custom header provider (e.g. session headers). Never pass secret API keys from browser JS. */
  getHeaders?: (reconciliationId?: string) => HeadersInit;
};

export class ReconciliationApiError extends Error {
  readonly status: number;
  readonly requestId?: string;
  readonly details?: unknown;
  readonly retryAfterSeconds?: number;

  constructor(
    message: string,
    options: {
      status: number;
      requestId?: string;
      details?: unknown;
      retryAfterSeconds?: number;
    }
  ) {
    super(message);
    this.name = "ReconciliationApiError";
    this.status = options.status;
    this.requestId = options.requestId;
    this.details = options.details;
    this.retryAfterSeconds = options.retryAfterSeconds;
  }
}

export function detectPdfPasswordIssue(
  errorMessage: string
): PdfPasswordPrompt | null {
  const normalized = errorMessage.trim();
  const lower = normalized.toLowerCase();

  const target: "bank_statement" | "business_ledger" | null = lower.startsWith(
    "bank statement:"
  )
    ? "bank_statement"
    : lower.startsWith("business ledger:")
      ? "business_ledger"
      : null;

  if (!target) return null;

  if (lower.includes("password-protected")) {
    return { target, reason: "missing", message: normalized };
  }
  if (lower.includes("incorrect pdf password")) {
    return { target, reason: "incorrect", message: normalized };
  }

  return null;
}

export function validateReconciliationFile(file: File): string | null {
  return validateReconciliationFileMetadata(file);
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getStoredGuestToken(reconciliationId: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage.getItem(
      `${TOKEN_STORAGE_PREFIX}${reconciliationId}`
    );
  } catch {
    return null;
  }
}

function storeGuestToken(reconciliationId: string, token: string): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(
      `${TOKEN_STORAGE_PREFIX}${reconciliationId}`,
      token
    );
  } catch {
    // Ignore storage quota or private-browsing errors
  }
}

async function parseErrorResponse(res: Response): Promise<ReconciliationApiError> {
  const retryAfterRaw = res.headers.get("retry-after");
  const retryAfterSeconds = retryAfterRaw
    ? Number.parseInt(retryAfterRaw, 10)
    : undefined;

  let body: Partial<ApiErrorEnvelope> | null = null;
  const contentType = res.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    try {
      body = (await res.json()) as Partial<ApiErrorEnvelope>;
    } catch {
      body = null;
    }
  }

  const fallbackByStatus: Record<number, string> = {
    401: "API key authentication failed.",
    404: "Reconciliation record not found or inaccessible.",
    409: "Reconciliation is not completed yet.",
    410: "Guest access token has expired.",
    413: `File exceeds the ${RECONCILIATION_MAX_FILE_SIZE_MB} MB upload limit.`,
    422: "Request validation failed.",
    429: "Rate limit exceeded. Please wait briefly and try again.",
  };

  let message =
    body?.error ||
    fallbackByStatus[res.status] ||
    `Request failed with status ${res.status}.`;

  if (
    res.status === 422 &&
    Array.isArray(body?.details) &&
    body.details.length > 0
  ) {
    const first = body.details[0] as { msg?: string; loc?: unknown[] };
    if (first?.msg) {
      message = `${message}: ${first.msg}`;
    }
  }

  return new ReconciliationApiError(message, {
    status: res.status,
    requestId: body?.id,
    details: body?.details,
    retryAfterSeconds: Number.isFinite(retryAfterSeconds)
      ? retryAfterSeconds
      : undefined,
  });
}

function extractFilenameFromDisposition(
  header: string | null,
  fallback: string
): string {
  if (!header) return sanitizeDownloadFilename(null, fallback);
  const quoted = /filename="([^"]+)"/i.exec(header);
  if (quoted?.[1]) return sanitizeDownloadFilename(quoted[1], fallback);
  const plain = /filename=([^;]+)/i.exec(header);
  if (plain?.[1]) return sanitizeDownloadFilename(plain[1].trim(), fallback);
  return sanitizeDownloadFilename(null, fallback);
}

async function fetchWithNetworkHandling(
  input: string,
  init: RequestInit
): Promise<Response> {
  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    throw new ReconciliationApiError(
      "You appear to be offline. Reconnect to the internet and try again.",
      { status: 0 }
    );
  }
  try {
    return await fetch(input, init);
  } catch (err) {
    if ((err as Error)?.name === "AbortError") {
      throw err;
    }
    throw new ReconciliationApiError(
      "Network error while contacting the reconciliation service. Please check your connection and try again.",
      { status: 0 }
    );
  }
}

function assertValidIdClient(reconciliationId: string): void {
  if (!isValidReconciliationId(reconciliationId)) {
    throw new ReconciliationApiError(
      "Invalid reconciliation ID format. Expected 3-128 letters, numbers, hyphens, or underscores.",
      { status: 400 }
    );
  }
}

function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    const onAbort = () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    };
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

export function createReconciliationClient(
  config: ReconciliationClientConfig = {}
) {
  const basePath = (config.basePath ?? "/api/reconciliation").replace(
    /\/+$/,
    ""
  );
  const mode = config.mode ?? "proxy";

  function buildHeaders(reconciliationId?: string): Headers {
    const headers = new Headers(config.getHeaders?.(reconciliationId));
    if (mode === "guest" && reconciliationId && !headers.has("X-Reconciliation-Token")) {
      const token = getStoredGuestToken(reconciliationId);
      if (token) {
        headers.set("X-Reconciliation-Token", token);
      }
    }
    return headers;
  }

  async function startReconciliation(
    params: UploadReconciliationParams,
    options?: { signal?: AbortSignal }
  ): Promise<UploadReconciliationResponse> {
    const form = new FormData();
    form.append("bank_statement", params.bankStatement);
    form.append("business_ledger", params.businessLedger);

    if (typeof params.dateToleranceDays === "number") {
      form.append("date_tolerance_days", String(params.dateToleranceDays));
    }
    if (typeof params.descriptionMatching === "boolean") {
      form.append("description_matching", String(params.descriptionMatching));
    }
    if (params.bankStatementPassword) {
      form.append("bank_statement_password", params.bankStatementPassword);
    }
    if (params.businessLedgerPassword) {
      form.append("business_ledger_password", params.businessLedgerPassword);
    }
    if (params.webhookUrl) {
      form.append("webhook_url", params.webhookUrl);
    }
    if (params.webhookSecret) {
      form.append("webhook_secret", params.webhookSecret);
    }
    if (params.userEmail) {
      form.append("user_email", params.userEmail);
    }

    const res = await fetchWithNetworkHandling(`${basePath}/upload`, {
      method: "POST",
      headers: buildHeaders(),
      body: form,
      signal: options?.signal,
    });

    if (res.status !== 202 && !res.ok) {
      throw await parseErrorResponse(res);
    }

    const payload = (await res.json()) as UploadReconciliationResponse;
    if (payload.access_token && payload.reconciliation_id) {
      storeGuestToken(payload.reconciliation_id, payload.access_token);
    }
    return payload;
  }

  async function getReconciliation(
    reconciliationId: string,
    options?: { signal?: AbortSignal }
  ): Promise<ReconciliationStatusResponse> {
    assertValidIdClient(reconciliationId);
    const res = await fetchWithNetworkHandling(
      `${basePath}/${encodeURIComponent(reconciliationId)}`,
      {
        method: "GET",
        headers: buildHeaders(reconciliationId),
        signal: options?.signal,
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw await parseErrorResponse(res);
    }
    return (await res.json()) as ReconciliationStatusResponse;
  }

  async function pollReconciliation(
    reconciliationId: string,
    options?: {
      intervalMs?: number;
      onProgress?: (status: ReconciliationStatusResponse) => void;
      signal?: AbortSignal;
    }
  ): Promise<ReconciliationStatusResponse> {
    assertValidIdClient(reconciliationId);
    const baseIntervalMs = options?.intervalMs ?? 2500;
    const startedAt = Date.now();
    let consecutiveNetworkErrors = 0;

    for (;;) {
      try {
        const snapshot = await getReconciliation(reconciliationId, {
          signal: options?.signal,
        });
        consecutiveNetworkErrors = 0;
        options?.onProgress?.(snapshot);

        if (snapshot.status === "completed") {
          return snapshot;
        }
        if (snapshot.status === "failed") {
          throw new ReconciliationApiError(
            snapshot.error || "Reconciliation failed.",
            { status: 500 }
          );
        }

        const elapsed = Date.now() - startedAt;
        const delayMs = elapsed > 30_000 ? Math.max(baseIntervalMs, 5000) : baseIntervalMs;
        await sleep(delayMs, options?.signal);
      } catch (err) {
        if (options?.signal?.aborted || (err as Error)?.name === "AbortError") {
          throw err;
        }
        if (
          err instanceof ReconciliationApiError &&
          err.status === 429
        ) {
          const waitMs = Math.max((err.retryAfterSeconds ?? 5) * 1000, 3000);
          await sleep(waitMs, options?.signal);
          continue;
        }
        if (
          err instanceof ReconciliationApiError &&
          err.status === 0 &&
          (typeof navigator === "undefined" || navigator.onLine !== false) &&
          consecutiveNetworkErrors < 2
        ) {
          consecutiveNetworkErrors += 1;
          await sleep(1500 * consecutiveNetworkErrors, options?.signal);
          continue;
        }
        throw err;
      }
    }
  }

  async function getTransactions(
    reconciliationId: string,
    query: TransactionsQueryParams = {},
    options?: { signal?: AbortSignal }
  ): Promise<TransactionsPageResponse> {
    assertValidIdClient(reconciliationId);
    const search = new URLSearchParams();
    if (query.status) search.set("status", query.status);
    if (typeof query.page === "number") search.set("page", String(query.page));
    if (typeof query.pageSize === "number") {
      search.set("page_size", String(query.pageSize));
    }

    const qs = search.toString();
    const res = await fetchWithNetworkHandling(
      `${basePath}/${encodeURIComponent(reconciliationId)}/transactions${qs ? `?${qs}` : ""}`,
      {
        method: "GET",
        headers: buildHeaders(reconciliationId),
        signal: options?.signal,
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw await parseErrorResponse(res);
    }
    return (await res.json()) as TransactionsPageResponse;
  }

  async function exportReport(
    reconciliationId: string,
    format: ExportFormat = "xlsx",
    options?: { signal?: AbortSignal }
  ): Promise<{ blob: Blob; filename: string }> {
    assertValidIdClient(reconciliationId);
    const res = await fetchWithNetworkHandling(
      `${basePath}/${encodeURIComponent(reconciliationId)}/export?format=${format}`,
      {
        method: "GET",
        headers: buildHeaders(reconciliationId),
        signal: options?.signal,
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw await parseErrorResponse(res);
    }
    const blob = await res.blob();
    const filename = extractFilenameFromDisposition(
      res.headers.get("content-disposition"),
      `${reconciliationId}.${format}`
    );
    return { blob, filename };
  }

  async function downloadReport(
    reconciliationId: string,
    format: ExportFormat = "xlsx",
    options?: { signal?: AbortSignal }
  ): Promise<void> {
    const { blob, filename } = await exportReport(
      reconciliationId,
      format,
      options
    );
    const objectUrl = URL.createObjectURL(blob);
    try {
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  }

  return {
    basePath,
    mode,
    startReconciliation,
    getReconciliation,
    pollReconciliation,
    getTransactions,
    exportReport,
    downloadReport,
  };
}

export const defaultReconciliationClient = createReconciliationClient();

/**
 * Generates an in-memory sample CSV pair (bank statement + business ledger)
 * demonstrating matched entries, an unrecorded bank fee, an uncleared check,
 * a possible duplicate, and an amount mismatch with an exact $0.00 book-to-bank check.
 */
export function createSampleReconciliationFiles(): {
  bankStatement: File;
  businessLedger: File;
} {
  const bankCsv = [
    "Date,Description,Reference,Debit (USD),Credit (USD),Balance (USD)",
    "2026-11-01,Opening Balance,,,,10000.00",
    "2026-11-02,ACH Deposit - Acme Corp INV-1042,INV1042,,4200.00,14200.00",
    "2026-11-04,AWS Cloud Services Monthly,AWS8841,450.00,,13750.00",
    "2026-11-06,Merchant Settlement Batch #9921,MRCH9921,,3150.00,16900.00",
    "2026-11-08,Gusto Payroll Batch #44,PAY044,2400.00,,14500.00",
    "2026-11-10,Vendor Wire - Northwind Supply,INV1048,850.00,,13650.00",
    "2026-11-12,Chase Outbound Wire Transfer Fee,FEE012,35.00,,13615.00",
    "2026-11-14,Closing Balance,,,,13615.00",
  ].join("\n");

  const ledgerCsv = [
    "Date,Description,Reference,Debit (USD),Credit (USD),Balance (USD)",
    "2026-11-01,Opening Balance,,,,10000.00",
    "2026-11-01,Customer Payment - Acme Corp,INV1042,,4200.00,14200.00",
    "2026-11-04,Amazon Web Services Hosting,AWS8841,450.00,,13750.00",
    "2026-11-06,Merchant Settlement Batch 9921,MRCH9921,,3150.00,16900.00",
    "2026-11-08,Payroll Run #44 - Gusto,PAY044,2400.00,,14500.00",
    "2026-11-08,Payroll Run #44 - Gusto,PAY044,2400.00,,12100.00",
    "2026-11-10,Northwind Supply Co. Invoice 1048,INV1048,840.00,,11260.00",
    "2026-11-13,Check #2084 - Office Lease Deposit,CHK2084,1250.00,,10010.00",
    "2026-11-14,Closing Balance,,,,10010.00",
  ].join("\n");

  return {
    bankStatement: new File([bankCsv], "sample-bank-statement.csv", {
      type: "text/csv",
    }),
    businessLedger: new File([ledgerCsv], "sample-business-ledger.csv", {
      type: "text/csv",
    }),
  };
}
