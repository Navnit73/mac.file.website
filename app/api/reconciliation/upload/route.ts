import type { NextRequest } from "next/server";
import {
  buildUpstreamAuthHeaders,
  createJsonErrorResponse,
  forwardUpstreamJson,
  getReconciliationUpstreamBaseUrl,
} from "@/lib/reconciliation/server";

const ALLOWED_TEXT_FIELDS = [
  "webhook_url",
  "webhook_secret",
  "date_tolerance_days",
  "description_matching",
  "user_email",
  "bank_statement_password",
  "business_ledger_password",
] as const;

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

  const outboundForm = new FormData();
  outboundForm.append("bank_statement", bankStatement, bankStatement.name);
  outboundForm.append("business_ledger", businessLedger, businessLedger.name);

  for (const field of ALLOWED_TEXT_FIELDS) {
    const value = incomingForm.get(field);
    if (typeof value === "string" && value.length > 0) {
      outboundForm.append(field, value);
    }
  }

  try {
    const baseUrl = getReconciliationUpstreamBaseUrl();
    const upstream = await fetch(`${baseUrl}/upload`, {
      method: "POST",
      headers: buildUpstreamAuthHeaders(request.headers),
      body: outboundForm,
      redirect: "error",
      cache: "no-store",
    });
    return await forwardUpstreamJson(upstream);
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Unable to reach reconciliation API.";
    return createJsonErrorResponse(message, 502);
  }
}
