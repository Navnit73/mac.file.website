import Link from "next/link";
import { Mail, ShieldCheck } from "lucide-react";
import { BrandLogoMark } from "@/components/landing/brand-logo";
import { FOOTER_NAV_GROUPS, SITE_CONFIG } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-[#F8FAFC] text-[#5A5E67]">
      <div className="mx-auto max-w-[79.2rem] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Brand, Ownership & Direct Contact Column */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111214]"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#111214] text-[#BDF71D]">
                <BrandLogoMark className="h-4 w-4" />
              </span>
              <span className="text-sm font-semibold tracking-wider text-[#111214] uppercase">
                {SITE_CONFIG.brandName}
              </span>
              <span className="rounded-full border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-[11px] font-medium text-[#5A5E67]">
                {SITE_CONFIG.domain}
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
              Online bank statement and business ledger comparison software
              for small businesses, finance teams, freelancers, bookkeepers,
              and accountants across US, UK, and EU formats.
            </p>

            <div className="mt-5 rounded-2xl border border-slate-200/90 bg-white p-4 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-[#111214]">
                <ShieldCheck className="h-4 w-4 text-emerald-700" />
                <span>Product Ownership &amp; Support</span>
              </div>
              <dl className="mt-2.5 space-y-1.5 text-[11px] leading-relaxed text-[#5A5E67]">
                <div>
                  <dt className="inline font-semibold text-[#111214]">
                    Website:{" "}
                  </dt>
                  <dd className="inline">{SITE_CONFIG.domain}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-[#111214]">
                    Operator:{" "}
                  </dt>
                  <dd className="inline">{SITE_CONFIG.legalEntityName}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-[#111214]">
                    Support:{" "}
                  </dt>
                  <dd className="inline">
                    <a
                      href={`mailto:${SITE_CONFIG.contacts.supportEmail}`}
                      className="inline-flex items-center gap-1 font-medium text-[#111214] underline decoration-slate-300 underline-offset-2 hover:decoration-[#111214]"
                    >
                      <Mail className="h-3 w-3" />
                      {SITE_CONFIG.contacts.supportEmail}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* 3 Structured Navigation Columns */}
          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-8">
            {FOOTER_NAV_GROUPS.map((group) => (
              <nav key={group.heading} aria-label={group.heading}>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-[#111214]">
                  {group.heading}
                </h2>
                <ul className="mt-3 space-y-1 text-xs sm:text-[13px]">
                  {group.links.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="inline-flex min-h-[28px] min-w-[28px] items-center py-1 text-[#5A5E67] transition-colors hover:text-[#111214] hover:underline hover:underline-offset-4"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Bottom Copyright & Compliance Bar */}
        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-[#5A5E67] md:flex-row md:items-center">
          <div className="space-y-1">
            <p className="font-medium text-[#111214]">
              &copy; {SITE_CONFIG.copyrightYear} {SITE_CONFIG.domain} (
              {SITE_CONFIG.brandName}). All rights reserved.
            </p>
            <p className="text-[11px] text-[#5A5E67]">
              Decision-support software only—review exported workpapers with a
              qualified accountant before tax filing or financial reporting.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-medium">
            <Link
              href="/about-us"
              className="inline-flex min-h-[28px] min-w-[28px] items-center py-1 hover:text-[#111214]"
            >
              About Us
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex min-h-[28px] min-w-[28px] items-center py-1 hover:text-[#111214]"
            >
              Contact Us
            </Link>
            <Link
              href="/privacy"
              className="inline-flex min-h-[28px] min-w-[28px] items-center py-1 hover:text-[#111214]"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="inline-flex min-h-[28px] min-w-[28px] items-center py-1 hover:text-[#111214]"
            >
              Terms
            </Link>
            <Link
              href="/security"
              className="inline-flex min-h-[28px] min-w-[28px] items-center py-1 hover:text-[#111214]"
            >
              Security
            </Link>
            <Link
              href="/refund-policy"
              className="inline-flex min-h-[28px] min-w-[28px] items-center py-1 hover:text-[#111214]"
            >
              Refund Policy
            </Link>
            <a
              href="/sitemap.xml"
              className="inline-flex min-h-[28px] min-w-[28px] items-center py-1 hover:text-[#111214]"
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
