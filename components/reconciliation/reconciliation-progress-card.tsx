"use client";

import {
  AlertTriangle,
  Check,
  Copy,
  Loader2,
  RotateCcw,
  XCircle,
} from "lucide-react";
import { useCopiedFeedback } from "@/hooks/use-copied-feedback";
import type { ReconciliationPhase } from "@/hooks/use-reconciliation";
import type { ReconciliationStatus } from "@/lib/reconciliation/types";

export type ReconciliationProgressCardProps = {
  phase: ReconciliationPhase;
  reconciliationId: string | null;
  status?: ReconciliationStatus;
  progress: number;
  message: string;
  error: string | null;
  createdAt?: string;
  headingLevel?: "h2" | "h3";
  onCancel?: () => void;
  onReset: () => void;
};

export function ReconciliationProgressCard({
  phase,
  reconciliationId,
  status,
  progress,
  message,
  error,
  createdAt,
  headingLevel = "h3",
  onCancel,
  onReset,
}: ReconciliationProgressCardProps) {
  const HeadingTag = headingLevel;
  const { copied, copyText } = useCopiedFeedback();

  const isFailed = phase === "failed" || status === "failed";
  const clampedProgress = Math.max(0, Math.min(100, progress));

  const handleCopyId = () => {
    if (!reconciliationId) return;
    void copyText(reconciliationId);
  };

  return (
    <div
      data-clarity-mask="true"
      className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-xs sm:p-7"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3.5">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
              isFailed
                ? "bg-red-100 text-red-700"
                : "bg-[#111214] text-[#BDF71D]"
            }`}
          >
            {isFailed ? (
              <XCircle className="h-5 w-5" />
            ) : (
              <Loader2 className="h-5 w-5 animate-spin" />
            )}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <HeadingTag className="text-base font-semibold text-[#111214] sm:text-lg">
                {isFailed
                  ? "Reconciliation Could Not Complete"
                  : phase === "uploading"
                    ? "Uploading Statements"
                    : "Reconciling Bank Statement & Ledger"}
              </HeadingTag>
              {status && (
                <span
                  className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase ${
                    isFailed
                      ? "bg-red-100 text-red-800"
                      : "bg-[#BDF71D] text-[#111214]"
                  }`}
                >
                  {status}
                </span>
              )}
            </div>

            <p className="mt-1 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
              {isFailed ? error || message : message || "Queued for processing..."}
            </p>

            {reconciliationId && (
              <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[11px] text-[#5A5E67]">
                <span className="font-mono">ID: {reconciliationId}</span>
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="inline-flex items-center gap-1 rounded-full bg-[#F7F8F9] px-2.5 py-0.5 font-medium text-[#111214] hover:bg-slate-200/70 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-700" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Copy ID
                    </>
                  )}
                </button>
                {createdAt && (
                  <span className="font-mono text-[#5A5E67]">
                    Started {new Date(createdAt).toLocaleTimeString()}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {!isFailed && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex min-h-[38px] items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-xs font-semibold text-[#111214] hover:bg-[#F7F8F9] transition-colors"
            >
              Stop Polling
            </button>
          )}
          <button
            type="button"
            onClick={onReset}
            className="inline-flex min-h-[38px] items-center justify-center gap-1.5 rounded-full bg-[#111214] px-4 text-xs font-semibold text-white hover:bg-black transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5 text-[#BDF71D]" />
            {isFailed ? "Try Again" : "Start Over"}
          </button>
        </div>
      </div>

      {!isFailed && (
        <div className="mt-5">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="font-medium text-[#5A5E67]">
              OCR &amp; Matching Progress
            </span>
            <span className="font-mono font-semibold text-[#111214]">
              {clampedProgress}%
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#F7F8F9]">
            <div
              className="h-full rounded-full bg-[#111214] transition-all duration-300"
              style={{ width: `${Math.max(6, clampedProgress)}%` }}
            />
          </div>
          <p className="mt-2 text-[11px] text-[#5A5E67]">
            Spreadsheets typically finish in a few seconds; multi-page scanned
            PDFs run through OCR in the background and may take 1–3 minutes.
          </p>
        </div>
      )}

      {isFailed && error && (
        <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-amber-200 bg-amber-50/80 px-4 py-3 text-xs text-amber-900">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
          <span>
            Check that both files use the same currency, contain a recognizable
            date + amount header (or clear PDF text), and provide any PDF
            passwords if encrypted.
          </span>
        </div>
      )}
    </div>
  );
}
