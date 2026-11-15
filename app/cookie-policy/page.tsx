import Link from "next/link";
import { createPageMetadata, SITE_CONFIG } from "@/lib/site-config";
import { TrustPageShell } from "@/components/trust/trust-page-shell";

export const metadata = createPageMetadata({
  path: "/cookie-policy",
  title: `Cookie & Browser Storage Policy | ${SITE_CONFIG.brandName}`,
  description:
    "Clear explanation of cookies and browser sessionStorage keys used by reconcilebankstatement.online—no advertising or third-party tracking cookies.",
});

export default function CookiePolicyPage() {
  return (
    <TrustPageShell
      path="/cookie-policy"
      eyebrow="Cookies & Storage"
      title="Cookie &amp; Browser Storage Policy"
      lead={`Updated ${SITE_CONFIG.lastReviewedLabel}. We believe cookie disclosures should match reality—not boilerplate. Right now, ${SITE_CONFIG.domain} does not set third-party advertising, behavioral profiling, or cross-site tracking cookies.`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Cookie Policy" },
      ]}
      sections={[
        { id: "http-cookies", label: "HTTP Cookies Status" },
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
            "Technical controls keeping API proxy responses uncached (`no-store`).",
          href: "/security",
        },
      ]}
    >
      <section
        id="http-cookies"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          1. Advertising &amp; Analytics Cookies (None Active)
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          This application currently loads no advertising pixels, retargeting
          tags, or third-party analytics cookie scripts. Should optional
          privacy-compliant analytics or consent banners ever be added in the
          future, this policy and disclosure table will be updated prior to
          activation.
        </p>
      </section>

      <section
        id="session-storage"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          2. Strictly Functional `sessionStorage` Keys
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          Instead of persistent HTTP tracking cookies, the browser client stores
          up to two tab-scoped keys in `window.sessionStorage` solely to keep
          your active reconciliation workflow functioning across refreshes and
          redirect to `/reconcile-preview/&lt;id&gt;`:
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
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
                  Stores your most recent `reconciliation_id` so the Resume
                  button can reload or navigate to its preview report.
                </td>
                <td className="px-4 py-3">Cleared when tab closes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-[#111214]">
                  rec-token:&lt;id&gt;
                </td>
                <td className="px-4 py-3">
                  Used only if guest-token auth mode is enabled (`X-Reconciliation-Token`);
                  not populated in default server proxy mode.
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
          3. How to Clear Session Storage Anytime
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          Closing the browser tab clears `sessionStorage` automatically. You can
          also clear site data manually at any time through your browser&apos;s
          developer storage tools or site settings. For questions, review our{" "}
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
