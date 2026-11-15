import { SITE_CONFIG, type AuthorProfile } from "@/lib/site-config";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

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
    url: SITE_CONFIG.url,
    email: SITE_CONFIG.contacts.supportEmail,
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
    publisher: { "@id": `${SITE_CONFIG.url}/#organization` },
    inLanguage: ["en-US", "en-GB"],
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[], pagePath: string) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.label,
      item: item.href
        ? `${SITE_CONFIG.url}${item.href.startsWith("/") ? item.href : `/${item.href}`}`
        : `${SITE_CONFIG.url}${pagePath.startsWith("/") ? pagePath : `/${pagePath}`}`,
    })),
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
  const url = `${SITE_CONFIG.url}${path.startsWith("/") ? path : `/${path}`}`;
  const authorEntity = author.isNamedIndividual
    ? {
        "@type": "Person",
        name: author.fullName,
        jobTitle: author.title,
        url: `${SITE_CONFIG.url}${author.profilePath}`,
      }
    : {
        "@type": "Organization",
        name: author.fullName,
        url: SITE_CONFIG.url,
      };

  return {
    "@type": "Article",
    headline: title,
    description,
    url,
    mainEntityOfPage: url,
    datePublished: dateModified,
    dateModified,
    author: authorEntity,
    publisher: { "@id": `${SITE_CONFIG.url}/#organization` },
  };
}
