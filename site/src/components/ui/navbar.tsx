"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

/* ─── SVG Icons ─── */

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/* ─── Search Icon ─── */

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

/* ─── User Icon ─── */

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

/* ─── Nav Links ─── */

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Disposal Services", href: "/materials" },
  { label: "HHW Events", href: "/events" },
  { label: "For Businesses", href: "/business" },
  { label: "About", href: "/about" },
];

/* ─── Props ─── */

export interface NavbarProps {
  /** Override default transparent behavior — always show border */
  alwaysBordered?: boolean;
}

/* ─── Component ─── */

export function Navbar({ alwaysBordered = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  useEffect(() => {
    if (alwaysBordered) {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [alwaysBordered]);

  // On homepage: transparent with white text, scrolled = solid white with dark text
  // On other pages: always solid white with dark text
  const isTransparent = isHomepage && !scrolled;

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 ease-in-out",
          isTransparent
            ? "bg-transparent"
            : "bg-white border-b border-uber-gray-100 shadow-sm"
        )}
      >
        {/* Gradient wash for legibility on homepage */}
        {isTransparent && (
          <div className="absolute inset-0 rubicon-nav-wash pointer-events-none" />
        )}

        <div className="relative z-10 mx-auto max-w-[1280px] h-full flex items-center justify-between px-6 lg:px-10">
          {/* ─── Left: Logo ─── */}
          <Link href="/" className="shrink-0">
            <Logo variant={isTransparent ? "light" : "dark"} />
          </Link>

          {/* ─── Center: Nav Links (desktop only) ─── */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-[15px] font-medium transition-colors duration-200 font-rubicon",
                  isTransparent
                    ? "text-white/90 hover:text-white"
                    : "text-uber-gray-700 hover:text-uber-black"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ─── Right: Utility cluster ─── */}
          <div className="flex items-center gap-4">
            {/* Search + User icons */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                className={cn(
                  "flex items-center justify-center w-9 h-9 rounded-full transition-colors",
                  isTransparent
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : "text-uber-gray-500 hover:text-uber-black hover:bg-uber-gray-50"
                )}
                aria-label="Search"
              >
                <SearchIcon />
              </button>
              <button
                className={cn(
                  "flex items-center justify-center w-9 h-9 rounded-full transition-colors",
                  isTransparent
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : "text-uber-gray-500 hover:text-uber-black hover:bg-uber-gray-50"
                )}
                aria-label="Account"
              >
                <UserIcon />
              </button>
            </div>

            {/* Get Support link */}
            <Link
              href="/support"
              className={cn(
                "hidden md:inline-flex text-[14px] font-medium transition-colors font-rubicon",
                isTransparent
                  ? "text-white/80 hover:text-white"
                  : "text-uber-gray-600 hover:text-uber-black"
              )}
            >
              Get Support
            </Link>

            {/* Ghost CTA */}
            <Link
              href="/search"
              className={cn(
                "hidden sm:inline-flex items-center h-10 px-6 text-[14px] font-semibold rounded-full border-2 transition-all duration-200 font-rubicon",
                isTransparent
                  ? "border-white/50 text-white hover:border-white hover:bg-white/10"
                  : "border-rubicon-teal text-rubicon-teal hover:bg-rubicon-teal hover:text-white"
              )}
            >
              Get started
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "lg:hidden flex items-center justify-center w-10 h-10",
                isTransparent ? "text-white" : "text-uber-black"
              )}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <CloseIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Mobile Menu Overlay ─── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-[72px] lg:hidden">
          <div className="flex flex-col px-6 py-8 gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-[28px] font-bold text-uber-black font-rubicon"
              >
                {link.label}
              </Link>
            ))}

            <hr className="border-uber-gray-100" />

            <Link
              href="/support"
              onClick={() => setMobileOpen(false)}
              className="text-[18px] font-medium text-uber-gray-600 font-rubicon"
            >
              Get Support
            </Link>

            <Link
              href="/search"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center h-12 px-6 bg-rubicon-teal text-white text-base font-semibold rounded-full font-rubicon"
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
