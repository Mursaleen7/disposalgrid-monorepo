import React from "react";

interface LogoProps {
  variant?: "dark" | "light";
  showWordmark?: boolean;
  className?: string;
}

export function Logo({ variant = "dark", showWordmark = true, className = "" }: LogoProps) {
  const textColorClass = variant === "dark" ? "text-uber-black" : "text-white";

  return (
    <div className={`flex items-center gap-uber-2 ${className} ${textColorClass}`}>
      {/* ─── Logomark: Location Pin + Grid Network ─── */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="DisposalGrid logomark"
        className="shrink-0"
      >
        {/* Outer Pin */}
        <path
          d="M26 12C26 6.477 21.523 2 16 2C10.477 2 6 6.477 6 12C6 19 16 30 16 30C16 30 26 19 26 12Z"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Inner 3x3 Grid Network */}
        <g fill="currentColor" stroke="none">
          <circle cx="11" cy="7" r="1.5" />
          <circle cx="16" cy="7" r="1.5" />
          <circle cx="21" cy="7" r="1.5" />
          
          <circle cx="11" cy="12" r="1.5" />
          <circle cx="16" cy="12" r="1.5" />
          <circle cx="21" cy="12" r="1.5" />
          
          <circle cx="11" cy="17" r="1.5" />
          <circle cx="16" cy="17" r="1.5" />
          <circle cx="21" cy="17" r="1.5" />
        </g>
      </svg>

      {/* ─── Wordmark ─── */}
      {showWordmark && (
        <span className="text-h4 tracking-[-0.3px] select-none">
          <span className="font-normal">Disposal</span>
          <span className="font-bold">Grid</span>
        </span>
      )}
    </div>
  );
}
