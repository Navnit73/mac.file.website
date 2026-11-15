"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Building2,
  CreditCard,
  FileSpreadsheet,
  Landmark,
  Scale,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { BRAND, QUICK_GUIDES } from "@/lib/landing-data";
import { GuideModal } from "@/components/landing/guide-modal";

type WorkflowGuideId = "bank" | "credit-card" | "balance-sheet";

type WorkflowPillar = {
  id: WorkflowGuideId;
  icon: LucideIcon;
  title: string;
  summary: string;
  eyebrow: string;
  subhead: string;
  detail: string;
  ctaLabel: string;
};

const WORKFLOW_PILLARS: WorkflowPillar[] = [
  {
    id: "bank",
    icon: Landmark,
    title: "Bank Account Reconciliation",
    summary:
      "Compare checking, savings, and treasury statements against your cash book to isolate wire fees, NSF checks, and timing items.",
    eyebrow: "Checking, Savings & Cash Books",
    subhead: "Bank-Only vs. Book-Only Lists",
    detail:
      "Filter unmatched lines directly to track deposits in transit and uncleared payments.",
    ctaLabel: "Bank rec guide",
  },
  {
    id: "credit-card",
    icon: CreditCard,
    title: "Credit Card Reconciliation",
    summary:
      "Match corporate Visa, Mastercard, or Amex PDF/CSV statements against expense ledgers to catch duplicate billings and FX fees.",
    eyebrow: "Corporate Card Statements",
    subhead: "Pending Authorizations & Refunds",
    detail:
      "Widen tolerance days for delayed posting and spot reversed refund directions.",
    ctaLabel: "Card rec guide",
  },
  {
    id: "balance-sheet",
    icon: ShieldCheck,
    title: "Balance Sheet Account Reconciliation",
    summary:
      "Substantiate cash, clearing, and subledger balances against external source statements before month-end close and audits.",
    eyebrow: "Month-End Close Proof",
    subhead: "Running-Balance & Variance Tie-Out",
    detail:
      "Verify opening + net flow = closing balance with downloadable XLSX audit trails.",
    ctaLabel: "Balance sheet guide",
  },
];

export function ReconciliationWorkflowsSection() {
  const [activeGuideId, setActiveGuideId] = useState<WorkflowGuideId | null>(
    null
  );

  return (
    <>
      <section id="use-cases" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-[79.2rem] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#111214] sm:text-5xl sm:leading-[1.12]">
              Built for Bank, Credit Card &amp; Balance Sheet Reconciliations
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#5A5E67] sm:text-base">
              Reliable reconciliation for accounting teams requires clear
              exception handling across US, UK, and EU statement formats—whether
              you check daily cash books, corporate cards, or month-end
              schedules.
            </p>
          </div>

          {/* Primary 3-Pillar Workflow Grid */}
          <div className="mt-10 grid gap-5 sm:mt-12 md:grid-cols-3">
            {WORKFLOW_PILLARS.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.id}
                  className="flex flex-col justify-between rounded-[24px] border border-slate-200/70 bg-[#F7F8F9] p-6 sm:p-7"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="lime-glow-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-[#111214]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveGuideId(item.id)}
                        className="inline-flex min-h-[34px] items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#111214] ring-1 ring-slate-200/80 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214]"
                      >
                        {item.ctaLabel}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <h3 className="mt-5 text-lg font-semibold tracking-[-0.015em] text-[#111214] sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5A5E67]">
                      {item.summary}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-slate-200/80 pt-4">
                    <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#5A5E67]">
                      {item.eyebrow}
                    </h4>
                    <h5 className="mt-1.5 text-sm font-semibold text-[#111214]">
                      {item.subhead}
                    </h5>
                    <p className="mt-1 text-xs leading-relaxed text-[#5A5E67]">
                      {item.detail}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          {/* True Cash Proof & Regional Export Support */}
          <div className="mt-5 grid gap-5 lg:grid-cols-12 lg:items-stretch">
            <div className="lime-showcase-surface rounded-[24px] p-6 sm:rounded-[28px] sm:p-8 lg:col-span-8">
              <div className="grid h-full gap-6 md:grid-cols-12 md:items-center">
                <div className="flex h-full flex-col justify-between gap-6 md:col-span-7">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#111214] px-3.5 py-1.5 text-xs font-semibold text-white">
                      <span className="h-2 w-2 rounded-full bg-[#BDF71D]" />
                      True Cash Formula • {BRAND.name}
                    </div>

                    <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-[#111214] sm:text-2xl sm:leading-[1.2]">
                      Adjusted Bank Balance Equals Adjusted Book Balance
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#111214]/80">
                      Both sides prove out toward the same ending cash figure
                      while keeping timing differences, unrecorded fees, and
                      errors transparent.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#111214]/15 pt-4 text-xs font-semibold text-[#111214]">
                    <span className="inline-flex items-center gap-1.5">
                      <FileSpreadsheet className="h-4 w-4 shrink-0" />
                      XLSX &amp; CSV Workpapers Included
                    </span>
                    <span className="font-mono text-[#111214]/75">
                      $0.00 Variance Goal • All ISO 4217
                    </span>
                  </div>
                </div>

                <div className="rounded-[20px] bg-[#111214] p-5 text-white shadow-xl md:col-span-5 sm:p-6">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#BDF71D] text-[#111214]">
                      <Scale className="h-4 w-4" />
                    </span>
                    <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-white/90">
                      Tie-Out Formula
                    </h4>
                  </div>

                  <h5 className="mt-4 text-xs font-medium text-white/70">
                    Timing Items vs. Book Adjustments
                  </h5>
                  <div className="mt-1 font-mono text-2xl font-semibold tracking-tight text-[#BDF71D]">
                    $86,600.00
                  </div>

                  <div className="mt-4 space-y-2 border-t border-white/10 pt-3.5 font-mono text-xs text-white/85">
                    <div className="flex justify-between gap-2">
                      <span className="text-white/75">Statement Ending</span>
                      <span>$84,920.00</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-white/75">+ Deposits in Transit</span>
                      <span className="text-[#BDF71D]">+$3,150.00</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-white/75">− Outstanding Checks</span>
                      <span className="text-amber-300">−$1,470.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <article className="flex flex-col justify-between rounded-[24px] border border-slate-200/70 bg-[#F7F8F9] p-6 sm:rounded-[28px] sm:p-7 lg:col-span-4">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="lime-glow-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-[#111214]">
                    <Building2 className="h-5 w-5" />
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 font-mono text-[11px] font-semibold text-[#5A5E67] ring-1 ring-slate-200/80">
                    US · UK · EU
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold tracking-[-0.015em] text-[#111214] sm:text-xl">
                  US, UK &amp; EU Multi-Language Exports
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5A5E67]">
                  Parses English, German, French, Spanish, Portuguese, and Dutch
                  headers plus UTF-16 Unicode and HTML/XML bank exports across
                  USD, GBP, and EUR.
                </p>
              </div>

              <div className="mt-6 border-t border-slate-200/80 pt-4">
                <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#5A5E67]">
                  Currency Normalization
                </h4>
                <h5 className="mt-1.5 text-sm font-semibold text-[#111214]">
                  Handles Dr/Cr &amp; Parentheses
                </h5>
                <p className="mt-1 text-xs leading-relaxed text-[#5A5E67]">
                  Preserves decimal precision across European, UK, and US bank
                  export conventions.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <GuideModal
        guide={activeGuideId ? QUICK_GUIDES[activeGuideId] : null}
        onClose={() => setActiveGuideId(null)}
      />
    </>
  );
}
