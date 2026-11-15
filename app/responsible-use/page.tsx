import Link from "next/link";
import { createPageMetadata, SITE_CONFIG } from "@/lib/site-config";
import { TrustPageShell } from "@/components/trust/trust-page-shell";

export const metadata = createPageMetadata({
  path: "/responsible-use",
  title: `Responsible Use of Financial Documents | ${SITE_CONFIG.brandName}`,
  description:
    "Best practices and acceptable use responsibilities when uploading client or business bank statements to reconcilebankstatement.online.",
});

export default function ResponsibleUsePage() {
  return (
    <TrustPageShell
      path="/responsible-use"
      eyebrow="Data Governance"
      title="Responsible Use &amp; Client Data Hygiene"
      lead="Handling bank statements and general ledgers carries professional confidentiality obligations. Follow these responsible usage standards when reconciling company or client files."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Responsible Use" },
      ]}
      sections={[
        { id: "authorization", label: "Authorization & Client Consent" },
        { id: "minimization", label: "Data Minimization Best Practices" },
        { id: "prohibited", label: "Prohibited Uses" },
      ]}
      relatedLinks={[
        {
          title: "Security Overview",
          description:
            "Technical controls covering upload validation, proxy isolation, and HTTPS.",
          href: "/security",
        },
        {
          title: "Data Retention Policy",
          description:
            "Session lifetime and how to clear identifiers after finishing work.",
          href: "/data-retention-policy",
        },
        {
          title: "Privacy Policy",
          description:
            "Full privacy disclosures and rights inquiries contact.",
          href: "/privacy",
        },
      ]}
    >
      <section
        id="authorization"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          1. Lawful Authorization Required
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          Only upload bank statements, credit card exports, or general ledger
          documents belonging to your own business or to clients for whom you
          hold explicit accounting or engagement authorization.
        </p>
      </section>

      <section
        id="minimization"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          2. Practical Document Hygiene
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#5A5E67]">
          <li>
            Download period-specific CSV/XLSX exports directly from banking
            portals when available rather than full multi-year omnibus exports.
          </li>
          <li>
            Use our <strong className="text-[#111214]">Sample CSV Pair</strong>{" "}
            inside the Reconciliation Tool first when testing workflows or
            demonstrating the interface to colleagues instead of real client
            files.
          </li>
          <li>
            Close shared workstation tabs after exporting your{" "}
            <code>.xlsx</code>/<code>.csv</code> workpapers so{" "}
            <code>sessionStorage</code> identifiers clear automatically.
          </li>
          <li>
            When attaching optional completion webhooks, inspect HMAC-SHA256
            signatures on HTTPS endpoints before trusting payload events.
          </li>
        </ul>
      </section>

      <section
        id="prohibited"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          3. Prohibited Activity
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          Do not upload files containing malicious payloads, attempt unauthorized
          access to another user&apos;s <code>reconciliation_id</code>, or submit regulated
          payment card CVVs or restricted personal identity documents unrelated
          to bank statement reconciliation. See also our{" "}
          <Link href="/terms" className="font-semibold text-[#111214] underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/security" className="font-semibold text-[#111214] underline">
            Security Overview
          </Link>
          .
        </p>
      </section>
    </TrustPageShell>
  );
}
