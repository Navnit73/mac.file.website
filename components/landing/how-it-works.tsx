"use client";

import { useState } from "react";
import {
  Calendar,
  ChevronsRight,
  Eye,
  FileType2,
  FolderCheck,
  FolderPlus,
  MoreVertical,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

export function HowItWorksSection() {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <section id="how-it-works" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Centered Header matching Reference 1 */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#111214] sm:text-5xl sm:leading-[1.12]">
            How the File Organizer for Mac Works
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#5A5E67] sm:text-base">
            Setting up the file organizer for Mac takes a few minutes. You choose
            the folders to manage, define how files should be grouped, and let
            the app handle new files as they arrive. Because the rules run in
            the background, your folders stay organized even on days when you
            have no time to clean up.
          </p>
        </div>

        {/* 2-Column Signature Bento Cards (Reference 1 Layout) */}
        <div className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-2">
          {/* Left Card: Floating Preview & Undo Action Card */}
          <div className="flex flex-col items-center justify-between rounded-[24px] bg-[#F7F8F9] p-5 text-center sm:rounded-[28px] sm:p-10">
            <div className="w-full max-w-sm py-2 sm:py-4">
              <div className="rounded-3xl bg-white p-5 text-left shadow-[0_24px_55px_rgba(17,18,20,0.08)] sm:p-6">
                <div className="flex items-center gap-2 text-xs text-[#5A5E67]">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#BDF71D] text-[#111214]">
                    <FolderPlus className="h-3 w-3" />
                  </span>
                  <span className="truncate">
                    From <strong className="text-[#111214]">~/Desktop</strong>
                  </span>
                </div>
                <div className="mt-1.5 text-xl font-semibold tracking-tight text-[#111214] sm:text-2xl">
                  14 files queued
                </div>

                <div className="my-3 flex items-center gap-2 font-mono text-[11px] text-[#5A5E67]">
                  <span>⇄</span>
                  <span className="truncate">*.pdf → Invoices/2026</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#5A5E67]">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#111214] text-[#BDF71D]">
                    <FolderCheck className="h-3 w-3" />
                  </span>
                  <span className="truncate">
                    To{" "}
                    <strong className="text-[#111214]">
                      ~/Documents/Invoices
                    </strong>
                  </span>
                </div>
                <div className="mt-1.5 text-xl font-semibold tracking-tight text-[#111214] sm:text-2xl">
                  {confirmed ? "14 moved safely" : "0 moved yet"}
                </div>

                <button
                  type="button"
                  onClick={() => setConfirmed((prev) => !prev)}
                  className="mt-5 flex min-h-[44px] w-full items-center gap-2.5 rounded-full bg-[#F7F8F9] p-1.5 pr-4 text-xs font-medium text-[#5A5E67] transition-colors hover:bg-slate-200/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214]"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                      confirmed
                        ? "bg-[#BDF71D] text-[#111214]"
                        : "bg-[#111214] text-white"
                    }`}
                  >
                    {confirmed ? (
                      <RotateCcw className="h-4 w-4" />
                    ) : (
                      <ChevronsRight className="h-4 w-4" />
                    )}
                  </span>
                  <span className="flex-1 text-center font-medium text-[#111214]">
                    {confirmed
                      ? "Applied — Click to Undo"
                      : "Click to confirm & apply"}
                  </span>
                </button>
              </div>
            </div>

            <div className="mt-5 max-w-md sm:mt-4">
              <h3 className="text-xl font-semibold tracking-tight text-[#111214] sm:text-2xl">
                Review Changes Before They Apply
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#5A5E67]">
                Nobody wants a tool that moves important files without warning.
                Before any rule runs for the first time, you can preview the
                planned moves. Review the list, adjust anything that looks
                wrong, and then apply the changes. If a rule moves something you
                did not expect, you can undo it.
              </p>
            </div>
          </div>

          {/* Right Card: Dashboard Skeleton + 3-Node Lime Pipeline Bar */}
          <div className="flex flex-col items-center justify-between rounded-[24px] bg-[#F7F8F9] p-5 text-center sm:rounded-[28px] sm:p-10">
            <div className="relative w-full max-w-sm py-2 sm:py-4">
              {/* Background Dashboard Skeleton Card */}
              <div className="mx-auto w-[90%] rounded-3xl bg-white p-5 text-left shadow-[0_18px_45px_rgba(17,18,20,0.06)] sm:w-[85%]">
                <div className="flex items-center justify-between text-xs font-semibold text-[#111214]">
                  <span>Watched Folders</span>
                  <MoreVertical className="h-4 w-4 text-slate-400" />
                </div>
                <div className="mt-6 space-y-3">
                  <div className="h-3 w-3/4 rounded-full bg-slate-100" />
                  <div className="h-3 w-1/2 rounded-full bg-slate-100" />
                  <div className="h-3 w-5/6 rounded-full bg-slate-100" />
                  <div className="h-3 w-2/3 rounded-full bg-slate-100" />
                </div>
              </div>

              {/* Floating Horizontal Lime-Node Pipeline Pill */}
              <div className="relative -mt-16 mx-auto flex items-center justify-between rounded-full bg-white px-4 py-2.5 shadow-[0_22px_50px_rgba(17,18,20,0.12)] sm:-mt-20 sm:px-5 sm:py-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#111214] text-[#BDF71D] sm:h-11 sm:w-11">
                  <FolderPlus className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="mx-1.5 h-[2px] flex-1 bg-[#BDF71D] sm:mx-2" />
                <div className="lime-glow-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#111214] sm:h-11 sm:w-11">
                  <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="mx-1.5 h-[2px] flex-1 bg-[#BDF71D] sm:mx-2" />
                <div className="lime-glow-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#111214] sm:h-11 sm:w-11">
                  <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-1.5 text-[11px] font-medium text-[#5A5E67] sm:mt-10 sm:gap-2">
                <span className="rounded-full bg-white px-3 py-1 shadow-xs">
                  1. Watch
                </span>
                <span className="rounded-full bg-white px-3 py-1 shadow-xs">
                  2. Classify
                </span>
                <span className="rounded-full bg-white px-3 py-1 shadow-xs">
                  3. Sort Safely
                </span>
              </div>
            </div>

            <div className="mt-5 max-w-md sm:mt-4">
              <h3 className="text-xl font-semibold tracking-tight text-[#111214] sm:text-2xl">
                Set Up Your Watched Folders
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#5A5E67]">
                Start by choosing the locations you want to manage. Most people
                begin with the Desktop and Downloads, then add project or work
                folders once they see how the rules behave. You can add or
                remove folders at any time, and you can exclude subfolders you
                prefer to manage by hand.
              </p>
            </div>
          </div>
        </div>

        {/* Clean 3-Card Rule Details Row */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="rounded-[24px] bg-[#F7F8F9] p-6 sm:p-7">
            <span className="lime-glow-icon inline-flex h-10 w-10 items-center justify-center rounded-full text-[#111214]">
              <FolderCheck className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-[#111214]">
              Choose Your Sorting Rules
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#5A5E67]">
              Rules tell the organizer what to do with each file. Each rule has
              a condition, such as a file type or a date, and an action, such as
              moving the file to a folder. You can start with the built-in
              templates and adjust them as your needs change.
            </p>
          </div>

          <div className="rounded-[24px] bg-[#F7F8F9] p-6 sm:p-7">
            <span className="lime-glow-icon inline-flex h-10 w-10 items-center justify-center rounded-full text-[#111214]">
              <FileType2 className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-[#111214]">
              Rules by File Type
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#5A5E67]">
              Group documents, images, spreadsheets, installers, and media into
              folders that match how you work. A rule for PDFs, for example, can
              send invoices and scans to a dedicated folder while leaving images
              in place.
            </p>
          </div>

          <div className="rounded-[24px] bg-[#F7F8F9] p-6 sm:p-7">
            <span className="lime-glow-icon inline-flex h-10 w-10 items-center justify-center rounded-full text-[#111214]">
              <Calendar className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-[#111214]">
              Rules by Date and Name
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#5A5E67]">
              Sort files into year and month folders, or move files whose names
              match a pattern, such as a client code or project prefix.
              Date-based rules are useful for receipts, screenshots, and
              archives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
