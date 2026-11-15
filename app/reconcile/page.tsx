import { Navbar } from "@/components/landing/navbar";
import { ReconciliationWorkbenchSection } from "@/components/landing/reconciliation-workbench-section";
import { SiteFooter } from "@/components/landing/site-footer";
import { buildOrganizationSchema } from "@/components/trust/structured-data";
import { createPageMetadata, SITE_CONFIG } from "@/lib/site-config";

export const metadata = createPageMetadata({
  path: "/reconcile",
  title: "Bank Statement & Ledger Reconciliation Tool | ClearTie",
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationSchema(),
      {
        "@type": ["WebApplication", "SoftwareApplication"],
        name: `${SITE_CONFIG.brandName} Reconciliation Tool`,
        applicationCategory: "FinanceApplication",
        applicationSubCategory: "Bank Statement & Account Reconciliation Software",
        operatingSystem: "Web",
        url: `${SITE_CONFIG.url}/reconcile`,
        description:
          "Upload bank statement and business ledger files in PDF OCR, image, CSV, TSV, TXT, or XLSX format to run deterministic transaction matching and export XLSX or CSV tie-out workpapers.",
        isAccessibleForFree: true,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_CONFIG.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Reconciliation Tool",
            item: `${SITE_CONFIG.url}/reconcile`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="flex min-h-screen flex-col bg-white">
        <Navbar />

        <main className="flex-1">
          <ReconciliationWorkbenchSection headingLevel="h1" showBreadcrumbs />
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
