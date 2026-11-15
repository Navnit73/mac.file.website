"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  FileSpreadsheet,
  Loader2,
  RotateCcw,
  Scale,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { useCopiedFeedback } from "@/hooks/use-copied-feedback";
import type { TransactionsCategoryFilter } from "@/hooks/use-reconciliation";
import type {
  AmountMismatchItem,
  BalanceStatus,
  ExportFormat,
  MatchedTransactionItem,
  PossibleDuplicateGroup,
  ReconciliationReport,
  ReconciliationReportItem,
  RunningBalanceCheck,
  TransactionCategory,
  UnmatchedTransactionItem,
} from "@/lib/reconciliation/types";

export type ReconciliationReportViewProps = {
  reconciliationId: string;
  report: ReconciliationReport;
  transactions: ReconciliationReportItem[];
  transactionsTotal: number;
  transactionsLoading: boolean;
  transactionsError: string | null;
  activeCategory: TransactionsCategoryFilter;
  page: number;
  pageSize: number;
  headingLevel?: "h2" | "h3";
  onCategoryChange: (category: TransactionsCategoryFilter) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onRetryTransactions?: () => void;
  onExport: (format: ExportFormat) => void;
  exportingFormat: ExportFormat | null;
  exportError?: string | null;
  onNewReconciliation: () => void;
};

function StatusBadge({ status }: { status: BalanceStatus }) {
  const styles: Record<BalanceStatus, string> = {
    passed: "bg-emerald-100 text-emerald-900",
    failed: "bg-red-100 text-red-800",
    unverifiable: "bg-amber-100 text-amber-900",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase ${styles[status]}`}
    >
      {status === "passed" && <CheckCircle2 className="h-3 w-3" />}
      {status === "failed" && <XCircle className="h-3 w-3" />}
      {status === "unverifiable" && <AlertTriangle className="h-3 w-3" />}
      {status}
    </span>
  );
}

function ConfidenceBadge({
  confidence,
}: {
  confidence: "high" | "medium" | "low";
}) {
  const map = {
    high: "bg-emerald-100 text-emerald-900",
    medium: "bg-[#BDF71D]/40 text-[#111214]",
    low: "bg-amber-100 text-amber-900",
  };
  return (
    <span
      className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold uppercase ${map[confidence]}`}
    >
      {confidence}
    </span>
  );
}

function formatMoney(value: string | null | undefined, currency: string | null) {
  if (value === null || value === undefined || value === "") return "—";
  return currency ? `${currency} ${value}` : value;
}

function formatSourceLabel(source: string | null | undefined): string {
  if (!source) return "Unavailable";
  return source.replaceAll("_", " ");
}

function inferCategory(item: ReconciliationReportItem): TransactionCategory {
  if (item.category) return item.category;
  if ("bank_transaction" in item && "confidence" in item) return "matched";
  if ("bank_transaction" in item && "type" in item) return "amount_mismatches";
  if ("transaction_ids" in item) return "possible_duplicates";
  if ("source" in item && item.source === "bank") return "unmatched_bank";
  return "unmatched_ledger";
}

function getTransactionItemKey(
  item: ReconciliationReportItem,
  fallbackIndex: number,
): string {
  const category = inferCategory(item);
  if ("bank_transaction" in item && "ledger_transaction" in item) {
    return `${category}-${item.bank_transaction.id}-${item.ledger_transaction.id}`;
  }
  if ("transaction_ids" in item) {
    return `${category}-${item.source}-${item.transaction_ids.join("-")}`;
  }
  if ("id" in item && item.id) {
    return `${category}-${item.id}`;
  }
  return `${category}-${fallbackIndex}`;
}

function BalanceCard({
  title,
  opening,
  closing,
  calculated,
  difference,
  status,
  openingSource,
  closingSource,
  runningBalance,
  currency,
  headingLevel = "h4",
}: {
  title: string;
  opening: string | null | undefined;
  closing: string | null | undefined;
  calculated: string | null | undefined;
  difference: string | null | undefined;
  status: BalanceStatus;
  openingSource?: string | null;
  closingSource?: string | null;
  runningBalance?: RunningBalanceCheck;
  currency: string | null;
  headingLevel?: "h3" | "h4";
}) {
  const [showBreaks, setShowBreaks] = useState(false);
  const CardHeading = headingLevel;

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <div>
        <div className="flex items-center justify-between gap-2">
          <CardHeading className="text-sm font-semibold text-[#111214]">
            {title}
          </CardHeading>
          <StatusBadge status={status} />
        </div>

        <dl className="mt-4 space-y-2 text-xs">
          <div className="flex items-baseline justify-between gap-2">
            <dt className="text-[#5A5E67]">
              Opening{" "}
              {openingSource && (
                <span className="text-[10px] text-[#5A5E67]">
                  ({formatSourceLabel(openingSource)})
                </span>
              )}
            </dt>
            <dd className="font-mono font-semibold text-[#111214] tabular-nums">
              {formatMoney(opening, currency)}
            </dd>
          </div>

          <div className="flex items-baseline justify-between gap-2">
            <dt className="text-[#5A5E67]">
              Stated Closing{" "}
              {closingSource && (
                <span className="text-[10px] text-[#5A5E67]">
                  ({formatSourceLabel(closingSource)})
                </span>
              )}
            </dt>
            <dd className="font-mono font-semibold text-[#111214] tabular-nums">
              {formatMoney(closing, currency)}
            </dd>
          </div>

          <div className="flex items-baseline justify-between gap-2">
            <dt className="text-[#5A5E67]">Calculated Closing</dt>
            <dd className="font-mono font-semibold text-[#111214] tabular-nums">
              {formatMoney(calculated, currency)}
            </dd>
          </div>

          <div className="flex items-baseline justify-between gap-2 border-t border-slate-100 pt-2">
            <dt className="font-medium text-[#111214]">Internal Difference</dt>
            <dd className="font-mono font-bold text-[#111214] tabular-nums">
              {formatMoney(difference, currency)}
            </dd>
          </div>
        </dl>
      </div>

      {runningBalance && (
        <div className="mt-4 rounded-xl bg-[#F7F8F9] p-3 text-[11px]">
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold text-[#111214]">
              Running Balance ({runningBalance.checked} checked)
            </span>
            <StatusBadge status={runningBalance.status} />
          </div>
          {runningBalance.breaks_count > 0 ? (
            <div className="mt-2">
              <button
                type="button"
                aria-expanded={showBreaks}
                onClick={() => setShowBreaks((prev) => !prev)}
                className="inline-flex items-center gap-1 font-semibold text-red-700 hover:underline"
              >
                {runningBalance.breaks_count} running balance{" "}
                {runningBalance.breaks_count === 1 ? "break" : "breaks"}
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${
                    showBreaks ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showBreaks && runningBalance.breaks?.length > 0 && (
                <div className="mt-2 max-h-40 space-y-1.5 overflow-y-auto">
                  {runningBalance.breaks.map((brk) => (
                    <div
                      key={`${brk.transaction_id}-${brk.date}`}
                      className="rounded-lg bg-white p-2 font-mono text-[10px] text-[#111214]"
                    >
                      <div className="flex justify-between">
                        <span>
                          {brk.transaction_id} ({brk.date ?? "no date"})
                        </span>
                        <span className="text-red-700">
                          diff {brk.difference}
                        </span>
                      </div>
                      <div className="text-[#5A5E67]">
                        expected {brk.expected_balance} vs stated{" "}
                        {brk.stated_balance}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="mt-1 text-[#5A5E67]">0 running balance breaks</div>
          )}
        </div>
      )}
    </div>
  );
}

function TransactionRowCard({
  item,
  currency,
}: {
  item: ReconciliationReportItem;
  currency: string | null;
}) {
  const category = inferCategory(item);

  if (category === "matched") {
    const matched = item as MatchedTransactionItem;
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-900">
              Matched
            </span>
            <ConfidenceBadge confidence={matched.confidence} />
            {matched.date_difference_days !== null && (
              <span className="font-mono text-[11px] text-[#5A5E67]">
                {matched.date_difference_days === 0
                  ? "Same day"
                  : `${matched.date_difference_days}d offset`}
              </span>
            )}
          </div>
          <div className="font-mono text-sm font-bold text-[#111214] tabular-nums">
            {formatMoney(matched.amount, currency)}
          </div>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl bg-[#F7F8F9] p-3">
            <div className="flex items-center justify-between text-[11px] text-[#5A5E67]">
              <span className="font-mono font-semibold text-[#111214]">
                Bank • {matched.bank_transaction.id}
              </span>
              <span className="font-mono">
                {matched.bank_transaction.date ??
                  matched.bank_transaction.original_date ??
                  "No date"}
              </span>
            </div>
            <div className="mt-1 text-xs font-medium text-[#111214]">
              {matched.bank_transaction.description || "—"}
            </div>
            {matched.bank_transaction.reference && (
              <div className="mt-1 font-mono text-[10px] text-[#5A5E67]">
                Ref: {matched.bank_transaction.reference}
              </div>
            )}
          </div>

          <div className="rounded-xl bg-[#F7F8F9] p-3">
            <div className="flex items-center justify-between text-[11px] text-[#5A5E67]">
              <span className="font-mono font-semibold text-[#111214]">
                Ledger • {matched.ledger_transaction.id}
              </span>
              <span className="font-mono">
                {matched.ledger_transaction.date ??
                  matched.ledger_transaction.original_date ??
                  "No date"}
              </span>
            </div>
            <div className="mt-1 text-xs font-medium text-[#111214]">
              {matched.ledger_transaction.description || "—"}
            </div>
            {matched.ledger_transaction.reference && (
              <div className="mt-1 font-mono text-[10px] text-[#5A5E67]">
                Ref: {matched.ledger_transaction.reference}
              </div>
            )}
          </div>
        </div>

        {matched.match_basis?.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {matched.match_basis.map((basis) => (
              <span
                key={basis}
                className="rounded-full bg-[#F7F8F9] px-2.5 py-0.5 font-mono text-[10px] text-[#5A5E67]"
              >
                {basis.replaceAll("_", " ")}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (category === "unmatched_bank" || category === "unmatched_ledger") {
    const unmatched = item as UnmatchedTransactionItem;
    const isBank = category === "unmatched_bank";
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                isBank
                  ? "bg-amber-100 text-amber-900"
                  : "bg-sky-100 text-sky-900"
              }`}
            >
              {isBank ? "Unmatched Bank" : "Unmatched Ledger"}
            </span>
            <span className="font-mono text-xs font-semibold text-[#111214]">
              {unmatched.id}
            </span>
            <span className="font-mono text-xs text-[#5A5E67]">
              {unmatched.date ?? unmatched.original_date ?? "No date"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#F7F8F9] px-2 py-0.5 font-mono text-[10px] uppercase text-[#5A5E67]">
              {unmatched.flow === "in" ? "Money In" : "Money Out"}
            </span>
            <span className="font-mono text-sm font-bold text-[#111214] tabular-nums">
              {formatMoney(unmatched.amount, currency)}
            </span>
          </div>
        </div>

        <div className="mt-2 text-sm font-medium text-[#111214]">
          {unmatched.description || "—"}
        </div>

        <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-[#5A5E67]">
          {unmatched.reference && <span>Ref: {unmatched.reference}</span>}
          {unmatched.debit && <span>Debit: {unmatched.debit}</span>}
          {unmatched.credit && <span>Credit: {unmatched.credit}</span>}
          {unmatched.balance && <span>Balance: {unmatched.balance}</span>}
        </div>

        <p className="mt-2.5 rounded-xl bg-[#F7F8F9] px-3 py-2 text-xs text-[#5A5E67]">
          {unmatched.reason}
        </p>
      </div>
    );
  }

  if (category === "possible_duplicates") {
    const dup = item as PossibleDuplicateGroup;
    return (
      <div className="rounded-2xl border border-amber-200 bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-semibold text-amber-900">
              Possible Duplicate ({dup.count}x)
            </span>
            <span className="rounded-full bg-[#F7F8F9] px-2.5 py-0.5 font-mono text-[11px] uppercase text-[#111214]">
              {dup.source}
            </span>
            <span className="font-mono text-xs text-[#5A5E67]">
              {dup.transaction_ids.join(", ")}
            </span>
          </div>
          {dup.transactions[0] && (
            <span className="font-mono text-sm font-bold text-[#111214] tabular-nums">
              {formatMoney(dup.transactions[0].amount, currency)}
            </span>
          )}
        </div>

        <p className="mt-2 text-xs text-[#5A5E67]">{dup.reason}</p>

        <div className="mt-3 space-y-1.5">
          {dup.transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#F7F8F9] px-3 py-2 text-xs"
            >
              <div className="min-w-0">
                <span className="mr-2 font-mono font-semibold text-[#111214]">
                  {tx.id}
                </span>
                <span className="mr-2 font-mono text-[#5A5E67]">
                  {tx.date ?? tx.original_date}
                </span>
                <span className="text-[#111214]">{tx.description || "—"}</span>
              </div>
              <span className="font-mono font-semibold text-[#111214] tabular-nums">
                {formatMoney(tx.amount, currency)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const mismatch = item as AmountMismatchItem;
  return (
    <div className="rounded-2xl border border-red-200 bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-[11px] font-semibold text-red-800">
            {mismatch.type.replaceAll("_", " ")}
          </span>
          {mismatch.date_difference_days !== null && (
            <span className="font-mono text-[11px] text-[#5A5E67]">
              {mismatch.date_difference_days}d apart
            </span>
          )}
        </div>
        <span className="font-mono text-xs font-bold text-red-700 tabular-nums">
          Diff: {formatMoney(mismatch.difference, currency)}
        </span>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <div className="rounded-xl bg-[#F7F8F9] p-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-mono font-semibold text-[#111214]">
              Bank • {mismatch.bank_transaction.id}
            </span>
            <span className="font-mono font-bold text-[#111214] tabular-nums">
              {formatMoney(mismatch.bank_amount, currency)}
            </span>
          </div>
          <div className="mt-1 text-xs text-[#111214]">
            {mismatch.bank_transaction.description || "—"}
          </div>
          <div className="mt-1 font-mono text-[10px] text-[#5A5E67]">
            {mismatch.bank_transaction.date ??
              mismatch.bank_transaction.original_date}
          </div>
        </div>

        <div className="rounded-xl bg-[#F7F8F9] p-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-mono font-semibold text-[#111214]">
              Ledger • {mismatch.ledger_transaction.id}
            </span>
            <span className="font-mono font-bold text-[#111214] tabular-nums">
              {formatMoney(mismatch.ledger_amount, currency)}
            </span>
          </div>
          <div className="mt-1 text-xs text-[#111214]">
            {mismatch.ledger_transaction.description || "—"}
          </div>
          <div className="mt-1 font-mono text-[10px] text-[#5A5E67]">
            {mismatch.ledger_transaction.date ??
              mismatch.ledger_transaction.original_date}
          </div>
        </div>
      </div>

      <p className="mt-2.5 rounded-xl bg-red-50/70 px-3 py-2 text-xs text-red-900">
        {mismatch.reason}
      </p>
    </div>
  );
}

export function ReconciliationReportView({
  reconciliationId,
  report,
  transactions,
  transactionsTotal,
  transactionsLoading,
  transactionsError,
  activeCategory,
  page,
  pageSize,
  headingLevel = "h3",
  onCategoryChange,
  onPageChange,
  onPageSizeChange,
  onRetryTransactions,
  onExport,
  exportingFormat,
  exportError,
  onNewReconciliation,
}: ReconciliationReportViewProps) {
  const ReportHeading = headingLevel;
  const cardHeadingLevel = headingLevel === "h2" ? "h3" : "h4";
  const CardHeading = cardHeadingLevel;
  const { copied: copiedId, copyText } = useCopiedFeedback();
  const [showCorrections, setShowCorrections] = useState(false);

  const { summary, balance_check, warnings, amount_corrections } = report;
  const currency = summary.currency;

  const matchRate =
    summary.bank_transactions > 0
      ? Math.round((summary.matched / summary.bank_transactions) * 1000) / 10
      : 0;

  const totalPages = Math.max(1, Math.ceil(transactionsTotal / pageSize));

  const ledgerOpening =
    balance_check.ledger?.ledger_opening_balance ??
    balance_check.ledger?.opening_balance;
  const ledgerClosing =
    balance_check.ledger?.ledger_closing_balance ??
    balance_check.ledger?.closing_balance;

  const categories: {
    id: TransactionsCategoryFilter;
    label: string;
    count: number;
  }[] = [
    {
      id: "all",
      label: "All Categories",
      count:
        summary.matched +
        summary.unmatched_bank +
        summary.unmatched_ledger +
        summary.possible_duplicates +
        summary.amount_mismatches,
    },
    { id: "matched", label: "Matched", count: summary.matched },
    {
      id: "unmatched_bank",
      label: "Unmatched Bank",
      count: summary.unmatched_bank,
    },
    {
      id: "unmatched_ledger",
      label: "Unmatched Ledger",
      count: summary.unmatched_ledger,
    },
    {
      id: "possible_duplicates",
      label: "Duplicates",
      count: summary.possible_duplicates,
    },
    {
      id: "amount_mismatches",
      label: "Mismatches",
      count: summary.amount_mismatches,
    },
  ];

  const handleCopyId = () => {
    void copyText(reconciliationId);
  };

  return (
    <div data-clarity-mask="true" className="space-y-6">
      {/* Top Report Action Header */}
      <div className="rounded-[24px] bg-[#111214] p-5 text-white sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#BDF71D] px-3 py-0.5 text-[11px] font-semibold text-[#111214]">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Reconciliation Completed
              </span>
              {currency && (
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-white">
                  {currency} ({summary.amount_decimal_places} dp)
                </span>
              )}
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-[11px] text-white/85">
                Convention: {summary.ledger_direction_convention}
              </span>
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-[11px] text-white/85">
                ±{summary.date_tolerance_days}d tolerance
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <ReportHeading className="text-lg font-semibold tracking-tight sm:text-xl">
                {matchRate}% Bank Lines Matched ({summary.matched}/
                {summary.bank_transactions})
              </ReportHeading>
              <button
                type="button"
                onClick={handleCopyId}
                aria-label={`Copy reconciliation ID ${reconciliationId}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 font-mono text-[11px] text-white/85 hover:bg-white/20 transition-colors"
              >
                {reconciliationId}
                {copiedId ? (
                  <Check className="h-3 w-3 text-[#BDF71D]" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={exportingFormat !== null}
              onClick={() => onExport("xlsx")}
              className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-full bg-[#BDF71D] px-4 text-xs font-semibold text-[#111214] transition-colors hover:bg-[#ccff3d] disabled:opacity-60"
            >
              {exportingFormat === "xlsx" ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <FileSpreadsheet className="h-3.5 w-3.5" />
              )}
              Export XLSX
            </button>

            <button
              type="button"
              disabled={exportingFormat !== null}
              onClick={() => onExport("csv")}
              className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-full border border-white/25 bg-white/5 px-4 text-xs font-semibold text-white transition-colors hover:bg-white/15 disabled:opacity-60"
            >
              {exportingFormat === "csv" ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Download className="h-3.5 w-3.5" />
              )}
              Export CSV
            </button>

            <button
              type="button"
              onClick={onNewReconciliation}
              className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-full border border-white/20 px-4 text-xs font-semibold text-white/90 transition-colors hover:bg-white/10"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              New Run
            </button>
          </div>
        </div>

        {exportError && (
          <p className="mt-3 rounded-xl bg-red-500/20 px-3 py-2 text-xs text-red-200">
            Export failed: {exportError}
          </p>
        )}
      </div>

      {/* Summary KPI Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-[11px] font-medium text-[#5A5E67]">Matched</div>
          <div className="mt-1 font-mono text-2xl font-bold text-emerald-700 tabular-nums">
            {summary.matched}
          </div>
          <div className="mt-0.5 text-[11px] text-[#5A5E67]">
            {summary.bank_transactions} bank / {summary.ledger_transactions}{" "}
            ledger
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-[11px] font-medium text-[#5A5E67]">
            Unmatched Bank
          </div>
          <div className="mt-1 font-mono text-2xl font-bold text-[#111214] tabular-nums">
            {summary.unmatched_bank}
          </div>
          <div className="mt-0.5 text-[11px] text-[#5A5E67]">
            Bank-only entries
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-[11px] font-medium text-[#5A5E67]">
            Unmatched Ledger
          </div>
          <div className="mt-1 font-mono text-2xl font-bold text-[#111214] tabular-nums">
            {summary.unmatched_ledger}
          </div>
          <div className="mt-0.5 text-[11px] text-[#5A5E67]">
            Book-only entries
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-[11px] font-medium text-[#5A5E67]">
            Duplicates
          </div>
          <div className="mt-1 font-mono text-2xl font-bold text-amber-700 tabular-nums">
            {summary.possible_duplicates}
          </div>
          <div className="mt-0.5 text-[11px] text-[#5A5E67]">
            Flagged groups
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-[11px] font-medium text-[#5A5E67]">
            Mismatches
          </div>
          <div className="mt-1 font-mono text-2xl font-bold text-red-700 tabular-nums">
            {summary.amount_mismatches}
          </div>
          <div className="mt-0.5 text-[11px] text-[#5A5E67]">
            Amount / direction
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-[11px] font-medium text-[#5A5E67]">
            OCR Corrections
          </div>
          <div className="mt-1 font-mono text-2xl font-bold text-[#111214] tabular-nums">
            {summary.amount_corrections}
          </div>
          <div className="mt-0.5 text-[11px] text-[#5A5E67]">
            Verified from text
          </div>
        </div>
      </div>

      {/* Balance Check & Book-to-Bank Verification */}
      <div
        className={`grid gap-4 ${
          balance_check.ledger && balance_check.book_to_bank
            ? "lg:grid-cols-3"
            : balance_check.ledger || balance_check.book_to_bank
              ? "lg:grid-cols-2"
              : ""
        }`}
      >
        <BalanceCard
          title="Bank Statement Balance Check"
          opening={balance_check.bank_opening_balance}
          closing={balance_check.bank_closing_balance}
          calculated={balance_check.calculated_closing_balance}
          difference={balance_check.difference}
          status={balance_check.status}
          openingSource={balance_check.opening_balance_source}
          closingSource={balance_check.closing_balance_source}
          runningBalance={balance_check.running_balance}
          currency={currency}
          headingLevel={cardHeadingLevel}
        />

        {balance_check.ledger && (
          <BalanceCard
            title="Business Ledger Balance Check"
            opening={ledgerOpening}
            closing={ledgerClosing}
            calculated={balance_check.ledger.calculated_closing_balance}
            difference={balance_check.ledger.difference}
            status={balance_check.ledger.status}
            openingSource={balance_check.ledger.opening_balance_source}
            closingSource={balance_check.ledger.closing_balance_source}
            runningBalance={balance_check.ledger.running_balance}
            currency={currency}
            headingLevel={cardHeadingLevel}
          />
        )}

        {balance_check.book_to_bank && (
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
            <div>
              <div className="flex items-center justify-between gap-2">
                <CardHeading className="flex items-center gap-1.5 text-sm font-semibold text-[#111214]">
                  <Scale className="h-4 w-4 text-[#5A5E67]" />
                  Book-to-Bank Proof
                </CardHeading>
                <StatusBadge status={balance_check.book_to_bank.status} />
              </div>

              <dl className="mt-4 space-y-2 text-xs">
                <div className="flex items-baseline justify-between gap-2">
                  <dt className="text-[#5A5E67]">Opening Balance Diff</dt>
                  <dd className="font-mono font-semibold text-[#111214] tabular-nums">
                    {formatMoney(
                      balance_check.book_to_bank.opening_balance_difference,
                      currency
                    )}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-2">
                  <dt className="text-[#5A5E67]">Closing Balance Diff</dt>
                  <dd className="font-mono font-semibold text-[#111214] tabular-nums">
                    {formatMoney(
                      balance_check.book_to_bank.closing_balance_difference,
                      currency
                    )}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-2">
                  <dt className="text-[#5A5E67]">Explained by Items</dt>
                  <dd className="font-mono font-semibold text-[#111214] tabular-nums">
                    {formatMoney(
                      balance_check.book_to_bank.explained_by_discrepancies,
                      currency
                    )}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-2 border-t border-slate-100 pt-2">
                  <dt className="font-semibold text-[#111214]">
                    Unexplained Difference
                  </dt>
                  <dd
                    className={`font-mono font-bold tabular-nums ${
                      balance_check.book_to_bank.status === "passed"
                        ? "text-emerald-700"
                        : "text-[#111214]"
                    }`}
                  >
                    {formatMoney(
                      balance_check.book_to_bank.unexplained_difference,
                      currency
                    )}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-4 rounded-xl bg-[#F7F8F9] p-3 text-[11px] text-[#5A5E67]">
              Verifies that bank vs. ledger balance changes equal the net sum
              of unmatched items and mismatches.
            </div>
          </div>
        )}
      </div>

      {/* Warnings & OCR Amount Corrections */}
      {(warnings?.length > 0 || amount_corrections?.length > 0) && (
        <div className="space-y-3">
          {warnings?.length > 0 && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-950">
                <AlertTriangle className="h-4 w-4 text-amber-700" />
                Report Notes &amp; Warnings ({warnings.length})
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs leading-relaxed text-amber-900">
                {warnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            </div>
          )}

          {amount_corrections?.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <button
                type="button"
                aria-expanded={showCorrections}
                onClick={() => setShowCorrections((prev) => !prev)}
                className="flex w-full items-center justify-between text-left text-xs font-semibold text-[#111214]"
              >
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-700" />
                  OCR Printed-Amount Corrections ({amount_corrections.length})
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    showCorrections ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showCorrections && (
                <div
                  tabIndex={0}
                  role="region"
                  aria-label="Normalized amount corrections ledger"
                  className="mt-3 overflow-x-auto rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214]"
                >
                  <table className="w-full min-w-[480px] text-left text-xs">
                    <thead className="border-b border-slate-100 text-[11px] uppercase text-[#5A5E67]">
                      <tr>
                        <th className="py-2 pr-4">Source</th>
                        <th className="py-2 pr-4">Transaction</th>
                        <th className="py-2 pr-4">Field</th>
                        <th className="py-2 pr-4">Extracted</th>
                        <th className="py-2">Corrected</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                      {amount_corrections.map((corr, idx) => (
                        <tr key={`${corr.source}-${corr.transaction_id}-${idx}`}>
                          <td className="py-2 pr-4 uppercase">{corr.source}</td>
                          <td className="py-2 pr-4">
                            {corr.transaction_id ?? "Balance"}
                          </td>
                          <td className="py-2 pr-4">{corr.field}</td>
                          <td className="py-2 pr-4 text-red-700 line-through">
                            {corr.extracted}
                          </td>
                          <td className="py-2 font-semibold text-emerald-700">
                            {corr.corrected}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Paginated Transaction Details Explorer (API 3) */}
      <div className="rounded-[24px] border border-slate-200 bg-white p-4 sm:p-6">
        <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onCategoryChange(cat.id)}
                  className={`inline-flex min-h-[34px] items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold transition-colors ${
                    isActive
                      ? "bg-[#111214] text-white"
                      : "bg-[#F7F8F9] text-[#5A5E67] hover:text-[#111214]"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.5 font-mono text-[10px] ${
                      isActive
                        ? "bg-[#BDF71D] text-[#111214]"
                        : "bg-white text-[#111214]"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs text-[#5A5E67]">
            <label htmlFor="rec-page-size">Rows/page:</label>
            <select
              id="rec-page-size"
              value={pageSize}
              onChange={(e) =>
                onPageSizeChange(Number.parseInt(e.target.value, 10))
              }
              className="rounded-full border border-slate-200 bg-[#F7F8F9] px-3 py-1 font-mono text-xs text-[#111214] focus:border-[#111214] focus:outline-none"
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          {transactionsLoading ? (
            <div className="flex items-center justify-center gap-2 py-12 text-xs font-medium text-[#5A5E67]">
              <Loader2 className="h-4 w-4 animate-spin text-[#111214]" />
              Loading paginated transactions...
            </div>
          ) : transactionsError ? (
            <div
              role="alert"
              className="flex flex-col items-start justify-between gap-3 rounded-2xl bg-red-50 px-4 py-3 text-xs text-red-700 sm:flex-row sm:items-center"
            >
              <span>{transactionsError}</span>
              {onRetryTransactions && (
                <button
                  type="button"
                  onClick={onRetryTransactions}
                  className="inline-flex min-h-[32px] shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-red-800 shadow-xs transition hover:bg-red-100"
                >
                  <RotateCcw className="h-3 w-3" />
                  Retry
                </button>
              )}
            </div>
          ) : transactions.length === 0 ? (
            <div className="rounded-2xl bg-[#F7F8F9] px-4 py-10 text-center text-xs text-[#5A5E67]">
              No items in this category.
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map((item, idx) => (
                <TransactionRowCard
                  key={getTransactionItemKey(item, idx)}
                  item={item}
                  currency={currency}
                />
              ))}
            </div>
          )}
        </div>

        {/* Pagination Footer */}
        <div className="mt-5 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-4 sm:flex-row">
          <div className="font-mono text-xs text-[#5A5E67]">
            Total: {transactionsTotal} items • Page {page} of {totalPages}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1 || transactionsLoading}
              onClick={() => onPageChange(page - 1)}
              className="inline-flex min-h-[34px] items-center gap-1 rounded-full border border-slate-200 px-3.5 text-xs font-semibold text-[#111214] hover:bg-[#F7F8F9] disabled:opacity-40"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Prev
            </button>
            <button
              type="button"
              disabled={page >= totalPages || transactionsLoading}
              onClick={() => onPageChange(page + 1)}
              className="inline-flex min-h-[34px] items-center gap-1 rounded-full border border-slate-200 px-3.5 text-xs font-semibold text-[#111214] hover:bg-[#F7F8F9] disabled:opacity-40"
            >
              Next
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
