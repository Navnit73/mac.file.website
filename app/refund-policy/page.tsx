import Link from "next/link";
import { createPageMetadata, SITE_CONFIG } from "@/lib/site-config";
import { TrustPageShell } from "@/components/trust/trust-page-shell";

export const metadata = createPageMetadata({
  path: "/refund-policy",
  title: `Refund, Cancellation & Billing Policy | ${SITE_CONFIG.brandName}`,
  description:
    "Transparent billing status and refund policy for reconcilebankstatement.online: currently free ($0.00) with no paid subscriptions active, plus clear refund terms for future paid plans.",
});

export default function RefundPolicyPage() {
  return (
    <TrustPageShell
      path="/refund-policy"
      eyebrow="Billing & Refunds"
      title="Refund &amp; Cancellation Policy"
      lead={`Updated ${SITE_CONFIG.lastReviewedLabel}. We believe billing policies must reflect what the software actually charges today—zero hidden subscriptions or fabricated checkout promises.`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Refund Policy" },
      ]}
      sections={[
        { id: "current-pricing", label: "Current Access Status ($0.00)" },
        { id: "future-paid-terms", label: "Terms When Paid Plans Launch" },
        { id: "how-to-request", label: "Billing Support & Cancellation" },
      ]}
      notice={{
        title: "Pre-Commercial Free Access",
        body: `${SITE_CONFIG.billingStatusNote} No payment gateway is active today; the commercial standards below apply if paid tiers or billing plans are introduced later.`,
      }}
      relatedLinks={[
        {
          title: "Terms of Service",
          description:
            "Review service availability, permitted use, and liability terms.",
          href: "/terms",
        },
        {
          title: "Contact Us",
          description:
            "Reach support directly with any billing or operational question.",
          href: "/contact-us",
        },
        {
          title: "About Us",
          description:
            "See our mission and product focus for small businesses and accountants.",
          href: "/about-us",
        },
      ]}
    >
      <section
        id="current-pricing"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          1. Current Utility Access: Free of Charge ($0.00)
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          As of {SITE_CONFIG.lastReviewedLabel}, {SITE_CONFIG.domain} does not
          collect credit card numbers, process payments, or enroll users into
          recurring subscriptions. There are no paid fees to cancel or refund at
          this stage.
        </p>
      </section>

      <section
        id="future-paid-terms"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          2. Policy When Commercial Plans Are Introduced
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          If paid subscriptions, volume packs, or API credits are offered on{" "}
          {SITE_CONFIG.domain} in the future, the following baseline standards
          will be finalized and displayed clearly before checkout:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#5A5E67]">
          <li>
            <strong className="text-[#111214]">
              Cancel Anytime Without Friction:
            </strong>{" "}
            Recurring billing plans may be canceled prior to renewal so no
            further cycles are charged.
          </li>
          <li>
            <strong className="text-[#111214]">
              Duplicate or Erroneous Charges:
            </strong>{" "}
            Verified duplicate charges or technical billing errors will be
            refunded in full to the original payment method.
          </li>
          <li>
            <strong className="text-[#111214]">
              Commercial Refund Window &amp; Statutory Rights:
            </strong>{" "}
            Any paid plan checkout page will state its exact refund review window
            and applicable statutory EU/UK digital cancellation rights before payment
            is collected.
          </li>
        </ul>
      </section>

      <section
        id="how-to-request"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          3. How to Contact Billing Support
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          If you ever encounter an unauthorized charge or billing inquiry once
          paid plans launch, contact{" "}
          <a
            href={`mailto:${SITE_CONFIG.contacts.supportEmail}`}
            className="font-semibold text-[#111214] underline"
          >
            {SITE_CONFIG.contacts.supportEmail}
          </a>{" "}
          or review our{" "}
          <Link href="/terms" className="font-semibold text-[#111214] underline">
            Terms of Service
          </Link>
          .
        </p>
      </section>
    </TrustPageShell>
  );
}
