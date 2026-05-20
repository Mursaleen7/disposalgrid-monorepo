"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "./logo";

/* ─── Social Icons ─── */

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

/* ─── Footer Columns Data ─── */

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Products",
    links: [
      { label: "Search Locations", href: "/search" },
      { label: "Add Your Facility", href: "/add-facility" },
      { label: "API Access", href: "/api" },
    ],
  },
  {
    title: "Dumpster Rentals",
    links: [
      { label: "Hauler Directory", href: "#" },
      { label: "Roll-off Rentals", href: "#" },
      { label: "Commercial Service", href: "/business" },
    ],
  },
  {
    title: "Our Company",
    links: [
      { label: "About DisposalGrid", href: "/about" },
      { label: "Data Sources", href: "/data-sources" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Sustainability Hub",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "HHW Events", href: "/events" },
      { label: "Disposal Guides", href: "/guides" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "For Businesses", href: "/business" },
      { label: "Municipalities", href: "#" },
      { label: "Contractors", href: "#" },
    ],
  },
  {
    title: "Waste Streams",
    links: [
      { label: "Hazardous Waste", href: "#" },
      { label: "E-Waste", href: "#" },
      { label: "Bulky Items", href: "#" },
    ],
  },
  {
    title: "Materials",
    links: [
      { label: "Electronics", href: "/dispose-of/electronics" },
      { label: "Paint & Solvents", href: "/dispose-of/paint-solvents" },
      { label: "Batteries", href: "/dispose-of/batteries" },
      { label: "Mattresses", href: "/dispose-of/mattresses" },
      { label: "Tires", href: "/dispose-of/tires" },
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
  const [email, setEmail] = useState("");

  return (
    <footer className={`bg-rubicon-teal font-rubicon ${className ?? ""}`}>
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-16 md:py-20">
        {/* ─── Top Row: Logo + Social + Newsletter ─── */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-16 pb-12 border-b border-white/10">
          {/* Logo */}
          <Link href="/">
            <Logo variant="light" />
          </Link>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {[
              { icon: <XIcon />, label: "X", href: "#" },
              { icon: <FacebookIcon />, label: "Facebook", href: "#" },
              { icon: <LinkedInIcon />, label: "LinkedIn", href: "#" },
              { icon: <InstagramIcon />, label: "Instagram", href: "#" },
              { icon: <YouTubeIcon />, label: "YouTube", href: "#" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex items-center justify-center w-9 h-9 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Newsletter Capture */}
          <div className="flex items-center w-full md:w-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
              className="flex w-full md:w-auto"
            >
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 px-4 bg-white text-[14px] text-uber-black placeholder:text-uber-gray-400 rounded-l-lg border-0 outline-none w-full md:w-[240px]"
              />
              <button
                type="submit"
                className="h-11 px-5 bg-rubicon-teal-light text-white text-[14px] font-semibold rounded-r-lg hover:bg-rubicon-teal-mid transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* ─── Link Columns ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-8 lg:gap-6 mb-16">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="space-y-4">
              <h4 className="text-[13px] font-bold text-white uppercase tracking-wider">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-white/40 hover:text-white transition-colors duration-200"
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
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-[13px] text-white/30">
              © {new Date().getFullYear()} DisposalGrid. All rights reserved.
            </p>
            <p className="text-[13px] text-white/30">
              Data sourced from EPA ECHO, Envirofacts &amp; 3,200+ municipal databases.
              Updated weekly.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
