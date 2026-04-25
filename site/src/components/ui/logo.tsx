import React from "react";

interface LogoProps {
  variant?: "dark" | "light";
  showWordmark?: boolean;
  className?: string;
}

export function Logo({ variant = "dark", showWordmark = true, className = "" }: LogoProps) {
  const color = variant === "dark" ? "#1a1a1a" : "#FFFFFF";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* ─── Logomark: Minimalist Bin ─── */}
      <svg
        width="26"
        height="32"
        viewBox="14 6 72 88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="DisposalGrid logomark"
      >
        <g>
          {/* Bin Body */}
          <path
            d="M 27 35 L 33 85 L 69 85 L 75 35"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Floating Bin Lid */}
          <path
            d="M 22 30 L 78 15"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
          />
        </g>
      </svg>

      {/* ─── Wordmark ─── */}
      {showWordmark && (
        <span
          className="text-[20px] leading-none tracking-[-0.3px] select-none"
          style={{ color }}
        >
          <span className="font-normal">Disposal</span>
          <span className="font-bold">Grid</span>
        </span>
      )}
    </div>
  );
}
