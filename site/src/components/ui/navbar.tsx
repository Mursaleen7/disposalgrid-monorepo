"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

/* ─── SVG Icons (Uber-style, no Heroicons) ─── */

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

/* ─── Nav Links ─── */

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Dispose Of", href: "/materials" },
  { label: "For Businesses", href: "/business" },
  { label: "HHW Events", href: "/events" },
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

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-uber-base ease-uber",
          scrolled
            ? "bg-white border-b border-uber-gray-100"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-[1440px] h-full flex items-center justify-between px-6 lg:px-12">
          {/* ─── Left: Logo ─── */}
          <Link href="/" className="shrink-0">
            <Logo variant="dark" />
          </Link>

          {/* ─── Center: Nav Links (desktop only) ─── */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-base font-medium text-uber-black hover:text-uber-gray-600 transition-colors duration-uber-fast ease-uber"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ─── Right: Actions ─── */}
          <div className="flex items-center gap-3">
            {/* Add your facility — pill CTA */}
            <Link
              href="/add-facility"
              className="hidden sm:inline-flex items-center h-10 px-5 bg-uber-black text-white text-sm font-medium rounded-uber-pill hover:bg-uber-gray-800 transition-colors duration-uber-fast ease-uber"
            >
              Add your facility
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 text-uber-black"
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
                className="text-[28px] font-bold text-uber-black"
              >
                {link.label}
              </Link>
            ))}

            <hr className="border-uber-gray-100" />

            <Link
              href="/add-facility"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center h-12 px-6 bg-uber-black text-white text-base font-medium rounded-uber-pill"
            >
              Add your facility
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
