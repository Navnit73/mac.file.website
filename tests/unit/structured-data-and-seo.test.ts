import assert from "node:assert/strict";
import { describe, it } from "node:test";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import {
  AUTHORS,
  SITE_CONFIG,
  TRUST_PAGE_ROUTES,
} from "@/lib/site-config";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildOrganizationSchema,
  buildSoftwareApplicationSchema,
  buildWebPageSchema,
  buildWebsiteSchema,
} from "@/components/trust/structured-data";

describe("structured data builders & technical SEO routes", () => {
  it("constructs consistent Schema.org graph entities linked via @id", () => {
    const org = buildOrganizationSchema();
    const website = buildWebsiteSchema();
    const software = buildSoftwareApplicationSchema({
      featureList: ["PDF OCR parsing", "XLSX export"],
    });
    const breadcrumb = buildBreadcrumbSchema(
      [{ label: "Home", href: "/" }, { label: "About Us" }],
      "/about-us"
    );
    const webpage = buildWebPageSchema({
      type: "AboutPage",
      path: "/about-us",
      title: "About Us",
      description: "About reconcilebankstatement",
      breadcrumbId: breadcrumb["@id"],
      mainEntityId: org["@id"],
    });
    const article = buildArticleSchema({
      title: "Bank Reconciliation Guide",
      description: "Comprehensive reference",
      path: "/bank-reconciliation-guide",
      author: AUTHORS.editorialProduct,
    });

    assert.equal(org["@type"], "Organization");
    assert.equal(org["@id"], `${SITE_CONFIG.url}/#organization`);
    assert.equal(website.publisher["@id"], org["@id"]);
    assert.equal(software["@type"], "SoftwareApplication");
    assert.equal(software.provider["@id"], org["@id"]);
    assert.equal(software.offers.priceCurrency, "USD");
    assert.equal(webpage["@type"], "AboutPage");
    assert.equal(webpage.isPartOf["@id"], website["@id"]);
    assert.equal(webpage.breadcrumb?.["@id"], breadcrumb["@id"]);
    assert.deepEqual(webpage.mainEntity, { "@id": org["@id"] });
    assert.equal(article.publisher["@id"], org["@id"]);
    assert.equal(article.author["@id"], org["@id"]);
  });

  it("keeps robots.txt and sitemap.xml clean and indexable-only", () => {
    const robotsConfig = robots();
    assert.equal(robotsConfig.sitemap, `${SITE_CONFIG.url}/sitemap.xml`);

    const entries = sitemap();
    const urls = entries.map((e) => e.url);

    assert.ok(urls.includes(SITE_CONFIG.url));
    assert.ok(urls.includes(`${SITE_CONFIG.url}/reconcile`));

    for (const route of TRUST_PAGE_ROUTES) {
      assert.ok(
        urls.includes(`${SITE_CONFIG.url}${route}`),
        `Missing ${route} in sitemap`
      );
    }

    assert.equal(new Set(urls).size, urls.length);
    for (const url of urls) {
      assert.equal(url.includes("/reconcile-preview"), false);
      assert.equal(url.includes("/api/"), false);
    }
  });
});
