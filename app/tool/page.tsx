import Link from "next/link";
import { ArrowRight, BookOpen, Calculator, FileSpreadsheet } from "lucide-react";
import { ToolInlineCta } from "@/components/tool/guide-blocks";
import { TrustPageShell } from "@/components/trust/trust-page-shell";
import {
  createPageMetadata,
  SITE_CONFIG,
  TOOL_GUIDE_ITEMS,
} from "@/lib/site-config";

export const metadata = createPageMetadata({
  path: "/tool",
  title: `Bank Reconciliation Tools, Examples & Guides | ${SITE_CONFIG.brandName}`,
  description:
    "Explore practical bank reconciliation guides, worked examples, step-by-step checklists, NSF and outstanding cheque tutorials, and launch the free browser tie-out tool.",
  keywords: [
    "bank statement reconciliation",
    "bank reconciliation tool",
    "bank reconciliation example",
    "account reconciliation guide",
  ],
});

export default function ToolHubPage() {
  return (
    <TrustPageShell
      path="/tool"
      pageType="CollectionPage"
      eyebrow="Tools & Accounting Guides"
      title="Bank Reconciliation Guides, Worked Examples &amp; Tie-Out Tool"
      lead="Practical accounting walkthroughs paired directly with reconcilebankstatement's browser reconciliation workbench. Master bank reconciliation steps, worked tie-out numbers, outstanding cheques, NSF returns, and balance sheet checklists—then verify real files in seconds."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Tools & Guides" },
      ]}
      heroCta={{
        label: "Open Bank Reconciliation Tool",
        href: "/reconcile",
        secondaryLabel: "Browse 8 Step-by-Step Guides",
        secondaryHref: "#guide-directory",
        note: "Free browser utility • PDF OCR, CSV, TSV, TXT & XLSX up to 100 MB • No bank credentials required",
      }}
      sections={[
        { id: "guide-directory", label: "All 8 Reconciliation Guides" },
        { id: "quick-launch", label: "Why Pair Guides With the Tool" },
      ]}
      relatedLinks={[
        {
          title: "Bank Reconciliation Workbench",
          description:
            "Upload your bank statement and business ledger directly or test with our sample CSV pair.",
          href: "/reconcile",
        },
        {
          title: "Reconciliation Methodology",
          description:
            "Inspect exact matching tolerances (±0–31 days), direction detection, and balance proofs.",
          href: "/bank-reconciliation-methodology",
        },
        {
          title: "How It Works",
          description:
            "Review all 5 pipeline stages, file caps, and export workpaper structure.",
          href: "/how-it-works",
        },
      ]}
    >
      <section id="guide-directory" className="space-y-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
              Complete Bank &amp; Account Reconciliation Library
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-[#474B54] sm:text-sm">
              Choose a topic below—from beginner definitions to worked journal
              entries and month-end balance sheet checklists.
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-200 bg-[#F8FAFC] px-3 py-1 font-mono text-[11px] font-semibold text-[#111214]">
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            {TOOL_GUIDE_ITEMS.length} Guides
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {TOOL_GUIDE_ITEMS.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group flex flex-col justify-between rounded-[24px] border border-slate-200 bg-white p-6 transition-all hover:border-[#111214]/40 hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214]"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-[#F4F6F8] px-2.5 py-0.5 font-mono text-[11px] font-semibold text-[#111214]">
                    {guide.badge}
                  </span>
                  <span className="font-mono text-[11px] text-[#5A5E67]">
                    {guide.keyword}
                  </span>
                </div>
                <h3 className="mt-3 text-base font-semibold leading-snug text-[#111214] group-hover:underline sm:text-lg">
                  {guide.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#474B54] sm:text-sm">
                  {guide.description}
                </p>
              </div>
              <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#111214]">
                Read guide &amp; examples
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <ToolInlineCta
        eyebrow="Instant File Verification"
        title="Ready to Reconcile Real Statements Instead of Manual Spreadsheets?"
        description="Drop your bank statement (digital or scanned PDF, image, CSV, TSV, TXT, or XLSX) and your business ledger into the workbench. Isolate unmatched bank fees, uncleared cheques, duplicates, and sign flips in one pass."
        buttonLabel="Start Free Reconciliation"
        href="/reconcile"
        secondaryLabel="See Matching Methodology"
        secondaryHref="/bank-reconciliation-methodology"
        highlights={[
          "PDF OCR up to 200 pages",
          "±0–31 day window",
          "XLSX & CSV export",
        ]}
      />

      <section
        id="quick-launch"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          Built for Global Bookkeepers, Founders &amp; Finance Teams
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#111214]">
              <Calculator className="h-4 w-4 text-emerald-800" aria-hidden="true" />
              <h3>Worked Math You Can Audit</h3>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[#474B54] sm:text-sm">
              Every guide distinguishes clearly between bank-side timing items
              (deposits in transit and outstanding cheques) and book-side
              adjustments requiring journal entries (bank charges, interest, NSF
              returns, and transposition errors).
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#111214]">
              <FileSpreadsheet className="h-4 w-4 text-emerald-800" aria-hidden="true" />
              <h3>US, UK &amp; EU Format Ready</h3>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[#474B54] sm:text-sm">
              Supports US checks and MM/DD/YYYY dates, UK cheques and
              DD/MM/YYYY Faster Payments exports, and Continental EU SEPA
              statements with comma decimals and 6 header languages.
            </p>
          </div>
        </div>
      </section>
    </TrustPageShell>
  );
}
