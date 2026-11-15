"use client";

import {
  CheckCircle2,
  FileSpreadsheet,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { BankReconciliationWorkbench } from "@/components/reconciliation";

export function ReconciliationWorkbenchSection() {
  return (
    <section id="reconcile-workbench" className="bg-white py-8 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#111214] px-3.5 py-1 text-xs font-semibold text-[#BDF71D]">
            <Sparkles className="h-3.5 w-3.5 shrink-0" />
            <span>Interactive Reconciliation Workbench</span>
          </span>
          <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-[#111214] sm:text-4xl sm:leading-[1.15]">
            Upload Your Bank Statement &amp; Business Ledger
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#5A5E67] sm:text-base">
            Drop both documents below to reconcile bank statement entries with
            configurable date tolerances, verify opening and closing balances,
            and inspect discrepancies by category. Or click{" "}
            <strong className="font-semibold text-[#111214]">
              Load Sample CSV Pair
            </strong>{" "}
            to see a full tie-out run immediately.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-[11px] font-medium text-[#5A5E67]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F7F8F9] px-3 py-1">
              <FileSpreadsheet className="h-3.5 w-3.5 text-[#111214]" />
              PDF OCR, JPG/PNG/TIFF, CSV, TSV, TXT, XLSX/XLSM
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F7F8F9] px-3 py-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" />
              All ISO 4217 Currencies
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F7F8F9] px-3 py-1">
              <ShieldCheck className="h-3.5 w-3.5 text-[#111214]" />
              In-Memory PDF Unlock
            </span>
          </div>
        </div>

        <div className="mt-8 rounded-[28px] border border-slate-200/70 bg-[#F7F8F9] p-4 shadow-[0_20px_50px_rgba(17,18,20,0.04)] sm:mt-10 sm:rounded-[32px] sm:p-8">
          <div className="mb-5 grid gap-2 rounded-2xl bg-white px-4 py-3 text-xs text-[#5A5E67] sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#111214] font-mono text-[10px] font-bold text-[#BDF71D]">
                1
              </span>
              <span className="font-medium text-[#111214]">
                Drop Statement &amp; Ledger
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#111214] font-mono text-[10px] font-bold text-[#BDF71D]">
                2
              </span>
              <span className="font-medium text-[#111214]">
                Set Date Tolerance (0–31d)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#111214] font-mono text-[10px] font-bold text-[#BDF71D]">
                3
              </span>
              <span className="font-medium text-[#111214]">
                Inspect Gaps &amp; Export XLSX/CSV
              </span>
            </div>
          </div>

          <BankReconciliationWorkbench />
        </div>
      </div>
    </section>
  );
}
