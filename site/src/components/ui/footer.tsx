import React from "react";
import Link from "next/link";
import { Logo } from "./logo";

/* ─── Footer Column Types ─── */

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

/* ─── Footer Data ─── */

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Resources",
    links: [
      { label: "Materials", href: "/materials" },
      { label: "States", href: "/search" },
      { label: "Counties", href: "/search" },
      { label: "HHW Events", href: "/events" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/search" },
      { label: "Data Sources", href: "/search" },
      { label: "API", href: "/search" },
      { label: "Blog", href: "/search" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/search" },
      { label: "Terms", href: "/search" },
      { label: "Sitemap", href: "/sitemap.xml" },
      { label: "Contact", href: "/search" },
    ],
  },
];

/* ─── Props ─── */

export interface FooterProps {
  /** Optional class overrides on the footer root */
  className?: string;
}

/* ─── Component ─── */

export function Footer({ className }: FooterProps) {
  return (
    <footer className={`bg-uber-black ${className ?? ""}`}>
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-16">
        {/* ─── Top Grid: 4 columns ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Logo + Tagline */}
          <div className="space-y-4">
            <Link href="/">
              <Logo variant="light" />
            </Link>

            <p className="text-sm text-uber-gray-400 leading-relaxed max-w-[280px]">
              Find legal disposal for hazardous waste, electronics,
              mattresses, and more — verified weekly from government data.
            </p>

            <p className="text-xs text-uber-gray-500">
              Data sourced from EPA ECHO, Envirofacts &amp; 3,200+ municipal
              databases.
            </p>
          </div>

          {/* Columns 2–4: Link lists */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="space-y-4">
              <h4 className="text-sm font-medium text-white">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-uber-gray-400 hover:text-white transition-colors duration-uber-fast ease-uber"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ─── Bottom Bar ─── */}
        <div className="mt-16 pt-8 border-t border-uber-gray-800">
          <p className="text-sm text-uber-gray-500">
            © {new Date().getFullYear()} DisposalGrid · Data sourced weekly
            from EPA ECHO and Envirofacts
          </p>
        </div>
      </div>
    </footer>
  );
}
