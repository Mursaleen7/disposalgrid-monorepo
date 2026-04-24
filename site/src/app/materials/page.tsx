import React from "react";
import Link from "next/link";
import { materialsData } from "@/lib/data/materials-content";
import { SearchBar } from "@/components";

export const metadata = {
  title: "Material Disposal Guides | DisposalGrid",
  description:
    "Browse disposal guides for electronics, paint, mattresses, batteries, and more — verified weekly from EPA data.",
};

const ICONS: Record<string, string> = {
  electronics: "💻",
  "paint-solvents": "🎨",
  mattresses: "🛏️",
  batteries: "🔋",
  tires: "🛞",
  "motor-oil": "🛢️",
  "light-bulbs": "💡",
  "prescription-drugs": "💊",
  chemicals: "🧪",
  appliances: "🏠",
  "medical-sharps": "💉",
  "fire-extinguishers": "🧯",
  "propane-tanks": "🔥",
  furniture: "🛋️",
  clothing: "👕",
};

const materials = Object.values(materialsData);

export default function MaterialsHub() {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* ━━━ Hero ━━━ */}
      <div className="bg-uber-black pt-[120px] pb-[64px] px-6 lg:px-12">
        <div className="max-w-[1248px] mx-auto">
          <span className="uber-overline text-uber-green mb-5 inline-block">
            MATERIAL DATABASE
          </span>
          <h1 className="text-[44px] md:text-[52px] font-bold text-white tracking-[-1.5px] leading-[1.05] mb-5 max-w-[640px]">
            What do you need to dispose of?
          </h1>
          <p className="text-[18px] text-uber-gray-400 max-w-[520px] leading-[1.6] mb-10">
            Select a material to see federal EPA regulations, state laws, and
            locate verified collection facilities near you.
          </p>
          <div className="max-w-[600px]">
            <SearchBar variant="compact" />
          </div>
        </div>
      </div>

      {/* ━━━ Grid ━━━ */}
      <div className="max-w-[1248px] mx-auto px-6 lg:px-12 py-[64px]">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-uber-gray-100">
          <h2 className="text-[24px] font-bold text-uber-black tracking-[-0.5px]">
            All Materials
          </h2>
          <span className="text-[13px] font-medium text-uber-gray-400">
            {materials.length} guides
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {materials.map((mat) => (
            <Link
              key={mat.slug}
              href={`/dispose-of/${mat.slug}`}
              className="flex items-start gap-5 p-6 rounded-uber-md border border-uber-gray-200 bg-white hover:border-uber-black transition-colors duration-uber-fast group"
            >
              <div className="w-12 h-12 rounded-uber-md bg-uber-gray-50 flex items-center justify-center text-[22px] shrink-0 group-hover:bg-uber-green-light transition-colors duration-uber-fast">
                {ICONS[mat.slug] ?? "♻️"}
              </div>
              <div className="min-w-0">
                <h3 className="text-[17px] font-bold text-uber-black mb-1 group-hover:text-uber-green transition-colors">
                  {mat.name}
                </h3>
                <p className="text-[14px] text-uber-gray-500 leading-[1.5] line-clamp-2">
                  {mat.overview}
                </p>
                <span className="inline-flex items-center mt-3 text-[13px] font-medium text-uber-black">
                  View guide
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round" className="ml-1"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
