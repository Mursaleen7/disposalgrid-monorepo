"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("DisposalGrid System Error Caught:", error);
  }, [error]);

  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center px-6 text-center bg-white">
      {/* ─── Uber-styled Geometric Error Icon ─── */}
      <div className="w-20 h-20 rounded-full bg-uber-gray-100 flex items-center justify-center mb-6">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
      </div>

      <h1 className="text-display lg:text-[40px] font-bold text-uber-black mb-4">
        Platform error
      </h1>
      
      <p className="text-[16px] text-uber-gray-500 max-w-[500px] mb-8 leading-relaxed">
        We encountered an unexpected interruption while querying our verified disposal ledgers. The node may have timed out.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="h-12 px-6 bg-uber-black text-white text-[14px] font-medium rounded-uber-pill hover:bg-uber-gray-800 transition-colors duration-uber-fast ease-uber"
        >
          Try again
        </button>
        <Link
          href="/"
          className="flex items-center h-12 px-6 bg-uber-gray-100 text-uber-black text-[14px] font-medium rounded-uber-pill hover:bg-uber-gray-200 transition-colors duration-uber-fast ease-uber"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
