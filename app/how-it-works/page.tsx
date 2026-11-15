import Link from "next/link";
import { HOW_TO_USE_STEPS } from "@/lib/landing-data";
import { createPageMetadata, SITE_CONFIG } from "@/lib/site-config";
import { TrustPageShell } from "@/components/trust/trust-page-shell";

export const metadata = createPageMetadata({
  path: "/how-it-works",
  title: `How ClearTie Works | Bank & Ledger Reconciliation Workflow`,
  description:
    "Step-by-step walkthrough of how reconcilebankstatement.online ingests PDF OCR, image, CSV, and XLSX files, matches entries, verifies balances, and exports reports.",
});

export default function HowItWorksPage() {
  const softwareSchema = {
    "@type": ["WebApplication", "SoftwareApplication"],
    name: SITE_CONFIG.productName,
    applicationCategory: "FinanceApplication",
    applicationSubCategory: "Bank Statement & Ledger Reconciliation Software",
    operatingSystem: "Web",
    url: `${SITE_CONFIG.url}/how-it-works`,
    description:
      "Browser-based bank statement and business ledger comparison utility supporting PDF OCR (up to 200 pages), images, CSV, TSV, TXT, and XLSX/XLSM exports up to 100 MB.",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Direct upload of PDF, JPG, JPEG, PNG, WEBP, TIFF, CSV, TSV, TXT, XLSX, and XLSM files (up to 100 MB, 200 PDF pages)",
      "Transient PDF unlock password input for encrypted bank statements",
      "Configurable ±0 to ±31 day date tolerance and description similarity scoring",
      "Categorization into matched, unmatched bank, unmatched ledger, possible duplicates, and amount/direction mismatches",
      "Opening, closing, running-balance, and book-to-bank bridge checks",
      "Formatted XLSX workbook and CSV export",
    ],
  };

  return (
    <TrustPageShell
      path="/how-it-works"
      eyebrow="Product Workflow"
      title="How ClearTie Reconciles Statements &amp; Ledgers"
      lead="From raw bank PDFs or spreadsheet exports to categorized tie-out exceptions and audit-ready XLSX workpapers—see every technical stage in the reconciliation pipeline."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "How It Works" },
      ]}
      sections={[
        { id: "five-steps", label: "5-Step Workflow" },
        { id: "supported-inputs", label: "Supported Inputs & Limits" },
        { id: "output-categories", label: "Report Output Categories" },
        { id: "preview-and-export", label: "Preview Page & Exports" },
      ]}
      extraSchemas={[softwareSchema]}
      relatedLinks={[
        {
          title: "Bank Reconciliation Guide",
          description:
            "Learn core accounting concepts including outstanding checks and deposits in transit.",
          href: "/bank-reconciliation-guide",
        },
        {
          title: "Reconciliation Methodology",
          description:
            "Inspect exact matching criteria, tolerance windows, and balance equations.",
          href: "/bank-reconciliation-methodology",
        },
        {
          title: "Security Overview",
          description:
            "Verify how uploads, proxy headers, and encrypted PDF passwords are handled.",
          href: "/security",
        },
      ]}
    >
      <section id="five-steps" className="space-y-4">
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          Complete 5-Step Reconciliation Pipeline
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HOW_TO_USE_STEPS.map((step) => (
            <article
              key={step.step}
              className="rounded-[24px] border border-slate-200 bg-white p-5"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#111214] font-mono text-xs font-bold text-[#BDF71D]">
                {step.step}
              </span>
              <h3 className="mt-3 text-base font-semibold text-[#111214]">
                {step.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
                {step.detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="supported-inputs"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          Supported Formats &amp; Verified Limits
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-5">
            <h3 className="text-sm font-semibold text-[#111214] sm:text-base">
              Document &amp; Spreadsheet Extensions
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
              Digital or scanned `.pdf`, images (`.jpg`, `.jpeg`, `.png`,
              `.webp`, `.tiff`, `.tif`), text tables (`.csv`, `.tsv`, `.txt`,
              including UTF-16 Unicode and HTML/XML bank exports), and Excel
              workbooks (`.xlsx`, `.xlsm`). Legacy binary `.xls` files should be
              resaved as `.xlsx` or `.csv`.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-5">
            <h3 className="text-sm font-semibold text-[#111214] sm:text-base">
              File Size &amp; Page Boundaries
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
              Up to <strong className="text-[#111214]">100 MB per file</strong>{" "}
              and up to <strong className="text-[#111214]">200 pages</strong>{" "}
              per PDF statement. Encrypted PDFs accept per-document unlock
              passwords passed transiently during upload without storing passwords.
            </p>
          </div>
        </div>
      </section>

      <section
        id="output-categories"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          How Transactions Are Categorized
        </h2>
        <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-[#5A5E67]">
          <li>
            <strong className="text-[#111214]">Matched:</strong> Paired
            statement and ledger rows agreeing on amount and direction within
            your selected tolerance window (`±0–31 days`), labeled by confidence
            (`high`, `medium`, `low`).
          </li>
          <li>
            <strong className="text-[#111214]">Unmatched Bank:</strong> Lines
            appearing only on the bank statement (common examples: monthly bank
            charges, NSF fees, wire charges, direct debits, or unposted
            deposits).
          </li>
          <li>
            <strong className="text-[#111214]">Unmatched Ledger:</strong>{" "}
            Entries recorded in your books not yet cleared at the bank
            (outstanding checks, recent customer receipts in transit, or
            misdated entries).
          </li>
          <li>
            <strong className="text-[#111214]">Possible Duplicates:</strong>{" "}
            Repeated same-side entries clustered closely in date and amount
            within the same source file.
          </li>
          <li>
            <strong className="text-[#111214]">Amount Mismatches:</strong>{" "}
            Same-event pairs showing a minor amount gap (`amount_mismatch`), a
            debit/credit sign inversion (`direction_mismatch`), or both.
          </li>
        </ul>
      </section>

      <section
        id="preview-and-export"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          Dedicated Preview Page &amp; Workpaper Exports
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          Once processing completes, the browser navigates automatically to a
          dedicated preview route (`/reconcile-preview/&lt;id&gt;`) displaying
          status badges (`passed`, `failed`, or `unverifiable`), searchable
          category tabs, and one-click `.xlsx` and `.csv` report downloads. For
          matching internals, read our{" "}
          <Link
            href="/bank-reconciliation-methodology"
            className="font-semibold text-[#111214] underline"
          >
            Reconciliation Methodology
          </Link>
          .
        </p>
      </section>
    </TrustPageShell>
  );
}
