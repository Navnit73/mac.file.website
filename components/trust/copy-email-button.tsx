"use client";

import { Check, Copy } from "lucide-react";
import { useCopiedFeedback } from "@/hooks/use-copied-feedback";

export function CopyEmailButton({ email }: { email: string }) {
  const { copied, copyText } = useCopiedFeedback();

  return (
    <button
      type="button"
      aria-live="polite"
      onClick={() => void copyText(email)}
      className="inline-flex min-h-[34px] items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-[#111214] transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214]"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-emerald-700" />
          Copied
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5 text-[#5A5E67]" />
          Copy email
        </>
      )}
    </button>
  );
}
