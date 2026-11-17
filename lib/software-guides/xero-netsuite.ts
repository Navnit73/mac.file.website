import type { SoftwareGuide } from "./types";

export const XERO_GUIDE: SoftwareGuide = {
  slug: "bank-reconciliation-xero",
  badge: "Xero",
  keyword: "bank reconciliation in xero",
  secondaryKeywords: [
    "xero bank reconciliation",
    "xero auto reconciliation",
    "xero bank rules",
    "xero reconcile bank statement",
  ],
  title: "Bank Reconciliation in Xero: Setup and Auto-Reconciliation",
  metaTitle: "Bank Reconciliation in Xero: Setup & Auto-Reconcile",
  description:
    "Set up Xero bank feeds, reconcile with Match, Create and Transfer, use bank rules, and learn how Xero's auto-reconciliation suggests and matches transactions.",
  eyebrow: "Xero Guide",
  lead: "Xero reconciles by matching each bank statement line to an invoice, bill or new transaction. This guide covers first-time setup, daily workflow, bank rules, auto-reconciliation and the reconciliation report.",
  quickAnswer:
    "In Xero, connect a bank feed (or import a statement), open the account's Reconcile tab, and for each statement line either match it to an existing invoice or bill, create a new transaction, or transfer between accounts. Bank rules automate recurring lines, and on eligible plans automatic reconciliation can match high-confidence lines for you. The Bank Reconciliation Summary report should then show the statement balance and Xero balance agreeing after outstanding items.",
  prerequisites: {
    title: "Setup checklist before reconciling",
    items: [
      "Add the bank account under Accounting, Bank accounts, and connect the feed or import a statement file.",
      "Set a conversion date so opening balances line up with your last statement before the first reconciliation.",
      "Create bank rules for recurring items such as subscriptions, bank fees and standard receipts.",
      "Decide who may reconcile and lock dates so reconciled periods cannot be altered.",
    ],
  },
  stepsHeading: "Reconcile a Bank Account in Xero: 7 Steps",
  steps: [
    {
      title: "Connect the bank feed or import statements",
      detail:
        "Use a live feed where your bank supports one. Otherwise import a CSV or supported statement file. Check that the first imported line follows the conversion balance.",
    },
    {
      title: "Open the Reconcile tab for the account",
      detail:
        "Statement lines sit on the left and Xero's suggestions on the right. A green Reconcile button means a suggested match is ready.",
    },
    {
      title: "Use Match for invoices and bills",
      detail:
        "Match a statement line to the customer invoice or supplier bill it settles. For batch payments, tick several invoices and let Xero total them.",
    },
    {
      title: "Use Create for items not yet recorded",
      detail:
        "For fees, interest or direct expenses, choose Create, set the account, tax rate and contact, then reconcile. Add a bank rule if it will recur.",
    },
    {
      title: "Use Transfer for movements between your accounts",
      detail:
        "Transfers between bank and card or savings accounts should be recorded as transfers, not income or expense, so profit is not distorted.",
    },
    {
      title: "Use Find & Match for splits and timing differences",
      detail:
        "Search by amount, date or reference, then tick multiple items or add a split when one statement line covers several transactions.",
    },
    {
      title: "Review the Bank Reconciliation Summary",
      detail:
        "Run it for the statement date. The statement balance, plus or minus outstanding payments and receipts, should equal the Xero balance. Anything unexplained needs investigation.",
    },
  ],
  troubleshooting: {
    headers: ["Symptom", "Likely cause", "What to do"],
    rows: [
      [
        "Statement balance differs from Xero balance",
        "Unreconciled lines, a missing feed day, or items posted with the wrong date.",
        "Run the Bank Reconciliation Summary and review its listed outstanding items.",
      ],
      [
        "Duplicate statement lines",
        "A feed and a file import overlapped.",
        "Delete the duplicate statement lines (not the accounting transactions) from the account.",
      ],
      [
        "Same payment reconciled twice",
        "A payment was both matched and created as a new transaction.",
        "Remove the duplicate transaction and re-match the statement line.",
      ],
      [
        "Wrong account on auto-created items",
        "A broad bank rule is catching too many lines.",
        "Tighten the rule conditions (payee, reference, amount range) and review its order.",
      ],
      [
        "Feed stops updating",
        "Bank credentials or authorisation expired.",
        "Reconnect the feed and import any missing days from a statement file.",
      ],
    ],
  },
  extra: {
    heading: "How Xero Auto-Reconciliation and Bank Rules Work",
    intro:
      "Xero describes its automatic reconciliation as using four methods to suggest or apply coding. Availability and exact behaviour depend on region and plan, so check Xero Central for current details.",
    bullets: [
      {
        label: "Rule:",
        text: "One of your bank rules applies to the line. Rules are the most predictable method and the easiest to audit.",
      },
      {
        label: "Match:",
        text: "The line corresponds to an existing invoice, bill or transaction by amount and details.",
      },
      {
        label: "Memory:",
        text: "Xero reuses how you coded a similar line before.",
      },
      {
        label: "Prediction:",
        text: "Xero predicts the coding from patterns, and only auto-reconciles when confidence is high.",
      },
      {
        label: "Review habit:",
        text: "Auto-reconciled lines still deserve a periodic sample check. Accuracy claims describe averages, not your data.",
      },
    ],
  },
  fileBased: {
    heading: "Reconciling a Backlog or a Stalled Feed",
    body: "When a feed has been broken for months, or you inherit books with no reconciliation, compare the bank statement PDFs to a Xero bank transactions export first. Fixing missing days, duplicates and sign errors outside Xero avoids clicking through hundreds of wrong suggestions.",
  },
  faqs: [
    {
      question: "How do I turn on automatic bank reconciliation in Xero?",
      answer:
        "Where available, auto reconciliation is a setting on the individual bank account on eligible plans. Open the account's settings and enable it. It applies to the whole account rather than to individual bank rules.",
    },
    {
      question: "What is the difference between Match, Create and Transfer in Xero?",
      answer:
        "Match links the statement line to an existing invoice, bill or transaction. Create records a new transaction. Transfer records movement between two of your own accounts.",
    },
    {
      question: "Why is my Xero bank balance different from my statement balance?",
      answer:
        "Usually unreconciled lines, timing items or duplicate imports. The Bank Reconciliation Summary lists the outstanding items that explain the gap.",
    },
    {
      question: "Can I undo a reconciliation in Xero?",
      answer:
        "Yes. Open the reconciled statement line or transaction and use Unreconcile. Lock dates may restrict changes to closed periods.",
    },
    {
      question: "Should I rely on auto-reconciliation without review?",
      answer:
        "No. Treat it as a time saver for repetitive lines and sample-check the results, especially for new suppliers and large amounts.",
    },
  ],
  related: [
    {
      title: "Bank Reconciliation Steps",
      description: "The software-neutral process Xero's screens follow.",
      href: "/tool/bank-reconciliation-steps",
    },
    {
      title: "How to Reconcile Bank Accounts in QuickBooks Online",
      description: "Compare the QuickBooks approach to Xero's.",
      href: "/tool/reconcile-bank-accounts-quickbooks-online",
    },
    {
      title: "Outstanding Cheques in Bank Reconciliation",
      description: "Timing items shown on Xero's reconciliation summary.",
      href: "/tool/outstanding-cheques-in-bank-reconciliation",
    },
  ],
  verifyNote:
    "Xero updates its reconciliation features regularly, and automatic reconciliation availability varies by region and plan. Confirm details in Xero Central.",
};

export const NETSUITE_GUIDE: SoftwareGuide = {
  slug: "netsuite-bank-reconciliation",
  badge: "NetSuite",
  keyword: "netsuite bank reconciliation",
  secondaryKeywords: [
    "netsuite reconcile bank statement",
    "netsuite match bank data",
    "netsuite reconcile account statement",
    "netsuite bank reconciliation steps",
  ],
  title: "NetSuite Bank Reconciliation: Step-by-Step Guide",
  metaTitle: "NetSuite Bank Reconciliation: Step-by-Step Guide",
  description:
    "Reconcile bank accounts in NetSuite: enable matching, import bank data, run Match Bank Data, post journals, then Reconcile Account Statement.",
  eyebrow: "NetSuite Guide",
  lead: "NetSuite splits reconciliation into importing bank data, matching it to transactions, and locking the period on the Reconcile Account Statement page. Here is the complete flow with the pitfalls that slow teams down.",
  quickAnswer:
    "To reconcile a bank account in NetSuite: enable the account for bank data matching, import the bank statement or feed, go to Transactions, Bank, Match Bank Data to approve pairings, post journal entries for bank-only fees and interest, then open Reconcile Account Statement, enter the statement date and ending balance, mark cleared items and click Reconcile once the difference is zero.",
  prerequisites: {
    title: "Setup and preparation",
    items: [
      "Enable the account for bank data matching: Lists, Accounting, Accounts, edit the bank account and set the reconciliation options.",
      "Have permissions for Match Bank Data and Reconcile Account Statement. Roles often restrict these.",
      "Decide on the data source: a bank feed SuiteApp, or manual file import in a supported format.",
      "Book recurring bank items (fees, interest) by journal or rule so they do not appear as surprises.",
    ],
  },
  stepsHeading: "NetSuite Bank Reconciliation Process: 7 Steps",
  steps: [
    {
      title: "Enable the account for matching",
      detail:
        "This is a one-time setting per account. Without it the account will not appear in the match and reconcile pages.",
    },
    {
      title: "Import bank data",
      detail:
        "Import the statement file or rely on your bank feed. Confirm the imported opening and closing balances equal the statement.",
    },
    {
      title: "Run Match Bank Data",
      detail:
        "Go to Transactions, Bank, Match Bank Data. Choose the account and date range, set matching rules (amount, date tolerance, reference) and run auto-match.",
    },
    {
      title: "Review, approve or reject suggested matches",
      detail:
        "Approve correct pairs and reject weak ones. Approved matches flow into the reconcile step. Use manual match for one-to-many cases.",
    },
    {
      title: "Record bank-only items",
      detail:
        "Record bank fees, interest and unrecorded receipts, usually with a journal entry, for example Bank Fees Expense debited and the bank account credited for a fee.",
    },
    {
      title: "Open Reconcile Account Statement",
      detail:
        "Enter the statement date and ending balance. Select the cleared transactions. The difference should reach zero before you submit.",
    },
    {
      title: "Reconcile, then retain the reports",
      detail:
        "Click Reconcile to lock the period. Save the reconciliation detail and summary reports for audit evidence and next period's opening checks.",
    },
  ],
  troubleshooting: {
    headers: ["Problem", "Likely cause", "Fix"],
    rows: [
      [
        "Account missing from Match Bank Data",
        "The account is not enabled for bank data matching.",
        "Edit the account and enable it, then refresh.",
      ],
      [
        "Auto-match proposes few matches",
        "Date tolerance is too tight, or references differ between bank and books.",
        "Widen date tolerance a few days and add reference or payee rules.",
      ],
      [
        "Difference remains after matching",
        "Bank-only items are unrecorded, or a transaction is dated outside the period.",
        "Post journals for fees and interest, and check transaction dates and subsidiaries.",
      ],
      [
        "Duplicate bank lines",
        "An overlapping import from feed and file.",
        "Remove duplicates before matching so they do not create false variances.",
      ],
      [
        "Cannot reconcile a prior period",
        "Later periods may already be reconciled, or your role cannot change closed periods.",
        "Follow your close controls: reverse later reconciliations in order if permitted, or post a correcting entry in the current period.",
      ],
    ],
  },
  extra: {
    heading: "Close Controls for NetSuite Bank Reconciliation",
    intro: "Teams that close quickly share a few habits.",
    bullets: [
      {
        label: "Match daily or weekly:",
        text: "Small batches are easier to explain than a month of lines.",
      },
      {
        label: "Document timing items:",
        text: "Outstanding cheques and deposits in transit should carry an expected clear date.",
      },
      {
        label: "Fix errors by journal:",
        text: "Correct real errors with entries before closing, rather than leaving variances unexplained.",
      },
      {
        label: "Separate preparer and reviewer:",
        text: "Use roles so the person who reconciles is not the only one approving.",
      },
    ],
  },
  fileBased: {
    heading: "Pre-Check Bank Files Before Importing to NetSuite",
    body: "Bad imports cause most matching headaches. Reconcile the statement PDF against a NetSuite transaction export first to spot duplicates, missing lines and sign flips, then import clean data so Match Bank Data proposes accurate pairs.",
  },
  faqs: [
    {
      question: "Where is bank reconciliation in NetSuite?",
      answer:
        "Under Transactions, Bank. Match Bank Data handles matching, and Reconcile Account Statement closes the period. Exact menu names can vary by role and enabled features.",
    },
    {
      question: "Do I need to import bank data to reconcile in NetSuite?",
      answer:
        "Not always. Recent releases allow marking transactions as cleared without importing lines, but importing enables matching and gives a stronger audit trail.",
    },
    {
      question: "How do I record bank fees during NetSuite reconciliation?",
      answer:
        "Create a journal entry debiting Bank Fees Expense and crediting the bank account for the fee, dated per the statement.",
    },
    {
      question: "What causes a reconciliation difference in NetSuite?",
      answer:
        "Unrecorded bank items, wrong dates, duplicate imports, or entries posted to the wrong account or subsidiary.",
    },
    {
      question: "Can I automate NetSuite bank reconciliation?",
      answer:
        "Bank feeds and auto-match rules reduce manual work. You should still review exceptions and keep supporting reports.",
    },
  ],
  related: [
    {
      title: "Bank Reconciliation in SAP",
      description: "How another ERP handles electronic bank statements.",
      href: "/tool/bank-reconciliation-sap",
    },
    {
      title: "Balance Sheet Reconciliation Checklist",
      description: "ERP month-end sign-off for cash and other accounts.",
      href: "/tool/balance-sheet-reconciliation-example",
    },
    {
      title: "NSF and Returned Cheques",
      description: "Journals for bounced items that appear only on the bank side.",
      href: "/tool/nsf-checks-bank-reconciliation",
    },
  ],
  verifyNote:
    "NetSuite menus depend on role, version and enabled features. Confirm against Oracle's current NetSuite help before relying on a path.",
};
