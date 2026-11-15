import { Navbar } from "@/components/landing/navbar";
import { ReconciliationWorkbenchSection } from "@/components/landing/reconciliation-workbench-section";
import { SiteFooter } from "@/components/landing/site-footer";
import {
  buildBreadcrumbSchema,
  buildOrganizationSchema,
  buildSoftwareApplicationSchema,
  buildWebPageSchema,
  buildWebsiteSchema,
  JsonLdScript,
  normalizeCanonicalUrl,
} from "@/components/trust/structured-data";
import { createPageMetadata, SITE_CONFIG } from "@/lib/site-config";

export const metadata = createPageMetadata({
  path: "/reconcile",
  title: "Bank Statement & Ledger Reconciliation Tool | reconcilebankstatement",
  description:
    "Upload your bank statement and business ledger in PDF, image, CSV, TSV, TXT, or XLSX format to match transactions, isolate gaps, verify balances, and export XLSX or CSV workpapers.",
  keywords: [
    "reconcile bank statement",
    "bank reconciliation tool",
    "upload bank statement CSV PDF",
    "bank ledger tie-out",
  ],
});

export default function ReconcilePage() {
  const pageUrl = normalizeCanonicalUrl("/reconcile");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationSchema(),
      buildWebsiteSchema(),
      buildWebPageSchema({
        type: "WebPage",
        path: "/reconcile",
        title: "Bank Statement & Ledger Reconciliation Tool | reconcilebankstatement",
        description:
          "Upload bank statement and business ledger files in PDF OCR, image, CSV, TSV, TXT, or XLSX format to run deterministic transaction matching and export XLSX or CSV tie-out workpapers.",
        breadcrumbId: `${pageUrl}/#breadcrumb`,
        mainEntityId: `${SITE_CONFIG.url}/#software`,
      }),
      buildSoftwareApplicationSchema({
        description:
          "Upload bank statement and business ledger files in PDF OCR, image, CSV, TSV, TXT, or XLSX format to run deterministic transaction matching and export XLSX or CSV tie-out workpapers.",
      }),
      buildBreadcrumbSchema(
        [
          { label: "Home", href: "/" },
          { label: "Reconciliation Tool" },
        ],
        "/reconcile"
      ),
    ],
  };

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <div className="flex min-h-screen flex-col bg-white">
        <Navbar />

        <main id="main-content" className="flex-1">
          <ReconciliationWorkbenchSection headingLevel="h1" showBreadcrumbs />
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
