import Link from "next/link";
import { createPageMetadata, SITE_CONFIG } from "@/lib/site-config";
import { TrustPageShell } from "@/components/trust/trust-page-shell";

export const metadata = createPageMetadata({
  path: "/terms",
  title: `Terms of Service | ${SITE_CONFIG.brandName} (${SITE_CONFIG.domain})`,
  description:
    "Terms of Service governing access to and use of the reconcilebankstatement bank statement reconciliation utility at reconcilebankstatement.online.",
});

export default function TermsPage() {
  return (
    <TrustPageShell
      path="/terms"
      eyebrow="Legal Terms"
      title="Terms of Service"
      lead={`Effective ${SITE_CONFIG.lastReviewedLabel}. By accessing or uploading documents to ${SITE_CONFIG.domain}, you agree to these Terms of Service.`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Terms of Service" },
      ]}
      sections={[
        { id: "service-scope", label: "Scope of Service" },
        { id: "user-responsibilities", label: "User Authority & Permitted Use" },
        { id: "accuracy-and-warranty", label: "Disclaimers & Output Review" },
        { id: "pricing-terms", label: "Pricing & Availability" },
        { id: "governing-law", label: "Governing Law & Contact" },
      ]}
      notice={{
        title: "Service Scope & Software-Only Disclaimer",
        body: `${SITE_CONFIG.legalEntityName} operates ${SITE_CONFIG.domain} as an automated software utility under ${SITE_CONFIG.governingJurisdiction} rules. Output reports should always be reviewed before formal filing or close sign-off.`,
      }}
      relatedLinks={[
        {
          title: "Financial Disclaimer",
          description:
            "Important notice regarding accounting, tax, and audit responsibility.",
          href: "/disclaimer",
        },
        {
          title: "Refund Policy",
          description:
            "Current free-access terms and future paid plan refund rules.",
          href: "/refund-policy",
        },
        {
          title: "Responsible Use",
          description:
            "Acceptable usage boundaries and limits on sensitive client uploads.",
          href: "/responsible-use",
        },
      ]}
    >
      <section
        id="service-scope"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          1. Description of Service
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          {SITE_CONFIG.productName} provides automated document extraction,
          transaction matching, balance verification checks, and XLSX/CSV
          reporting for user-uploaded bank statements and business ledgers. We
          operate {SITE_CONFIG.domain} as a software utility and do not provide
          banking, bookkeeping, tax filing, legal, or certified audit services.
        </p>
      </section>

      <section
        id="user-responsibilities"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          2. Your Authority &amp; Acceptable Use
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#5A5E67]">
          <li>
            You confirm that you own or hold lawful authorization (such as client
            bookkeeping engagement consent) to upload statements and ledger
            files for reconciliation processing.
          </li>
          <li>
            You agree not to submit malware, attempt automated denial-of-service
            flooding, probe upstream infrastructure boundaries, or upload
            unlawful content.
          </li>
          <li>
            If configuring optional HTTPS webhooks, you remain responsible for
            verifying webhook receiver ownership and safeguarding your{" "}
            <code>webhook_secret</code>.
          </li>
        </ul>
      </section>

      <section
        id="accuracy-and-warranty"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          3. Automated Output &amp; Verification Duty
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          As detailed in our{" "}
          <Link
            href="/data-accuracy-policy"
            className="font-semibold text-[#111214] underline"
          >
            Data Accuracy Policy
          </Link>{" "}
          and{" "}
          <Link
            href="/disclaimer"
            className="font-semibold text-[#111214] underline"
          >
            Financial Disclaimer
          </Link>
          , outputs depend on source file legibility, header structure, and user
          tolerance parameters. The software is provided &quot;as is&quot; and
          &quot;as available.&quot; You agree to review reconciliation summaries
          and source files prior to posting accounting entries or filing taxes.
        </p>
      </section>

      <section
        id="pricing-terms"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          4. Pricing &amp; Service Availability
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          {SITE_CONFIG.billingStatusNote} File limits (currently up to 100 MB
          per file and 200 PDF pages) or API rate controls may be adjusted to
          preserve platform stability. See our{" "}
          <Link
            href="/refund-policy"
            className="font-semibold text-[#111214] underline"
          >
            Refund Policy
          </Link>{" "}
          for complete billing terms.
        </p>
      </section>

      <section
        id="governing-law"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          5. Governing Law &amp; Legal Contact
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          Operator: {SITE_CONFIG.legalEntityName} | Jurisdiction:{" "}
          {SITE_CONFIG.governingJurisdiction}. Questions regarding these Terms
          may be sent to{" "}
          <a
            href={`mailto:${SITE_CONFIG.contacts.supportEmail}`}
            className="font-semibold text-[#111214] underline"
          >
            {SITE_CONFIG.contacts.supportEmail}
          </a>
          .
        </p>
      </section>
    </TrustPageShell>
  );
}
