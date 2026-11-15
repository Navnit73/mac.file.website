import Link from "next/link";
import { createPageMetadata, SITE_CONFIG } from "@/lib/site-config";
import { TrustPageShell } from "@/components/trust/trust-page-shell";

export const metadata = createPageMetadata({
  path: "/privacy",
  title: `Privacy Policy | ${SITE_CONFIG.brandName} (${SITE_CONFIG.domain})`,
  description:
    "How reconcilebankstatement.online collects, transmits, processes, and protects uploaded bank statements, business ledgers, optional record tags, and technical request data.",
});

export default function PrivacyPolicyPage() {
  return (
    <TrustPageShell
      path="/privacy"
      eyebrow="Legal & Privacy"
      title="Privacy Policy"
      lead={`Effective ${SITE_CONFIG.lastReviewedLabel}. This Privacy Policy explains truthfully what data is collected when you use ${SITE_CONFIG.domain}, how financial files are transmitted to the reconciliation engine, and how to request deletion.`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Privacy Policy" },
      ]}
      sections={[
        { id: "data-collected", label: "Data You Provide & Technical Data" },
        { id: "not-collected", label: "Data We Never Collect" },
        { id: "how-used", label: "How Information Is Used" },
        { id: "browser-storage", label: "Browser Session Storage & Cookies" },
        { id: "rights-and-contact", label: "Privacy Rights & Contact" },
      ]}
      notice={{
        title: "Verify Upstream Processor & Legal Jurisdiction Before Launch",
        body: `Legal entity identity (${SITE_CONFIG.legalEntityName}) and upstream OCR backend storage sub-processors (` +
          `OCR_API_BASE_URL` +
          `) should be finalized before processing regulated EU, UK, or US customer data.`,
      }}
      relatedLinks={[
        {
          title: "Security Overview",
          description:
            "Inspect proxy cache controls, validation rules, and transient password forwarding.",
          href: "/security",
        },
        {
          title: "Data Retention Policy",
          description:
            "Details on sessionStorage expiration and upstream run lifetime.",
          href: "/data-retention-policy",
        },
        {
          title: "Cookie Policy",
          description:
            "Exact inventory of browser storage keys and absence of ad trackers.",
          href: "/cookie-policy",
        },
      ]}
    >
      <section
        id="data-collected"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          1. Information Processed When You Use the Tool
        </h2>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#5A5E67]">
          <li>
            <strong className="text-[#111214]">
              Uploaded Financial Documents:
            </strong>{" "}
            The bank statement (`bank_statement`) and business ledger
            (`business_ledger`) files you upload (PDF, image, CSV, TSV, TXT,
            XLSX, or XLSM) to generate a reconciliation report.
          </li>
          <li>
            <strong className="text-[#111214]">Reconciliation Options:</strong>{" "}
            Date tolerance setting (`0–31 days`), description-matching toggle,
            and transient PDF unlock passwords (if provided for encrypted PDFs).
          </li>
          <li>
            <strong className="text-[#111214]">
              Optional API Metadata:
            </strong>{" "}
            Only if entered by you under Advanced API Options: an optional{" "}
            `user_email` tag, HTTPS `webhook_url`, and optional `webhook_secret`.
          </li>
          <li>
            <strong className="text-[#111214]">
              Standard Web Request Logs:
            </strong>{" "}
            Infrastructure hosts typically receive standard HTTP metadata (IP
            address, user agent, timestamps, status codes) required for network
            routing and abuse prevention.
          </li>
        </ul>
      </section>

      <section
        id="not-collected"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          2. Information We Do Not Request
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          ClearTie does not ask for your bank portal username, bank login
          password, multi-factor codes, Open Banking credentials, payment card
          details (for the free utility), or third-party advertising cookies.
        </p>
      </section>

      <section
        id="how-used"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          3. Purpose &amp; Service Architecture
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          Uploaded files are forwarded strictly to perform document parsing,
          OCR extraction, transaction comparison, balance verification, and
          report export (JSON preview and XLSX/CSV downloads) via our server
          proxy route (`/api/reconciliation/*` configured with{" "}
          `Cache-Control: no-store`). We do not sell uploaded statement records
          or sell financial transaction histories to data brokers or advertisers.
        </p>
      </section>

      <section
        id="browser-storage"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          4. Cookies &amp; Tab-Scoped Session Storage
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          This web application sets no marketing or behavioral advertising
          cookies. To let you reopen a recent run ID in the same tab, the
          browser stores `cleartie:last-reconciliation-id` (and optionally{" "}
          `rec-token:&lt;id&gt;` if guest token mode is enabled) in browser{" "}
          `sessionStorage`, which is cleared automatically when the tab closes.
          See our{" "}
          <Link href="/cookie-policy" className="font-semibold text-[#111214] underline">
            Cookie Policy
          </Link>{" "}
          and{" "}
          <Link
            href="/data-retention-policy"
            className="font-semibold text-[#111214] underline"
          >
            Data Retention Policy
          </Link>{" "}
          for complete details.
        </p>
      </section>

      <section
        id="rights-and-contact"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          5. Privacy Rights (US, UK &amp; EU) &amp; Contact
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          Depending on your jurisdiction (including GDPR/UK GDPR or applicable
          US state privacy laws), you may request access, correction, or early
          deletion of persisted reconciliation runs associated with your{" "}
          `reconciliation_id` or optional `user_email` tag. Contact{" "}
          <a
            href={`mailto:${SITE_CONFIG.contacts.privacyEmail}`}
            className="font-semibold text-[#111214] underline"
          >
            {SITE_CONFIG.contacts.privacyEmail}
          </a>{" "}
          and include your `reconciliation_id` if applicable.
        </p>
      </section>
    </TrustPageShell>
  );
}
