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

const PAGE_PATH = "/tool/outstanding-cheques-in-bank-reconciliation";
const PAGE_TITLE = "Outstanding Cheques in Bank Reconciliation Explained";
const PAGE_DESCRIPTION =
  "Complete guide to outstanding cheques (unpresented checks) in bank reconciliation: bank-side deduction rules, worked example, stale-dated cheque accounting, and void journal entries.";

export const metadata = createPageMetadata({
  path: PAGE_PATH,
  title: `${PAGE_TITLE} | reconcilebankstatement`,
  description: PAGE_DESCRIPTION,
  keywords: [
    "outstanding cheques in bank reconciliation",
    "unpresented cheques bank reconciliation",
    "outstanding checks accounting treatment",
    "stale dated cheques journal entry",
  ],
  type: "article",
});

export default function OutstandingChequesPage() {
  return (
    <TrustPageShell
      path={PAGE_PATH}
      eyebrow="Timing Differences"
      title={PAGE_TITLE}
      lead="Outstanding cheques—also called unpresented cheques or uncleared checks—are one of the most common timing differences in monthly bookkeeping. Learn exactly which balance they adjust, why they require no immediate journal entry, and what to do when a cheque goes stale."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Tools & Guides", href: "/tool" },
        { label: "Outstanding Cheques Explained" },
      ]}
      author={AUTHORS.editorialProduct}
      reviewer={REVIEWERS.technicalReview}
      heroCta={{
        label: "Spot Unmatched Ledger Cheques Fast",
        href: "/reconcile",
        secondaryLabel: "Jump to Stale-Dated Cheque Rules",
        secondaryHref: "#stale-cheques",
        note: "Upload statement & cash book — uncleared cheques isolate automatically in Unmatched Ledger",
      }}
      sections={[
        { id: "definition", label: "What Outstanding Cheques Are" },
        { id: "bank-vs-book", label: "Bank vs. Book Treatment" },
        { id: "worked-example", label: "Worked Example" },
        { id: "stale-cheques", label: "Stale-Dated Cheques & Void Entries" },
        { id: "common-traps", label: "5 Traps to Watch For" },
        { id: "faqs", label: "Outstanding Cheques FAQs" },
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
          title: "NSF & Returned Cheques",
          description:
            "Contrast timing-only outstanding cheques with bounced customer cheques.",
          href: "/tool/nsf-checks-bank-reconciliation",
        },
        {
          title: "Bank Reconciliation Example",
          description:
            "See outstanding checks combined with deposits in transit and bank fees.",
          href: "/tool/bank-reconciliation-example",
        },
        {
          title: "Bank Reconciliation Steps",
          description:
            "Follow the full 7-step close workflow from opening proof to export.",
          href: "/tool/bank-reconciliation-steps",
        },
      ]}
      ctaOverride={{
        title: "Separate uncleared cheques from real ledger errors in seconds",
        description:
          "Upload your bank statement and check register or cash book to reconcilebankstatement. Reference-number and ±0–31 day matching isolates every unpresented cheque cleanly.",
        buttonLabel: "Open Reconciliation Tool",
      }}
    >
      <QuickAnswerBox
        label="Key Rule"
        summary="An outstanding cheque (unpresented cheque) is a payment you wrote, recorded in your cash book, and issued to a vendor or payee that has not yet cleared your bank by the statement cutoff date. On a bank reconciliation, always DEDUCT outstanding cheques from the Unadjusted Bank Statement Balance—and pass NO new journal entry while the cheque is simply in transit."
        points={[
          "Regional synonyms: unpresented cheque (UK/AU/IN), outstanding check (US)",
          "Bank-side adjustment: subtract from unadjusted bank statement balance",
          "Book-side impact: none—cash was already reduced when written",
          "Investigate if still uncleared after 3–6 months (stale-dated check rules)",
        ]}
      />

      <section
        id="definition"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          1. What Are Outstanding Cheques in Bank Reconciliation?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#474B54] sm:text-base">
          Suppose you sign and mail Cheque #2108 for $850.00 to a supplier on
          October 27. The moment you issue it, your accounting system credits
          (reduces) Cash by $850.00. However, the mail takes three days, and the
          supplier doesn&apos;t deposit it until November 2.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#474B54] sm:text-base">
          When your October 31 bank statement arrives, that $850.00 hasn&apos;t
          left your bank account yet. That makes Cheque #2108 an{" "}
          <strong className="text-[#111214]">
            outstanding cheque
          </strong>{" "}
          (commonly termed an <strong className="text-[#111214]">unpresented cheque</strong>{" "}
          in the UK, Canada, Australia, and India, or an{" "}
          <strong className="text-[#111214]">outstanding check</strong> in the
          US).
        </p>
      </section>

      <section
        id="bank-vs-book"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          2. Accounting Treatment: Why You Deduct From Bank Balance Only
        </h2>
        <GuideComparisonTable
          headers={[
            "Perspective",
            "Treatment During Reconciliation",
            "Journal Entry Needed?",
          ]}
          rows={[
            [
              "Bank Statement Balance",
              "Deduct (−) total outstanding cheques from Unadjusted Bank Balance",
              "No — bank balance is temporarily inflated until payee deposits the cheque",
            ],
            [
              "Cash Book / General Ledger",
              "No adjustment needed (cash was already credited when cheque was issued)",
              "No — already recorded accurately on issuance date",
            ],
            [
              "When Cheque Clears Next Month",
              "Matches bank clearing line against prior period's outstanding list",
              "No — never double-record the expense when it clears in November",
            ],
          ]}
        />
      </section>

      <section
        id="worked-example"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          3. Worked Example: Multi-Cheque Clearing at Month-End
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#474B54] sm:text-base">
          During late October, a business issues three vendor cheques totaling
          $2,610.00 and records all three in its cash book, leaving an October
          31 Cash Book balance of <strong className="text-[#111214]">$18,210.00</strong>:
        </p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-xs leading-relaxed text-[#474B54] sm:text-sm">
          <li>
            Cheque #2104 ($1,420.00, Oct 20) — <strong>Cleared</strong> on Oct
            25 bank statement.
          </li>
          <li>
            Cheque #2108 ($850.00, Oct 27) — <strong>Unpresented</strong> at
            Oct 31.
          </li>
          <li>
            Cheque #2111 ($340.00, Oct 30) — <strong>Unpresented</strong> at
            Oct 31.
          </li>
        </ul>
        <p className="mt-3 text-sm leading-relaxed text-[#474B54] sm:text-base">
          Meanwhile, the October 31 bank statement reports an ending balance of{" "}
          <strong className="text-[#111214]">$19,400.00</strong>. Deducting the
          two unpresented cheques proves the true spendable cash:
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <WorkedScheduleSide
            title="Bank Statement Side"
            rows={[
              { label: "Unadjusted Bank Balance (Oct 31)", amount: "$19,400.00" },
              {
                label: "− Outstanding Cheque #2108 (Oct 27)",
                amount: "−$850.00",
                tone: "deduct",
              },
              {
                label: "− Outstanding Cheque #2111 (Oct 30)",
                amount: "−$340.00",
                tone: "deduct",
              },
              {
                label: "Adjusted Bank Balance",
                amount: "$18,210.00",
                tone: "total",
              },
            ]}
          />
          <WorkedScheduleSide
            title="Cash Book Side"
            rows={[
              { label: "Unadjusted Cash Book Balance (Oct 31)", amount: "$18,210.00" },
              {
                label: "Adjustments Required for Uncleared Cheques",
                amount: "$0.00",
              },
              {
                label: "Adjusted Book Balance",
                amount: "$18,210.00",
                tone: "total",
              },
            ]}
          />
        </div>
      </section>

      <ToolInlineCta
        eyebrow="Cheque Reference Matching"
        title="Track Unpresented Cheques Automatically With Reference & Date Matching"
        description="When you reconcile in reconcilebankstatement, cheque numbers and reference IDs pair cleared payments across delayed clearing dates (adjustable ±0 to ±31 days). Any payment still unpresented lands cleanly in Unmatched Ledger."
        buttonLabel="Check Your Statement & Ledger"
        href="/reconcile"
        secondaryLabel="Read NSF Cheque Guide"
        secondaryHref="/tool/nsf-checks-bank-reconciliation"
        highlights={[
          "Matches cheque & UTR references",
          "Adjustable ±0–31 day window",
          "Clean Unmatched Ledger export",
        ]}
      />

      <section
        id="stale-cheques"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          4. Stale-Dated Outstanding Cheques &amp; Voiding Journal Entries
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#474B54] sm:text-base">
          An outstanding cheque shouldn&apos;t linger on your reconciliation
          forever. Depending on local banking rules, cheques typically become{" "}
          <strong className="text-[#111214]">stale-dated</strong> after{" "}
          <strong className="text-[#111214]">3 months</strong> (such as RBI
          validity rules in India) or{" "}
          <strong className="text-[#111214]">6 months</strong> (standard practice
          in the US, UK, and Canada), meaning banks can refuse to honor them.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#474B54] sm:text-base">
          Note a critical legal nuance: a stale bank date cancels the{" "}
          <em>cheque instrument&apos;s negotiability</em>—it does{" "}
          <strong>not</strong> erase your legal debt to the vendor or employee.
          Before writing off a stale cheque:
        </p>
        <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-xs leading-relaxed text-[#474B54] sm:text-sm">
          <li>Contact the payee to confirm whether the cheque was lost.</li>
          <li>
            Issue a bank stop-payment if necessary, void the stale cheque in your
            books, and reissue a replacement payment (or ACH/wire).
          </li>
          <li>
            If the payee cannot be located (e.g., an uncashed payroll or refund
            cheque), reclassify the credit to an{" "}
            <strong>Unclaimed Property Liability</strong> account rather than
            income, since many US states and jurisdictions mandate unclaimed
            property escheatment.
          </li>
        </ol>

        <JournalEntryTable
          caption="Example: Reversing a Stale-Dated $850.00 Vendor Cheque (#2108)"
          date="Month End"
          narration="Void stale-dated Cheque #2108 (>6 months unpresented) and restore payable pending vendor reissue"
          lines={[
            {
              account: "Cash / Bank Account",
              note: "Restores book cash balance after stop-payment/void",
              debit: "$850.00",
            },
            {
              account: "Accounts Payable (or Unclaimed Property Liability)",
              note: "Preserves obligation until replacement payment clears or escheatment applies",
              credit: "$850.00",
            },
          ]}
        />
      </section>

      <section
        id="common-traps"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          5. Five Common Outstanding Cheque Traps
        </h2>
        <ul className="mt-4 space-y-2.5 text-xs leading-relaxed text-[#474B54] sm:text-sm">
          <li>
            <strong className="text-[#111214]">
              Held Cheques at Year-End:
            </strong>{" "}
            Cheques printed and dated December 31 but locked in an office desk
            drawer until January 5 are <em>not</em> true outstanding cheques—they
            should remain in Cash and Accounts Payable at year-end cutoff.
          </li>
          <li>
            <strong className="text-[#111214]">
              Duplicate Cheque Entries:
            </strong>{" "}
            If an outstanding cheque sits unpaid after two weeks while an ACH of
            the exact same dollar amount already cleared, verify you didn&apos;t
            pay the vendor twice.
          </li>
          <li>
            <strong className="text-[#111214]">
              Wrong Cheque Amount Cleared:
            </strong>{" "}
            Check OCR or keying errors where the bank cleared $850.00 while the
            ledger recorded $580.00 (flagged under Amount Mismatches).
          </li>
          <li>
            <strong className="text-[#111214]">
              Forgetting Carry-Forward Items:
            </strong>{" "}
            An outstanding cheque issued in September that still hasn&apos;t
            cleared by October 31 must stay on October&apos;s outstanding list.
          </li>
          <li>
            <strong className="text-[#111214]">
              Re-Entering When It Clears:
            </strong>{" "}
            Never post a second expense entry in November when October&apos;s
            outstanding cheque finally clears the bank.
          </li>
        </ul>
      </section>

      <GuideFaqSection
        items={[
          {
            question: "Are outstanding cheques added or subtracted in a bank reconciliation?",
            answer:
              "When reconciling from the Bank Statement Balance to the Adjusted Cash Balance, outstanding cheques are always subtracted from the bank statement balance because the bank has not yet deducted those funds.",
          },
          {
            question: "What if I start my bank reconciliation from the Cash Book balance instead?",
            answer:
              "In a single-column reconciliation starting from Cash Book balance toward Bank Statement balance (traditional textbook format), unpresented cheques are added back purely for bridge math—but in standard two-sided Adjusted Cash format, you deduct them from Bank Balance and leave the Book Balance untouched.",
          },
          {
            question: "Does an outstanding cheque appear on the balance sheet?",
            answer:
              "No. It reduces the reported Cash asset balance directly because the cheque was already deducted from your cash ledger when written and issued.",
          },
        ]}
      />
    </TrustPageShell>
  );
}
