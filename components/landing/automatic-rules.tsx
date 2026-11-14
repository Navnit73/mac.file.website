"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Activity,
  FolderOpen,
  Lock,
  Pause,
  Play,
} from "lucide-react";

export function AutomaticRulesSection() {
  const [backgroundRunning, setBackgroundRunning] = useState(true);

  return (
    <section id="automatic-rules" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#111214] sm:text-5xl sm:leading-[1.12]">
            Automatic Rules for Your Mac Files
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#5A5E67] sm:text-base">
            Automation is the main reason to use a file organizer instead of
            sorting by hand. The rules run continuously, so you spend your time
            on the work itself rather than on moving files around.
          </p>
        </div>

        {/* 2-Column Showcase matching Payline Clean Card Aesthetic */}
        <div className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-12 lg:items-stretch">
          <div className="flex flex-col justify-between rounded-[24px] bg-[#F7F8F9] p-5 sm:rounded-[28px] sm:p-8 lg:col-span-6">
            <div className="space-y-4 sm:space-y-5">
              <div className="rounded-3xl bg-white p-5 shadow-[0_14px_35px_rgba(17,18,20,0.05)] sm:p-6">
                <h3 className="text-lg font-semibold text-[#111214]">
                  Rules by File Type, Date, and Name
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5A5E67]">
                  Combine conditions to match your workflow. You might sort
                  invoices by year, move screenshots into a dated folder, and
                  send files named with a client code into that client’s folder.
                  Clear, combined rules are easier to maintain than long lists of
                  exceptions.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 font-mono text-[11px]">
                  <span className="rounded-xl bg-[#111214] px-3 py-1.5 text-[#BDF71D] sm:rounded-full">
                    Type = PDF + Invoice → Invoices/YYYY
                  </span>
                  <span className="rounded-xl bg-[#F7F8F9] px-3 py-1.5 text-[#111214] border border-slate-200 sm:rounded-full">
                    Prefix = ACME-* → Clients/ACME
                  </span>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-5 shadow-[0_14px_35px_rgba(17,18,20,0.05)] sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-[#111214]">
                    Background Operation
                  </h3>
                  <button
                    type="button"
                    onClick={() => setBackgroundRunning((prev) => !prev)}
                    className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214] ${
                      backgroundRunning
                        ? "bg-[#BDF71D] text-[#111214] hover:bg-[#ccff3d]"
                        : "bg-[#111214] text-white hover:bg-black"
                    }`}
                  >
                    {backgroundRunning ? (
                      <>
                        <Pause className="h-3 w-3" />
                        Pause Rules
                      </>
                    ) : (
                      <>
                        <Play className="h-3 w-3 text-[#BDF71D]" />
                        Resume Rules
                      </>
                    )}
                  </button>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#5A5E67]">
                  The organizer works in the background and handles new files as
                  they are saved. You do not need to keep a window open or run a
                  manual scan. You can pause the rules when you want full
                  control, and resume them when you are ready.
                </p>
                <div className="mt-3 flex items-start gap-2 font-mono text-xs text-[#5A5E67] sm:items-center">
                  <Activity
                    className={`mt-0.5 h-3.5 w-3.5 shrink-0 sm:mt-0 ${
                      backgroundRunning ? "text-emerald-600" : "text-amber-600"
                    }`}
                  />
                  <span>
                    {backgroundRunning
                      ? "FSEvents Watcher: Active across 6 watched folders"
                      : "FSEvents Watcher: Paused — manual control active"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between overflow-hidden rounded-[24px] bg-[#111214] p-5 text-white sm:rounded-[28px] sm:p-8 lg:col-span-6">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#BDF71D] px-3 py-1 text-[11px] font-semibold text-[#111214]">
                Native Rule Builder Preview
              </span>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Why Mac Users Choose This File Organizer
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Many people try a file organizer and stop using it because it
                feels out of place on a Mac. This tool is designed to fit the
                way macOS works.
              </p>
            </div>

            <div className="my-5 overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:my-6">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/rules-preview-ui.jpg"
                  alt="macOS file organizer rule builder showing watched folders, PDF conditions, and dry-run preview"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <FolderOpen className="h-4 w-4 shrink-0 text-[#BDF71D]" />
                  <h4>Built for macOS</h4>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-white/75">
                  Follows Finder and macOS conventions so folders look and
                  behave like folders you already know, ready to open in Finder
                  anytime.
                </p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Lock className="h-4 w-4 shrink-0 text-[#BDF71D]" />
                  <h4>Privacy &amp; Local Processing</h4>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-white/75">
                  Offline-first Rust + SQLite processing on your Mac. Zero cloud
                  uploads, plus redacted rolling logs (1–90 day retention).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
