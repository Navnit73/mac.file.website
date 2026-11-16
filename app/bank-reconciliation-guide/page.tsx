import Link from "next/link";
import { buildArticleSchema } from "@/components/trust/structured-data";
import { TrustPageShell } from "@/components/trust/trust-page-shell";
import {
  AUTHORS,
  createPageMetadata,
  REVIEWERS,
} from "@/lib/site-config";

export const metadata = createPageMetadata({
  path: "/bank-reconciliation-guide",
  title: `Complete Bank Reconciliation Guide | US, UK & EU Accounting Reference`,
  description:
    "Educational accounting guide covering outstanding checks, deposits in transit, bank fees, duplicates, opening and closing balances, and bank statement vs. general ledger reconciliation.",
  type: "article",
});

export default function BankReconciliationGuidePage() {
  return (
    <TrustPageShell
      path="/bank-reconciliation-guide"
      eyebrow="Accounting Education"
      title="Practical Guide to Bank Statement Reconciliation"
      lead="Whether preparing monthly books in the United States, maintaining statutory business records in the UK, or closing multi-currency ledgers in the EU, bank reconciliation verifies that internal cash records match external bank reality."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Bank Reconciliation Guide" },
      ]}
      author={AUTHORS.editorialProduct}
      reviewer={REVIEWERS.technicalReview}
      sections={[
        { id: "definition", label: "What Bank Reconciliation Means" },
        { id: "bank-vs-gl", label: "Bank Statement vs. General Ledger" },
        { id: "core-terms", label: "Key Terms & Timing Differences" },
        { id: "formula-example", label: "Worked Tie-Out Example" },
        { id: "regional-notes", label: "US, UK & EU Conventions" },
      ]}
      extraSchemas={[
        buildArticleSchema({
          title: "Practical Guide to Bank Statement Reconciliation",
          description:
            "Comprehensive guide to bank statement reconciliation, timing items, duplicates, opening and closing balances, and bank vs. general ledger perspectives.",
          path: "/bank-reconciliation-guide",
          author: AUTHORS.editorialProduct,
        }),
      ]}
      relatedLinks={[
        {
          title: "Bank Reconciliation Guides & Tools Hub",
          description:
            "Browse all 8 guides: worked examples, step-by-step process, outstanding cheques, NSF returns, and balance sheet checklists.",
          href: "/tool",
        },
        {
          title: "Reconciliation Methodology",
          description:
            "See how reconcilebankstatement compares uploaded statements and ledgers algorithmically.",
          href: "/bank-reconciliation-methodology",
        },
        {
          title: "Data Accuracy Policy",
          description:
            "Learn what deterministic balance checks verify and where accountant review is required.",
          href: "/data-accuracy-policy",
        },
      ]}
    >
      <section
        id="definition"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          1. What Bank Statement Reconciliation Means
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67] sm:text-base">
          Bank reconciliation is the accounting control process of comparing the
          ending cash balance and line-by-line transactions reported on an
          external financial institution&apos;s statement against the cash
          account in a business&apos;s internal general ledger or cash book for
          the exact same period. Under cash-control frameworks reflected in
          standard accounting practice (such as{" "}
          <a
            href="https://www.ifrs.org/issued-standards/list-of-standards/ias-7-statement-of-cash-flows/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#111214] underline"
          >
            IFRS IAS 7
          </a>{" "}
          and statutory business recordkeeping rules from the{" "}
          <a
            href="https://www.irs.gov/businesses/small-businesses-self-employed/recordkeeping"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#111214] underline"
          >
            US IRS
          </a>{" "}
          and{" "}
          <a
            href="https://www.gov.uk/keeping-your-pay-tax-records"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#111214] underline"
          >
            UK GOV.UK
          </a>
          ), regular reconciliation ensures cash is neither overstated by
          duplicate entries nor understated by unposted deposits.
        </p>
      </section>

      <section
        id="bank-vs-gl"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          2. Bank Statement Reconciliation vs. General Ledger Reconciliation
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67] sm:text-base">
          These two terms are closely related but differ in scope and
          direction:
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-5">
            <h3 className="text-base font-semibold text-[#111214]">
              Bank Statement Reconciliation
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
              Focuses specifically on cash and card depository accounts, tying an
              external bank statement (where deposits appear as credits and
              withdrawals as debits because your funds are a liability to the
              bank) to your internal cash ledger (where increases in cash are
              accounting debits and payouts are credits).
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-5">
            <h3 className="text-base font-semibold text-[#111214]">
              General Ledger (Balance Sheet) Reconciliation
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
              Broader month-end close control verifying any asset, liability, or
              clearing GL account (accounts receivable, accounts payable, payroll
              clearing, merchant reserves, or petty cash) against independent
              subledgers, vendor schedules, or bank confirmations.
            </p>
          </div>
        </div>
      </section>

      <section
        id="core-terms"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          3. Core Reconciliation Terms Every Bookkeeper Checks
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/80 p-5">
            <h3 className="text-sm font-semibold text-[#111214] sm:text-base">
              Deposits in Transit (Unmatched Ledger Inflows)
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
              Customer receipts, card batches, or checks recorded in your book
              ledger before cutoff (30th/31st) that settle on the bank
              statement 1–3 banking days later. Add these to the unadjusted
              bank balance.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 p-5">
            <h3 className="text-sm font-semibold text-[#111214] sm:text-base">
              Outstanding Checks &amp; Pending Outflows
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
              Vendor payments or paper checks issued and booked in the ledger
              that the payee has not yet cashed or cleared through the clearing
              house. Deduct these from the unadjusted bank balance.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 p-5">
            <h3 className="text-sm font-semibold text-[#111214] sm:text-base">
              Bank Service Fees, Interest &amp; NSF Returns
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
              Items appearing only on the bank statement (wire fees, monthly
              account maintenance fees, returned bounced checks, or earned
              interest). Post adjusting journal entries to bring the book side
              into alignment.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 p-5">
            <h3 className="text-sm font-semibold text-[#111214] sm:text-base">
              Duplicate &amp; Missing Transactions
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
              Manual double-entry mistakes in spreadsheets, overlapping CSV
              imports, or omitted cash-card charges distort book balances. Check
              opening balances (<code>Opening + Net Flow = Closing</code>) before trusting
              individual lines.
            </p>
          </div>
        </div>
      </section>

      <section
        id="formula-example"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          4. Worked Reconciliation Example ($0.00 Unexplained Variance)
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#5A5E67]">
          Suppose a small business closes October with a statement ending
          balance of <strong className="text-[#111214]">$84,920.00</strong>{" "}
          and a cash book ending balance of{" "}
          <strong className="text-[#111214]">$86,635.00</strong>:
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 font-mono text-xs">
            <h3 className="font-sans text-sm font-semibold text-[#111214]">
              Bank Side Adjustment
            </h3>
            <ul className="mt-3 space-y-1.5 text-[#5A5E67]">
              <li className="flex justify-between">
                <span>Statement Ending Balance</span>
                <span className="font-semibold text-[#111214]">$84,920.00</span>
              </li>
              <li className="flex justify-between">
                <span>+ Deposit in Transit (Oct 31)</span>
                <span className="text-emerald-700">+$3,150.00</span>
              </li>
              <li className="flex justify-between">
                <span>− Outstanding Check #2084</span>
                <span className="text-amber-700">−$1,470.00</span>
              </li>
              <li className="flex justify-between border-t border-slate-200 pt-2 font-semibold text-[#111214]">
                <span>Adjusted Bank Balance</span>
                <span>$86,600.00</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 font-mono text-xs">
            <h3 className="font-sans text-sm font-semibold text-[#111214]">
              Book (Ledger) Side Adjustment
            </h3>
            <ul className="mt-3 space-y-1.5 text-[#5A5E67]">
              <li className="flex justify-between">
                <span>Unadjusted Book Cash Balance</span>
                <span className="font-semibold text-[#111214]">$86,635.00</span>
              </li>
              <li className="flex justify-between">
                <span>− Unrecorded Bank Wire Fee</span>
                <span className="text-amber-700">−$35.00</span>
              </li>
              <li className="flex justify-between">
                <span>± Recording / Transposition Errors</span>
                <span>$0.00</span>
              </li>
              <li className="flex justify-between border-t border-slate-200 pt-2 font-semibold text-[#111214]">
                <span>Adjusted Book Balance</span>
                <span>$86,600.00</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section
        id="regional-notes"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          5. US, UK &amp; EU Formatting Differences to Watch For
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          When reconciling across US (<code>MM/DD/YYYY</code>, comma thousands{" "}
          <code>1,250.00</code>), UK (<code>DD/MM/YYYY</code>, BACS/Faster
          Payments references), and Continental EU (<code>DD.MM.YYYY</code>,
          SEPA transfers, period thousands with comma decimals{" "}
          <code>1.250,00</code>, <code>Soll/Haben</code> or{" "}
          <code>Débit/Crédit</code>) formats, date swap errors (
          <code>04/07</code> read as April 7 vs. July 4) and decimal swaps
          silently break manual spreadsheets. Learn how reconcilebankstatement
          handles normalization in our{" "}
          <Link
            href="/bank-reconciliation-methodology"
            className="font-semibold text-[#111214] underline"
          >
            Reconciliation Methodology
          </Link>
          .
        </p>
      </section>
    </TrustPageShell>
  );
}
