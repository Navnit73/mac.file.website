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
  statusHeadingLevel?: "h2" | "h3";
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
  statusHeadingLevel = "h3",
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
    retryTransactions,
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
  const StatusHeading = statusHeadingLevel;

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
          headingLevel={statusHeadingLevel}
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
          <div className="rounded-2xl bg-[#E6E9EE] p-5 sm:p-8">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#111214] text-[#FF8F00]">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
                <div>
                  <StatusHeading className="text-base font-semibold text-[#111214] sm:text-lg">
                    Reconciliation Complete — Opening Preview
                  </StatusHeading>
                  <p className="mt-1 text-xs text-[#474B54] sm:text-sm">
                    Redirecting to{" "}
                    <code className="rounded bg-white px-1.5 py-0.5 font-mono text-[11px] text-[#111214]">
                      {`${previewHrefBase}/${reconciliationId}`}
                    </code>
                    ...
                  </p>
                </div>
              </div>

              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                <Link
                  href={`${previewHrefBase}/${encodeURIComponent(reconciliationId)}`}
                  className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-full bg-[#FF8F00] px-5 text-xs font-semibold text-[#111214] transition hover:bg-[#FFA000]"
                >
                  Open Preview Page
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-full bg-white px-5 text-xs font-semibold text-[#111214] transition hover:bg-[#D7DCE4]"
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
            onRetryTransactions={retryTransactions}
            onExport={exportReport}
            exportingFormat={exportingFormat}
            exportError={exportError}
            onNewReconciliation={reset}
          />
        )}
    </div>
  );
}
