"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  Download,
  FolderTree,
  Gauge,
  Layers,
  Lock,
  Monitor,
  ShieldCheck,
  Sliders,
} from "lucide-react";
import { BRAND } from "@/lib/landing-data";

type OrganizeSpacesProps = {
  onOpenGuide: (guideId: "desktop" | "downloads") => void;
};

export function OrganizeSpacesSection({ onOpenGuide }: OrganizeSpacesProps) {
  return (
    <section id="organize" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Centered Header matching Reference 3 & 4 */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#111214] sm:text-5xl sm:leading-[1.12]">
            Organize Desktop, Downloads, and Folders
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#5A5E67] sm:text-base">
            A cluttered desktop and a full Downloads folder are the most common
            reasons people look for a mac file organizer app. The organizer
            handles both, along with the project folders you use every day.
          </p>
        </div>

        {/* 3-Column Symmetric Lime Centerpiece Layout (Reference 3 & 4) */}
        <div className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-12 lg:items-stretch">
          {/* Left Stack: 2 Cards (2-col on tablet, stacked on desktop) */}
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-3 lg:flex lg:flex-col">
            <article className="flex flex-1 flex-col items-center justify-center rounded-[24px] bg-[#F7F8F9] p-6 text-center sm:rounded-[28px] sm:p-7">
              <div className="relative">
                <span className="lime-glow-icon flex h-14 w-14 items-center justify-center rounded-full text-[#111214]">
                  <Monitor className="h-6 w-6" />
                </span>
                <span
                  aria-hidden="true"
                  className="absolute -right-2 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[11px] font-bold text-[#111214] shadow-md"
                >
                  ↑
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-[#111214]">
                Desktop Cleanup
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#5A5E67]">
                The Desktop tends to collect screenshots, downloads, and
                half-finished files. Move these into folders as they appear, so
                the Desktop stays for the files you are currently working on.
              </p>
              <button
                type="button"
                onClick={() => onOpenGuide("desktop")}
                className="mt-3.5 inline-flex min-h-[36px] items-center gap-1 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-[#111214] shadow-xs transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214]"
              >
                Desktop guide
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </article>

            <article className="flex flex-1 flex-col items-center justify-center rounded-[24px] bg-[#F7F8F9] p-6 text-center sm:rounded-[28px] sm:p-7">
              <div className="relative">
                <span className="lime-glow-icon flex h-14 w-14 items-center justify-center rounded-full text-[#111214]">
                  <Layers className="h-6 w-6" />
                </span>
                <span
                  aria-hidden="true"
                  className="absolute -right-2 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#111214] shadow-md"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-[#111214]">
                Group Loose Files by Type
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#5A5E67]">
                Set a rule that groups loose files on the Desktop by type.
                Screenshots go to one folder, documents to another, and
                temporary files to a holding area you review each week.
              </p>
            </article>
          </div>

          {/* Centerpiece Vibrant Acid-Lime Showcase Card */}
          <div className="lime-showcase-surface relative flex flex-col justify-between overflow-hidden rounded-[28px] p-5 sm:rounded-[32px] sm:p-8 lg:col-span-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#111214] px-3.5 py-1.5 text-xs font-semibold text-white">
                <span className="h-2 w-2 rounded-full bg-[#BDF71D]" />
                {BRAND.name} for macOS 13+
              </div>
              <span className="rounded-full bg-white/85 px-3 py-1 font-mono text-[11px] font-semibold text-[#111214]">
                Offline-First
              </span>
            </div>

            <div className="my-6 grid gap-4 sm:grid-cols-2 sm:items-end">
              {/* Left Dark Brand Card inside Lime Showcase */}
              <div className="rounded-[24px] bg-[#111214] p-5 text-white shadow-2xl">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#BDF71D] text-[#111214]">
                    <Gauge className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/90">
                    {BRAND.name}
                  </span>
                </div>
                <div className="mt-6 text-xs text-white/65">Watched Roots</div>
                <div className="mt-1 text-2xl font-semibold tracking-tight">
                  6 Folders
                </div>
                <div className="mt-4 space-y-2 border-t border-white/10 pt-3 text-[11px] font-mono text-white/80">
                  <div className="flex justify-between gap-2">
                    <span className="truncate">~/Desktop</span>
                    <span className="shrink-0 text-[#BDF71D]">Healthy</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="truncate">~/Downloads</span>
                    <span className="shrink-0 text-[#BDF71D]">Healthy</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="truncate">~/Documents</span>
                    <span className="shrink-0 text-[#BDF71D]">Healthy</span>
                  </div>
                </div>
              </div>

              {/* Right Light App Card + Workspace Photo inside Lime Showcase */}
              <div className="overflow-hidden rounded-[24px] bg-white shadow-2xl">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/images/desktop-cleanup.jpg"
                    alt="Minimalist Mac display showing organized macOS Finder folders"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="text-[11px] font-medium text-[#5A5E67]">
                    Project Folder Template
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-[#111214]">
                    Drafts / Final Files / Archives
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-white/90 px-4 py-3 text-xs font-medium text-[#111214] backdrop-blur-sm">
              <span className="inline-flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 shrink-0" />
                Your files stay on your Mac
              </span>
              <span className="font-mono text-[11px] text-[#5A5E67]">
                Tauri 2 • Rust • SQLite
              </span>
            </div>
          </div>

          {/* Right Stack: 2 Cards (2-col on tablet, stacked on desktop) */}
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-3 lg:flex lg:flex-col">
            <article className="flex flex-1 flex-col items-center justify-center rounded-[24px] bg-[#F7F8F9] p-6 text-center sm:rounded-[28px] sm:p-7">
              <div className="relative">
                <span className="lime-glow-icon flex h-14 w-14 items-center justify-center rounded-full text-[#111214]">
                  <Download className="h-6 w-6" />
                </span>
                <span
                  aria-hidden="true"
                  className="absolute -right-2 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#111214] shadow-md"
                >
                  <Sliders className="h-3.5 w-3.5" />
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-[#111214]">
                Downloads Sorting
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#5A5E67]">
                Downloads gets full quickly because every browser and app saves
                files there by default. Move new files into folders based on
                type or source so you never scroll through endless lists.
              </p>
              <button
                type="button"
                onClick={() => onOpenGuide("downloads")}
                className="mt-3.5 inline-flex min-h-[36px] items-center gap-1 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-[#111214] shadow-xs transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214]"
              >
                Downloads guide
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </article>

            <article className="flex flex-1 flex-col items-center justify-center rounded-[24px] bg-[#F7F8F9] p-6 text-center sm:rounded-[28px] sm:p-7">
              <div className="relative">
                <span className="lime-glow-icon flex h-14 w-14 items-center justify-center rounded-full text-[#111214]">
                  <FolderTree className="h-6 w-6" />
                </span>
                <span
                  aria-hidden="true"
                  className="absolute -right-2 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#111214] shadow-md"
                >
                  ✓
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-[#111214]">
                Folder Structure for Projects
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#5A5E67]">
                Create a folder template for each project with subfolders for
                drafts, final files, and archives. Sort new files into the right
                subfolder based on file name or type.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
