"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import type { QuickGuide } from "@/lib/landing-data";

type GuideModalProps = {
  guide: QuickGuide | null;
  onClose: () => void;
};

export function GuideModal({ guide, onClose }: GuideModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!guide) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
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
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[24px] bg-white p-5 shadow-2xl sm:rounded-[28px] sm:p-6"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="inline-block rounded-full bg-[#BDF71D] px-3 py-0.5 text-[11px] font-semibold text-[#111214]">
              Quick Guide
            </span>
            <h2
              id="guide-modal-title"
              className="mt-2 text-lg font-semibold text-[#111214]"
            >
              {guide.title}
            </h2>
            <p className="mt-1 text-sm text-[#5A5E67]">{guide.subtitle}</p>
          </div>
          <button
            ref={closeButtonRef}
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

        <div className="mt-6 flex justify-end gap-2">
          <Link
            href="/reconcile"
            onClick={onClose}
            className="inline-flex min-h-[40px] items-center justify-center rounded-full bg-[#BDF71D] px-5 text-xs font-semibold text-[#111214] hover:bg-[#ccff3d]"
          >
            Open Tool
          </Link>
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
