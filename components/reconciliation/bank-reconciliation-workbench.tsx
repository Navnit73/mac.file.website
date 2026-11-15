"use client";

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
  className?: string;
};

export function BankReconciliationWorkbench({
  apiBasePath,
  mode,
  pollIntervalMs,
  defaultPageSize,
  sessionStorageKey,
  onCompleted,
  defaultToleranceDays = 2,
  defaultDescriptionMatching = true,
  showWebhookOptions = true,
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

      {phase === "completed" && report && reconciliationId && (
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
