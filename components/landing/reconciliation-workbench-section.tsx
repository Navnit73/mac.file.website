"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { BankReconciliationWorkbench } from "@/components/reconciliation";

export type ReconciliationWorkbenchSectionProps = {
  headingLevel?: "h1" | "h2";
  showBreadcrumbs?: boolean;
};

export function ReconciliationWorkbenchSection({
  headingLevel = "h1",
  showBreadcrumbs = true,
}: ReconciliationWorkbenchSectionProps) {
  const router = useRouter();
  const HeadingTag = headingLevel;

  return (
    <section
      id="reconcile-workbench"
      className="bg-white pt-6 pb-14 sm:pt-8 sm:pb-20"
    >
      <div className="mx-auto max-w-[79.2rem] px-4 sm:px-6 lg:px-8">
        {showBreadcrumbs && (
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex items-center justify-center gap-1.5 text-xs text-[#5A5E67]"
          >
            <Link href="/" className="transition-colors hover:text-[#111214]">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="font-medium text-[#111214]">
              Reconciliation Tool
            </span>
          </nav>
        )}

        <div className="mx-auto max-w-3xl text-center">
          <HeadingTag className="text-3xl font-semibold tracking-[-0.03em] text-[#111214] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
            Upload Your Bank Statement &amp; Business Ledger
          </HeadingTag>
        </div>

        <div className="mt-7 sm:mt-8">
          <BankReconciliationWorkbench
            skipInitialTransactionsFetch
            hideReportOnComplete
            statusHeadingLevel={headingLevel === "h1" ? "h2" : "h3"}
            onCompleted={(id) => {
              router.push(`/reconcile-preview/${encodeURIComponent(id)}`);
            }}
          />
        </div>
      </div>
    </section>
  );
}
