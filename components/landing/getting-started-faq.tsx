"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown, Download } from "lucide-react";
import { BRAND, FAQ_ITEMS, GETTING_STARTED_STEPS } from "@/lib/landing-data";

type GettingStartedFaqProps = {
  onOpenTrial: (planId?: string) => void;
};

export function GettingStartedAndFaqSection({
  onOpenTrial,
}: GettingStartedFaqProps) {
  const [openFaqId, setOpenFaqId] = useState<string>(FAQ_ITEMS[0].id);

  return (
    <>
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#111214] sm:text-5xl sm:leading-[1.12]">
              Getting Started With Your File Organizer
            </h2>
            <p className="mt-4 text-sm text-[#5A5E67] sm:text-base">
              From download to automated sorting in five simple steps.
            </p>
          </div>

          <ol className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {GETTING_STARTED_STEPS.map((item) => (
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
        </div>
      </section>

      <section id="faq" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#111214] sm:text-5xl sm:leading-[1.12]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-10 space-y-3 sm:mt-12">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openFaqId === item.id;
              const panelId = `faq-panel-${item.id}`;
              return (
                <div
                  key={item.id}
                  className="rounded-3xl bg-[#F7F8F9] px-5 py-4 transition-colors sm:px-6 sm:py-5"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() =>
                      setOpenFaqId((prev) => (prev === item.id ? "" : item.id))
                    }
                    className="flex w-full items-center justify-between gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214] rounded-xl"
                  >
                    <h3 className="text-sm font-semibold text-[#111214] sm:text-base">
                      {item.question}
                    </h3>
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
                  {isOpen && (
                    <p
                      id={panelId}
                      className="mt-3 pr-2 text-sm leading-relaxed text-[#5A5E67] sm:pr-10"
                    >
                      {item.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final Obsidian Rounded CTA Banner */}
      <section className="bg-white pb-16 pt-6 sm:pt-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[28px] bg-[#111214] px-5 py-12 text-center text-white sm:rounded-[32px] sm:px-12 sm:py-20">
            <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl sm:leading-[1.1]">
              Start Organizing Your Mac Files Today
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
              Your desktop, Downloads folder, and project files deserve a system
              that keeps up with you. Download the file organizer for Mac, set
              up your first rule, and see how much time you save.
            </p>

            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => onOpenTrial("free")}
                className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-[#BDF71D] px-7 text-xs font-semibold text-[#111214] transition-transform hover:scale-[1.02] hover:bg-[#ccff3d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:text-sm"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Free
              </button>
              <button
                type="button"
                onClick={() => onOpenTrial("trial")}
                className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-[#BDF71D]/60 px-7 text-xs font-semibold text-white transition-colors hover:bg-[#BDF71D]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BDF71D] sm:text-sm"
              >
                Start Your {BRAND.trialDays}-Day Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-100 bg-white py-10 text-[#5A5E67]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#111214] text-[#BDF71D]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                className="h-3.5 w-3.5"
                aria-hidden="true"
              >
                <path d="M4 8c4-2 8 2 16 0" />
                <path d="M4 12c4-2 8 2 16 0" />
                <path d="M4 16c4-2 8 2 16 0" />
              </svg>
            </span>
            <span className="text-sm font-semibold uppercase tracking-wider text-[#111214]">
              {BRAND.name}
            </span>
            <span className="text-xs text-[#5A5E67]">— {BRAND.tagline}</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-medium sm:gap-6">
            <a
              href="#how-it-works"
              className="hover:text-[#111214] transition-colors"
            >
              How It Works
            </a>
            <a href="#organize" className="hover:text-[#111214] transition-colors">
              Why {BRAND.name}
            </a>
            <a href="#features" className="hover:text-[#111214] transition-colors">
              Features
            </a>
            <a href="#pricing" className="hover:text-[#111214] transition-colors">
              Pricing
            </a>
            <a href="#faq" className="hover:text-[#111214] transition-colors">
              Help Center
            </a>
          </div>
          <p className="text-xs text-[#5A5E67]">
            © 2026 {BRAND.name}. Built for macOS.
          </p>
        </div>
      </footer>
    </>
  );
}
