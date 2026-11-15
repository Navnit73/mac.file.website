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
        title: "Privacy Scope & Processing Architecture",
        body: `Files uploaded on ${SITE_CONFIG.domain} are transmitted over HTTPS through our proxy route directly to the configured reconciliation engine solely to extract rows, compare balances, and generate downloadable reports.`,
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
            The bank statement (<code>bank_statement</code>) and business ledger
            (<code>business_ledger</code>) files you upload (PDF, image, CSV,
            TSV, TXT, XLSX, or XLSM) to generate a reconciliation report.
          </li>
          <li>
            <strong className="text-[#111214]">Reconciliation Options:</strong>{" "}
            Date tolerance setting (0–31 days), description-matching toggle, and
            transient PDF unlock passwords (if provided for encrypted PDFs).
          </li>
          <li>
            <strong className="text-[#111214]">
              Optional API Metadata:
            </strong>{" "}
            Only if entered by you under Advanced API Options: an optional{" "}
            <code>user_email</code> tag, HTTPS <code>webhook_url</code>, and
            optional <code>webhook_secret</code>.
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
          reconcilebankstatement does not ask for your bank portal username, bank login
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
          proxy route (<code>/api/reconciliation/*</code> configured with{" "}
          <code>Cache-Control: no-store</code>). We do not sell uploaded statement records
          or sell financial transaction histories to data brokers or advertisers.
        </p>
      </section>

      <section
        id="browser-storage"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          4. Cookies, UX Diagnostics &amp; Tab-Scoped Session Storage
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          This web application sets no behavioral advertising or retargeting
          pixels. We use Microsoft Clarity for aggregate UI diagnostics (with{" "}
          <code>data-clarity-mask=&quot;true&quot;</code> applied around financial
          reconciliation output views and masked PDF password fields). To let
          you reopen a recent run ID in the same tab, the browser stores{" "}
          <code>cleartie:last-reconciliation-id</code> (and optionally{" "}
          <code>rec-token:&lt;id&gt;</code> if guest token mode is enabled) in browser{" "}
          <code>sessionStorage</code>, which is cleared automatically when the tab closes.
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
          <code>reconciliation_id</code> or optional <code>user_email</code>{" "}
          tag. Contact{" "}
          <a
            href={`mailto:${SITE_CONFIG.contacts.privacyEmail}`}
            className="font-semibold text-[#111214] underline"
          >
            {SITE_CONFIG.contacts.privacyEmail}
          </a>{" "}
          and include your <code>reconciliation_id</code> if applicable.
        </p>
      </section>
    </TrustPageShell>
  );
}
