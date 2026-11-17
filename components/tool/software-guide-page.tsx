import {
  GuideComparisonTable,
  GuideFaqSection,
  QuickAnswerBox,
  ToolInlineCta,
} from "@/components/tool/guide-blocks";
import { buildArticleSchema } from "@/components/trust/structured-data";
import { TrustPageShell } from "@/components/trust/trust-page-shell";
import type { SoftwareGuide } from "@/lib/software-guides";
import { AUTHORS, REVIEWERS } from "@/lib/site-config";

export function softwareGuidePath(guide: SoftwareGuide) {
  return `/tool/${guide.slug}`;
}

export function SoftwareGuidePage({ guide }: { guide: SoftwareGuide }) {
  const path = softwareGuidePath(guide);
  return (
    <TrustPageShell
      path={path}
      eyebrow={guide.eyebrow}
      title={guide.title}
      lead={guide.lead}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Tools & Guides", href: "/tool" },
        { label: guide.badge },
      ]}
      author={AUTHORS.editorialProduct}
      reviewer={REVIEWERS.technicalReview}
      heroCta={{
        label: "Reconcile Your Statement Free",
        href: "/reconcile",
        secondaryLabel: "Jump to the Steps",
        secondaryHref: "#steps",
        note: "PDF OCR, CSV, TSV, TXT & XLSX up to 100 MB • No bank credentials required",
      }}
      sections={[
        { id: "before-you-start", label: guide.prerequisites.title },
        { id: "steps", label: "Step-by-Step Process" },
        { id: "troubleshooting", label: "Fixing Differences" },
        { id: "more", label: guide.extra.heading },
        { id: "faqs", label: "FAQs" },
      ]}
      extraSchemas={[
        buildArticleSchema({
          title: guide.title,
          description: guide.description,
          path,
          author: AUTHORS.editorialProduct,
        }),
      ]}
      relatedLinks={guide.related}
      ctaOverride={{
        title: `Check your ${guide.badge} reconciliation against the bank statement`,
        description:
          "Upload the statement and your ledger export to find unmatched lines, duplicates and sign flips before you close the period.",
        buttonLabel: "Open Reconciliation Tool",
      }}
    >
      <QuickAnswerBox label="Quick Answer" summary={guide.quickAnswer} />

      <section
        id="before-you-start"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          {guide.prerequisites.title}
        </h2>
        <ul className="mt-4 list-disc space-y-2.5 pl-5 text-xs leading-relaxed text-[#474B54] sm:text-sm">
          {guide.prerequisites.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section id="steps" className="space-y-4">
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          {guide.stepsHeading}
        </h2>
        <ol className="space-y-3">
          {guide.steps.map((step, i) => (
            <li
              key={step.title}
              className="flex gap-4 rounded-[24px] border border-slate-200 bg-white p-5 sm:p-6"
            >
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#111214] font-mono text-xs font-bold text-[#BDF71D]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-base font-semibold text-[#111214] sm:text-lg">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#474B54] sm:text-sm">
                  {step.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <p className="text-xs leading-relaxed text-[#5A5E67]">
          {guide.verifyNote}
        </p>
      </section>

      <section
        id="troubleshooting"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          What to Do When It Does Not Reconcile
        </h2>
        <GuideComparisonTable
          headers={guide.troubleshooting.headers}
          rows={guide.troubleshooting.rows}
        />
      </section>

      <ToolInlineCta
        eyebrow="Independent Tie-Out"
        title={guide.fileBased.heading}
        description={guide.fileBased.body}
        buttonLabel="Launch Reconciliation Tool"
        href="/reconcile"
        secondaryLabel="See How Matching Works"
        secondaryHref="/bank-reconciliation-methodology"
        highlights={["Flags duplicates", "Catches sign flips", "Exports XLSX & CSV"]}
      />

      <section
        id="more"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          {guide.extra.heading}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#474B54] sm:text-base">
          {guide.extra.intro}
        </p>
        <ul className="mt-4 space-y-2.5 text-xs leading-relaxed text-[#474B54] sm:text-sm">
          {guide.extra.bullets.map((b) => (
            <li key={b.label}>
              <strong className="text-[#111214]">{b.label}</strong> {b.text}
            </li>
          ))}
        </ul>
      </section>

      <GuideFaqSection items={guide.faqs} />
    </TrustPageShell>
  );
}
