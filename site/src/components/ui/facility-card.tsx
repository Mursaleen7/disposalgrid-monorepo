import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

/* ─── SVG Icons ─── */

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M11.5 3.5L5.5 10L2.5 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DirectionsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M3 11L11 3M11 3H5M11 3V9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Badge Type Mapping ─── */

export type FacilityBadgeType = "free" | "limit" | "accepted" | "warning";

interface FacilityBadgeItem {
  type: FacilityBadgeType;
  label: string;
}

/* ─── Props ─── */

export interface FacilityCardProps {
  /** "full" — county page list / "compact" — sidebar, related facilities */
  variant?: "full" | "compact";
  /** Facility name */
  name: string;
  /** EPA handler ID for linking */
  epaHandlerId: string;
  /** Street address */
  address: string;
  /** Distance text, e.g. "2.3 miles away" */
  distance?: string;
  /** Status label, e.g. "Open to Public" */
  status?: string;
  /** Whether the facility is currently active */
  isActive?: boolean;
  /** Tags/badges to show */
  badges?: FacilityBadgeItem[];
  /** Additional class names */
  className?: string;
}

/* ─── Component ─── */

export function FacilityCard({
  variant = "full",
  name,
  epaHandlerId,
  address,
  distance,
  status = "Open to Public",
  isActive = true,
  badges = [],
  className,
}: FacilityCardProps) {
  const isCompact = variant === "compact";

  if (isCompact) {
    return (
      <Link
        href={`/facility/${epaHandlerId}`}
        className={cn(
          "block rounded-uber-md border border-uber-gray-100 bg-white p-4 transition-all duration-uber-base ease-uber",
          "hover:border-uber-black hover:-translate-y-0.5",
          className
        )}
      >
        <h4 className="text-sm font-bold text-uber-black leading-snug">
          {name}
        </h4>
        <p className="text-xs text-uber-gray-500 mt-1">{address}</p>
        {distance && (
          <p className="text-xs text-uber-gray-400 mt-0.5">{distance}</p>
        )}
      </Link>
    );
  }

  return (
    <div
      className={cn(
        "rounded-uber-md border border-uber-gray-100 bg-white p-5 transition-all duration-uber-base ease-uber",
        "hover:border-uber-black hover:shadow-uber-card",
        className
      )}
    >
      {/* ─── Top Row: Name + Status Badge ─── */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold text-uber-black leading-snug">
          {name}
        </h3>
        {isActive && (
          <Badge variant="free" className="shrink-0 flex items-center gap-1">
            <CheckIcon className="w-3.5 h-3.5" />
            {status}
          </Badge>
        )}
      </div>

      {/* ─── Second Row: Address + Distance ─── */}
      <div className="flex items-center gap-2 mt-2">
        <p className="text-[13px] text-uber-gray-500">{address}</p>
        {distance && (
          <>
            <span className="text-uber-gray-300">·</span>
            <p className="text-[13px] text-uber-gray-500">{distance}</p>
          </>
        )}
      </div>

      {/* ─── Tags Row ─── */}
      {badges.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {badges.map((badge, i) => (
            <Badge key={i} variant={badge.type}>
              {badge.label}
            </Badge>
          ))}
        </div>
      )}

      {/* ─── Action Row ─── */}
      <div className="flex items-center justify-end gap-3 mt-4">
        <Link
          href={`/facility/${epaHandlerId}`}
          className="inline-flex items-center h-9 px-4 border border-uber-black text-[13px] font-medium text-uber-black rounded-uber hover:bg-uber-black hover:text-white transition-colors duration-uber-fast ease-uber"
        >
          See full details
        </Link>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 h-9 px-4 bg-uber-black text-[13px] font-medium text-white rounded-uber hover:bg-uber-gray-800 transition-colors duration-uber-fast ease-uber"
        >
          Get directions
          <DirectionsIcon className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
