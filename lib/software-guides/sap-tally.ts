import type { SoftwareGuide } from "./types";

export const SAP_GUIDE: SoftwareGuide = {
  slug: "bank-reconciliation-sap",
  badge: "SAP",
  keyword: "bank reconciliation sap",
  secondaryKeywords: [
    "sap electronic bank statement",
    "sap ff_5 import bank statement",
    "sap feban manual bank reconciliation",
    "sap bank reconciliation process",
  ],
  title: "Bank Reconciliation in SAP: Electronic Bank Statement Guide",
  metaTitle: "Bank Reconciliation in SAP: Electronic Statement Guide",
  description:
    "How SAP bank reconciliation works: import an electronic bank statement with FF_5, review it, post and clear items, handle unmatched lines in FEBAN, fix errors.",
  eyebrow: "SAP Guide",
  lead: "SAP's electronic bank statement (EBS) imports statement files, posts to the general ledger and subledgers using posting rules, and leaves unmatched lines for manual processing. This guide explains the flow and the transactions involved.",
  quickAnswer:
    "In SAP ERP, bank reconciliation is usually done with the electronic bank statement: import the file with FF_5, review it with FF_6, let posting rules and interpretation algorithms post and clear what they can (on import, or via FEBP), process the remainder with FEBAN, and confirm the bank account and statement balances agree. Screens and transaction codes differ in S/4HANA, so check your release.",
  prerequisites: {
    title: "What must be in place first",
    items: [
      "House bank and bank account configured with the correct GL account and account symbols.",
      "Bank statement format agreed with the bank (such as MT940, BAI or CAMT) and an import path available.",
      "Posting rules and interpretation algorithms set up by your SAP finance team so references clear customer and vendor items.",
      "Authorisation for import, review and post transactions, with a defined owner for exceptions.",
    ],
  },
  stepsHeading: "SAP Electronic Bank Statement Reconciliation: 7 Steps",
  steps: [
    {
      title: "Import the statement with FF_5",
      detail:
        "Choose the statement format and file, run the import, and note the statement number. The balance check on import warns if the opening balance does not follow the previous statement.",
    },
    {
      title: "Review the statement with FF_6",
      detail:
        "Check headers, balances and line items before posting, and see which lines have clearing information assigned.",
    },
    {
      title: "Post the statement (on import or with FEBP)",
      detail:
        "Depending on the import options, SAP posts during FF_5 or you run FEBP afterwards. Lines are posted using the external transaction codes, posting rules and interpretation algorithm: the bank GL is debited or credited and open items are cleared where references match.",
    },
    {
      title: "Process exceptions in FEBAN",
      detail:
        "Open the post-processing list, assign the correct accounts or open items to each unprocessed line, and post. Common cases are fees, interest and unreferenced payments.",
    },
    {
      title: "Clear open items properly",
      detail:
        "Where payments settle several invoices, assign them and clear the open items so customer and vendor accounts stay accurate. Small differences can post to difference accounts under tolerance rules.",
    },
    {
      title: "Reconcile the balances",
      detail:
        "Confirm the bank GL account balance equals the statement closing balance, adjusted for known timing items such as unpresented cheques.",
    },
    {
      title: "Archive and report",
      detail:
        "Keep the statement log, exceptions list and balance proof. Repeat daily or per statement received.",
    },
  ],
  troubleshooting: {
    headers: ["Issue", "Likely cause", "What to do"],
    rows: [
      [
        "Import fails or stops at an error",
        "Format or file problem, or missing customizing for the bank account.",
        "Check the import log, the format selected, and account configuration with your SAP team.",
      ],
      [
        "Error: difference too large for clearing",
        "The clearing difference exceeds the tolerance configured for the account or user.",
        "Review tolerances or post the difference manually with an explanation.",
      ],
      [
        "Many lines left in FEBAN",
        "References do not match your interpretation algorithm.",
        "Improve algorithms or ask customers to quote invoice numbers consistently.",
      ],
      [
        "Statement balance does not follow",
        "A statement was skipped or imported twice.",
        "Check statement numbers and dates, and import any missing statement in order.",
      ],
      [
        "Open items remain on customer accounts",
        "The payment was posted to the bank but not cleared.",
        "Complete clearing in post-processing or with the clearing transactions.",
      ],
    ],
  },
  extra: {
    heading: "Manual vs Electronic Bank Statements in SAP",
    intro: "SAP supports both, but they behave differently.",
    bullets: [
      {
        label: "Electronic (EBS):",
        text: "Imported files with automated posting and clearing and a balance check on import.",
      },
      {
        label: "Manual statements:",
        text: "Keyed in by a user. They do not benefit from automatic file validation, so errors are more likely.",
      },
      {
        label: "Tuning match rates:",
        text: "Teams raise automation by improving interpretation algorithms, enhancements and reference conventions.",
      },
      {
        label: "S/4HANA:",
        text: "Newer releases offer Fiori apps and a bank account management model, so equivalents may replace some classic transaction codes.",
      },
    ],
  },
  fileBased: {
    heading: "Sense-Check Statements Before They Reach SAP",
    body: "If the file contains duplicates or the PDF disagrees with the electronic file, SAP will faithfully post the problem. Reconcile the bank's PDF or CSV against a GL line-item export outside SAP to isolate unmatched items before posting, or when preparing for an audit.",
  },
  faqs: [
    {
      question: "What is the SAP transaction code for bank statement import?",
      answer:
        "FF_5 imports electronic bank statements in classic SAP ERP. S/4HANA may use Fiori apps or different programs, so confirm for your release.",
    },
    {
      question: "What does FEBAN do in SAP?",
      answer:
        "FEBAN is the post-processing screen for electronic bank statement lines that could not be posted or cleared automatically, so a user assigns them manually.",
    },
    {
      question: "How is SAP bank reconciliation different from QuickBooks or Xero?",
      answer:
        "SAP imports statements and posts with configured rules, so the setup carries most of the effort. Cloud tools lean more on user matching screens.",
    },
    {
      question: "What causes unmatched items after FF_5?",
      answer:
        "Missing or unclear references, an interpretation algorithm that is not tuned, or open items that do not exist yet in the ledger.",
    },
    {
      question: "Can I do bank reconciliation in SAP without an electronic file?",
      answer:
        "Yes, with manual bank statements, but this removes automatic validation and increases keying risk.",
    },
  ],
  related: [
    {
      title: "NetSuite Bank Reconciliation",
      description: "Compare ERP workflows side by side.",
      href: "/tool/netsuite-bank-reconciliation",
    },
    {
      title: "Account Reconciliation Meaning",
      description: "Where bank accounts fit in GL controls.",
      href: "/tool/account-reconciliation-meaning",
    },
    {
      title: "Bank Reconciliation Steps",
      description: "The neutral 7-step process behind EBS.",
      href: "/tool/bank-reconciliation-steps",
    },
  ],
  verifyNote:
    "SAP transaction codes and screens differ between ECC and S/4HANA and with your configuration. Verify against your system and SAP documentation.",
};

export const TALLY_GUIDE: SoftwareGuide = {
  slug: "bank-reconciliation-statement-tally-prime",
  badge: "TallyPrime (India)",
  keyword: "bank reconciliation statement in tally prime",
  secondaryKeywords: [
    "BRS in tally prime",
    "tally prime bank reconciliation",
    "bank reconciliation statement tally",
    "auto bank reconciliation tallyprime",
  ],
  title: "Bank Reconciliation Statement in Tally Prime (BRS Guide for India)",
  metaTitle: "Bank Reconciliation Statement in Tally Prime (BRS)",
  description:
    "Prepare a bank reconciliation statement (BRS) in TallyPrime: enter bank dates, reconcile cheques and bank charges, use Opening BRS, and view the BRS report.",
  eyebrow: "TallyPrime Guide for Indian Businesses",
  lead: "A practical TallyPrime walkthrough for Indian accountants: marking bank dates against your cash book, dealing with cheques not yet cleared, bank charges, interest and the BRS report.",
  quickAnswer:
    "In TallyPrime, enable bank reconciliation for the bank ledger, go to Banking, Bank Reconciliation, pick the bank and period, and enter the bank date (the date the bank cleared each entry) against each matching voucher. Entries without a bank date remain as differences, shown in the Bank Reconciliation Statement. Record bank charges and interest vouchers, and the BRS shows the balance as per books versus balance as per bank.",
  prerequisites: {
    title: "Ledger and statement preparation",
    items: [
      "The bank ledger should be created under Bank Accounts with the right account details, and bank reconciliation features enabled where your release requires it.",
      "Obtain the bank passbook or statement for the period with each clearing date and the closing balance.",
      "Ensure cheque numbers or instrument details are entered on payment and receipt vouchers, since they make matching reliable.",
      "Post bank charges, interest and direct credits first, or be ready to record them during reconciliation.",
    ],
  },
  stepsHeading: "Prepare a Bank Reconciliation Statement in TallyPrime: 7 Steps",
  steps: [
    {
      title: "Open Bank Reconciliation",
      detail:
        "From the Gateway of Tally go to Banking, then Bank Reconciliation, and select the bank ledger. Newer releases offer a manual or an auto reconciliation route.",
    },
    {
      title: "Set the period",
      detail:
        "Press the period option (commonly F2) to set the statement dates. Entries before the Reconciliation Beginning Date can be treated through an Opening BRS.",
    },
    {
      title: "Enter bank dates for cleared entries",
      detail:
        "For each voucher that appears on the statement, enter the date the bank cleared it in the Bank Date column. Match by amount and instrument number.",
    },
    {
      title: "Leave uncleared items blank",
      detail:
        "Cheques issued but not yet presented, and deposits not yet credited, stay without a bank date. They are the timing differences on the BRS.",
    },
    {
      title: "Record bank-only entries",
      detail:
        "Pass vouchers for bank charges, interest credited, direct debits and NEFT, RTGS or UPI receipts not yet in the books, then mark their bank dates.",
    },
    {
      title: "Use auto reconciliation where supported",
      detail:
        "If your bank is supported for statement import, import the statement and let TallyPrime match entries. Review the matches and resolve the remainder manually.",
    },
    {
      title: "View and print the BRS",
      detail:
        "Open the Bank Reconciliation Statement. It shows the balance as per books, uncleared items, and the balance as per bank, which should equal your statement.",
    },
  ],
  troubleshooting: {
    headers: ["Problem", "Likely cause", "What to do"],
    rows: [
      [
        "Balance as per bank does not equal the statement",
        "A wrong bank date, a missing voucher, or an entry dated outside the period.",
        "Re-check bank dates against the statement and find vouchers missing from the books.",
      ],
      [
        "Cheque shows as uncleared for months",
        "The cheque is stale, lost or not presented.",
        "Follow company policy: contact the payee, then reverse or reissue. Note that cheques are generally valid for three months in India, after which banks may decline them.",
      ],
      [
        "Entries before the start date confuse the BRS",
        "Previous reconciliation items not carried forward.",
        "Use the Opening BRS option for items before the beginning date.",
      ],
      [
        "Duplicate voucher entries",
        "The same receipt was entered twice, for example via bank import and manually.",
        "Delete or alter the duplicate voucher and re-mark bank dates.",
      ],
      [
        "Auto reconciliation does not match",
        "Narration or amount differences, or an unsupported bank format.",
        "Fall back to manual reconciliation for those lines.",
      ],
    ],
  },
  extra: {
    heading: "Common BRS Items for Indian Businesses",
    intro: "Indian statements add several recurring items worth recognising.",
    bullets: [
      {
        label: "Cheques issued but not presented:",
        text: "Deduct them from the bank balance on the BRS until presented. No voucher change is needed.",
      },
      {
        label: "Cheques deposited but not credited:",
        text: "Appear in the books but not yet on the statement, so add them to the bank balance on the BRS until credited.",
      },
      {
        label: "Bank charges and interest:",
        text: "Pass vouchers when the statement shows them, and check whether GST on bank charges applies to you.",
      },
      {
        label: "Electronic transfers:",
        text: "NEFT, RTGS, IMPS and UPI credits may arrive before you know the sender. Identify and book them promptly.",
      },
      {
        label: "Cheque bounce:",
        text: "Reverse the receipt and record any bank penalty.",
      },
    ],
  },
  fileBased: {
    heading: "Check the Statement Against a Tally Ledger Export First",
    body: "For large volumes, compare the bank statement PDF or Excel against a Tally bank ledger export to isolate uncleared items, duplicates and wrong amounts before you start entering bank dates one voucher at a time.",
  },
  faqs: [
    {
      question: "What is a bank reconciliation statement in Tally?",
      answer:
        "It is the TallyPrime report that reconciles the balance as per your books to the balance as per the bank, listing items such as uncleared cheques that explain the difference.",
    },
    {
      question: "Where do I find bank reconciliation in TallyPrime?",
      answer:
        "Go to Banking, then Bank Reconciliation from the Gateway of Tally. Choose the bank ledger and period.",
    },
    {
      question: "What is the bank date in Tally?",
      answer:
        "The date the bank actually cleared or credited the entry, which can differ from the voucher date. It marks an entry as reconciled.",
    },
    {
      question: "How do I handle opening balances in Tally BRS?",
      answer:
        "Use the Opening BRS option for uncleared entries before the Reconciliation Beginning Date so they carry into the current statement.",
    },
    {
      question: "Does TallyPrime support automatic bank reconciliation?",
      answer:
        "Newer releases support statement import and automatic matching for supported banks. Availability depends on your release and bank.",
    },
  ],
  related: [
    {
      title: "Outstanding Cheques in Bank Reconciliation",
      description: "Why cheques not yet presented are timing items.",
      href: "/tool/outstanding-cheques-in-bank-reconciliation",
    },
    {
      title: "Bank Reconciliation Meaning",
      description: "Definition and purpose in plain English.",
      href: "/tool/bank-reconciliation-meaning",
    },
    {
      title: "Bank Reconciliation Example",
      description: "Worked numbers with a zero variance.",
      href: "/tool/bank-reconciliation-example",
    },
  ],
  verifyNote:
    "TallyPrime menus, shortcut keys and automation vary by release and bank. Verify against Tally Solutions' current help for your version.",
};
