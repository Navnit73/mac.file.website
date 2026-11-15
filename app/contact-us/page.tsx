import Link from "next/link";
import { Clock, Lock, Mail, MessageSquare } from "lucide-react";
import { CopyEmailButton } from "@/components/trust/copy-email-button";
import { TrustPageShell } from "@/components/trust/trust-page-shell";
import { createPageMetadata, SITE_CONFIG } from "@/lib/site-config";

export const metadata = createPageMetadata({
  path: "/contact-us",
  title: `Contact Us | ${SITE_CONFIG.brandName} (${SITE_CONFIG.domain})`,
  description:
    "Contact reconcilebankstatement support, security, privacy, accessibility, or business inquiries at reconcilebankstatement.online with clear response expectations.",
});

const CONTACT_CHANNELS = [
  {
    icon: MessageSquare,
    title: "Product & Reconciliation Support",
    email: SITE_CONFIG.contacts.supportEmail,
    whenToUse:
      "File parsing issues (PDF OCR, CSV encoding, XLSX headers), reconciliation ID lookups, or bug reports.",
  },
  {
    icon: Lock,
    title: "Security & Vulnerability Reporting",
    email: SITE_CONFIG.contacts.securityEmail,
    whenToUse:
      "Responsible vulnerability disclosures, suspicious webhook traffic, or token access questions.",
  },
  {
    icon: Mail,
    title: "Privacy & Data Deletion Requests",
    email: SITE_CONFIG.contacts.privacyEmail,
    whenToUse:
      "Privacy policy inquiries, uploaded document deletion requests, and GDPR/UK GDPR or regional data rights questions.",
  },
  {
    icon: Mail,
    title: "Accessibility & General Business Inquiries",
    email: SITE_CONFIG.contacts.accessibilityEmail,
    whenToUse:
      "Keyboard navigation feedback, screen-reader barrier reports, or business correspondence.",
  },
] as const;

export default function ContactUsPage() {
  return (
    <TrustPageShell
      path="/contact-us"
      pageType="ContactPage"
      eyebrow="Contact & Support"
      title="Contact reconcilebankstatement Support"
      lead="Reach the appropriate team directly by email—without bots, ticket portals, or dead forms. Include your reconciliation_id (for example rec_...) without attaching sensitive raw statements unless requested during troubleshooting."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Contact Us" },
      ]}
      sections={[
        { id: "channels", label: "Direct Email Channels" },
        { id: "response-times", label: "Response Expectations" },
        { id: "troubleshooting-checklist", label: "What to Include" },
        { id: "business-details", label: "Operator Details" },
      ]}
      notice={{
        title: "Sensitive Financial Document Precaution",
        body: "When writing for troubleshooting help, please share only your reconciliation_id and error details first. Avoid sending unredacted PDF statements or unlock passwords over email unless needed.",
      }}
      relatedLinks={[
        {
          title: "Security Overview",
          description:
            "Review how PDF passwords, proxy requests, and upload streams are handled.",
          href: "/security",
        },
        {
          title: "Privacy Policy",
          description:
            "Inspect how financial files and personal information are processed.",
          href: "/privacy",
        },
        {
          title: "FAQ",
          description:
            "Check immediate answers on file limits, errors, and supported formats.",
          href: "/faq",
        },
      ]}
    >
      <section id="channels" className="grid gap-4 sm:grid-cols-2">
        {CONTACT_CHANNELS.map((channel) => {
          const Icon = channel.icon;
          return (
            <article
              key={channel.email}
              className="flex flex-col justify-between rounded-[24px] border border-slate-200 bg-white p-6"
            >
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4F6F8] text-[#111214]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="mt-4 text-base font-semibold text-[#111214] sm:text-lg">
                  {channel.title}
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
                  {channel.whenToUse}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4">
                <a
                  href={`mailto:${channel.email}`}
                  className="font-mono text-xs font-semibold text-[#111214] underline decoration-slate-300 underline-offset-4 hover:decoration-[#111214]"
                >
                  {channel.email}
                </a>
                <CopyEmailButton email={channel.email} />
              </div>
            </article>
          );
        })}
      </section>

      <section
        id="response-times"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <div className="flex items-start gap-3">
          <Clock
            className="mt-0.5 h-5 w-5 shrink-0 text-[#111214]"
            aria-hidden="true"
          />
          <div>
            <h2 className="text-xl font-semibold text-[#111214]">
              Response Times &amp; Support Scope
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#5A5E67]">
              {SITE_CONFIG.contacts.responseExpectation}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
              General business, partnership, or press inquiries can also be sent
              to{" "}
              <a
                href={`mailto:${SITE_CONFIG.contacts.generalEmail}`}
                className="font-semibold text-[#111214] underline"
              >
                {SITE_CONFIG.contacts.generalEmail}
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <section
        id="troubleshooting-checklist"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214]">
          What to Include for Fast Support
        </h2>
        <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-[#5A5E67]">
          <li>
            <strong className="text-[#111214]">1. Reconciliation ID:</strong>{" "}
            Share your run identifier (e.g. <code>rec_...</code>) if troubleshooting a
            specific report or timeout.
          </li>
          <li>
            <strong className="text-[#111214]">
              2. File Format &amp; Region:
            </strong>{" "}
            Tell us whether your statement is scanned PDF, digital PDF, CSV, or
            XLSX, plus date/number locale (US MM/DD/YYYY vs. UK/EU DD/MM/YYYY or
            comma decimals).
          </li>
          <li>
            <strong className="text-[#111214]">
              3. Protect Sensitive Statements:
            </strong>{" "}
            Never send unredacted bank statements, full account numbers, or PDF
            passwords by plain email unless explicitly requested over a verified
            channel.
          </li>
        </ul>
      </section>

      <section
        id="business-details"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214]">
          Registered Business Contact Information
        </h2>
        <dl className="mt-4 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-[#F8FAFC] text-xs sm:text-sm">
          <div className="grid gap-1 px-4 py-3 sm:grid-cols-3">
            <dt className="font-semibold text-[#111214]">Entity Name</dt>
            <dd className="text-[#5A5E67] sm:col-span-2">
              {SITE_CONFIG.legalEntityName}
            </dd>
          </div>
          <div className="grid gap-1 px-4 py-3 sm:grid-cols-3">
            <dt className="font-semibold text-[#111214]">Mailing Address</dt>
            <dd className="text-[#5A5E67] sm:col-span-2">
              {SITE_CONFIG.registeredAddress}
            </dd>
          </div>
          <div className="grid gap-1 px-4 py-3 sm:grid-cols-3">
            <dt className="font-semibold text-[#111214]">Website</dt>
            <dd className="text-[#5A5E67] sm:col-span-2">
              <Link href="/" className="font-medium text-[#111214] underline">
                {SITE_CONFIG.url}
              </Link>
            </dd>
          </div>
        </dl>
      </section>
    </TrustPageShell>
  );
}
