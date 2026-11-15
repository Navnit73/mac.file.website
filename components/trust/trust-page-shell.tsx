import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { Navbar } from "@/components/landing/navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { Breadcrumbs } from "@/components/trust/breadcrumbs";
import { EditorialAttributionBar } from "@/components/trust/author-reviewer-cards";
import {
  buildBreadcrumbSchema,
  buildOrganizationSchema,
  buildWebsiteSchema,
  JsonLdScript,
  type BreadcrumbItem,
} from "@/components/trust/structured-data";
import {
  SITE_CONFIG,
  type AuthorProfile,
  type ReviewerProfile,
} from "@/lib/site-config";

export type PageSectionLink = {
  id: string;
  label: string;
};

export type RelatedResourceLink = {
  title: string;
  description: string;
  href: string;
};

export type TrustPageShellProps = {
  path: string;
  eyebrow: string;
  title: string;
  lead: string;
  breadcrumbs: BreadcrumbItem[];
  sections?: PageSectionLink[];
  author?: AuthorProfile;
  reviewer?: ReviewerProfile;
  updatedLabel?: string;
  notice?: {
    title: string;
    body: string;
  };
  relatedLinks?: RelatedResourceLink[];
  extraSchemas?: Record<string, unknown>[];
  children: ReactNode;
};

export function TrustPageShell({
  path,
  eyebrow,
  title,
  lead,
  breadcrumbs,
  sections = [],
  author,
  reviewer,
  updatedLabel = SITE_CONFIG.lastReviewedLabel,
  notice,
  relatedLinks = [],
  extraSchemas = [],
  children,
}: TrustPageShellProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationSchema(),
      buildWebsiteSchema(),
      buildBreadcrumbSchema(breadcrumbs, path),
      ...extraSchemas,
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#111214]">
      <JsonLdScript data={jsonLd} />
      <Navbar />

      <main className="flex-1">
        {/* Clean Editorial Page Header */}
        <section className="border-b border-slate-200/80 bg-[#F8FAFC] py-10 sm:py-14">
          <div className="mx-auto max-w-[79.2rem] px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={breadcrumbs} />

            <div className="mt-5 max-w-4xl">
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#5A5E67]">
                {eyebrow}
              </span>

              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#111214] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
                {title}
              </h1>

              <p className="mt-4 text-sm leading-relaxed text-[#5A5E67] sm:text-base sm:leading-relaxed">
                {lead}
              </p>

              {author ? (
                <EditorialAttributionBar
                  author={author}
                  reviewer={reviewer}
                  updatedLabel={updatedLabel}
                />
              ) : (
                <div className="mt-4 font-mono text-xs text-[#5A5E67]">
                  Last updated: {updatedLabel} • {SITE_CONFIG.domain}
                </div>
              )}

              {notice && (
                <div className="mt-5 flex items-start gap-2.5 rounded-2xl border border-amber-200 bg-amber-50/75 px-4 py-3 text-xs leading-relaxed text-amber-950">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                  <div>
                    <span className="font-semibold">{notice.title}: </span>
                    {notice.body}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Body + Optional Table of Contents */}
        <section className="py-10 sm:py-14">
          <div className="mx-auto max-w-[79.2rem] px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-12">
              {sections.length > 0 && (
                <aside className="lg:col-span-3">
                  <nav
                    aria-label="On this page"
                    className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 lg:sticky lg:top-24"
                  >
                    <h2 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#5A5E67]">
                      On This Page
                    </h2>
                    <ul className="mt-3 space-y-2 text-xs font-medium">
                      {sections.map((section) => (
                        <li key={section.id}>
                          <a
                            href={`#${section.id}`}
                            className="block rounded-lg px-2 py-1 text-[#5A5E67] transition-colors hover:bg-white hover:text-[#111214]"
                          >
                            {section.label}
                          </a>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 border-t border-slate-200 pt-4">
                      <Link
                        href="/reconcile"
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-[#111214] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-black"
                      >
                        Try Reconciliation Tool
                        <ArrowRight className="h-3.5 w-3.5 text-[#BDF71D]" />
                      </Link>
                    </div>
                  </nav>
                </aside>
              )}

              <div
                className={
                  sections.length > 0
                    ? "space-y-8 lg:col-span-9"
                    : "mx-auto max-w-4xl space-y-8 lg:col-span-12"
                }
              >
                {children}
              </div>
            </div>
          </div>
        </section>

        {/* Related Resources & Direct Tool CTA */}
        {(relatedLinks.length > 0 || true) && (
          <section className="border-t border-slate-200 bg-[#F8FAFC] py-12 sm:py-16">
            <div className="mx-auto max-w-[79.2rem] px-4 sm:px-6 lg:px-8">
              {relatedLinks.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-[#111214] sm:text-xl">
                    Related Documentation &amp; Trust Resources
                  </h2>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {relatedLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-[#111214]/40"
                      >
                        <div>
                          <h3 className="text-sm font-semibold text-[#111214] group-hover:underline">
                            {item.title}
                          </h3>
                          <p className="mt-1.5 text-xs leading-relaxed text-[#5A5E67]">
                            {item.description}
                          </p>
                        </div>
                        <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#111214]">
                          Read page
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div
                className={`${
                  relatedLinks.length > 0 ? "mt-8" : ""
                } flex flex-col items-start justify-between gap-4 rounded-[24px] bg-[#111214] p-6 text-white sm:flex-row sm:items-center sm:p-8`}
              >
                <div>
                  <h2 className="text-lg font-semibold sm:text-xl">
                    Ready to compare your bank statement against your ledger?
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-white/75 sm:text-sm">
                    Upload PDF, image, CSV, or XLSX files directly in the
                    workbench or test immediately with our sample CSV pair.
                  </p>
                </div>
                <Link
                  href="/reconcile"
                  className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full bg-[#BDF71D] px-6 text-xs font-semibold text-[#111214] transition-colors hover:bg-[#cffb4e] sm:text-sm"
                >
                  Open Workbench
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
