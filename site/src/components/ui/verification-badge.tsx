import React from "react";
import { cn } from "@/lib/utils";

/* ─── Props ─── */

export interface VerificationBadgeProps {
  /** Number of verified locations */
  locationCount: number;
  /** Number of upcoming events */
  eventCount: number;
  /** Data source name, e.g. "EPA ECHO" */
  dataSource?: string;
  /** Last updated date string, e.g. "April 18, 2026" */
  lastUpdated?: string;
  /** Additional class names */
  className?: string;
}

/* ─── Component ─── */

/**
 * VerificationBadge — appears on EVERY county and facility page.
 *
 * Green pulse dot (8px) + "{N} verified locations · {N} upcoming events"
 * Below: "Data sourced from {SOURCE} · Last updated {DATE}"
 */
export function VerificationBadge({
  locationCount,
  eventCount,
  dataSource = "EPA ECHO",
  lastUpdated = "April 2026",
  className,
}: VerificationBadgeProps) {
  return (
    <div className={cn("space-y-1", className)}>
      {/* ─── Main Line: Pulse dot + counts ─── */}
      <div className="flex items-center gap-2">
        {/* Pulse dot */}
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inset-0 rounded-full bg-uber-green animate-ping opacity-75" />
          <span className="relative rounded-full h-2 w-2 bg-uber-green animate-pulse" />
        </span>

        <span className="text-sm font-medium text-uber-black">
          {locationCount} verified location{locationCount !== 1 ? "s" : ""}
          <span className="text-uber-gray-400 mx-1.5">·</span>
          {eventCount} upcoming event{eventCount !== 1 ? "s" : ""}
        </span>
      </div>

      {/* ─── Source Line ─── */}
      <p className="text-xs text-uber-gray-500 pl-4">
        Data sourced from {dataSource}
        <span className="text-uber-gray-300 mx-1.5">·</span>
        Last updated {lastUpdated}
      </p>
    </div>
  );
}
