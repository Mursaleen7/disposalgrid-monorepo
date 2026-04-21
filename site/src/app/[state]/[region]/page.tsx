import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Breadcrumb, FacilityCard } from "@/components";

/* ─── Static Generation ─── */
export async function generateStaticParams() {
  const stateMaterials = await prisma.stateMaterial.findMany({
    select: { state: true, material: { select: { slug: true } } }
  });
  return stateMaterials.map((sm) => ({
    state: sm.state,
    region: sm.material.slug,
  }));
}

/* ─── Dynamic Metadata ─── */
export async function generateMetadata({ params }: { params: { state: string; region: string } }): Promise<Metadata> {
  const metadata = await prisma.stateMaterial.findFirst({
    where: { state: params.state, material: { slug: params.region } },
    include: { material: true }
  });
  if (!metadata) return {};
  const stateDisplay = metadata.stateName;
  const matName = metadata.material.name;
  return {
    title: `${matName} disposal in ${stateDisplay} | DisposalGrid`,
    description: metadata.lawSummary || `Explore top locations and county directories for ${matName} recycling across ${stateDisplay}.`,
    openGraph: {
      images: [`/api/og?title=${encodeURIComponent(matName + " Disposal")}&subtitle=${encodeURIComponent(stateDisplay + " Guidelines")}`]
    }
  };
}

/* ─── Page Component ─── */
export default async function StateMaterialPage({
  params,
}: {
  params: { state: string; region: string };
}) {
  const [stateStr, materialStr] = [params.state, params.region];

  // 1. Fetch metadata mapping
  const metadata = await prisma.stateMaterial.findFirst({
    where: { state: stateStr, material: { slug: materialStr } },
    include: { material: true }
  });

  if (!metadata) return notFound();

  // 2. Fetch seed Facilities (in a real app, query by facility.state mapped from stateStr + top ratings)
  const facilitiesRaw = await prisma.facility.findMany({ take: 8 });

  // 3. Fetch specific county aggregation nodes
  const countiesRaw = await prisma.countyMaterial.findMany({
    where: { state: stateStr, materialId: metadata.materialId }
  });

  // Map facilities to proper format including Badges
  const mappedFacilities = facilitiesRaw.map((f) => ({
    id: f.id,
    epaHandlerId: f.epaHandlerId,
    name: f.name,
    address: f.address,
    distance: "Statewide verified",
    status: f.status,
    isActive: f.status.toLowerCase().includes("active"),
    badges: (() => {
       const b = [];
       if (f.isFree) b.push({ type: "free" as const, label: "Free drop-off" });
       const codesStr = f.acceptedCodes || "";
       if (codesStr.includes("Limit:")) b.push({ type: "limit" as const, label: "Restrictions apply" });
       if (f.hasAppointment) b.push({ type: "warning" as const, label: "Appointment Required" });
       if (b.length === 0) b.push({ type: "accepted" as const, label: "Paid Drop-off" });
       return b;
    })()
  }));

  // JSON-LD ItemList Collection
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Top Recycling Facilities for ${metadata.material.name} in ${metadata.stateName}`,
    "itemListElement": facilitiesRaw.map((f, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "LocalBusiness",
        "name": f.name,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": f.address,
          "addressLocality": f.city,
          "addressRegion": f.state,
        }
      }
    }))
  };

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div className="w-full">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-12">
        {/* ─── Breadcrumbs ─── */}
        <div className="mb-10">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: metadata.stateName, href: `/${params.state}` },
              { label: metadata.material.name },
            ]}
          />
        </div>

        {/* ─── H1 ─── */}
        <h1 className="text-display lg:text-[40px] font-bold text-uber-black mb-10 leading-tight">
          {metadata.material.name} Disposal in {metadata.stateName}
        </h1>

        {/* ─── State Law Box ─── */}
        <div className="flex bg-white rounded-uber-md border border-uber-gray-200 overflow-hidden mb-16 max-w-[800px]">
          <div className="w-1.5 bg-uber-green shrink-0" />
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-uber-green">
                <path d="m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8"/><path d="m16 16 6-6a2.119 2.119 0 0 0-3-3l-6 6"/><path d="m15 13 2.5-2.5"/><path d="M11 9 8.5 6.5"/>
              </svg>
              <h2 className="text-lg font-bold text-uber-black leading-none">
                {metadata.lawName || `${metadata.stateName} Specific Regulations`}
              </h2>
            </div>
            <p className="text-[16px] text-[#333333] leading-relaxed mb-4">
              {metadata.lawSummary || "Ensure proper disposal through local verified recycling centers. Local regulations strictly manage this waste."}
            </p>
            <p className="text-[12px] text-uber-gray-500 font-mono">
              Last verified: {metadata.lastVerified.toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* ─── Featured Facilities Grid ─── */}
        <section className="mb-16">
          <h2 className="text-[28px] font-bold text-uber-black mb-8">
            Top facilities in {metadata.stateName}
          </h2>
          {mappedFacilities.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mappedFacilities.map((facility, index) => (
                <FacilityCard
                  key={index}
                  variant="full"
                  name={facility.name}
                  epaHandlerId={facility.epaHandlerId}
                  address={facility.address}
                  distance={facility.distance}
                  status={facility.status}
                  isActive={facility.isActive}
                  badges={facility.badges}
                />
              ))}
            </div>
          ) : (
            <p className="text-uber-gray-500">No facilities actively tracked natively yet.</p>
          )}
        </section>

        {/* ─── County Directory ─── */}
        <section>
          <h2 className="text-[28px] font-bold text-uber-black mb-8">
            Browse by county
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {countiesRaw.length > 0 ? (
               countiesRaw.map((county, index) => {
                const countyFriendlyName = county.county.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
                return (
                  <Link
                    key={index}
                    href={`/${metadata.state}/${county.county}/${metadata.material.slug}`}
                    className="flex items-center justify-between h-9 px-4 rounded-uber-pill border border-uber-gray-200 bg-white group hover:bg-uber-black hover:border-uber-black transition-colors duration-uber-fast ease-uber"
                  >
                    <span className="text-[13px] font-medium text-uber-black group-hover:text-white truncate">
                      {countyFriendlyName}
                    </span>
                    <span className="shrink-0 flex items-center justify-center min-w-[24px] h-[20px] px-1.5 ml-2 rounded-uber-pill bg-uber-gray-100 text-[11px] font-bold text-uber-gray-500 group-hover:bg-uber-gray-800 group-hover:text-uber-gray-300 transition-colors">
                      {county.facilityCount}
                    </span>
                  </Link>
                );
              })
            ) : (
              <p className="text-[14px] text-uber-gray-500 my-4 col-span-full">No active tracked county data generated yet for this material context.</p>
            )}
          </div>
        </section>

      </div>
    </div>
    </>
  );
}
