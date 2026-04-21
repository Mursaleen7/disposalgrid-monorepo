"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, useInView, animate } from "framer-motion";

/* ─── Count-Up Helper ─── */

function CountUp({ value, className }: { value: string; className?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "0px 0px -100px 0px" });

  useEffect(() => {
    // Extract numeric parsing logic for mixed strings like "33,000+" or "Weekly"
    const match = value.match(/^([\d,]+)(.*)$/);
    if (!match) {
      // It's not starting with a number (e.g. "Weekly"), just render
      if (nodeRef.current) nodeRef.current.textContent = value;
      return;
    }

    const numericVal = parseFloat(match[1].replace(/,/g, ""));
    const suffix = match[2];

    if (inView && !isNaN(numericVal)) {
      const controls = animate(0, numericVal, {
        duration: 2,
        ease: "easeOut",
        onUpdate(latest) {
          if (nodeRef.current) {
            nodeRef.current.textContent =
              Math.floor(latest).toLocaleString("en-US") + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, value]);

  return <span ref={nodeRef} className={className}>0</span>;
}

/* ─── Props ─── */

export interface MetricCardProps {
  /** The numeric/text value, e.g. "14" or "33,000+" */
  value: string;
  /** The label below the value, e.g. "Locations" */
  label: string;
  /** Visual variant */
  variant?: "gray" | "dark" | "outlined";
  /** Additional class names */
  className?: string;
}

/* ─── Component ─── */

export function MetricCard({
  value,
  label,
  variant = "gray",
  className,
}: MetricCardProps) {
  const variants = {
    gray: "bg-uber-gray-50 rounded-uber-md p-4",
    dark: "bg-uber-black rounded-uber-md p-4",
    outlined: "bg-white border border-uber-gray-100 rounded-uber-md p-4",
  };

  const valueColor = {
    gray: "text-uber-black",
    dark: "text-white",
    outlined: "text-uber-black",
  };

  const labelColor = {
    gray: "text-uber-gray-500",
    dark: "text-uber-gray-400",
    outlined: "text-uber-gray-500",
  };

  return (
    <div className={cn(variants[variant], className)}>
      <CountUp
        value={value}
        className={cn("text-[22px] font-bold leading-none block", valueColor[variant])}
      />
      <p className={cn("text-[13px] font-normal mt-1.5", labelColor[variant])}>
        {label}
      </p>
    </div>
  );
}

/* ─── Stats Bar Variant (full-width, 4-column) ─── */

export interface StatItem {
  value: string;
  label: string;
}

export interface StatsBarProps {
  stats: StatItem[];
  className?: string;
}

/**
 * StatsBar — Full-width black bar with 4 stat columns.
 * Spec: black bg, 80px height, 28px white bold numbers, 13px #AFAFAF labels,
 * 1px solid #333333 dividers between columns (desktop).
 */
export function StatsBar({ stats, className }: StatsBarProps) {
  return (
    <div className={cn("w-full bg-uber-black", className)}>
      <div className="mx-auto max-w-[1440px] h-20 flex items-center px-6 lg:px-12">
        <div className="w-full grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={cn(
                "flex flex-col items-center justify-center py-2 lg:py-0",
                i < stats.length - 1 && "lg:border-r lg:border-uber-gray-700"
              )}
            >
              <CountUp
                value={stat.value}
                className="text-[28px] font-bold text-white leading-none block"
              />
              <span className="text-[13px] text-uber-gray-400 font-normal mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
