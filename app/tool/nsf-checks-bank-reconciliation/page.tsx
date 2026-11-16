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

const PAGE_PATH = "/tool/nsf-checks-bank-reconciliation";
const PAGE_TITLE = "NSF and Returned Cheques in Bank Reconciliation";
const PAGE_DESCRIPTION =
  "Learn how to handle NSF (non-sufficient funds) and returned cheques in bank reconciliation: book-side deductions, worked numbers, exact journal entries with bank fees, and AR recovery.";

export const metadata = createPageMetadata({
  path: PAGE_PATH,
  title: `${PAGE_TITLE} | reconcilebankstatement`,
  description: PAGE_DESCRIPTION,
  keywords: [
    "nsf checks bank reconciliation",
    "nsf cheques in bank reconciliation",
    "returned check journal entry",
    "bounced check bank reconciliation",
  ],
  type: "article",
});

export default function NsfChecksBankReconciliationPage() {
  return (
    <TrustPageShell
      path={PAGE_PATH}
      eyebrow="Returned Items & Adjustments"
      title={PAGE_TITLE}
      lead="When a customer's payment bounces due to Non-Sufficient Funds (NSF) or an ACH R01 return, your bank immediately pulls the money back—often alongside a returned-item fee. Here is how to account for NSF cheques in your bank reconciliation and post clean adjusting entries."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Tools & Guides", href: "/tool" },
        { label: "NSF & Returned Cheques" },
      ]}
      author={AUTHORS.editorialProduct}
      reviewer={REVIEWERS.technicalReview}
      heroCta={{
        label: "Find Unrecorded NSF Returns in Seconds",
        href: "/reconcile",
        secondaryLabel: "Jump to NSF Journal Entries",
        secondaryHref: "#nsf-journal-entries",
        note: "Surfaces bank-only reversals & NSF fees cleanly in Unmatched Bank",
      }}
      sections={[
        { id: "what-is-nsf", label: "What NSF & Returned Cheques Mean" },
        { id: "reconciliation-side", label: "Book-Side Deduction Rule" },
        { id: "nsf-example", label: "Worked NSF Reconciliation Example" },
        { id: "nsf-journal-entries", label: "Exact Adjusting Journal Entries" },
        { id: "follow-up", label: "Operational & AR Follow-Up" },
        { id: "faqs", label: "NSF Cheques FAQs" },
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
          title: "Outstanding Cheques Explained",
          description:
            "Compare book-side NSF deductions with bank-side unpresented cheques.",
          href: "/tool/outstanding-cheques-in-bank-reconciliation",
        },
        {
          title: "Worked Bank Reconciliation Example",
          description:
            "See an NSF return reconciled alongside timing lags and transposition errors.",
          href: "/tool/bank-reconciliation-example",
        },
        {
          title: "Bank Reconciliation Steps",
          description:
            "Review where bank-only items and adjusting entries sit in the 7-step close.",
          href: "/tool/bank-reconciliation-steps",
        },
      ]}
      ctaOverride={{
        title: "Catch bounced customer deposits and NSF fees before month-end close",
        description:
          "Upload your statement PDF, image, CSV, or XLSX alongside your business ledger. reconcilebankstatement isolates bank return memos and fees automatically for fast adjusting entries.",
        buttonLabel: "Check Statement vs. Ledger",
      }}
    >
      <QuickAnswerBox
        label="Key Accounting Rule"
        summary="An NSF (Non-Sufficient Funds) or returned cheque is always DEDUCTED from the Unadjusted Book (Cash Ledger) Balance during bank reconciliation—never from the Bank Statement Balance. Because your bank already reversed the bounced deposit and charged any return fee, your internal cash ledger is overstated until you pass an adjusting journal entry reinstating Accounts Receivable and recording the bank fee."
        points={[
          "Affects the Book Side (Ledger) only—requires an adjusting journal entry",
          "Reinstates the customer's Accounts Receivable balance so they still owe you",
          "Separately tracks any bank NSF processing fee ($15–$35+)",
          "Applies equally to bounced paper cheques, ACH R01 returns, and direct debit reversals",
        ]}
      />

      <section
        id="what-is-nsf"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          1. What Are NSF and Returned Cheques?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#474B54] sm:text-base">
          An <strong className="text-[#111214]">NSF cheque</strong>{" "}
          (Non-Sufficient Funds, dishonored cheque, or bounced check) occurs
          when you deposit a customer&apos;s cheque or ACH payment, record the
          cash receipt in your ledger, and your bank subsequently reverses the
          credit because the customer&apos;s account lacked sufficient funds to
          settle.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#474B54] sm:text-base">
          Notice that modern statements also show{" "}
          <strong className="text-[#111214]">returned ACH/direct debit</strong>{" "}
          entries (such as NACHA return code <code>R01 Insufficient Funds</code>{" "}
          or UK BACS unpaid direct debits) that work identically in accounting.
          (If a cheque <em>your own company</em> wrote bounced due to NSF, your
          bank deducts a penalty fee from your account and your vendor payable
          remains unpaid until settled.)
        </p>
      </section>

      <section
        id="reconciliation-side"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          2. Why NSF Cheques Deduct From the Book Balance (Not the Bank Balance)
        </h2>
        <GuideComparisonTable
          headers={[
            "Event Timeline",
            "Bank Statement Reality",
            "Your Accounting Ledger",
          ]}
          rows={[
            [
              "Nov 18: You deposit $1,250 cheque",
              "Provisional credit of +$1,250 appears",
              "Cash debited +$1,250; Customer AR credited −$1,250",
            ],
            [
              "Nov 24: Cheque bounces (NSF) + $30 fee",
              "Bank reverses −$1,250 and deducts −$30 fee",
              "Ledger still shows +$1,250 unless you enter the return memo",
            ],
            [
              "Nov 30: Reconciliation Tie-Out",
              "Bank Balance is ALREADY accurate (no bank adjustment)",
              "Deduct −$1,250 NSF and −$30 fee from Unadjusted Book Balance",
            ],
          ]}
        />
      </section>

      <section
        id="nsf-example"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          3. Worked Bank Reconciliation Example With an NSF Cheque &amp; Fee
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#474B54] sm:text-base">
          Suppose on November 30 your unadjusted bank statement balance is{" "}
          <strong className="text-[#111214]">$15,120.00</strong> (with one{" "}
          <strong className="text-[#111214]">$600.00</strong> customer batch
          still in transit) while your cash book shows{" "}
          <strong className="text-[#111214]">$17,000.00</strong>. Checking the
          statement reveals a{" "}
          <strong className="text-[#111214]">$1,250.00</strong> NSF debit
          reversal from Apex Studio plus a{" "}
          <strong className="text-[#111214]">$30.00</strong> returned-item fee:
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <WorkedScheduleSide
            title="Bank Statement Side"
            rows={[
              { label: "Unadjusted Bank Balance (Nov 30)", amount: "$15,120.00" },
              {
                label: "+ Deposit in Transit (Nov 30 batch)",
                amount: "+$600.00",
                tone: "add",
              },
              {
                label: "Adjusted Bank Balance",
                amount: "$15,720.00",
                tone: "total",
              },
            ]}
          />
          <WorkedScheduleSide
            title="Book (Cash Ledger) Side"
            rows={[
              { label: "Unadjusted Cash Book Balance (Nov 30)", amount: "$17,000.00" },
              {
                label: "− Customer NSF Returned Cheque (Apex Studio)",
                amount: "−$1,250.00",
                tone: "deduct",
              },
              {
                label: "− Bank NSF Returned-Item Fee",
                amount: "−$30.00",
                tone: "deduct",
              },
              {
                label: "Adjusted Book Balance",
                amount: "$15,720.00",
                tone: "total",
              },
            ]}
          />
        </div>
      </section>

      <section
        id="nsf-journal-entries"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          4. Exact NSF Adjusting Journal Entries (Both Fee Options)
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#474B54] sm:text-base">
          Choose the journal entry structure matching whether your company
          absorbs the bank fee as an operating expense or passes the penalty back
          onto the customer&apos;s invoice:
        </p>

        <JournalEntryTable
          caption="Option A: Company Absorbs Bank Fee Separately (Most Transparent)"
          date="Nov 30"
          narration="Reverse Apex Studio bounced $1,250 cheque and expense $30 bank return fee"
          lines={[
            {
              account: "Accounts Receivable — Apex Studio",
              note: "Reinstates unpaid invoice balance on customer statement",
              debit: "$1,250.00",
            },
            {
              account: "Bank Service Charges Expense",
              note: "Records bank's NSF processing penalty",
              debit: "$30.00",
            },
            {
              account: "Cash (#1010)",
              note: "Reduces cash ledger to match bank deduction",
              credit: "$1,280.00",
            },
          ]}
        />

        <JournalEntryTable
          caption="Option B: Rebilling the $30 NSF Fee Directly to Customer Receivable"
          date="Nov 30"
          narration="Reinstate Apex Studio AR for bounced cheque plus contractual $30 NSF recovery charge"
          lines={[
            {
              account: "Accounts Receivable — Apex Studio",
              note: "Bills customer $1,250 principal + $30 returned-item fee",
              debit: "$1,280.00",
            },
            {
              account: "Cash (#1010)",
              credit: "$1,280.00",
            },
          ]}
        />

        <p className="mt-4 text-xs leading-relaxed text-[#474B54] sm:text-sm">
          <em>What if the returned cheque came from an immediate cash sale (no AR)?</em>{" "}
          Create an Accounts Receivable invoice for the customer at the time of
          reversal (debiting AR, crediting Cash) rather than erasing revenue
          immediately—so your collections team tracks the balance due until
          collected or written off to Bad Debt Expense.
        </p>
      </section>

      <ToolInlineCta
        eyebrow="Exception-First Detection"
        title="Automatically Isolate Bounced Cheques & Bank Return Fees"
        description="When you upload your statement and ledger to reconcilebankstatement, unrecorded NSF reversals and return fees appear immediately in Unmatched Bank—and near-pairs with flipped signs flag under Amount Mismatches."
        buttonLabel="Run Statement Check Now"
        href="/reconcile"
        secondaryLabel="See Full Reconciliation Example"
        secondaryHref="/tool/bank-reconciliation-example"
        highlights={[
          "Flags bank-only reversals",
          "Catches sign inversions",
          "Exports clean XLSX & CSV",
        ]}
      />

      <section
        id="follow-up"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          5. Operational Checklist After Discovering an NSF Return
        </h2>
        <ul className="mt-4 space-y-2.5 text-xs leading-relaxed text-[#474B54] sm:text-sm">
          <li>
            <strong className="text-[#111214]">Notify the Customer Promptly:</strong>{" "}
            Share the bank return notice (without disclosing sensitive account
            numbers) and pause pending shipments or credit terms until cleared.
          </li>
          <li>
            <strong className="text-[#111214]">Request Guaranteed Funds:</strong>{" "}
            Require a wire transfer, Faster Payment, SEPA instant credit, or
            certified bank draft instead of re-depositing a questionable paper
            cheque.
          </li>
          <li>
            <strong className="text-[#111214]">Never Delete the Original Receipt:</strong>{" "}
            In software like QuickBooks or Xero, keep the original deposit and
            post a reversing NSF entry dated on the actual bank return date so
            past reconciled periods remain intact.
          </li>
        </ul>
      </section>

      <GuideFaqSection
        items={[
          {
            question: "Does an NSF check increase or decrease the book balance?",
            answer:
              "An NSF check always decreases your unadjusted book (cash ledger) balance because you previously increased cash when depositing the check, and the bank later reversed those funds.",
          },
          {
            question: "Should I adjust the bank statement balance for an NSF check?",
            answer:
              "No. The bank statement already reflects the bounced check deduction and any NSF fee. Only the company's internal accounting ledger needs adjustment.",
          },
          {
            question: "What happens if an NSF check occurs in a closed accounting period?",
            answer:
              "Leave the prior closed month intact and date the adjusting NSF reversal entry on the actual date the bank returned the item in the current open period.",
          },
        ]}
      />
    </TrustPageShell>
  );
}
