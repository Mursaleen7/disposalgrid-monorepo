import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Breadcrumb, VerificationBadge, HHWEventCard, MetricCard, EventReminderForm } from "@/components";
import { FacilityFilter } from "@/components/ui/facility-filter";

/* ─── Static Generation ─── */

export async function generateStaticParams() {
  const routes = await prisma.countyMaterial.findMany({
    select: { state: true, county: true, material: { select: { slug: true } } }
  });
  
  return routes.map((r) => ({
    state: r.state,
    region: r.county,
    material: r.material.slug,
  }));
}

/* ─── Dynamic Metadata ─── */
export async function generateMetadata({ params }: { params: { state: string; region: string; material: string } }): Promise<Metadata> {
  const metadata = await prisma.countyMaterial.findFirst({
    where: { state: params.state, county: params.region, material: { slug: params.material } },
    include: { material: true }
  });
  if (!metadata) return {};
  
  const countyDisplay = params.region.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const stateDisplay = params.state.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const matName = metadata.material.name;
  
  return {
    title: `${matName} disposal in ${countyDisplay}, ${stateDisplay} | DisposalGrid`,
    description: `Find ${metadata.freeCount} free drop-off locations and ${metadata.upcomingEvents} upcoming events for ${matName} recycling in ${countyDisplay}.`,
    openGraph: {
      images: [`/api/og?title=${encodeURIComponent(matName + " Disposal")}&subtitle=${encodeURIComponent(countyDisplay + " Locations")}&highlight=${encodeURIComponent(metadata.facilityCount + " Verified Places")}`]
    }
  };
}

/* ─── Page Component ─── */

export default async function CountyMaterialPage({
  params,
}: {
  params: { state: string; region: string; material: string };
}) {
  const [stateStr, countyStr, materialStr] = [params.state, params.region, params.material];

  // 1. Fetch metadata mapping
  const metadata = await prisma.countyMaterial.findFirst({
    where: { state: stateStr, county: countyStr, material: { slug: materialStr } },
    include: { material: true }
  });

  if (!metadata) return notFound();

  // 2. Fetch seed Facilities and Events (in a real app, query by facility.state / facility.county mapped from stateStr)
  const facilitiesRaw = await prisma.facility.findMany();
  const events = await prisma.hhwEvent.findMany();

  // 3. Transform to mapped types
  const mappedFacilities = facilitiesRaw.map((f) => ({
    id: f.id,
    epaHandlerId: f.epaHandlerId,
    name: f.name,
    address: f.address,
    // Add artificial distance since it isn't seeded natively as string
    distance: "within county borders",
    status: f.status,
    isFree: f.isFree,
    // Safely parse the mapped JSON arrays
    acceptedCodes: (() => {
       try { return JSON.parse(f.acceptedCodes); }
       catch { return f.acceptedCodes.split(","); }
    })()
  }));

  // 4. Construct JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Recycling Facilities for ${metadata.material.name} in ${countyStr}, ${stateStr}`,
    "itemListElement": facilitiesRaw.map((f, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "RecyclingCenter",
        "name": f.name,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": f.address,
          "addressLocality": f.city,
          "addressRegion": f.state,
          "postalCode": f.zipCode
        }
      }
    }))
  };

  // Capitalize helpers
  const countyDisplay = metadata.county.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const stateDisplay = metadata.state.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="w-full bg-white relative">
        
        {/* ─── Full-width Header Bar (Dark Layout) ─── */}
        <div className="w-full bg-uber-black h-[60px] flex items-center">
          <div className="max-w-[1248px] w-full mx-auto px-6 lg:px-12">
            <Breadcrumb
              variant="light"
              items={[
                { label: stateDisplay, href: `/${params.state}` },
                { label: countyDisplay, href: `/${params.state}/${params.region}` },
                { label: `${metadata.material.name} Disposal` },
              ]}
            />
          </div>
        </div>

        <div className="max-w-[1248px] mx-auto px-6 lg:px-12 pt-10 pb-20">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-14">
            
            {/* ─── LEFT COLUMN (70%) ─── */}
            <div className="w-full lg:w-[65%] xl:w-[70%]">
              
              {/* Title Block */}
              <div className="mb-10">
                <h1 className="text-[32px] lg:text-[36px] font-bold text-uber-black leading-[1.1] tracking-[-0.5px] mb-4">
                  {metadata.material.name} Recycling in {countyDisplay}, {stateDisplay}
                </h1>
                <VerificationBadge 
                  locationCount={metadata.facilityCount} 
                  eventCount={metadata.upcomingEvents} 
                />
              </div>

              {/* Client Component handling Tabs, Grids, and CTAs instantly */}
              <FacilityFilter facilities={mappedFacilities} county={countyDisplay} />

              {/* State Law Reminder (Compact) */}
              <div className="flex bg-white rounded-uber border border-uber-gray-200 overflow-hidden mb-16">
                <div className="w-1 bg-[#276EF1] shrink-0" />
                <div className="p-4 flex items-start gap-3">
                  <div className="pt-0.5">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#276EF1]">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-uber-black mb-1">State Law Reminder</h4>
                    <p className="text-[14px] text-uber-gray-600 leading-snug">
                      {metadata.stateLaw || "Check local state regulations."}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* ─── RIGHT COLUMN (30% Sticky Sidebar) ─── */}
            <div className="w-full lg:w-[35%] xl:w-[30%]">
              <div className="sticky top-[100px] flex flex-col gap-8">
                
                {/* Map Card */}
                <div className="w-full rounded-uber-md border border-uber-gray-200 overflow-hidden bg-white">
                  <div className="w-full h-[280px] bg-uber-gray-100 flex flex-col items-center justify-center relative">
                     <span className="text-[13px] font-medium text-uber-gray-400 font-mono">[Google Maps Embed]</span>
                  </div>
                  <div className="p-3 bg-white border-t border-uber-gray-100">
                    <span className="text-[13px] font-medium text-uber-black hover:text-uber-green underline block text-center transition-colors cursor-pointer">
                      View full map
                    </span>
                  </div>
                </div>

                {/* HHW Events Sidebar */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-bold text-uber-black">Upcoming HHW Events</h3>
                  {events.length > 0 ? (
                    events.map((evt) => {
                       // Safe JSON parse for accepted items
                       let accepted = [];
                       try { accepted = JSON.parse(evt.acceptedItems); } catch { accepted = []; }

                       return (
                         <HHWEventCard
                           key={evt.id}
                           eventId={evt.id}
                           title={evt.title}
                           location={evt.address}
                           time={"8:00 AM – 2:00 PM"}
                           day={evt.startDate.getDate()}
                           month={evt.startDate.toLocaleString("default", { month: "short" }).toUpperCase()}
                           acceptedItems={accepted}
                         />
                       )
                    })
                  ) : (
                    <div className="p-5 border border-uber-gray-200 rounded-uber text-center">
                       <p className="text-[14px] text-uber-gray-600 mb-4">No upcoming events in this county.</p>
                       <EventReminderForm variant="light" buttonText="Notify me" />
                    </div>
                  )}
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 mt-2">
                   <MetricCard value={`${metadata.facilityCount}`} label="Locations valid" />
                   <MetricCard value={`${metadata.freeCount}`} label="Free options" />
                   <MetricCard value={`${metadata.upcomingEvents}`} label="Events soon" className="col-span-2 lg:col-span-1 xl:col-span-2" />
                </div>

              </div>
            </div>
            
          </div>
        </div>

        {/* ─── Neighboring Counties Links ─── */}
        <div className="max-w-[1248px] mx-auto px-6 lg:px-12 pb-24">
           <div className="pt-12 border-t border-uber-gray-200">
             <h3 className="text-[20px] font-bold text-uber-black mb-6">Explore neighboring counties</h3>
             <div className="flex flex-wrap gap-3">
                {['Dallas', 'Tarrant', 'Bexar', 'Travis', 'Collin'].map((c, i) => (
                   <a key={i} href={`/${params.state}/${c.toLowerCase().replace(' ', '-')}/${params.material}`} className="inline-block px-4 py-2 border border-uber-gray-200 rounded-uber-pill text-[14px] text-uber-black hover:border-uber-black transition-colors">
                      {c} County, {stateDisplay}
                   </a>
                ))}
             </div>
           </div>
        </div>
      </div>
    </>
  );
}
