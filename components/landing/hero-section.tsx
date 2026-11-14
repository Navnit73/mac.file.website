"use client";

import { useState } from "react";
import {
  ArrowRight,
  Check,
  FileText,
  Folder,
  FolderCheck,
  Image as ImageIcon,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { BRAND, BUILTIN_CATEGORIES, SIMULATION_FOLDERS } from "@/lib/landing-data";

type HeroSectionProps = {
  onOpenTrial: (planId?: string) => void;
};

const BAR_HEIGHTS = [42, 76, 32, 64, 54, 28];
const BAR_LABELS = ["Docs", "Img", "Zip", "PDF", "App", "Xls"];

export function HeroSection({ onOpenTrial }: HeroSectionProps) {
  const [activeFolderId, setActiveFolderId] = useState<
    "desktop" | "downloads" | "projects"
  >("desktop");
  const [applied, setApplied] = useState(false);

  const activeFolder =
    SIMULATION_FOLDERS.find((f) => f.id === activeFolderId) ??
    SIMULATION_FOLDERS[0];

  const handleFolderChange = (id: "desktop" | "downloads" | "projects") => {
    setActiveFolderId(id);
    setApplied(false);
  };

  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-16 sm:pt-14 sm:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Centered Headline Block */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-semibold tracking-[-0.035em] leading-[1.12] text-[#111214] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
            File Organizer for Mac: Sort Your Files Automatically
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#5A5E67] sm:mt-5 sm:text-base">
            A file organizer for Mac should do the tedious sorting for you, so
            your desktop, Downloads folder, and project folders stay tidy
            without constant manual cleanup. Our file organizer for Mac watches
            the folders you choose, sorts new files by type, date, or name, and
            shows you what it plans to change before it moves anything. If you
            have searched for a mac file organizer app or file organizer
            software for Mac, this is the tool built for that job.
          </p>

          <div className="mt-7 flex flex-col items-stretch justify-center gap-3 min-[420px]:flex-row min-[420px]:items-center">
            <button
              type="button"
              onClick={() => onOpenTrial("trial")}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#111214] px-7 text-xs font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214] focus-visible:ring-offset-2 sm:text-sm"
            >
              Get Started — Free Trial
            </button>
            <a
              href="#how-it-works"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-300 bg-white px-7 text-xs font-semibold text-[#111214] transition-colors hover:bg-[#F7F8F9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214] focus-visible:ring-offset-2 sm:text-sm"
            >
              Learn more
            </a>
          </div>
        </div>

        {/* Center App Dashboard Showcase with Floating Cards (Payline Hero Layout) */}
        <div className="relative mx-auto mt-10 max-w-4xl sm:mt-14 xl:pt-4 xl:pb-8">
          {/* Desktop XL Floating Cards (only when viewport has ample side clearance) */}
          <div className="hidden xl:flex absolute -left-6 top-0 z-20 items-center gap-2.5 rounded-2xl bg-white px-4 py-2.5 shadow-[0_18px_40px_rgba(17,18,20,0.12)] border border-slate-100">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#BDF71D] text-[#111214]">
              <Check className="h-3.5 w-3.5 stroke-[2.5]" />
            </span>
            <span className="text-xs font-semibold text-[#111214]">
              +142 files sorted
            </span>
          </div>

          <div className="hidden xl:flex absolute -left-10 top-24 z-20 items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_20px_45px_rgba(17,18,20,0.12)] border border-slate-100">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600">
              <Folder className="h-5 w-5" />
            </span>
            <div>
              <div className="text-xs font-semibold text-[#111214]">
                macOS Finder
              </div>
              <div className="text-[11px] text-[#5A5E67]">
                Live FSEvents watch
              </div>
            </div>
          </div>

          <div className="hidden xl:block absolute -left-8 bottom-2 z-20 w-64 rounded-2xl bg-white p-4 shadow-[0_24px_50px_rgba(17,18,20,0.14)] border border-slate-100">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#BDF71D]/30 text-[#111214]">
                <FileText className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <div className="truncate text-xs font-semibold text-[#111214]">
                  {activeFolder.files[1]?.name}
                </div>
                <div className="truncate font-mono text-[10px] text-[#5A5E67]">
                  {activeFolder.files[1]?.destination}
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#111214]">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#BDF71D]">
                  <ArrowRight className="h-3 w-3" />
                </span>
                {applied ? "Moved safely" : "Preview ready"}
              </span>
              <span className="font-mono text-[10px] font-semibold text-[#5A5E67]">
                ⌘Z Undo
              </span>
            </div>
          </div>

          <div className="hidden xl:flex absolute right-14 -top-2 z-20 h-10 w-10 items-center justify-center rounded-xl bg-[#111214] text-[#BDF71D] shadow-lg">
            <ShieldCheck className="h-5 w-5" />
          </div>

          <div className="hidden xl:block absolute -right-8 top-14 z-20 w-52 rounded-2xl bg-white p-4 shadow-[0_24px_50px_rgba(17,18,20,0.14)] border border-slate-100">
            <div className="text-[11px] font-medium text-[#111214]">
              Files classified by type
            </div>
            <div className="mt-4 flex items-end justify-between gap-2 h-24">
              {BAR_HEIGHTS.map((h, i) => (
                <div
                  key={BAR_LABELS[i]}
                  className="flex flex-1 flex-col items-center gap-1.5"
                >
                  <div className="relative flex h-16 w-full items-end rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="w-full rounded-full bg-[#7C3AED]"
                      style={{ height: `${h}%` }}
                    />
                  </div>
                  <span className="text-[9px] font-medium text-[#5A5E67]">
                    {BAR_LABELS[i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden xl:flex absolute -right-4 bottom-6 z-20 items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3 shadow-[0_20px_45px_rgba(17,18,20,0.12)] border border-slate-100">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#111214] text-[10px] font-bold text-[#BDF71D] ring-2 ring-white">
                  13
                </span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#7C3AED] text-white ring-2 ring-white">
                  <ImageIcon className="h-3 w-3" />
                </span>
              </div>
              <span className="text-xs font-medium text-[#111214]">
                Magic-byte categories
              </span>
            </div>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#BDF71D] text-[#111214]">
              <Sparkles className="h-3 w-3" />
            </span>
          </div>

          {/* Center Tablet / macOS App Window Bezel */}
          <div className="mx-auto max-w-3xl rounded-[22px] border-[6px] border-[#111214] bg-white shadow-[0_30px_80px_rgba(17,18,20,0.14)] overflow-hidden sm:rounded-[28px] sm:border-[10px]">
            <div className="grid grid-cols-1 md:grid-cols-12 bg-[#FAFAFA]">
              {/* Mobile Top Folder Bar (< md) */}
              <div className="border-b border-slate-200/70 bg-white p-3 md:hidden">
                <div className="flex items-center justify-between gap-2 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#111214]" />
                    <span className="text-xs font-semibold text-[#111214]">
                      {BRAND.name}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-[#5A5E67]">
                    {BRAND.minMacOS}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {SIMULATION_FOLDERS.map((folder) => {
                    const isActive = folder.id === activeFolderId;
                    return (
                      <button
                        key={folder.id}
                        type="button"
                        onClick={() => handleFolderChange(folder.id)}
                        className={`flex min-h-[36px] items-center justify-center gap-1.5 rounded-xl px-2 py-1.5 text-xs font-medium transition-colors ${
                          isActive
                            ? "bg-[#BDF71D] text-[#111214] font-semibold"
                            : "bg-[#F7F8F9] text-[#5A5E67] hover:text-[#111214]"
                        }`}
                      >
                        <Folder className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{folder.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Desktop App Left Sidebar (md+) */}
              <div className="hidden md:block md:col-span-3 border-r border-slate-200/70 bg-white p-4">
                <div className="flex items-center gap-2 px-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#111214]" />
                  <span className="text-xs font-semibold text-[#111214]">
                    {BRAND.name}
                  </span>
                </div>

                <div className="mt-5 space-y-1">
                  {SIMULATION_FOLDERS.map((folder) => {
                    const isActive = folder.id === activeFolderId;
                    return (
                      <button
                        key={folder.id}
                        type="button"
                        onClick={() => handleFolderChange(folder.id)}
                        className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-medium transition-colors ${
                          isActive
                            ? "bg-[#BDF71D] text-[#111214] font-semibold"
                            : "text-[#5A5E67] hover:bg-slate-100 hover:text-[#111214]"
                        }`}
                      >
                        <Folder className="h-3.5 w-3.5 shrink-0" />
                        {folder.label}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 rounded-xl bg-[#F7F8F9] p-2.5 text-[10px] text-[#5A5E67]">
                  <div className="font-semibold text-[#111214]">
                    {BRAND.minMacOS}
                  </div>
                  <div className="mt-0.5">Offline SQLite + Rust</div>
                </div>
              </div>

              {/* App Main Dashboard Panel */}
              <div className="col-span-1 md:col-span-9 p-4 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-[#111214] sm:text-base">
                      {activeFolder.path} — Ready to sort
                    </div>
                    <div className="mt-0.5 break-words font-mono text-[11px] text-[#5A5E67]">
                      {activeFolder.ruleSummary}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setApplied((prev) => !prev)}
                    className={`inline-flex min-h-[38px] shrink-0 items-center justify-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                      applied
                        ? "bg-emerald-100 text-emerald-900"
                        : "bg-[#111214] text-white hover:bg-black"
                    }`}
                  >
                    {applied ? (
                      <>
                        <RotateCcw className="h-3.5 w-3.5" />
                        Undo {activeFolder.files.length} Moves
                      </>
                    ) : (
                      <>
                        <FolderCheck className="h-3.5 w-3.5 text-[#BDF71D]" />
                        Apply {activeFolder.files.length} Moves
                      </>
                    )}
                  </button>
                </div>

                {/* 3 KPI Stat Cards */}
                <div className="mt-4 grid grid-cols-1 gap-2.5 min-[420px]:grid-cols-3 sm:mt-5 sm:gap-3">
                  <div className="rounded-2xl bg-white p-3.5 shadow-xs border border-slate-100">
                    <div className="text-[11px] font-medium text-[#5A5E67]">
                      Files tracked
                    </div>
                    <div className="mt-1 text-lg font-semibold text-[#111214] sm:text-xl">
                      12,480
                    </div>
                    <div className="mt-1 text-[10px] font-medium text-emerald-700">
                      +100% local
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white p-3.5 shadow-xs border border-slate-100">
                    <div className="text-[11px] font-medium text-[#5A5E67]">
                      Categories
                    </div>
                    <div className="mt-1 text-lg font-semibold text-[#111214] sm:text-xl">
                      {BUILTIN_CATEGORIES.length}
                    </div>
                    <div className="mt-1 text-[10px] font-medium text-[#7C3AED]">
                      Magic-byte checked
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white p-3.5 shadow-xs border border-slate-100">
                    <div className="text-[11px] font-medium text-[#5A5E67]">
                      Stability checks
                    </div>
                    <div className="mt-1 text-lg font-semibold text-[#111214] sm:text-xl">
                      {applied ? "Sorted" : `${activeFolder.files.length} ready`}
                    </div>
                    <div className="mt-1 text-[10px] font-medium text-[#5A5E67]">
                      Zero partial files
                    </div>
                  </div>
                </div>

                {/* Planned Moves Mini Table */}
                <div className="mt-4 rounded-2xl bg-white p-3.5 shadow-xs border border-slate-100">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-1 text-[11px] font-semibold text-[#111214]">
                    <span>Dry-Run Preview ({activeFolder.label})</span>
                    <span className="text-[10px] font-medium text-[#5A5E67]">
                      {applied ? "Applied • Undo available" : "Review before move"}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {activeFolder.files.slice(0, 3).map((file) => (
                      <div
                        key={file.name}
                        className="flex flex-col gap-0.5 rounded-xl bg-[#F7F8F9] px-3 py-2 text-[11px] sm:flex-row sm:items-center sm:justify-between sm:gap-2"
                      >
                        <span className="truncate font-medium text-[#111214]">
                          {file.name}
                        </span>
                        <span className="truncate font-mono text-[10px] text-[#5A5E67] sm:shrink-0">
                          → {file.destination}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Compact Summary Strip for Mobile / Tablet (< xl) */}
          <div className="mt-4 grid gap-3 sm:grid-cols-3 xl:hidden">
            <div className="flex items-center gap-2.5 rounded-2xl bg-[#F7F8F9] px-4 py-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#BDF71D] text-[#111214]">
                <Check className="h-3.5 w-3.5 stroke-[2.5]" />
              </span>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-[#111214]">
                  +142 files sorted
                </div>
                <div className="text-[11px] text-[#5A5E67]">
                  ⌘Z Undo anytime
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-2xl bg-[#F7F8F9] px-4 py-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#111214] text-[#BDF71D]">
                <ShieldCheck className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-[#111214]">
                  Live FSEvents watch
                </div>
                <div className="text-[11px] text-[#5A5E67]">
                  Stability verified
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-2xl bg-[#F7F8F9] px-4 py-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#7C3AED] text-white">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-[#111214]">
                  13 Magic-byte categories
                </div>
                <div className="text-[11px] text-[#5A5E67]">
                  8,192B header check
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
