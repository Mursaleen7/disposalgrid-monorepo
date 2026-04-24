import { notFound } from "next/navigation";
import Link from "next/link";
import { materialsData } from "@/lib/data/materials-content";
import { supabase } from "@/lib/supabase";
import { ChevronRight, ArrowRight, ShieldCheck, MapPin, Recycle } from "lucide-react";

export async function generateStaticParams() {
  return Object.keys(materialsData).map((slug) => ({
    material: slug,
  }));
}

export default async function MaterialHubPage({ params }: { params: { material: string } }) {
  const { material } = params;
  const content = materialsData[material];

  if (!content) {
    notFound();
  }

  // Fetch distinct states that have facilities, to show in the Browse by State section
  const { data: stateRows } = await supabase
    .from("facilities")
    .select("state")
    .order("state", { ascending: true });

  // Deduplicate states
  const distinctStates: { state: string }[] = [];
  const seen = new Set<string>();
  for (const row of stateRows ?? []) {
    if (row.state && !seen.has(row.state)) {
      seen.add(row.state);
      distinctStates.push({ state: row.state });
    }
  }

  // Show up to 6 states
  const featuredStates = distinctStates.slice(0, 6);

  // Get total facility count for this page's trust bar
  const { count: totalCount } = await supabase
    .from("facilities")
    .select("*", { count: "exact", head: true });

  return (
    <div className="flex flex-col min-h-screen bg-uber-gray-50">
      {/* ━━━ HERO ━━━ */}
      <section className="bg-uber-black w-full pt-[80px] pb-[60px] lg:pt-[100px] lg:pb-[80px]">
        <div className="mx-auto max-w-[1000px] px-6 lg:px-12 text-center text-white">
          <div className="flex items-center justify-center gap-2 text-uber-gray-400 text-[13px] font-medium mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/materials" className="hover:text-white transition-colors">Materials</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{content.name}</span>
          </div>

          <h1 className="text-[44px] md:text-[56px] font-bold leading-[1.05] tracking-[-1.5px] mb-6">
            How to dispose of <span className="text-uber-green">{content.name.toLowerCase()}</span>
          </h1>
          <p className="text-[18px] md:text-[20px] leading-[1.6] text-uber-gray-400 max-w-[700px] mx-auto">
            {content.overview}
          </p>

          {/* Live data trust badge */}
          <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-uber-pill bg-uber-gray-800 text-[13px] text-uber-gray-400">
            <span className="w-2 h-2 rounded-full bg-uber-green shrink-0" />
            {totalCount?.toLocaleString() ?? "10,000+"} verified facilities in our database
          </div>
        </div>
      </section>

      {/* ━━━ CONTENT ━━━ */}
      <section className="py-[64px] lg:py-[96px] flex-1">
        <div className="mx-auto max-w-[1000px] px-6 lg:px-12">
          <div className="bg-white rounded-uber-xl p-8 lg:p-12 shadow-sm border border-uber-gray-100">
            
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-uber-gray-100 flex items-center justify-center text-uber-black">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h2 className="text-[28px] font-bold text-uber-black tracking-[-0.5px]">Federal Law &amp; Regulations</h2>
              </div>
              <p className="text-[16px] text-uber-gray-600 leading-[1.8]">
                {content.federalLaw}
              </p>
            </div>

            <hr className="border-uber-gray-200 mb-12" />

            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-uber-gray-100 flex items-center justify-center text-uber-black">
                  <Recycle className="w-5 h-5" />
                </div>
                <h2 className="text-[28px] font-bold text-uber-black tracking-[-0.5px]">National Take-Back Programs</h2>
              </div>
              <p className="text-[16px] text-uber-gray-600 leading-[1.8]">
                {content.nationalTakeBackPrograms}
              </p>
            </div>

            <hr className="border-uber-gray-200 mb-12" />

            <div>
              <h2 className="text-[24px] font-bold text-uber-black tracking-[-0.5px] mb-6">Generally Accepted Items</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.acceptedMaterials.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-uber-md bg-uber-gray-50 border border-uber-gray-100">
                    <div className="w-6 h-6 rounded-full bg-uber-green/20 flex items-center justify-center text-uber-green shrink-0 mt-0.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span className="text-[15px] font-medium text-uber-black">{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ━━━ BROWSE BY STATE (Supabase data) ━━━ */}
          {featuredStates.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-[11px] font-bold text-uber-gray-400 tracking-wider uppercase mb-2 block">Live from Supabase</span>
                  <h3 className="text-[24px] font-bold text-uber-black tracking-[-0.5px]">Browse by State</h3>
                </div>
                <Link href="/search" className="text-[14px] font-medium text-uber-black hover:text-uber-green flex items-center gap-1 transition-colors">
                  View all <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {featuredStates.map((stateInfo) => (
                  <Link
                    key={stateInfo.state}
                    href={`/dispose-of/${material}/${stateInfo.state.toLowerCase()}/`}
                    className="flex items-center justify-between p-6 bg-white rounded-uber-lg border border-uber-gray-200 hover:border-uber-black transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-uber-gray-400 group-hover:text-uber-black transition-colors" />
                      <span className="text-[16px] font-bold text-uber-black">{stateInfo.state}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-uber-gray-300 group-hover:text-uber-black transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
