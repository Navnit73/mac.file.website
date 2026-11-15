import type { NextRequest } from "next/server";
import {
  createJsonErrorResponse,
  fetchUpstream,
  forwardUpstreamJson,
  mapUpstreamProxyError,
} from "@/lib/reconciliation/server";
import {
  isValidEmail,
  isValidHttpsUrl,
  validateReconciliationFileMetadata,
} from "@/lib/reconciliation/validation";

const MAX_SECRET_OR_PASSWORD_LENGTH = 256;

export async function POST(request: NextRequest) {
  let incomingForm: FormData;
  try {
    incomingForm = await request.formData();
  } catch {
    return createJsonErrorResponse(
      "Expected multipart/form-data request body with bank_statement and business_ledger files.",
      400
    );
  }

  const bankStatement = incomingForm.get("bank_statement");
  const businessLedger = incomingForm.get("business_ledger");

  if (!(bankStatement instanceof File) || !(businessLedger instanceof File)) {
    return createJsonErrorResponse(
      "Both bank_statement and business_ledger files are required.",
      422
    );
  }

  const bankFileError = validateReconciliationFileMetadata(bankStatement);
  if (bankFileError) {
    return createJsonErrorResponse(bankFileError, 422);
  }

  const ledgerFileError = validateReconciliationFileMetadata(businessLedger);
  if (ledgerFileError) {
    return createJsonErrorResponse(ledgerFileError, 422);
  }

  const outboundForm = new FormData();
  outboundForm.append("bank_statement", bankStatement, bankStatement.name);
  outboundForm.append("business_ledger", businessLedger, businessLedger.name);

  const toleranceRaw = incomingForm.get("date_tolerance_days");
  if (typeof toleranceRaw === "string" && toleranceRaw.trim().length > 0) {
    const parsedTolerance = Number(toleranceRaw.trim());
    if (
      !Number.isInteger(parsedTolerance) ||
      parsedTolerance < 0 ||
      parsedTolerance > 31
    ) {
      return createJsonErrorResponse(
        "date_tolerance_days must be an integer between 0 and 31.",
        422
      );
    }
    outboundForm.append("date_tolerance_days", String(parsedTolerance));
  }

  const descMatchingRaw = incomingForm.get("description_matching");
  if (typeof descMatchingRaw === "string" && descMatchingRaw.trim().length > 0) {
    const normalized = descMatchingRaw.trim().toLowerCase();
    if (normalized !== "true" && normalized !== "false") {
      return createJsonErrorResponse(
        "description_matching must be 'true' or 'false'.",
        422
      );
    }
    outboundForm.append("description_matching", normalized);
  }

  const webhookUrlRaw = incomingForm.get("webhook_url");
  if (typeof webhookUrlRaw === "string" && webhookUrlRaw.trim().length > 0) {
    const trimmed = webhookUrlRaw.trim();
    if (!isValidHttpsUrl(trimmed)) {
      return createJsonErrorResponse(
        "webhook_url must be a valid HTTPS URL.",
        422
      );
    }
    outboundForm.append("webhook_url", trimmed);
  }

  const userEmailRaw = incomingForm.get("user_email");
  if (typeof userEmailRaw === "string" && userEmailRaw.trim().length > 0) {
    const trimmed = userEmailRaw.trim();
    if (!isValidEmail(trimmed)) {
      return createJsonErrorResponse(
        "user_email must be a valid email address.",
        422
      );
    }
    outboundForm.append("user_email", trimmed);
  }

  for (const secretField of [
    "webhook_secret",
    "bank_statement_password",
    "business_ledger_password",
  ] as const) {
    const value = incomingForm.get(secretField);
    if (typeof value === "string" && value.length > 0) {
      if (value.length > MAX_SECRET_OR_PASSWORD_LENGTH) {
        return createJsonErrorResponse(
          `${secretField} exceeds maximum allowed length of ${MAX_SECRET_OR_PASSWORD_LENGTH} characters.`,
          422
        );
      }
      outboundForm.append(secretField, value);
    }
  }

  try {
    const upstream = await fetchUpstream("/upload", request.headers, {
      method: "POST",
      body: outboundForm,
      signal: request.signal,
      timeoutMs: 60_000,
    });
    return await forwardUpstreamJson(upstream);
  } catch (err) {
    return mapUpstreamProxyError(err, "Unable to reach reconciliation API.");
  }
}
