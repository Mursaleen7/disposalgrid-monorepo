import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { materialsData } from "@/lib/data/materials-content";
import { FacilityCard } from "@/components";
import { ChevronRight } from "lucide-react";

// We generate county pages only for state/county combos with 2+ facilities.
// Since generateStaticParams can time out with 10k+ facilities, we limit here
// and let on-demand ISR handle the rest.
export async function generateStaticParams() {
  // Fetch all county+state combinations with 2+ facilities
  const { data } = await supabase
    .from("facilities")
    .select("state, county")
    .not("county", "is", null);

  if (!data) return [];

  // Count facilities per (state, county) pair
  const counts = new Map<string, number>();
  for (const row of data) {
    const key = `${row.state}||${row.county}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const params: { material: string; state: string; county: string }[] = [];
  for (const [key, count] of Array.from(counts.entries())) {
    if (count < 2) continue;
    const [state, county] = key.split("||");
    const countySlug = county.toLowerCase().replace(/\s+/g, "-");
    // Generate a param entry for every material slug
    for (const material of Object.keys(materialsData)) {
      params.push({ material, state: state.toLowerCase(), county: countySlug });
    }
  }

  // Cap to avoid build timeouts (ISR handles the rest)
  return params.slice(0, 500);
}

export async function generateMetadata({
  params,
}: {
  params: { material: string; state: string; county: string };
}): Promise<Metadata> {
  const content = materialsData[params.material];
  if (!content) return {};

  const countyName = params.county
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const stateCode = params.state.toUpperCase();

  return {
    title: `${content.name} Disposal & Recycling in ${countyName}, ${stateCode} | DisposalGrid`,
    description: `Find EPA-verified local drop-off points, recycling centers, and household hazardous waste facilities for ${content.name.toLowerCase()} in ${countyName}, ${stateCode}.`,
    openGraph: {
      title: `${content.name} Disposal in ${countyName}`,
      description: `Find local drop-off points for ${content.name.toLowerCase()} in ${countyName}, ${stateCode}.`,
      images: [
        `/api/og?title=${encodeURIComponent(`${content.name} Disposal`)}&subtitle=${encodeURIComponent(
          `${countyName}, ${stateCode}`
        )}`,
      ],
    },
  };
}

export default async function CountyPage({
  params,
}: {
  params: { material: string; state: string; county: string };
}) {
  const { material, state, county } = params;

  const content = materialsData[material];
  if (!content) notFound();

  // Un-slugify county: "harris-county" → "Harris County"
  const countyName = county
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const stateCode = state.toUpperCase();

  // Fetch facilities in this county from Supabase
  const { data: facilities, error } = await supabase
    .from("facilities")
    .select(
      "id, handler_id, name, address, city, state, zip_code, county, facility_type, active_status, latitude, longitude, is_recycler, is_transfer_facility, accepts_used_oil, accepts_universal_waste"
    )
    .eq("state", stateCode)
    .ilike("county", countyName)
    .limit(50);

  if (error || !facilities || facilities.length < 2) {
    notFound();
  }

  // JSON-LD ItemList Schema
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${content.name} Disposal Locations in ${countyName}, ${stateCode}`,
    numberOfItems: facilities.length,
    itemListElement: facilities.map((facility, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "LocalBusiness",
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
      },
    })),
  };

  return (
    <div className="flex flex-col min-h-screen bg-uber-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* ━━━ HEADER ━━━ */}
      <section className="bg-white border-b border-uber-gray-200 w-full pt-[40px] pb-[40px] lg:pt-[60px] lg:pb-[60px]">
        <div className="mx-auto max-w-[1000px] px-6 lg:px-12">
          <div className="flex flex-wrap items-center gap-2 text-uber-gray-400 text-[13px] font-medium mb-6">
            <Link href="/" className="hover:text-uber-black transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/materials" className="hover:text-uber-black transition-colors">Materials</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/dispose-of/${material}`} className="hover:text-uber-black transition-colors">{content.name}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-uber-black">{countyName}, {stateCode}</span>
          </div>

          <h1 className="text-[36px] md:text-[44px] font-bold text-uber-black leading-[1.1] tracking-[-1px] mb-4">
            {content.name} Disposal in <span className="text-uber-green">{countyName}</span>
          </h1>
          <p className="text-[16px] text-uber-gray-500 max-w-[700px] leading-[1.6]">
            Find EPA-verified local drop-off points, recycling centers, and household hazardous waste
            events for {content.name.toLowerCase()} in {countyName}, {stateCode}.
          </p>

          {/* Live data badge */}
          <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-uber-pill bg-uber-green/10 text-[13px] font-medium text-uber-green">
            <span className="w-2 h-2 rounded-full bg-uber-green shrink-0" />
            Live data from Supabase
          </div>
        </div>
      </section>

      {/* ━━━ FACILITIES LIST ━━━ */}
      <section className="py-[64px] flex-1">
        <div className="mx-auto max-w-[1000px] px-6 lg:px-12">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[20px] font-bold text-uber-black tracking-[-0.5px]">
              {facilities.length} Verified Facilities
            </h2>
          </div>

          <div className="space-y-4">
            {facilities.map((facility) => {
              const isActive = (facility.active_status ?? "").toLowerCase().includes("active");
              const badges: { type: "accepted" | "free" | "mandatory"; label: string }[] = [];
              if (facility.is_recycler) badges.push({ type: "mandatory", label: "Recycler" });
              if (facility.accepts_used_oil) badges.push({ type: "free", label: "Accepts Used Oil" });
              if (facility.accepts_universal_waste) badges.push({ type: "free", label: "Universal Waste" });

              return (
                <FacilityCard
                  key={facility.id}
                  name={facility.name}
                  epaHandlerId={facility.handler_id}
                  address={`${facility.address ?? ""}, ${facility.city ?? ""}, ${facility.state} ${facility.zip_code ?? ""}`}
                  isActive={isActive}
                  badges={badges as any}
                />
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
}
