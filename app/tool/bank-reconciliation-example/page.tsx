import Link from "next/link";
import {
  GuideComparisonTable,
  GuideFaqSection,
  JournalEntryTable,
  QuickAnswerBox,
  ToolInlineCta,
  WorkedScheduleSide,
} from "@/components/tool/guide-blocks";
import { buildArticleSchema } from "@/components/trust/structured-data";
import { TrustPageShell } from "@/components/trust/trust-page-shell";
import { AUTHORS, createPageMetadata, REVIEWERS } from "@/lib/site-config";

const PAGE_PATH = "/tool/bank-reconciliation-example";
const PAGE_TITLE = "Bank Reconciliation Example with Worked Numbers";
const PAGE_DESCRIPTION =
  "Step-by-step bank reconciliation example with worked numbers: compare bank statement vs. cash book lines, adjust timing and book items, pass journal entries, and hit $0.00 variance.";

export const metadata = createPageMetadata({
  path: PAGE_PATH,
  title: `${PAGE_TITLE} | reconcilebankstatement`,
  description: PAGE_DESCRIPTION,
  keywords: [
    "bank reconciliation example",
    "bank reconciliation statement example with solution",
    "worked bank reconciliation example",
    "bank reconciliation journal entries example",
  ],
  type: "article",
});

export default function BankReconciliationExamplePage() {
  return (
    <TrustPageShell
      path={PAGE_PATH}
      eyebrow="Worked Numbers Walkthrough"
      title={PAGE_TITLE}
      lead="Nothing clarifies bank reconciliation faster than seeing real numbers tie out to the penny. Walk through a complete October month-end bank reconciliation example for a growing business—from raw statement discrepancies to final $0.00 proof and adjusting journal entries."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Tools & Guides", href: "/tool" },
        { label: "Bank Reconciliation Example" },
      ]}
      author={AUTHORS.editorialProduct}
      reviewer={REVIEWERS.technicalReview}
      heroCta={{
        label: "Test With Sample CSV Files Now",
        href: "/reconcile",
        secondaryLabel: "Jump to Final Schedule",
        secondaryHref: "#worked-tie-out",
        note: "Click 'Load Sample CSV Pair' inside the workbench to watch a live tie-out run in seconds",
      }}
      sections={[
        { id: "scenario-setup", label: "Scenario & Starting Balances" },
        { id: "raw-discrepancies", label: "Unmatched Lines Discovered" },
        { id: "worked-tie-out", label: "Complete Tie-Out Schedule" },
        { id: "journal-entries", label: "Required Adjusting Journal Entries" },
        { id: "engine-mapping", label: "How Automated Tools Classify This" },
        { id: "faqs", label: "Example FAQs" },
      ]}
      extraSchemas={[
        buildArticleSchema({
          title: PAGE_TITLE,
          description: PAGE_DESCRIPTION,
          path: PAGE_PATH,
          author: AUTHORS.editorialProduct,
        }),
      ]}
      relatedLinks={[
        {
          title: "Bank Reconciliation Steps",
          description:
            "Review the 7-step checklist behind this exact worked example.",
          href: "/tool/bank-reconciliation-steps",
        },
        {
          title: "NSF & Returned Cheques",
          description:
            "Deep dive into the $550 bounced check adjustment shown in this example.",
          href: "/tool/nsf-checks-bank-reconciliation",
        },
        {
          title: "Balance Sheet Reconciliation Example",
          description:
            "See how cash reconciliation feeds into your full month-end close checklist.",
          href: "/tool/balance-sheet-reconciliation-example",
        },
      ]}
      ctaOverride={{
        title: "Run your own bank statement and ledger through the same tie-out checks",
        description:
          "Upload your PDF, CSV, or XLSX files—or test immediately with our sample CSV pair—to see Matched, Unmatched Bank, Unmatched Ledger, Duplicates, and Book-to-Bank proof.",
        buttonLabel: "Try the Free Workbench",
      }}
    >
      <QuickAnswerBox
        label="Example At a Glance"
        summary="In this worked example, Northwind Roasters LLC closes October with an unadjusted bank balance of $24,610.00 and an unadjusted cash book balance of $26,445.00 (a $1,835.00 raw gap). After adjusting bank timing items (+$2,840 deposit in transit, −$1,655 outstanding checks) and book omissions (+$35 interest, −$45 bank fee, −$550 NSF check, −$90 transposition error), both sides tie exactly to $25,795.00."
      />

      <section
        id="scenario-setup"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          1. Scenario Setup: Northwind Roasters LLC (October 31)
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#474B54] sm:text-base">
          At the close of October, the bookkeeper downloads the October bank
          statement and compares it to the General Ledger Cash account (#1010):
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4">
            <div className="font-mono text-[11px] uppercase tracking-wider text-[#474B54]">
              Unadjusted Bank Balance
            </div>
            <div className="mt-1 font-mono text-2xl font-bold text-[#111214]">
              $24,610.00
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4">
            <div className="font-mono text-[11px] uppercase tracking-wider text-[#474B54]">
              Unadjusted Book Balance
            </div>
            <div className="mt-1 font-mono text-2xl font-bold text-[#111214]">
              $26,445.00
            </div>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
            <div className="font-mono text-[11px] uppercase tracking-wider text-amber-900">
              Raw Unreconciled Gap
            </div>
            <div className="mt-1 font-mono text-2xl font-bold text-amber-900">
              $1,835.00
            </div>
          </div>
        </div>
      </section>

      <section
        id="raw-discrepancies"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          2. Line-by-Line Discrepancies Discovered
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#474B54] sm:text-base">
          Most ordinary receipts and vendor payments match 1-for-1 across both
          files. Filtering down to the unmatched exceptions reveals seven
          specific items explaining the entire $1,835.00 gap:
        </p>
        <GuideComparisonTable
          headers={[
            "Date",
            "Item Description",
            "Source Found",
            "Amount",
            "Side Adjusted",
          ]}
          rows={[
            [
              "Oct 31",
              "Card Batch #884 (booked Oct 31, settled Nov 2)",
              "Ledger only",
              "+$2,840.00",
              "Bank (+Deposit in Transit)",
            ],
            [
              "Oct 28",
              "Check #1042 — Packaging Supply Co.",
              "Ledger only",
              "−$1,180.00",
              "Bank (−Outstanding Check)",
            ],
            [
              "Oct 30",
              "Check #1045 — City Water Utility",
              "Ledger only",
              "−$475.00",
              "Bank (−Outstanding Check)",
            ],
            [
              "Oct 31",
              "Monthly Account Interest Earned",
              "Bank only",
              "+$35.00",
              "Book (+Interest Earned)",
            ],
            [
              "Oct 29",
              "Monthly Account & Outbound Wire Fee",
              "Bank only",
              "−$45.00",
              "Book (−Bank Fees)",
            ],
            [
              "Oct 24",
              "NSF Returned Check — Cafe Horizon",
              "Bank only",
              "−$550.00",
              "Book (−NSF Reversal)",
            ],
            [
              "Oct 19",
              "Check #1039 (Bank cleared $740; Book keyed $650)",
              "Amount mismatch",
              "−$90.00",
              "Book (−Transposition Error)",
            ],
          ]}
        />
      </section>

      <section
        id="worked-tie-out"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          3. Complete Bank Reconciliation Schedule ($0.00 Variance)
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#474B54] sm:text-base">
          Applying each timing lag to the Bank side and each unrecorded item or
          posting mistake to the Book side brings both totals to{" "}
          <strong className="text-[#111214]">$25,795.00</strong>:
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <WorkedScheduleSide
            title="Part A: Reconciling the Bank Balance"
            rows={[
              { label: "Unadjusted Bank Statement Balance", amount: "$24,610.00" },
              {
                label: "+ Deposit in Transit (Batch #884)",
                amount: "+$2,840.00",
                tone: "add",
              },
              {
                label: "− Outstanding Check #1042",
                amount: "−$1,180.00",
                tone: "deduct",
              },
              {
                label: "− Outstanding Check #1045",
                amount: "−$475.00",
                tone: "deduct",
              },
              {
                label: "Adjusted Bank Balance",
                amount: "$25,795.00",
                tone: "total",
              },
            ]}
          />
          <WorkedScheduleSide
            title="Part B: Reconciling the Book (GL) Balance"
            rows={[
              { label: "Unadjusted Cash Book Balance", amount: "$26,445.00" },
              {
                label: "+ Interest Earned (Bank Credit)",
                amount: "+$35.00",
                tone: "add",
              },
              {
                label: "− Account & Wire Fee",
                amount: "−$45.00",
                tone: "deduct",
              },
              {
                label: "− Customer NSF Returned Check",
                amount: "−$550.00",
                tone: "deduct",
              },
              {
                label: "− Transposition Error (Chk #1039: $740 vs $650)",
                amount: "−$90.00",
                tone: "deduct",
              },
              {
                label: "Adjusted Book Balance",
                amount: "$25,795.00",
                tone: "total",
              },
            ]}
          />
        </div>
        <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50/80 px-5 py-3.5 text-xs font-semibold text-emerald-950 sm:text-sm">
          Proof Check: Adjusted Bank Balance ($25,795.00) − Adjusted Book Balance
          ($25,795.00) = $0.00 Unexplained Variance. Notice also that net bank
          adjustments (+$1,185.00) minus net book adjustments (−$650.00) account
          for the exact $1,835.00 raw difference.
        </div>
      </section>

      <section
        id="journal-entries"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          4. Adjusting Journal Entries Required in Your Books
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#474B54] sm:text-base">
          <strong className="text-[#111214]">Golden Rule:</strong> Never post
          journal entries for Bank-side timing items (Batch #884 or Checks #1042
          and #1045)—they are already booked accurately and will clear next
          month. Only the four Book-side items require journal entries:
        </p>

        <JournalEntryTable
          caption="Entry 1: Record Earned Interest &amp; Bank Wire Fee"
          date="Oct 31"
          narration="Record October bank interest credit and monthly wire/account fee"
          lines={[
            { account: "Cash (#1010)", debit: "$35.00" },
            { account: "Interest Income", credit: "$35.00" },
            { account: "Bank Service Charges Expense", debit: "$45.00" },
            { account: "Cash (#1010)", credit: "$45.00" },
          ]}
        />

        <JournalEntryTable
          caption="Entry 2: Reverse Customer NSF Check &amp; Fix Check #1039 Transposition"
          date="Oct 31"
          narration="Reinstate Cafe Horizon receivable for NSF return and correct $90 equipment repair understatement"
          lines={[
            {
              account: "Accounts Receivable — Cafe Horizon",
              note: "Reinstates bounced payment so AR team can follow up",
              debit: "$550.00",
            },
            { account: "Cash (#1010)", credit: "$550.00" },
            {
              account: "Equipment Repairs & Maintenance Expense",
              note: "Corrects Check #1039 keyed as $650 instead of $740",
              debit: "$90.00",
            },
            { account: "Cash (#1010)", credit: "$90.00" },
          ]}
        />
      </section>

      <ToolInlineCta
        eyebrow="Live Interactive Demo"
        title="See This Exact Categorization Inside reconcilebankstatement"
        description="Don't calculate Bank vs. Book schedules by hand. Open the workbench and click 'Load Sample CSV Pair'—or upload your own statement and ledger—to inspect Matched, Unmatched Bank, Unmatched Ledger, Duplicates, and Amount Mismatches."
        buttonLabel="Test Sample CSV Tie-Out"
        href="/reconcile"
        secondaryLabel="Read Matching Methodology"
        secondaryHref="/bank-reconciliation-methodology"
        highlights={[
          "Book-to-Bank variance proof",
          "Near-match transposition detection",
          "Downloadable XLSX & CSV",
        ]}
      />

      <section
        id="engine-mapping"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          5. How Automated Reconciliation Software Classifies Those Exceptions
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#474B54] sm:text-base">
          When you upload files like Northwind Roasters&apos; statement and cash
          book to{" "}
          <Link href="/reconcile" className="font-semibold text-[#111214] underline">
            reconcilebankstatement
          </Link>
          , each discrepancy lands automatically in its own actionable tab:
        </p>
        <ul className="mt-4 space-y-2.5 text-xs leading-relaxed text-[#474B54] sm:text-sm">
          <li>
            <strong className="text-[#111214]">Unmatched Bank:</strong> Surfaces
            the $35 interest credit, $45 fee, and $550 NSF debit memo ready for
            your adjusting journal entries.
          </li>
          <li>
            <strong className="text-[#111214]">Unmatched Ledger:</strong>{" "}
            Isolates Batch #884 ($2,840) and Checks #1042 and #1045 as expected
            period-end cutoff timing items.
          </li>
          <li>
            <strong className="text-[#111214]">Amount Mismatches:</strong> Flags
            Check #1039 ($740 bank vs. $650 ledger) side-by-side with the exact
            $90 delta so transposition typos never stay buried.
          </li>
          <li>
            <strong className="text-[#111214]">Book-to-Bank Proof Card:</strong>{" "}
            Verifies that your closing balance difference is 100% explained by
            those discrepancies with zero unexplained residual variance.
          </li>
        </ul>
      </section>

      <GuideFaqSection
        items={[
          {
            question: "Why did Check #1039 subtract $90 from the Book Balance instead of adding it?",
            answer:
              "Northwind paid $740 out of the bank, but mistakenly recorded only a $650 payment in the cash book. Because too little cash was deducted in the books, the unadjusted book balance was overstated by $90 and had to be reduced by $90.",
          },
          {
            question: "Do I also check whether the opening balance matched?",
            answer:
              "Yes. Before relying on any worked schedule, confirm the opening balance on both the bank statement and the ledger match the prior period's reconciled closing balance.",
          },
          {
            question: "Can I practice with real sample files without exposing company data?",
            answer:
              "Yes—visit /reconcile and click Load Sample CSV Pair to run a full deterministic reconciliation and export an XLSX or CSV report immediately.",
          },
        ]}
      />
    </TrustPageShell>
  );
}
