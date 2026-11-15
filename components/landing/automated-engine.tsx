"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Copy,
  FileSpreadsheet,
  Scale,
  Sliders,
} from "lucide-react";
import { BENEFIT_PILLARS, UTILITY_COMPARISON } from "@/lib/landing-data";

export function AutomatedEngineSection() {
  const [sampleTolerance, setSampleTolerance] = useState(2);
  const [sampleDescMatching, setSampleDescMatching] = useState(true);

  const sampleConfidence = sampleDescMatching ? 96 : 82;
  const matchedStatus = sampleTolerance >= 2 ? "Matched" : "Date outside window";

  return (
    <section id="automated-rules" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[79.2rem] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#111214] sm:text-5xl sm:leading-[1.12]">
            Why Modern Teams Choose Purpose-Built Financial Reconciliation Software
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#5A5E67] sm:text-base">
            Unlike heavy account reconciliation software locked behind sales
            demos and ERP migrations, reconcilebankstatement runs directly from your exported
            files—pairing transactions, isolating exceptions, and exporting clean
            tie-outs in minutes.
          </p>
        </div>

        {/* 4 Key Benefit Pillars */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFIT_PILLARS.map((pillar) => (
            <article
              key={pillar.id}
              className="flex flex-col justify-between rounded-[24px] bg-[#F7F8F9] p-5 sm:p-6"
            >
              <div>
                <span className="inline-block rounded-full bg-[#BDF71D] px-3 py-0.5 font-mono text-[11px] font-semibold text-[#111214]">
                  {pillar.metric}
                </span>
                <h3 className="mt-3 text-base font-semibold leading-snug text-[#111214]">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
                  {pillar.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* 2-Column Utility Showcase */}
        <div className="mt-8 grid gap-6 sm:mt-10 lg:grid-cols-12 lg:items-stretch">
          <div className="flex flex-col justify-between rounded-[24px] bg-[#F7F8F9] p-5 sm:rounded-[28px] sm:p-8 lg:col-span-6">
            <div className="space-y-4 sm:space-y-5">
              <div className="rounded-3xl bg-white p-5 shadow-[0_14px_35px_rgba(17,18,20,0.05)] sm:p-6">
                <h3 className="text-lg font-semibold text-[#111214]">
                  Tune Date Windows &amp; Description Scoring
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5A5E67]">
                  Bank settlement dates often trail ledger postings by 1–3
                  business days. Adjust{" "}
                  <code className="rounded bg-[#F7F8F9] px-1.5 py-0.5 font-mono text-xs text-[#111214]">
                    date_tolerance_days
                  </code>{" "}
                  between 0 and 31 days and toggle{" "}
                  <code className="rounded bg-[#F7F8F9] px-1.5 py-0.5 font-mono text-xs text-[#111214]">
                    description_matching
                  </code>{" "}
                  to rank candidate pairs with explicit confidence scores.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 font-mono text-[11px]">
                  <span className="rounded-xl bg-[#111214] px-3 py-1.5 text-[#BDF71D] sm:rounded-full">
                    date_tolerance_days: 0–31
                  </span>
                  <span className="rounded-xl border border-slate-200 bg-[#F7F8F9] px-3 py-1.5 text-[#111214] sm:rounded-full">
                    description_matching: true | false
                  </span>
                </div>
              </div>

              {/* Interactive Matching Parameter Sandbox */}
              <div className="rounded-3xl bg-white p-5 shadow-[0_14px_35px_rgba(17,18,20,0.05)] sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base font-semibold text-[#111214]">
                    Interactive Matching Rule Preview
                  </h3>
                  <span
                    className={`rounded-full px-3 py-0.5 text-[11px] font-semibold ${
                      sampleTolerance >= 2
                        ? "bg-emerald-100 text-emerald-900"
                        : "bg-amber-100 text-amber-900"
                    }`}
                  >
                    {matchedStatus}
                  </span>
                </div>

                <div className="mt-4 space-y-3 rounded-2xl bg-[#F7F8F9] p-4">
                  <div className="flex items-center justify-between text-xs">
                    <label
                      htmlFor="preview-tolerance"
                      className="font-semibold text-[#111214]"
                    >
                      Date tolerance window
                    </label>
                    <span className="font-mono font-semibold text-[#111214]">
                      ±{sampleTolerance}{" "}
                      {sampleTolerance === 1 ? "day" : "days"}
                    </span>
                  </div>
                  <input
                    id="preview-tolerance"
                    type="range"
                    min={0}
                    max={5}
                    value={sampleTolerance}
                    onChange={(e) =>
                      setSampleTolerance(Number.parseInt(e.target.value, 10))
                    }
                    className="h-2 w-full cursor-pointer accent-[#111214]"
                  />

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="font-medium text-[#5A5E67]">
                      Description similarity scoring
                    </span>
                    <button
                      type="button"
                      onClick={() => setSampleDescMatching((p) => !p)}
                      className={`rounded-full px-3 py-1 font-mono text-[11px] font-semibold transition-colors ${
                        sampleDescMatching
                          ? "bg-[#111214] text-[#BDF71D]"
                          : "border border-slate-200 bg-white text-[#5A5E67]"
                      }`}
                    >
                      {sampleDescMatching ? "Enabled" : "Disabled"}
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 px-3.5 py-2.5 text-[11px]">
                  <span className="font-mono text-[#5A5E67]">
                    Bank 2026-11-04 vs Ledger 2026-11-02 (2d diff)
                  </span>
                  <span className="font-mono font-semibold text-[#111214]">
                    {sampleTolerance >= 2
                      ? `Score: ${sampleConfidence}%`
                      : "Unmatched (gap)"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Obsidian Utility Card */}
          <div className="flex flex-col justify-between overflow-hidden rounded-[24px] bg-[#111214] p-5 text-white sm:rounded-[28px] sm:p-8 lg:col-span-6">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#BDF71D] px-3 py-1 text-[11px] font-semibold text-[#111214]">
                Structured Report Breakdown
              </span>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Every Category &amp; Proof in One Output
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Every completed run classifies transactions into auditable
                buckets and runs independent math checks across both your bank
                statement and business ledger.
              </p>
            </div>

            <div className="my-5 grid gap-2.5 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5">
                <div className="flex items-center justify-between text-xs font-semibold text-white">
                  <span>Matched Transactions</span>
                  <CheckCircle2 className="h-4 w-4 text-[#BDF71D]" />
                </div>
                <p className="mt-1 text-[11px] text-white/70">
                  Confidence score, date gap, and match basis
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5">
                <div className="flex items-center justify-between text-xs font-semibold text-white">
                  <span>Bank &amp; Ledger Gaps</span>
                  <Scale className="h-4 w-4 text-[#BDF71D]" />
                </div>
                <p className="mt-1 text-[11px] text-white/70">
                  Separate unmatched bank vs. unmatched book rows
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5">
                <div className="flex items-center justify-between text-xs font-semibold text-white">
                  <span>Possible Duplicates</span>
                  <Copy className="h-4 w-4 text-amber-300" />
                </div>
                <p className="mt-1 text-[11px] text-white/70">
                  Grouped suspected repeats with transaction IDs
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5">
                <div className="flex items-center justify-between text-xs font-semibold text-white">
                  <span>Amount &amp; Direction Flips</span>
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                </div>
                <p className="mt-1 text-[11px] text-white/70">
                  Near-matches with deltas or inverted Dr/Cr signs
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Sliders className="h-4 w-4 shrink-0 text-[#BDF71D]" />
                  <h4>Book-to-Bank Proof</h4>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-white/75">
                  Quantifies explained discrepancy differences versus residual
                  unexplained variance automatically.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <FileSpreadsheet className="h-4 w-4 shrink-0 text-[#BDF71D]" />
                  <h4>Instant XLSX &amp; CSV</h4>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-white/75">
                  Download structured Excel workbooks or clean CSV reports
                  straight from any completed run.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Utility Comparison Table */}
        <div
          id="comparison"
          className="mt-12 rounded-[24px] bg-[#F7F8F9] p-5 sm:rounded-[28px] sm:p-8"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-[#111214] sm:text-2xl">
                reconcilebankstatement vs. Spreadsheets, PDF Converters &amp; Enterprise Suites
              </h3>
              <p className="mt-1 text-sm text-[#5A5E67]">
                Compare spreadsheets and basic converters against dedicated
                financial reconciliation software built for direct statement
                verification.
              </p>
            </div>
            <span className="inline-flex self-start items-center gap-1.5 rounded-full bg-[#BDF71D] px-3 py-1 text-xs font-semibold text-[#111214]">
              No Subscription Required
            </span>
          </div>

          <div
            tabIndex={0}
            role="region"
            aria-label="Reconciliation capability comparison table"
            className="mt-6 overflow-x-auto rounded-2xl bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214]"
          >
            <table className="w-full min-w-[780px] text-left text-xs sm:text-sm">
              <thead className="border-b border-slate-100 text-[11px] font-semibold uppercase tracking-wider text-[#5A5E67]">
                <tr>
                  <th className="px-4 py-3.5 sm:px-5 sm:py-4">Capability</th>
                  <th className="px-4 py-3.5 sm:px-5 sm:py-4">
                    Manual Spreadsheets
                  </th>
                  <th className="px-4 py-3.5 sm:px-5 sm:py-4">
                    Generic PDF Tools
                  </th>
                  <th className="px-4 py-3.5 sm:px-5 sm:py-4">
                    Enterprise Suites
                  </th>
                  <th className="bg-[#111214] px-4 py-3.5 text-[#BDF71D] sm:px-5 sm:py-4">
                    reconcilebankstatement Utility
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {UTILITY_COMPARISON.map((row) => (
                  <tr key={row.dimension} className="hover:bg-[#F7F8F9]/60">
                    <td className="px-4 py-3.5 font-semibold text-[#111214] sm:px-5">
                      {row.dimension}
                    </td>
                    <td className="px-4 py-3.5 text-[#5A5E67] sm:px-5">
                      {row.manualSpreadsheets}
                    </td>
                    <td className="px-4 py-3.5 text-[#5A5E67] sm:px-5">
                      {row.genericPdfTools}
                    </td>
                    <td className="px-4 py-3.5 text-[#5A5E67] sm:px-5">
                      {row.enterpriseSuites}
                    </td>
                    <td className="bg-[#111214]/[0.03] px-4 py-3.5 font-semibold text-[#111214] sm:px-5">
                      <span className="inline-flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                        {row.reconcilebankstatement}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
