"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { BrandLogoMark } from "@/components/landing/brand-logo";
import { BRAND } from "@/lib/landing-data";
import { PRIMARY_NAV_LINKS } from "@/lib/site-config";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 pt-3 pb-2 backdrop-blur-md sm:pt-4">
      <div className="mx-auto max-w-[79.2rem] px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between rounded-full bg-[#111214] px-3 py-2 shadow-lg shadow-black/10 sm:px-4">
          <Link
            href="/"
            className="group flex items-center gap-2 rounded-full pl-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BDF71D] sm:gap-2.5 sm:pl-1.5"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#BDF71D] text-[#111214] transition-transform duration-200 group-hover:scale-105">
              <BrandLogoMark className="h-4 w-4" />
            </span>
            <span className="text-xs font-semibold tracking-wider text-white uppercase sm:text-sm">
              {BRAND.name}
            </span>
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-4 text-xs font-medium text-white/80 lg:flex xl:gap-5"
          >
            {PRIMARY_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-1 py-1 whitespace-nowrap transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BDF71D]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              href="/reconcile"
              className="inline-flex min-h-[38px] items-center justify-center rounded-full bg-[#BDF71D] px-4 py-1.5 text-xs font-semibold text-[#111214] transition-all hover:bg-[#ccff3d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:px-5"
            >
              Reconcile Now
            </Link>
            <button
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
              aria-label={
                mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/85 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BDF71D] lg:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav
            id="mobile-nav-menu"
            aria-label="Mobile navigation"
            className="mt-2 rounded-3xl bg-[#111214] p-4 text-white shadow-xl lg:hidden"
          >
            <div className="flex flex-col space-y-1">
              {PRIMARY_NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-3.5 py-2.5 text-sm font-medium text-white/85 hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-3 border-t border-white/10 pt-3">
              <Link
                href="/reconcile"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex min-h-[42px] w-full items-center justify-center rounded-full bg-[#BDF71D] px-4 text-xs font-semibold text-[#111214] hover:bg-[#ccff3d]"
              >
                Reconcile Now
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
