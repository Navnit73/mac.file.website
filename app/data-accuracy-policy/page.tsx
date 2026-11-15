import Link from "next/link";
import { createPageMetadata, SITE_CONFIG } from "@/lib/site-config";
import { TrustPageShell } from "@/components/trust/trust-page-shell";

export const metadata = createPageMetadata({
  path: "/data-accuracy-policy",
  title: `Data Accuracy & Limitations Policy | ${SITE_CONFIG.brandName}`,
  description:
    "How reconcilebankstatement.online approaches extraction accuracy, balance verification checks, and the known limitations of PDF OCR and heuristic matching.",
});

export default function DataAccuracyPolicyPage() {
  return (
    <TrustPageShell
      path="/data-accuracy-policy"
      eyebrow="Accuracy & Transparency"
      title="Data Accuracy &amp; Automated Matching Policy"
      lead="No OCR engine or reconciliation matcher can guarantee 100% accuracy on every degraded scan or irregular bank export. Instead of sweeping percentages, reconcilebankstatement pairs extraction with deterministic balance checks so errors cannot hide."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Data Accuracy Policy" },
      ]}
      sections={[
        { id: "no-fake-claims", label: "Why We Avoid Blanket Claims" },
        { id: "verification-guards", label: "Built-In Error Controls" },
        { id: "common-causes", label: "When Accuracy Can Degrade" },
        { id: "user-checklist", label: "Recommended Bookkeeper Sign-Off" },
      ]}
      relatedLinks={[
        {
          title: "Reconciliation Methodology",
          description:
            "Explore exact matching rules, date windows, and running-balance breaks.",
          href: "/bank-reconciliation-methodology",
        },
        {
          title: "Financial Disclaimer",
          description:
            "Clarification on non-advisory status and user responsibility for filings.",
          href: "/disclaimer",
        },
        {
          title: "Responsible Use",
          description:
            "Best practices for preparing clean exports and protecting client files.",
          href: "/responsible-use",
        },
      ]}
    >
      <section
        id="no-fake-claims"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          1. Honest Approach to Accuracy (No Unverified SLA Guarantees)
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67] sm:text-base">
          Structured CSV and native XLSX exports typically parse deterministically
          when column headers and decimals are consistent. By contrast, scanned
          PDFs, photographed paper statements, skewed tables, or faded thermal
          receipts involve optical character recognition (OCR), where a smudged
          8 can resemble a 3 or a folded corner can omit a line. For that
          reason, {SITE_CONFIG.domain} makes no blanket claim such as &quot;99.9%
          guaranteed OCR accuracy&quot;—instead, every report highlights arithmetic
          proof results directly.
        </p>
      </section>

      <section
        id="verification-guards"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          2. Built-In Verification Mechanisms
        </h2>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#5A5E67]">
          <li>
            <strong className="text-[#111214]">
              Three-State Balance Badges (<code>passed</code>,{" "}
              <code>failed</code>, <code>unverifiable</code>):
            </strong>{" "}
            We never mark a check as &quot;passed&quot; unless stated opening
            and closing figures exist and agree mathematically with extracted
            transaction totals.
          </li>
          <li>
            <strong className="text-[#111214]">
              Running-Balance Break Pinpointing:
            </strong>{" "}
            If an OCR table omits or misreads one row inside a running-balance
            statement, the running-balance audit identifies the exact{" "}
            <code>transaction_id</code>, expected vs. stated balance, and
            arithmetic gap.
          </li>
          <li>
            <strong className="text-[#111214]">
              Logged <code>amount_corrections</code>:
            </strong>{" "}
            Normalized numbers keep an explicit audit list of any extracted text
            reformatted for calculation so reviewers can verify edge cases.
          </li>
        </ul>
      </section>

      <section
        id="common-causes"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          3. Scenarios Requiring Extra Human Verification
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#5A5E67]">
          <li>
            Low-resolution scans, camera shadows, rotated pages, or handwritten
            check memos.
          </li>
          <li>
            Many-to-one batch settlements (for example, one lump-sum payout on
            the bank statement covering multiple individual invoices in your
            general ledger).
          </li>
          <li>
            Multi-currency conversions where bank FX spreads differ slightly
            from ledger booking rates.
          </li>
          <li>
            Files missing opening or closing balance headers (in which case
            balance checks accurately report <code>unverifiable</code>).
          </li>
        </ul>
      </section>

      <section
        id="user-checklist"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          4. Recommended Bookkeeper Review Before Posting
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          Confirm <code>passed</code> balance status (or inspect{" "}
          <code>breaks</code>), spot-check any <code>low</code> confidence
          matched pairs in the interactive table, and download the{" "}
          <code>.xlsx</code> workpaper for permanent period close documentation.
          See our{" "}
          <Link href="/disclaimer" className="font-semibold text-[#111214] underline">
            Financial Disclaimer
          </Link>{" "}
          for complete legal terms.
        </p>
      </section>
    </TrustPageShell>
  );
}
