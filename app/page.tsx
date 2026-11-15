import { LandingPage } from "@/components/landing/landing-page";
import {
  BRAND,
  FAQ_ITEMS,
  HOW_TO_USE_STEPS,
  SITE_URL,
} from "@/lib/landing-data";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: BRAND.name,
        url: SITE_URL,
        inLanguage: ["en-US", "en-GB"],
      },
      {
        "@type": ["WebApplication", "SoftwareApplication"],
        name: BRAND.name,
        applicationCategory: "FinanceApplication",
        applicationSubCategory: "Bank Statement & Account Reconciliation Software",
        operatingSystem: "Web",
        url: SITE_URL,
        description:
          "Bank statement and business ledger reconciliation software that extracts PDF OCR, images, CSV, and XLSX files to surface matched pairs, bank-only and book-only gaps, duplicates, amount or direction mismatches, and running-balance proof.",
        isAccessibleForFree: true,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "Byte-level format detection for PDF OCR, images, CSV, TSV, TXT, and XLSX/XLSM",
          "In-memory password unlocking for encrypted PDF statements",
          "Configurable ±0 to 31 day date tolerance and description similarity matching",
          "Isolation of unmatched bank fees, book timing gaps, duplicates, and Dr/Cr sign flips",
          "Opening, closing, and line-by-line running-balance verification",
          "Formatted XLSX workbook and CSV report exports",
        ],
      },
      {
        "@type": "HowTo",
        name: "How to Use ClearTie to Reconcile Bank Statement Files",
        description:
          "Follow these five steps to compare a bank statement against your business ledger and export verified XLSX or CSV reconciliation reports.",
        step: HOW_TO_USE_STEPS.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: step.title,
          text: step.detail,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
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
      <LandingPage />
    </>
  );
}
