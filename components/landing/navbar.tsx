"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { BrandLogoMark } from "@/components/landing/brand-logo";
import { BRAND } from "@/lib/landing-data";
import { PRIMARY_NAV_LINKS } from "@/lib/site-config";

export function Navbar() {
  const [openForPath, setOpenForPath] = useState<string | null>(null);
  const pathname = usePathname();
  const mobileMenuOpen = openForPath === pathname;
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenForPath(null);
        menuButtonRef.current?.focus();
      }
    };

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setOpenForPath(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [mobileMenuOpen]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 w-full bg-white/90 pt-3 pb-2 backdrop-blur-md sm:pt-4"
    >
      <div className="mx-auto max-w-[79.2rem] px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between rounded-full bg-[#111214] px-3 py-2 shadow-lg shadow-black/10 sm:px-4">
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-2 rounded-full pl-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BDF71D] sm:gap-2.5 sm:pl-1.5"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#BDF71D] text-[#111214] transition-transform duration-200 group-hover:scale-105">
              <BrandLogoMark className="h-4 w-4" />
            </span>
            <span className="truncate text-[11px] font-semibold tracking-wider text-white uppercase sm:text-sm">
              {BRAND.name}
            </span>
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-4 text-xs font-medium text-white/80 lg:flex xl:gap-5"
          >
            {PRIMARY_NAV_LINKS.map((link) => {
              const isCurrent =
                !link.href.includes("#") && pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isCurrent ? "page" : undefined}
                  className={`rounded-md px-1 py-1 whitespace-nowrap transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BDF71D] ${
                    isCurrent ? "text-[#BDF71D] font-semibold" : ""
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <Link
              href="/reconcile"
              aria-current={pathname === "/reconcile" ? "page" : undefined}
              className="inline-flex min-h-[38px] items-center justify-center whitespace-nowrap rounded-full bg-[#BDF71D] px-3.5 py-1.5 text-[11px] font-semibold text-[#111214] transition-all hover:bg-[#ccff3d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:px-5 sm:text-xs"
            >
              Reconcile Now
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
              aria-label={
                mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              onClick={() =>
                setOpenForPath((prev) => (prev === pathname ? null : pathname))
              }
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/85 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BDF71D] lg:hidden"
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
              {PRIMARY_NAV_LINKS.map((link) => {
                const isCurrent =
                  !link.href.includes("#") && pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isCurrent ? "page" : undefined}
                    onClick={() => setOpenForPath(null)}
                    className={`flex min-h-[44px] items-center rounded-xl px-3.5 py-2.5 text-sm font-medium hover:bg-white/10 hover:text-white ${
                      isCurrent ? "bg-white/10 text-[#BDF71D]" : "text-white/85"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <div className="mt-3 border-t border-white/10 pt-3">
              <Link
                href="/reconcile"
                aria-current={pathname === "/reconcile" ? "page" : undefined}
                onClick={() => setOpenForPath(null)}
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-[#BDF71D] px-4 text-xs font-semibold text-[#111214] hover:bg-[#ccff3d]"
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
