"use client";

import { useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  ChevronDown,
  History,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { createSampleReconciliationFiles } from "@/lib/reconciliation/client";
import type {
  PdfPasswordPrompt,
  UploadReconciliationParams,
} from "@/lib/reconciliation/types";
import { ReconciliationDropzone } from "./reconciliation-dropzone";

export type ReconciliationUploadFormProps = {
  onSubmit: (params: UploadReconciliationParams) => void | Promise<void>;
  onResumeId?: (reconciliationId: string) => void | Promise<void>;
  lastSavedId?: string | null;
  isSubmitting?: boolean;
  error?: string | null;
  pdfPasswordPrompt?: PdfPasswordPrompt | null;
  defaultToleranceDays?: number;
  defaultDescriptionMatching?: boolean;
  showWebhookOptions?: boolean;
};

export function ReconciliationUploadForm({
  onSubmit,
  onResumeId,
  lastSavedId = null,
  isSubmitting = false,
  error = null,
  pdfPasswordPrompt = null,
  defaultToleranceDays = 2,
  defaultDescriptionMatching = true,
  showWebhookOptions = true,
}: ReconciliationUploadFormProps) {
  const [bankStatement, setBankStatement] = useState<File | null>(null);
  const [businessLedger, setBusinessLedger] = useState<File | null>(null);
  const [bankPassword, setBankPassword] = useState("");
  const [ledgerPassword, setLedgerPassword] = useState("");
  const [dateToleranceDays, setDateToleranceDays] =
    useState<number>(defaultToleranceDays);
  const [descriptionMatching, setDescriptionMatching] = useState<boolean>(
    defaultDescriptionMatching
  );

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [webhookSecret, setWebhookSecret] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [showResumeInput, setShowResumeInput] = useState(false);
  const [resumeIdInput, setResumeIdInput] = useState("");
  const [formValidationError, setFormValidationError] = useState<string | null>(
    null
  );

  const handleLoadSample = () => {
    const sample = createSampleReconciliationFiles();
    setBankStatement(sample.bankStatement);
    setBusinessLedger(sample.businessLedger);
    setBankPassword("");
    setLedgerPassword("");
    setFormValidationError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormValidationError(null);

    if (!bankStatement || !businessLedger) {
      setFormValidationError(
        "Please select both a Bank Statement and a Business Ledger file to compare."
      );
      return;
    }

    if (
      Number.isNaN(dateToleranceDays) ||
      dateToleranceDays < 0 ||
      dateToleranceDays > 31
    ) {
      setFormValidationError(
        "Date tolerance must be between 0 and 31 days."
      );
      return;
    }

    const trimmedWebhook = webhookUrl.trim();
    if (trimmedWebhook && !trimmedWebhook.startsWith("https://")) {
      setFormValidationError("Webhook URL must use HTTPS.");
      return;
    }

    await onSubmit({
      bankStatement,
      businessLedger,
      dateToleranceDays,
      descriptionMatching,
      bankStatementPassword: bankPassword || undefined,
      businessLedgerPassword: ledgerPassword || undefined,
      webhookUrl: trimmedWebhook || undefined,
      webhookSecret: webhookSecret.trim() || undefined,
      userEmail: userEmail.trim() || undefined,
    });
  };

  const displayError = formValidationError || error;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleLoadSample}
            className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full bg-[#BDF71D] px-3.5 py-1.5 text-xs font-semibold text-[#111214] transition-colors hover:bg-[#ccff3d] disabled:opacity-50"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Load Sample CSV Pair
          </button>

          {onResumeId && lastSavedId && (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => onResumeId(lastSavedId)}
              className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-[#111214] transition-colors hover:bg-[#F7F8F9] disabled:opacity-50"
            >
              <History className="h-3.5 w-3.5 text-[#5A5E67]" />
              Resume{" "}
              <span className="font-mono text-[11px]">{lastSavedId}</span>
            </button>
          )}
        </div>

        {onResumeId && (
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => setShowResumeInput((prev) => !prev)}
            className="inline-flex items-center gap-1 text-xs font-medium text-[#5A5E67] hover:text-[#111214] transition-colors"
          >
            <History className="h-3.5 w-3.5" />
            {showResumeInput ? "Hide ID lookup" : "Open existing ID"}
          </button>
        )}
      </div>

      {onResumeId && showResumeInput && (
        <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-3 sm:flex-row sm:items-center">
          <input
            type="text"
            value={resumeIdInput}
            onChange={(e) => setResumeIdInput(e.target.value)}
            placeholder="Paste reconciliation_id (e.g. rec_4f1c2a9be03d7781)"
            className="flex-1 rounded-xl border border-slate-200 bg-[#F7F8F9] px-3.5 py-2 font-mono text-xs text-[#111214] placeholder:text-slate-400 focus:border-[#111214] focus:bg-white focus:outline-none"
          />
          <button
            type="button"
            disabled={isSubmitting || !resumeIdInput.trim()}
            onClick={() => onResumeId(resumeIdInput.trim())}
            className="inline-flex min-h-[36px] items-center justify-center rounded-full bg-[#111214] px-4 text-xs font-semibold text-white transition-colors hover:bg-black disabled:opacity-50"
          >
            Fetch Report
          </button>
        </div>
      )}

      {/* Dual Dropzones */}
      <div className="grid gap-4 md:grid-cols-2">
        <ReconciliationDropzone
          label="1. Bank Statement"
          badge="bank_statement"
          helperText="PDF (digital or scanned), JPG/PNG/TIFF, CSV, TSV, TXT, XLSX, XLSM (max 100 MB, 200 PDF pages)"
          file={bankStatement}
          onFileChange={setBankStatement}
          password={bankPassword}
          onPasswordChange={setBankPassword}
          passwordError={
            pdfPasswordPrompt?.target === "bank_statement"
              ? pdfPasswordPrompt.message
              : null
          }
          disabled={isSubmitting}
        />

        <ReconciliationDropzone
          label="2. Business Ledger / Cash Book"
          badge="business_ledger"
          helperText="Cash book, GL export, or invoice receipt (PDF, Image, CSV, TSV, TXT, XLSX, XLSM)"
          file={businessLedger}
          onFileChange={setBusinessLedger}
          password={ledgerPassword}
          onPasswordChange={setLedgerPassword}
          passwordError={
            pdfPasswordPrompt?.target === "business_ledger"
              ? pdfPasswordPrompt.message
              : null
          }
          disabled={isSubmitting}
        />
      </div>

      {/* Matching Controls */}
      <div className="rounded-[24px] border border-slate-200 bg-white p-4 sm:p-5">
        <div className="grid gap-4 sm:grid-cols-2 sm:items-center">
          <div>
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="date-tolerance-days"
                className="flex items-center gap-1.5 text-xs font-semibold text-[#111214]"
              >
                <SlidersHorizontal className="h-3.5 w-3.5 text-[#5A5E67]" />
                Date Tolerance Window
              </label>
              <span className="rounded-full bg-[#F7F8F9] px-2.5 py-0.5 font-mono text-xs font-semibold text-[#111214]">
                ±{dateToleranceDays}{" "}
                {dateToleranceDays === 1 ? "day" : "days"}
              </span>
            </div>
            <input
              id="date-tolerance-days"
              type="range"
              min={0}
              max={31}
              step={1}
              disabled={isSubmitting}
              value={dateToleranceDays}
              onChange={(e) =>
                setDateToleranceDays(Number.parseInt(e.target.value, 10) || 0)
              }
              className="mt-2.5 h-2 w-full cursor-pointer accent-[#111214]"
            />
            <div className="mt-1 flex justify-between font-mono text-[10px] text-[#5A5E67]">
              <span>0 days (exact)</span>
              <span>2 days (default)</span>
              <span>31 days</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#F7F8F9] px-4 py-3">
            <div>
              <div className="text-xs font-semibold text-[#111214]">
                Description Similarity Scoring
              </div>
              <div className="mt-0.5 text-[11px] text-[#5A5E67]">
                Uses memo/narration similarity when ranking candidate matches
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={descriptionMatching}
              disabled={isSubmitting}
              onClick={() => setDescriptionMatching((prev) => !prev)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214] ${
                descriptionMatching ? "bg-[#111214]" : "bg-slate-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
                  descriptionMatching
                    ? "translate-x-6 bg-[#BDF71D]"
                    : "translate-x-1 bg-white"
                }`}
              />
            </button>
          </div>
        </div>

        {showWebhookOptions && (
          <div className="mt-4 border-t border-slate-100 pt-3">
            <button
              type="button"
              onClick={() => setShowAdvanced((prev) => !prev)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5A5E67] hover:text-[#111214] transition-colors"
            >
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${
                  showAdvanced ? "rotate-180" : ""
                }`}
              />
              Advanced API Options (Webhooks &amp; Email Tag)
            </button>

            {showAdvanced && (
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="rec-webhook-url"
                    className="block text-[11px] font-semibold text-[#111214]"
                  >
                    Webhook URL (HTTPS)
                  </label>
                  <input
                    id="rec-webhook-url"
                    type="url"
                    disabled={isSubmitting}
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    placeholder="https://example.com/hooks/rec"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-[#111214] placeholder:text-slate-400 focus:border-[#111214] focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="rec-webhook-secret"
                    className="block text-[11px] font-semibold text-[#111214]"
                  >
                    Webhook Secret (HMAC-SHA256)
                  </label>
                  <input
                    id="rec-webhook-secret"
                    type="password"
                    maxLength={256}
                    disabled={isSubmitting}
                    value={webhookSecret}
                    onChange={(e) => setWebhookSecret(e.target.value)}
                    placeholder="Optional signing secret"
                    autoComplete="off"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-[#111214] placeholder:text-slate-400 focus:border-[#111214] focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="rec-user-email"
                    className="block text-[11px] font-semibold text-[#111214]"
                  >
                    Record Tag Email
                  </label>
                  <input
                    id="rec-user-email"
                    type="email"
                    disabled={isSubmitting}
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="finance@company.com"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-[#111214] placeholder:text-slate-400 focus:border-[#111214] focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {displayError && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-800 sm:text-sm"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
          <div className="min-w-0 flex-1 leading-relaxed">{displayError}</div>
        </div>
      )}

      {/* Submit Row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] leading-relaxed text-[#5A5E67]">
          Supports multi-currency ISO 4217 statements, PDF OCR (up to 200
          pages), and deterministic balance verification.
        </p>

        <button
          type="submit"
          disabled={isSubmitting || !bankStatement || !businessLedger}
          className="inline-flex min-h-[46px] shrink-0 items-center justify-center rounded-full bg-[#111214] px-7 text-xs font-semibold text-white shadow-sm transition-all hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
        >
          {isSubmitting ? (
            "Uploading Documents..."
          ) : (
            <>
              Run Bank Reconciliation
              <ArrowRight className="ml-2 h-4 w-4 text-[#BDF71D]" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
