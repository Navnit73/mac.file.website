"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Building2,
  CreditCard,
  FileSpreadsheet,
  Landmark,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { BRAND, QUICK_GUIDES } from "@/lib/landing-data";
import { GuideModal } from "@/components/landing/guide-modal";

export function ReconciliationWorkflowsSection() {
  const [activeGuideId, setActiveGuideId] = useState<
    "bank" | "credit-card" | "balance-sheet" | null
  >(null);

  return (
    <>
      <section id="use-cases" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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

          {/* 3-Column Symmetric Lime Centerpiece Layout */}
          <div className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-12 lg:items-stretch">
            {/* Left Stack: Bank Account & Credit Card Use Cases */}
            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-3 lg:flex lg:flex-col">
              <article className="flex flex-1 flex-col items-center justify-between rounded-[24px] bg-[#F7F8F9] p-6 text-center sm:rounded-[28px] sm:p-7">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <span className="lime-glow-icon flex h-14 w-14 items-center justify-center rounded-full text-[#111214]">
                      <Landmark className="h-6 w-6" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute -right-2 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[11px] font-bold text-[#111214] shadow-md"
                    >
                      $
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-[#111214]">
                    Bank Account Reconciliation
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#5A5E67]">
                    Compare checking, savings, and treasury statements against
                    your cash book to isolate wire fees, NSF checks, and timing
                    items.
                  </p>
                  <div className="mt-3 w-full rounded-2xl bg-white p-3 text-left">
                    <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#5A5E67]">
                      Checking, Savings &amp; Cash Books
                    </h4>
                    <h5 className="mt-1 text-xs font-semibold text-[#111214]">
                      Bank-Only vs. Book-Only Lists
                    </h5>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-[#5A5E67]">
                      Filter unmatched lines directly to track deposits in
                      transit and uncleared payments.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveGuideId("bank")}
                  className="mt-4 inline-flex min-h-[36px] items-center gap-1 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-[#111214] shadow-xs transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214]"
                >
                  Bank rec guide
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </article>

              <article className="flex flex-1 flex-col items-center justify-between rounded-[24px] bg-[#F7F8F9] p-6 text-center sm:rounded-[28px] sm:p-7">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <span className="lime-glow-icon flex h-14 w-14 items-center justify-center rounded-full text-[#111214]">
                      <CreditCard className="h-6 w-6" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute -right-2 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[11px] font-bold text-[#111214] shadow-md"
                    >
                      ±
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-[#111214]">
                    Credit Card Reconciliation
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#5A5E67]">
                    Match corporate Visa, Mastercard, or Amex PDF/CSV statements
                    against expense ledgers to catch duplicate billings and FX
                    fees.
                  </p>
                  <div className="mt-3 w-full rounded-2xl bg-white p-3 text-left">
                    <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#5A5E67]">
                      Corporate Card Statements
                    </h4>
                    <h5 className="mt-1 text-xs font-semibold text-[#111214]">
                      Pending Authorizations &amp; Refunds
                    </h5>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-[#5A5E67]">
                      Widen tolerance days for delayed posting and spot reversed
                      refund directions.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveGuideId("credit-card")}
                  className="mt-4 inline-flex min-h-[36px] items-center gap-1 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-[#111214] shadow-xs transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214]"
                >
                  Card rec guide
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </article>
            </div>

            {/* Centerpiece Vibrant Acid-Lime Formula & Proof Showcase */}
            <div className="lime-showcase-surface relative flex flex-col justify-between overflow-hidden rounded-[28px] p-5 sm:rounded-[32px] sm:p-8 lg:col-span-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#111214] px-3.5 py-1.5 text-xs font-semibold text-white">
                  <span className="h-2 w-2 rounded-full bg-[#BDF71D]" />
                  True Cash Formula • {BRAND.name}
                </div>
                <span className="rounded-full bg-white/90 px-3 py-1 font-mono text-[11px] font-semibold text-[#111214]">
                  $0.00 Variance Goal
                </span>
              </div>

              <div className="mt-5 rounded-2xl bg-white/90 p-4 backdrop-blur-sm">
                <h3 className="text-base font-semibold text-[#111214] sm:text-lg">
                  Adjusted Bank Balance Equals Adjusted Book Balance
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[#111214]/80">
                  Both sides prove out toward the same ending cash figure while
                  keeping timing differences, unrecorded fees, and errors fully
                  transparent.
                </p>
              </div>

              <div className="my-5 grid gap-4 sm:grid-cols-2 sm:items-end">
                <div className="rounded-[24px] bg-[#111214] p-5 text-white shadow-2xl">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#BDF71D] text-[#111214]">
                      <Scale className="h-4 w-4" />
                    </span>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-white/90">
                      Tie-Out Formula
                    </h4>
                  </div>
                  <h5 className="mt-4 text-xs font-medium text-white/75">
                    Timing Items vs. Book Adjustments
                  </h5>
                  <div className="mt-1 font-mono text-2xl font-semibold tracking-tight text-[#BDF71D]">
                    $86,600.00
                  </div>
                  <div className="mt-4 space-y-2 border-t border-white/10 pt-3 font-mono text-[11px] text-white/85">
                    <div className="flex justify-between gap-2">
                      <span className="truncate">Statement Ending</span>
                      <span className="shrink-0">$84,920.00</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="truncate">+ Deposits in Transit</span>
                      <span className="shrink-0 text-[#BDF71D]">+$3,150.00</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="truncate">− Outstanding Checks</span>
                      <span className="shrink-0 text-amber-300">−$1,470.00</span>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[24px] bg-white shadow-2xl">
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src="/images/bank-reconciliation-workspace.jpg"
                      alt="Workstation monitor displaying ClearTie side-by-side bank statement and general ledger reconciliation with $0.00 variance"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-[11px] font-medium text-[#5A5E67]">
                      Statement &amp; Ledger Tie-Out
                    </div>
                    <div className="mt-1 font-mono text-[11px] font-semibold text-[#111214]">
                      Bank Statement ↔ Business Ledger
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-white/90 px-4 py-3 text-xs font-medium text-[#111214] backdrop-blur-sm">
                <span className="inline-flex items-center gap-1.5">
                  <FileSpreadsheet className="h-3.5 w-3.5 shrink-0" />
                  XLSX &amp; CSV Workpapers Included
                </span>
                <span className="font-mono text-[11px] text-[#5A5E67]">
                  All ISO 4217 Currencies
                </span>
              </div>
            </div>

            {/* Right Stack: Balance Sheet & US/UK/EU Multi-Language Exports */}
            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-3 lg:flex lg:flex-col">
              <article className="flex flex-1 flex-col items-center justify-between rounded-[24px] bg-[#F7F8F9] p-6 text-center sm:rounded-[28px] sm:p-7">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <span className="lime-glow-icon flex h-14 w-14 items-center justify-center rounded-full text-[#111214]">
                      <ShieldCheck className="h-6 w-6" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute -right-2 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[11px] font-bold text-[#111214] shadow-md"
                    >
                      =
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-[#111214]">
                    Balance Sheet Account Reconciliation
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#5A5E67]">
                    Substantiate cash, clearing, and subledger balances against
                    external source statements before month-end close and
                    external audits.
                  </p>
                  <div className="mt-3 w-full rounded-2xl bg-white p-3 text-left">
                    <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#5A5E67]">
                      Month-End Close Proof
                    </h4>
                    <h5 className="mt-1 text-xs font-semibold text-[#111214]">
                      Running-Balance &amp; Variance Tie-Out
                    </h5>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-[#5A5E67]">
                      Verify opening + net flow = closing balance with
                      downloadable XLSX audit trails.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveGuideId("balance-sheet")}
                  className="mt-4 inline-flex min-h-[36px] items-center gap-1 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-[#111214] shadow-xs transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214]"
                >
                  Balance sheet guide
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </article>

              <article className="flex flex-1 flex-col items-center justify-center rounded-[24px] bg-[#F7F8F9] p-6 text-center sm:rounded-[28px] sm:p-7">
                <div className="relative">
                  <span className="lime-glow-icon flex h-14 w-14 items-center justify-center rounded-full text-[#111214]">
                    <Building2 className="h-6 w-6" />
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute -right-2 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[11px] font-bold text-[#111214] shadow-md"
                  >
                    ✓
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#111214]">
                  US, UK &amp; EU Multi-Language Exports
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#5A5E67]">
                  Parses English, German, French, Spanish, Portuguese, and Dutch
                  headers plus UTF-16 Unicode and HTML/XML bank exports across
                  USD, GBP, and EUR.
                </p>
                <div className="mt-3 w-full rounded-2xl bg-white p-3 text-left">
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#5A5E67]">
                    Currency Normalization
                  </h4>
                  <h5 className="mt-1 text-xs font-semibold text-[#111214]">
                    Handles Dr/Cr &amp; Parentheses
                  </h5>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-[#5A5E67]">
                    Preserves decimal precision across European, UK, and US bank
                    export conventions.
                  </p>
                </div>
              </article>
            </div>
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
