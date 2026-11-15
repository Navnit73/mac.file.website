import {
  RECONCILIATION_ACCEPTED_EXTENSIONS,
  RECONCILIATION_MAX_FILE_SIZE_BYTES,
  RECONCILIATION_MAX_FILE_SIZE_MB,
  type TransactionCategory,
} from "./types";

export const RECONCILIATION_ID_PATTERN = /^[a-zA-Z0-9_-]{3,128}$/;

export const TRANSACTION_CATEGORIES: readonly TransactionCategory[] = [
  "matched",
  "unmatched_bank",
  "unmatched_ledger",
  "possible_duplicates",
  "amount_mismatches",
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidReconciliationId(id: string): boolean {
  return RECONCILIATION_ID_PATTERN.test(id.trim());
}

export function isValidTransactionCategory(
  value: string
): value is TransactionCategory {
  return (TRANSACTION_CATEGORIES as readonly string[]).includes(value);
}

export function isValidEmail(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= 254 && EMAIL_PATTERN.test(trimmed);
}

export function isValidHttpsUrl(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > 2048) return false;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "https:" && Boolean(parsed.hostname);
  } catch {
    return false;
  }
}

export function validateReconciliationFileMetadata(file: {
  name: string;
  size: number;
}): string | null {
  if (file.size <= 0) {
    return `"${file.name}" is empty (0 bytes).`;
  }
  if (file.size > RECONCILIATION_MAX_FILE_SIZE_BYTES) {
    return `"${file.name}" exceeds the ${RECONCILIATION_MAX_FILE_SIZE_MB} MB file size limit.`;
  }

  const dotIndex = file.name.lastIndexOf(".");
  if (dotIndex === -1 || dotIndex === file.name.length - 1) {
    return `"${file.name}" does not have a valid file extension. Supported formats: PDF, CSV, TSV, TXT, XLSX, XLSM, JPG, PNG, WEBP, or TIFF.`;
  }

  const ext = file.name.slice(dotIndex).toLowerCase();
  if (ext === ".xls") {
    return `Legacy .xls files are not supported ("${file.name}"). Please save it as .xlsx, .csv, or PDF.`;
  }

  const allowed: readonly string[] = RECONCILIATION_ACCEPTED_EXTENSIONS;
  if (!allowed.includes(ext)) {
    return `"${file.name}" (${ext}) is not a supported statement or ledger format.`;
  }

  return null;
}

export function sanitizeDownloadFilename(
  rawFilename: string | null | undefined,
  fallback: string
): string {
  const safeFallback =
    fallback.replace(/[^a-zA-Z0-9._-]/g, "_") || "reconciliation-report";
  if (!rawFilename) return safeFallback;

  const base = rawFilename.split(/[\\/]/).pop() ?? "";
  const cleaned = base
    .replace(/[\u0000-\u001f\u007f"';]+/g, "")
    .replace(/^\.+/, "")
    .trim();

  if (!cleaned || cleaned.length > 180) {
    return safeFallback;
  }
  return cleaned;
}
