"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Building2,
  Store,
  Truck,
  ArrowRight,
  Search,
} from "lucide-react";

/* ═══════════════════════════════════════════════
   RUBICON-STYLE HOMEPAGE — DisposalGrid
   Corporate, authoritative, environmentally conscious
   ═══════════════════════════════════════════════ */

/* ─── Accordion Data ─── */

const ACCORDION_ITEMS = [
  {
    id: "platform",
    title: "One platform",
    content:
      "A single, unified platform that aggregates disposal locations, regulations, and events from every state and county in the US. No more searching across dozens of government websites.",
  },
  {
    id: "database",
    title: "One database",
    content:
      "Over 15,000 verified disposal facilities sourced from EPA ECHO, Envirofacts, and 3,200+ municipal databases — updated weekly to ensure accuracy.",
  },
  {
    id: "search",
    title: "One search",
    content:
      "Enter your material and location. Get instant results with verified hours, accepted items, fees, and directions — no guesswork, no phone calls.",
  },
];

/* ─── Who We Serve Data ─── */

const SERVE_CARDS = [
  {
    icon: Building2,
    title: "Households",
    desc: "Find nearby drop-off points for electronics, paint, batteries, mattresses, and other hard-to-dispose items your regular trash service won't take.",
    link: "/search",
    linkText: "Household solutions",
  },
  {
    icon: Store,
    title: "Businesses",
    desc: "Compliance-ready disposal guidance for commercial waste streams. Locate permitted facilities that accept your materials at scale.",
    link: "/business",
    linkText: "Business solutions",
  },
  {
    icon: Truck,
    title: "Municipalities",
    desc: "List your facilities, promote HHW events, and ensure residents can find your services. Data integration via our open API.",
    link: "/add-facility",
    linkText: "Municipal partnerships",
  },
];

/* ─── Blog Data ─── */

const BLOG_POSTS = [
  {
    category: "Recycling Guide",
    date: "April 28, 2026",
    title: "The Complete Guide to E-Waste Recycling in 2026",
    slug: "/blog/e-waste-recycling-guide-2026",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop",
  },
  {
    category: "Sustainability",
    date: "April 22, 2026",
    title: "How Circular Economy Principles Are Reshaping Waste Management",
    slug: "/blog/circular-economy-waste-management",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop",
  },
  {
    category: "Community",
    date: "April 15, 2026",
    title: "Why Your County's HHW Events Matter More Than You Think",
    slug: "/blog/county-hhw-events-importance",
    image:
      "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=600&h=400&fit=crop",
  },
];

/* ─── Fade In Animation ─── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

/* ═══════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════ */

export default function HomePage() {
  const [openAccordion, setOpenAccordion] = useState<string | null>("platform");

  return (
    <div className="flex flex-col min-h-screen font-rubicon -mt-[72px]">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 1 — HERO
          Full viewport, background image + dark overlay
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Dark overlay wash */}
        <div className="rubicon-hero-overlay" />

        {/* Hero Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 text-center max-w-[900px] mx-auto px-6"
        >
          {/* Overline */}
          <motion.span
            variants={fadeUp}
            className="rubicon-overline text-white/70 mb-6 block"
          >
            WASTE, RECYCLING, AND SUSTAINABILITY
          </motion.span>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-[40px] md:text-[56px] lg:text-[68px] font-light text-white leading-[1.05] tracking-[-1.5px] mb-8"
          >
            National Hazardous Waste & <br className="hidden md:block" />
            Material Disposal Directory.
          </motion.h1>

          {/* Massive Search Bar */}
          <motion.form
            variants={fadeUp}
            action="/search"
            className="w-full max-w-[850px] mx-auto bg-white rounded-[24px] md:rounded-full flex flex-col md:flex-row items-center p-2 shadow-2xl mt-8 md:mt-12"
          >
            <div className="flex-1 flex items-center px-4 md:px-6 w-full h-14 md:h-16">
              <Search className="text-uber-gray-400 w-[22px] h-[22px] shrink-0" />
              <input
                type="text"
                name="q"
                placeholder="What material? (e.g. Paint, E-waste)"
                className="w-full bg-transparent border-none outline-none text-uber-black text-[16px] md:text-[18px] ml-4 placeholder:text-uber-gray-400 h-full"
              />
            </div>
            
            <div className="hidden md:block w-[1px] h-10 bg-uber-gray-200 shrink-0" />
            <div className="md:hidden w-[calc(100%-32px)] mx-auto h-[1px] bg-uber-gray-100 shrink-0" />
            
            <div className="flex-1 flex items-center px-4 md:px-6 w-full h-14 md:h-16">
              <svg className="text-uber-gray-400 w-[22px] h-[22px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <input
                type="text"
                name="loc"
                placeholder="Location (ZIP or City)"
                className="w-full bg-transparent border-none outline-none text-uber-black text-[16px] md:text-[18px] ml-4 placeholder:text-uber-gray-400 h-full"
              />
            </div>
            
            <button
              type="submit"
              className="bg-rubicon-teal hover:bg-rubicon-teal-light transition-colors text-white px-8 md:px-12 h-14 md:h-16 w-full md:w-auto rounded-[18px] md:rounded-full text-[16px] md:text-[17px] font-semibold shrink-0 mt-2 md:mt-0 md:ml-2 flex items-center justify-center"
            >
              Find Drop-off
            </button>
          </motion.form>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-[1px] h-[60px] bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 2 — WHAT WE DO
          White background, split-screen typographical
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-white py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start"
          >
            {/* Left: Overline + Heading */}
            <motion.div variants={fadeUp}>
              <span className="rubicon-overline text-rubicon-teal-accent mb-5 block">
                WHAT WE DO
              </span>
              <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold text-rubicon-teal leading-[1.1] tracking-[-1px]">
                Comprehensive waste disposal guidance for every material,
                everywhere.
              </h2>
            </motion.div>

            {/* Right: Body copy */}
            <motion.div variants={fadeUp} className="lg:pt-14">
              <p className="text-[17px] text-uber-gray-600 leading-[1.8] mb-6">
                DisposalGrid is the nation&apos;s most complete directory of
                verified disposal locations. We aggregate data from the EPA,
                state environmental agencies, and over 3,200 municipal
                databases to give you one simple answer to a frustrating
                question: <em>&quot;Where do I take this?&quot;</em>
              </p>
              <p className="text-[17px] text-uber-gray-600 leading-[1.8]">
                From hazardous household chemicals to electronics, mattresses,
                tires, and beyond — we cover the materials your regular trash
                service won&apos;t accept, with verified hours, fees, and
                directions for every facility.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 3 — HOW WE DO IT
          Deep teal background, 50/50 with accordion
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-rubicon-teal py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
          >
            {/* Left: Heading + CTA */}
            <motion.div variants={fadeUp}>
              <span className="rubicon-overline text-white/50 mb-5 block">
                HOW WE DO IT
              </span>
              <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold text-white leading-[1.1] tracking-[-1px] mb-8">
                Everything you need. One search away.
              </h2>
              <Link
                href="/search"
                className="rubicon-pill rubicon-pill-solid"
              >
                Get Started
              </Link>
            </motion.div>

            {/* Right: Accordion */}
            <motion.div variants={fadeUp} className="space-y-0">
              {ACCORDION_ITEMS.map((item) => {
                const isOpen = openAccordion === item.id;
                return (
                  <div
                    key={item.id}
                    className="border-t border-white/15 last:border-b"
                  >
                    <button
                      onClick={() =>
                        setOpenAccordion(isOpen ? null : item.id)
                      }
                      className={`w-full flex items-center justify-between py-6 text-left transition-colors ${
                        isOpen ? "rubicon-accordion-open" : ""
                      }`}
                    >
                      <span className="text-[20px] md:text-[22px] font-semibold text-white">
                        {item.title}
                      </span>
                      <ChevronDown
                        size={22}
                        className={`rubicon-caret text-white/60 transition-transform duration-300 shrink-0 ml-4 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-[200px] pb-6" : "max-h-0"
                      }`}
                    >
                      <p className="text-[16px] text-white/60 leading-[1.7] max-w-[480px]">
                        {item.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 4 — WHO WE SERVE
          Light gray background, 3-column card grid
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-rubicon-gray py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-16">
              <span className="rubicon-overline text-rubicon-teal-accent mb-5 block">
                WHO WE SERVE
              </span>
              <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold text-rubicon-teal leading-[1.1] tracking-[-1px]">
                Built for everyone
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {SERVE_CARDS.map((card) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    variants={fadeUp}
                    className="bg-white rounded-2xl p-8 md:p-10 flex flex-col"
                  >
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-rubicon-gray flex items-center justify-center mb-6">
                      <Icon
                        size={28}
                        strokeWidth={1.5}
                        className="text-rubicon-teal"
                      />
                    </div>

                    <h3 className="text-[22px] font-bold text-rubicon-teal mb-3">
                      {card.title}
                    </h3>
                    <p className="text-[15px] text-uber-gray-500 leading-[1.7] mb-6 flex-1">
                      {card.desc}
                    </p>

                    <Link
                      href={card.link}
                      className="text-[15px] font-semibold text-rubicon-teal-accent hover:text-rubicon-teal underline underline-offset-4 decoration-rubicon-teal-accent/30 hover:decoration-rubicon-teal transition-colors inline-flex items-center gap-1"
                    >
                      {card.linkText}
                      <ArrowRight size={16} />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 5 — EXPERT GUIDANCE
          White background, 50/50 image-to-text split
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-white py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          >
            {/* Left: Image */}
            <motion.div
              variants={fadeUp}
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop"
                alt="Workers sorting materials at recycling facility"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Right: Text */}
            <motion.div variants={fadeUp}>
              <span className="rubicon-overline text-rubicon-teal-accent mb-5 block">
                EXPERT GUIDANCE
              </span>
              <h2 className="text-[32px] md:text-[40px] lg:text-[44px] font-bold text-rubicon-teal leading-[1.1] tracking-[-1px] mb-6">
                Navigate complex disposal regulations with confidence.
              </h2>
              <p className="text-[17px] text-uber-gray-600 leading-[1.8] mb-8">
                Every state has different rules. Every county has different
                facilities. We cut through the complexity by verifying each
                location&apos;s accepted materials, operating hours, and fees —
                so you can dispose of items legally, safely, and without the
                runaround.
              </p>
              <Link
                href="/materials"
                className="rubicon-pill rubicon-pill-outline"
              >
                Explore advisory services
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 6 — LATEST FROM THE BLOG
          White background, 3-column card grid
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-rubicon-gray py-24 md:py-32 lg:py-36">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-14">
              <span className="rubicon-overline text-rubicon-teal-accent mb-5 block">
                LATEST FROM THE BLOG
              </span>
              <h2 className="text-[32px] md:text-[40px] font-bold text-rubicon-teal leading-[1.1] tracking-[-1px]">
                Stories &amp; insights
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {BLOG_POSTS.map((post) => (
                <motion.div key={post.slug} variants={fadeUp}>
                  <Link
                    href={post.slug}
                    className="group block bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    {/* Card Image */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[12px] font-semibold text-rubicon-teal-accent uppercase tracking-wider">
                          {post.category}
                        </span>
                        <span className="text-[12px] text-uber-gray-400">
                          {post.date}
                        </span>
                      </div>
                      <h3 className="text-[18px] font-bold text-rubicon-teal leading-[1.3] mb-4 group-hover:text-rubicon-teal-mid transition-colors">
                        {post.title}
                      </h3>
                      <span className="text-[14px] font-semibold text-rubicon-teal-accent group-hover:underline">
                        Read story →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 7 — PRE-FOOTER CTA
          Deep teal background with large watermark logo
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative bg-rubicon-teal py-24 md:py-32 lg:py-40 overflow-hidden">
        {/* Watermark Logo — large, low-opacity */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            width="500"
            height="500"
            viewBox="0 0 32 32"
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[300px] h-[300px] md:w-[500px] md:h-[500px]"
          >
            <path
              d="M26 12C26 6.477 21.523 2 16 2C10.477 2 6 6.477 6 12C6 19 16 30 16 30C16 30 26 19 26 12Z"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g fill="rgba(255,255,255,0.04)" stroke="none">
              <circle cx="11" cy="7" r="1.5" />
              <circle cx="16" cy="7" r="1.5" />
              <circle cx="21" cy="7" r="1.5" />
              <circle cx="11" cy="12" r="1.5" />
              <circle cx="16" cy="12" r="1.5" />
              <circle cx="21" cy="12" r="1.5" />
              <circle cx="11" cy="17" r="1.5" />
              <circle cx="16" cy="17" r="1.5" />
              <circle cx="21" cy="17" r="1.5" />
            </g>
          </svg>
        </div>

        {/* CTA Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="relative z-10 text-center max-w-[600px] mx-auto px-6"
        >
          <motion.span
            variants={fadeUp}
            className="rubicon-overline text-white/40 mb-5 block"
          >
            READY TO START?
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-[36px] md:text-[48px] font-bold text-white leading-[1.1] tracking-[-1px] mb-6"
          >
            Take the next step
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-[17px] text-white/50 leading-[1.7] mb-10"
          >
            Find verified disposal locations for any material, in any city
            across the United States.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link
              href="/search"
              className="rubicon-pill rubicon-pill-solid text-[16px] px-10 py-4"
            >
              <Search size={18} className="mr-2" />
              Search now
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
