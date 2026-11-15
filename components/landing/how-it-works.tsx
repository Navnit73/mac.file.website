"use client";

import { useState } from "react";
import {
  CheckCircle2,
  ChevronsRight,
  FileCheck2,
  Landmark,
  Receipt,
  RotateCcw,
  Scale,
} from "lucide-react";
import { OcrPipelineIllustration } from "@/components/landing/illustrations";

export function HowItWorksSection() {
  const [postedFee, setPostedFee] = useState(false);

  return (
    <section id="how-it-works" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[79.2rem] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#111214] sm:text-5xl sm:leading-[1.12]">
            How Automated Bank Reconciliation Works
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#5A5E67] sm:text-base">
            To reconcile bank statement records accurately without brittle
            spreadsheet formulas, upload both files, set your clearing window,
            and review every flagged exception before export.
          </p>
        </div>

        {/* 2-Column Signature Bento Cards */}
        <div className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-2">
          {/* Left Card: Interactive Statement vs. Book Adjustment Tie-Out */}
          <div className="flex flex-col items-center justify-between rounded-[24px] bg-[#F7F8F9] p-5 text-center sm:rounded-[28px] sm:p-10">
            <div className="w-full max-w-sm py-2 sm:py-4">
              <div className="rounded-3xl bg-white p-5 text-left shadow-[0_24px_55px_rgba(17,18,20,0.08)] sm:p-6">
                <div className="flex items-center justify-between gap-2 text-xs text-[#5A5E67]">
                  <span className="inline-flex items-center gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#BDF71D] text-[#111214]">
                      <Landmark className="h-3 w-3" />
                    </span>
                    <span>
                      Adjusted Bank:{" "}
                      <strong className="text-[#111214]">$145,100.00</strong>
                    </span>
                  </span>
                </div>
                <div className="mt-1.5 font-mono text-[11px] text-[#5A5E67]">
                  $142,850 + $4,200 transit − $1,950 checks
                </div>

                <div className="my-3 flex items-center gap-2 font-mono text-[11px] text-[#5A5E67]">
                  <span>⇄</span>
                  <span className="truncate">
                    Unrecorded Wire Fee (−$35.00)
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#5A5E67]">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#111214] text-[#BDF71D]">
                    <CheckCircle2 className="h-3 w-3" />
                  </span>
                  <span>
                    Adjusted Book:{" "}
                    <strong className="text-[#111214]">
                      {postedFee ? "$145,100.00" : "$145,135.00"}
                    </strong>
                  </span>
                </div>
                <div
                  className={`mt-1.5 text-xl font-semibold tracking-tight sm:text-2xl ${
                    postedFee ? "text-emerald-700" : "text-[#111214]"
                  }`}
                >
                  {postedFee ? "$0.00 Variance" : "$35.00 Variance"}
                </div>

                <button
                  type="button"
                  onClick={() => setPostedFee((prev) => !prev)}
                  className="mt-5 flex min-h-[44px] w-full items-center gap-2.5 rounded-full bg-[#F7F8F9] p-1.5 pr-4 text-xs font-medium text-[#5A5E67] transition-colors hover:bg-slate-200/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214]"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                      postedFee
                        ? "bg-[#BDF71D] text-[#111214]"
                        : "bg-[#111214] text-white"
                    }`}
                  >
                    {postedFee ? (
                      <RotateCcw className="h-4 w-4" />
                    ) : (
                      <ChevronsRight className="h-4 w-4" />
                    )}
                  </span>
                  <span className="flex-1 text-center font-medium text-[#111214]">
                    {postedFee
                      ? "Fee Explained — Reset Check"
                      : "Apply $35.00 Fee & Verify Tie-Out"}
                  </span>
                </button>
              </div>
            </div>

            <div className="mt-5 max-w-md sm:mt-4">
              <h3 className="text-xl font-semibold tracking-tight text-[#111214] sm:text-2xl">
                Verify Every Discrepancy Down to Zero
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#5A5E67]">
                Stop spending hours reconciling bank statements row by row in
                Excel. reconcilebankstatement separates explained timing items and unrecorded
                wire fees from unexplained residual variance automatically.
              </p>
            </div>
          </div>

          {/* Right Card: Pipeline Illustration + Extraction Explanation */}
          <div className="flex flex-col items-center justify-between rounded-[24px] bg-[#F7F8F9] p-5 text-center sm:rounded-[28px] sm:p-10">
            <div className="w-full py-1 sm:py-2">
              <OcrPipelineIllustration />
              <div className="mt-4 flex flex-wrap justify-center gap-1.5 text-[11px] font-medium text-[#5A5E67] sm:gap-2">
                <span className="rounded-full bg-white px-3 py-1 shadow-xs">
                  1. Upload Pair
                </span>
                <span className="rounded-full bg-white px-3 py-1 shadow-xs">
                  2. Extract &amp; Match
                </span>
                <span className="rounded-full bg-white px-3 py-1 shadow-xs">
                  3. Export Report
                </span>
              </div>
            </div>

            <div className="mt-5 max-w-md sm:mt-4">
              <h3 className="text-xl font-semibold tracking-tight text-[#111214] sm:text-2xl">
                Byte-Level PDF OCR &amp; Spreadsheet Parsing
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#5A5E67]">
                Submit digital or scanned PDFs, statement images, CSV/TSV/TXT
                exports, or XLSX/XLSM workbooks directly—up to 100 MB per file
                with optional in-memory PDF password unlocking.
              </p>
            </div>
          </div>
        </div>

        {/* 3-Card Workflow Details Row */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <article className="rounded-[24px] bg-[#F7F8F9] p-6 sm:p-7">
            <span className="lime-glow-icon inline-flex h-10 w-10 items-center justify-center rounded-full text-[#111214]">
              <FileCheck2 className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-[#111214]">
              1. Amount, Date &amp; Memo Matching
            </h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#5A5E67]">
              Configurable ±0 to 31 Day Window
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#5A5E67]">
              Pair entries by exact amount and flow direction within your chosen
              tolerance window, boosted by narration similarity and reference ID
              scoring.
            </p>
          </article>

          <article className="rounded-[24px] bg-[#F7F8F9] p-6 sm:p-7">
            <span className="lime-glow-icon inline-flex h-10 w-10 items-center justify-center rounded-full text-[#111214]">
              <Scale className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-[#111214]">
              2. Bank vs. Ledger Balance Proof
            </h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#5A5E67]">
              Running-Balance Continuity Check
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#5A5E67]">
              Independently verify opening and closing math on both records,
              catch mid-statement running-balance breaks, and confirm book-to-bank
              tie-outs.
            </p>
          </article>

          <article className="rounded-[24px] bg-[#F7F8F9] p-6 sm:p-7">
            <span className="lime-glow-icon inline-flex h-10 w-10 items-center justify-center rounded-full text-[#111214]">
              <Receipt className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-[#111214]">
              3. Isolate Duplicates &amp; Mismatches
            </h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#5A5E67]">
              Dr/Cr Sign &amp; Amount Delta Detection
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#5A5E67]">
              Surface suspected duplicate groups on either file, near-matches
              with digit transpositions, and inverted debit or credit entries in
              seconds.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
