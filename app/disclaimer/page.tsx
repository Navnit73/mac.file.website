import Link from "next/link";
import { createPageMetadata, SITE_CONFIG } from "@/lib/site-config";
import { TrustPageShell } from "@/components/trust/trust-page-shell";

export const metadata = createPageMetadata({
  path: "/disclaimer",
  title: `Financial & Accounting Disclaimer | ${SITE_CONFIG.brandName}`,
  description:
    "Important financial, tax, and accounting disclaimer for reconcilebankstatement.online: software decision-support boundaries and user verification responsibility.",
});

export default function DisclaimerPage() {
  return (
    <TrustPageShell
      path="/disclaimer"
      eyebrow="Legal Disclaimer"
      title="Financial &amp; Accounting Disclaimer"
      lead="reconcilebankstatement is reconciliation software—not a CPA practice, Chartered Accountant firm, tax advisor, legal counsel, or financial fiduciary. Understand the boundaries of automated statement comparison before relying on exported workpapers."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Financial Disclaimer" },
      ]}
      sections={[
        { id: "not-advice", label: "Not Professional Financial Advice" },
        { id: "ocr-limits", label: "OCR & Matching Limitations" },
        { id: "user-duty", label: "User & Preparer Responsibility" },
      ]}
      relatedLinks={[
        {
          title: "Data Accuracy Policy",
          description:
            "Review how passed, failed, and unverifiable balance checks work.",
          href: "/data-accuracy-policy",
        },
        {
          title: "Terms of Service",
          description:
            "Read legal warranty disclaimers and permitted use conditions.",
          href: "/terms",
        },
        {
          title: "Bank Reconciliation Guide",
          description:
            "Educational accounting concepts behind timing differences and adjustments.",
          href: "/bank-reconciliation-guide",
        },
      ]}
    >
      <section
        id="not-advice"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          1. No Accounting, Tax, Audit, or Legal Advice
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          All automated reports, reconciliation summaries, matched pairs,
          educational articles, and FAQs provided on {SITE_CONFIG.domain} are
          strictly informational and software-assisted workflow tools. Nothing on
          this website constitutes licensed accounting, tax filing, audit
          assurance, or legal advice under US, UK, EU, or any other jurisdiction.
        </p>
      </section>

      <section
        id="ocr-limits"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          2. Limits of Automated Extraction &amp; Matching
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          Scanned documents, skewed tables, low-DPI images, non-standard CSV
          layouts, or wide tolerance windows (0–31 days) can lead to omitted
          OCR lines, false-positive matches across identical recurring amounts,
          or <code>unverifiable</code> balance states. See our{" "}
          <Link
            href="/data-accuracy-policy"
            className="font-semibold text-[#111214] underline"
          >
            Data Accuracy Policy
          </Link>{" "}
          for technical details.
        </p>
      </section>

      <section
        id="user-duty"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          3. Responsibility Before Filing or Posting
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          You remain solely responsible for reviewing reconciled reports against
          original bank statements, approving adjusting journal entries,
          maintaining statutory books, and consulting a qualified CPA, Chartered
          Accountant, or tax advisor where appropriate.
        </p>
      </section>
    </TrustPageShell>
  );
}
