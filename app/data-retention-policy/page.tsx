import Link from "next/link";
import { createPageMetadata, SITE_CONFIG } from "@/lib/site-config";
import { TrustPageShell } from "@/components/trust/trust-page-shell";

export const metadata = createPageMetadata({
  path: "/data-retention-policy",
  title: `Data Retention Policy | ${SITE_CONFIG.brandName} (${SITE_CONFIG.domain})`,
  description:
    "How long browser session identifiers and uploaded bank reconciliation runs remain available, plus how to clear session data or request removal.",
});

export default function DataRetentionPolicyPage() {
  return (
    <TrustPageShell
      path="/data-retention-policy"
      eyebrow="Data Lifecycle"
      title="Data Retention &amp; Deletion Policy"
      lead={`Updated ${SITE_CONFIG.lastReviewedLabel}. Understand exactly what stays in your browser tab versus what is handled on the reconciliation server (${SITE_CONFIG.domain}).`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Data Retention Policy" },
      ]}
      sections={[
        { id: "browser-lifecycle", label: "Browser Session Lifecycle" },
        { id: "server-lifecycle", label: "Server Run & File Retention" },
        { id: "early-deletion", label: "Early Removal & Privacy Requests" },
      ]}
      notice={{
        title: "Upstream Backend TTL Verification Required",
        body: "Because uploaded documents and run summaries are processed by the upstream service configured via OCR_API_BASE_URL (which may return access_expires_at metadata), confirm exact server storage cleanup intervals before finalizing production SLA commitments.",
      }}
      relatedLinks={[
        {
          title: "Privacy Policy",
          description:
            "See all data categories processed during statement reconciliation.",
          href: "/privacy",
        },
        {
          title: "Security Overview",
          description:
            "Technical controls covering no-store proxy headers and PDF passwords.",
          href: "/security",
        },
        {
          title: "Cookie Policy",
          description:
            "Inspect exact `sessionStorage` keys and absence of persistent cookies.",
          href: "/cookie-policy",
        },
      ]}
    >
      <section
        id="browser-lifecycle"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          1. Browser Storage &amp; Passwords
        </h2>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#5A5E67]">
          <li>
            <strong className="text-[#111214]">
              Run IDs in `sessionStorage`:
            </strong>{" "}
            Keys `cleartie:last-reconciliation-id` and optional{" "}
            `rec-token:&lt;id&gt;` remain only while your browser tab is open
            and are removed automatically by your browser when the tab closes.
          </li>
          <li>
            <strong className="text-[#111214]">PDF Unlock Passwords:</strong>{" "}
            Kept only in transient React component memory during upload and
            never persisted in browser storage or web cookies.
          </li>
          <li>
            <strong className="text-[#111214]">API Proxy Caching:</strong>{" "}
            Next.js API proxy routes (`/api/reconciliation/*`) explicitly set{" "}
            `Cache-Control: no-store` to prevent shared edge/CDN retention.
          </li>
        </ul>
      </section>

      <section
        id="server-lifecycle"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          2. Server-Side Reconciliation Runs &amp; Exports
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          When you upload two documents, the upstream reconciliation service
          generates a unique `reconciliation_id` (and may attach an{" "}
          `access_expires_at` timestamp) so you can view the preview route
          (`/reconcile-preview/&lt;id&gt;`), paginate category tables, and
          download `.xlsx` or `.csv` files.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          <strong className="text-[#111214]">
            [Configurable Backend TTL Placeholder]:
          </strong>{" "}
          Update this clause with the exact server purge schedule (for example,
          automated deletion after X hours/days) verified on your{" "}
          `OCR_API_BASE_URL` backend host.
        </p>
      </section>

      <section
        id="early-deletion"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          3. Requesting Removal &amp; Support
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          If you need immediate verification or removal of a specific{" "}
          `reconciliation_id`, contact{" "}
          <a
            href={`mailto:${SITE_CONFIG.contacts.privacyEmail}`}
            className="font-semibold text-[#111214] underline"
          >
            {SITE_CONFIG.contacts.privacyEmail}
          </a>{" "}
          with your `reconciliation_id`. Also review our{" "}
          <Link
            href="/responsible-use"
            className="font-semibold text-[#111214] underline"
          >
            Responsible Use guidelines
          </Link>
          .
        </p>
      </section>
    </TrustPageShell>
  );
}
