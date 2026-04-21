"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

/* ─── SVG Icons (Uber-style custom) ─── */

function CategoryIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function LocationPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Material Options ─── */

export interface MaterialOption {
  label: string;
  value: string;
}

const DEFAULT_MATERIALS: MaterialOption[] = [
  { label: "Electronics", value: "electronics" },
  { label: "Paint & Solvents", value: "paint-solvents" },
  { label: "Mattresses", value: "mattresses" },
  { label: "Tires", value: "tires" },
  { label: "Batteries", value: "batteries" },
  { label: "Medications", value: "medications" },
  { label: "Motor Oil", value: "motor-oil" },
  { label: "Propane Tanks", value: "propane-tanks" },
  { label: "Sharps", value: "sharps" },
  { label: "Appliances", value: "appliances" },
];

/* ─── Props ─── */

export interface SearchBarProps {
  /** "large" (homepage hero, 64px) or "compact" (search results, 52px) */
  variant?: "large" | "compact";
  /** Custom materials list */
  materials?: MaterialOption[];
  /** Called when user submits search */
  onSearch?: (material: string, location: string) => void;
  /** Additional class names */
  className?: string;
}

/* ─── Component ─── */

export function SearchBar({
  variant = "large",
  materials = DEFAULT_MATERIALS,
  onSearch,
  className,
}: SearchBarProps) {
  const router = useRouter();
  const [material, setMaterial] = useState("");
  const [location, setLocation] = useState("");
  const [materialDropdownOpen, setMaterialDropdownOpen] = useState(false);
  const [selectedMaterialLabel, setSelectedMaterialLabel] = useState("");
  const pillRef = useRef<HTMLDivElement>(null);

  const isLarge = variant === "large";
  const pillHeight = isLarge ? "h-16" : "h-[52px]";
  const ctaSize = isLarge ? "w-12 h-12" : "w-10 h-10";

  const handleMaterialSelect = (opt: MaterialOption) => {
    setMaterial(opt.value);
    setSelectedMaterialLabel(opt.label);
    setMaterialDropdownOpen(false);
  };

  const handleSubmit = () => {
    if (onSearch) {
      onSearch(material, location);
    } else {
      if (material || location) {
        router.push(`/search?material=${encodeURIComponent(material)}&location=${encodeURIComponent(location)}`);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className={cn("relative w-full", className)}>
      <div
        ref={pillRef}
        className={cn(
          "flex items-center bg-white rounded-uber-pill border border-uber-gray-200 transition-all duration-uber-fast ease-uber focus-within:border-uber-black focus-within:scale-[1.01]",
          pillHeight
        )}
      >
        <div className="relative flex items-center min-w-0 flex-1">
          <button
            type="button"
            onClick={() => setMaterialDropdownOpen(!materialDropdownOpen)}
            className={cn(
              "flex items-center gap-2 h-full px-5 text-left min-w-0 flex-1",
              isLarge ? "pl-6" : "pl-5"
            )}
          >
            <CategoryIcon className="w-4 h-4 text-uber-gray-400 shrink-0" />
            <span
              className={cn(
                "truncate",
                selectedMaterialLabel
                  ? "text-sm font-medium text-uber-black"
                  : "text-sm text-uber-gray-400"
              )}
            >
              {selectedMaterialLabel || "What are you disposing?"}
            </span>
            <ChevronDownIcon className="w-3 h-3 text-uber-gray-400 shrink-0 ml-auto" />
          </button>

          {materialDropdownOpen && (
             <div className="absolute top-full left-0 mt-2 w-full min-w-[240px] bg-uber-black rounded-uber-md py-2 z-50 shadow-uber-card">
              {materials.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleMaterialSelect(opt)}
                  className={cn(
                    "w-full text-left px-5 py-3 text-sm text-white hover:bg-uber-gray-800 transition-colors duration-uber-fast ease-uber",
                    material === opt.value && "font-medium text-uber-green"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-px h-8 bg-uber-gray-200 shrink-0" />

        <div className="flex items-center flex-1 min-w-0 px-4">
          <LocationPinIcon className="w-4 h-4 text-uber-gray-400 shrink-0 mr-2" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Your city or zip code"
            className="flex-1 min-w-0 bg-transparent text-sm text-uber-black placeholder:text-uber-gray-400 outline-none"
          />
        </div>

        <div className={cn("shrink-0", isLarge ? "pr-2" : "pr-1.5")}>
          <button
            type="button"
            onClick={handleSubmit}
            className={cn(
              "flex items-center justify-center rounded-full bg-uber-black text-white hover:bg-uber-gray-800 transition-colors duration-uber-fast ease-uber",
              ctaSize
            )}
            aria-label="Search"
          >
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {materialDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setMaterialDropdownOpen(false)}
        />
      )}
    </div>
  );
}
