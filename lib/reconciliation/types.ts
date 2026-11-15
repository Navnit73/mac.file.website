export const RECONCILIATION_ACCEPTED_EXTENSIONS = [
  ".pdf",
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".tiff",
  ".tif",
  ".csv",
  ".tsv",
  ".txt",
  ".xlsx",
  ".xlsm",
] as const;

export const RECONCILIATION_ACCEPT_ATTR =
  ".pdf,.jpg,.jpeg,.png,.webp,.tiff,.tif,.csv,.tsv,.txt,.xlsx,.xlsm";

export const RECONCILIATION_MAX_FILE_SIZE_MB = 100;
export const RECONCILIATION_MAX_FILE_SIZE_BYTES =
  RECONCILIATION_MAX_FILE_SIZE_MB * 1024 * 1024;
export const RECONCILIATION_MAX_PDF_PAGES = 200;

export type ReconciliationStatus =
  | "queued"
  | "processing"
  | "completed"
  | "failed";

export type TransactionCategory =
  | "matched"
  | "unmatched_bank"
  | "unmatched_ledger"
  | "possible_duplicates"
  | "amount_mismatches";

export type ExportFormat = "xlsx" | "csv";

export type BalanceStatus = "passed" | "failed" | "unverifiable";

export type ReconciliationTransaction = {
  id: string;
  source: "bank" | "ledger";
  row: number;
  date: string | null;
  original_date: string | null;
  description: string | null;
  reference: string | null;
  debit: string | null;
  credit: string | null;
  amount: string;
  flow: "in" | "out";
  balance: string | null;
};

export type MatchedTransactionItem = {
  category?: "matched";
  bank_transaction: ReconciliationTransaction;
  ledger_transaction: ReconciliationTransaction;
  amount: string;
  date_difference_days: number | null;
  match_basis: string[];
  confidence: "high" | "medium" | "low";
};

export type UnmatchedTransactionItem = ReconciliationTransaction & {
  category?: "unmatched_bank" | "unmatched_ledger";
  reason: string;
};

export type PossibleDuplicateGroup = {
  category?: "possible_duplicates";
  source: "bank" | "ledger";
  count: number;
  transaction_ids: string[];
  transactions: ReconciliationTransaction[];
  reason: string;
};

export type MismatchType =
  | "amount_mismatch"
  | "direction_mismatch"
  | "amount_and_direction_mismatch";

export type AmountMismatchItem = {
  category?: "amount_mismatches";
  type: MismatchType;
  bank_transaction: ReconciliationTransaction;
  ledger_transaction: ReconciliationTransaction;
  bank_amount: string;
  ledger_amount: string;
  difference: string;
  date_difference_days: number | null;
  reason: string;
};

export type AmountCorrectionItem = {
  source: "bank" | "ledger";
  transaction_id: string | null;
  field:
    | "debit"
    | "credit"
    | "amount"
    | "balance"
    | "opening_balance"
    | "closing_balance"
    | string;
  extracted: string;
  corrected: string;
};

export type ReconciliationReportItem =
  | MatchedTransactionItem
  | UnmatchedTransactionItem
  | PossibleDuplicateGroup
  | AmountMismatchItem;

export type RunningBalanceBreak = {
  transaction_id: string;
  date: string | null;
  expected_balance: string;
  stated_balance: string;
  difference: string;
};

export type RunningBalanceCheck = {
  status: BalanceStatus;
  checked: number;
  breaks_count: number;
  breaks: RunningBalanceBreak[];
};

export type LedgerBalanceCheck = {
  ledger_opening_balance?: string | null;
  opening_balance?: string | null;
  ledger_closing_balance?: string | null;
  closing_balance?: string | null;
  calculated_closing_balance?: string | null;
  difference?: string | null;
  status: BalanceStatus;
  opening_balance_source?: string | null;
  closing_balance_source?: string | null;
  running_balance?: RunningBalanceCheck;
};

export type BookToBankCheck = {
  explained_by_discrepancies: string | null;
  closing_balance_difference: string | null;
  opening_balance_difference: string | null;
  unexplained_difference: string | null;
  status: BalanceStatus;
};

export type BalanceCheck = {
  bank_opening_balance: string | null;
  bank_closing_balance: string | null;
  calculated_closing_balance: string | null;
  difference: string | null;
  status: BalanceStatus;
  opening_balance_source: string | null;
  closing_balance_source: string | null;
  running_balance?: RunningBalanceCheck;
  ledger?: LedgerBalanceCheck;
  book_to_bank?: BookToBankCheck;
};

export type ReconciliationSummary = {
  currency: string | null;
  amount_decimal_places: number;
  bank_transactions: number;
  ledger_transactions: number;
  matched: number;
  unmatched_bank: number;
  unmatched_ledger: number;
  possible_duplicates: number;
  amount_mismatches: number;
  amount_corrections: number;
  ledger_direction_convention: "bank" | "book" | string;
  date_tolerance_days: number;
  description_matching: boolean;
};

export type ReconciliationReport = {
  summary: ReconciliationSummary;
  balance_check: BalanceCheck;
  matched_transactions: MatchedTransactionItem[];
  unmatched_bank_transactions: UnmatchedTransactionItem[];
  unmatched_ledger_transactions: UnmatchedTransactionItem[];
  possible_duplicates: PossibleDuplicateGroup[];
  amount_mismatches: AmountMismatchItem[];
  amount_corrections: AmountCorrectionItem[];
  warnings: string[];
};

export type UploadReconciliationParams = {
  bankStatement: File;
  businessLedger: File;
  dateToleranceDays?: number;
  descriptionMatching?: boolean;
  bankStatementPassword?: string;
  businessLedgerPassword?: string;
  webhookUrl?: string;
  webhookSecret?: string;
  userEmail?: string;
};

export type UploadReconciliationResponse = {
  success: boolean;
  reconciliation_id: string;
  status: ReconciliationStatus;
  message: string;
  status_url: string;
  access_token?: string;
  access_expires_at?: string;
};

export type ReconciliationStatusResponse = {
  success: boolean;
  reconciliation_id: string;
  status: ReconciliationStatus;
  progress: number;
  message: string;
  result: ReconciliationReport | null;
  error: string | null;
  created_at: string;
  completed_at: string | null;
};

export type TransactionsQueryParams = {
  status?: TransactionCategory;
  page?: number;
  pageSize?: number;
};

export type TransactionsPageResponse = {
  success: boolean;
  reconciliation_id: string;
  status: TransactionCategory | "all" | null;
  total: number;
  page: number;
  page_size: number;
  transactions: ReconciliationReportItem[];
};

export type ApiErrorEnvelope = {
  id?: string;
  status?: "error";
  error: string;
  status_code?: number;
  details?: unknown;
};

export type PdfPasswordPrompt = {
  target: "bank_statement" | "business_ledger";
  reason: "missing" | "incorrect";
  message: string;
};
