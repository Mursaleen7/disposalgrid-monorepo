import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { SearchBar, FacilityCard } from "@/components";

export const metadata = {
  title: "Search Disposal Locations | DisposalGrid",
  description: "Search for EPA-verified disposal locations, recycling centers, and hazardous waste drop-off points near you.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { material?: string; location?: string };
}) {
  const qMat = (searchParams.material || "").trim();
  const qLoc = (searchParams.location || "").trim();

  const facilitiesRaw = await prisma.facility.findMany({
    where: {
      OR: [
        { city: { contains: qLoc } },
        { county: { contains: qLoc } },
        { zipCode: { contains: qLoc } },
      ],
      ...(qMat ? { acceptedCodes: { contains: qMat } } : {}),
    },
    take: 50,
  });

  const hasSearched = qMat !== "" || qLoc !== "";

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
      <div className="max-w-[1248px] mx-auto px-6 lg:px-12 py-[32px]">
        {hasSearched ? (
          <div>
            <div className="flex items-end justify-between mb-6 pb-4 border-b border-uber-gray-100">
              <h2 className="text-[20px] font-bold text-uber-black tracking-[-0.3px]">
                {facilitiesRaw.length} result{facilitiesRaw.length !== 1 ? "s" : ""} found
                {qLoc && <span className="text-uber-gray-400 font-normal"> near &ldquo;{qLoc}&rdquo;</span>}
                {qMat && <span className="text-uber-gray-400 font-normal"> for &ldquo;{qMat}&rdquo;</span>}
              </h2>
            </div>
            
            {facilitiesRaw.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {facilitiesRaw.map((f, i) => (
                  <FacilityCard
                    key={i}
                    variant="full"
                    name={f.name}
                    epaHandlerId={f.epaHandlerId}
                    address={`${f.address}, ${f.city}, ${f.state} ${f.zipCode}`}
                    distance="Matched"
                    status={f.status}
                    isActive={f.status.toLowerCase().includes("active")}
                    badges={[
                      ...(f.isFree ? [{ type: "free" as const, label: "Free" }] : []),
                      { type: "accepted" as const, label: "Verified" },
                    ]}
                  />
                ))}
              </div>
            ) : (
              <div className="py-[80px] text-center">
                <h3 className="text-[20px] font-bold text-uber-black mb-2">No locations found</h3>
                <p className="text-[15px] text-uber-gray-500 max-w-[420px] mx-auto leading-[1.6]">
                  We couldn&apos;t find any verified EPA drop-off points matching those parameters. Try a neighboring county or a broader material category.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="py-[40px]">
            <div className="max-w-[480px] mx-auto text-center">
              <h3 className="text-[24px] font-bold text-uber-black mb-3 tracking-[-0.5px]">Ready to search</h3>
              <p className="text-[15px] text-uber-gray-500 mb-8 leading-[1.6]">
                Enter a material type and location above to find EPA-verified disposal facilities.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { label: "Electronics in Houston", href: "/search?material=Electronics&location=Houston" },
                  { label: "Paint in Harris County", href: "/search?material=Paint&location=Harris" },
                ].map((suggestion) => (
                  <Link
                    key={suggestion.label}
                    href={suggestion.href}
                    className="h-9 px-4 border border-uber-gray-200 rounded-uber-pill text-[13px] font-medium text-uber-gray-600 hover:border-uber-black hover:text-uber-black flex items-center transition-colors duration-uber-fast"
                  >
                    {suggestion.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
