export type FaqItem = {
  id: string;
  category: "tool" | "concepts";
  question: string;
  answer: string;
};

export type QuickGuide = {
  id: "bank" | "credit-card" | "balance-sheet";
  title: string;
  subtitle: string;
  steps: { title: string; detail: string }[];
};

export type ImplementedCapability = {
  id: "ingestion" | "matching" | "audit" | "exports";
  tabLabel: string;
  badge: string;
  title: string;
  summary: string;
  specLabel: string;
  specDetail: string;
  highlights: {
    label: string;
    detail: string;
  }[];
  codeChips?: string[];
};

export type PlaybookPhase = {
  phase: string;
  title: string;
  items: {
    heading: string;
    detail: string;
  }[];
};

export type UtilityComparisonRow = {
  dimension: string;
  manualSpreadsheets: string;
  genericPdfTools: string;
  enterpriseSuites: string;
  cleartie: string;
};

export type ReconciliationProblem = {
  id: string;
  badge: string;
  title: string;
  whyItHappens: string;
  howClearTieFixesIt: string;
};

export type BenefitPillar = {
  id: string;
  title: string;
  metric: string;
  description: string;
};

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://reconcilebankstatement.online";

export const BRAND = {
  name: "ClearTie",
  domain: "reconcilebankstatement.online",
  tagline: "Bank Statement & Business Ledger Reconciliation Utility",
  stackSummary:
    "Byte-Detected OCR & Spreadsheet Engine • Direct Tie-Out Utility",
  version: "v2.4",
};

export const SUPPORTED_FORMATS = [
  "PDF (Digital)",
  "PDF (Scanned OCR)",
  "JPG / JPEG",
  "PNG / WEBP",
  "TIFF / TIF",
  "CSV",
  "TSV / TXT",
  "XLSX / XLSM",
  "HTML / XML Bank Excel",
  "UTF-16 Bank Exports",
] as const;

export const BENEFIT_PILLARS: BenefitPillar[] = [
  {
    id: "speed",
    title: "Close Faster Without Formula Fragility",
    metric: "±0–31d Window",
    description:
      "Replace error-prone VLOOKUP sheets with deterministic amount, direction, reference, and date-tolerance matching.",
  },
  {
    id: "accuracy",
    title: "Prove Both Ending & Running Balances",
    metric: "Line-by-Line Proof",
    description:
      "Verify opening plus net flow equals closing balance on both records and catch mid-statement running-balance breaks.",
  },
  {
    id: "privacy",
    title: "Zero Bank Credentials Required",
    metric: "In-Memory Unlock",
    description:
      "Never link live banking logins. Upload exported statements directly—including encrypted PDFs unlocked strictly in memory.",
  },
  {
    id: "global",
    title: "Ready for US, UK & EU Formats",
    metric: "6 Header Languages",
    description:
      "Parse ISO 4217 currencies, parentheses or Dr/Cr signs, UTF-16 exports, and English, German, French, Spanish, Portuguese, and Dutch headers.",
  },
];

export const RECONCILIATION_PROBLEMS: ReconciliationProblem[] = [
  {
    id: "timing-differences",
    badge: "Timing Lag",
    title: "Deposits in Transit & Uncleared Checks",
    whyItHappens:
      "Payments recorded in your cash book at month-end often settle at the bank 1 to 3 business days later, creating temporary gaps.",
    howClearTieFixesIt:
      "Configure date tolerances up to ±31 days to match delayed settlements, while true period-end cutoffs isolate cleanly in Unmatched Ledger.",
  },
  {
    id: "unrecorded-items",
    badge: "Bank-Only Items",
    title: "Unrecorded Bank Fees, Interest & NSF Reversals",
    whyItHappens:
      "Wire charges, monthly maintenance fees, bounced customer checks, and earned interest appear on bank statements before reaching your ledger.",
    howClearTieFixesIt:
      "Every unposted bank line surfaces in Unmatched Bank with exact dates, amounts, and descriptions ready for adjusting journal entries.",
  },
  {
    id: "transposition-sign-flips",
    badge: "Posting Errors",
    title: "Transposed Amounts & Flipped Debit/Credit Signs",
    whyItHappens:
      "Manual keying swaps digits (like $850 vs. $840) or logs a withdrawal as a deposit when switching between bank and book conventions.",
    howClearTieFixesIt:
      "Automatic direction convention detection and near-match analysis isolate exact amount deltas and Dr/Cr sign inversions in Amount Mismatches.",
  },
  {
    id: "duplicates-breaks",
    badge: "Integrity Breaks",
    title: "Duplicate Imports & Running-Balance Gaps",
    whyItHappens:
      "Overlapping CSV exports or missing OCR rows introduce duplicate transactions and break statement math mid-period.",
    howClearTieFixesIt:
      "Possible Duplicates groups suspect repeats on either record, while row-by-row running-balance checks pinpoint the exact row of any break.",
  },
];

export const IMPLEMENTED_CAPABILITIES: ImplementedCapability[] = [
  {
    id: "ingestion",
    tabLabel: "Document & File Parsing",
    badge: "Byte-Level Detection",
    title: "Multi-Format Bank Statement & Business Ledger Extraction",
    summary:
      "Detects true document format from file bytes—not just extensions—routing PDFs and images through OCR while parsing CSV, TSV, TXT, XLSX, and XLSM directly.",
    specLabel: "Up to 100 MB per File & 200 PDF Pages",
    specDetail:
      "Recognizes English, German, French, Spanish, Portuguese, and Dutch bank headers automatically",
    highlights: [
      {
        label: "Scanned & Password-Protected PDFs",
        detail:
          "Extracts transaction tables from native or scanned PDFs with multi-pass OCR fallback, and unlocks password-protected PDFs in memory without storing passwords.",
      },
      {
        label: "Bank Quirk Spreadsheet Support",
        detail:
          "Reads UTF-16 Unicode text exports, split two-row headers, and HTML/XML bank exports saved with spreadsheet extensions up to 100,000 rows.",
      },
      {
        label: "All ISO 4217 Currencies & Formats",
        detail:
          "Parses currency codes/symbols, trailing minus signs, accounting parentheses, and Dr/Cr suffixes consistently across statements and cash books.",
      },
      {
        label: "Opening & Closing Balance Extraction",
        detail:
          "Automatically picks up Balance B/F, Brought Forward, Balance C/F, and Carried Forward rows from both statements and ledgers.",
      },
    ],
    codeChips: [
      "PDF Statement OCR",
      "JPG / PNG / TIFF",
      "CSV / TSV / TXT",
      "XLSX / XLSM",
      "In-Memory PDF Unlock",
    ],
  },
  {
    id: "matching",
    tabLabel: "Matching & Tolerances",
    badge: "Configurable Rules",
    title: "Deterministic Matching With Date-Window & Memo Scoring",
    summary:
      "Compares normalized bank statement lines against your business ledger using exact amounts, flow direction, reference IDs, configurable date tolerances, and optional description similarity.",
    specLabel: "±0 to 31 Day Window • Description Scoring",
    specDetail:
      "Tolerates weekend and ACH/SEPA/Faster Payments clearing lags while catching flipped signs",
    highlights: [
      {
        label: "Configurable Date Tolerance Window",
        detail:
          "Set `date_tolerance_days` between 0 and 31 days (default ±2 days) so clearing delays never hide valid matches.",
      },
      {
        label: "Reference & Narration Matching",
        detail:
          "Matches UTR, cheque numbers, voucher IDs, and toggleable description similarity (`description_matching`) with confidence scores and match reasons.",
      },
      {
        label: "Direction Convention Detection",
        detail:
          "Handles both bank-convention and ledger-convention cash books automatically so inflows and outflows align accurately.",
      },
      {
        label: "Single-Total Invoice/Receipt Fallback",
        detail:
          "Even if you upload an invoice or receipt PDF as your business ledger, ClearTie extracts and reconciles its printed total with an explanatory warning.",
      },
    ],
  },
  {
    id: "audit",
    tabLabel: "Gaps, Duplicates & Proof",
    badge: "Full Variance Check",
    title: "Surface Unmatched Items, Duplicates, Mismatches & Balance Proof",
    summary:
      "Every run isolates bank-only gaps, book-only gaps, possible duplicate entries, and amount or direction mismatches alongside math verification across both records.",
    specLabel: "Running-Balance & Book-to-Bank Proof",
    specDetail:
      "Verifies opening balance + net flow = closing balance line by line",
    highlights: [
      {
        label: "Bank-Only & Book-Only Gaps",
        detail:
          "Separates unrecorded bank fees, interest, or unposted wires (`unmatched_bank`) from deposits in transit or uncleared checks (`unmatched_ledger`).",
      },
      {
        label: "Duplicate & Amount Mismatch Alerts",
        detail:
          "Flags potential duplicate groups on either side and highlights near-matches with amount differences or opposite Dr/Cr directions.",
      },
      {
        label: "Row-by-Row Running Balance Check",
        detail:
          "Detects mid-statement running balance breaks caused by OCR errors, missing rows, or corrupted ledger exports.",
      },
      {
        label: "Book-to-Bank Explained Variance",
        detail:
          "Breaks down closing balance differences into explained discrepancies versus unexplained residual variance.",
      },
    ],
  },
  {
    id: "exports",
    tabLabel: "Exports & Session Resume",
    badge: "XLSX • CSV • Webhooks",
    title: "Downloadable Reports, Paginated Filters & Resumable IDs",
    summary:
      "Inspect transactions by category, download formatted Excel or CSV workbooks, resume prior reconciliation runs by ID, or attach signed completion webhooks.",
    specLabel: "XLSX & CSV • Category Filtering",
    specDetail:
      "Browse Matched, Unmatched Bank, Unmatched Ledger, Duplicates, and Mismatches",
    highlights: [
      {
        label: "Formatted XLSX & CSV Export",
        detail:
          "Download complete reconciliation workbooks in `.xlsx` or `.csv` containing summary KPIs, balance checks, and all categorized rows.",
      },
      {
        label: "Paginated Category Explorer",
        detail:
          "Switch between All, Matched, Bank Only, Ledger Only, Duplicates, and Amount Mismatches with page size controls.",
      },
      {
        label: "Session Resume by Reconciliation ID",
        detail:
          "Reload recent runs automatically or enter any `reconciliation_id` (e.g. `rec_...`) to reopen saved results within the retention window.",
      },
      {
        label: "Optional HTTPS Webhooks",
        detail:
          "Attach an HTTPS `webhook_url` and optional HMAC-SHA256 `webhook_secret` when kicking off long scanned-PDF jobs.",
      },
    ],
  },
];

export const UTILITY_COMPARISON: UtilityComparisonRow[] = [
  {
    dimension: "Access & Setup",
    manualSpreadsheets: "Manual formula & tab setup",
    genericPdfTools: "Converter limits or paywalls",
    enterpriseSuites: "Weeks of ERP onboarding & sales demos",
    cleartie: "Instant browser utility — no subscription",
  },
  {
    dimension: "Scanned & Locked PDFs",
    manualSpreadsheets: "Manual re-keying line by line",
    genericPdfTools: "Must unlock PDFs separately first",
    enterpriseSuites: "Requires clean ERP or bank feeds",
    cleartie: "Built-in PDF OCR + in-memory unlock",
  },
  {
    dimension: "Date Tolerance & Matching",
    manualSpreadsheets: "Fragile exact VLOOKUP formulas",
    genericPdfTools: "No ledger comparison engine",
    enterpriseSuites: "Complex custom rule scripting",
    cleartie: "±0–31 day window + reference & memo scoring",
  },
  {
    dimension: "Duplicates & Sign Flips",
    manualSpreadsheets: "Missed without custom pivots",
    genericPdfTools: "Not checked",
    enterpriseSuites: "Batch rules after feed sync",
    cleartie: "Dedicated duplicates & Dr/Cr flip alerts",
  },
  {
    dimension: "Balance & Variance Proof",
    manualSpreadsheets: "Manual ending tie-out formulas",
    genericPdfTools: "Raw table dump only",
    enterpriseSuites: "Tied to full close platform",
    cleartie: "Opening/closing, running balance & proof",
  },
  {
    dimension: "Export Deliverable",
    manualSpreadsheets: "Ad-hoc copy-paste sheets",
    genericPdfTools: "Unstructured CSV dump",
    enterpriseSuites: "Proprietary close workspace",
    cleartie: "Clean XLSX workbook & CSV report export",
  },
];

export const HOW_TO_USE_STEPS = [
  {
    step: "01",
    title: "Upload Bank Statement",
    detail:
      "Drop your bank or card statement in PDF (digital or scanned), image, CSV, TSV, TXT, or XLSX/XLSM format.",
  },
  {
    step: "02",
    title: "Upload Business Ledger",
    detail:
      "Add your matching cash book, general ledger export, or invoice/receipt PDF (supply PDF passwords if locked).",
  },
  {
    step: "03",
    title: "Configure Tolerances",
    detail:
      "Set your date window (0–31 days) and toggle description similarity scoring to reflect settlement timing.",
  },
  {
    step: "04",
    title: "Review Matches & Exceptions",
    detail:
      "Inspect matched pairs, bank-only fees, book-only timing items, possible duplicates, mismatches, and balance checks.",
  },
  {
    step: "05",
    title: "Export XLSX or CSV",
    detail:
      "Download your complete reconciliation workbook as XLSX or CSV, or save your reconciliation ID to reopen later.",
  },
];

export const HOW_TO_USE_PLAYBOOK: PlaybookPhase[] = [
  {
    phase: "Phase 1: Prepare & Upload Documents",
    title: "Provide Matched Source Statements",
    items: [
      {
        heading: "Keep Same Currency Across Both Files",
        detail:
          "Ensure the bank statement and business ledger cover overlapping statement periods in the same currency with clear date and amount columns.",
      },
      {
        heading: "Unlock Password-Protected PDFs Inline",
        detail:
          "If either PDF is encrypted, provide its password before or when prompted; it is decrypted in memory only and never saved.",
      },
    ],
  },
  {
    phase: "Phase 2: Match & Isolate Exceptions",
    title: "Review Automated Classification",
    items: [
      {
        heading: "Separate Bank Gaps from Book Gaps",
        detail:
          "Filter directly to `Unmatched Bank` (wires, fees, interest) and `Unmatched Ledger` (deposits in transit, uncashed checks).",
      },
      {
        heading: "Verify Duplicates & Amount Mismatches",
        detail:
          "Check flagged duplicate groups and rows with amount differences or reversed debit/credit directions side by side.",
      },
    ],
  },
  {
    phase: "Phase 3: Verify Balances & Export",
    title: "Confirm Book-to-Bank Integrity",
    items: [
      {
        heading: "Check Opening, Closing & Running Balances",
        detail:
          "Verify both statement and ledger math checks pass, including line-by-line running balance continuity.",
      },
      {
        heading: "Download Complete XLSX or CSV Output",
        detail:
          "Export your finished reconciliation workbook immediately for review or archival without locking into any platform.",
      },
    ],
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "how-to-reconcile-step-by-step",
    category: "tool",
    question: "How do I reconcile bank statement files with ClearTie step by step?",
    answer:
      "Open the Reconciliation Tool page (/reconcile), drop your bank statement (PDF, image, CSV, TSV, TXT, or XLSX/XLSM) into Slot 1 and your business ledger or cash book into Slot 2, adjust the date tolerance window (0–31 days, default ±2 days) and description similarity toggle, and click Run Bank Reconciliation. Once processing completes, review Matched, Unmatched Bank, Unmatched Ledger, Duplicates, and Mismatches, verify the balance checks, and export your XLSX or CSV report. You can also click Load Sample CSV Pair to test the workflow instantly.",
  },
  {
    id: "account-reconciliation-meaning-faq",
    category: "concepts",
    question: "What is the account reconciliation meaning in business finance?",
    answer:
      "In plain English, an account reconciliation is the accounting check that compares two independent financial records—such as a bank statement and your company general ledger—to verify that balances agree and every difference is documented. Its purpose is to catch timing lags, unrecorded fees, duplicate postings, and data-entry errors before closing the books.",
  },
  {
    id: "formats",
    category: "tool",
    question: "What document and spreadsheet formats are supported?",
    answer:
      "Both uploads support digital or scanned PDFs (.pdf), images (.jpg, .jpeg, .png, .webp, .tiff, .tif), and spreadsheets (.csv, .tsv, .txt, .xlsx, .xlsm). ClearTie detects true format from file bytes rather than extensions, so UTF-16 Unicode bank exports and HTML/XML spreadsheets parse cleanly. Legacy .xls files are not supported—resave them as .xlsx, .csv, or PDF first.",
  },
  {
    id: "password-pdfs",
    category: "tool",
    question: "How does ClearTie handle password-protected PDF statements?",
    answer:
      "Enter an optional PDF password per document before submitting—or enter it when prompted if an encrypted PDF is detected. Your PDF is decrypted strictly in memory on the server, and ClearTie never stores or logs passwords.",
  },
  {
    id: "limits",
    category: "tool",
    question: "What are the file size, page, and row limits?",
    answer:
      "Each uploaded file supports up to 100 MB, PDF documents support up to 200 pages each, and spreadsheets support up to 100,000 rows.",
  },
  {
    id: "how-often-reconcile",
    category: "concepts",
    question: "How often should businesses be reconciling bank statements and card ledgers?",
    answer:
      "Finance teams should perform reconciliation at least monthly right after statement close. High-volume operating accounts, e-commerce settlement accounts, and corporate credit cards benefit from weekly reviews so missing entries, duplicate charges, or bank errors are caught early.",
  },
  {
    id: "difference-from-enterprise-software",
    category: "concepts",
    question: "How does ClearTie differ from subscription financial reconciliation software?",
    answer:
      "Traditional reconciliation platforms and accounting suites require connecting live bank credentials, paying monthly per-seat subscriptions, or configuring full ERP integrations. ClearTie works directly from exported statements and ledgers with built-in PDF OCR, configurable tolerances, balance verification, and XLSX/CSV exports—no account or subscription required.",
  },
  {
    id: "what-report-includes",
    category: "tool",
    question: "What does the completed reconciliation report include?",
    answer:
      "Every report includes summary KPI counts (matched, unmatched bank, unmatched ledger, possible duplicates, amount mismatches, and OCR corrections), independent Bank and Ledger opening/closing and running-balance checks, a Book-to-Bank explained vs. unexplained variance breakdown, warnings, filterable transaction rows, and downloadable XLSX or CSV workbooks.",
  },
];

export const QUICK_GUIDES: Record<
  "bank" | "credit-card" | "balance-sheet",
  QuickGuide
> = {
  bank: {
    id: "bank",
    title: "Quick Guide: Bank Account Reconciliation Tie-Out",
    subtitle:
      "Compare checking or savings statements against your cash book in three steps.",
    steps: [
      {
        title: "1. Upload your bank statement and cash book export",
        detail:
          "Pair any PDF, image, CSV, or XLSX bank statement with your cash book or general ledger export.",
      },
      {
        title: "2. Review matched rows, bank gaps, and book gaps",
        detail:
          "Filter by category to separate deposits in transit and outstanding checks from bank charges and potential duplicate entries.",
      },
      {
        title: "3. Check running-balance math and export XLSX/CSV",
        detail:
          "Inspect the Book-to-Bank proof card for unexplained variance and download the full XLSX or CSV workbook.",
      },
    ],
  },
  "credit-card": {
    id: "credit-card",
    title: "Quick Guide: Credit Card Reconciliation",
    subtitle:
      "Verify corporate card statements against your expense or AP ledger.",
    steps: [
      {
        title: "1. Pair card statement PDF or CSV with your expense export",
        detail:
          "Upload your monthly Visa, Mastercard, or Amex statement alongside your corporate card ledger export.",
      },
      {
        title: "2. Allow ±2–5 day posting tolerance for pending authorizations",
        detail:
          "Merchant settlement dates often trail purchase dates; widen date_tolerance_days slightly to pair delayed charges cleanly.",
      },
      {
        title: "3. Isolate unrecorded fees, duplicate charges & sign flips",
        detail:
          "Review Unmatched Bank for unposted subscriptions or FX fees and Mismatches for reversed refunds or credits.",
      },
    ],
  },
  "balance-sheet": {
    id: "balance-sheet",
    title: "Quick Guide: Balance Sheet Account Reconciliation",
    subtitle:
      "Substantiate cash, clearing, and subledger schedules with audit-ready proof.",
    steps: [
      {
        title: "1. Upload external statement evidence and GL subledger",
        detail:
          "Substantiate ending balance sheet figures using PDF OCR or multi-language CSV/XLSX exports up to 100,000 rows.",
      },
      {
        title: "2. Inspect running-balance breaks and Book-to-Bank math",
        detail:
          "Confirm opening balance + net flow = closing balance on both records and verify residual unexplained variance equals zero.",
      },
      {
        title: "3. Export XLSX workbook & store Reconciliation ID",
        detail:
          "Download the formatted XLSX tie-out workpaper for audit review and copy your reconciliation_id to reopen the run anytime.",
      },
    ],
  },
};
