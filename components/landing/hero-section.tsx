import {
  ArrowRight,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  Lock,
  ScanText,
  SlidersHorizontal,
} from "lucide-react";
import { HeroReconciliationIllustration } from "@/components/landing/illustrations";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-white pt-8 pb-8 sm:pt-12 sm:pb-14"
    >
      <div className="mx-auto max-w-[79.2rem] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Copy & Conversion Column */}
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F7F8F9] px-3.5 py-1.5 text-xs font-semibold text-[#111214] border border-slate-200/80">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-700" />
              <span>
                Direct Financial Reconciliation Software • No Account Required
              </span>
            </span>

            <h1 className="mt-4 text-3xl font-semibold tracking-[-0.035em] leading-[1.1] text-[#111214] sm:text-5xl lg:text-[3.15rem] lg:leading-[1.06]">
              Reconcile Bank Statement Files Against Your Ledger in Seconds
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#5A5E67] sm:mt-5 sm:text-base">
              Upload digital or scanned PDFs, statement images, CSV, or XLSX
              files to reconcile bank statement records against your business
              ledger, corporate card export, or cash book. Spot gaps,
              duplicates, and mismatches instantly—then export clean XLSX or CSV
              reports.
            </p>

            <div className="mt-6 flex flex-col items-stretch gap-3 min-[440px]:flex-row min-[440px]:items-center">
              <a
                href="#reconcile-workbench"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#111214] px-7 text-xs font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214] focus-visible:ring-offset-2 sm:text-sm"
              >
                Start Reconciliation Tool
                <ArrowRight className="h-4 w-4 text-[#BDF71D]" />
              </a>
              <a
                href="#how-to-use"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-white px-6 text-xs font-semibold text-[#111214] transition-colors hover:bg-[#F7F8F9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214] focus-visible:ring-offset-2 sm:text-sm"
              >
                See Step-by-Step Guide
              </a>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#5A5E67]">
              <a
                href="#reconciliation-guide"
                className="font-medium text-[#111214] underline decoration-slate-300 underline-offset-4 hover:decoration-[#111214]"
              >
                Learn account reconciliation meaning &amp; common errors
              </a>
              <span aria-hidden="true" className="text-slate-300">
                •
              </span>
              <a
                href="#use-cases"
                className="font-medium text-[#111214] underline decoration-slate-300 underline-offset-4 hover:decoration-[#111214]"
              >
                US, UK &amp; EU format guide
              </a>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-2">
              <div className="flex items-center gap-2.5 rounded-2xl bg-[#F7F8F9] px-3.5 py-2.5 text-xs font-medium text-[#111214]">
                <ScanText className="h-4 w-4 shrink-0 text-[#111214]" />
                <span>Scanned &amp; Locked PDF OCR</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-2xl bg-[#F7F8F9] px-3.5 py-2.5 text-xs font-medium text-[#111214]">
                <SlidersHorizontal className="h-4 w-4 shrink-0 text-[#111214]" />
                <span>±0 to 31 Day Tolerance</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-2xl bg-[#F7F8F9] px-3.5 py-2.5 text-xs font-medium text-[#111214]">
                <FileSpreadsheet className="h-4 w-4 shrink-0 text-[#111214]" />
                <span>CSV, TSV, TXT &amp; XLSX</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-2xl bg-[#F7F8F9] px-3.5 py-2.5 text-xs font-medium text-[#111214]">
                <Download className="h-4 w-4 shrink-0 text-[#111214]" />
                <span>XLSX &amp; CSV Tie-Out Export</span>
              </div>
            </div>
          </div>

          {/* Right Purposeful Editorial Illustration Column */}
          <div className="lg:col-span-6">
            <HeroReconciliationIllustration />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-[11px] font-medium text-[#5A5E67]">
              <span className="inline-flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-[#111214]" />
                No bank login credentials needed • Encrypted PDFs unlock in memory
              </span>
              <span className="font-mono text-[#111214]">
                ISO 4217 • Up to 100 MB
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
