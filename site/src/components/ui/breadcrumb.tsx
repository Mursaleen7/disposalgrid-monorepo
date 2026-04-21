import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ─── Chevron Separator SVG ─── */

function ChevronSeparator() {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      className="shrink-0 mx-2"
    >
      <path
        d="M2.5 1L5.5 4L2.5 7"
        stroke="#CBCBCB"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Types ─── */

export interface BreadcrumbItem {
  /** Display text */
  label: string;
  /** Link href — omit for current (last) page */
  href?: string;
}

export interface BreadcrumbProps {
  /** Breadcrumb trail items, last item is current page */
  items: BreadcrumbItem[];
  /** Use light text for dark backgrounds (e.g. county page header) */
  variant?: "default" | "light";
  /** Additional class names */
  className?: string;
}

/* ─── Component ─── */

export function Breadcrumb({
  items,
  variant = "default",
  className,
}: BreadcrumbProps) {
  const isLight = variant === "light";

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center flex-wrap", className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            {index > 0 && <ChevronSeparator />}

            {isLast || !item.href ? (
              <span
                className={cn(
                  "text-xs font-normal",
                  isLight ? "text-white" : "text-uber-black"
                )}
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "text-xs font-normal transition-colors duration-uber-fast ease-uber",
                  isLight
                    ? "text-uber-gray-400 hover:text-white"
                    : "text-uber-gray-500 hover:text-uber-green"
                )}
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
