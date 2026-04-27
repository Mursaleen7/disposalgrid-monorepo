"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { SearchBar } from "@/components";
import { Lock, ArrowRight, MapPin, Calendar, Search } from "lucide-react";

/* ─── Data ─── */



const MATERIALS = [
  { name: "Electronics", slug: "electronics", img: "/illustrations/electronics.png" },
  { name: "Paint & Solvents", slug: "paint-solvents", img: "/illustrations/illus-4.png" },
  { name: "Mattresses", slug: "mattresses", img: "/illustrations/illus-4.png" },
];

const TOP_CITIES = [
  { city: "Houston", state: "TX", slug: "houston--tx" },
  { city: "Los Angeles", state: "CA", slug: "los-angeles--ca" },
  { city: "Chicago", state: "IL", slug: "chicago--il" },
  { city: "Phoenix", state: "AZ", slug: "phoenix--az" },
  { city: "San Diego", state: "CA", slug: "san-diego--ca" },
  { city: "Dallas", state: "TX", slug: "dallas--tx" },
  { city: "Seattle", state: "WA", slug: "seattle--wa" },
  { city: "Denver", state: "CO", slug: "denver--co" },
  { city: "Austin", state: "TX", slug: "austin--tx" },
  { city: "Nashville", state: "TN", slug: "nashville--tn" },
  { city: "Portland", state: "OR", slug: "portland--or" },
  { city: "Las Vegas", state: "NV", slug: "las-vegas--nv" },
];

const FEATURED_COUNTIES = [
  { name: "Harris County, TX", material: "Electronics", materialSlug: "electronics", state: "tx", county: "harris-county", locations: 14, events: 2 },
  { name: "Los Angeles County, CA", material: "Paint & Solvents", materialSlug: "paint-solvents", state: "ca", county: "los-angeles", locations: 42, events: 5 },
  { name: "Cook County, IL", material: "Mattresses", materialSlug: "mattresses", state: "il", county: "cook-county", locations: 8, events: 0 },
  { name: "Maricopa County, AZ", material: "Tires", materialSlug: "tires", state: "az", county: "maricopa-county", locations: 19, events: 1 },
  { name: "King County, WA", material: "Batteries", materialSlug: "batteries", state: "wa", county: "king-county", locations: 26, events: 3 },
  { name: "Miami-Dade County, FL", material: "Motor Oil", materialSlug: "motor-oil", state: "fl", county: "miami-dade-county", locations: 33, events: 1 },
];

/* ─── Uber-style easing ─── */
const uberEase = [0.16, 1, 0.3, 1] as const;

/* ─── Page ─── */

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ━━━ HERO ━━━ */}
      <section className="bg-uber-black w-full py-uber-11">
        <div className="mx-auto max-w-[1440px] w-full px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-uber-6 items-center">
          <div className="lg:col-span-7 text-white">
            <span className="uber-overline text-uber-green mb-5 inline-block">
              VERIFIED DISPOSAL LOCATIONS
            </span>
            <h1 className="text-display md:text-hero mb-6">
              Find legal disposal for anything, anywhere in the US.
            </h1>
            <p className="text-body-lg text-uber-gray-400 mb-10 max-w-[540px]">
              Verified drop-off locations, HHW events, and recycling centers —
              updated weekly from government data.
            </p>

            <div className="max-w-[600px] mb-5">
              <SearchBar variant="large" />
            </div>

            <div className="flex items-center gap-2 text-[13px] text-uber-gray-500">
              <Lock size={14} className="shrink-0" />
              <span>Data sourced from EPA ECHO, Envirofacts &amp; 3,200+ municipal databases</span>
            </div>
          </div>
          
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center">
            <div className="w-full max-w-[480px] aspect-[4/3] rounded-uber-xl relative overflow-hidden">
              <Image src="/hero-image.jpg" alt="DisposalGrid map with recycling pin" fill className="object-cover" priority />
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ POPULAR MATERIALS ━━━ */}
      {/* <section className="bg-white py-[64px] border-b border-uber-gray-100">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="uber-overline text-uber-gray-400 mb-3 inline-block">MOST SEARCHED</span>
              <h2 className="text-[28px] md:text-[32px] font-bold text-uber-black tracking-[-0.5px] leading-[1.1]">Popular materials</h2>
            </div>
            <Link
              href="/materials"
              className="hidden md:inline-flex items-center text-[14px] font-medium text-uber-black hover:text-uber-green transition-colors"
            >
              View all
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><polyline points="9 18 15 12 9 6"/></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MATERIALS.map((mat) => (
              <Link
                key={mat.name}
                href={`/dispose-of/${mat.slug}`}
                className="flex items-start justify-between p-6 rounded-uber-lg bg-uber-gray-50 hover:bg-uber-gray-100 transition-colors duration-uber-fast group"
                style={mat.slug === 'electronics' ? { backgroundColor: '#E4E5DF' } : {}}
              >
                <div className="flex-1 pr-4">
                  <h3 className="text-[18px] font-bold text-uber-black mb-2">{mat.name}</h3>
                  <p className="text-[14px] text-uber-gray-500 mb-4 leading-[1.5]">Find verified disposal locations near you.</p>
                  <span className="text-[14px] font-medium text-uber-black group-hover:underline">Details</span>
                </div>
                <div className="w-[100px] h-[100px] flex items-center justify-center shrink-0">
                  <div className="w-full h-full relative rounded-lg overflow-hidden">
                    <Image src={mat.img} alt={mat.name} fill className="object-cover" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 md:hidden text-center">
            <Link
              href="/materials"
              className="inline-flex items-center text-[14px] font-medium text-uber-black"
            >
              View all materials
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><polyline points="9 18 15 12 9 6"/></svg>
            </Link>
          </div>
        </div>
      </section> */}


      {/* ━━━ HOW IT WORKS ━━━ */}
      <section id="how-it-works" className="bg-white py-uber-10">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-uber-8"
          >
            <span className="uber-overline text-uber-gray-500 mb-4 inline-block">HOW IT WORKS</span>
            <h2 className="text-h1 mb-4">Find disposal. Fast.</h2>
            <p className="text-body-lg text-uber-gray-500 max-w-[520px]">
              Our directory simplifies complex municipal rules into three easy steps.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-uber-gray-100 rounded-uber-lg overflow-hidden border border-uber-gray-100">
            {[
              { num: "01", title: "Search your material", desc: "Tell us what you need to dispose of and your location.", img: "/illustrations/illus-4.png?v=2" },
              { num: "02", title: "See verified locations", desc: "Browse EPA-verified drop-off points, hours, and what each site accepts.", img: "/illustrations/illus-3.png" },
              { num: "03", title: "Dispose legally", desc: "Follow the instructions, stay compliant, and help keep your community safe.", img: "/illustrations/illus-5.png?v=2" },
            ].map((step) => (
              <motion.div 
                key={step.num}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="bg-white p-8 group"
              >
                <div className="relative w-full h-[200px] rounded-uber-md mb-8 overflow-hidden bg-uber-gray-50">
                   <Image src={step.img} alt={step.title} fill className="object-cover group-hover:scale-105 transition-transform duration-uber-slow ease-uber" />
                </div>
                <span className="text-sm font-bold text-uber-gray-300 block mb-2">{step.num}</span>
                <h3 className="text-h4 mb-2 tracking-[-0.3px]">{step.title}</h3>
                <p className="text-[15px] text-uber-gray-500 leading-[1.6]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ HHW EVENTS PROMO ━━━ */}
      <section className="bg-uber-green py-uber-9">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-uber-6 items-center">
          <div className="lg:col-span-7">
            <span className="uber-overline text-uber-black/50 mb-4 inline-block">TIME-SENSITIVE</span>
            <h2 className="text-h1 mb-5">
              Household Hazardous Waste events near you
            </h2>
            <p className="text-body-lg text-uber-black/70 max-w-[480px] mb-8">
              One-day collection events hosted by your county — the safest way to dispose of chemicals, batteries, and paint.
            </p>
            <Link
              href="/events"
              className="inline-flex items-center h-12 px-8 bg-uber-black text-white text-sm font-medium rounded-uber-pill hover:bg-uber-gray-800 transition-colors duration-uber-fast"
            >
              Find upcoming events
              <ArrowRight size={16} strokeWidth={2} className="ml-2" />
            </Link>
          </div>
          
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[400px] aspect-square rounded-uber-xl relative overflow-hidden">
               <Image src="/hhw-events.png" alt="HHW event collection table" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ FEATURED COUNTIES ━━━ */}
      <section className="bg-uber-gray-50 py-uber-10">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="uber-overline text-uber-gray-500 mb-3 inline-block">DISPOSAL GUIDES</span>
              <h2 className="text-h1">Popular disposal guides</h2>
            </div>
            <Link 
              href="/search" 
              className="hidden md:inline-flex items-center h-10 px-6 border border-uber-black text-sm font-medium text-uber-black rounded-uber-pill hover:bg-uber-black hover:text-white transition-colors duration-uber-fast"
            >
              View all
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-uber-4 mb-8">
            {FEATURED_COUNTIES.map((county, i) => (
              <Link 
                key={i}
                href={`/dispose-of/${county.materialSlug}/${county.state}/${county.county}`}
                className="bg-white rounded-uber-md border border-uber-gray-200 p-6 hover:border-uber-black transition-all duration-uber-fast group"
              >
                <h3 className="text-body-lg font-bold text-uber-black mb-1 group-hover:text-uber-green transition-colors">
                  {county.name}
                </h3>
                <p className="text-sm font-medium text-uber-gray-500 mb-4">{county.material}</p>
                <div className="flex items-center gap-4 text-xs text-uber-gray-400">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {county.locations} locations
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {county.events} events
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center md:hidden">
            <Link 
              href="/search" 
              className="inline-flex items-center h-10 px-6 border border-uber-black text-sm font-medium text-uber-black rounded-uber-pill hover:bg-uber-black hover:text-white transition-colors duration-uber-fast"
            >
              View all guides
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━ TOP CITIES ━━━ */}
      <section className="bg-white py-uber-9 border-t border-uber-gray-100">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="mb-8">
            <span className="uber-overline text-uber-gray-400 mb-3 inline-block">BROWSE BY CITY</span>
            <h2 className="text-h2">
              Top cities for disposal
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {TOP_CITIES.map((item) => (
              <Link
                key={item.slug}
                href={`/search?location=${encodeURIComponent(item.city + ', ' + item.state)}`}
                className="inline-flex items-center gap-2 h-10 px-5 rounded-uber-pill border border-uber-gray-200 text-sm font-medium text-uber-black hover:border-uber-black hover:bg-uber-gray-50 transition-all duration-uber-fast"
              >
                <MapPin size={14} className="text-uber-gray-400 shrink-0" />
                {item.city}, {item.state}
              </Link>
            ))}
            <Link
              href="/search"
              className="inline-flex items-center gap-1 h-10 px-5 rounded-uber-pill border border-dashed border-uber-gray-300 text-sm font-medium text-uber-gray-500 hover:border-uber-black hover:text-uber-black transition-all duration-uber-fast"
            >
              All cities
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
