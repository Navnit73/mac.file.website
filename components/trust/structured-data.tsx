import { BRAND } from "@/lib/landing-data";
import { SITE_CONFIG, type AuthorProfile } from "@/lib/site-config";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type SchemaWebPageType =
  | "WebPage"
  | "AboutPage"
  | "ContactPage"
  | "CollectionPage";

export function normalizeCanonicalUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? SITE_CONFIG.url : `${SITE_CONFIG.url}${normalized}`;
}

export function JsonLdScript({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function buildOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.brandName,
    legalName: SITE_CONFIG.legalEntityName,
    url: SITE_CONFIG.url,
    description:
      "Online bank statement and business ledger reconciliation software for comparing PDFs, images, CSV, and Excel statements against accounting records.",
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_CONFIG.url}/#logo`,
      url: `${SITE_CONFIG.url}/apple-icon`,
      width: 180,
      height: 180,
      caption: SITE_CONFIG.brandName,
    },
    email: SITE_CONFIG.contacts.supportEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Khadda",
      addressLocality: "Kushinagar",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: SITE_CONFIG.contacts.supportEmail,
        availableLanguage: ["English"],
      },
      {
        "@type": "ContactPoint",
        contactType: "security",
        email: SITE_CONFIG.contacts.securityEmail,
        availableLanguage: ["English"],
      },
      {
        "@type": "ContactPoint",
        contactType: "privacy inquiries",
        email: SITE_CONFIG.contacts.privacyEmail,
        availableLanguage: ["English"],
      },
    ],
  };
}

export function buildWebsiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    name: SITE_CONFIG.brandName,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.tagline,
    publisher: { "@id": `${SITE_CONFIG.url}/#organization` },
    inLanguage: "en",
  };
}

export function buildSoftwareApplicationSchema(options?: {
  featureList?: string[];
  description?: string;
}) {
  return {
    "@type": "SoftwareApplication",
    "@id": `${SITE_CONFIG.url}/#software`,
    name: SITE_CONFIG.brandName,
    applicationCategory: "FinanceApplication",
    applicationSubCategory: "Bank Statement & Account Reconciliation Software",
    operatingSystem: "Web, Windows, macOS, Linux",
    softwareVersion: BRAND.version,
    url: SITE_CONFIG.url,
    screenshot: `${SITE_CONFIG.url}/opengraph-image`,
    description:
      options?.description ??
      "Bank statement and business ledger reconciliation software that extracts PDF OCR, images, CSV, and XLSX files to surface matched pairs, bank-only and book-only gaps, duplicates, amount or direction mismatches, and running-balance proof.",
    provider: { "@id": `${SITE_CONFIG.url}/#organization` },
    publisher: { "@id": `${SITE_CONFIG.url}/#organization` },
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      url: `${SITE_CONFIG.url}/reconcile`,
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    ...(options?.featureList ? { featureList: options.featureList } : {}),
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[], pagePath: string) {
  const pageUrl = normalizeCanonicalUrl(pagePath);
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}/#breadcrumb`,
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.label,
      item: item.href ? normalizeCanonicalUrl(item.href) : pageUrl,
    })),
  };
}

export function buildWebPageSchema({
  type = "WebPage",
  path,
  title,
  description,
  breadcrumbId,
  mainEntityId,
  dateModified = SITE_CONFIG.lastReviewedDate,
}: {
  type?: SchemaWebPageType;
  path: string;
  title: string;
  description: string;
  breadcrumbId?: string;
  mainEntityId?: string;
  dateModified?: string;
}) {
  const pageUrl = normalizeCanonicalUrl(path);
  return {
    "@type": type,
    "@id": `${pageUrl}/#webpage`,
    url: pageUrl,
    name: title,
    description,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_CONFIG.url}/#website` },
    about: { "@id": `${SITE_CONFIG.url}/#organization` },
    dateModified,
    ...(breadcrumbId ? { breadcrumb: { "@id": breadcrumbId } } : {}),
    ...(mainEntityId ? { mainEntity: { "@id": mainEntityId } } : {}),
  };
}

export function buildArticleSchema({
  title,
  description,
  path,
  author,
  dateModified = SITE_CONFIG.lastReviewedDate,
}: {
  title: string;
  description: string;
  path: string;
  author: AuthorProfile;
  dateModified?: string;
}) {
  const url = normalizeCanonicalUrl(path);
  const authorEntity = author.isNamedIndividual
    ? {
        "@type": "Person",
        name: author.fullName,
        jobTitle: author.title,
        url: normalizeCanonicalUrl(author.profilePath),
      }
    : {
        "@type": "Organization",
        "@id": `${SITE_CONFIG.url}/#organization`,
        name: SITE_CONFIG.brandName,
        url: SITE_CONFIG.url,
      };

  return {
    "@type": "Article",
    "@id": `${url}/#article`,
    headline: title,
    description,
    url,
    image: `${SITE_CONFIG.url}/opengraph-image`,
    mainEntityOfPage: { "@id": `${url}/#webpage` },
    isPartOf: { "@id": `${SITE_CONFIG.url}/#website` },
    datePublished: dateModified,
    dateModified,
    author: authorEntity,
    publisher: { "@id": `${SITE_CONFIG.url}/#organization` },
  };
}
