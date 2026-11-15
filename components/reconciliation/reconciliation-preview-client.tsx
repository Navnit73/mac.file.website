"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Check, Copy, Plus } from "lucide-react";
import { BrandLogoMark } from "@/components/landing/brand-logo";
import { SiteFooter } from "@/components/landing/site-footer";
import { useReconciliation } from "@/hooks/use-reconciliation";
import { BRAND } from "@/lib/landing-data";
import { ReconciliationProgressCard } from "./reconciliation-progress-card";
import { ReconciliationReportView } from "./reconciliation-report-view";

function decodeRouteId(rawId: string | string[] | undefined): string {
  const value = Array.isArray(rawId) ? rawId[0] : rawId;
  if (!value) return "";
  try {
    return decodeURIComponent(value).trim();
  } catch {
    return value.trim();
  }
}

/**
 * Dedicated client preview workspace that loads a reconciliation run by route ID,
 * polls while still processing, and renders the full interactive tie-out report.
 */
export function ReconciliationPreviewClient() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const routeId = decodeRouteId(params?.id);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const {
    phase,
    reconciliationId,
    statusResponse,
    report,
    progress,
    statusMessage,
    error,
    transactions,
    transactionsTotal,
    transactionsLoading,
    transactionsError,
    activeCategory,
    page,
    pageSize,
    exportingFormat,
    exportError,
    resume,
    cancelPolling,
    changeCategory,
    changePage,
    changePageSize,
    exportReport,
  } = useReconciliation();

  useEffect(() => {
    if (!routeId) return;
    void resume(routeId);
  }, [routeId, resume]);

  const activeId = reconciliationId || routeId;

  const handleCopyPreviewLink = async () => {
    if (!activeId || typeof window === "undefined") return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 1800);
    } catch {
      // Ignore clipboard permission errors
    }
  };

  const handleStartAnother = () => {
    cancelPolling();
    router.push("/reconcile");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F8F9] text-[#111214]">
      <header className="sticky top-0 z-40 w-full bg-[#F7F8F9]/90 pt-3 pb-2 backdrop-blur-md sm:pt-4">
        <div className="mx-auto max-w-[79.2rem] px-3 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-full bg-[#111214] px-3 py-2 shadow-lg shadow-black/10 sm:px-4">
            <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
              <Link
                href="/"
                className="group flex items-center gap-2 rounded-full pl-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BDF71D] sm:gap-2.5 sm:pl-1.5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#BDF71D] text-[#111214] transition-transform duration-200 group-hover:scale-105">
                  <BrandLogoMark className="h-4 w-4" />
                </span>
                <span className="text-xs font-semibold tracking-wider text-white uppercase sm:text-sm">
                  {BRAND.name}
                </span>
              </Link>

              <span className="hidden h-4 w-px bg-white/15 sm:inline-block" />

              <span className="hidden truncate text-xs font-medium text-white/75 sm:inline">
                Reconciliation Preview
              </span>

              {activeId && (
                <button
                  type="button"
                  onClick={handleCopyPreviewLink}
                  title="Copy preview URL"
                  className="inline-flex max-w-[11rem] items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 font-mono text-[11px] text-[#BDF71D] transition hover:bg-white/15 sm:max-w-[18rem]"
                >
                  <span className="truncate">{activeId}</span>
                  {copiedUrl ? (
                    <Check className="h-3 w-3 shrink-0" />
                  ) : (
                    <Copy className="h-3 w-3 shrink-0 text-white/70" />
                  )}
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <Link
                href="/reconcile"
                className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#BDF71D] px-3.5 text-xs font-semibold text-[#111214] transition hover:bg-[#cffb4e]"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>New Run</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[79.2rem] flex-1 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[11px] font-semibold tracking-wider text-[#5A5E67] uppercase">
              Dedicated Tie-Out Preview
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[#111214] sm:text-3xl">
              Bank Statement Reconciliation Report
            </h1>
          </div>
          {activeId && (
            <p className="font-mono text-xs text-[#5A5E67]">
              Run ID: <span className="font-semibold text-[#111214]">{activeId}</span>
            </p>
          )}
        </div>

        {!routeId && (
          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
            <h2 className="text-base font-semibold text-[#111214]">
              Missing reconciliation ID
            </h2>
            <p className="mt-1.5 text-sm text-[#5A5E67]">
              Open the reconciliation workbench to upload statements or load an
              existing run ID.
            </p>
            <div className="mt-4">
              <Link
                href="/reconcile"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-[#111214] px-5 text-xs font-semibold text-white transition hover:bg-black"
              >
                Go to Reconciliation Workbench
              </Link>
            </div>
          </div>
        )}

        {routeId && phase !== "completed" && (
          <div className="space-y-4">
            <ReconciliationProgressCard
              headingLevel="h2"
              phase={phase === "idle" ? "processing" : phase}
              reconciliationId={activeId}
              status={statusResponse?.status}
              progress={phase === "idle" ? 15 : progress}
              message={
                phase === "idle"
                  ? "Loading reconciliation preview..."
                  : statusMessage
              }
              error={error}
              createdAt={statusResponse?.created_at}
              onReset={handleStartAnother}
            />
          </div>
        )}

        {routeId && phase === "completed" && report && activeId && (
          <ReconciliationReportView
            reconciliationId={activeId}
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
            onNewReconciliation={handleStartAnother}
          />
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
