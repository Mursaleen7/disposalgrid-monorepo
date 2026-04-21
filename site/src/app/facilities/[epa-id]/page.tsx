import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Breadcrumb, Badge, JunkRemovalCTA, FacilityCard } from "@/components";
import { Card, CardContent } from "@/components";

/* ─── Static Generation ─── */
export async function generateStaticParams() {
  const facs = await prisma.facility.findMany({ select: { epaHandlerId: true } });
  return facs.map((f) => ({ "epa-id": f.epaHandlerId }));
}

/* ─── Dynamic Metadata ─── */
export async function generateMetadata({ params }: { params: { "epa-id": string } }): Promise<Metadata> {
  const fac = await prisma.facility.findUnique({ where: { epaHandlerId: params["epa-id"] } });
  if (!fac) return {};
  return {
    title: `${fac.name} in ${fac.city}, ${fac.state} | DisposalGrid`,
    description: `View hours, accepted codes, and compliance history for ${fac.name} located at ${fac.address}.`,
    openGraph: {
      images: [`/api/og?title=${encodeURIComponent(fac.name)}&subtitle=${encodeURIComponent(fac.city + ", " + fac.state)}`]
    }
  };
}

/* ─── Page Component ─── */
export default async function FacilityProfilePage({
  params,
}: {
  params: { "epa-id": string };
}) {
  const facility = await prisma.facility.findUnique({
    where: { epaHandlerId: params["epa-id"] }
  });

  if (!facility) return notFound();

  // Fetch a nearby facility
  const nearbyFacilitiesRaw = await prisma.facility.findMany({
    where: { 
       state: facility.state, 
       county: facility.county, 
       epaHandlerId: { not: facility.epaHandlerId } 
    },
    take: 3
  });

  // Mappings
  const stateFriendly = facility.state === "TX" ? "Texas" : facility.state;
  const countySlug = facility.county.toLowerCase().replace(/ /g, '-');
  
  const breadcrumbs = [
    { label: stateFriendly, href: `/${stateFriendly.toLowerCase()}` },
    { label: facility.county, href: `/${stateFriendly.toLowerCase()}/${countySlug}` },
    { label: facility.name },
  ];

  // Parse JSON data cleanly safely
  let hoursObj: any = {};
  try { hoursObj = JSON.parse(facility.hours || "{}"); } catch {}
  const hoursDetails = hoursObj.details || [];
  const hoursSummary = hoursObj.summary || "Contact facility for hours";

  let acceptedCodes: string[] = [];
  try { acceptedCodes = JSON.parse(facility.acceptedCodes); }
  catch { acceptedCodes = facility.acceptedCodes ? facility.acceptedCodes.split(',') : []; }

  let complianceArr: any[] = [];
  try { complianceArr = JSON.parse(facility.complianceHistory || "[]"); } catch {}

  const complianceSummary = complianceArr.length === 0 ? "No violations listed" : `${complianceArr.length} incidents logged`;

  // JSON-LD LocalBusiness Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "RecyclingCenter"],
    "name": facility.name,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": facility.address,
      "addressLocality": facility.city,
      "addressRegion": facility.state,
      "postalCode": facility.zipCode
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": facility.latitude,
      "longitude": facility.longitude
    },
    "identifier": {
       "@type": "PropertyValue",
       "propertyID": "EPA Handler ID",
       "value": facility.epaHandlerId
    }
  };

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div className="w-full bg-[#fcfcfc] relative">
      
      {/* ─── Hero Block ─── */}
      <div className="bg-white pt-12 pb-10 px-6 lg:px-12">
        <div className="max-w-[1248px] mx-auto">
          <Breadcrumb items={breadcrumbs} />
          
          <div className="mt-8 mb-4">
             <h1 className="text-[32px] md:text-[36px] font-bold text-uber-black leading-[1.1] tracking-[-0.5px] mb-3">
               {facility.name}
             </h1>
             <div className="flex items-center gap-4">
               <span className="font-mono text-[14px] text-uber-gray-500">
                 EPA ID: {facility.epaHandlerId}
               </span>
               <span className="h-6 px-2.5 rounded-uber-pill bg-uber-gray-100 text-[12px] font-medium text-uber-black flex items-center">
                 {facility.operationalType}
               </span>
             </div>
          </div>
        </div>
      </div>

      {/* ─── 3-Column Metrics Row (Black) ─── */}
      <div className="w-full bg-uber-black h-auto md:h-[72px] flex items-center">
         <div className="max-w-[1248px] w-full mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-6 py-4 md:py-0">
            {/* Status */}
            <div className="flex flex-col justify-center">
               <span className="text-[11px] font-bold text-uber-gray-400 tracking-wider uppercase mb-1">Status</span>
               <div className="flex items-center gap-2">
                 <span className={`w-2 h-2 rounded-full ${facility.status.toLowerCase().includes('active') ? 'bg-uber-green' : 'bg-uber-gray-500'}`}></span>
                 <span className="text-[15px] font-medium text-white">{facility.status}</span>
               </div>
            </div>
            {/* Hours */}
            <div className="flex flex-col justify-center md:border-l md:border-uber-gray-800 md:pl-6">
               <span className="text-[11px] font-bold text-uber-gray-400 tracking-wider uppercase mb-1">Hours</span>
               <span className="text-[15px] font-medium text-white">{hoursSummary}</span>
            </div>
            {/* Compliance */}
            <div className="flex flex-col justify-center md:border-l md:border-uber-gray-800 md:pl-6">
               <span className="text-[11px] font-bold text-uber-gray-400 tracking-wider uppercase mb-1">Compliance</span>
               <span className="text-[15px] font-medium text-white">{complianceSummary}</span>
            </div>
         </div>
      </div>

      <div className="max-w-[1248px] mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* ─── LEFT COLUMN (65%) ─── */}
          <div className="w-full lg:w-[65%] space-y-16">
            
            {/* Accepted Materials */}
            <section>
              <h3 className="text-[22px] font-bold text-uber-black mb-6">What this facility accepts</h3>
              <div className="space-y-8">
                 <div>
                    <h4 className="text-[14px] font-bold text-uber-gray-500 uppercase tracking-wide mb-4 pb-2 border-b border-uber-gray-200">
                      Standard Materials
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {acceptedCodes.length > 0 ? acceptedCodes.map((item, i) => (
                         <li key={i} className="flex items-start gap-3">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-uber-green shrink-0 mt-0.5">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <span className="text-[15px] text-uber-black">{item}</span>
                         </li>
                      )) : (
                        <p className="text-uber-gray-500 text-sm">No items explicitly configured</p>
                      )}
                    </ul>
                 </div>
              </div>
              <a href="#" className="inline-flex items-center text-[14px] font-medium text-uber-black underline mt-8 hover:text-uber-green transition-colors">
                Download full accepted materials list (PDF)
              </a>
            </section>

            <hr className="border-uber-gray-100" />

            {/* Compliance History */}
            <section>
              <h3 className="text-[22px] font-bold text-uber-black mb-8">Compliance record</h3>
              
              <div className="relative border-l-2 border-uber-gray-200 ml-3 space-y-8">
                 {complianceArr.length > 0 ? complianceArr.map((rec: any, i) => (
                    <div key={i} className="relative pl-8">
                       <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-uber-gray-300"></span>
                       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                         <div>
                            <span className="text-[14px] font-bold text-uber-black block mb-1">{rec.type}</span>
                            <span className="text-[13px] text-uber-gray-500">{rec.date}</span>
                         </div>
                         <Badge variant={rec.outcome.toLowerCase() === "passed" ? "mandatory" : "nolaw"}>{rec.outcome}</Badge>
                       </div>
                    </div>
                 )) : (
                    <div className="relative pl-8">
                      <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-uber-gray-300"></span>
                      <p className="text-[14px] text-uber-gray-500 py-1">No major compliance inspections or violations historically logged in ECHO database.</p>
                    </div>
                 )}
              </div>
            </section>

            <hr className="border-uber-gray-100" />

            {/* Nearby Facilities */}
            <section>
              <h3 className="text-[22px] font-bold text-uber-black mb-6">Other facilities in {facility.county}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                 {nearbyFacilitiesRaw.length > 0 ? nearbyFacilitiesRaw.map((fac, i) => (
                    <FacilityCard
                      key={i}
                      variant="compact"
                      name={fac.name}
                      epaHandlerId={fac.epaHandlerId}
                      address={fac.address}
                    />
                 )) : (
                     <p className="text-[14px] text-uber-gray-500 py-1">No other recorded facilities tracked natively yet.</p>
                 )}
              </div>
            </section>

          </div>

          {/* ─── RIGHT COLUMN (35% Sticky) ─── */}
          <div className="w-full lg:w-[35%] relative">
             <div className="sticky top-[104px] flex flex-col gap-6">
                
                {/* Book Junk Removal CTA */}
                <JunkRemovalCTA countyName={facility.county} />

                {/* Hours Card */}
                {hoursDetails.length > 0 && (
                   <Card className="rounded-uber-md border border-uber-gray-200 overflow-hidden shadow-sm">
                      <div className="p-5 border-b border-uber-gray-100 bg-uber-gray-50/50">
                        <h4 className="text-[16px] font-bold text-uber-black">Hours of Operation</h4>
                      </div>
                      <CardContent className="p-0">
                        <ul className="divide-y divide-uber-gray-100">
                           {hoursDetails.map((h: any, i: number) => (
                              <li key={i} className="flex items-center justify-between p-4 px-5">
                                 <span className="text-[14px] font-medium text-uber-gray-600">{h.day}</span>
                                 <span className={`text-[14px] ${h.hours === 'Closed' ? 'text-uber-gray-400 font-normal' : 'text-uber-black font-medium'}`}>{h.hours}</span>
                              </li>
                           ))}
                        </ul>
                      </CardContent>
                   </Card>
                )}

                {/* Map Card */}
                <div className="w-full rounded-uber-md border border-uber-gray-200 overflow-hidden bg-white shadow-sm">
                  <div className="w-full h-[240px] bg-uber-gray-100 flex items-center justify-center relative">
                    <span className="text-[13px] font-medium text-uber-gray-400 font-mono">[Google Maps Embed]</span>
                  </div>
                </div>

                {/* Report Inaccuracy */}
                <div className="text-center pt-2">
                  <span className="text-[13px] font-medium text-uber-green hover:underline cursor-pointer">
                    Data incorrect? Report an update
                  </span>
                </div>

             </div>
          </div>

        </div>
      </div>
    </div>
    </>
  );
}
