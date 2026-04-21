import React from "react";

export default function Loading() {
  return (
    <div className="w-full min-h-[80vh] bg-white">
      {/* ─── Skeleton Hero Bar ─── */}
      <div className="w-full bg-uber-gray-50 py-10 px-6 lg:px-12">
        <div className="max-w-[1248px] mx-auto">
          <div className="w-[280px] h-[32px] skeleton-shimmer rounded-uber-xs mb-4"></div>
          <div className="w-[180px] h-[18px] skeleton-shimmer rounded-uber-xs"></div>
        </div>
      </div>

      {/* ─── Skeleton Content ─── */}
      <div className="max-w-[1248px] mx-auto px-6 lg:px-12 py-10">
        {/* Section header */}
        <div className="w-[160px] h-[20px] skeleton-shimmer rounded-uber-xs mb-8"></div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border border-uber-gray-100 rounded-uber-md p-6">
              <div className="w-[48px] h-[48px] skeleton-shimmer rounded-uber-md mb-5"></div>
              <div className="w-[75%] h-[18px] skeleton-shimmer rounded-uber-xs mb-3"></div>
              <div className="w-[90%] h-[14px] skeleton-shimmer rounded-uber-xs mb-2"></div>
              <div className="w-[60%] h-[14px] skeleton-shimmer rounded-uber-xs"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
