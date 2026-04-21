import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ─── Props ─── */

export interface HHWEventCardProps {
  /** Event ID for linking */
  eventId: string;
  /** Event title */
  title: string;
  /** Event location/venue */
  location: string;
  /** Time range string, e.g. "8:00 AM – 2:00 PM" */
  time: string;
  /** Day number, e.g. 26 */
  day: number;
  /** Month abbreviation, e.g. "APR" */
  month: string;
  /** Accepted items list */
  acceptedItems?: string[];
  /** Max items to show before "+N more" */
  maxVisibleItems?: number;
  /** Additional class names */
  className?: string;
}

/* ─── Component ─── */

/**
 * HHWEventCard — Sidebar event card per spec.
 *
 * Left: Date block (black bg, white text, day 28px bold / month 11px uppercase, 48px wide)
 * Right: Event name / Location / Time
 * Bottom: Accepted items mini-list (3 items + "+N more")
 * Full-width link: "View event details →"
 */
export function HHWEventCard({
  eventId,
  title,
  location,
  time,
  day,
  month,
  acceptedItems = [],
  maxVisibleItems = 3,
  className,
}: HHWEventCardProps) {
  const visibleItems = acceptedItems.slice(0, maxVisibleItems);
  const remainingCount = acceptedItems.length - maxVisibleItems;

  return (
    <div
      className={cn(
        "rounded-uber-md border border-uber-gray-100 bg-white overflow-hidden group transition-all duration-uber-default ease-uber hover:-translate-y-0.5 hover:shadow-md hover:border-uber-black",
        className
      )}
    >
      {/* ─── Top Row: Date Block + Event Info ─── */}
      <div className="flex gap-4 p-4">
        {/* Date Block */}
        <div className="shrink-0 w-12 h-14 bg-uber-black rounded-uber flex flex-col items-center justify-center">
          <span className="text-[22px] font-bold text-white leading-none">
            {day}
          </span>
          <span className="text-[11px] font-medium text-uber-gray-400 uppercase leading-none mt-0.5">
            {month}
          </span>
        </div>

        {/* Event Info */}
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-bold text-uber-black leading-snug line-clamp-2">
            {title}
          </h4>
          <p className="text-xs text-uber-gray-500 mt-1 truncate">
            {location}
          </p>
          <p className="text-xs text-uber-gray-400 mt-0.5">
            {time}
          </p>
        </div>
      </div>

      {/* ─── Accepted Items Mini-list ─── */}
      {acceptedItems.length > 0 && (
        <div className="px-4 pb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {visibleItems.map((item, i) => (
              <span
                key={i}
                className="text-xs text-uber-gray-600 bg-uber-gray-50 px-2 py-0.5 rounded-uber-pill"
              >
                {item}
              </span>
            ))}
            {remainingCount > 0 && (
              <span className="text-xs text-uber-gray-400 font-medium">
                +{remainingCount} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* ─── Full-width Link ─── */}
      <Link
        href={`/events/${eventId}`}
        className="block px-4 py-3 border-t border-uber-gray-100 text-[13px] font-medium text-uber-black hover:bg-uber-gray-50 transition-colors duration-uber-fast ease-uber"
      >
        View event details →
      </Link>
    </div>
  );
}
