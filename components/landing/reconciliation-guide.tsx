import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, ShieldAlert } from "lucide-react";
import { ExceptionIsolationIllustration } from "@/components/landing/illustrations";
import { RECONCILIATION_PROBLEMS } from "@/lib/landing-data";

export function ReconciliationGuideSection() {
  return (
    <section id="reconciliation-guide" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[79.2rem] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F7F8F9] px-3.5 py-1 text-xs font-semibold text-[#111214] border border-slate-200/80">
            <BookOpen className="h-3.5 w-3.5 text-[#111214]" />
            <span>Accounting Fundamentals &amp; Exception Guide</span>
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#111214] sm:text-5xl sm:leading-[1.12]">
            Account Reconciliation Meaning, Common Problems &amp; Fixes
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#5A5E67] sm:text-base">
            Clear financial controls start with knowing why books and bank
            statements diverge—and resolving each exception systematically
            before period close.
          </p>
        </div>

        {/* Account Reconciliation Meaning Bento */}
        <div className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-12 lg:items-stretch">
          <div className="flex flex-col justify-between rounded-[24px] bg-[#F7F8F9] p-6 sm:rounded-[28px] sm:p-8 lg:col-span-6">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-[#111214]">
                Account Reconciliation Meaning: Definition and Core Purpose
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5A5E67] sm:text-base">
                At its core, accounting account reconciliation proves that
                internal general ledger balances agree with independent external
                statements. In everyday practice, this verification check comes
                down to one clear standard: every recorded inflow, outflow, and
                ending cash figure must match verifiable source documents.
              </p>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-white p-4 shadow-xs">
                  <h4 className="text-sm font-semibold text-[#111214]">
                    Why Bank and Account Reconciliation Matters
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
                    Teams that regularly reconcile bank statement balances catch
                    unrecorded wire fees, duplicate postings, and timing lags
                    before month-end close. Modern financial reconciliation
                    software replaces manual tick-and-tie checklists with
                    deterministic matching, running-balance verification, and
                    clean audit trails.
                  </p>
                </div>

                <div className="rounded-2xl bg-[#111214] p-4 text-white">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#BDF71D]">
                    The Standard Book-to-Bank Formula
                  </h4>
                  <div className="mt-2.5 grid gap-2 font-mono text-[11px] text-white/90 sm:grid-cols-2">
                    <div className="rounded-xl bg-white/5 p-3">
                      <div className="font-semibold text-[#BDF71D]">
                        Adjusted Bank Balance
                      </div>
                      <div className="mt-1 text-white/80">
                        Statement Ending + Deposits in Transit − Outstanding
                        Checks
                      </div>
                    </div>
                    <div className="rounded-xl bg-white/5 p-3">
                      <div className="font-semibold text-[#BDF71D]">
                        Adjusted Book Balance
                      </div>
                      <div className="mt-1 text-white/80">
                        Ledger Ending + Interest Earned − Bank Fees &amp; NSF
                        Errors
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/80 pt-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#111214]">
                <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                Goal: Adjusted Bank = Adjusted Book ($0.00 variance)
              </span>
              <Link
                href="/reconcile"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#111214] underline decoration-slate-400 underline-offset-4 hover:decoration-[#111214]"
              >
                Open the tie-out tool
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Exception Visual Card */}
          <div className="flex flex-col justify-between rounded-[24px] bg-[#F7F8F9] p-6 sm:rounded-[28px] sm:p-8 lg:col-span-6">
            <div>
              <ExceptionIsolationIllustration />
            </div>

            <div className="mt-6 rounded-2xl bg-white p-5 shadow-xs">
              <h4 className="text-base font-semibold text-[#111214]">
                Exception-First Review Saves Close Hours
              </h4>
              <p className="mt-1.5 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
                Instead of reading hundreds of matching rows line by line,
                ClearTie verifies pairs automatically and brings only four
                actionable exception groups—timing gaps, unrecorded fees,
                suspected duplicates, and amount or sign mismatches—to the
                front.
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-medium">
                <a
                  href="#common-problems"
                  className="rounded-full bg-[#F7F8F9] px-3 py-1 text-[#111214] hover:bg-slate-200/70 transition-colors"
                >
                  View 4 Common Problems ↓
                </a>
                <a
                  href="#features"
                  className="rounded-full bg-[#F7F8F9] px-3 py-1 text-[#111214] hover:bg-slate-200/70 transition-colors"
                >
                  Explore Matching Engine →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Common Bank Reconciliation Problems Subsection */}
        <div id="common-problems" className="mt-12 sm:mt-16">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#111214] px-3 py-1 text-[11px] font-semibold text-[#BDF71D]">
              <ShieldAlert className="h-3.5 w-3.5" />
              Discrepancy Playbook
            </span>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[#111214] sm:text-3xl">
              Common Bank Reconciliation Problems and How to Fix Them
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#5A5E67] sm:text-base">
              When reconciling bank statements across active operating accounts,
              four recurring issues explain nearly every closing difference.
              Manual reviews often miss subtle posting mistakes that dedicated
              financial reconciliation software surfaces immediately:
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {RECONCILIATION_PROBLEMS.map((problem) => (
              <article
                key={problem.id}
                className="flex flex-col justify-between rounded-[24px] bg-[#F7F8F9] p-5 sm:p-6"
              >
                <div>
                  <span className="inline-block rounded-full bg-white px-2.5 py-0.5 font-mono text-[11px] font-semibold text-[#111214] shadow-2xs">
                    {problem.badge}
                  </span>
                  <h4 className="mt-3 text-base font-semibold leading-snug text-[#111214]">
                    {problem.title}
                  </h4>

                  <div className="mt-4 space-y-3 border-t border-slate-200/80 pt-3">
                    <div>
                      <h5 className="text-[11px] font-semibold uppercase tracking-wider text-[#5A5E67]">
                        Why It Happens
                      </h5>
                      <p className="mt-1 text-xs leading-relaxed text-[#5A5E67]">
                        {problem.whyItHappens}
                      </p>
                    </div>
                    <div className="rounded-xl bg-white p-3">
                      <h5 className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800">
                        How ClearTie Fixes It
                      </h5>
                      <p className="mt-1 text-xs leading-relaxed text-[#111214]">
                        {problem.howClearTieFixesIt}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
