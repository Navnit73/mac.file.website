"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { BRAND } from "@/lib/landing-data";

type NavbarProps = {
  onOpenTrial: (planId?: string) => void;
};

const NAV_LINKS = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#organize", label: `Why ${BRAND.name}` },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "Help Center" },
];

export function Navbar({ onOpenTrial }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 pt-3 pb-2 backdrop-blur-md sm:pt-4">
      <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between rounded-full bg-[#111214] px-3 py-2 shadow-lg shadow-black/10 sm:px-4">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-2 pl-1 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BDF71D] rounded-full sm:gap-2.5 sm:pl-1.5"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#BDF71D] text-[#111214] transition-transform duration-200 group-hover:scale-105">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M4 8c4-2 8 2 16 0" />
                <path d="M4 12c4-2 8 2 16 0" />
                <path d="M4 16c4-2 8 2 16 0" />
              </svg>
            </span>
            <span className="text-xs font-semibold tracking-wider text-white uppercase sm:text-sm">
              {BRAND.name}
            </span>
          </a>

          {/* Centered Desktop Nav Links */}
          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-6 lg:gap-7 text-xs font-medium text-white/80"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-1 py-1 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BDF71D]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Pill Actions + Mobile Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => onOpenTrial("pro")}
              className="hidden sm:inline-flex min-h-[38px] items-center justify-center rounded-full border border-[#BDF71D]/70 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#BDF71D]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BDF71D]"
            >
              Buy License
            </button>
            <button
              type="button"
              onClick={() => onOpenTrial("trial")}
              className="inline-flex min-h-[38px] items-center justify-center rounded-full bg-[#BDF71D] px-3.5 py-1.5 text-xs font-semibold text-[#111214] transition-all hover:bg-[#ccff3d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:px-4"
            >
              Start Free Trial
            </button>
            <button
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/85 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BDF71D] md:hidden"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <nav
            id="mobile-nav-menu"
            aria-label="Mobile navigation"
            className="mt-2 rounded-3xl bg-[#111214] p-4 text-white shadow-xl md:hidden"
          >
            <div className="flex flex-col space-y-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-3.5 py-2.5 text-sm font-medium text-white/85 hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTrial("pro");
                }}
                className="inline-flex min-h-[40px] items-center justify-center rounded-full border border-[#BDF71D]/70 px-4 text-xs font-semibold text-white hover:bg-[#BDF71D]/10"
              >
                Buy License
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTrial("trial");
                }}
                className="inline-flex min-h-[40px] items-center justify-center rounded-full bg-[#BDF71D] px-4 text-xs font-semibold text-[#111214] hover:bg-[#ccff3d]"
              >
                Free Trial
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
