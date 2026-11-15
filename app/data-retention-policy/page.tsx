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
        title: "Temporary Tab State & Run Expiration",
        body: "Browser session identifiers expire automatically when your tab closes. Server-side run availability and export access depend on the upstream processing service retention schedule (surfaced via access_expires_at when provided).",
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
            "Inspect exact sessionStorage keys and absence of persistent cookies.",
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
              Run IDs in <code>sessionStorage</code>:
            </strong>{" "}
            Keys <code>cleartie:last-reconciliation-id</code> and optional{" "}
            <code>rec-token:&lt;id&gt;</code> remain only while your browser tab
            is open and are removed automatically by your browser when the tab
            closes.
          </li>
          <li>
            <strong className="text-[#111214]">PDF Unlock Passwords:</strong>{" "}
            Kept only in transient React component memory during upload and
            never persisted in browser storage or web cookies.
          </li>
          <li>
            <strong className="text-[#111214]">API Proxy Caching:</strong>{" "}
            Next.js API proxy routes (<code>/api/reconciliation/*</code>)
            explicitly set <code>Cache-Control: no-store</code> to prevent
            shared edge/CDN retention.
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
          generates a unique <code>reconciliation_id</code> (and may attach an{" "}
          <code>access_expires_at</code> timestamp) so you can view the preview
          route (<code>/reconcile-preview/&lt;id&gt;</code>), paginate category
          tables, and download <code>.xlsx</code> or <code>.csv</code> files.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          <strong className="text-[#111214]">
            Backend TTL &amp; Cleanup Schedule:
          </strong>{" "}
          Report snapshots remain retrievable via{" "}
          <code>reconciliation_id</code> until their server-side{" "}
          <code>access_expires_at</code> expiration or automated backend purge
          runs complete.
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
          <code>reconciliation_id</code>, contact{" "}
          <a
            href={`mailto:${SITE_CONFIG.contacts.privacyEmail}`}
            className="font-semibold text-[#111214] underline"
          >
            {SITE_CONFIG.contacts.privacyEmail}
          </a>{" "}
          with your <code>reconciliation_id</code>. Also review our{" "}
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
