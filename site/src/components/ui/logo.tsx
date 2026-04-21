import React from "react";

interface LogoProps {
  variant?: "dark" | "light";
  showWordmark?: boolean;
  className?: string;
}

/**
 * DisposalGrid Logo — Polished
 *
 * A 2×2 grid logomark where the top-right cell is a location pin.
 * Tight 2px gaps, consistent 2px corner radii, optically balanced pin.
 */
export function Logo({ variant = "dark", showWordmark = true, className = "" }: LogoProps) {
  const fill = variant === "dark" ? "#000000" : "#FFFFFF";
  const accent = "#06C167";
  const pinDot = variant === "dark" ? "#FFFFFF" : "#000000";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* ─── Logomark ─── */}
      <svg
        width="26"
        height="26"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="DisposalGrid logomark"
      >
        {/* Bottom-left */}
        <rect x="0" y="15" width="12" height="13" rx="2" fill={fill} />
        {/* Bottom-right */}
        <rect x="16" y="15" width="12" height="13" rx="2" fill={fill} />
        {/* Top-left */}
        <rect x="0" y="0" width="12" height="12" rx="2" fill={fill} />
        {/* Top-right: solid pin base */}
        <path
          d="M22 0C18.686 0 16 2.686 16 6c0 4.5 6 9.5 6 9.5s6-5 6-9.5c0-3.314-2.686-6-6-6z"
          fill={accent}
        />
        {/* Top-right: negative space downward arrow */}
        <path
          d="M22 10L19.5 7H21V3H23V7H24.5L22 10Z"
          fill={pinDot}
        />
      </svg>

      {/* ─── Wordmark ─── */}
      {showWordmark && (
        <span
          className="text-[17px] leading-none tracking-[-0.4px] select-none"
          style={{ color: fill }}
        >
          <span className="font-bold">Disposal</span>
          <span className="font-medium text-uber-gray-500">Grid</span>
        </span>
      )}
    </div>
  );
}
