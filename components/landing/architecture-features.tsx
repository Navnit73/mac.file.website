"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Cpu,
  Database,
  FileSearch,
  FolderCog,
  Layers,
  Lock,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import {
  BRAND,
  BUILTIN_CATEGORIES,
  IMPLEMENTED_CAPABILITIES,
} from "@/lib/landing-data";

function CapabilityIcon({ id }: { id: string }) {
  switch (id) {
    case "monitoring":
      return <FolderCog className="h-4 w-4 shrink-0" />;
    case "safety":
      return <ShieldAlert className="h-4 w-4 shrink-0" />;
    case "classifier":
      return <FileSearch className="h-4 w-4 shrink-0" />;
    default:
      return <Lock className="h-4 w-4 shrink-0" />;
  }
}

export function ArchitectureFeaturesSection() {
  const [activeTabId, setActiveTabId] = useState<
    "monitoring" | "safety" | "classifier" | "security"
  >("monitoring");

  const activeCapability =
    IMPLEMENTED_CAPABILITIES.find((item) => item.id === activeTabId) ??
    IMPLEMENTED_CAPABILITIES[0];

  return (
    <section id="features" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#111214] px-3.5 py-1 text-xs font-semibold text-[#BDF71D]">
            <Cpu className="h-3.5 w-3.5 shrink-0" />
            <span>{BRAND.stackSummary}</span>
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#111214] sm:text-5xl sm:leading-[1.12]">
            Offline-First Architecture &amp; Features
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#5A5E67] sm:text-base">
            {BRAND.name} combines a hardened Rust + SQLite filesystem engine
            with live FSEvents monitoring, magic-byte classification, and strict
            macOS TCC safety—built to run 100% locally on your Mac.
          </p>
        </div>

        {/* Implemented Capabilities Explorer */}
        <div className="mt-10 rounded-[24px] bg-[#F7F8F9] p-5 sm:mt-12 sm:rounded-[28px] sm:p-8">
          <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-5 md:flex-row md:items-center md:justify-between">
            <div
              role="tablist"
              aria-label="Implemented FolderFlow Capabilities"
              className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 sm:flex sm:flex-wrap"
            >
              {IMPLEMENTED_CAPABILITIES.map((cap) => {
                const isActive = cap.id === activeTabId;
                return (
                  <button
                    key={cap.id}
                    id={`tab-${cap.id}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${cap.id}`}
                    type="button"
                    onClick={() => setActiveTabId(cap.id)}
                    className={`inline-flex min-h-[40px] items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214] sm:text-sm ${
                      isActive
                        ? "bg-[#111214] text-white shadow-sm"
                        : "bg-white text-[#5A5E67] hover:text-[#111214]"
                    }`}
                  >
                    <CapabilityIcon id={cap.id} />
                    <span className="truncate">{cap.tabLabel}</span>
                  </button>
                );
              })}
            </div>

            <span className="inline-flex self-start items-center gap-1.5 rounded-full bg-[#BDF71D] px-3.5 py-1 text-xs font-semibold text-[#111214] md:self-auto">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
              {activeCapability.badge}
            </span>
          </div>

          <div
            id={`panel-${activeCapability.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeCapability.id}`}
            className="mt-7 grid gap-6 lg:grid-cols-12 lg:gap-8"
          >
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-xl font-semibold tracking-tight text-[#111214] sm:text-2xl">
                {activeCapability.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#5A5E67]">
                {activeCapability.summary}
              </p>

              <div className="inline-flex flex-wrap items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-xs shadow-xs">
                <Database className="h-4 w-4 text-[#111214] shrink-0" />
                <span className="font-semibold text-[#111214]">
                  100% Local SQLite (SQLx)
                </span>
                <span className="text-[#5A5E67]">• Zero cloud dependency</span>
              </div>

              {activeCapability.id === "classifier" && (
                <div className="rounded-2xl bg-white p-4 shadow-xs">
                  <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-[#111214]">
                    <span className="inline-flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 shrink-0" />
                      13 Built-in File Categories
                    </span>
                    <span className="font-mono text-[11px] text-[#5A5E67]">
                      8,192B header check
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {BUILTIN_CATEGORIES.map((category) => (
                      <span
                        key={category}
                        className="rounded-full bg-[#F7F8F9] px-2.5 py-1 text-[11px] font-medium text-[#111214]"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeCapability.codeChips && (
                <div className="rounded-2xl bg-white p-4 shadow-xs">
                  <div className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold text-[#111214]">
                    <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                    Automatically Ignored Patterns
                  </div>
                  <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                    {activeCapability.codeChips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full bg-[#F7F8F9] px-2.5 py-1 text-[#111214]"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {activeCapability.highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(17,18,20,0.04)]"
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#111214]">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#BDF71D] ring-2 ring-[#111214]/15" />
                    <span>{item.label}</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
