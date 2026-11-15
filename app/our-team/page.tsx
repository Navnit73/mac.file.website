import Link from "next/link";
import {
  AuthorProfileCard,
  ReviewerProfileCard,
} from "@/components/trust/author-reviewer-cards";
import { TrustPageShell } from "@/components/trust/trust-page-shell";
import {
  AUTHORS,
  createPageMetadata,
  REVIEWERS,
  SITE_CONFIG,
} from "@/lib/site-config";

export const metadata = createPageMetadata({
  path: "/our-team",
  title: `Our Team & Contributor Profiles | ${SITE_CONFIG.brandName}`,
  description:
    "View transparent product ownership, editorial responsibilities, and role-based review attribution for reconcilebankstatement.online.",
});

export default function OurTeamPage() {
  const author = AUTHORS.editorialProduct;
  const reviewer = REVIEWERS.technicalReview;

  return (
    <TrustPageShell
      path="/our-team"
      eyebrow="Team & Contributors"
      title="Product & Editorial Contributors"
      lead="Transparency starts with honesty about who builds and reviews financial software documentation. Rather than publishing fabricated staff names or invented accounting titles, this page publishes verified engineering and documentation ownership."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Our Team" },
      ]}
      sections={[
        { id: "team-structure", label: "Core Team Functions" },
        { id: "author-profiles", label: "Author & Reviewer Profiles" },
        { id: "standards", label: "Accountability & Contact" },
      ]}
      notice={{
        title: "No Fabricated Personas Policy",
        body: "Attribution on reconcilebankstatement.online reflects the engineering, parsing, and documentation teams directly—without invented individual biographies or claimed external CPA/ACCA sign-off.",
      }}
      relatedLinks={[
        {
          title: "Editorial Policy",
          description:
            "Read how educational accounting guides are researched, verified, and updated.",
          href: "/editorial-policy",
        },
        {
          title: "How We Work",
          description:
            "Explore our product quality engineering and statement parsing principles.",
          href: "/how-we-work",
        },
        {
          title: "About Us",
          description:
            "Learn about our mission, target users, and company operating details.",
          href: "/about-us",
        },
      ]}
    >
      <section
        id="team-structure"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          How Our Functions Are Organized
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-5">
            <h3 className="text-sm font-semibold text-[#111214]">
              Product Engineering &amp; Parsing
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#5A5E67]">
              Maintains byte-level file validation, CSV/XLSX normalization across
              US/UK/EU conventions, matching algorithms, and balance tie-out
              verification.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-5">
            <h3 className="text-sm font-semibold text-[#111214]">
              Editorial Documentation
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#5A5E67]">
              Writes user guides grounded strictly in observed software
              functionality and standard financial terminology—avoiding marketing
              exaggeration.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-5">
            <h3 className="text-sm font-semibold text-[#111214]">
              Accounting Review (Slot Ready)
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#5A5E67]">
              Dedicated review architecture built into every educational guide so
              named accounting professionals can be credited once engaged.
            </p>
          </div>
        </div>
      </section>

      <section id="author-profiles" className="space-y-4">
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          Reusable Author &amp; Reviewer Profiles
        </h2>
        <AuthorProfileCard author={author} />
        <ReviewerProfileCard reviewer={reviewer} />
      </section>

      <section
        id="standards"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214]">
          Corrections, Attribution &amp; Inquiries
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#5A5E67]">
          If you spot an imprecise accounting explanation, an ambiguous UI label,
          or an outdated format detail anywhere on {SITE_CONFIG.domain}, contact
          our team directly via our{" "}
          <Link href="/contact-us" className="font-semibold text-[#111214] underline">
            Contact Us page
          </Link>{" "}
          or review our{" "}
          <Link
            href="/editorial-policy"
            className="font-semibold text-[#111214] underline"
          >
            Editorial Policy
          </Link>
          .
        </p>
      </section>
    </TrustPageShell>
  );
}
