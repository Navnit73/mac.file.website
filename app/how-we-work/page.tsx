import Link from "next/link";
import { createPageMetadata, SITE_CONFIG } from "@/lib/site-config";
import { TrustPageShell } from "@/components/trust/trust-page-shell";

export const metadata = createPageMetadata({
  path: "/how-we-work",
  title: `How We Work | ${SITE_CONFIG.brandName} Engineering & Quality Standards`,
  description:
    "How reconcilebankstatement develops bank statement reconciliation software: byte-level parsing, deterministic math checks, transparency over black-box automation, and known limits.",
});

export default function HowWeWorkPage() {
  return (
    <TrustPageShell
      path="/how-we-work"
      eyebrow="Product Engineering & Quality"
      title="How We Work: Building Auditable Reconciliation Software"
      lead="Financial software earns trust when finance teams can verify how every line was matched and why every exception was flagged. Here are the product principles guiding how reconcilebankstatement.online is built and maintained."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "How We Work" },
      ]}
      sections={[
        { id: "design-philosophy", label: "Reconciliation Philosophy" },
        { id: "engineering-standards", label: "Quality & Parsing Standards" },
        { id: "limitations-honesty", label: "Transparency About Limits" },
      ]}
      relatedLinks={[
        {
          title: "Reconciliation Methodology",
          description:
            "Detailed look at matching criteria, tolerance windows, and balance equations.",
          href: "/bank-reconciliation-methodology",
        },
        {
          title: "Data Accuracy Policy",
          description:
            "See where OCR and automated matching require human bookkeeper judgment.",
          href: "/data-accuracy-policy",
        },
        {
          title: "About Us",
          description:
            "Why we focus on direct statement-to-ledger tie-out instead of bank logins.",
          href: "/about-us",
        },
      ]}
    >
      <section
        id="design-philosophy"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          1. Evidence Over Silent Auto-Adjustments
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67] sm:text-base">
          Bank reconciliation software should never silently rewrite your general
          ledger to make a variance disappear. Our workflow is read-only toward
          your uploaded sources: we parse both documents, pair transactions using
          explicit amount, date-window, and optional narration signals, check
          running and closing balances, and export a structured report separating{" "}
          <strong className="text-[#111214]">Matched</strong>,{" "}
          <strong className="text-[#111214]">Unmatched Bank</strong>,{" "}
          <strong className="text-[#111214]">Unmatched Ledger</strong>,{" "}
          <strong className="text-[#111214]">Possible Duplicates</strong>, and{" "}
          <strong className="text-[#111214]">Amount Mismatches</strong>.
        </p>
      </section>

      <section
        id="engineering-standards"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          2. Real-World Statement Resilience
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-5">
            <h3 className="text-sm font-semibold text-[#111214] sm:text-base">
              Byte-Level Format Detection
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
              Many regional banks download HTML tables or UTF-16 TSV files named
              with a <code>.xls</code> or <code>.csv</code> extension. Our
              ingestion layer inspects actual file bytes so valid exports
              don&apos;t break on strict extension assumptions.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-5">
            <h3 className="text-sm font-semibold text-[#111214] sm:text-base">
              Decimal Precision Preservation
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
              European comma decimals (<code>1.250,40</code>), UK/US period
              decimals (<code>1,250.40</code>), <code>Dr/Cr</code> suffixes, and
              accounting parentheses <code>($35.00)</code> are normalized
              carefully before arithmetic checks.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-5">
            <h3 className="text-sm font-semibold text-[#111214] sm:text-base">
              Multi-Pass OCR Extraction
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
              Image-only and scanned PDFs (up to 200 pages and 100 MB) are
              processed alongside digital text tables so historical paper
              statements remain usable alongside CSV/XLSX ledgers.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-5">
            <h3 className="text-sm font-semibold text-[#111214] sm:text-base">
              Independent Review Output
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
              Output reports retain row indices, stated vs. expected running
              balances, and discrepancy explanations for auditability.
            </p>
          </div>
        </div>
      </section>

      <section
        id="limitations-honesty"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          3. Honest Boundaries &amp; Human Review
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67] sm:text-base">
          Automated OCR and heuristic matching accelerate review, not replace
          professional judgment. Low-contrast scans, complex multi-invoice batch
          settlements (one deposit matching four separate ledger bills), or
          ambiguous narration text can produce <code>unverifiable</code> balance
          checks or unmatched exceptions that require bookkeeper verification.
          Learn more in our{" "}
          <Link
            href="/data-accuracy-policy"
            className="font-semibold text-[#111214] underline"
          >
            Data Accuracy Policy
          </Link>{" "}
          and{" "}
          <Link
            href="/disclaimer"
            className="font-semibold text-[#111214] underline"
          >
            Financial Disclaimer
          </Link>
          .
        </p>
      </section>
    </TrustPageShell>
  );
}
