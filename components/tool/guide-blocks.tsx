import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function QuickAnswerBox({
  label = "Quick Summary",
  summary,
  points,
}: {
  label?: string;
  summary: string;
  points?: string[];
}) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-[#F8FAFC] p-6 sm:p-7">
      <div className="inline-flex items-center gap-2 rounded-full bg-[#111214] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#BDF71D]">
        {label}
      </div>
      <p className="mt-3 text-sm font-medium leading-relaxed text-[#111214] sm:text-base">
        {summary}
      </p>
      {points && points.length > 0 && (
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-2 text-xs leading-relaxed text-[#474B54] sm:text-sm"
            >
              <CheckCircle2
                className="mt-0.5 h-4 w-4 shrink-0 text-emerald-800"
                aria-hidden="true"
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ToolInlineCta({
  eyebrow = "Free Browser Tool",
  title,
  description,
  buttonLabel = "Reconcile Now",
  href = "/reconcile",
  secondaryLabel,
  secondaryHref,
  highlights,
  headingLevel = "h2",
}: {
  eyebrow?: string;
  title: string;
  description: string;
  buttonLabel?: string;
  href?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  highlights?: string[];
  headingLevel?: "h2" | "h3";
}) {
  const HeadingTag = headingLevel;

  return (
    <aside className="rounded-[24px] bg-[#111214] p-6 text-white sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#BDF71D]">
            {eyebrow}
          </span>
          <HeadingTag className="mt-3 text-xl font-semibold tracking-tight text-white sm:text-2xl">
            {title}
          </HeadingTag>
          <p className="mt-2 text-xs leading-relaxed text-white/80 sm:text-sm">
            {description}
          </p>
          {highlights && highlights.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {highlights.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[11px] text-white/90"
                >
                  {chip}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row lg:flex-col">
          <Link
            href={href}
            className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-[#BDF71D] px-6 text-xs font-semibold text-[#111214] transition-colors hover:bg-[#cffb4e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:text-sm"
          >
            {buttonLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/25 px-5 text-xs font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BDF71D]"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}

export type ScheduleRow = {
  label: string;
  amount: string;
  tone?: "neutral" | "add" | "deduct" | "total";
};

export function WorkedScheduleSide({
  title,
  rows,
}: {
  title: string;
  rows: ScheduleRow[];
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5">
      <h3 className="text-sm font-semibold text-[#111214] sm:text-base">
        {title}
      </h3>
      <ul className="mt-3 space-y-2 font-mono text-xs sm:text-[13px]">
        {rows.map((row) => {
          const isTotal = row.tone === "total";
          const amountClass =
            row.tone === "add"
              ? "text-emerald-800 font-semibold"
              : row.tone === "deduct"
                ? "text-rose-800 font-semibold"
                : isTotal
                  ? "text-[#111214] font-bold"
                  : "text-[#111214] font-semibold";

          return (
            <li
              key={row.label}
              className={`flex items-baseline justify-between gap-4 ${
                isTotal
                  ? "border-t border-slate-300 pt-2.5 text-[#111214]"
                  : "text-[#474B54]"
              }`}
            >
              <span className={isTotal ? "font-semibold" : ""}>{row.label}</span>
              <span className={`shrink-0 ${amountClass}`}>{row.amount}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export type JournalEntryLine = {
  account: string;
  note?: string;
  debit?: string;
  credit?: string;
};

export function JournalEntryTable({
  caption,
  date = "Period End",
  narration,
  lines,
}: {
  caption: string;
  date?: string;
  narration: string;
  lines: JournalEntryLine[];
}) {
  return (
    <div
      role="region"
      aria-label={caption}
      tabIndex={0}
      className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214]"
    >
      <table className="w-full min-w-[460px] border-collapse text-left text-xs sm:text-sm">
        <caption className="border-b border-slate-200 bg-[#F8FAFC] px-4 py-2.5 text-left font-semibold text-[#111214]">
          {caption}
        </caption>
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/70 font-mono text-[11px] uppercase tracking-wider text-[#474B54]">
            <th scope="col" className="px-4 py-2.5">
              Date
            </th>
            <th scope="col" className="px-4 py-2.5">
              Account &amp; Explanation
            </th>
            <th scope="col" className="px-4 py-2.5 text-right">
              Debit
            </th>
            <th scope="col" className="px-4 py-2.5 text-right">
              Credit
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {lines.map((line, index) => (
            <tr key={`${line.account}-${index}`}>
              <td className="px-4 py-2.5 font-mono text-xs text-[#474B54] whitespace-nowrap">
                {index === 0 ? date : ""}
              </td>
              <td className="px-4 py-2.5 text-[#111214]">
                <div className={line.credit ? "pl-5 font-medium" : "font-medium"}>
                  {line.account}
                </div>
                {line.note && (
                  <div
                    className={`mt-0.5 text-xs text-[#474B54] ${
                      line.credit ? "pl-5" : ""
                    }`}
                  >
                    {line.note}
                  </div>
                )}
              </td>
              <td className="px-4 py-2.5 text-right font-mono font-semibold text-[#111214] whitespace-nowrap">
                {line.debit ?? "—"}
              </td>
              <td className="px-4 py-2.5 text-right font-mono font-semibold text-[#111214] whitespace-nowrap">
                {line.credit ?? "—"}
              </td>
            </tr>
          ))}
          <tr className="bg-[#F8FAFC]">
            <td className="px-4 py-2" />
            <td colSpan={3} className="px-4 py-2 text-xs italic text-[#474B54]">
              Memo: {narration}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function GuideComparisonTable({
  headers,
  rows,
  minWidthClass = "min-w-[560px]",
  ariaLabel,
}: {
  headers: string[];
  rows: string[][];
  minWidthClass?: string;
  ariaLabel?: string;
}) {
  return (
    <div
      role="region"
      aria-label={ariaLabel ?? headers.join(" vs. ")}
      tabIndex={0}
      className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214]"
    >
      <table
        className={`w-full ${minWidthClass} border-collapse text-left text-xs sm:text-sm`}
      >
        <thead>
          <tr className="border-b border-slate-200 bg-[#F8FAFC] text-xs font-semibold text-[#111214]">
            {headers.map((header) => (
              <th key={header} scope="col" className="px-4 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {rows.map((cells, rowIndex) => (
            <tr key={`${cells[0]}-${rowIndex}`}>
              {cells.map((cell, cellIndex) => (
                <td
                  key={`${rowIndex}-${cellIndex}`}
                  className={`px-4 py-3 align-top leading-relaxed ${
                    cellIndex === 0
                      ? "font-semibold text-[#111214]"
                      : "text-[#474B54]"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function GuideFaqSection({
  id = "faqs",
  title = "Frequently Asked Questions",
  items,
}: {
  id?: string;
  title?: string;
  items: { question: string; answer: string }[];
}) {
  return (
    <section
      id={id}
      className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
    >
      <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
        {title}
      </h2>
      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <article
            key={item.question}
            className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-5"
          >
            <h3 className="text-sm font-semibold text-[#111214] sm:text-base">
              {item.question}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-[#474B54] sm:text-sm">
              {item.answer}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
