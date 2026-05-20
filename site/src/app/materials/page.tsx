"use client";

import React from "react";
import Link from "next/link";
import { materialsData } from "@/lib/data/materials-content";
import { SearchBar } from "@/components";
import { motion } from "framer-motion";
import {
  Laptop,
  Paintbrush,
  Bed,
  Battery,
  Circle,
  Droplets,
  Lightbulb,
  Pill,
  FlaskConical,
  Home,
  Syringe,
  ShieldAlert,
  Flame,
  Sofa,
  Shirt,
  ArrowRight,
} from "lucide-react";

export default function MaterialsHub() {
  const materials = Object.values(materialsData);

  const ICONS: Record<string, React.ElementType> = {
    electronics: Laptop,
    "paint-solvents": Paintbrush,
    mattresses: Bed,
    batteries: Battery,
    tires: Circle,
    "motor-oil": Droplets,
    "light-bulbs": Lightbulb,
    "prescription-drugs": Pill,
    chemicals: FlaskConical,
    appliances: Home,
    "medical-sharps": Syringe,
    "fire-extinguishers": ShieldAlert,
    "propane-tanks": Flame,
    furniture: Sofa,
    clothing: Shirt,
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-[#1A1A1A] -mt-[72px]">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO SECTION
          Deep Oceanic Teal background + Watermark
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full pt-[180px] pb-[100px] bg-[#0C3839] overflow-hidden">
        {/* Background Graphic Element - Massive 'R' Watermark */}
        <div className="absolute right-[-10%] bottom-[-20%] opacity-[0.03] pointer-events-none">
          <svg
            width="800"
            height="800"
            viewBox="0 0 32 32"
            fill="none"
            stroke="#FFFFFF"
            className="w-[600px] h-[600px] md:w-[1000px] md:h-[1000px]"
          >
            <path
              d="M26 12C26 6.477 21.523 2 16 2C10.477 2 6 6.477 6 12C6 19 16 30 16 30C16 30 26 19 26 12Z"
              strokeWidth="0.5"
            />
            <g fill="#FFFFFF" stroke="none">
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

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-[800px]">
            <motion.span variants={fadeUp} className="text-[#16B3A6] text-[13px] font-bold tracking-[3px] uppercase mb-6 block">
              MATERIAL DATABASE
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-[52px] md:text-[68px] lg:text-[76px] font-light text-white leading-[1.05] tracking-tight mb-8">
              What do you need to dispose of?
            </motion.h1>
            <motion.p variants={fadeUp} className="text-[18px] md:text-[20px] text-white/70 leading-[1.6] max-w-[560px] mb-12 font-light">
              Select a material to see federal EPA regulations, state laws, and locate verified collection facilities near you.
            </motion.p>
            <motion.div variants={fadeUp} className="max-w-[640px]">
              {/* Ensure SearchBar blends well with the dark background */}
              <div className="bg-white rounded-full p-2 shadow-2xl">
                 <SearchBar variant="compact" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MATERIAL GRID SECTION
          Minimalist, crisp geometric cards
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-[#E5E5E5] gap-4">
              <motion.h2 variants={fadeUp} className="text-[32px] md:text-[40px] font-medium text-[#1A1A1A] tracking-tight">
                All Materials
              </motion.h2>
              <motion.span variants={fadeUp} className="text-[14px] font-medium text-[#666666] uppercase tracking-wide">
                {materials.length} GUIDES
              </motion.span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {materials.map((mat) => {
                const Icon = ICONS[mat.slug] || Home;
                return (
                  <motion.div key={mat.slug} variants={fadeUp} className="flex">
                    <Link
                      href={`/dispose-of/${mat.slug}`}
                      className="group flex flex-col w-full p-8 rounded-[24px] border border-[#E5E5E5] bg-white hover:border-[#16B3A6] hover:shadow-[0_8px_30px_rgba(22,179,166,0.12)] transition-all duration-300 relative overflow-hidden"
                    >
                      {/* Top left subtle gradient or color shift on hover */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#16B3A6]/5 rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      <div className="w-14 h-14 rounded-2xl bg-[#F4F5F6] flex items-center justify-center mb-8 group-hover:bg-[#16B3A6]/10 transition-colors duration-300">
                        <Icon strokeWidth={1.5} className="w-7 h-7 text-[#1A1A1A] group-hover:text-[#16B3A6] transition-colors" />
                      </div>
                      
                      <div className="flex-1 min-h-0">
                        <h3 className="text-[22px] font-semibold text-[#1A1A1A] leading-tight mb-3 group-hover:text-[#0C3839] transition-colors">
                          {mat.name}
                        </h3>
                        <p className="text-[15px] text-[#666666] leading-[1.6] line-clamp-3">
                          {mat.overview}
                        </p>
                      </div>

                      {/* Footer CTA */}
                      <div className="mt-8 flex items-center text-[14px] font-bold text-[#1A1A1A] group-hover:text-[#16B3A6] transition-colors">
                        View guide
                        <ArrowRight size={16} strokeWidth={2} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

          </motion.div>
        </div>
      </section>
    </div>
  );
}
