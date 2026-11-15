import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileQuestion, Home, LifeBuoy, Wrench } from "lucide-react";
import { Navbar } from "@/components/landing/navbar";
import { SiteFooter } from "@/components/landing/site-footer";

export const metadata: Metadata = {
  title: "404 — Page Not Found | reconcilebankstatement",
  description:
    "The page you requested could not be found on reconcilebankstatement.online.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-[#111214]">
      <Navbar />

      <main
        id="main-content"
        className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="w-full max-w-2xl rounded-[28px] border border-slate-200 bg-[#F8FAFC] p-7 text-center shadow-xs sm:p-10">
          <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#111214] text-[#BDF71D]">
            <FileQuestion className="h-6 w-6" />
          </span>

          <p className="mt-5 font-mono text-xs font-semibold uppercase tracking-wider text-[#5A5E67]">
            Error 404 • Page Not Found
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#111214] sm:text-4xl">
            We couldn&apos;t find that page
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#5A5E67] sm:text-base">
            The URL may have changed, expired, or contain a typo. Jump back into
            the bank statement reconciliation tool or browse our help resources
            below.
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#111214] px-6 text-xs font-semibold text-white transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214] sm:text-sm"
            >
              <Home className="h-4 w-4" />
              Back to Homepage
            </Link>
            <Link
              href="/reconcile"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#BDF71D] px-6 text-xs font-semibold text-[#111214] transition-colors hover:bg-[#ccff3d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214] sm:text-sm"
            >
              <Wrench className="h-4 w-4" />
              Open Reconciliation Tool
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-3 border-t border-slate-200 pt-6 text-left sm:grid-cols-2">
            <Link
              href="/bank-reconciliation-guide"
              className="rounded-2xl border border-slate-200 bg-white p-4 transition-colors hover:border-[#111214]/40"
            >
              <div className="text-xs font-semibold text-[#111214]">
                Bank Reconciliation Guide
              </div>
              <p className="mt-1 text-xs text-[#5A5E67]">
                Step-by-step tie-out formula and timing difference examples.
              </p>
            </Link>
            <Link
              href="/contact-us"
              className="rounded-2xl border border-slate-200 bg-white p-4 transition-colors hover:border-[#111214]/40"
            >
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#111214]">
                <LifeBuoy className="h-3.5 w-3.5 text-[#5A5E67]" />
                Contact Support
              </div>
              <p className="mt-1 text-xs text-[#5A5E67]">
                Report a broken link or ask about statement formats.
              </p>
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
