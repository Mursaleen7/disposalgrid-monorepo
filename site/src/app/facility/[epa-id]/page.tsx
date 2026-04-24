import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Breadcrumb, Badge, JunkRemovalCTA, FacilityCard } from "@/components";
import { Card, CardContent } from "@/components";

/* ─── Type for our Supabase facility row ─── */
type Facility = {
  id: string;
  handler_id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  county: string;
  zip_code: string;
  latitude: number;
  longitude: number;
  facility_type: string;
  active_status: string;
  is_recycler: boolean;
  is_transfer_facility: boolean;
  accepts_used_oil: boolean;
  accepts_universal_waste: boolean;
  is_tsdf: boolean;
  contact_phone: string | null;
  waste_codes: string[] | null;
  source: string;
  last_updated: string | null;
};

/* ─── Static Generation ─── */
export async function generateStaticParams() {
  const { data } = await supabase
    .from("facilities")
    .select("handler_id")
    .limit(500); // ISR handles the rest
  return (data ?? []).map((f) => ({ "epa-id": f.handler_id }));
}

/* ─── Dynamic Metadata ─── */
export async function generateMetadata({
  params,
}: {
  params: { "epa-id": string };
}): Promise<Metadata> {
  const { data: fac } = await supabase
    .from("facilities")
    .select("name, city, state, address")
    .eq("handler_id", params["epa-id"])
    .single();

  if (!fac) return {};
  return {
    title: `${fac.name} in ${fac.city}, ${fac.state} | DisposalGrid`,
    description: `View accepted waste types, compliance status, and directions for ${fac.name} located at ${fac.address}.`,
    openGraph: {
      images: [
        `/api/og?title=${encodeURIComponent(fac.name)}&subtitle=${encodeURIComponent(
          fac.city + ", " + fac.state
        )}`,
      ],
    },
  };
}

/* ─── Page Component ─── */
export default async function FacilityProfilePage({
  params,
}: {
  params: { "epa-id": string };
}) {
  const { data: facility, error } = await supabase
    .from("facilities")
    .select("*")
    .eq("handler_id", params["epa-id"])
    .single<Facility>();

  if (error || !facility) return notFound();

  // Nearby facilities — same county, different handler
  const { data: nearbyFacilitiesRaw } = await supabase
    .from("facilities")
    .select("handler_id, name, address, city, state, zip_code")
    .eq("state", facility.state)
    .ilike("county", facility.county ?? "")
    .neq("handler_id", facility.handler_id)
    .limit(3);

  // ─── Derived values ───
  const countySlug = (facility.county ?? "")
    .toLowerCase()
    .replace(/\s+/g, "-");

  const breadcrumbs = [
    { label: facility.state, href: `/${facility.state.toLowerCase()}` },
    {
      label: facility.county ?? facility.state,
      href: `/${facility.state.toLowerCase()}/${countySlug}`,
    },
    { label: facility.name },
  ];

  // Build accepted items list from Supabase columns
  const acceptedItems: string[] = [];
  if (facility.is_recycler) acceptedItems.push("General Recyclables");
  if (facility.is_transfer_facility) acceptedItems.push("Transfer / Drop-off Materials");
  if (facility.accepts_used_oil) acceptedItems.push("Used Motor Oil");
  if (facility.accepts_universal_waste) acceptedItems.push("Universal Waste (batteries, bulbs, pesticides)");
  if (facility.is_tsdf) acceptedItems.push("Hazardous Waste (TSDF)");
  if (facility.waste_codes && facility.waste_codes.length > 0) {
    facility.waste_codes.slice(0, 8).forEach((code) => acceptedItems.push(code));
  }

  const isActive = (facility.active_status ?? "").toLowerCase().includes("active");

  const lastUpdated = facility.last_updated
    ? new Date(facility.last_updated).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Recently verified";

  // JSON-LD LocalBusiness Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "RecyclingCenter"],
    name: facility.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: facility.address,
      addressLocality: facility.city,
      addressRegion: facility.state,
      postalCode: facility.zip_code,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: facility.latitude,
      longitude: facility.longitude,
    },
    identifier: {
      "@type": "PropertyValue",
      propertyID: "EPA Handler ID",
      value: facility.handler_id,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="w-full bg-[#fcfcfc] relative">

        {/* ─── Hero Block ─── */}
        <div className="bg-white pt-12 pb-10 px-6 lg:px-12">
          <div className="max-w-[1248px] mx-auto">
            <Breadcrumb items={breadcrumbs} />

            <div className="mt-8 mb-4">
              <h1 className="text-[32px] md:text-[36px] font-bold text-uber-black leading-[1.1] tracking-[-0.5px] mb-3">
                {facility.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[14px] text-uber-gray-500">
                  Handler ID: {facility.handler_id}
                </span>
                <span className="h-6 px-2.5 rounded-uber-pill bg-uber-gray-100 text-[12px] font-medium text-uber-black flex items-center">
                  {facility.facility_type}
                </span>
                <span className="h-6 px-2.5 rounded-uber-pill bg-uber-gray-100 text-[12px] font-medium text-uber-gray-500 flex items-center capitalize">
                  Source: {facility.source}
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
                <span className={`w-2 h-2 rounded-full ${isActive ? "bg-uber-green" : "bg-uber-gray-500"}`} />
                <span className="text-[15px] font-medium text-white">{facility.active_status}</span>
              </div>
            </div>
            {/* Last Updated */}
            <div className="flex flex-col justify-center md:border-l md:border-uber-gray-800 md:pl-6">
              <span className="text-[11px] font-bold text-uber-gray-400 tracking-wider uppercase mb-1">Last Verified</span>
              <span className="text-[15px] font-medium text-white">{lastUpdated}</span>
            </div>
            {/* Facility Type */}
            <div className="flex flex-col justify-center md:border-l md:border-uber-gray-800 md:pl-6">
              <span className="text-[11px] font-bold text-uber-gray-400 tracking-wider uppercase mb-1">Type</span>
              <span className="text-[15px] font-medium text-white">{facility.facility_type}</span>
            </div>
          </div>
        </div>

        <div className="max-w-[1248px] mx-auto px-6 lg:px-12 py-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

            {/* ─── LEFT COLUMN (65%) ─── */}
            <div className="w-full lg:w-[65%] space-y-16">

              {/* Live data banner */}
              <div className="flex items-center gap-2 p-3 rounded-uber-md bg-uber-green/10 border border-uber-green/20">
                <span className="w-2 h-2 rounded-full bg-uber-green shrink-0" />
                <span className="text-[13px] font-medium text-uber-green">
                  Live data · Supabase · {(10629).toLocaleString()} facilities indexed
                </span>
              </div>

              {/* Accepted Materials */}
              <section>
                <h3 className="text-[22px] font-bold text-uber-black mb-6">What this facility accepts</h3>
                <div className="space-y-8">
                  <div>
                    <h4 className="text-[14px] font-bold text-uber-gray-500 uppercase tracking-wide mb-4 pb-2 border-b border-uber-gray-200">
                      Accepted Waste Types
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {acceptedItems.length > 0 ? acceptedItems.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <svg
                            width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                            className="text-uber-green shrink-0 mt-0.5"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span className="text-[15px] text-uber-black">{item}</span>
                        </li>
                      )) : (
                        <p className="text-uber-gray-500 text-sm col-span-2">
                          Contact facility for accepted materials list.
                        </p>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Capability chips */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {facility.is_recycler && (
                    <Badge variant="mandatory">Recycling Facility</Badge>
                  )}
                  {facility.is_transfer_facility && (
                    <Badge variant="mandatory">Transfer Station</Badge>
                  )}
                  {facility.is_tsdf && (
                    <Badge variant="nolaw">TSDF</Badge>
                  )}
                  {facility.accepts_used_oil && (
                    <Badge variant="mandatory">Used Oil</Badge>
                  )}
                  {facility.accepts_universal_waste && (
                    <Badge variant="mandatory">Universal Waste</Badge>
                  )}
                </div>
              </section>

              <hr className="border-uber-gray-100" />

              {/* Facility Details */}
              <section>
                <h3 className="text-[22px] font-bold text-uber-black mb-6">Facility details</h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { label: "Handler ID", value: facility.handler_id },
                    { label: "Facility Type", value: facility.facility_type },
                    { label: "Active Status", value: facility.active_status },
                    { label: "City", value: facility.city },
                    { label: "State", value: facility.state },
                    { label: "County", value: facility.county },
                    { label: "ZIP Code", value: facility.zip_code },
                    { label: "Data Source", value: facility.source?.toUpperCase() },
                    { label: "Last Verified", value: lastUpdated },
                    ...(facility.contact_phone ? [{ label: "Phone", value: facility.contact_phone }] : []),
                  ].map(({ label, value }) => (
                    <div key={label} className="border-b border-uber-gray-100 pb-4">
                      <dt className="text-[12px] font-bold text-uber-gray-400 uppercase tracking-wider mb-1">{label}</dt>
                      <dd className="text-[15px] text-uber-black font-medium">{value ?? "—"}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <hr className="border-uber-gray-100" />

              {/* Nearby Facilities */}
              <section>
                <h3 className="text-[22px] font-bold text-uber-black mb-6">
                  Other facilities in {facility.county ?? facility.state}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {(nearbyFacilitiesRaw ?? []).length > 0
                    ? (nearbyFacilitiesRaw ?? []).map((fac, i) => (
                        <FacilityCard
                          key={i}
                          variant="compact"
                          name={fac.name}
                          epaHandlerId={fac.handler_id}
                          address={`${fac.address}, ${fac.city}, ${fac.state}`}
                        />
                      ))
                    : (
                        <p className="text-[14px] text-uber-gray-500 py-1 col-span-3">
                          No other facilities found in this county.
                        </p>
                      )}
                </div>
              </section>

            </div>

            {/* ─── RIGHT COLUMN (35% Sticky) ─── */}
            <div className="w-full lg:w-[35%] relative">
              <div className="sticky top-[104px] flex flex-col gap-6">

                {/* Book Junk Removal CTA */}
                <JunkRemovalCTA countyName={facility.county ?? facility.state} />

                {/* Address Card */}
                <Card className="rounded-uber-md border border-uber-gray-200 overflow-hidden shadow-sm">
                  <div className="p-5 border-b border-uber-gray-100 bg-uber-gray-50/50">
                    <h4 className="text-[16px] font-bold text-uber-black">Facility Address</h4>
                  </div>
                  <CardContent className="p-5">
                    <address className="not-italic text-[14px] text-uber-gray-600 leading-[1.8]">
                      {facility.address}<br />
                      {facility.city}, {facility.state} {facility.zip_code}
                    </address>
                    {facility.contact_phone && (
                      <a
                        href={`tel:${facility.contact_phone}`}
                        className="mt-3 flex items-center gap-2 text-[14px] font-medium text-uber-green hover:underline"
                      >
                        {facility.contact_phone}
                      </a>
                    )}
                  </CardContent>
                </Card>

                {/* Map Card */}
                <div className="w-full rounded-uber-md border border-uber-gray-200 overflow-hidden bg-white shadow-sm">
                  <div className="w-full h-[240px] bg-uber-gray-100 flex items-center justify-center relative">
                    <div className="text-center">
                      <svg className="w-8 h-8 text-uber-gray-400 mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                        <circle cx="12" cy="9" r="2.5"/>
                      </svg>
                      <span className="text-[12px] text-uber-gray-400 font-mono block">
                        {facility.latitude?.toFixed(4)}, {facility.longitude?.toFixed(4)}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 bg-white border-t border-uber-gray-100">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${facility.address}, ${facility.city}, ${facility.state} ${facility.zip_code}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full h-10 bg-uber-black text-white text-[14px] font-medium rounded-uber-md hover:bg-uber-gray-800 transition-colors duration-uber-fast"
                    >
                      Get Directions
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
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
