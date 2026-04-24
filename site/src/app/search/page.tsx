"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { SearchBar, FacilityCard } from "@/components";

// ─── Inner component that reads searchParams ───────────────────────────────
function SearchResults() {
  const searchParams = useSearchParams();
  const qMat = (searchParams.get("material") ?? "").trim();
  const qLoc = (searchParams.get("location") ?? "").trim();

  const [facilities, setFacilities] = React.useState<any[]>([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const [showingCount, setShowingCount] = React.useState(0);
  const [hasMore, setHasMore] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [searched, setSearched] = React.useState(false);

  React.useEffect(() => {
    if (!qMat && !qLoc) return;

    setLoading(true);
    setSearched(true);

    // Fetch from Supabase via our API route
    const params = new URLSearchParams();
    if (qMat) params.set("material", qMat);
    if (qLoc) params.set("location", qLoc);

    fetch(`/api/search?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        setFacilities(data.facilities ?? []);
        setTotalCount(data.total ?? 0);
        setShowingCount(data.showing ?? 0);
        setHasMore(data.hasMore ?? false);
        setLoading(false);
      })
      .catch(() => {
        setFacilities([]);
        setTotalCount(0);
        setShowingCount(0);
        setHasMore(false);
        setLoading(false);
      });
  }, [qMat, qLoc]);

  return (
    <div className="max-w-[1248px] mx-auto px-6 lg:px-12 py-[32px]">
      {!searched ? (
        // ─── Empty State ───
        <div className="py-[40px]">
          <div className="max-w-[480px] mx-auto text-center">
            <h3 className="text-[24px] font-bold text-uber-black mb-3 tracking-[-0.5px]">
              Ready to search
            </h3>
            <p className="text-[15px] text-uber-gray-500 mb-8 leading-[1.6]">
              Enter a material type and location above to find EPA-verified
              disposal facilities.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {[
                { label: "Electronics in Houston", href: "/search?material=electronics&location=Houston" },
                { label: "Paint in Los Angeles", href: "/search?material=paint-solvents&location=Los Angeles" },
                { label: "Batteries in Chicago", href: "/search?material=batteries&location=Chicago" },
              ].map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="h-9 px-4 border border-uber-gray-200 rounded-uber-pill text-[13px] font-medium text-uber-gray-600 hover:border-uber-black hover:text-uber-black flex items-center transition-colors"
                >
                  {s.label}
                </Link>
              ))}
            </div>

            {/* Material quick links */}
            <p className="text-[13px] text-uber-gray-400 mb-4 font-medium uppercase tracking-wider">
              Or browse by material
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                ["Electronics", "electronics"],
                ["Paint & Solvents", "paint-solvents"],
                ["Mattresses", "mattresses"],
                ["Batteries", "batteries"],
                ["Tires", "tires"],
                ["Motor Oil", "motor-oil"],
              ].map(([label, slug]) => (
                <Link
                  key={slug}
                  href={`/dispose-of/${slug}`}
                  className="h-9 px-4 bg-uber-gray-50 border border-uber-gray-100 rounded-uber-pill text-[13px] font-medium text-uber-black hover:border-uber-black hover:bg-white flex items-center transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : loading ? (
        // ─── Loading ───
        <div className="py-[80px] text-center">
          <div className="inline-flex items-center gap-3 text-[15px] text-uber-gray-500">
            <svg className="animate-spin w-5 h-5 text-uber-green" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.2" />
              <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            Searching facilities…
          </div>
        </div>
      ) : (
        // ─── Results ───
        <div>
          <div className="flex items-end justify-between mb-6 pb-4 border-b border-uber-gray-100">
            <h2 className="text-[20px] font-bold text-uber-black tracking-[-0.3px]">
              {hasMore ? (
                <>
                  Showing {showingCount} of {totalCount.toLocaleString()} results
                  {qLoc && <span className="text-uber-gray-400 font-normal"> near &ldquo;{qLoc}&rdquo;</span>}
                  {qMat && <span className="text-uber-gray-400 font-normal"> for &ldquo;{qMat}&rdquo;</span>}
                </>
              ) : (
                <>
                  {totalCount} result{totalCount !== 1 ? "s" : ""} found
                  {qLoc && <span className="text-uber-gray-400 font-normal"> near &ldquo;{qLoc}&rdquo;</span>}
                  {qMat && <span className="text-uber-gray-400 font-normal"> for &ldquo;{qMat}&rdquo;</span>}
                </>
              )}
            </h2>
            {/* Live data badge */}
            <span className="hidden sm:flex items-center gap-1.5 text-[12px] text-uber-green font-medium">
              <span className="w-2 h-2 rounded-full bg-uber-green" />
              Live · Supabase
            </span>
          </div>

          {hasMore && (
            <div className="mb-6 p-4 bg-uber-gray-50 rounded-uber-md border border-uber-gray-200">
              <p className="text-[14px] text-uber-gray-600">
                <span className="font-medium text-uber-black">Showing top {showingCount} results.</span> Refine your search with a more specific location or material to see fewer, more relevant facilities.
              </p>
            </div>
          )}

          {facilities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {facilities.map((f, i) => (
                <FacilityCard
                  key={i}
                  variant="full"
                  name={f.name}
                  epaHandlerId={f.handler_id}
                  address={`${f.address ?? ""}, ${f.city ?? ""}, ${f.state} ${f.zip_code ?? ""}`}
                  status={f.active_status}
                  isActive={(f.active_status ?? "").toLowerCase().includes("active")}
                  badges={[
                    ...(f.is_recycler ? [{ type: "mandatory" as const, label: "Recycler" }] : []),
                    ...(f.accepts_used_oil ? [{ type: "free" as const, label: "Used Oil" }] : []),
                    { type: "accepted" as const, label: "Verified" },
                  ] as any}
                />
              ))}
            </div>
          ) : (
            <div className="py-[80px] text-center">
              <h3 className="text-[20px] font-bold text-uber-black mb-2">
                No locations found
              </h3>
              <p className="text-[15px] text-uber-gray-500 max-w-[420px] mx-auto leading-[1.6] mb-8">
                We couldn&apos;t find any verified EPA drop-off points matching those
                parameters. Try a neighboring county or a broader location.
              </p>
              <Link
                href="/materials"
                className="inline-flex items-center h-10 px-6 bg-uber-black text-white text-[14px] font-medium rounded-uber-pill hover:bg-uber-gray-800 transition-colors"
              >
                Browse all materials
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SearchPage() {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* ━━━ Search Header ━━━ */}
      <div className="bg-uber-black pt-[96px] pb-[32px] px-6 lg:px-12">
        <div className="max-w-[720px] mx-auto">
          <h1 className="text-[36px] md:text-[44px] font-bold text-white tracking-[-1px] leading-[1.05] mb-8 text-center">
            Find Disposal Locations
          </h1>
          <SearchBar variant="compact" />
        </div>
      </div>

      {/* ━━━ Results ━━━ */}
      <Suspense fallback={
        <div className="py-[80px] text-center text-uber-gray-400 text-[15px]">
          Loading…
        </div>
      }>
        <SearchResults />
      </Suspense>
    </div>
  );
}
