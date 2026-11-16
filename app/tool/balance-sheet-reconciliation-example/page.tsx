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

const PAGE_PATH = "/tool/balance-sheet-reconciliation-example";
const PAGE_TITLE =
  "Balance Sheet Reconciliation: Process, Example, and Checklist";
const PAGE_DESCRIPTION =
  "Complete balance sheet reconciliation guide: 6-step month-end close process, worked examples for Cash (#1010) and Prepaid Expenses (#1300), and a master close checklist.";

export const metadata = createPageMetadata({
  path: PAGE_PATH,
  title: `${PAGE_TITLE} | reconcilebankstatement`,
  description: PAGE_DESCRIPTION,
  keywords: [
    "balance sheet reconciliation example",
    "balance sheet reconciliation process",
    "balance sheet reconciliation checklist",
    "month end balance sheet reconciliation",
  ],
  type: "article",
});

export default function BalanceSheetReconciliationExamplePage() {
  return (
    <TrustPageShell
      path={PAGE_PATH}
      eyebrow="Month-End Close Playbook"
      title={PAGE_TITLE}
      lead="Balance sheet reconciliation proves every ending asset, liability, and equity balance at month-end against independent evidence before closing the books. Walk through the six-stage close workflow, two worked GL examples, and a full account-by-account checklist."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Tools & Guides", href: "/tool" },
        { label: "Balance Sheet Reconciliation" },
      ]}
      author={AUTHORS.editorialProduct}
      reviewer={REVIEWERS.technicalReview}
      heroCta={{
        label: "Reconcile Cash & Clearing Accounts Now",
        href: "/reconcile",
        secondaryLabel: "Jump to Master Checklist",
        secondaryHref: "#close-checklist",
        note: "Substantiate bank, card & payment clearing statements with XLSX audit workpaper export",
      }}
      sections={[
        { id: "what-and-why", label: "Why Balance Sheet Tie-Outs Matter" },
        { id: "six-step-process", label: "The 6-Step Close Process" },
        { id: "cash-example", label: "Example 1: Cash & Clearing (#1010)" },
        { id: "prepaid-example", label: "Example 2: Prepaid Expenses (#1300)" },
        { id: "close-checklist", label: "Master Balance Sheet Checklist" },
        { id: "best-practices", label: "Close Control Best Practices" },
        { id: "faqs", label: "Balance Sheet Close FAQs" },
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
          title: "Account Reconciliation Meaning",
          description:
            "Understand how documentation review and analytics methods work across the GL.",
          href: "/tool/account-reconciliation-meaning",
        },
        {
          title: "Bank Reconciliation Example",
          description:
            "Inspect a full cash tie-out with transposition errors and NSF returns.",
          href: "/tool/bank-reconciliation-example",
        },
        {
          title: "Reconciliation Methodology",
          description:
            "Review how reconcilebankstatement proves Opening + Net Flow = Closing balances.",
          href: "/bank-reconciliation-methodology",
        },
      ]}
      ctaOverride={{
        title: "Automate the highest-volume leg of your month-end balance sheet close",
        description:
          "Compare operating bank statements, corporate cards, and merchant settlement reports against your GL export in seconds—and download XLSX tie-out workpapers for controller sign-off.",
        buttonLabel: "Launch Reconciliation Workbench",
      }}
    >
      <QuickAnswerBox
        label="Executive Summary"
        summary="A balance sheet reconciliation verifies that each General Ledger asset, liability, and equity account ending balance matches independent supporting documentation—such as bank statements, subledger aging reports, or amortization schedules—at period close, isolating variances for adjusting journal entries before preparer and reviewer sign-off."
        points={[
          "Covers permanent balance sheet accounts rather than temporary P&L accounts",
          "Prevents cumulative misstatements from rolling forward undetected",
          "Combines subledger tie-outs, roll-forward schedules, and variance aging",
          "Produces signed, audit-ready workpapers for auditors and leadership",
        ]}
      />

      <section
        id="what-and-why"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          1. Why Balance Sheet Reconciliations Matter Most at Close
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#474B54] sm:text-base">
          Unlike revenue and expense accounts on the income statement (which reset
          to zero each fiscal year), balance sheet accounts carry cumulative
          balances forward indefinitely. An unbooked $1,000 software
          amortization entry or a forgotten clearing variance in January remains
          on your balance sheet all year—quietly misstating both assets and
          profitability.
        </p>
      </section>

      <section
        id="six-step-process"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          2. The 6-Step Balance Sheet Reconciliation Process
        </h2>
        <ol className="mt-4 list-decimal space-y-2.5 pl-5 text-xs leading-relaxed text-[#474B54] sm:text-sm">
          <li>
            <strong className="text-[#111214]">Freeze Period &amp; Pull Trial Balance:</strong>{" "}
            Close subledgers (AR, AP, payroll, card feeds) and export the ending
            GL trial balance as of month-end.
          </li>
          <li>
            <strong className="text-[#111214]">Assign Risk Tiers &amp; Owners:</strong>{" "}
            Route high-risk cash, clearing, and debt accounts for monthly
            detailed tie-out and assign preparers and reviewers separately.
          </li>
          <li>
            <strong className="text-[#111214]">Compare GL Against Supporting Evidence:</strong>{" "}
            Tie each GL balance to third-party statements (banks, lenders,
            Stripe) or internal roll-forward schedules (prepaids, fixed assets).
          </li>
          <li>
            <strong className="text-[#111214]">Document &amp; Age Reconciling Items:</strong>{" "}
            Separate timing lags from real discrepancies and flag any item
            older than 30 days for immediate investigation.
          </li>
          <li>
            <strong className="text-[#111214]">Post Approved Adjusting Entries (AJEs):</strong>{" "}
            Book missing bank fees, amortization, accruals, or error corrections
            so adjusted variance reaches $0.00 (or below materiality threshold).
          </li>
          <li>
            <strong className="text-[#111214]">Attach Evidence &amp; Dual Sign-Off:</strong>{" "}
            Archive the source statement, XLSX workpaper, preparer timestamp,
            and controller approval in your month-end close binder.
          </li>
        </ol>
      </section>

      <section
        id="cash-example"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          3. Balance Sheet Reconciliation Example 1: Cash &amp; Clearing (#1010)
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#474B54] sm:text-base">
          At October 31 close, General Ledger Account{" "}
          <strong className="text-[#111214]">#1010 Operating Cash</strong>{" "}
          carries a trial balance of{" "}
          <strong className="text-[#111214]">$118,450.00</strong>, while the
          external bank statement ends at{" "}
          <strong className="text-[#111214]">$116,900.00</strong>. Comparing the
          two records surfaces three items: a $2,950.00 Stripe payout booked Oct
          31 that settled Nov 1, Outstanding Check #4409 for $1,475.00, and an
          unrecorded $75.00 international wire fee:
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <WorkedScheduleSide
            title="External Bank Statement Side"
            rows={[
              { label: "Statement Ending Balance (Oct 31)", amount: "$116,900.00" },
              {
                label: "+ Payout in Transit (Stripe Oct 31)",
                amount: "+$2,950.00",
                tone: "add",
              },
              {
                label: "− Outstanding Check #4409",
                amount: "−$1,475.00",
                tone: "deduct",
              },
              {
                label: "Adjusted External Bank Balance",
                amount: "$118,375.00",
                tone: "total",
              },
            ]}
          />
          <WorkedScheduleSide
            title="General Ledger (#1010) Side"
            rows={[
              { label: "Unadjusted GL #1010 Balance (Oct 31)", amount: "$118,450.00" },
              {
                label: "− Unrecorded International Wire Fee",
                amount: "−$75.00",
                tone: "deduct",
              },
              {
                label: "Adjusted Trial Balance (#1010)",
                amount: "$118,375.00",
                tone: "total",
              },
            ]}
          />
        </div>
        <p className="mt-3 text-xs leading-relaxed text-[#474B54] sm:text-sm">
          After posting an AJE debiting Bank Fees Expense $75.00 and crediting
          Cash #1010 $75.00, the adjusted balance sheet figure ties cleanly at{" "}
          <strong className="text-[#111214]">$118,375.00</strong> ($0.00
          unresolved variance).
        </p>
      </section>

      <section
        id="prepaid-example"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          4. Balance Sheet Reconciliation Example 2: Prepaid Expenses (#1300)
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#474B54] sm:text-base">
          Non-cash balance sheet accounts are substantiated with roll-forward
          schedules instead of bank statements. Suppose{" "}
          <strong className="text-[#111214]">
            GL #1300 Prepaid Software
          </strong>{" "}
          shows an unadjusted balance of{" "}
          <strong className="text-[#111214]">$19,000.00</strong> on October 31.
          Rebuilding the active annual contracts schedule reveals:
        </p>
        <GuideComparisonTable
          headers={[
            "Vendor Contract",
            "Annual Prepayment",
            "Monthly Amortization",
            "Months Remaining (Nov+)",
            "Verified Balance (Oct 31)",
          ]}
          rows={[
            [
              "Vendor A — Annual CRM (Jan 1–Dec 31)",
              "$12,000.00",
              "$1,000.00 / mo",
              "2 months (Nov–Dec)",
              "$2,000.00",
            ],
            [
              "Vendor B — Cloud Security (Jul 1–Jun 30)",
              "$24,000.00",
              "$2,000.00 / mo",
              "8 months (Nov–Jun)",
              "$16,000.00",
            ],
            [
              "Total Substantiated Prepaid Balance",
              "—",
              "—",
              "—",
              "$18,000.00",
            ],
          ]}
        />
        <p className="mt-3 text-sm leading-relaxed text-[#474B54] sm:text-base">
          Comparing the GL balance (<strong className="text-[#111214]">$19,000.00</strong>)
          against the schedule (<strong className="text-[#111214]">$18,000.00</strong>)
          exposes a <strong className="text-rose-800">$1,000.00 variance</strong>
          : October&apos;s amortization for Vendor A wasn&apos;t booked yet.
        </p>

        <JournalEntryTable
          caption="Adjusting Entry to Reconcile GL #1300 to $18,000.00"
          date="Oct 31"
          narration="Record missed October Vendor A CRM amortization per prepaid schedule"
          lines={[
            { account: "Software Subscriptions Expense", debit: "$1,000.00" },
            { account: "Prepaid Expenses (#1300)", credit: "$1,000.00" },
          ]}
        />
      </section>

      <ToolInlineCta
        eyebrow="Cash & Subledger Tie-Out Tool"
        title="Substantiate Cash, Corporate Cards & Clearing Schedules in Seconds"
        description="Upload external PDF, image, CSV, or XLSX statements paired against your general ledger export to get matched rows, isolated discrepancies, running-balance checks, and downloadable XLSX workpapers ready for close binders."
        buttonLabel="Open Free Reconciliation Tool"
        href="/reconcile"
        secondaryLabel="Read Methodology"
        secondaryHref="/bank-reconciliation-methodology"
        highlights={[
          "Book-to-Bank variance proof",
          "XLSX workpaper export",
          "No login required",
        ]}
      />

      <section
        id="close-checklist"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          5. Month-End Balance Sheet Reconciliation Master Checklist
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#474B54] sm:text-base">
          Use this checklist across every month-end close cycle to ensure
          complete coverage from cash through equity:
        </p>
        <GuideComparisonTable
          minWidthClass="min-w-[680px]"
          headers={[
            "Account Category",
            "Typical GL Accounts",
            "Risk / Cadence",
            "Required Supporting Evidence",
          ]}
          rows={[
            [
              "Cash & Equivalents",
              "Operating checking, savings, petty cash",
              "High (Monthly / Weekly)",
              "Bank statements, bank reconciliation schedule & petty cash count sheet",
            ],
            [
              "Payment Clearing",
              "Stripe, PayPal, Square undeposited funds",
              "High (Monthly)",
              "Processor settlement report & fee schedule tied to bank deposits",
            ],
            [
              "Accounts Receivable",
              "Trade AR & unapplied customer credits",
              "High (Monthly)",
              "AR Aging subledger tied directly to GL control + doubtful debt calculation",
            ],
            [
              "Inventory",
              "Raw materials, WIP, finished goods",
              "High (Monthly / Quarterly)",
              "Inventory valuation report, physical count logs & goods-in-transit cutoff",
            ],
            [
              "Prepaid Expenses",
              "Prepaid insurance, software, deposits",
              "Medium (Monthly)",
              "Amortization schedule linked to underlying annual vendor invoices",
            ],
            [
              "Fixed Assets & Depreciation",
              "Equipment, leasehold, accumulated depr.",
              "Medium (Monthly)",
              "Fixed asset subledger roll-forward (additions, disposals, depreciation run)",
            ],
            [
              "Accounts Payable & Cards",
              "Trade AP, corporate cards (Amex/Ramp)",
              "High (Monthly)",
              "AP Aging subledger, unbilled accrual log & monthly card statements",
            ],
            [
              "Accrued & Payroll Liabilities",
              "Accrued wages, PTO, taxes, utilities",
              "High (Monthly)",
              "Payroll register summaries, vacation accrual sheet & tax filing returns",
            ],
            [
              "Deferred Revenue",
              "Unearned annual customer contracts",
              "High (Monthly)",
              "Contract revenue recognition waterfall & customer billing schedule",
            ],
            [
              "Debt & Equity",
              "Term loans, notes, paid-in capital, RE",
              "Medium (Monthly / Quarterly)",
              "Lender loan amortization statement & equity cap-table roll-forward",
            ],
          ]}
        />
      </section>

      <section
        id="best-practices"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          6. Three Controls That Transform Month-End Close Quality
        </h2>
        <ul className="mt-4 space-y-2.5 text-xs leading-relaxed text-[#474B54] sm:text-sm">
          <li>
            <strong className="text-[#111214]">
              Enforce the 30-Day Reconciling Item Rule:
            </strong>{" "}
            Require a specific explanation and resolution date for every
            reconciling item older than 30 days so stale items never accumulate.
          </li>
          <li>
            <strong className="text-[#111214]">
              Monitor Post-Approval GL Edits:
            </strong>{" "}
            If an adjusting journal entry hits an account after its
            reconciliation was approved, immediately re-open and re-verify that
            schedule before closing the period.
          </li>
          <li>
            <strong className="text-[#111214]">
              Standardize Workpaper Naming &amp; Exports:
            </strong>{" "}
            Keep consistent cover tabs, account numbers, period ending dates,
            and downloadable{" "}
            <Link href="/reconcile" className="font-semibold text-[#111214] underline">
              XLSX workpapers
            </Link>{" "}
            so external auditors can sample any month in seconds.
          </li>
        </ul>
      </section>

      <GuideFaqSection
        items={[
          {
            question: "Which financial accounts require balance sheet reconciliation?",
            answer:
              "Every active balance sheet account—including cash, payment clearing, accounts receivable, inventory, prepaids, fixed assets, accounts payable, corporate credit cards, accrued liabilities, deferred revenue, debt, and equity—requires periodic reconciliation against supporting evidence.",
          },
          {
            question: "What is the difference between a trial balance and a balance sheet reconciliation?",
            answer:
              "A trial balance simply lists every GL account's ending debit or credit balance at a point in time to confirm total debits equal total credits. A balance sheet reconciliation proves each individual line on that trial balance is supported by external statements or subledger schedules.",
          },
          {
            question: "How does reconcilebankstatement help with balance sheet reconciliations?",
            answer:
              "reconcilebankstatement automates transaction matching and running-balance proof for cash accounts, corporate cards, and payment clearing accounts—exporting structured XLSX and CSV workpapers ready to attach to your close binder.",
          },
        ]}
      />
    </TrustPageShell>
  );
}
