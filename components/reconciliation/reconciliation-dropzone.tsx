"use client";

import { useId, useRef, useState } from "react";
import {
  CheckCircle2,
  FileSpreadsheet,
  FileText,
  KeyRound,
  Upload,
  X,
} from "lucide-react";
import {
  formatFileSize,
  validateReconciliationFile,
} from "@/lib/reconciliation/client";
import { RECONCILIATION_ACCEPT_ATTR } from "@/lib/reconciliation/types";

export type ReconciliationDropzoneVariant = "bank" | "ledger";

export type ReconciliationDropzoneProps = {
  id?: string;
  label: string;
  badge: string;
  helperText: string;
  variant?: ReconciliationDropzoneVariant;
  file: File | null;
  onFileChange: (file: File | null) => void;
  password?: string;
  onPasswordChange?: (value: string) => void;
  passwordError?: string | null;
  disabled?: boolean;
  accept?: string;
};

const VARIANT_STYLES: Record<
  ReconciliationDropzoneVariant,
  {
    surface: string;
    badge: string;
    uploadIcon: string;
    idleDropzone: string;
    draggingDropzone: string;
  }
> = {
  bank: {
    surface: "bg-[#E6E9EE]",
    badge: "bg-[#111214] text-[#BDF71D]",
    uploadIcon: "bg-[#111214] text-[#BDF71D]",
    idleDropzone: "bg-white hover:bg-[#F5F7FA]",
    draggingDropzone: "bg-[#FFF5E5] ring-2 ring-[#FF8F00]",
  },
  ledger: {
    surface: "bg-[#DFE8E6]",
    badge: "bg-[#0F2A30] text-[#5EEAD4]",
    uploadIcon: "bg-[#0F2A30] text-[#5EEAD4]",
    idleDropzone: "bg-white hover:bg-[#F2FAF8]",
    draggingDropzone: "bg-[#E6F7F4] ring-2 ring-[#0F766E]",
  },
};

export function ReconciliationDropzone({
  id,
  label,
  badge,
  helperText,
  variant = "bank",
  file,
  onFileChange,
  password = "",
  onPasswordChange,
  passwordError = null,
  disabled = false,
  accept = RECONCILIATION_ACCEPT_ATTR,
}: ReconciliationDropzoneProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [showPasswordField, setShowPasswordField] = useState(false);

  const palette = VARIANT_STYLES[variant];
  const isPdfSelected =
    file !== null && file.name.toLowerCase().endsWith(".pdf");
  const passwordVisible =
    Boolean(passwordError) || showPasswordField || isPdfSelected;

  const handleSelectedFile = (candidate: File | null) => {
    if (!candidate) return;
    const validationError = validateReconciliationFile(candidate);
    if (validationError) {
      setLocalError(validationError);
      return;
    }
    setLocalError(null);
    onFileChange(candidate);
  };

  const handleClear = () => {
    setLocalError(null);
    setShowPasswordField(false);
    onFileChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div
      className={`flex flex-col rounded-2xl p-4 transition-colors sm:p-5 ${
        file ? "bg-emerald-100/70" : palette.surface
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label
          htmlFor={inputId}
          className="flex items-center gap-2 text-sm font-semibold text-[#111214]"
        >
          <span>{label}</span>
          {file && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-200/80 px-2 py-0.5 text-[10px] font-semibold text-emerald-950">
              <CheckCircle2 className="h-3 w-3" />
              Ready
            </span>
          )}
        </label>
        <span
          className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${palette.badge}`}
        >
          {badge}
        </span>
      </div>

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        disabled={disabled}
        className="sr-only"
        onChange={(e) => {
          const picked = e.target.files?.[0] ?? null;
          e.currentTarget.value = "";
          handleSelectedFile(picked);
        }}
      />

      {file ? (
        <div className="mt-3 flex min-h-[144px] flex-col justify-center rounded-xl bg-white px-4 py-4 sm:min-h-[160px]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-800 text-white">
                {isPdfSelected ? (
                  <FileText className="h-5 w-5" />
                ) : (
                  <FileSpreadsheet className="h-5 w-5" />
                )}
              </span>
              <div className="min-w-0">
                <div className="truncate text-xs font-semibold text-[#111214] sm:text-sm">
                  {file.name}
                </div>
                <div className="mt-0.5 font-mono text-[11px] font-medium text-emerald-800">
                  {formatFileSize(file.size)} • Verified format
                </div>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 self-end sm:self-center">
              <button
                type="button"
                disabled={disabled}
                onClick={() => inputRef.current?.click()}
                className="inline-flex min-h-[34px] items-center rounded-full bg-[#E6E9EE] px-3.5 py-1 text-xs font-semibold text-[#111214] transition-colors hover:bg-[#D7DCE4] disabled:opacity-50"
              >
                Replace
              </button>
              <button
                type="button"
                disabled={disabled}
                onClick={handleClear}
                aria-label={`Remove ${label} file`}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E6E9EE] text-[#474B54] transition-colors hover:bg-red-100 hover:text-red-700 disabled:opacity-50"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            if (!disabled) setIsDragging(true);
          }}
          onDragLeave={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
              setIsDragging(false);
            }
          }}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (disabled) return;
            const dropped = e.dataTransfer.files?.[0] ?? null;
            handleSelectedFile(dropped);
          }}
          className={`mt-3 flex min-h-[144px] w-full flex-col items-center justify-center rounded-xl px-4 py-6 text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214] disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-[160px] ${
            isDragging ? palette.draggingDropzone : palette.idleDropzone
          }`}
        >
          <span
            className={`flex h-11 w-11 items-center justify-center rounded-full ${palette.uploadIcon}`}
          >
            <Upload className="h-4 w-4" />
          </span>
          <span className="mt-3 text-xs font-semibold text-[#111214] sm:text-sm">
            Drop file here or <span className="underline">browse</span>
          </span>
          <span className="mt-1 max-w-xs text-[11px] leading-relaxed text-[#474B54]">
            {helperText}
          </span>
        </button>
      )}

      {localError && (
        <p
          role="alert"
          className="mt-2.5 rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-700"
        >
          {localError}
        </p>
      )}

      {onPasswordChange && (
        <div className="mt-3">
          {!passwordVisible ? (
            <button
              type="button"
              disabled={disabled}
              onClick={() => setShowPasswordField(true)}
              className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-[11px] font-medium text-[#474B54] transition-colors hover:bg-[#D7DCE4] hover:text-[#111214]"
            >
              <KeyRound className="h-3 w-3" />
              Password-protected PDF?
            </button>
          ) : (
            <div
              className={`rounded-xl p-3 ${
                passwordError ? "bg-red-50" : "bg-white"
              }`}
            >
              <label
                htmlFor={`${inputId}-password`}
                className="flex items-center gap-1.5 text-[11px] font-semibold text-[#111214]"
              >
                <KeyRound className="h-3 w-3" />
                PDF Unlock Password{" "}
                <span className="font-normal text-[#474B54]">
                  (optional unless encrypted)
                </span>
              </label>
              <input
                id={`${inputId}-password`}
                type="password"
                maxLength={256}
                disabled={disabled}
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                placeholder="Enter PDF password (never saved)"
                autoComplete="off"
                className="mt-1.5 w-full rounded-lg bg-[#E6E9EE] px-3 py-2 text-xs text-[#111214] placeholder:text-[#5A5E67] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#111214]"
              />
              {passwordError && (
                <p
                  role="alert"
                  className="mt-1.5 text-[11px] font-medium text-red-700"
                >
                  {passwordError}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
