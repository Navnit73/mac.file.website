import Link from "next/link";
import {
  GuideComparisonTable,
  GuideFaqSection,
  QuickAnswerBox,
  ToolInlineCta,
} from "@/components/tool/guide-blocks";
import { buildArticleSchema } from "@/components/trust/structured-data";
import { TrustPageShell } from "@/components/trust/trust-page-shell";
import { AUTHORS, createPageMetadata, REVIEWERS } from "@/lib/site-config";

const PAGE_PATH = "/tool/bank-reconciliation-steps";
const PAGE_TITLE = "Bank Reconciliation Steps: A Step-by-Step Process";
const PAGE_DESCRIPTION =
  "Follow these 7 proven bank reconciliation steps: gather documents, verify opening balances, match deposits and outflows, record bank fees, resolve transposition errors, and archive proof.";

export const metadata = createPageMetadata({
  path: PAGE_PATH,
  title: `${PAGE_TITLE} | reconcilebankstatement`,
  description: PAGE_DESCRIPTION,
  keywords: [
    "bank reconciliation steps",
    "how to do bank reconciliation step by step",
    "bank reconciliation process",
    "bank reconciliation checklist",
  ],
  type: "article",
});

const STEPS = [
  {
    num: "01",
    title: "Gather Your Bank Statement & Matching Cash Book Export",
    detail:
      "Pull the official bank statement (PDF, CSV, or XLSX) and your business ledger / cash book export for the exact same period and currency. Verify both files show opening and closing balances.",
  },
  {
    num: "02",
    title: "Verify Opening Balances Before Matching Any Rows",
    detail:
      "Confirm this period's opening bank and ledger balances equal last period's ending reconciled figures. Also check Opening + Net Flow = Closing on the bank statement itself so missing OCR or CSV lines are caught early.",
  },
  {
    num: "03",
    title: "Match Cash Inflows & Flag Deposits in Transit",
    detail:
      "Compare deposits on the bank statement (credits on the bank statement) against receipts recorded in your cash book (debits in accounting). Receipts booked near cutoff that have not hit the bank yet become Deposits in Transit.",
  },
  {
    num: "04",
    title: "Match Cash Outflows & List Outstanding Cheques",
    detail:
      "Match cleared checks, ACH debits, SEPA transfers, and card payments against ledger disbursements. Payments recorded in your books that have not cleared the bank become Outstanding Cheques / Uncleared Outflows.",
  },
  {
    num: "05",
    title: "Isolate Bank-Only Items & Post Adjusting Entries",
    detail:
      "Identify transactions appearing only on the bank statement—such as wire fees, monthly maintenance charges, interest earned, or NSF returned checks—and pass adjusting journal entries in your books.",
  },
  {
    num: "06",
    title: "Investigate Remaining Discrepancies, Duplicates & Sign Flips",
    detail:
      "If Adjusted Bank still does not equal Adjusted Book, check for transposed digits, duplicate imports, payments posted in the wrong period, or a withdrawal entered as a deposit (Dr/Cr inversion).",
  },
  {
    num: "07",
    title: "Confirm $0.00 Variance & Export the Audit Workpaper",
    detail:
      "Once Adjusted Bank Balance equals Adjusted Book Balance, export the completed reconciliation report (XLSX or CSV), attach supporting statements, lock the closed accounting period, and record sign-off.",
  },
];

export default function BankReconciliationStepsPage() {
  return (
    <TrustPageShell
      path={PAGE_PATH}
      eyebrow="Step-by-Step Process"
      title={PAGE_TITLE}
      lead="Whether you reconcile in QuickBooks, Xero, Excel, or directly from statement files, reliable tie-outs follow the same disciplined seven-step sequence. Use this workflow and variance troubleshooting guide to reach $0.00 variance every close."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Tools & Guides", href: "/tool" },
        { label: "Bank Reconciliation Steps" },
      ]}
      author={AUTHORS.editorialProduct}
      reviewer={REVIEWERS.technicalReview}
      heroCta={{
        label: "Automate Steps 2–7 in the Workbench",
        href: "/reconcile",
        secondaryLabel: "View Troubleshooting Cheat Sheet",
        secondaryHref: "#troubleshooting",
        note: "Matches lines within ±0–31 days, checks running balances & exports clean XLSX/CSV reports",
      }}
      sections={[
        { id: "seven-steps", label: "The 7 Bank Reconciliation Steps" },
        { id: "troubleshooting", label: "Variance Troubleshooting Cheat Sheet" },
        { id: "software-workflows", label: "Cloud Feeds vs. Direct File Matching" },
        { id: "close-best-practices", label: "Habits That Cut Close Time" },
        { id: "faqs", label: "Process FAQs" },
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
          title: "Bank Reconciliation Example",
          description:
            "Follow these exact 7 steps on a complete worked dataset with adjusting entries.",
          href: "/tool/bank-reconciliation-example",
        },
        {
          title: "Reconciliation Methodology",
          description:
            "See how reconcilebankstatement automates date windows, memo scoring, and balance proofs.",
          href: "/bank-reconciliation-methodology",
        },
        {
          title: "NSF & Returned Cheques Guide",
          description:
            "Learn how to handle bounced customer deposits discovered in Step 5.",
          href: "/tool/nsf-checks-bank-reconciliation",
        },
      ]}
      ctaOverride={{
        title: "Skip manual tick-and-tie—run all 7 reconciliation checks automatically",
        description:
          "Upload your statement and ledger files to reconcilebankstatement, configure your ±0–31 day date tolerance, isolate exceptions in seconds, and export XLSX or CSV workpapers.",
        buttonLabel: "Run Step-by-Step Tool",
      }}
    >
      <QuickAnswerBox
        label="Process Summary"
        summary="The 7 bank reconciliation steps are: (1) gather matching statement and ledger exports, (2) prove opening balances, (3) match deposits and isolate deposits in transit, (4) match payments and list outstanding cheques, (5) record bank-only fees, interest, and NSF returns, (6) hunt down transposition or duplicate errors, and (7) verify $0.00 variance and archive the workpaper."
      />

      <section id="seven-steps" className="space-y-4">
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          1. The 7 Bank Reconciliation Steps in Order
        </h2>
        <div className="space-y-3">
          {STEPS.map((step) => (
            <article
              key={step.num}
              className="flex gap-4 rounded-[24px] border border-slate-200 bg-white p-5 sm:p-6"
            >
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#111214] font-mono text-xs font-bold text-[#BDF71D]">
                {step.num}
              </span>
              <div>
                <h3 className="text-base font-semibold text-[#111214] sm:text-lg">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#474B54] sm:text-sm">
                  {step.detail}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="troubleshooting"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          2. Variance Troubleshooting Cheat Sheet (When Books Still Don&apos;t Tie)
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#474B54] sm:text-base">
          If you finish Steps 1–5 and still have a lingering discrepancy, the{" "}
          <em>size</em> of the difference gives away the exact root cause:
        </p>
        <GuideComparisonTable
          headers={[
            "Mathematical Clue",
            "Most Likely Cause",
            "How to Fix It Fast",
          ]}
          rows={[
            [
              "Difference is evenly divisible by 2",
              "Sign reversal / flipped Dr/Cr (e.g., recording a $350 withdrawal as a $350 deposit causes a $700 gap)",
              "Divide the difference by 2 and search for that exact dollar amount posted backward",
            ],
            [
              "Difference is evenly divisible by 9",
              "Transposition error ($540 vs. $450 = $90) or slide error ($1,200 vs. $120 = $1,080)",
              "Scan entries from the period for swapped adjacent digits or missing trailing zeros",
            ],
            [
              "Difference equals an exact transaction",
              "Omitted line, duplicate import, or a deposit/payment posted to the wrong bank account",
              "Search both records for the exact gap figure; review Unmatched Bank & Unmatched Ledger",
            ],
            [
              "Difference existed on Day 1",
              "Prior period opening balance mismatch or someone edited an already-reconciled transaction",
              "Compare opening balances against last month's archived workpaper before checking new lines",
            ],
          ]}
        />
      </section>

      <ToolInlineCta
        eyebrow="Automated Exception Isolation"
        title="Let reconcilebankstatement Find Every Unmatched Line, Duplicate & Sign Flip"
        description="Upload digital or scanned PDFs (up to 200 pages), images, CSV, TSV, TXT, or XLSX files. Adjust date tolerance between ±0 and ±31 days and review Matched, Bank Only, Ledger Only, Duplicates, and Amount Mismatches cleanly."
        buttonLabel="Launch Reconciliation Tool"
        href="/reconcile"
        secondaryLabel="Inspect Matching Logic"
        secondaryHref="/bank-reconciliation-methodology"
        highlights={[
          "Catches Dr/Cr sign flips",
          "Flags duplicate clusters",
          "Exports XLSX & CSV",
        ]}
      />

      <section
        id="software-workflows"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          3. Accounting Bank Feeds vs. Document-Based Reconciliation
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#474B54] sm:text-base">
          Cloud accounting tools like QuickBooks Online, Xero, and FreshBooks
          streamline Steps 3 and 4 via daily bank feeds—matching left-hand bank
          feed lines against right-hand invoices and bills. However, live feeds
          frequently stall when banks rotate multi-factor tokens, when teams need
          to catch up 6–12 months of historical PDFs, or when reconciling an
          exported spreadsheet outside an ERP.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#474B54] sm:text-base">
          Document-first software like{" "}
          <Link href="/reconcile" className="font-semibold text-[#111214] underline">
            reconcilebankstatement
          </Link>{" "}
          executes those same deterministic steps directly from your exported
          files—supporting encrypted PDFs (unlocked strictly in memory), scanned
          statement OCR, multi-language European/UK/US headers, and running
          balance verification without needing your online banking password.
        </p>
      </section>

      <section
        id="close-best-practices"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          4. Practical Habits That Cut Reconciliation Time in Half
        </h2>
        <ul className="mt-4 space-y-2.5 text-xs leading-relaxed text-[#474B54] sm:text-sm">
          <li>
            <strong className="text-[#111214]">Reconcile weekly on active accounts:</strong>{" "}
            Ten minutes every Friday beats four hours of detective work during
            month-end close.
          </li>
          <li>
            <strong className="text-[#111214]">Use ±2 to ±5 day matching tolerances:</strong>{" "}
            Card batches, ACH transfers, and SEPA payouts normally clear 1–3
            business days after you book them.
          </li>
          <li>
            <strong className="text-[#111214]">Separate business &amp; personal cards:</strong>{" "}
            Personal coffee runs or owner transfers mixed into business bank
            accounts create avoidable noise every month.
          </li>
          <li>
            <strong className="text-[#111214]">Lock closed periods immediately:</strong>{" "}
            Once reconciled and signed off, restrict edits to closed months so
            historical opening balances never drift.
          </li>
        </ul>
      </section>

      <GuideFaqSection
        items={[
          {
            question: "Should I adjust my bank balance or my book balance first?",
            answer:
              "Start by verifying both opening balances, then match cleared transactions. After listing deposits in transit and outstanding cheques on the bank side, post adjusting journal entries for bank-only charges, interest, NSF returns, and errors on the book side until both adjusted totals match.",
          },
          {
            question: "Why does a $200 difference mean a $100 reversal error?",
            answer:
              "If a $100 payment (outflow) is accidentally entered as a $100 receipt (inflow), your book balance is $100 too high instead of $100 lower—creating a net swing of $200 (2 × $100). Any variance divisible by 2 is a classic clue to check for sign flips.",
          },
          {
            question: "What file formats can I upload to automate these bank reconciliation steps?",
            answer:
              "reconcilebankstatement supports digital or scanned PDFs (up to 200 pages), JPG/PNG/WEBP/TIFF images, CSV, TSV, TXT, and XLSX/XLSM files up to 100 MB per file.",
          },
        ]}
      />
    </TrustPageShell>
  );
}
