import Link from "next/link";
import {
  GuideComparisonTable,
  GuideFaqSection,
  QuickAnswerBox,
  ToolInlineCta,
  WorkedScheduleSide,
} from "@/components/tool/guide-blocks";
import { buildArticleSchema } from "@/components/trust/structured-data";
import { TrustPageShell } from "@/components/trust/trust-page-shell";
import { AUTHORS, createPageMetadata, REVIEWERS } from "@/lib/site-config";

const PAGE_PATH = "/tool/bank-statement-reconciliation";
const PAGE_TITLE = "Bank Reconciliation Explained: Complete Beginner’s Guide";
const PAGE_DESCRIPTION =
  "Complete beginner's guide to bank statement reconciliation: what it means, why statements differ from your cash book, bank vs. book perspectives, and a worked tie-out.";

export const metadata = createPageMetadata({
  path: PAGE_PATH,
  title: `${PAGE_TITLE} | reconcilebankstatement`,
  description: PAGE_DESCRIPTION,
  keywords: [
    "bank statement reconciliation",
    "bank reconciliation for beginners",
    "reconcile bank statement",
    "bank vs book balance",
  ],
  type: "article",
});

export default function BankStatementReconciliationGuidePage() {
  return (
    <TrustPageShell
      path={PAGE_PATH}
      eyebrow="Beginner's Guide"
      title={PAGE_TITLE}
      lead="Bank statement reconciliation is the monthly financial habit that verifies your accounting cash records match what actually cleared your bank. This beginner-friendly guide explains the core logic, solves the debit/credit sign confusion, and walks through a complete tie-out."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Tools & Guides", href: "/tool" },
        { label: "Bank Statement Reconciliation" },
      ]}
      author={AUTHORS.editorialProduct}
      reviewer={REVIEWERS.technicalReview}
      heroCta={{
        label: "Reconcile Your Bank Statement Now",
        href: "/reconcile",
        secondaryLabel: "Jump to Worked Example",
        secondaryHref: "#beginner-example",
        note: "Supports digital or scanned PDFs, images, CSV, TSV, TXT & XLSX — test instantly with sample CSVs",
      }}
      sections={[
        { id: "what-is-it", label: "What Bank Statement Reconciliation Is" },
        { id: "why-balances-differ", label: "Why Bank & Book Balances Differ" },
        { id: "debit-credit-perspective", label: "Bank vs. Book Debit & Credit Rules" },
        { id: "book-to-bank-formula", label: "The Two-Sided Formula" },
        { id: "beginner-example", label: "Beginner Worked Example" },
        { id: "tool-comparison", label: "Manual vs. Automated Tools" },
        { id: "beginner-mistakes", label: "Common Mistakes to Avoid" },
        { id: "faqs", label: "Beginner FAQs" },
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
            "Follow a 7-step checklist from opening balance verification to workpaper archival.",
          href: "/tool/bank-reconciliation-steps",
        },
        {
          title: "Worked Bank Reconciliation Example",
          description:
            "Inspect a full month-end tie-out with raw transactions, errors, and journal entries.",
          href: "/tool/bank-reconciliation-example",
        },
        {
          title: "Outstanding Cheques Explained",
          description:
            "Learn how unpresented cheques and stale-dated checks affect your reconciliation.",
          href: "/tool/outstanding-cheques-in-bank-reconciliation",
        },
      ]}
      ctaOverride={{
        title: "Skip fragile VLOOKUP spreadsheets—reconcile in seconds",
        description:
          "Upload your bank statement PDF or CSV and your cash book export to reconcilebankstatement. Spot unmatched fees, timing lags, duplicates, and sign flips automatically.",
        buttonLabel: "Start Free Reconciliation",
      }}
    >
      <QuickAnswerBox
        label="In Plain English"
        summary="Bank statement reconciliation is the process of comparing every deposit, withdrawal, and ending balance on your bank statement against your internal cash book or accounting ledger for the exact same dates—explaining every difference until Adjusted Bank Balance equals Adjusted Book Balance."
        points={[
          "Confirms your true spendable cash before paying vendors or payroll",
          "Separates harmless timing lags from unrecorded bank fees or errors",
          "Catches duplicate postings, transposed digits, and unauthorized debits",
          "Recommended at least monthly (or weekly for active operating accounts)",
        ]}
      />

      <section
        id="what-is-it"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          1. What Is Bank Statement Reconciliation?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#474B54] sm:text-base">
          Whenever you run a business—even as a solo freelancer—two separate
          records track the same bank account: the{" "}
          <strong className="text-[#111214]">bank statement</strong> issued by
          your financial institution, and your{" "}
          <strong className="text-[#111214]">
            internal cash book or general ledger
          </strong>{" "}
          maintained in QuickBooks, Xero, Excel, or an ERP.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#474B54] sm:text-base">
          Because you record transactions when you write a payment or send an
          invoice batch, while the bank records them only when funds physically
          clear through clearing networks (ACH, Faster Payments, SEPA, wires, or
          paper check clearing), the two ending balances almost never match on
          day one. Bank statement reconciliation bridges that gap systematically
          so you know whether a difference is temporary timing or a real error
          that needs fixing.
        </p>
      </section>

      <section
        id="why-balances-differ"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          2. Why Your Bank Statement Doesn&apos;t Match Your Books
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#474B54] sm:text-base">
          Nearly every mismatch during bank statement reconciliation falls into
          one of three categories:
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-5">
            <h3 className="text-sm font-semibold text-[#111214] sm:text-base">
              1. Timing Differences
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-[#474B54] sm:text-sm">
              Legitimate transactions recorded by you near month-end that clear
              the bank 1–5 banking days later—such as{" "}
              <strong className="text-[#111214]">deposits in transit</strong>{" "}
              and{" "}
              <Link
                href="/tool/outstanding-cheques-in-bank-reconciliation"
                className="font-medium text-[#111214] underline"
              >
                outstanding cheques
              </Link>
              .
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-5">
            <h3 className="text-sm font-semibold text-[#111214] sm:text-base">
              2. Bank-Only Omissions
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-[#474B54] sm:text-sm">
              Activity initiated by the bank before reaching your ledger:
              monthly account fees, wire fees, earned interest, FX conversion
              spreads, or{" "}
              <Link
                href="/tool/nsf-checks-bank-reconciliation"
                className="font-medium text-[#111214] underline"
              >
                NSF returned cheques
              </Link>
              .
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-5">
            <h3 className="text-sm font-semibold text-[#111214] sm:text-base">
              3. Data-Entry &amp; Bank Errors
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-[#474B54] sm:text-sm">
              Swapped digits (typing $540 instead of $450), duplicate CSV imports,
              entries posted to the wrong month, flipped debit/credit columns,
              or rare bank mispostings.
            </p>
          </div>
        </div>
      </section>

      <section
        id="debit-credit-perspective"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          3. Bank vs. Book Perspective: Why Debits and Credits Flip
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#474B54] sm:text-base">
          The single biggest stumbling block for beginners is seeing deposits
          labeled <strong className="text-[#111214]">Credit</strong> on a bank
          statement when accounting classes teach that cash increases are{" "}
          <strong className="text-[#111214]">Debits</strong>. Both are right—the
          sign flips because of whose perspective the report represents:
        </p>
        <GuideComparisonTable
          headers={[
            "Transaction Event",
            "On Your Business Cash Book (Asset)",
            "On Your Bank Statement (Bank's Liability)",
          ]}
          rows={[
            [
              "Customer pays you $1,000",
              "Debit (+Cash Asset increases)",
              "Credit (+Bank owes you $1,000 more)",
            ],
            [
              "You pay a supplier $400",
              "Credit (−Cash Asset decreases)",
              "Debit (−Bank owes you $400 less)",
            ],
            [
              "Bank charges a $25 wire fee",
              "Credit (−Cash once you record the fee)",
              "Debit (Bank deducts $25 from your balance)",
            ],
            [
              "Bank credits $15 monthly interest",
              "Debit (+Cash once you record interest)",
              "Credit (Bank increases what it owes you)",
            ],
          ]}
        />
        <p className="mt-3 text-xs leading-relaxed text-[#474B54] sm:text-sm">
          Tip: If you upload a spreadsheet ledger to{" "}
          <Link href="/reconcile" className="font-semibold text-[#111214] underline">
            reconcilebankstatement
          </Link>
          , the engine automatically detects whether your ledger uses{" "}
          <code>bank</code> or <code>book</code> direction conventions so true
          matches never fail because of reversed Dr/Cr columns.
        </p>
      </section>

      <section
        id="book-to-bank-formula"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          4. The Standard Book-to-Bank Reconciliation Formula
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#474B54] sm:text-base">
          Traditional reconciliation adjusts both unadjusted ending balances
          until they converge on the exact same{" "}
          <strong className="text-[#111214]">True Adjusted Cash Balance</strong>
          :
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-[#111214] p-5 text-white">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#BDF71D]">
              Bank Statement Side
            </h3>
            <p className="mt-2 font-mono text-xs leading-relaxed text-white/90 sm:text-sm">
              Adjusted Bank Balance = Unadjusted Bank Balance + Deposits in
              Transit − Outstanding Cheques ± Bank Errors
            </p>
            <p className="mt-3 text-xs text-white/75">
              Items on this side explain timing lags—they usually do not require
              journal entries in your ledger.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#111214]">
              Book (General Ledger) Side
            </h3>
            <p className="mt-2 font-mono text-xs leading-relaxed text-[#111214] sm:text-sm">
              Adjusted Book Balance = Unadjusted Book Balance + Interest Earned
              − Bank Fees − NSF Returns ± Book Errors
            </p>
            <p className="mt-3 text-xs text-[#474B54]">
              Every item on this side requires an adjusting journal entry to
              bring your accounting ledger up to date.
            </p>
          </div>
        </div>
      </section>

      <section
        id="beginner-example"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          5. Simple Beginner Worked Example ($0.00 Variance)
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#474B54] sm:text-base">
          Imagine a neighborhood bakery closes March with an{" "}
          <strong className="text-[#111214]">
            unadjusted bank statement balance of $14,250.00
          </strong>{" "}
          and an{" "}
          <strong className="text-[#111214]">
            unadjusted cash book balance of $14,685.00
          </strong>
          . Line-by-line matching uncovers four differences:
        </p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-xs leading-relaxed text-[#474B54] sm:text-sm">
          <li>
            March 31 daily POS deposit of <strong>$420.00</strong> settled at
            the bank on April 1 (Deposit in Transit).
          </li>
          <li>
            Check #812 for <strong>$155.00</strong> mailed to a packaging
            supplier has not cleared yet (Outstanding Cheque).
          </li>
          <li>
            Bank deducted a <strong>$25.00</strong> monthly service charge not
            yet entered in the cash book.
          </li>
          <li>
            Bank deducted a <strong>$145.00</strong> card processing fee debit
            memo not yet recorded in the books.
          </li>
        </ul>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <WorkedScheduleSide
            title="Bank Side Adjustment"
            rows={[
              { label: "Unadjusted Bank Statement (Mar 31)", amount: "$14,250.00" },
              {
                label: "+ Deposit in Transit (Mar 31 batch)",
                amount: "+$420.00",
                tone: "add",
              },
              {
                label: "− Outstanding Check #812",
                amount: "−$155.00",
                tone: "deduct",
              },
              {
                label: "Adjusted Bank Balance",
                amount: "$14,515.00",
                tone: "total",
              },
            ]}
          />
          <WorkedScheduleSide
            title="Book (Cash Ledger) Adjustment"
            rows={[
              { label: "Unadjusted Cash Book (Mar 31)", amount: "$14,685.00" },
              {
                label: "− Unrecorded Monthly Maintenance Fee",
                amount: "−$25.00",
                tone: "deduct",
              },
              {
                label: "− Unrecorded Merchant Fee Memo",
                amount: "−$145.00",
                tone: "deduct",
              },
              {
                label: "Adjusted Book Balance",
                amount: "$14,515.00",
                tone: "total",
              },
            ]}
          />
        </div>
        <p className="mt-4 text-xs leading-relaxed text-[#474B54] sm:text-sm">
          Both adjusted balances equal <strong className="text-[#111214]">$14,515.00</strong>.
          Want a multi-error example with transposition mistakes and NSF checks?
          See our{" "}
          <Link
            href="/tool/bank-reconciliation-example"
            className="font-semibold text-[#111214] underline"
          >
            full worked bank reconciliation example
          </Link>
          .
        </p>
      </section>

      <ToolInlineCta
        eyebrow="Fast Browser Utility"
        title="Compare Your Bank PDF or CSV Against Your Ledger Right Now"
        description="Don't manually tick off hundreds of rows in Excel. Upload your statement and ledger—including password-protected or scanned PDFs—to match rows within ±0–31 days and export clean XLSX or CSV workpapers."
        buttonLabel="Open Reconciliation Workbench"
        href="/reconcile"
        secondaryLabel="Read Step-by-Step Process"
        secondaryHref="/tool/bank-reconciliation-steps"
        highlights={[
          "No bank password needed",
          "PDF, Image, CSV, XLSX",
          "Free sample CSV test",
        ]}
      />

      <section
        id="tool-comparison"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          6. Manual Spreadsheets vs. Cloud Accounting vs. File Reconciliation
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#474B54] sm:text-base">
          Choosing the right tool depends on whether you have live bank feeds
          active or need to verify historical statements and spreadsheets right
          away:
        </p>
        <GuideComparisonTable
          headers={[
            "Approach",
            "Best Use Case",
            "Key Limitation",
          ]}
          rows={[
            [
              "Manual Excel / VLOOKUP",
              "Very small checkbooks (<25 lines/month)",
              "Breaks on date lags, PDF scans, US/EU comma swaps, and flipped Dr/Cr signs",
            ],
            [
              "Accounting Suites (QuickBooks / Xero)",
              "Ongoing daily bank feeds linked to live invoices",
              "Requires monthly subscriptions, live bank logins, and struggles with old PDF statements",
            ],
            [
              "reconcilebankstatement (Browser Tool)",
              "Comparing exported PDFs, scanned statements, CSVs, or XLSX ledgers instantly",
              "Built for fast file tie-outs and XLSX/CSV workpapers rather than replacing your full GL",
            ],
          ]}
        />
      </section>

      <section
        id="beginner-mistakes"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          7. Five Beginner Reconciliation Mistakes to Avoid
        </h2>
        <ul className="mt-4 space-y-3 text-xs leading-relaxed text-[#474B54] sm:text-sm">
          <li>
            <strong className="text-[#111214]">
              Skipping the Opening Balance Check:
            </strong>{" "}
            Always verify that your starting balance matches last month&apos;s
            reconciled ending balance before matching individual rows.
          </li>
          <li>
            <strong className="text-[#111214]">
              Using Plug Adjustments to Force $0.00:
            </strong>{" "}
            Creating a mystery &quot;Reconciliation Discrepancy&quot; entry hides
            real errors, duplicate expenses, or fraud.
          </li>
          <li>
            <strong className="text-[#111214]">
              Overlapping Date Exports:
            </strong>{" "}
            Downloading CSVs with overlapping date ranges creates duplicate
            transactions in your cash book.
          </li>
          <li>
            <strong className="text-[#111214]">
              Mixing US &amp; UK/EU Date Formats:
            </strong>{" "}
            Importing <code>04/07/2026</code> into a spreadsheet set to the wrong
            locale turns April 7 into July 4 silently.
          </li>
          <li>
            <strong className="text-[#111214]">
              Letting Uncleared Items Age Forever:
            </strong>{" "}
            Review any outstanding cheque or deposit in transit older than 30
            days so lost payments are reissued or reversed promptly.
          </li>
        </ul>
      </section>

      <GuideFaqSection
        items={[
          {
            question: "How often should I do a bank statement reconciliation?",
            answer:
              "Reconcile at least once a month right after your statement closes. Businesses with high daily card volume, e-commerce payouts, or tight cash balances should reconcile weekly.",
          },
          {
            question: "What if my bank statement is only available as a scanned PDF?",
            answer:
              "You can upload digital or scanned PDFs (up to 200 pages and 100 MB) directly to reconcilebankstatement. Built-in OCR extracts line items and verifies running balances mathematically so missed lines are flagged.",
          },
          {
            question: "Do I pass a journal entry for deposits in transit or outstanding checks?",
            answer:
              "No. Both are already recorded correctly in your books; they are timing differences adjusted only on the bank side of the reconciliation schedule until they clear.",
          },
          {
            question: "What is the difference between bank reconciliation and account reconciliation?",
            answer:
              "Bank reconciliation ties cash and checking statements to the cash ledger, whereas account reconciliation covers every balance sheet GL account—including accounts receivable, accounts payable, prepaids, and corporate cards.",
          },
        ]}
      />
    </TrustPageShell>
  );
}
