import { Suspense } from "react";
import type { Metadata } from "next";
import { ReconciliationPreviewClient } from "@/components/reconciliation";

export const metadata: Metadata = {
  title: "Reconciliation Preview | ClearTie",
  description:
    "Inspect balance verification checks, matched transactions, discrepancies, and XLSX/CSV exports for your bank statement reconciliation run.",
  robots: {
    index: false,
    follow: false,
  },
};

function PreviewLoadingFallback() {
  return (
    <div className="min-h-screen bg-[#F7F8F9] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[79.2rem] space-y-6">
        <div className="h-12 rounded-full bg-[#111214]/90" />
        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
          <div className="h-5 w-48 animate-pulse rounded bg-slate-200" />
          <div className="mt-3 h-3 w-80 max-w-full animate-pulse rounded bg-slate-100" />
          <div className="mt-6 h-2.5 w-full animate-pulse rounded-full bg-slate-100" />
        </div>
      </div>
    </div>
  );
}

export default function ReconcilePreviewPage() {
  return (
    <Suspense fallback={<PreviewLoadingFallback />}>
      <ReconciliationPreviewClient />
    </Suspense>
  );
}
