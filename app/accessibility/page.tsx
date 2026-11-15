import Link from "next/link";
import { createPageMetadata, SITE_CONFIG } from "@/lib/site-config";
import { TrustPageShell } from "@/components/trust/trust-page-shell";

export const metadata = createPageMetadata({
  path: "/accessibility",
  title: `Accessibility Statement | ${SITE_CONFIG.brandName} (${SITE_CONFIG.domain})`,
  description:
    "ClearTie's accessibility commitment for reconcilebankstatement.online: keyboard support, contrast, semantic landmarks, ARIA controls, and accessibility contact.",
});

export default function AccessibilityPage() {
  return (
    <TrustPageShell
      path="/accessibility"
      eyebrow="Accessibility"
      title="Accessibility Commitment"
      lead={`We want finance teams, small business owners, and accountants across every ability to use ${SITE_CONFIG.domain} smoothly. Here are the practices we follow and how to report any barrier you encounter.`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Accessibility" },
      ]}
      sections={[
        { id: "standards", label: "Target Standards & Practices" },
        { id: "known-limits", label: "File Upload Accessibility Notes" },
        { id: "feedback", label: "Accessibility Feedback Contact" },
      ]}
      relatedLinks={[
        {
          title: "Contact Us",
          description:
            "Reach accessibility or product support directly by email.",
          href: "/contact-us",
        },
        {
          title: "How It Works",
          description:
            "Overview of interactive form controls and export formats.",
          href: "/how-it-works",
        },
        {
          title: "FAQ",
          description:
            "Common questions about file formats and reconciliation outputs.",
          href: "/faq",
        },
      ]}
    >
      <section
        id="standards"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          1. Design &amp; Engineering Practices Implemented
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#5A5E67]">
          <li>
            <strong className="text-[#111214]">Semantic Landmarks:</strong>{" "}
            Single-level progressive heading hierarchies (`h1` to `h5` without
            skipped levels), labeled navigation regions, and explicit{" "}
            <code>&lt;label&gt;</code> bindings across inputs, sliders, and file
            dropzones.
          </li>
          <li>
            <strong className="text-[#111214]">
              Keyboard &amp; Focus Visibility:
            </strong>{" "}
            Interactive buttons, switches (`role=&quot;switch&quot;` +
            `aria-checked`), FAQ accordions (`aria-expanded` / `aria-controls`),
            and file browse triggers expose visible focus rings.
          </li>
          <li>
            <strong className="text-[#111214]">Readable Contrast:</strong>{" "}
            Dark charcoal (`#111214`) typography on white and light neutral
            surfaces (`#F8FAFC`) without text traps or motion-heavy animation
            barriers.
          </li>
          <li>
            <strong className="text-[#111214]">Live Error Announcements:</strong>{" "}
            Form and upload validation alerts use `role=&quot;alert&quot;` so
            screen readers announce missing files or password issues promptly.
          </li>
        </ul>
      </section>

      <section
        id="known-limits"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          2. Ongoing Improvement Scope
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          We aim toward WCAG 2.1 Level AA usability across all public pages and
          workbenches. Because downloadable `.xlsx` spreadsheets and third-party
          scanned bank PDFs originate outside the browser, complex external PDFs
          may present visual layout limitations unrelated to the web interface.
        </p>
      </section>

      <section
        id="feedback"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          3. Report an Accessibility Barrier
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          If you experience difficulty navigating any control, screen-reader
          label, or export flow on {SITE_CONFIG.domain}, please email{" "}
          <a
            href={`mailto:${SITE_CONFIG.contacts.accessibilityEmail}`}
            className="font-semibold text-[#111214] underline"
          >
            {SITE_CONFIG.contacts.accessibilityEmail}
          </a>{" "}
          or visit{" "}
          <Link
            href="/contact-us"
            className="font-semibold text-[#111214] underline"
          >
            Contact Us
          </Link>{" "}
          with the page URL and browser/assistive tool used.
        </p>
      </section>
    </TrustPageShell>
  );
}
