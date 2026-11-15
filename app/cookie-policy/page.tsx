import Link from "next/link";
import { createPageMetadata, SITE_CONFIG } from "@/lib/site-config";
import { TrustPageShell } from "@/components/trust/trust-page-shell";

export const metadata = createPageMetadata({
  path: "/cookie-policy",
  title: `Cookie & Browser Storage Policy | ${SITE_CONFIG.brandName}`,
  description:
    "Clear explanation of cookies, Microsoft Clarity UX analytics, and browser sessionStorage keys used by reconcilebankstatement.online—with zero advertising pixels.",
});

export default function CookiePolicyPage() {
  return (
    <TrustPageShell
      path="/cookie-policy"
      eyebrow="Cookies & Storage"
      title="Cookie &amp; Browser Storage Policy"
      lead={`Updated ${SITE_CONFIG.lastReviewedLabel}. ${SITE_CONFIG.domain} sets no third-party advertising or retargeting pixels, uses Microsoft Clarity for aggregate UX diagnostics, and relies on tab-scoped sessionStorage for active reconciliation workflows.`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Cookie Policy" },
      ]}
      sections={[
        { id: "http-cookies", label: "Advertising & Analytics Cookies" },
        { id: "session-storage", label: "Essential Tab Session Storage" },
        { id: "manage-storage", label: "How to Clear Browser Storage" },
      ]}
      relatedLinks={[
        {
          title: "Privacy Policy",
          description:
            "Complete breakdown of uploaded documents, request logs, and privacy contacts.",
          href: "/privacy",
        },
        {
          title: "Data Retention Policy",
          description:
            "When browser session storage and server reconciliation runs expire.",
          href: "/data-retention-policy",
        },
        {
          title: "Security Overview",
          description:
            "Technical controls keeping API proxy responses uncached (no-store).",
          href: "/security",
        },
      ]}
    >
      <section
        id="http-cookies"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          1. Advertising Pixels vs. First-Party UX Analytics
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          This application loads zero third-party advertising pixels,
          retargeting tags, or ad-network profiles. To measure interface health
          and navigation issues, {SITE_CONFIG.domain} loads Microsoft Clarity UX
          analytics, which may set standard Clarity telemetry cookies (such as{" "}
          <code>_clck</code>, <code>_clsk</code>, and <code>CLID</code>).
          Financial report tables and report progress containers apply{" "}
          <code>data-clarity-mask=&quot;true&quot;</code>, and PDF unlock
          passwords use masked inputs so uploaded statement figures are excluded
          from session replay capture.
        </p>
      </section>

      <section
        id="session-storage"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          2. Strictly Functional <code>sessionStorage</code> Keys
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          To keep your active reconciliation workflow functioning across
          refreshes and redirect to <code>/reconcile-preview/&lt;id&gt;</code>,
          the browser stores up to two tab-scoped keys in{" "}
          <code>window.sessionStorage</code>:
        </p>
        <div
          tabIndex={0}
          role="region"
          aria-label="Session storage keys reference table"
          className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214]"
        >
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#F8FAFC] text-[#111214]">
              <tr>
                <th className="px-4 py-3 font-semibold">Storage Key</th>
                <th className="px-4 py-3 font-semibold">Purpose</th>
                <th className="px-4 py-3 font-semibold">Lifetime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-[#5A5E67]">
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-[#111214]">
                  cleartie:last-reconciliation-id
                </td>
                <td className="px-4 py-3">
                  Stores your most recent <code>reconciliation_id</code> so the
                  Resume button can reload or navigate to its preview report.
                </td>
                <td className="px-4 py-3">Cleared when tab closes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-[#111214]">
                  rec-token:&lt;id&gt;
                </td>
                <td className="px-4 py-3">
                  Used only if guest-token auth mode is enabled (
                  <code>X-Reconciliation-Token</code>); not populated in default
                  server proxy mode.
                </td>
                <td className="px-4 py-3">Cleared when tab closes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section
        id="manage-storage"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          3. How to Clear Cookies &amp; Session Storage Anytime
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          Closing the browser tab clears <code>sessionStorage</code>{" "}
          automatically. You can also clear cookies or site storage at any time
          through your browser&apos;s developer storage tools or site settings.
          For questions, review our{" "}
          <Link href="/privacy" className="font-semibold text-[#111214] underline">
            Privacy Policy
          </Link>{" "}
          or email{" "}
          <a
            href={`mailto:${SITE_CONFIG.contacts.privacyEmail}`}
            className="font-semibold text-[#111214] underline"
          >
            {SITE_CONFIG.contacts.privacyEmail}
          </a>
          .
        </p>
      </section>
    </TrustPageShell>
  );
}
