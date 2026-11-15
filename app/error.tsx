"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

export default function AppErrorBoundary({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error("Route error boundary triggered:", error);
    }
  }, [error]);

  return (
    <main
      id="main-content"
      className="flex min-h-[75vh] flex-1 items-center justify-center bg-white px-4 py-16 text-[#111214] sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-xl rounded-[28px] border border-red-200/80 bg-[#F8FAFC] p-7 text-center shadow-xs sm:p-10">
        <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-700">
          <AlertTriangle className="h-6 w-6" />
        </span>

        <p className="mt-5 font-mono text-xs font-semibold uppercase tracking-wider text-[#5A5E67]">
          Unexpected Application Error
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#111214] sm:text-3xl">
          Something interrupted this view
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#5A5E67]">
          An unexpected error occurred while rendering this page. Retry loading
          the view or return to the homepage.
        </p>

        <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => retry()}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#111214] px-6 text-xs font-semibold text-white transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214] sm:text-sm"
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 text-xs font-semibold text-[#111214] transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214] sm:text-sm"
          >
            <Home className="h-4 w-4" />
            Go to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
