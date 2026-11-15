import {
  FaqDirectoryClient,
  type FaqDirectoryEntry,
} from "@/components/trust/faq-directory-client";
import { TrustPageShell } from "@/components/trust/trust-page-shell";
import { FAQ_ITEMS } from "@/lib/landing-data";
import { createPageMetadata, SITE_CONFIG } from "@/lib/site-config";

export const metadata = createPageMetadata({
  path: "/faq",
  title: `Frequently Asked Questions (FAQ) | ${SITE_CONFIG.brandName}`,
  description:
    "Answers about using reconcilebankstatement.online: supported formats, PDF OCR limits, tolerance windows, security practices, data retention, and accounting concepts.",
});

const EXTRA_POLICY_FAQS: FaqDirectoryEntry[] = [
  {
    id: "pricing-free-status",
    category: "policies",
    question: "Is reconcilebankstatement.online free or subscription-based?",
    answer:
      "Currently, the web utility operates free of charge ($0.00) with no paid plans, credit card forms, or hidden recurring charges active. Check our Refund Policy if paid plans are ever introduced later.",
    linkLabel: "Read Refund & Billing Policy",
    linkHref: "/refund-policy",
  },
  {
    id: "cookies-vs-session-storage",
    category: "policies",
    question: "Does reconcilebankstatement use tracking cookies or sell statement data?",
    answer:
      "No marketing or behavioral tracking cookies are used by this application, and we do not sell statement records. Only tab-scoped sessionStorage is used to let you reopen a recent reconciliation ID before closing the browser tab.",
    linkLabel: "Inspect Cookie & Storage Policy",
    linkHref: "/cookie-policy",
  },
  {
    id: "security-and-passwords",
    category: "policies",
    question: "Does reconcilebankstatement need my bank username or password?",
    answer:
      "Never. reconcilebankstatement processes files you export and upload yourself—no bank portal credentials or Open Banking tokens are ever requested. Optional PDF unlock passwords are sent transiently for decryption without persistent frontend storage.",
    linkLabel: "Review Security Architecture",
    linkHref: "/security",
  },
];

export default function FaqPage() {
  const allFaqs: FaqDirectoryEntry[] = [
    ...FAQ_ITEMS.map((item) => ({
      id: item.id,
      category: item.category,
      question: item.question,
      answer: item.answer,
      linkLabel:
        item.category === "concepts"
          ? "Read the Bank Reconciliation Guide"
          : "See How reconcilebankstatement Works",
      linkHref:
        item.category === "concepts"
          ? "/bank-reconciliation-guide"
          : "/how-it-works",
    })),
    ...EXTRA_POLICY_FAQS,
  ];

  return (
    <TrustPageShell
      path="/faq"
      pageType="CollectionPage"
      eyebrow="Help & Knowledge Base"
      title="Frequently Asked Questions"
      lead="Practical answers covering supported statement formats, matching controls, accounting definitions, security safeguards, and data retention policies."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "FAQ" },
      ]}
      relatedLinks={[
        {
          title: "Bank Reconciliation Guide",
          description:
            "Deep dive into deposits in transit, checks, fees, and GL differences.",
          href: "/bank-reconciliation-guide",
        },
        {
          title: "Reconciliation Methodology",
          description:
            "Detailed matching logic, tolerance windows, and balance equations.",
          href: "/bank-reconciliation-methodology",
        },
        {
          title: "Contact Support",
          description:
            "Email our team directly if a statement fails to parse cleanly.",
          href: "/contact-us",
        },
      ]}
    >
      <section className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8">
        <h2 className="mb-5 text-xl font-semibold text-[#111214] sm:text-2xl">
          Browse Questions by Topic
        </h2>
        <FaqDirectoryClient items={allFaqs} />
      </section>
    </TrustPageShell>
  );
}
