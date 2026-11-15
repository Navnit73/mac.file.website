import Link from "next/link";
import {
  buildArticleSchema,
} from "@/components/trust/structured-data";
import { TrustPageShell } from "@/components/trust/trust-page-shell";
import {
  AUTHORS,
  createPageMetadata,
  REVIEWERS,
  SITE_CONFIG,
} from "@/lib/site-config";

export const metadata = createPageMetadata({
  path: "/editorial-policy",
  title: `Editorial Policy & Content Standards | ${SITE_CONFIG.brandName}`,
  description:
    "How reconcilebankstatement.online creates, fact-checks, attributes, and updates educational bank reconciliation articles and software documentation.",
  type: "article",
});

export default function EditorialPolicyPage() {
  return (
    <TrustPageShell
      path="/editorial-policy"
      eyebrow="Editorial Governance"
      title="Editorial Policy &amp; Fact-Checking Standards"
      lead="Financial documentation influences how businesses review cash records. Every guide, comparison, and technical policy published on reconcilebankstatement.online follows strict verification, attribution, and correction standards."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Editorial Policy" },
      ]}
      author={AUTHORS.editorialProduct}
      reviewer={REVIEWERS.technicalReview}
      sections={[
        { id: "principles", label: "Core Principles" },
        { id: "verification", label: "Fact-Checking Process" },
        { id: "author-review", label: "Author & Reviewer Rules" },
        { id: "corrections", label: "Updates & Corrections" },
      ]}
      extraSchemas={[
        buildArticleSchema({
          title: "Editorial Policy & Fact-Checking Standards",
          description:
            "Content creation, technical verification, and attribution rules for reconcilebankstatement.online.",
          path: "/editorial-policy",
          author: AUTHORS.editorialProduct,
        }),
      ]}
      relatedLinks={[
        {
          title: "Our Team & Author Profiles",
          description:
            "Inspect contributor roles, placeholder profile notices, and review slots.",
          href: "/our-team#author-profiles",
        },
        {
          title: "Data Accuracy Policy",
          description:
            "Understand deterministic matching behavior and limits of automated parsing.",
          href: "/data-accuracy-policy",
        },
        {
          title: "Bank Reconciliation Guide",
          description:
            "Read our complete educational walkthrough using GAAP/IFRS/HMRC cash concepts.",
          href: "/bank-reconciliation-guide",
        },
      ]}
    >
      <section
        id="principles"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          1. Core Editorial Principles
        </h2>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#5A5E67]">
          <li>
            <strong className="text-[#111214]">
              Product Truthfulness First:
            </strong>{" "}
            We only document file formats, matching options, export behavior,
            and security controls that exist in the running application.
          </li>
          <li>
            <strong className="text-[#111214]">
              No Fabricated Expertise:
            </strong>{" "}
            We never invent customer stories, synthetic review scores, fake CPA
            names, or unverified compliance seals.
          </li>
          <li>
            <strong className="text-[#111214]">
              Global Accounting Clarity:
            </strong>{" "}
            Examples distinguish clearly between bank statement perspectives
            (debits reduce a depositor balance; credits increase it) and
            business general ledger perspectives (opposite signs) across US, UK,
            and EU reporting norms.
          </li>
        </ul>
      </section>

      <section
        id="verification"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          2. Research &amp; Fact-Checking Process
        </h2>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#5A5E67]">
          <p>
            Educational pages and product policies are verified against two
            primary sources:
          </p>
          <ol className="list-decimal space-y-2 pl-5">
            <li>
              <strong className="text-[#111214]">
                Application Code &amp; Schema Verification:
              </strong>{" "}
              Every file size cap (`100 MB`), PDF page cap (`200 pages`),
              date tolerance range (`0–31 days`), transaction category, and
              storage key documented on our site matches actual implementation
              parameters.
            </li>
            <li>
              <strong className="text-[#111214]">
                Authoritative Financial Standards:
              </strong>{" "}
              Cash recordkeeping and reconciliation mechanics reference primary
              public guidance from authorities such as{" "}
              <a
                href="https://www.irs.gov/businesses/small-businesses-self-employed/recordkeeping"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#111214] underline"
              >
                IRS Small Business Recordkeeping
              </a>
              ,{" "}
              <a
                href="https://www.gov.uk/keeping-your-pay-tax-records"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#111214] underline"
              >
                UK GOV.UK Business Recordkeeping
              </a>
              , and{" "}
              <a
                href="https://www.ifrs.org/issued-standards/list-of-standards/ias-7-statement-of-cash-flows/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#111214] underline"
              >
                IFRS IAS 7 Statement of Cash Flows
              </a>
              .
            </li>
          </ol>
        </div>
      </section>

      <section
        id="author-review"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          3. Author &amp; Reviewer Attribution Policy
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          Educational guides display an attribution bar linking to{" "}
          <Link
            href="/our-team#author-profiles"
            className="font-semibold text-[#111214] underline"
          >
            Our Team contributor profiles
          </Link>{" "}
          alongside the most recent verification date. When a guide relies on an
          editable organizational placeholder awaiting licensed CPA or Chartered
          Accountant sign-off, that status is disclosed visibly rather than
          masked behind an assumed persona.
        </p>
      </section>

      <section
        id="corrections"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          4. Corrections &amp; Content Independence
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          Content on {SITE_CONFIG.domain} is never shaped by paid software
          placements or undisclosed sponsorships (see our{" "}
          <Link
            href="/affiliate-disclosure"
            className="font-semibold text-[#111214] underline"
          >
            Editorial Independence &amp; Affiliate Disclosure
          </Link>
          ). Substantive corrections can be requested via{" "}
          <Link href="/contact-us" className="font-semibold text-[#111214] underline">
            {SITE_CONFIG.contacts.supportEmail}
          </Link>
          .
        </p>
      </section>
    </TrustPageShell>
  );
}
