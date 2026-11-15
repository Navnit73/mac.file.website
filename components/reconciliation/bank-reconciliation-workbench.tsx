"use client";

import Link from "next/link";
import { Loader2, ArrowUpRight, RotateCcw } from "lucide-react";
import {
  useReconciliation,
  type UseReconciliationOptions,
} from "@/hooks/use-reconciliation";
import { ReconciliationProgressCard } from "./reconciliation-progress-card";
import { ReconciliationReportView } from "./reconciliation-report-view";
import { ReconciliationUploadForm } from "./reconciliation-upload-form";

export type BankReconciliationWorkbenchProps = UseReconciliationOptions & {
  defaultToleranceDays?: number;
  defaultDescriptionMatching?: boolean;
  showWebhookOptions?: boolean;
  hideReportOnComplete?: boolean;
  previewHrefBase?: string;
  className?: string;
};

export function BankReconciliationWorkbench({
  apiBasePath,
  mode,
  pollIntervalMs,
  defaultPageSize,
  sessionStorageKey,
  skipInitialTransactionsFetch,
  onCompleted,
  defaultToleranceDays = 2,
  defaultDescriptionMatching = true,
  showWebhookOptions = true,
  hideReportOnComplete = false,
  previewHrefBase = "/reconcile-preview",
  className = "",
}: BankReconciliationWorkbenchProps) {
  const {
    phase,
    reconciliationId,
    lastSavedId,
    statusResponse,
    report,
    progress,
    statusMessage,
    error,
    pdfPasswordPrompt,
    transactions,
    transactionsTotal,
    transactionsLoading,
    transactionsError,
    activeCategory,
    page,
    pageSize,
    exportingFormat,
    exportError,
    start,
    resume,
    cancelPolling,
    reset,
    changeCategory,
    changePage,
    changePageSize,
    exportReport,
  } = useReconciliation({
    apiBasePath,
    mode,
    pollIntervalMs,
    defaultPageSize,
    sessionStorageKey,
    skipInitialTransactionsFetch,
    onCompleted,
  });

  const showUploadForm =
    phase === "idle" || (phase === "failed" && !reconciliationId);

  return (
    <div className={className}>
      {showUploadForm && (
        <ReconciliationUploadForm
          onSubmit={start}
          onResumeId={resume}
          lastSavedId={lastSavedId}
          isSubmitting={false}
          error={error}
          pdfPasswordPrompt={pdfPasswordPrompt}
          defaultToleranceDays={defaultToleranceDays}
          defaultDescriptionMatching={defaultDescriptionMatching}
          showWebhookOptions={showWebhookOptions}
        />
      )}

      {(phase === "uploading" ||
        phase === "processing" ||
        (phase === "failed" && Boolean(reconciliationId))) && (
        <ReconciliationProgressCard
          phase={phase}
          reconciliationId={reconciliationId}
          status={statusResponse?.status}
          progress={progress}
          message={statusMessage}
          error={error}
          createdAt={statusResponse?.created_at}
          onCancel={
            phase === "uploading" || phase === "processing"
              ? cancelPolling
              : undefined
          }
          onReset={reset}
        />
      )}

      {phase === "completed" &&
        report &&
        reconciliationId &&
        hideReportOnComplete && (
          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#111214] text-[#BDF71D]">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#111214] sm:text-lg">
                    Reconciliation Complete — Opening Preview
                  </h3>
                  <p className="mt-1 text-xs text-[#5A5E67] sm:text-sm">
                    Redirecting to{" "}
                    <code className="rounded bg-[#F7F8F9] px-1.5 py-0.5 font-mono text-[11px] text-[#111214]">
                      {`${previewHrefBase}/${reconciliationId}`}
                    </code>
                    ...
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <Link
                  href={`${previewHrefBase}/${encodeURIComponent(reconciliationId)}`}
                  className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[#111214] px-4 text-xs font-semibold text-white transition hover:bg-black"
                >
                  Open Preview Page
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex h-10 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 text-xs font-medium text-[#111214] transition hover:bg-slate-50"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  New Run
                </button>
              </div>
            </div>
          </div>
        )}

      {phase === "completed" &&
        report &&
        reconciliationId &&
        !hideReportOnComplete && (
          <ReconciliationReportView
            reconciliationId={reconciliationId}
            report={report}
            transactions={transactions}
            transactionsTotal={transactionsTotal}
            transactionsLoading={transactionsLoading}
            transactionsError={transactionsError}
            activeCategory={activeCategory}
            page={page}
            pageSize={pageSize}
            onCategoryChange={changeCategory}
            onPageChange={changePage}
            onPageSizeChange={changePageSize}
            onExport={exportReport}
            exportingFormat={exportingFormat}
            exportError={exportError}
            onNewReconciliation={reset}
          />
        )}
    </div>
  );
}
