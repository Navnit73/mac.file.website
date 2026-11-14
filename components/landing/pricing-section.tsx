"use client";

import { Check, Download } from "lucide-react";
import { BRAND, PRICING_PLANS } from "@/lib/landing-data";

type PricingSectionProps = {
  onOpenTrial: (planId?: string) => void;
};

export function PricingSection({ onOpenTrial }: PricingSectionProps) {
  return (
    <section id="pricing" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#111214] sm:text-5xl sm:leading-[1.12]">
            Pricing and Download
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#5A5E67] sm:text-base">
            Choose the plan that fits how many folders and rules you need. Start
            free or try Pro for {BRAND.trialDays} days.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {PRICING_PLANS.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between rounded-[24px] p-6 transition-transform sm:rounded-[28px] sm:p-8 ${
                plan.featured
                  ? "bg-[#111214] text-white shadow-2xl shadow-black/15"
                  : "bg-[#F7F8F9] text-[#111214]"
              } ${index === 2 ? "md:col-span-2 lg:col-span-1" : ""}`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  {plan.featured && (
                    <span className="rounded-full bg-[#BDF71D] px-3 py-0.5 text-[11px] font-semibold text-[#111214]">
                      Best Value
                    </span>
                  )}
                </div>

                <div className="mt-5 flex flex-wrap items-baseline gap-2">
                  <span className="text-4xl font-semibold tracking-tight">
                    {plan.price}
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      plan.featured ? "text-white/70" : "text-[#5A5E67]"
                    }`}
                  >
                    {plan.cadence}
                  </span>
                </div>

                <p
                  className={`mt-3 text-sm font-medium ${
                    plan.featured ? "text-white/85" : "text-[#5A5E67]"
                  }`}
                >
                  Best for: {plan.bestFor}
                </p>

                <ul
                  className={`mt-6 space-y-3 border-t pt-6 ${
                    plan.featured ? "border-white/10" : "border-slate-200/80"
                  }`}
                >
                  {plan.features.map((feat) => (
                    <li
                      key={feat}
                      className={`flex items-start gap-2.5 text-sm ${
                        plan.featured ? "text-white/85" : "text-[#5A5E67]"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                          plan.featured
                            ? "bg-[#BDF71D] text-[#111214]"
                            : "bg-[#111214] text-[#BDF71D]"
                        }`}
                      >
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => onOpenTrial(plan.id)}
                className={`mt-8 inline-flex min-h-[44px] w-full items-center justify-center rounded-full text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 sm:text-sm ${
                  plan.featured
                    ? "bg-[#BDF71D] text-[#111214] hover:bg-[#ccff3d] focus-visible:ring-white"
                    : "bg-[#111214] text-white hover:bg-black focus-visible:ring-[#111214]"
                }`}
              >
                {plan.ctaLabel}
              </button>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mt-10 overflow-hidden rounded-[24px] bg-[#F7F8F9] p-2">
          <div className="overflow-x-auto rounded-2xl bg-white">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="border-b border-slate-100 text-xs font-semibold uppercase tracking-wider text-[#5A5E67]">
                <tr>
                  <th className="px-4 py-3.5 sm:px-6 sm:py-4">Plan</th>
                  <th className="px-4 py-3.5 sm:px-6 sm:py-4">Price</th>
                  <th className="px-4 py-3.5 sm:px-6 sm:py-4">Best for</th>
                  <th className="px-4 py-3.5 sm:px-6 sm:py-4">Includes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PRICING_PLANS.map((plan) => (
                  <tr key={plan.id} className="hover:bg-[#F7F8F9]/70">
                    <td className="px-4 py-3.5 font-semibold text-[#111214] sm:px-6 sm:py-4">
                      {plan.name}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[#111214] sm:px-6 sm:py-4">
                      {plan.price}{" "}
                      <span className="font-sans text-xs text-[#5A5E67]">
                        ({plan.cadence})
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-[#5A5E67] sm:px-6 sm:py-4">
                      {plan.bestFor}
                    </td>
                    <td className="px-4 py-3.5 text-[#5A5E67] sm:px-6 sm:py-4">
                      {plan.includes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Free Trial Details Banner */}
        <div
          id="download"
          className="lime-showcase-surface mt-8 flex flex-col items-start justify-between gap-5 rounded-[24px] p-6 sm:flex-row sm:items-center sm:rounded-[28px] sm:p-8"
        >
          <div className="max-w-2xl">
            <h3 className="text-xl font-semibold text-[#111214]">
              Free Trial Details
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#111214]/85">
              Download the file organizer for Mac and start your{" "}
              {BRAND.trialDays}-day free trial. No account is needed to begin.
              You can switch to a paid plan at any time without losing your
              rules.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenTrial("trial")}
            className="inline-flex min-h-[44px] w-full shrink-0 items-center justify-center rounded-full bg-[#111214] px-6 text-xs font-semibold text-white transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214] sm:w-auto sm:text-sm"
          >
            <Download className="mr-2 h-4 w-4 text-[#BDF71D]" />
            Download Free Trial
          </button>
        </div>
      </div>
    </section>
  );
}
