import type { SoftwareGuide } from "./types";

export const QUICKBOOKS_BANK_GUIDE: SoftwareGuide = {
  slug: "reconcile-bank-accounts-quickbooks-online",
  badge: "QuickBooks Online",
  keyword: "reconcile quickbooks online",
  secondaryKeywords: [
    "how to reconcile bank account in quickbooks online",
    "quickbooks online bank reconciliation",
    "quickbooks reconcile difference not zero",
    "quickbooks reconcile beginning balance wrong",
  ],
  title: "How to Reconcile Bank Accounts in QuickBooks Online (Step by Step)",
  metaTitle: "Reconcile Bank Accounts in QuickBooks Online | Steps",
  description:
    "Reconcile a bank account in QuickBooks Online in 7 steps: check the opening balance, enter statement figures, tick cleared items, fix any difference.",
  eyebrow: "QuickBooks Online Guide",
  lead: "A practical walkthrough of the QuickBooks Online Reconcile screen, including what to check before you start, how to clear a stubborn difference, and how to undo a reconciliation that went wrong.",
  quickAnswer:
    "To reconcile a bank account in QuickBooks Online: open Reconcile from the Accounting menu (or the gear icon), select the account, confirm the beginning balance equals the prior statement's ending balance, enter the statement ending date and balance, tick every transaction that appears on the statement, and click Finish now once the Difference reads 0.00. QuickBooks then saves a reconciliation report you can reopen later.",
  prerequisites: {
    title: "Before you open the Reconcile screen",
    items: [
      "Accept or match every downloaded bank-feed transaction first. Uncategorised feed items are the number one reason the list on the Reconcile screen looks wrong.",
      "Have the official bank statement for the exact period (PDF or paper) with its ending date and ending balance, not the live online balance.",
      "Check that the bank register has no duplicate deposits created by both the feed and a manual entry.",
      "Make sure you are working one statement at a time, oldest first, if more than one month is outstanding.",
    ],
  },
  stepsHeading: "How to Reconcile a Bank Account in QuickBooks Online: 7 Steps",
  steps: [
    {
      title: "Open the Reconcile page and choose the account",
      detail:
        "Go to Accounting, then Reconcile (some versions put it under the gear icon, Tools, Reconcile). On first use click Get started. Pick the bank account from the dropdown.",
    },
    {
      title: "Confirm the beginning balance",
      detail:
        "The beginning balance QuickBooks shows should equal the ending balance of your previous statement. If it does not, stop: an earlier reconciled transaction was edited, deleted or voided. Fix that before continuing (see the troubleshooting table).",
    },
    {
      title: "Enter the statement ending date and ending balance",
      detail:
        "Type the closing date and closing balance exactly as printed on the statement. A credit card statement uses the new balance; a bank account uses the closing balance. Click Start reconciling.",
    },
    {
      title: "Record service charges and interest earned",
      detail:
        "If the statement shows monthly fees or interest that are not yet in the register, record them now, either in the service charge and interest fields if your version shows them, or as a normal expense or deposit in the register. Then they appear in the list to tick.",
    },
    {
      title: "Tick the transactions that cleared",
      detail:
        "Work through Checks and payments, then Deposits and other credits. Tick only items that appear on the statement. Use the filters (statement date, payee, amount) to narrow a long list. Watch the Cleared balance and Difference at the top as you go.",
    },
    {
      title: "Resolve the Difference until it is exactly 0.00",
      detail:
        "Look at Difference, not at whether everything is ticked. Compare the number of items and totals of payments and deposits on your screen with the statement summary. Add missing transactions, remove duplicates, or correct amounts with Edit.",
    },
    {
      title: "Click Finish now and save the report",
      detail:
        "QuickBooks stamps every ticked transaction as reconciled and creates a report. Download the Summary and Detail PDF for your file. Review History by account later to reopen it.",
    },
  ],
  troubleshooting: {
    headers: ["Symptom on the Reconcile screen", "Likely cause", "What to do"],
    rows: [
      [
        "Beginning balance does not match the last statement",
        "A reconciled transaction was edited, deleted or voided after that reconciliation.",
        "Run the Reconciliation Discrepancy Report for the account, find the changed transaction, and restore it to its original amount or date.",
      ],
      [
        "Difference is exactly twice a transaction amount",
        "A deposit was entered as a payment, or the reverse.",
        "Divide the difference by 2 and search the register for that amount recorded in the wrong direction.",
      ],
      [
        "Difference equals one statement line",
        "A statement item is missing from QuickBooks, or a ticked item is not on the statement.",
        "Search the statement and register for that exact amount. Add or untick as needed.",
      ],
      [
        "Difference is a small, odd amount",
        "A transposed digit (for example 540 entered as 450) or a missed bank fee or interest line.",
        "A difference divisible by 9 points to transposition. Check fees and interest (step 4).",
      ],
      [
        "Transactions you expect are missing from the list",
        "They are dated after the statement end date, or still sit in the bank feed uncategorised.",
        "Check the date filter, then accept the feed items. Future-dated items correctly stay off the list.",
      ],
    ],
  },
  extra: {
    heading: "Undoing or Redoing a QuickBooks Reconciliation",
    intro:
      "Mistakes after Finish now are common, and the fix depends on whether the reconciliation is the latest one.",
    bullets: [
      {
        label: "Latest reconciliation:",
        text: "Use Undo on the Reconcile page (History by account). QuickBooks clears the reconciled status so you can redo it.",
      },
      {
        label: "Older reconciliation:",
        text: "Undo the later ones in reverse order first. Do not edit transactions inside a reconciled period unless you plan to redo it.",
      },
      {
        label: "Lock the books:",
        text: "Set a closing date with a password so reconciled months cannot be changed quietly.",
      },
      {
        label: "Keep the report:",
        text: "Save the PDF of every reconciliation. An auditor or accountant will ask for it.",
      },
    ],
  },
  fileBased: {
    heading: "When the Bank Feed Is Stale: Check the Statement Outside QuickBooks",
    body: "Feeds disconnect, miss a day, or import a duplicate batch. Before you spend an hour ticking boxes, compare the statement PDF against a QuickBooks register or Transaction Detail export first. That surfaces missing lines, duplicates and sign flips in one pass so the Reconcile screen becomes a formality.",
  },
  faqs: [
    {
      question: "Where is the Reconcile button in QuickBooks Online?",
      answer:
        "In most accounts it is under Accounting, then Reconcile, or under the gear icon in Tools. Menu names vary slightly between regions and versions, so use the search box and type Reconcile if you do not see it.",
    },
    {
      question: "Why is my QuickBooks reconciliation difference not zero?",
      answer:
        "Typical causes are a wrong beginning balance, a missing or duplicate transaction, a deposit entered as a payment, a transposed amount, or unrecorded fees and interest. Compare totals of payments and deposits with the statement summary to see which side is off.",
    },
    {
      question: "Do I reconcile before or after categorising bank feed transactions?",
      answer:
        "After. Accept and match feed transactions first so the register reflects reality, then reconcile against the statement.",
    },
    {
      question: "Can I reconcile without a bank statement?",
      answer:
        "You can enter the balance shown online, but it may include items dated after month end. For a defensible reconciliation use the official statement ending balance and date.",
    },
    {
      question: "How often should I reconcile in QuickBooks Online?",
      answer:
        "Monthly at minimum, matching your statement cycle. Active accounts benefit from a weekly check of the feed so month end is quick.",
    },
  ],
  related: [
    {
      title: "How to Reconcile a Credit Card in QuickBooks",
      description: "Same screen, different statement figures and a card payment step.",
      href: "/tool/reconcile-credit-card-quickbooks",
    },
    {
      title: "Bank Reconciliation Steps",
      description: "The software-neutral 7-step process behind every tool.",
      href: "/tool/bank-reconciliation-steps",
    },
    {
      title: "Bank Reconciliation Example",
      description: "A worked dataset with adjusting entries and a zero variance.",
      href: "/tool/bank-reconciliation-example",
    },
  ],
  verifyNote:
    "Menu names in QuickBooks Online change between releases and regions. Confirm against Intuit's current help if a label differs on your screen.",
};

export const QUICKBOOKS_CARD_GUIDE: SoftwareGuide = {
  slug: "reconcile-credit-card-quickbooks",
  badge: "QuickBooks Credit Card",
  keyword: "reconcile credit card in quickbooks",
  secondaryKeywords: [
    "quickbooks online reconcile credit card",
    "reconcile credit card statement quickbooks",
    "quickbooks credit card reconciliation payment",
    "credit card reconciliation difference quickbooks",
  ],
  title: "How to Reconcile a Credit Card in QuickBooks Online",
  metaTitle: "How to Reconcile a Credit Card in QuickBooks",
  description:
    "Reconcile a credit card in QuickBooks Online: enter the statement balance and finance charges, tick cleared items, fix differences, record the payment.",
  eyebrow: "QuickBooks Credit Card Guide",
  lead: "Credit cards reconcile on the same screen as bank accounts, but the signs are reversed and finance charges, refunds and payments cause most mistakes. Here is the exact sequence.",
  quickAnswer:
    "To reconcile a credit card in QuickBooks Online, open Reconcile, select the credit card account, enter the statement closing date and the statement's new balance, add any finance charge or interest, tick the charges, credits and payments that appear on the statement, and finish when Difference is 0.00. Then record or confirm the payment you made toward the card, since payment and reconciliation are separate actions.",
  prerequisites: {
    title: "Before you reconcile the card",
    items: [
      "Categorise or match all downloaded card transactions so personal items are separated and nothing sits unreviewed.",
      "Use the card statement's new balance (closing balance), not the available credit or the live online balance.",
      "Locate the statement's payments and credits section. Payments you made and merchant refunds both reduce what you owe.",
      "Note interest charges, annual fees and late fees. These often exist only on the statement.",
    ],
  },
  stepsHeading: "Reconcile a Credit Card in QuickBooks Online: 7 Steps",
  steps: [
    {
      title: "Open Reconcile and select the credit card account",
      detail:
        "Choose the credit card liability account from the dropdown. If it is missing, it may have been set up with the wrong account type.",
    },
    {
      title: "Check the beginning balance",
      detail:
        "It should equal last statement's closing balance. A mismatch usually means a reconciled charge was edited or deleted since last time.",
    },
    {
      title: "Enter the ending date and statement balance",
      detail:
        "Use the statement closing date and the new balance owed. Enter it as a positive figure for a normal balance owing.",
    },
    {
      title: "Add finance charges and any fees",
      detail:
        "Enter the interest charge with the statement date and an interest expense account. Late and annual fees can be added as separate transactions if they are not yet recorded.",
    },
    {
      title: "Tick charges, refunds and payments that appear on the statement",
      detail:
        "Charges sit in one list, while payments and credits sit in another. Tick each item that matches a statement line. Merchant refunds should appear as credits, not as negative charges.",
    },
    {
      title: "Clear the Difference to 0.00",
      detail:
        "Compare the counts and totals of purchases and payments with the statement summary. Resolve duplicates, missing charges and wrong amounts before finishing.",
    },
    {
      title: "Finish, then record the payment to the card",
      detail:
        "Finishing the reconciliation does not pay the card. If you have not recorded the payment, record it as a credit card payment (for example the Pay down credit card option under New) or as a transfer from the bank account, so both accounts update, then reconcile that payment on the bank side too.",
    },
  ],
  troubleshooting: {
    headers: ["Problem", "Likely cause", "Fix"],
    rows: [
      [
        "Difference equals a payment you made",
        "The payment is recorded in the bank account as an expense instead of as a transfer to the card.",
        "Delete the expense and record a credit card payment or transfer so both accounts update.",
      ],
      [
        "Difference is double a refund amount",
        "A merchant refund was entered as a charge.",
        "Replace it with a credit card credit for the same vendor.",
      ],
      [
        "Missing interest or fee",
        "The statement includes finance charges you have not recorded.",
        "Enter them in the finance charge field or as a new transaction.",
      ],
      [
        "Duplicate charges appear",
        "A bank feed item and a manual entry or an uploaded receipt both exist.",
        "Delete the duplicate so only one copy remains.",
      ],
      [
        "Statement shows a credit balance",
        "You overpaid or received a refund, so the issuer owes you.",
        "Enter the statement balance as shown with the sign QuickBooks expects, and confirm the account type is Credit Card.",
      ],
    ],
  },
  extra: {
    heading: "Credit Card vs Bank Account Reconciliation in QuickBooks",
    intro: "The screen is identical, but the accounting logic is not.",
    bullets: [
      {
        label: "Balance direction:",
        text: "A bank account is an asset where deposits increase it. A card is a liability where charges increase what you owe.",
      },
      {
        label: "Payments:",
        text: "A card payment appears on both statements: as a debit on the bank statement and a credit on the card statement.",
      },
      {
        label: "Timing:",
        text: "Cards post charges days after the purchase date. Allow for purchases dated just before the statement close that appear on the next one.",
      },
      {
        label: "Ownership:",
        text: "Employee or owner-paid cards need a clear rule for personal items to avoid polluting the books.",
      },
    ],
  },
  fileBased: {
    heading: "Catch Missing Card Lines Before You Reconcile",
    body: "Card statements run to many pages with pending items and refunds. Matching the statement PDF to a QuickBooks credit card transaction export first shows missing charges, duplicates and sign errors upfront, which turns the Reconcile screen into a quick confirmation.",
  },
  faqs: [
    {
      question: "Do I use the statement balance or the current balance for a credit card?",
      answer:
        "Use the statement's new balance (closing balance) as of the statement date. The current balance includes purchases after the statement closed.",
    },
    {
      question: "Why does my credit card reconciliation difference equal my payment?",
      answer:
        "The payment is usually recorded as an expense rather than as a transfer between the bank and the card, so one account never receives the credit.",
    },
    {
      question: "Should I reconcile the credit card before paying it?",
      answer:
        "Reconcile the statement first so you pay a verified figure, then record the payment and let it clear on the bank reconciliation.",
    },
    {
      question: "How do I enter a credit card refund in QuickBooks Online?",
      answer:
        "Use a credit card credit against the vendor and the original expense account so the card balance goes down and the expense is reduced.",
    },
    {
      question: "Can I reconcile a card with no statement?",
      answer:
        "You can approximate using the online balance, but the result is not audit-grade. Download the statement for the closing date.",
    },
  ],
  related: [
    {
      title: "How to Reconcile Bank Accounts in QuickBooks Online",
      description: "The bank account version of this workflow.",
      href: "/tool/reconcile-bank-accounts-quickbooks-online",
    },
    {
      title: "Account Reconciliation Meaning",
      description: "How card and clearing accounts fit the general ledger controls.",
      href: "/tool/account-reconciliation-meaning",
    },
    {
      title: "Balance Sheet Reconciliation Checklist",
      description: "Month-end sign-off including liability accounts.",
      href: "/tool/balance-sheet-reconciliation-example",
    },
  ],
  verifyNote:
    "Menu names in QuickBooks Online change between releases and regions. Confirm against Intuit's current help if a label differs on your screen.",
};
