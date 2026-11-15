import Link from "next/link";
import { buildArticleSchema } from "@/components/trust/structured-data";
import { TrustPageShell } from "@/components/trust/trust-page-shell";
import {
  AUTHORS,
  createPageMetadata,
  REVIEWERS,
  SITE_CONFIG,
} from "@/lib/site-config";

export const metadata = createPageMetadata({
  path: "/bank-reconciliation-methodology",
  title: `Bank Reconciliation Methodology & Matching Logic | ${SITE_CONFIG.brandName}`,
  description:
    "Technical explanation of ClearTie's reconciliation methodology: date tolerance windows (0–31 days), direction convention inference, similarity scoring, duplicate flags, and balance equations.",
  type: "article",
});

export default function BankReconciliationMethodologyPage() {
  return (
    <TrustPageShell
      path="/bank-reconciliation-methodology"
      eyebrow="Matching & Verification Logic"
      title="Bank Reconciliation Methodology"
      lead="Every discrepancy surfaced by ClearTie comes from explicit matching rules and arithmetic balance equations. This page documents how transactions are normalized, paired, and classified across reports."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Reconciliation Methodology" },
      ]}
      author={AUTHORS.editorialProduct}
      reviewer={REVIEWERS.technicalReview}
      sections={[
        { id: "normalization", label: "Ingestion & Direction Normalization" },
        { id: "matching-criteria", label: "Matching Criteria & Confidence" },
        { id: "exception-rules", label: "Exception Classification" },
        { id: "balance-equations", label: "Balance Tie-Out Equations" },
      ]}
      extraSchemas={[
        buildArticleSchema({
          title: "Bank Reconciliation Methodology",
          description:
            "Matching rules, date tolerance configuration, duplicate detection, and running-balance proof behind reconcilebankstatement.online.",
          path: "/bank-reconciliation-methodology",
          author: AUTHORS.editorialProduct,
        }),
      ]}
      relatedLinks={[
        {
          title: "Data Accuracy Policy",
          description:
            "Review confidence scopes, OCR limits, and human review obligations.",
          href: "/data-accuracy-policy",
        },
        {
          title: "Bank Reconciliation Guide",
          description:
            "Refresh accounting definitions for deposits in transit, checks, and fees.",
          href: "/bank-reconciliation-guide",
        },
        {
          title: "How It Works",
          description:
            "See the interactive workbench parameters and supported file formats.",
          href: "/how-it-works",
        },
      ]}
    >
      <section
        id="normalization"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          1. Parsing &amp; Flow-Direction Normalization
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67] sm:text-base">
          Before comparing lines, both documents are parsed into structured
          transactions containing `date`, `description`, `reference`, `debit`,
          `credit`, absolute `amount`, `flow` (`&quot;in&quot;` or `&quot;out&quot;`),
          and optional running `balance`.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67] sm:text-base">
          Because business ledgers sometimes export cash flows using bank
          statement conventions (where inflows sit in a credit column) and
          other times using standard double-entry book conventions (where cash
          receipts are debits), the summary explicitly records{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-[#111214]">
            ledger_direction_convention
          </code>{" "}
          (`bank` or `book`) so reversals can be diagnosed accurately instead of
          producing false failures.
        </p>
      </section>

      <section
        id="matching-criteria"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          2. Pair Ranking &amp; Confidence Levels
        </h2>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#5A5E67]">
          <li>
            <strong className="text-[#111214]">Exact Amount &amp; Flow:</strong>{" "}
            Primary match candidates share identical currency magnitude (`amount`)
            and matching cash direction (`in` vs. `out`).
          </li>
          <li>
            <strong className="text-[#111214]">
              Configurable Date Window (`date_tolerance_days`):
            </strong>{" "}
            Defaults to <strong className="text-[#111214]">±2 days</strong> and
            is adjustable from <strong className="text-[#111214]">0 days</strong>{" "}
            (strict same-day clearance) up to{" "}
            <strong className="text-[#111214]">31 days</strong> (helpful for
            delayed check clearing or cross-border settlement).
          </li>
          <li>
            <strong className="text-[#111214]">
              Description Similarity Scoring (`description_matching`):
            </strong>{" "}
            When enabled, payee names, check/reference tokens, and memo strings
            break ties when multiple transactions share the same dollar/euro
            amount within the same week. Each matched pair records{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-[#111214]">
              match_basis
            </code>{" "}
            and confidence (`high`, `medium`, `low`).
          </li>
        </ul>
      </section>

      <section
        id="exception-rules"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          3. How Differences &amp; Anomalies Are Identified
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-5">
            <h3 className="text-sm font-semibold text-[#111214] sm:text-base">
              Unmatched Bank vs. Unmatched Ledger
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
              Every un-paired transaction stays separated by source with an
              explanatory `reason` so bank-only charges (wire fees, interest,
              NSF) are never mixed with book-only timing items.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-5">
            <h3 className="text-sm font-semibold text-[#111214] sm:text-base">
              Amount &amp; Direction Mismatches
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
              Surfaces near-matches classified explicitly as{" "}
              `amount_mismatch`, `direction_mismatch` (a debit posted as credit
              or refund entered backward), or `amount_and_direction_mismatch`.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-5">
            <h3 className="text-sm font-semibold text-[#111214] sm:text-base">
              Possible Duplicate Clusters
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
              Groups repeated transactions on the same source side (`bank` or
              `ledger`) showing `count`, `transaction_ids`, and underlying
              lines so legitimate split payments are easily distinguished from
              duplicate imports.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-5">
            <h3 className="text-sm font-semibold text-[#111214] sm:text-base">
              Transparent Amount Corrections
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
              Any OCR or delimiter cleanup adjustment is logged under{" "}
              `amount_corrections` showing the raw extracted string alongside
              the normalized figure.
            </p>
          </div>
        </div>
      </section>

      <section
        id="balance-equations"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          4. Mathematical Balance Verification Checks
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          Whenever opening, closing, or running balances appear in either
          document, ClearTie evaluates three arithmetic proofs (`passed`,
          `failed`, or `unverifiable` when balance headers/columns are absent):
        </p>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#5A5E67]">
          <li>
            <strong className="text-[#111214]">Period Equation:</strong>{" "}
            `Opening Balance + Net Extracted Cash Flow = Closing Balance`
          </li>
          <li>
            <strong className="text-[#111214]">Line-by-Line Running Balance:</strong>{" "}
            Checks sequential stated balances (`breaks_count` and exact line
            indices when an OCR row drop causes a discontinuity).
          </li>
          <li>
            <strong className="text-[#111214]">Book-to-Bank Bridge:</strong>{" "}
            Tests whether closing balance differences equal explained
            unmatched/mismatch timing items, flagging any residual
            `unexplained_difference`. Review our{" "}
            <Link
              href="/data-accuracy-policy"
              className="font-semibold text-[#111214] underline"
            >
              Data Accuracy Policy
            </Link>{" "}
            for guidance when `unverifiable` appears.
          </li>
        </ul>
      </section>
    </TrustPageShell>
  );
}
