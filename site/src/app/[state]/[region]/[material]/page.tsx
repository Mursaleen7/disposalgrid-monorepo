import React from "react";
import Link from "next/link";

export default function MaterialStatePage() {
  return (
    <div className="w-full min-h-screen bg-white">
      <div className="max-w-[1248px] mx-auto px-6 lg:px-12 py-[120px] text-center">
        <h1 className="text-[44px] font-bold text-uber-black mb-4">
          Material & Location Pages
        </h1>
        <p className="text-[18px] text-uber-gray-500 mb-8">
          Coming soon! Use the search to find facilities for specific materials.
        </p>
        <Link
          href="/search"
          className="inline-flex items-center h-12 px-8 bg-uber-black text-white text-[14px] font-medium rounded-uber-pill hover:bg-uber-gray-800 transition-colors"
        >
          Go to Search
        </Link>
      </div>
    </div>
  );
}
