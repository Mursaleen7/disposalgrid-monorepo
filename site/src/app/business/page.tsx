"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Truck,
  ClipboardList,
  ChevronDown,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  FileText,
  Headphones,
} from "lucide-react";

/* ═══════════════════════════════════════════════
   B2B FOR BUSINESS PAGE
   Deep Oceanic Teal & Vibrant Mint Accents
   ═══════════════════════════════════════════════ */

/* ─── Data ─── */

const APP_FEATURES = [
  { icon: Calendar, title: "Schedule a Pickup", desc: "Request extra service or adjust frequencies on the fly." },
  { icon: ClipboardList, title: "View Service Requests", desc: "Track tickets and ETA directly from your phone." },
  { icon: Truck, title: "Manage Equipment", desc: "Order dumpsters, compactors, or recycling bins." },
];

const ACCORDION_ITEMS = [
  {
    id: "front-load",
    title: "Front load dumpsters",
    content: "Perfect for daily or weekly commercial waste collection. Available in sizes from 2 to 8 cubic yards, designed to fit cleanly behind businesses.",
  },
  {
    id: "roll-off",
    title: "Roll-off dumpsters",
    content: "Heavy-duty, open-top containers for construction, demolition, or large cleanouts. Ranging from 10 to 40 yards.",
  },
  {
    id: "compactors",
    title: "Compactors",
    content: "Maximize your waste volume and reduce hauling frequency. We provide both self-contained and stationary compactors.",
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Rubicon completely transformed our waste logistics. We reduced our monthly spend by 18% and finally have full visibility into our diversion rates.",
    author: "Dan from Chicago",
    role: "Director of Facilities",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop",
  },
  {
    id: 2,
    quote: "The ability to schedule a pickup via the app rather than calling dispatch has saved my team countless hours. It just works seamlessly.",
    author: "Blake from Salisbury",
    role: "Operations Manager",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
  },
];

const BLOG_POSTS = [
  {
    category: "LOGISTICS",
    date: "May 2, 2026",
    title: "Optimizing Fleet Routes for Sustainable Hauling",
    slug: "/blog/fleet-routes",
    image: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=600&h=400&fit=crop", // Highway
  },
  {
    category: "SUSTAINABILITY",
    date: "April 28, 2026",
    title: "Zero Waste to Landfill: A Corporate Guide",
    slug: "/blog/zero-waste",
    image: "https://images.unsplash.com/photo-1502213693489-3bc8ffeb4381?w=600&h=400&fit=crop", // Skyline
  },
  {
    category: "CIRCULAR ECONOMY",
    date: "April 15, 2026",
    title: "Textile Recycling at Commercial Scale",
    slug: "/blog/textiles",
    image: "https://images.unsplash.com/photo-1558583082-409143c794ca?w=600&h=400&fit=crop", // Textiles
  },
];

/* ─── Animations ─── */

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
    transition: { staggerChildren: 0.15 },
  },
};

/* ═══════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════ */

export default function BusinessPage() {
  const [openAccordion, setOpenAccordion] = useState<string | null>("front-load");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const heroRef = useRef(null);
  const appSectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: appSectionRef,
    offset: ["start end", "end start"],
  });
  const phoneY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const handleNextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div className="flex flex-col min-h-screen font-rubicon bg-white -mt-[72px]">
      
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 1 — HERO
          Autoplaying background video + Z-Axis Phone
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section ref={heroRef} className="relative w-full h-[90vh] min-h-[700px] flex flex-col justify-center items-center overflow-hidden">
        {/* Ambient Video (10-Hour Automated Logistics Warehouse in 4K) */}
        <div className="absolute inset-0 bg-[#1a1a1a] overflow-hidden pointer-events-none flex justify-center items-center">
          <iframe
            src="https://www.youtube.com/embed/k6VuQpMRM6g?autoplay=1&mute=1&controls=0&rel=0&playsinline=1&modestbranding=1&vq=hd1080"
            className="opacity-50"
            style={{ 
              width: "max(100vw, 177.78vh)", 
              height: "max(56.25vw, 100vh)",
              pointerEvents: "none" 
            }}
            allow="autoplay; encrypted-media"
          />
        </div>

        {/* Dark Color Wash overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        <div className="absolute inset-0 bg-[#0C3839]/10" />

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 lg:px-10 h-full flex flex-col items-center justify-center pt-20">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center max-w-[900px] mx-auto"
          >
            <h1 className="text-[44px] md:text-[64px] lg:text-[76px] font-medium text-white leading-[1.05] tracking-[-1.5px] mb-8">
              Custom waste and recycling solutions that fit your business needs
            </h1>
            <button className="h-14 px-10 bg-rubicon-mint hover:bg-white hover:text-[#0C3839] text-white text-[16px] font-bold rounded-full transition-colors duration-300">
              Get Started
            </button>
          </motion.div>

        </div>

      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 2 — RUBICONConnect App
          50/50 Split (White background)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section ref={appSectionRef} className="bg-white py-24 lg:py-32 relative z-20 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
          >
            {/* Left: 3D Mobile Mockup */}
            <div className="relative flex justify-center lg:justify-center z-30 py-10" style={{ perspective: 1200 }}>
              <motion.div 
                style={{ y: phoneY, rotateX: 4, rotateY: 12, rotateZ: -2 }}
                className="relative w-[300px] md:w-[320px] h-[620px] md:h-[660px] bg-black rounded-[50px] md:rounded-[56px] shadow-[20px_40px_60px_rgba(0,0,0,0.25),inset_0_0_0_2px_#3f3f46,inset_0_0_20px_rgba(255,255,255,0.1)] p-[8px]"
              >
                {/* Hardware details: Side buttons */}
                <div className="absolute left-[-2px] top-[120px] w-[3px] h-[26px] bg-[#3f3f46] rounded-l-md shadow-sm" />
                <div className="absolute left-[-2px] top-[160px] w-[3px] h-[50px] bg-[#3f3f46] rounded-l-md shadow-sm" />
                <div className="absolute left-[-2px] top-[220px] w-[3px] h-[50px] bg-[#3f3f46] rounded-l-md shadow-sm" />
                <div className="absolute right-[-2px] top-[180px] w-[3px] h-[70px] bg-[#3f3f46] rounded-r-md shadow-sm" />

                {/* Inner Screen */}
                <div className="w-full h-full bg-white rounded-[42px] md:rounded-[48px] overflow-hidden relative shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] flex flex-col">
                  
                  {/* Dynamic Island */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[110px] h-[32px] bg-black rounded-[16px] z-50 flex items-center justify-between px-3 shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
                    <div className="w-3 h-3 rounded-full bg-[#111] shadow-[inset_0_0_2px_rgba(255,255,255,0.1)]" />
                    <div className="w-3 h-3 rounded-full bg-[#050505] flex items-center justify-center relative overflow-hidden">
                      <div className="absolute w-1.5 h-1.5 rounded-full bg-[#1e1b4b] shadow-[0_0_4px_#4f46e5]" />
                    </div>
                  </div>

                  {/* Top Status Bar Placeholder (time/battery) */}
                  <div className="w-full h-[44px] bg-[#0C3839] shrink-0" />

                  {/* Mockup Screen Content: 6-Panel Grid UI */}
                  <div className="w-full h-full bg-white flex flex-col">
                    <div className="pb-4 bg-[#0C3839] w-full flex items-center justify-center shrink-0">
                      <span className="text-white font-bold tracking-wider text-[14px]">DisposalGrid</span>
                    </div>
                    <div className="p-4 grid grid-cols-2 gap-3 h-full content-start bg-white">
                    {[
                      { icon: Calendar, label: "Schedule" },
                      { icon: ClipboardList, label: "Requests" },
                      { icon: Truck, label: "Equipment" },
                      { icon: DollarSign, label: "Invoices" },
                      { icon: FileText, label: "Certificates" },
                      { icon: Headphones, label: "Support" },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <div key={i} className="bg-rubicon-gray rounded-xl p-4 flex flex-col items-center justify-center gap-3 aspect-square">
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                            <Icon className="text-rubicon-mint w-5 h-5" />
                          </div>
                          <span className="text-[11px] font-bold text-[#1A1A1A] text-center">{item.label}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
                </div>
              </motion.div>
            </div>
            
            {/* Right: Content */}
            <motion.div variants={fadeUp} className="pt-8 lg:pt-[100px]">
              <span className="text-[14px] font-bold text-rubicon-mint uppercase tracking-[2px] mb-6 block">
                TECHNOLOGY FIRST
              </span>
              <h2 className="text-[36px] md:text-[48px] font-medium text-[#1A1A1A] leading-[1.1] tracking-[-1px] mb-8">
                Control your waste operations from anywhere.
              </h2>
              
              <div className="space-y-8 mt-12">
                {APP_FEATURES.map((feat, i) => {
                  const Icon = feat.icon;
                  return (
                    <div key={i} className="flex gap-6">
                      <div className="w-12 h-12 rounded-full bg-rubicon-gray flex items-center justify-center shrink-0">
                        <Icon className="text-[#0C3839] w-6 h-6" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-[20px] font-bold text-[#1A1A1A] mb-2">{feat.title}</h3>
                        <p className="text-[16px] text-gray-600 leading-[1.6]">{feat.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 3 — What we do for you (Timeline)
          Oceanic Teal `#0C3839` background
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative bg-[#0C3839] py-24 lg:py-40 overflow-hidden">
        {/* Faint Oversized Watermark Logo */}
        <div className="absolute right-[-100px] top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
          <svg width="800" height="800" viewBox="0 0 32 32" fill="none" stroke="#FFFFFF" strokeWidth="1">
            <path d="M26 12C26 6.477 21.523 2 16 2C10.477 2 6 6.477 6 12C6 19 16 30 16 30C16 30 26 19 26 12Z" />
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

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-[36px] md:text-[48px] font-medium text-white mb-20 text-center">
              What we do for you
            </motion.h2>

            <div className="relative">
              {/* Ultra-thin white line */}
              <div className="absolute top-[24px] left-[10%] right-[10%] h-[1px] bg-white/20 hidden md:block" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10">
                {[
                  { step: "01", title: "Equipment selection", desc: "We audit your waste streams and provide exactly the right containers for the job." },
                  { step: "02", title: "Delivery and removal", desc: "Reliable, on-time hauling scheduled dynamically based on fill levels." },
                  { step: "03", title: "Responsible disposal", desc: "Guaranteed compliance, certified destruction, and maximized recycling diversion." },
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-[#0C3839] border-[2px] border-rubicon-mint flex items-center justify-center text-rubicon-mint font-bold text-[18px] mb-8">
                      {item.step}
                    </div>
                    <h3 className="text-[22px] font-medium text-white mb-4">{item.title}</h3>
                    <p className="text-[16px] text-white/60 leading-[1.6] max-w-[280px]">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 4 — Feature Highlights
          Alternating 50/50 Layouts
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-white py-24 lg:py-40">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 space-y-32 lg:space-y-48">
          
          {/* Highlight 1 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <motion.div variants={fadeUp} className="order-2 lg:order-1 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image src="https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?w=1000&q=80" alt="Sanitation workers managing green bins" fill className="object-cover" />
            </motion.div>
            <motion.div variants={fadeUp} className="order-1 lg:order-2">
              <span className="text-[14px] font-bold text-rubicon-mint uppercase tracking-[2px] mb-6 block">KEY FEATURES</span>
              <h2 className="text-[36px] md:text-[44px] font-medium text-[#1A1A1A] leading-[1.1] tracking-[-1px] mb-6">Manage pickups seamlessly</h2>
              <p className="text-[18px] text-gray-600 leading-[1.7] mb-8">Adjust your collection frequency as your business fluctuates. Need an extra pickup after a busy weekend? Schedule it instantly via our platform without waiting on hold.</p>
            </motion.div>
          </motion.div>

          {/* Highlight 2 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <motion.div variants={fadeUp} className="order-1">
              <span className="text-[14px] font-bold text-rubicon-mint uppercase tracking-[2px] mb-6 block">KEY FEATURES</span>
              <h2 className="text-[36px] md:text-[44px] font-medium text-[#1A1A1A] leading-[1.1] tracking-[-1px] mb-6">Integrated billing</h2>
              <p className="text-[18px] text-gray-600 leading-[1.7] mb-8">Consolidate dozens of invoices from multiple locations into one clean, digital statement. Pay seamlessly and audit expenses with transparent, line-item breakdowns.</p>
            </motion.div>
            <motion.div variants={fadeUp} className="order-2 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1000&q=80" alt="Professional woman smiling at laptop" fill className="object-cover" />
            </motion.div>
          </motion.div>

          {/* Highlight 3 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <motion.div variants={fadeUp} className="order-2 lg:order-1 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1000&q=80" alt="Woman speaking on landline phone" fill className="object-cover" />
            </motion.div>
            <motion.div variants={fadeUp} className="order-1 lg:order-2">
              <span className="text-[14px] font-bold text-rubicon-mint uppercase tracking-[2px] mb-6 block">KEY FEATURES</span>
              <h2 className="text-[36px] md:text-[44px] font-medium text-[#1A1A1A] leading-[1.1] tracking-[-1px] mb-6">Service at your fingertips</h2>
              <p className="text-[18px] text-gray-600 leading-[1.7] mb-8">Direct access to a dedicated account manager who understands your business. No generic call centers — just swift, actionable support when you need it.</p>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 5 — Accordions
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-rubicon-gray py-24 lg:py-40 border-t border-gray-200">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            <motion.div variants={fadeUp} className="sticky top-32 self-start">
              <h2 className="text-[36px] md:text-[48px] font-medium text-[#1A1A1A] leading-[1.1] tracking-[-1px] mb-8">
                Comprehensive Waste Removal
              </h2>
              <button className="h-14 px-8 border-[2px] border-[#0C3839] text-[#0C3839] hover:bg-[#0C3839] hover:text-white rounded-full text-[16px] font-bold transition-colors duration-300">
                View all services
              </button>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-4">
              {ACCORDION_ITEMS.map((item) => {
                const isOpen = openAccordion === item.id;
                return (
                  <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                    <button
                      onClick={() => setOpenAccordion(isOpen ? null : item.id)}
                      className="w-full px-8 py-6 flex items-center justify-between text-left"
                    >
                      <span className="text-[20px] font-bold text-[#1A1A1A]">{item.title}</span>
                      <ChevronDown className={`w-6 h-6 text-rubicon-mint transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-8 pb-6">
                            <p className="text-[16px] text-gray-600 leading-[1.6]">{item.content}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 6 — Testimonials Carousel
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-white py-24 lg:py-40">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Left 40% */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <span className="text-[14px] font-bold text-rubicon-mint uppercase tracking-[2px] mb-6 block">SUCCESS STORIES</span>
                <h2 className="text-[36px] md:text-[48px] font-medium text-[#1A1A1A] leading-[1.1] tracking-[-1px] mb-12">
                  Hear what people have to say about working with us.
                </h2>
              </div>
              <div className="flex gap-4">
                <button onClick={handlePrevTestimonial} className="w-14 h-14 border border-gray-300 hover:border-[#0C3839] flex items-center justify-center transition-colors">
                  <ChevronLeft className="w-6 h-6 text-[#1A1A1A]" strokeWidth={1.5} />
                </button>
                <button onClick={handleNextTestimonial} className="w-14 h-14 border border-gray-300 hover:border-[#0C3839] flex items-center justify-center transition-colors">
                  <ChevronRight className="w-6 h-6 text-[#1A1A1A]" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Right 60% */}
            <div className="lg:col-span-7">
              <div className="bg-[#F4F5F6] rounded-3xl p-10 md:p-16 relative overflow-hidden min-h-[400px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full"
                  >
                    <p className="text-[22px] md:text-[28px] text-[#1A1A1A] leading-[1.5] font-medium mb-10">
                      &quot;{TESTIMONIALS[currentTestimonial].quote}&quot;
                    </p>
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-full overflow-hidden relative">
                        <Image src={TESTIMONIALS[currentTestimonial].avatar} alt={TESTIMONIALS[currentTestimonial].author} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-[18px] text-[#1A1A1A]">{TESTIMONIALS[currentTestimonial].author}</div>
                        <div className="text-[15px] text-gray-500">{TESTIMONIALS[currentTestimonial].role}</div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 7 — Latest from the blog
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-white pb-24 lg:pb-40 border-t border-gray-100 pt-24 lg:pt-40">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-[36px] md:text-[48px] font-medium text-[#1A1A1A] leading-[1.1] tracking-[-1px] mb-16 text-center">
              Latest from the blog
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {BLOG_POSTS.map((post, i) => (
                <motion.div key={i} variants={fadeUp} className="group cursor-pointer">
                  <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 relative">
                    <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[12px] font-bold text-rubicon-mint uppercase tracking-[1px]">{post.category}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="text-[13px] text-gray-500">{post.date}</span>
                  </div>
                  <h3 className="text-[22px] font-bold text-[#1A1A1A] leading-[1.3] group-hover:text-[#0C3839] transition-colors">{post.title}</h3>
                </motion.div>
              ))}
            </div>
            
          </motion.div>
        </div>
      </section>

    </div>
  );
}
