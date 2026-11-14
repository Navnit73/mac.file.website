"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Cpu,
  Download,
  Lock,
  ShieldCheck,
  X,
} from "lucide-react";
import { BRAND, PRICING_PLANS, QuickGuide } from "@/lib/landing-data";

type TrialModalProps = {
  open: boolean;
  initialPlan: string;
  onClose: () => void;
};

export function TrialModal({ open, initialPlan, onClose }: TrialModalProps) {
  const [chip, setChip] = useState<"apple-silicon" | "intel">("apple-silicon");
  const [selectedPlan, setSelectedPlan] = useState<string>(
    initialPlan === "trial" ? "free" : initialPlan
  );
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSubmitted(false);
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const activePlan =
    PRICING_PLANS.find((p) => p.id === selectedPlan) ?? PRICING_PLANS[1];

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#111214]/60 p-3 backdrop-blur-sm sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="trial-modal-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[24px] bg-white shadow-2xl sm:rounded-[28px]"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4 sm:px-6">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#111214] text-[#BDF71D]">
              <Download className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <h3
                id="trial-modal-title"
                className="truncate text-sm font-semibold text-[#111214] sm:text-base"
              >
                {initialPlan === "trial"
                  ? `Start Your ${BRAND.trialDays}-Day Free Trial`
                  : `Get ${BRAND.name} for Mac`}
              </h3>
              <p className="truncate text-xs text-[#5A5E67]">{BRAND.minMacOS}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#5A5E67] hover:bg-[#F7F8F9] hover:text-[#111214] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5 sm:p-6">
          {submitted ? (
            <div className="space-y-4 py-2 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#BDF71D] text-[#111214]">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-lg font-semibold text-[#111214]">
                  Installer Package Ready (
                  {chip === "apple-silicon" ? "Apple Silicon" : "Intel"})
                </h4>
                <p className="text-sm text-[#5A5E67]">
                  Selected option:{" "}
                  <span className="font-semibold text-[#111214]">
                    {initialPlan === "trial"
                      ? `${BRAND.trialDays}-Day Free Trial`
                      : `${activePlan.name} (${activePlan.price})`}
                  </span>
                </p>
                <p className="mx-auto max-w-sm break-all rounded-full bg-[#F7F8F9] px-4 py-2 font-mono text-xs text-[#111214]">
                  FolderFlow-{BRAND.version}-
                  {chip === "apple-silicon" ? "arm64" : "x64"}.dmg
                </p>
              </div>
              <p className="text-xs text-[#5A5E67]">
                No account is required to begin your trial. Drag {BRAND.name} to
                Applications, pick Desktop or Downloads, and preview your first
                rule before applying changes.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-[#111214] text-xs font-semibold text-white hover:bg-black"
              >
                Done
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#5A5E67]">
                  1. Choose Mac Architecture
                </label>
                <div className="grid grid-cols-1 gap-2.5 min-[380px]:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setChip("apple-silicon")}
                    className={`flex items-center gap-2.5 rounded-2xl border px-3.5 py-3 text-left text-sm transition-all ${
                      chip === "apple-silicon"
                        ? "border-[#111214] bg-[#F7F8F9] text-[#111214] ring-1 ring-[#111214]"
                        : "border-slate-200 bg-white text-[#5A5E67] hover:border-slate-300"
                    }`}
                  >
                    <Cpu className="h-4 w-4 text-[#111214] shrink-0" />
                    <div>
                      <div className="font-semibold text-[#111214]">
                        Apple Silicon
                      </div>
                      <div className="text-[11px] text-[#5A5E67]">
                        M1, M2, M3, M4
                      </div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setChip("intel")}
                    className={`flex items-center gap-2.5 rounded-2xl border px-3.5 py-3 text-left text-sm transition-all ${
                      chip === "intel"
                        ? "border-[#111214] bg-[#F7F8F9] text-[#111214] ring-1 ring-[#111214]"
                        : "border-slate-200 bg-white text-[#5A5E67] hover:border-slate-300"
                    }`}
                  >
                    <Cpu className="h-4 w-4 text-[#5A5E67] shrink-0" />
                    <div>
                      <div className="font-semibold text-[#111214]">
                        Intel Mac
                      </div>
                      <div className="text-[11px] text-[#5A5E67]">x86_64</div>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#5A5E67]">
                  2. Choose Plan or Free Trial
                </label>
                <div className="space-y-2">
                  {PRICING_PLANS.map((plan) => (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`flex w-full items-center justify-between gap-2 rounded-2xl border px-4 py-3 text-left transition-all ${
                        selectedPlan === plan.id
                          ? "border-[#111214] bg-[#F7F8F9] ring-1 ring-[#111214]"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-[#111214]">
                          {plan.name}
                          {plan.featured && (
                            <span className="rounded-full bg-[#BDF71D] px-2 py-0.5 text-[10px] font-semibold text-[#111214]">
                              Popular
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-[#5A5E67]">
                          {plan.includes}
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="text-sm font-bold text-[#111214]">
                          {plan.price}
                        </div>
                        <div className="text-[11px] text-[#5A5E67]">
                          {plan.cadence}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-[#F7F8F9] px-4 py-2.5 text-xs text-[#5A5E67]">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#111214]" />
                  {BRAND.trialDays}-day free trial
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-[#111214]" />
                  Offline Rust + SQLite
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSubmitted(true)}
                className="inline-flex min-h-[46px] w-full items-center justify-center rounded-full bg-[#BDF71D] px-4 text-xs font-semibold text-[#111214] transition-colors hover:bg-[#ccff3d] sm:text-sm"
              >
                <Download className="mr-2 h-4 w-4 shrink-0" />
                <span className="truncate">
                  {selectedPlan === "free" || initialPlan === "trial"
                    ? `Download ${BRAND.name} Free Trial (.dmg)`
                    : `Continue with ${activePlan.name} (${activePlan.price})`}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type GuideModalProps = {
  guide: QuickGuide | null;
  onClose: () => void;
};

export function GuideModal({ guide, onClose }: GuideModalProps) {
  useEffect(() => {
    if (!guide) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [guide, onClose]);

  if (!guide) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#111214]/60 p-3 backdrop-blur-sm sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-modal-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[24px] bg-white p-5 shadow-2xl sm:rounded-[28px] sm:p-6"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="inline-block rounded-full bg-[#BDF71D] px-3 py-0.5 text-[11px] font-semibold text-[#111214]">
              Quick Guide
            </span>
            <h3
              id="guide-modal-title"
              className="mt-2 text-lg font-semibold text-[#111214]"
            >
              {guide.title}
            </h3>
            <p className="mt-1 text-sm text-[#5A5E67]">{guide.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close guide"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#5A5E67] hover:bg-[#F7F8F9] hover:text-[#111214] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 space-y-3">
          {guide.steps.map((step) => (
            <div key={step.title} className="rounded-2xl bg-[#F7F8F9] p-4">
              <div className="text-sm font-semibold text-[#111214]">
                {step.title}
              </div>
              <p className="mt-1 text-sm leading-relaxed text-[#5A5E67]">
                {step.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[40px] items-center justify-center rounded-full bg-[#111214] px-5 text-xs font-semibold text-white hover:bg-black"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
