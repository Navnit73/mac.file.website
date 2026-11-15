import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/landing-page";
import {
  buildOrganizationSchema,
  buildSoftwareApplicationSchema,
  buildWebPageSchema,
  buildWebsiteSchema,
  JsonLdScript,
} from "@/components/trust/structured-data";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationSchema(),
      buildWebsiteSchema(),
      buildWebPageSchema({
        type: "WebPage",
        path: "/",
        title:
          "Reconcile Bank Statement Files & Ledgers | reconcilebankstatement Software",
        description:
          "Reconcile bank statement PDFs, images, CSV, and XLSX files against your ledger in seconds. Spot gaps, duplicates, and mismatches with XLSX/CSV export.",
        mainEntityId: `${SITE_CONFIG.url}/#software`,
      }),
      buildSoftwareApplicationSchema({
        featureList: [
          "Byte-level format detection for PDF OCR, images, CSV, TSV, TXT, and XLSX/XLSM",
          "In-memory password unlocking for encrypted PDF statements",
          "Configurable ±0 to 31 day date tolerance and description similarity matching",
          "Isolation of unmatched bank fees, book timing gaps, duplicates, and Dr/Cr sign flips",
          "Opening, closing, and line-by-line running-balance verification",
          "Formatted XLSX workbook and CSV report exports",
        ],
      }),
    ],
  };

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <LandingPage />
    </>
  );
}
