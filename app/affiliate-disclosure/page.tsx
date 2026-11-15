import Link from "next/link";
import { createPageMetadata, SITE_CONFIG } from "@/lib/site-config";
import { TrustPageShell } from "@/components/trust/trust-page-shell";

export const metadata = createPageMetadata({
  path: "/affiliate-disclosure",
  title: `Editorial Independence & Affiliate Disclosure | ${SITE_CONFIG.brandName}`,
  description:
    "Affiliate disclosure status for reconcilebankstatement.online: zero active affiliate partnerships, referral commissions, or sponsored software rankings.",
});

export default function AffiliateDisclosurePage() {
  return (
    <TrustPageShell
      path="/affiliate-disclosure"
      eyebrow="Commercial Transparency"
      title="Editorial Independence &amp; Affiliate Disclosure"
      lead={`As of ${SITE_CONFIG.lastReviewedLabel}, ${SITE_CONFIG.domain} participates in zero affiliate programs, referral payouts, or sponsored software placements.`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Affiliate Disclosure" },
      ]}
      sections={[
        { id: "current-status", label: "Current Relationship Status" },
        { id: "future-policy", label: "Future Disclosure Commitment" },
      ]}
      relatedLinks={[
        {
          title: "Editorial Policy",
          description:
            "How educational accounting guides are authored and fact-checked.",
          href: "/editorial-policy",
        },
        {
          title: "About Us",
          description:
            "Learn how reconcilebankstatement.online is operated and supported.",
          href: "/about-us",
        },
        {
          title: "Refund Policy",
          description:
            "Current free utility status ($0.00) and future billing terms.",
          href: "/refund-policy",
        },
      ]}
    >
      <section
        id="current-status"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          1. Zero Affiliate Links Currently Active
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          All comparisons, workflows, and external reference links (such as links
          to IRS, UK GOV.UK, or IFRS standards) published on{" "}
          {SITE_CONFIG.domain} are included strictly for reader education and
          software utility documentation. We earn no commission when you click
          any external link on this site.
        </p>
      </section>

      <section
        id="future-policy"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          2. Policy If Affiliate Relationships Are Ever Introduced
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          If {SITE_CONFIG.domain} ever enters an affiliate or referral
          partnership with an accounting platform or financial tool in the
          future, every qualifying link will be labeled visibly alongside a
          clear compensation disclosure complying with US FTC endorsement
          guidelines, UK ASA/CAP codes, and applicable EU transparency rules. For
          more on our content independence, see our{" "}
          <Link
            href="/editorial-policy"
            className="font-semibold text-[#111214] underline"
          >
            Editorial Policy
          </Link>
          .
        </p>
      </section>
    </TrustPageShell>
  );
}
