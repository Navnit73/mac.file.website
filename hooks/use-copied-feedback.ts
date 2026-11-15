"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Copies text to the clipboard and manages a bounded temporary "copied" flag
 * with safe cleanup on rapid re-triggers and component unmount.
 */
export function useCopiedFeedback(durationMs = 1800) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const copyText = useCallback(
    async (value: string) => {
      if (!value || typeof document === "undefined") {
        return false;
      }
      try {
        let copiedSuccessfully = false;
        if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
          try {
            await navigator.clipboard.writeText(value);
            copiedSuccessfully = true;
          } catch {
            copiedSuccessfully = false;
          }
        }
        if (!copiedSuccessfully && typeof document.execCommand === "function") {
          const textarea = document.createElement("textarea");
          textarea.value = value;
          textarea.setAttribute("readonly", "");
          textarea.style.position = "fixed";
          textarea.style.top = "-9999px";
          textarea.style.left = "-9999px";
          textarea.style.opacity = "0";
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          try {
            copiedSuccessfully = document.execCommand("copy");
          } finally {
            document.body.removeChild(textarea);
          }
        }
        if (!copiedSuccessfully || !mountedRef.current) return false;
        setCopied(true);
        if (timerRef.current !== null) {
          window.clearTimeout(timerRef.current);
        }
        timerRef.current = window.setTimeout(() => {
          timerRef.current = null;
          if (mountedRef.current) {
            setCopied(false);
          }
        }, durationMs);
        return true;
      } catch {
        return false;
      }
    },
    [durationMs]
  );

  return { copied, copyText };
}
