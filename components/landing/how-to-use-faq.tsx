"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import {
  FAQ_ITEMS,
  HOW_TO_USE_PLAYBOOK,
  HOW_TO_USE_STEPS,
} from "@/lib/landing-data";

export function HowToUseAndFaqSection() {
  const [openFaqId, setOpenFaqId] = useState<string>(FAQ_ITEMS[0].id);
  const [faqFilter, setFaqFilter] = useState<"all" | "tool" | "concepts">(
    "all"
  );

  const visibleFaqs =
    faqFilter === "all"
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === faqFilter);

  return (
    <>
      <section id="how-to-use" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-[79.2rem] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#111214] sm:text-5xl sm:leading-[1.12]">
              How to Use reconcilebankstatement to Reconcile Bank Statement Files
            </h2>
            <p className="mt-4 text-sm text-[#5A5E67] sm:text-base">
              Follow these five steps to compare your bank statement and
              business ledger from document upload to XLSX or CSV export.
            </p>
          </div>

          <ol className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {HOW_TO_USE_STEPS.map((item) => (
              <li
                key={item.step}
                className="flex flex-col rounded-[24px] bg-[#F7F8F9] p-5 sm:p-6"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#111214] font-mono text-xs font-bold text-[#BDF71D]">
                  {item.step}
                </span>
                <h3 className="mt-4 text-sm font-semibold leading-snug text-[#111214]">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#5A5E67]">
                  {item.detail}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-6 flex justify-center">
            <Link
              href="/reconcile"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#F7F8F9] px-5 py-2 text-xs font-semibold text-[#111214] transition-colors hover:bg-slate-200/70"
            >
              Open the reconciliation tool
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Detailed 3-Phase How-to-Use Playbook */}
          <div className="mt-10 rounded-[24px] bg-[#F7F8F9] p-6 sm:mt-12 sm:rounded-[28px] sm:p-8">
            <div className="mx-auto max-w-2xl text-center">
              <h3 className="text-xl font-semibold tracking-tight text-[#111214] sm:text-2xl">
                Reconciliation Checklist &amp; Verification Flow
              </h3>
              <p className="mt-2 text-sm text-[#5A5E67]">
                Use this three-stage checklist to prepare files, inspect
                exceptions, and confirm final balance tie-outs.
              </p>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {HOW_TO_USE_PLAYBOOK.map((phase) => (
                <article
                  key={phase.phase}
                  className="flex flex-col rounded-2xl bg-white p-5 shadow-[0_12px_30px_rgba(17,18,20,0.04)] sm:p-6"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5A5E67]">
                    {phase.title}
                  </span>
                  <h4 className="mt-1.5 text-base font-semibold text-[#111214] sm:text-lg">
                    {phase.phase}
                  </h4>

                  <div className="mt-4 space-y-4 border-t border-slate-100 pt-4">
                    {phase.items.map((sub) => (
                      <div key={sub.heading} className="space-y-1">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                          <h5 className="text-sm font-semibold text-[#111214]">
                            {sub.heading}
                          </h5>
                        </div>
                        <p className="pl-6 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
                          {sub.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-[61.6rem] px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#111214] sm:text-5xl sm:leading-[1.12]">
              Frequently Asked Questions About Bank &amp; Account Reconciliation
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-[#5A5E67] sm:text-base">
              Everything you need to know about using reconcilebankstatement, supported
              document formats, matching tolerances, and reconciliation best
              practices.
            </p>

            {/* Category Filter Pills */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <button
                type="button"
                aria-pressed={faqFilter === "all"}
                onClick={() => setFaqFilter("all")}
                className={`min-h-[36px] rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  faqFilter === "all"
                    ? "bg-[#111214] text-white"
                    : "bg-[#F7F8F9] text-[#5A5E67] hover:text-[#111214]"
                }`}
              >
                All Questions ({FAQ_ITEMS.length})
              </button>
              <button
                type="button"
                aria-pressed={faqFilter === "tool"}
                onClick={() => setFaqFilter("tool")}
                className={`min-h-[36px] rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  faqFilter === "tool"
                    ? "bg-[#111214] text-white"
                    : "bg-[#F7F8F9] text-[#5A5E67] hover:text-[#111214]"
                }`}
              >
                Using reconcilebankstatement
              </button>
              <button
                type="button"
                aria-pressed={faqFilter === "concepts"}
                onClick={() => setFaqFilter("concepts")}
                className={`min-h-[36px] rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  faqFilter === "concepts"
                    ? "bg-[#111214] text-white"
                    : "bg-[#F7F8F9] text-[#5A5E67] hover:text-[#111214]"
                }`}
              >
                Accounting Concepts
              </button>
            </div>
          </div>

          <div className="mt-8 space-y-3 sm:mt-10">
            {visibleFaqs.map((item) => {
              const isOpen = openFaqId === item.id;
              const panelId = `faq-panel-${item.id}`;
              return (
                <div
                  key={item.id}
                  className="rounded-3xl bg-[#F7F8F9] px-5 py-4 transition-colors sm:px-6 sm:py-5"
                >
                  <h3 className="text-sm font-semibold text-[#111214] sm:text-base">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() =>
                        setOpenFaqId((prev) => (prev === item.id ? "" : item.id))
                      }
                      className="flex w-full items-center justify-between gap-4 rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214]"
                    >
                      <span>{item.question}</span>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                          isOpen
                            ? "bg-[#111214] text-[#BDF71D]"
                            : "bg-white text-[#111214]"
                        }`}
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                    </button>
                  </h3>
                  <p
                    id={panelId}
                    hidden={!isOpen}
                    className={`mt-3 pr-2 text-sm leading-relaxed text-[#5A5E67] sm:pr-10 ${
                      isOpen ? "block" : "hidden"
                    }`}
                  >
                    {item.answer}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final Obsidian Rounded Utility CTA Banner */}
      <section className="bg-white pt-6 pb-16 sm:pt-8">
        <div className="mx-auto max-w-[79.2rem] px-4 sm:px-6 lg:px-8">
          <div className="rounded-[28px] bg-[#111214] px-5 py-12 text-center text-white sm:rounded-[32px] sm:px-12 sm:py-20">
            <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl sm:leading-[1.1]">
              Ready to Reconcile Bank Statement Data Without Spreadsheets?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
              Open the reconcilebankstatement workbench to reconcile bank statement PDFs,
              images, CSV, or XLSX files against your business ledger and review
              matches, gaps, duplicates, and balance proofs in one run.
            </p>

            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Link
                href="/reconcile"
                className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-[#BDF71D] px-7 text-xs font-semibold text-[#111214] transition-transform hover:scale-[1.02] hover:bg-[#ccff3d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:text-sm"
              >
                Open Reconciliation Tool
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <a
                href="#how-to-use"
                className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-white/25 px-7 text-xs font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BDF71D] sm:text-sm"
              >
                Read Step-by-Step Guide
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
