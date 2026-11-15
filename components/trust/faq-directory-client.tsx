"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export type FaqDirectoryEntry = {
  id: string;
  category: "tool" | "concepts" | "policies";
  question: string;
  answer: string;
  linkLabel?: string;
  linkHref?: string;
};

export function FaqDirectoryClient({ items }: { items: FaqDirectoryEntry[] }) {
  const [filter, setFilter] = useState<"all" | "tool" | "concepts" | "policies">(
    "all"
  );
  const [openId, setOpenId] = useState<string>(items[0]?.id ?? "");

  const visible =
    filter === "all" ? items : items.filter((item) => item.category === filter);

  return (
    <div className="space-y-5">
      <div
        role="group"
        aria-label="Filter FAQ categories"
        className="flex flex-wrap gap-2"
      >
        {(
          [
            { id: "all", label: `All Questions (${items.length})` },
            { id: "tool", label: "Using the Software" },
            { id: "concepts", label: "Accounting Concepts" },
            { id: "policies", label: "Security, Privacy & Billing" },
          ] as const
        ).map((tab) => {
          const active = filter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setFilter(tab.id);
                const next =
                  tab.id === "all"
                    ? items[0]
                    : items.find((item) => item.category === tab.id);
                if (next) setOpenId(next.id);
              }}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                active
                  ? "bg-[#111214] text-[#BDF71D]"
                  : "border border-slate-200 bg-white text-[#5A5E67] hover:text-[#111214]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {visible.map((item) => {
          const isOpen = openId === item.id;
          return (
            <article
              key={item.id}
              className={`rounded-2xl border transition-colors ${
                isOpen
                  ? "border-[#111214]/25 bg-white shadow-xs"
                  : "border-slate-200 bg-[#F8FAFC] hover:bg-white"
              }`}
            >
              <h3 className="m-0">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-directory-panel-${item.id}`}
                  onClick={() => setOpenId(isOpen ? "" : item.id)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-[#111214] sm:text-base"
                >
                  <span>{item.question}</span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-transform ${
                      isOpen
                        ? "rotate-180 border-[#111214] bg-[#111214] text-[#BDF71D]"
                        : "border-slate-200 bg-white text-[#5A5E67]"
                    }`}
                  >
                    <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </button>
              </h3>

              {isOpen && (
                <div
                  id={`faq-directory-panel-${item.id}`}
                  className="border-t border-slate-100 px-5 pt-3 pb-4 text-xs leading-relaxed text-[#5A5E67] sm:text-sm"
                >
                  <p>{item.answer}</p>
                  {item.linkHref && item.linkLabel && (
                    <p className="mt-2.5">
                      <Link
                        href={item.linkHref}
                        className="font-semibold text-[#111214] underline decoration-slate-300 underline-offset-4 hover:decoration-[#111214]"
                      >
                        {item.linkLabel} →
                      </Link>
                    </p>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
