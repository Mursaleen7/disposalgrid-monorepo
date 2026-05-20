import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Rubicon",
};

export default function NotFound() {
  return (
    <div className="relative w-full min-h-screen flex items-center bg-[#0C3839] overflow-hidden -mt-[72px] pt-[72px]">
      {/* Background Graphic Element - Massive 'R' Watermark */}
      <div className="absolute right-[-20%] bottom-[-15%] md:right-[-10%] md:bottom-[-10%] opacity-5 pointer-events-none">
        <svg
          width="800"
          height="800"
          viewBox="0 0 32 32"
          fill="none"
          stroke="#FFFFFF"
          className="w-[600px] h-[600px] md:w-[1000px] md:h-[1000px]"
        >
          <path
            d="M26 12C26 6.477 21.523 2 16 2C10.477 2 6 6.477 6 12C6 19 16 30 16 30C16 30 26 19 26 12Z"
            strokeWidth="0.5"
          />
          <g fill="#FFFFFF" stroke="none">
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
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col justify-center py-20 lg:py-32">
          <span className="text-[#16B3A6] text-[14px] font-bold tracking-[4px] uppercase mb-6">
            OOPS!
          </span>
          <h1 className="text-[56px] md:text-[72px] font-medium text-white leading-[1.05] tracking-tight mb-8">
            Page not found.
          </h1>
          <p className="text-[18px] md:text-[20px] text-white/80 leading-[1.7] max-w-[440px] mb-12 font-light">
            Please try retyping the address or start with our homepage.
          </p>
          <div>
            <Link
              href="/"
              className="inline-flex items-center justify-center h-14 px-10 bg-[#16B3A6] text-[#1A1A1A] text-[16px] font-bold rounded-full hover:brightness-110 shadow-[0_4px_14px_rgba(22,179,166,0.3)] hover:shadow-[0_6px_20px_rgba(22,179,166,0.5)] transition-all duration-300"
            >
              Go to homepage
            </Link>
          </div>
        </div>
        
        {/* Right column remains empty to enforce 50/50 asymmetrical balance and leave room for the watermark */}
        <div className="hidden md:block"></div>
      </div>
    </div>
  );
}
