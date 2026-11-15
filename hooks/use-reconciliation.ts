"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  createReconciliationClient,
  detectPdfPasswordIssue,
  ReconciliationApiError,
  type ReconciliationAuthMode,
} from "@/lib/reconciliation/client";
import { isValidReconciliationId } from "@/lib/reconciliation/validation";
import type {
  ExportFormat,
  PdfPasswordPrompt,
  ReconciliationReport,
  ReconciliationReportItem,
  ReconciliationStatusResponse,
  TransactionCategory,
  UploadReconciliationParams,
} from "@/lib/reconciliation/types";

export type ReconciliationPhase =
  | "idle"
  | "uploading"
  | "processing"
  | "completed"
  | "failed";

export type TransactionsCategoryFilter = "all" | TransactionCategory;

export type UseReconciliationOptions = {
  apiBasePath?: string;
  mode?: ReconciliationAuthMode;
  pollIntervalMs?: number;
  defaultPageSize?: number;
  sessionStorageKey?: string;
  skipInitialTransactionsFetch?: boolean;
  onCompleted?: (id: string, report: ReconciliationReport) => void;
};

export function useReconciliation(options: UseReconciliationOptions = {}) {
  const {
    apiBasePath = "/api/reconciliation",
    mode = "proxy",
    pollIntervalMs = 2500,
    defaultPageSize = 25,
    sessionStorageKey = "reconcilebankstatement:last-reconciliation-id",
    skipInitialTransactionsFetch = false,
    onCompleted,
  } = options;

  const client = useMemo(
    () => createReconciliationClient({ basePath: apiBasePath, mode }),
    [apiBasePath, mode]
  );

  const [phase, setPhase] = useState<ReconciliationPhase>("idle");
  const [reconciliationId, setReconciliationId] = useState<string | null>(null);
  const [sessionIdOverride, setSessionIdOverride] = useState<string | null>(
    null
  );
  const [statusResponse, setStatusResponse] =
    useState<ReconciliationStatusResponse | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [pdfPasswordPrompt, setPdfPasswordPrompt] =
    useState<PdfPasswordPrompt | null>(null);
  const [accessExpiresAt, setAccessExpiresAt] = useState<string | null>(null);

  const [activeCategory, setActiveCategory] =
    useState<TransactionsCategoryFilter>("all");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(defaultPageSize);
  const [transactions, setTransactions] = useState<ReconciliationReportItem[]>(
    []
  );
  const [transactionsTotal, setTransactionsTotal] = useState<number>(0);
  const [transactionsLoading, setTransactionsLoading] =
    useState<boolean>(false);
  const [transactionsError, setTransactionsError] = useState<string | null>(
    null
  );
  const [exportingFormat, setExportingFormat] = useState<ExportFormat | null>(
    null
  );
  const [exportError, setExportError] = useState<string | null>(null);

  const pollAbortRef = useRef<AbortController | null>(null);
  const txAbortRef = useRef<AbortController | null>(null);
  const exportAbortRef = useRef<AbortController | null>(null);
  const mountedRef = useRef<boolean>(true);
  const runEpochRef = useRef<number>(0);
  const defaultPageSizeRef = useRef<number>(defaultPageSize);
  const onCompletedRef = useRef(onCompleted);

  useEffect(() => {
    onCompletedRef.current = onCompleted;
  }, [onCompleted]);

  useEffect(() => {
    defaultPageSizeRef.current = defaultPageSize;
  }, [defaultPageSize]);

  const storedSessionId = useSyncExternalStore(
    useCallback(
      (onStoreChange) => {
        if (typeof window === "undefined") return () => {};
        const handler = (event: StorageEvent) => {
          if (event.key === sessionStorageKey) onStoreChange();
        };
        window.addEventListener("storage", handler);
        return () => window.removeEventListener("storage", handler);
      },
      [sessionStorageKey]
    ),
    () => {
      if (typeof window === "undefined") return null;
      try {
        return window.sessionStorage.getItem(sessionStorageKey);
      } catch {
        return null;
      }
    },
    () => null
  );

  const lastSavedId = sessionIdOverride ?? storedSessionId;

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      runEpochRef.current += 1;
      pollAbortRef.current?.abort();
      txAbortRef.current?.abort();
      exportAbortRef.current?.abort();
    };
  }, []);

  const persistId = useCallback(
    (id: string) => {
      setSessionIdOverride(id);
      if (typeof window === "undefined") return;
      try {
        window.sessionStorage.setItem(sessionStorageKey, id);
      } catch {
        // Ignore storage access errors
      }
    },
    [sessionStorageKey]
  );

  const fetchTransactionsPage = useCallback(
    async (
      id: string,
      category: TransactionsCategoryFilter,
      nextPage: number,
      nextPageSize: number,
      epoch = runEpochRef.current
    ) => {
      txAbortRef.current?.abort();
      const controller = new AbortController();
      txAbortRef.current = controller;

      setTransactionsLoading(true);
      setTransactionsError(null);

      try {
        const res = await client.getTransactions(
          id,
          {
            status: category === "all" ? undefined : category,
            page: nextPage,
            pageSize: nextPageSize,
          },
          { signal: controller.signal }
        );
        if (
          controller.signal.aborted ||
          !mountedRef.current ||
          epoch !== runEpochRef.current ||
          txAbortRef.current !== controller
        ) {
          return;
        }
        setTransactions(res.transactions ?? []);
        setTransactionsTotal(res.total ?? 0);
        setPage(res.page ?? nextPage);
        setPageSize(res.page_size ?? nextPageSize);
      } catch (err) {
        if (
          (err as Error)?.name === "AbortError" ||
          controller.signal.aborted ||
          !mountedRef.current ||
          epoch !== runEpochRef.current ||
          txAbortRef.current !== controller
        ) {
          return;
        }
        const message =
          err instanceof Error
            ? err.message
            : "Unable to load reconciliation transactions.";
        setTransactionsError(message);
      } finally {
        if (
          !controller.signal.aborted &&
          mountedRef.current &&
          epoch === runEpochRef.current &&
          txAbortRef.current === controller
        ) {
          setTransactionsLoading(false);
        }
      }
    },
    [client]
  );

  const pollAndHydrate = useCallback(
    async (
      id: string,
      controller: AbortController,
      epoch: number,
      persistOnFirstSnapshot = false
    ) => {
      let persisted = !persistOnFirstSnapshot;
      const finalSnapshot = await client.pollReconciliation(id, {
        intervalMs: pollIntervalMs,
        signal: controller.signal,
        onProgress: (snap) => {
          if (
            controller.signal.aborted ||
            !mountedRef.current ||
            epoch !== runEpochRef.current
          ) {
            return;
          }
          if (!persisted) {
            persisted = true;
            persistId(id);
          }
          setStatusResponse(snap);
          setProgress(snap.progress ?? 0);
          setStatusMessage(snap.message || "Processing reconciliation...");
        },
      });

      if (
        controller.signal.aborted ||
        !mountedRef.current ||
        epoch !== runEpochRef.current
      ) {
        return;
      }

      if (!persisted) {
        persistId(id);
      }
      setStatusResponse(finalSnapshot);
      setProgress(100);
      setStatusMessage(
        finalSnapshot.message || "Reconciliation completed successfully."
      );
      setPhase("completed");

      if (finalSnapshot.result) {
        onCompletedRef.current?.(id, finalSnapshot.result);
      }

      if (skipInitialTransactionsFetch) {
        return;
      }

      const initialPageSize = defaultPageSizeRef.current;
      setActiveCategory("all");
      setPage(1);
      setPageSize(initialPageSize);
      await fetchTransactionsPage(id, "all", 1, initialPageSize, epoch);
    },
    [
      client,
      fetchTransactionsPage,
      persistId,
      pollIntervalMs,
      skipInitialTransactionsFetch,
    ]
  );

  const start = useCallback(
    async (params: UploadReconciliationParams) => {
      const epoch = runEpochRef.current + 1;
      runEpochRef.current = epoch;
      pollAbortRef.current?.abort();
      txAbortRef.current?.abort();
      exportAbortRef.current?.abort();
      exportAbortRef.current = null;
      const controller = new AbortController();
      pollAbortRef.current = controller;

      setError(null);
      setExportError(null);
      setExportingFormat(null);
      setPdfPasswordPrompt(null);
      setStatusResponse(null);
      setTransactions([]);
      setTransactionsTotal(0);
      setTransactionsError(null);
      setReconciliationId(null);
      setAccessExpiresAt(null);
      setPhase("uploading");
      setProgress(5);
      setStatusMessage("Uploading bank statement and business ledger...");

      try {
        const uploadRes = await client.startReconciliation(params, {
          signal: controller.signal,
        });
        if (
          controller.signal.aborted ||
          !mountedRef.current ||
          epoch !== runEpochRef.current
        ) {
          return;
        }

        const id = uploadRes.reconciliation_id;
        setReconciliationId(id);
        persistId(id);
        if (uploadRes.access_expires_at) {
          setAccessExpiresAt(uploadRes.access_expires_at);
        }
        setPhase("processing");
        setProgress(10);
        setStatusMessage(
          uploadRes.message || "Documents uploaded. Reconciliation queued."
        );

        await pollAndHydrate(id, controller, epoch, false);
      } catch (err) {
        if (
          (err as Error)?.name === "AbortError" ||
          controller.signal.aborted ||
          !mountedRef.current ||
          epoch !== runEpochRef.current
        ) {
          return;
        }
        const message =
          err instanceof Error
            ? err.message
            : "Failed to run bank reconciliation.";
        const passwordIssue =
          err instanceof ReconciliationApiError && err.status === 400
            ? detectPdfPasswordIssue(message)
            : null;
        setPdfPasswordPrompt(passwordIssue);
        setError(message);
        setPhase("failed");
      }
    },
    [client, persistId, pollAndHydrate]
  );

  const resume = useCallback(
    async (id: string) => {
      const trimmed = id.trim();
      if (!trimmed) return;

      const epoch = runEpochRef.current + 1;
      runEpochRef.current = epoch;
      pollAbortRef.current?.abort();
      txAbortRef.current?.abort();
      exportAbortRef.current?.abort();
      exportAbortRef.current = null;

      setError(null);
      setExportError(null);
      setExportingFormat(null);
      setPdfPasswordPrompt(null);
      setStatusResponse(null);
      setTransactions([]);
      setTransactionsTotal(0);
      setTransactionsError(null);

      if (!isValidReconciliationId(trimmed)) {
        setReconciliationId(null);
        setPhase("failed");
        setProgress(0);
        setStatusMessage("");
        setError(
          "Invalid reconciliation ID format. Expected 3-128 letters, numbers, hyphens, or underscores."
        );
        return;
      }

      const controller = new AbortController();
      pollAbortRef.current = controller;

      setReconciliationId(trimmed);
      setPhase("processing");
      setProgress(10);
      setStatusMessage("Loading saved reconciliation status...");

      try {
        await pollAndHydrate(trimmed, controller, epoch, true);
      } catch (err) {
        if (
          (err as Error)?.name === "AbortError" ||
          controller.signal.aborted ||
          !mountedRef.current ||
          epoch !== runEpochRef.current
        ) {
          return;
        }
        const message =
          err instanceof Error
            ? err.message
            : "Unable to load reconciliation report.";
        setError(message);
        setPhase("failed");
      }
    },
    [pollAndHydrate]
  );

  const cancelPolling = useCallback(() => {
    runEpochRef.current += 1;
    pollAbortRef.current?.abort();
    txAbortRef.current?.abort();
    exportAbortRef.current?.abort();
    exportAbortRef.current = null;
    setExportingFormat(null);
    setPhase("idle");
    setProgress(0);
    setStatusMessage("");
  }, []);

  const reset = useCallback(() => {
    runEpochRef.current += 1;
    pollAbortRef.current?.abort();
    txAbortRef.current?.abort();
    exportAbortRef.current?.abort();
    exportAbortRef.current = null;
    setPhase("idle");
    setReconciliationId(null);
    setStatusResponse(null);
    setProgress(0);
    setStatusMessage("");
    setError(null);
    setPdfPasswordPrompt(null);
    setAccessExpiresAt(null);
    setTransactions([]);
    setTransactionsTotal(0);
    setTransactionsLoading(false);
    setTransactionsError(null);
    setExportingFormat(null);
    setExportError(null);
    setActiveCategory("all");
    setPage(1);
    setPageSize(defaultPageSizeRef.current);
  }, []);

  const retryTransactions = useCallback(async () => {
    if (reconciliationId && phase === "completed") {
      await fetchTransactionsPage(reconciliationId, activeCategory, page, pageSize);
    }
  }, [activeCategory, fetchTransactionsPage, page, pageSize, phase, reconciliationId]);

  const changeCategory = useCallback(
    async (nextCategory: TransactionsCategoryFilter) => {
      setActiveCategory(nextCategory);
      setPage(1);
      if (reconciliationId && phase === "completed") {
        await fetchTransactionsPage(reconciliationId, nextCategory, 1, pageSize);
      }
    },
    [fetchTransactionsPage, pageSize, phase, reconciliationId]
  );

  const changePage = useCallback(
    async (nextPage: number) => {
      const safePage = Math.max(1, nextPage);
      setPage(safePage);
      if (reconciliationId && phase === "completed") {
        await fetchTransactionsPage(
          reconciliationId,
          activeCategory,
          safePage,
          pageSize
        );
      }
    },
    [activeCategory, fetchTransactionsPage, pageSize, phase, reconciliationId]
  );

  const changePageSize = useCallback(
    async (nextPageSize: number) => {
      const safeSize = Math.min(500, Math.max(1, nextPageSize));
      setPageSize(safeSize);
      setPage(1);
      if (reconciliationId && phase === "completed") {
        await fetchTransactionsPage(
          reconciliationId,
          activeCategory,
          1,
          safeSize
        );
      }
    },
    [activeCategory, fetchTransactionsPage, phase, reconciliationId]
  );

  const exportReport = useCallback(
    async (format: ExportFormat) => {
      if (!reconciliationId || exportAbortRef.current) return;

      const epoch = runEpochRef.current;
      const controller = new AbortController();
      exportAbortRef.current = controller;

      setExportingFormat(format);
      setExportError(null);
      try {
        await client.downloadReport(reconciliationId, format, {
          signal: controller.signal,
        });
      } catch (err) {
        if (
          (err as Error)?.name === "AbortError" ||
          controller.signal.aborted ||
          !mountedRef.current ||
          epoch !== runEpochRef.current
        ) {
          return;
        }
        const message =
          err instanceof Error ? err.message : "Unable to export report.";
        setExportError(message);
      } finally {
        if (exportAbortRef.current === controller) {
          exportAbortRef.current = null;
        }
        if (mountedRef.current && epoch === runEpochRef.current) {
          setExportingFormat(null);
        }
      }
    },
    [client, reconciliationId]
  );

  return {
    phase,
    reconciliationId,
    lastSavedId,
    statusResponse,
    report: statusResponse?.result ?? null,
    progress,
    statusMessage,
    error,
    pdfPasswordPrompt,
    accessExpiresAt,
    transactions,
    transactionsTotal,
    transactionsLoading,
    transactionsError,
    activeCategory,
    page,
    pageSize,
    exportingFormat,
    exportError,
    start,
    resume,
    cancelPolling,
    reset,
    retryTransactions,
    changeCategory,
    changePage,
    changePageSize,
    exportReport,
  };
}
