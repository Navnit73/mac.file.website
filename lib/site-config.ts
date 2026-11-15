import type { Metadata } from "next";
import { BRAND, SITE_URL } from "@/lib/landing-data";

export type AuthorProfile = {
  id: string;
  /** True only when replaced with an actual verified individual person */
  isNamedIndividual: boolean;
  fullName: string;
  title: string;
  experience: string;
  areasOfExpertise: string[];
  biography: string;
  /** Render only when a verified profile image asset is provided */
  photoUrl: string | null;
  profilePath: string;
  placeholderNotice?: string;
};

export type ReviewerProfile = {
  id: string;
  /** True only when replaced with an actual verified individual reviewer */
  isNamedIndividual: boolean;
  fullName: string;
  credentials: string;
  experience: string;
  areasOfExpertise: string[];
  placeholderNotice?: string;
};

export type NavLinkItem = {
  label: string;
  href: string;
};

export type FooterNavGroup = {
  heading: string;
  links: NavLinkItem[];
};

export const SITE_CONFIG = {
  url: SITE_URL,
  domain: BRAND.domain,
  brandName: BRAND.name,
  productName: "reconcilebankstatement Bank Statement Reconciliation",
  tagline: BRAND.tagline,
  copyrightYear: 2026,
  lastReviewedDate: "2026-11-15",
  lastReviewedLabel: "November 15, 2026",
  legalEntityName: "Reconcile Bank Statement",
  registeredAddress: "Khadda, Kushinagar, Uttar Pradesh, India",
  registrationNumber:
    "Independent pre-commercial software release (formal corporate registration details will be published prior to paid billing)",
  governingJurisdiction: "Uttar Pradesh, India",
  billingStatusNote:
    "The web reconciliation utility currently operates free of charge ($0.00). Subscription tiers and commercial billing terms apply only when paid plans are launched.",
  contacts: {
    supportEmail: "support@reconcilebankstatement.online",
    privacyEmail: "privacy@reconcilebankstatement.online",
    securityEmail: "security@reconcilebankstatement.online",
    accessibilityEmail: "accessibility@reconcilebankstatement.online",
    generalEmail: "hello@reconcilebankstatement.online",
    responseExpectation:
      "Target reply within 1–2 business days (Monday–Friday); security vulnerability notices receive priority triage.",
  },
} as const;

export const AUTHORS: Record<"editorialProduct", AuthorProfile> = {
  editorialProduct: {
    id: "editorial-product-team",
    isNamedIndividual: false,
    fullName: "reconcilebankstatement Editorial & Product Documentation Team",
    title: "Reconciliation Software Engineering & Accounting Workflows",
    experience:
      "Authors technical documentation and workflow guides grounded directly in reconcilebankstatement's parser, matching engine, and balance-verification logic.",
    areasOfExpertise: [
      "PDF & Spreadsheet Statement Parsing",
      "Date-Window Transaction Matching",
      "Running-Balance & Variance Checks",
      "US, UK & EU Format Normalization",
    ],
    biography:
      "Maintains product, security, methodology, and educational resources for reconcilebankstatement.online based on verified platform behavior and public accounting standards.",
    photoUrl: null,
    profilePath: "/our-team#author-profiles",
  },
};

export const REVIEWERS: Record<"technicalReview", ReviewerProfile> = {
  technicalReview: {
    id: "technical-verification-review",
    isNamedIndividual: false,
    fullName: "Product Engineering & QA Documentation Review",
    credentials:
      "Technical accuracy review against source code (independent CPA review not claimed)",
    experience:
      "Product behavior and technical claims have been verified directly against the implemented parser, matching, and export workflows. Exported workpapers remain decision-support materials for review with a qualified accountant.",
    areasOfExpertise: [
      "US GAAP Cash Reconciliation Concepts",
      "UK & EU Bank Statement Formats",
      "Month-End Close Workpapers",
      "Audit Trail Documentation",
    ],
    placeholderNotice:
      "Published documentation reflects engineering QA verification; it does not substitute for advice from a licensed CPA or chartered accountant.",
  },
};

export const PRIMARY_NAV_LINKS: NavLinkItem[] = [
  { label: "Tool", href: "/reconcile" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Guide", href: "/bank-reconciliation-guide" },
  { label: "Methodology", href: "/bank-reconciliation-methodology" },
  { label: "Security", href: "/security" },
  { label: "FAQ", href: "/faq" },
  { label: "About Us", href: "/about-us" },
];

export const FOOTER_NAV_GROUPS: FooterNavGroup[] = [
  {
    heading: "Company & Team",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Contact Us", href: "/contact-us" },
      { label: "Our Team", href: "/our-team" },
      { label: "How We Work", href: "/how-we-work" },
      { label: "Editorial Policy", href: "/editorial-policy" },
    ],
  },
  {
    heading: "Product & Resources",
    links: [
      { label: "Reconciliation Tool", href: "/reconcile" },
      { label: "How It Works", href: "/how-it-works" },
      {
        label: "Bank Reconciliation Guide",
        href: "/bank-reconciliation-guide",
      },
      {
        label: "Reconciliation Methodology",
        href: "/bank-reconciliation-methodology",
      },
      { label: "Data Accuracy Policy", href: "/data-accuracy-policy" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    heading: "Trust, Legal & Security",
    links: [
      { label: "Security Overview", href: "/security" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Data Retention Policy", href: "/data-retention-policy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "Refund Policy", href: "/refund-policy" },
      { label: "Financial Disclaimer", href: "/disclaimer" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Responsible Use", href: "/responsible-use" },
      { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
    ],
  },
];

export const TRUST_PAGE_ROUTES = [
  "/about-us",
  "/contact-us",
  "/our-team",
  "/editorial-policy",
  "/how-we-work",
  "/how-it-works",
  "/bank-reconciliation-guide",
  "/bank-reconciliation-methodology",
  "/data-accuracy-policy",
  "/security",
  "/privacy",
  "/terms",
  "/cookie-policy",
  "/refund-policy",
  "/disclaimer",
  "/faq",
  "/data-retention-policy",
  "/accessibility",
  "/responsible-use",
  "/affiliate-disclosure",
] as const;

export function createPageMetadata({
  path,
  title,
  description,
  keywords,
  type = "website",
}: {
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  type?: "website" | "article";
}): Metadata {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: normalizedPath,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: normalizedPath,
      siteName: `${BRAND.name} (${BRAND.domain})`,
      type,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
