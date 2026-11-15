"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  Check,
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
import {
  isValidEmail,
  isValidHttpsUrl,
  isValidReconciliationId,
} from "@/lib/reconciliation/validation";
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

const TOLERANCE_PRESETS = [
  { days: 0, label: "Exact (0d)" },
  { days: 2, label: "±2d Default" },
  { days: 5, label: "±5d" },
  { days: 14, label: "±14d" },
  { days: 31, label: "±31d" },
] as const;

export function ReconciliationUploadForm({
  onSubmit,
  onResumeId,
  lastSavedId = null,
  isSubmitting: isExternalSubmitting = false,
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
  const [localSubmitting, setLocalSubmitting] = useState(false);
  const [formValidationError, setFormValidationError] = useState<string | null>(
    null
  );

  const actionBarRef = useRef<HTMLDivElement>(null);
  const scrollTimerRef = useRef<number | null>(null);
  const submittingRef = useRef(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (scrollTimerRef.current !== null) {
        window.clearTimeout(scrollTimerRef.current);
      }
    };
  }, []);

  const isSubmitting = isExternalSubmitting || localSubmitting;

  const attachedCount = Number(Boolean(bankStatement)) + Number(Boolean(businessLedger));
  const filesReady = attachedCount === 2;
  const sliderPct = Math.round((dateToleranceDays / 31) * 100);
  const hasAdvancedConfig = Boolean(
    webhookUrl.trim() || webhookSecret.trim() || userEmail.trim()
  );

  const scrollToRunButton = () => {
    if (scrollTimerRef.current !== null) {
      window.clearTimeout(scrollTimerRef.current);
    }
    scrollTimerRef.current = window.setTimeout(() => {
      actionBarRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  const handleBankStatementChange = (file: File | null) => {
    setBankStatement(file);
    setBankPassword("");
    setFormValidationError(null);
  };

  const handleBusinessLedgerChange = (file: File | null) => {
    setBusinessLedger(file);
    setLedgerPassword("");
    setFormValidationError(null);
    if (file) {
      scrollToRunButton();
    }
  };

  const handleLoadSample = () => {
    const sample = createSampleReconciliationFiles();
    setBankStatement(sample.bankStatement);
    setBusinessLedger(sample.businessLedger);
    setBankPassword("");
    setLedgerPassword("");
    setFormValidationError(null);
  };

  const handleResumeLookup = async () => {
    if (!onResumeId || isSubmitting || submittingRef.current) return;
    const trimmedId = resumeIdInput.trim();
    if (!trimmedId) {
      setFormValidationError("Please enter a reconciliation ID to look up.");
      return;
    }
    if (!isValidReconciliationId(trimmedId)) {
      setFormValidationError(
        "Invalid reconciliation ID format. Expected 3-128 letters, numbers, hyphens, or underscores."
      );
      return;
    }
    setFormValidationError(null);
    submittingRef.current = true;
    setLocalSubmitting(true);
    try {
      await onResumeId(trimmedId);
    } finally {
      submittingRef.current = false;
      if (mountedRef.current) {
        setLocalSubmitting(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting || submittingRef.current) return;

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
    if (trimmedWebhook && !isValidHttpsUrl(trimmedWebhook)) {
      setFormValidationError("Please enter a valid HTTPS webhook URL.");
      return;
    }

    const trimmedEmail = userEmail.trim();
    if (trimmedEmail && !isValidEmail(trimmedEmail)) {
      setFormValidationError("Please enter a valid record tag email address.");
      return;
    }

    submittingRef.current = true;
    setLocalSubmitting(true);
    try {
      await onSubmit({
        bankStatement,
        businessLedger,
        dateToleranceDays,
        descriptionMatching,
        bankStatementPassword: bankPassword || undefined,
        businessLedgerPassword: ledgerPassword || undefined,
        webhookUrl: trimmedWebhook || undefined,
        webhookSecret: webhookSecret.trim() || undefined,
        userEmail: trimmedEmail || undefined,
      });
    } finally {
      submittingRef.current = false;
      if (mountedRef.current) {
        setLocalSubmitting(false);
      }
    }
  };

  const displayError = formValidationError || error;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      {/* Unified Responsive Step & Quick-Start Bar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#E6E9EE] px-3 py-1.5 text-xs font-medium text-[#111214]">
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-bold ${
                filesReady
                  ? "bg-emerald-800 text-white"
                  : "bg-[#111214] text-[#BDF71D]"
              }`}
            >
              {filesReady ? <Check className="h-3 w-3 stroke-[3]" /> : "1"}
            </span>
            <span>Upload files</span>
            <span className="rounded-full bg-white px-2 py-0.5 font-mono text-[10px] font-semibold text-[#111214]">
              {attachedCount}/2
            </span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-[#E6E9EE] px-3 py-1.5 text-xs font-medium text-[#111214]">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#111214]/15 font-mono text-[10px] font-bold text-[#111214]">
              2
            </span>
            <span>Tolerance</span>
            <span className="rounded-full bg-white px-2 py-0.5 font-mono text-[10px] font-semibold text-[#111214]">
              ±{dateToleranceDays}d
            </span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-[#E6E9EE] px-3 py-1.5 text-xs font-medium text-[#111214]">
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-bold ${
                filesReady
                  ? "bg-[#FF8F00] text-[#111214]"
                  : "bg-[#111214]/15 text-[#474B54]"
              }`}
            >
              3
            </span>
            <span>Preview &amp; export</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleLoadSample}
            className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full bg-[#E6E9EE] px-4 py-1.5 text-xs font-semibold text-[#111214] transition-colors hover:bg-[#D7DCE4] disabled:opacity-50"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#FF8F00]" />
            Load Sample CSV Pair
          </button>

          {onResumeId && (
            <>
              {lastSavedId && (
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => onResumeId(lastSavedId)}
                  className="inline-flex min-h-[38px] max-w-full items-center gap-1.5 rounded-full bg-emerald-100/80 px-3.5 py-1 text-xs font-medium text-[#111214] transition-colors hover:bg-emerald-200/70 disabled:opacity-50"
                >
                  <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
                  <span>Resume</span>
                  <span className="truncate font-mono text-[11px] font-semibold text-emerald-950">
                    {lastSavedId}
                  </span>
                </button>
              )}

              <button
                type="button"
                disabled={isSubmitting}
                aria-expanded={showResumeInput}
                aria-controls="rec-resume-panel"
                onClick={() => setShowResumeInput((prev) => !prev)}
                className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                  showResumeInput
                    ? "bg-[#111214] text-white"
                    : "bg-[#E6E9EE] text-[#111214] hover:bg-[#D7DCE4]"
                }`}
              >
                <History className="h-3.5 w-3.5" />
                {showResumeInput ? "Hide ID lookup" : "Open existing ID"}
              </button>
            </>
          )}
        </div>
      </div>

      {onResumeId && showResumeInput && (
        <div
          id="rec-resume-panel"
          data-clarity-mask="true"
          className="flex flex-col gap-2.5 rounded-2xl bg-[#E6E9EE] p-3 sm:flex-row sm:items-center sm:p-3.5"
        >
          <label htmlFor="rec-resume-id" className="sr-only">
            Reconciliation ID
          </label>
          <input
            id="rec-resume-id"
            type="text"
            value={resumeIdInput}
            onChange={(e) => {
              setResumeIdInput(e.target.value);
              if (formValidationError) setFormValidationError(null);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                void handleResumeLookup();
              }
            }}
            placeholder="Paste reconciliation_id (e.g. rec_4f1c2a9be03d7781)"
            className="min-w-0 flex-1 rounded-xl bg-white px-3.5 py-2.5 font-mono text-xs text-[#111214] placeholder:text-[#5A5E67] focus:outline-none focus:ring-2 focus:ring-[#111214]"
          />
          <button
            type="button"
            disabled={isSubmitting || !resumeIdInput.trim()}
            onClick={() => void handleResumeLookup()}
            className="inline-flex min-h-[40px] w-full items-center justify-center rounded-full bg-[#111214] px-5 text-xs font-semibold text-white transition-colors hover:bg-black disabled:opacity-50 sm:w-auto"
          >
            Fetch Report
          </button>
        </div>
      )}

      {/* Dual Dropzones */}
      <div className="grid gap-4 md:grid-cols-2 lg:gap-5">
        <ReconciliationDropzone
          label="1. Bank Statement"
          badge="Bank / Card File"
          variant="bank"
          helperText="PDF (digital or scanned), JPG/PNG/TIFF, CSV, TSV, TXT, XLSX, XLSM (max 100 MB, 200 PDF pages)"
          file={bankStatement}
          onFileChange={handleBankStatementChange}
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
          badge="Ledger / Cash Book"
          variant="ledger"
          helperText="Cash book, GL export, or invoice receipt (PDF, Image, CSV, TSV, TXT, XLSX, XLSM)"
          file={businessLedger}
          onFileChange={handleBusinessLedgerChange}
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
      <div className="rounded-2xl bg-[#E6E9EE] p-4 sm:p-6">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="date-tolerance-days"
                className="flex items-center gap-1.5 text-xs font-semibold text-[#111214] sm:text-sm"
              >
                <SlidersHorizontal className="h-3.5 w-3.5 text-[#111214]" />
                Date Tolerance Window
              </label>
              <span className="rounded-full bg-[#111214] px-3 py-0.5 font-mono text-xs font-semibold text-[#FF8F00]">
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
              style={{
                background: `linear-gradient(to right, #111214 0%, #111214 ${sliderPct}%, #CBD2DC ${sliderPct}%, #CBD2DC 100%)`,
              }}
              className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full accent-[#111214]"
            />

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                {TOLERANCE_PRESETS.map((preset) => {
                  const isActive = dateToleranceDays === preset.days;
                  return (
                    <button
                      key={preset.days}
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => setDateToleranceDays(preset.days)}
                      className={`inline-flex min-h-[34px] items-center rounded-full px-3 py-1 font-mono text-[11px] font-medium transition-colors ${
                        isActive
                          ? "bg-[#111214] text-white"
                          : "bg-white text-[#474B54] hover:bg-[#D7DCE4] hover:text-[#111214]"
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
              <span className="font-mono text-[11px] text-[#474B54]">
                Range: 0–31 days
              </span>
            </div>
          </div>

          <div
            className={`flex items-center justify-between gap-4 rounded-xl px-4 py-3.5 transition-colors lg:col-span-5 ${
              descriptionMatching ? "bg-emerald-50" : "bg-white"
            }`}
          >
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#111214]">
                <span id="rec-desc-matching-label">
                  Description Similarity Scoring
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold ${
                    descriptionMatching
                      ? "bg-emerald-800 text-white"
                      : "bg-[#D7DCE4] text-[#474B54]"
                  }`}
                >
                  {descriptionMatching ? "ON" : "OFF"}
                </span>
              </div>
              <div className="mt-0.5 text-[11px] leading-relaxed text-[#474B54]">
                Uses memo/narration similarity when ranking candidate matches
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={descriptionMatching}
              aria-labelledby="rec-desc-matching-label"
              disabled={isSubmitting}
              onClick={() => setDescriptionMatching((prev) => !prev)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214] ${
                descriptionMatching ? "bg-[#111214]" : "bg-[#AEB6C2]"
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
          <div className="mt-4 pt-3">
            <button
              type="button"
              disabled={isSubmitting}
              aria-expanded={showAdvanced}
              aria-controls="rec-advanced-options"
              onClick={() => setShowAdvanced((prev) => !prev)}
              className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-[#111214] transition-colors hover:bg-[#D7DCE4] disabled:opacity-50"
            >
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${
                  showAdvanced ? "rotate-180" : ""
                }`}
              />
              <span>Advanced API Options (Webhooks &amp; Email Tag)</span>
              {hasAdvancedConfig && (
                <span className="h-2 w-2 rounded-full bg-emerald-600" />
              )}
            </button>

            {showAdvanced && (
              <div
                id="rec-advanced-options"
                data-clarity-mask="true"
                className="mt-3 grid gap-3 rounded-xl bg-white p-4 sm:grid-cols-3"
              >
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
                    className="mt-1.5 w-full rounded-xl bg-[#E6E9EE] px-3 py-2 text-xs text-[#111214] placeholder:text-[#5A5E67] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#111214]"
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
                    className="mt-1.5 w-full rounded-xl bg-[#E6E9EE] px-3 py-2 text-xs text-[#111214] placeholder:text-[#5A5E67] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#111214]"
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
                    className="mt-1.5 w-full rounded-xl bg-[#E6E9EE] px-3 py-2 text-xs text-[#111214] placeholder:text-[#5A5E67] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#111214]"
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
          className="flex items-start gap-2.5 rounded-2xl bg-red-50 px-4 py-3 text-xs text-red-800 sm:text-sm"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
          <div className="min-w-0 flex-1 leading-relaxed">{displayError}</div>
        </div>
      )}

      {/* High-Contrast Submit Action Bar */}
      <div
        ref={actionBarRef}
        className="scroll-mt-24 scroll-mb-6 flex flex-col gap-4 rounded-2xl bg-[#111214] p-4 text-white sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold sm:text-sm">
            <span
              className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                filesReady ? "bg-emerald-400" : "bg-[#FF8F00]"
              }`}
            />
            <span className={filesReady ? "text-emerald-300" : "text-white"}>
              {filesReady
                ? "2/2 files ready for tie-out"
                : `${attachedCount}/2 files selected — add both documents to run`}
            </span>
          </div>
          <p className="text-[11px] leading-relaxed text-[#CBD2DC] sm:text-xs">
            Supports multi-currency ISO 4217 statements, PDF OCR (up to 200
            pages), and deterministic balance verification.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !filesReady}
          className={`inline-flex min-h-[48px] w-full shrink-0 items-center justify-center rounded-full px-7 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8F00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111214] sm:w-auto sm:text-sm ${
            filesReady
              ? "bg-[#FF8F00] text-[#111214] shadow-md hover:bg-[#FFA000]"
              : "cursor-not-allowed bg-[#FF8F00]/70 text-[#111214]"
          }`}
        >
          {isSubmitting ? (
            "Uploading Documents..."
          ) : (
            <>
              Run Bank Reconciliation
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
