"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const uberEase = [0.16, 1, 0.3, 1] as const;

const FEATURES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: "Bulk Facility Verification",
    desc: "Instantly audit TSDF handlers across your supply chain for RCRA compliance status and state penalties.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    title: "Certificates of Destruction",
    desc: "Automated e-manifest tracking guarantees chain of custody directly to final disposal.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    title: "Fleet Route Optimization",
    desc: "Dispatch waste streams to the most cost-effective legal transfer stations dynamically via our API.",
  },
];

const METRICS = [
  { value: "99.7%", label: "Uptime SLA" },
  { value: "<200ms", label: "API response" },
  { value: "50 states", label: "Coverage" },
  { value: "SOC 2", label: "Compliance" },
];

export default function BusinessHub() {
  return (
    <div className="w-full bg-uber-black text-white min-h-screen">
      {/* ━━━ Hero ━━━ */}
      <div className="pt-[140px] pb-[96px] px-6 lg:px-12">
        <div className="max-w-[1248px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: uberEase }}
          >
            <span className="uber-overline text-uber-green mb-6 inline-block">FOR ENTERPRISE</span>
            <h1 className="text-[48px] md:text-[64px] lg:text-[72px] font-bold leading-[1.0] tracking-[-2px] mb-8 max-w-[800px]">
              Compliance, <br className="hidden md:block" />natively integrated.
            </h1>
            <p className="text-[18px] md:text-[20px] text-uber-gray-400 max-w-[520px] leading-[1.6] mb-10">
              DisposalGrid handles hazardous tracking and EPA documentation for industrial teams. We manage your downstream liability.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start gap-3">
              <button
                className="h-12 px-8 bg-white text-uber-black text-[14px] font-bold rounded-uber-pill hover:bg-uber-gray-200 transition-colors duration-uber-fast"
                onClick={() => console.log("TODO: B2B Sales Modal")}
              >
                Contact Sales
              </button>
              <Link
                href="/search"
                className="h-12 px-8 border border-uber-gray-700 text-white text-[14px] font-medium rounded-uber-pill hover:border-uber-gray-500 flex items-center transition-colors duration-uber-fast"
              >
                View Drop-off Map
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ━━━ Metrics Strip ━━━ */}
      <div className="border-t border-b border-uber-gray-800">
        <div className="max-w-[1248px] mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4">
          {METRICS.map((m, i) => (
            <div key={i} className={`py-8 ${i > 0 ? "border-l border-uber-gray-800 pl-6 lg:pl-8" : ""}`}>
              <span className="text-[32px] font-bold text-white block leading-none mb-1">{m.value}</span>
              <span className="text-[13px] font-medium text-uber-gray-500 uppercase tracking-wide">{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ━━━ Features ━━━ */}
      <div className="py-[96px] px-6 lg:px-12">
        <div className="max-w-[1248px] mx-auto">
          <span className="uber-overline text-uber-gray-500 mb-4 inline-block">CAPABILITIES</span>
          <h2 className="text-[36px] md:text-[40px] font-bold text-white tracking-[-1px] leading-[1.1] mb-16 max-w-[500px]">
            Built for regulated industries.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-uber-gray-800 rounded-uber-lg overflow-hidden border border-uber-gray-800">
            {FEATURES.map((feat, i) => (
              <div key={i} className="bg-uber-gray-900 p-8 lg:p-10">
                <div className="w-12 h-12 rounded-uber-md border border-uber-gray-700 flex items-center justify-center text-uber-green mb-8">
                  {feat.icon}
                </div>
                <h3 className="text-[20px] font-bold text-white mb-3 tracking-[-0.3px]">{feat.title}</h3>
                <p className="text-[15px] text-uber-gray-400 leading-[1.6]">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ━━━ CTA ━━━ */}
      <div className="border-t border-uber-gray-800 py-[96px] px-6 lg:px-12">
        <div className="max-w-[640px] mx-auto text-center">
          <h2 className="text-[36px] font-bold text-white tracking-[-1px] leading-[1.1] mb-5">
            Ready to simplify compliance?
          </h2>
          <p className="text-[17px] text-uber-gray-400 mb-10 leading-[1.6]">
            Join 200+ waste management firms already using DisposalGrid for downstream tracking.
          </p>
          <button
            className="h-12 px-10 bg-white text-uber-black text-[14px] font-bold rounded-uber-pill hover:bg-uber-gray-200 transition-colors duration-uber-fast"
            onClick={() => console.log("TODO: B2B Sales Modal")}
          >
            Get in touch
          </button>
        </div>
      </div>
    </div>
  );
}
