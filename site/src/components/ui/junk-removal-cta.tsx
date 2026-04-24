"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

/* ─── Props ─── */

export interface JunkRemovalCTAProps {
  /** County name to personalize copy, e.g. "Harris County" */
  countyName?: string;
  /** Custom headline */
  headline?: string;
  /** Custom body text */
  body?: string;
  /** Custom CTA button text */
  ctaText?: string;
  /** Called when form is submitted */
  onSubmit?: (emailOrZip: string) => void;
  /** Additional class names */
  className?: string;
}

/* ─── Component ─── */

/**
 * JunkRemovalCTA — Black card monetization component.
 *
 * Spec: Black bg, full-width, 24px padding.
 * H3: "Need everything removed at once?" — 22px, white, 700
 * Body: "Licensed haulers in [county]. Free quotes." — 15px, #AFAFAF
 * Input: email or zip (white, 48px, radius 8px)
 * CTA: "Get free quotes →" — uber-green bg, black text, pill, 48px height
 * Appears ONCE per page, between facilities 3 and 4.
 */
export function JunkRemovalCTA({
  countyName,
  headline = "Need everything removed at once?",
  body,
  ctaText = "Get free quotes →",
  onSubmit,
  className,
}: JunkRemovalCTAProps) {
  const [inputValue, setInputValue] = useState("");

  const resolvedBody =
    body ??
    `Licensed haulers${countyName ? ` in ${countyName}` : ""}. Free quotes, same-day service.`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      console.log("TODO: Wire to generic junk removal webhook", inputValue.trim());
      onSubmit?.(inputValue.trim());
    }
  };

  return (
    <div
      className={cn(
        "bg-uber-black rounded-uber-md p-6 w-full",
        className
      )}
    >
      <h3 className="text-[22px] font-bold text-white leading-tight mb-2">
        {headline}
      </h3>

      <p className="text-[15px] text-uber-gray-400 mb-5 leading-relaxed">
        {resolvedBody}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-stretch w-full">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter your email or zip code"
          className="flex-1 min-w-0 h-12 px-4 bg-white text-sm text-uber-black rounded-uber placeholder:text-uber-gray-400 outline-none border-none"
        />
        <button
          type="submit"
          className="h-12 px-8 bg-uber-green text-sm font-semibold text-uber-black rounded-uber-pill hover:bg-uber-green-dark transition-colors duration-uber-fast ease-uber whitespace-nowrap flex items-center justify-center sm:shrink-0"
        >
          {ctaText}
        </button>
      </form>
    </div>
  );
}
