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
      className="bg-white pt-4 pb-12 sm:pt-7 sm:pb-20"
    >
      <div className="mx-auto max-w-[79.2rem] px-4 sm:px-6 lg:px-8">
        {showBreadcrumbs && (
          <nav
            aria-label="Breadcrumb"
            className="mb-3 flex flex-wrap items-center justify-center gap-1.5 text-xs text-[#474B54] sm:mb-4"
          >
            <Link href="/" className="transition-colors hover:text-[#111214]">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#7A808B]" />
            <span className="font-semibold text-[#111214]">
              Reconciliation Tool
            </span>
          </nav>
        )}

        <div className="mx-auto max-w-2xl text-center">
          <HeadingTag className="text-2xl font-semibold tracking-[-0.03em] text-[#111214] sm:text-4xl lg:text-[2.5rem] lg:leading-[1.12]">
            Upload Your Bank Statement &amp; Business Ledger
          </HeadingTag>
        </div>

        <div className="mt-5 sm:mt-8">
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
