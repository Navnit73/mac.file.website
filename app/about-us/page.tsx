import Link from "next/link";
import { createPageMetadata, SITE_CONFIG } from "@/lib/site-config";
import { TrustPageShell } from "@/components/trust/trust-page-shell";

export const metadata = createPageMetadata({
  path: "/about-us",
  title: `About Us | ${SITE_CONFIG.brandName} (${SITE_CONFIG.domain})`,
  description:
    "Learn why reconcilebankstatement.online (reconcilebankstatement) was built, who we serve across the US, UK, and EU, and how our document-first reconciliation software works.",
});

export default function AboutUsPage() {
  return (
    <TrustPageShell
      path="/about-us"
      pageType="AboutPage"
      eyebrow="Company Overview"
      title={`About ${SITE_CONFIG.brandName} (${SITE_CONFIG.domain})`}
      lead="Practical, transparent bank statement and business ledger reconciliation software designed for small business owners, bookkeepers, finance teams, and accountants—without requiring live banking credentials or full ERP migrations."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "About Us" },
      ]}
      sections={[
        { id: "problem-we-solve", label: "The Problem We Solve" },
        { id: "mission-vision", label: "Mission & Vision" },
        { id: "who-we-serve", label: "Who Uses reconcilebankstatement" },
        { id: "company-ownership", label: "Ownership & Business Details" },
      ]}
      notice={{
        title: "Operator & Support Disclosure",
        body: `Company operating details, jurisdictional scope, and direct support contacts for ${SITE_CONFIG.domain} are listed below and linked from the site footer.`,
      }}
      relatedLinks={[
        {
          title: "How It Works",
          description:
            "Follow the complete end-to-end document upload, matching, and verification flow.",
          href: "/how-it-works",
        },
        {
          title: "How We Work",
          description:
            "See our engineering quality standards, deterministic testing approach, and limitations disclosure.",
          href: "/how-we-work",
        },
        {
          title: "Our Team",
          description:
            "View contributor responsibilities, editorial slots, and author/reviewer profiles.",
          href: "/our-team",
        },
      ]}
    >
      <section
        id="problem-we-solve"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          The Problem We Solve
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67] sm:text-base">
          Month-end close, client catch-up bookkeeping, and quarterly tax
          preparation frequently stall at the same bottleneck: comparing a bank
          or credit card statement against an internal business ledger when both
          sources arrive in incompatible formats. Banks regularly issue locked
          or scanned PDF statements, multi-column Excel tables, HTML/XML pseudo
          <code>.xls</code> exports, or UTF-16 CSV files formatted differently across US,
          UK, and European banking standards.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67] sm:text-base">
          Many teams either spend hours eyeballing spreadsheets with fragile
          <code>VLOOKUP</code> formulas or are forced to adopt heavyweight subscription
          suites requiring permanent OAuth bank connections. reconcilebankstatement fills the
          practical gap between manual spreadsheet matching and full ERP
          implementations: upload the two exported files directly, configure date
          tolerances and description scoring, verify opening and closing
          balances, and export clean XLSX or CSV workpapers.
        </p>
      </section>

      <section
        id="mission-vision"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          Mission &amp; Product Vision
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-5">
            <h3 className="text-base font-semibold text-[#111214]">
              Our Mission
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
              Help small businesses, freelancers, bookkeepers, and finance
              professionals tie out bank statements and ledgers accurately in a
              single browser workflow while keeping exceptions, timing
              differences, and potential duplicates completely transparent.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-5">
            <h3 className="text-base font-semibold text-[#111214]">
              Our Vision
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
              Make document-based account verification straightforward across
              global banking formats without requiring bank passwords, opaque
              black-box edits to accounting records, or unverified assumptions.
            </p>
          </div>
        </div>
      </section>

      <section
        id="who-we-serve"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          Who Uses {SITE_CONFIG.domain}
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/80 p-5">
            <h3 className="text-sm font-semibold text-[#111214] sm:text-base">
              Small Business Owners &amp; Freelancers
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
              Check monthly checking or corporate card statements against expense
              trackers or spreadsheets before submitting quarterly VAT, GST, or
              income filings.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 p-5">
            <h3 className="text-sm font-semibold text-[#111214] sm:text-base">
              Accountants &amp; Bookkeepers (US, UK &amp; EU)
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
              Reconcile historical PDF statements sent by clients when live
              bank feeds have disconnected or lack historical transaction coverage.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 p-5">
            <h3 className="text-sm font-semibold text-[#111214] sm:text-base">
              Finance &amp; Controller Teams
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
              Isolate unmatched items, timing differences (±0–31 days), potential
              duplicates, and Dr/Cr reversal errors with downloadable XLSX audit
              workpapers.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 p-5">
            <h3 className="text-sm font-semibold text-[#111214] sm:text-base">
              Multi-Currency &amp; Regional Operations
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
              Process English, German, French, Spanish, Portuguese, and Dutch
              statement headers across USD, GBP, EUR, and other ISO 4217
              currencies. See{" "}
              <Link
                href="/how-it-works"
                className="font-medium text-[#111214] underline"
              >
                How It Works
              </Link>{" "}
              for supported input rules.
            </p>
          </div>
        </div>
      </section>

      <section
        id="company-ownership"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          Ownership &amp; Business Transparency
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
          We publish direct contact addresses and operating details openly
          in accordance with transparent SaaS operating standards:
        </p>
        <dl className="mt-4 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-[#F8FAFC] text-xs sm:text-sm">
          <div className="grid gap-1 px-4 py-3 sm:grid-cols-3">
            <dt className="font-semibold text-[#111214]">Website / Brand</dt>
            <dd className="text-[#5A5E67] sm:col-span-2">
              {SITE_CONFIG.domain} ({SITE_CONFIG.brandName})
            </dd>
          </div>
          <div className="grid gap-1 px-4 py-3 sm:grid-cols-3">
            <dt className="font-semibold text-[#111214]">Legal Entity</dt>
            <dd className="text-[#5A5E67] sm:col-span-2">
              {SITE_CONFIG.legalEntityName}
            </dd>
          </div>
          <div className="grid gap-1 px-4 py-3 sm:grid-cols-3">
            <dt className="font-semibold text-[#111214]">Registered Address</dt>
            <dd className="text-[#5A5E67] sm:col-span-2">
              {SITE_CONFIG.registeredAddress}
            </dd>
          </div>
          <div className="grid gap-1 px-4 py-3 sm:grid-cols-3">
            <dt className="font-semibold text-[#111214]">Primary Contact</dt>
            <dd className="text-[#5A5E67] sm:col-span-2">
              <Link
                href="/contact-us"
                className="font-medium text-[#111214] underline"
              >
                {SITE_CONFIG.contacts.supportEmail}
              </Link>
            </dd>
          </div>
        </dl>
      </section>
    </TrustPageShell>
  );
}
