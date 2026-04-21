import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Breadcrumb, Badge, JunkRemovalCTA, FacilityCard } from "@/components";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components";
import { Card, CardContent } from "@/components";

/* ─── Static Generation ─── */
export async function generateStaticParams() {
  const materials = await prisma.material.findMany({ select: { slug: true } });
  return materials.map((m) => ({ slug: m.slug }));
}

/* ─── Dynamic Metadata ─── */
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const mat = await prisma.material.findUnique({ where: { slug: params.slug } });
  if (!mat) return {};
  return {
    title: `${mat.name} Disposal & Recycling Guide | DisposalGrid`,
    description: mat.description,
    openGraph: {
      images: [`/api/og?title=${encodeURIComponent("Dispose " + mat.name)}&subtitle=${encodeURIComponent("National Database")}`]
    }
  };
}

/* ─── Mock Fallbacks for missing base schema data ─── */
const FEDERAL_REGULATIONS_MOCK = [
  {
    title: "Resource Conservation and Recovery Act (RCRA)",
    content: "Under RCRA, electronics that contain toxic materials (like CRTs with lead) are considered hazardous waste and cannot be disposed of in standard landfills. Businesses face strict penalties for violation.",
  },
  {
    title: "Universal Waste Rule",
    content: "Electronics often fall under the Universal Waste Rule, which eases the regulatory burden on businesses by streamlining the collection process for specific hazardous materials, encouraging recycling.",
  },
];

const TAKEBACK_MOCK = [
  { title: "Best Buy Trade-In & Recycling", url: "https://www.bestbuy.com", accepted: ["TVs", "Laptops", "Cables", "Monitors"] },
  { title: "Staples Tech Takeback", url: "https://www.staples.com", accepted: ["Laptops", "Printers", "Ink Cartridges"] },
];

/* ─── Page Component ─── */
export default async function MaterialHubPage({
  params,
}: {
  params: { slug: string };
}) {
  const material = await prisma.material.findUnique({
    where: { slug: params.slug },
    include: {
      states: true, // brings in StateBreakdown
    }
  });

  if (!material) return notFound();

  // JSON-LD Thing
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Thing",
    "name": `${material.name} Disposal`,
    "description": material.description,
  };

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div className="w-full">
      {/* ─── Layout Wrapper ─── */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-12">
        {/* Breadcrumbs */}
        <div className="mb-12">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Materials", href: "/materials" },
              { label: material.name },
            ]}
          />
        </div>

        {/* ─── Hero Block ─── */}
        <div className="mb-16">
          <div className="flex items-center gap-6 mb-8">
            <div
              className={`w-24 h-24 rounded-full ${material.color || 'bg-uber-gray-200'} flex items-center justify-center text-[40px] shadow-sm`}
            >
              {material.iconSvg || "📦"}
            </div>
            <div>
              <h1 className="text-display font-bold text-uber-black mb-3">
                {material.name} Disposal
              </h1>
            </div>
          </div>
          
          <p className="text-body-lg text-uber-gray-600 max-w-[640px] mb-8 leading-relaxed">
            {material.description}
          </p>

          <div className="flex flex-wrap items-center gap-3">
             <div className="flex items-center h-9 px-4 rounded-uber-pill border-[1.5px] border-uber-black bg-white text-sm font-medium text-uber-black">
               <span className="mr-2 text-uber-green font-bold">✓</span>
               Federal Law: RCRA applies
             </div>
             <div className="flex items-center h-9 px-4 rounded-uber-pill border-[1.5px] border-uber-black bg-white text-sm font-medium text-uber-black">
               <span className="mr-2 text-uber-green font-bold">✓</span>
               State laws active in {material.states.length} states
             </div>
          </div>
        </div>

        {/* ─── Two-Column Layout ─── */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* ─── Left Column (65%) ─── */}
          <div className="w-full lg:w-[65%] space-y-16">
            
            {/* Federal Regulations */}
            <section>
              <h2 className="text-[28px] font-bold text-uber-black mb-6">
                Federal regulations
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {FEDERAL_REGULATIONS_MOCK.map((reg, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-[16px] text-uber-black hover:no-underline">
                      {reg.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-[15px] text-uber-gray-600 leading-relaxed">
                      {reg.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* State-by-State Breakdown */}
            <section>
              <h2 className="text-[28px] font-bold text-uber-black mb-6">
                State-by-state breakdown
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-uber-gray-200">
                      <th className="py-4 text-[13px] uppercase font-bold tracking-wider text-uber-gray-500 w-[20%]">State</th>
                      <th className="py-4 text-[13px] uppercase font-bold tracking-wider text-uber-gray-500 w-[60%]">Law Summary</th>
                      <th className="py-4 text-[13px] uppercase font-bold tracking-wider text-uber-gray-500 w-[20%] text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {material.states.length > 0 ? material.states.map((stRow, index) => (
                      <tr key={index} className="border-b border-uber-gray-100 last:border-0 hover:bg-uber-gray-50 transition-colors">
                        <td className="py-4 text-sm font-medium text-uber-black">
                          <Link href={`/${stRow.state}/${material.slug}`} className="hover:text-uber-green transition-colors">
                            {stRow.stateName}
                          </Link>
                        </td>
                        <td className="py-4 text-[14px] text-uber-gray-600">{stRow.lawSummary || "No explicit summary available."}</td>
                        <td className="py-4 text-right">
                          <Badge 
                            variant={(stRow.status as "mandatory"|"voluntary"|"nolaw") || "nolaw"}
                          >
                            {stRow.status === 'mandatory' ? 'Mandatory ban' : stRow.status === 'voluntary' ? 'Voluntary' : 'No law'}
                          </Badge>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan={3} className="py-6 text-center text-uber-gray-500">No state data loaded for this material.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* National Take-Back Programs */}
            <section>
              <h2 className="text-[28px] font-bold text-uber-black mb-6">
                National take-back programs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TAKEBACK_MOCK.map((prog, index) => (
                  <Card key={index} className="flex flex-col justify-between">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-uber-gray-100 flex items-center justify-center text-xs">
                          {material.iconSvg || "♻️"}
                        </div>
                        <h4 className="text-[16px] font-bold text-uber-black">
                          {prog.title}
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {prog.accepted.map((item, i) => (
                          <span key={i} className="text-[12px] text-uber-gray-600 bg-uber-gray-50 px-2 py-0.5 rounded-uber-pill">
                            {item}
                          </span>
                        ))}
                      </div>
                      <a
                        href={prog.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[14px] font-medium text-uber-black underline hover:text-uber-green transition-colors"
                      >
                        Visit program website →
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

          </div>

          {/* ─── Right Column (35% Sticky Sidebar) ─── */}
          <div className="w-full lg:w-[35%] relative">
            <div className="sticky top-[104px] flex flex-col gap-8">
              
              {/* Bulk Pickup CTA Card */}
              <JunkRemovalCTA />

              {/* State Quick-Jump */}
              <div>
                <h4 className="text-[13px] text-uber-gray-500 uppercase tracking-widest font-bold mb-4 inline-block">
                  Jump to your state
                </h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-2 gap-x-2 gap-y-3">
                  {material.states.map((st, index) => (
                    <Link
                      key={index}
                      href={`/${st.state}/${material.slug}`}
                      className="text-[13px] font-medium text-uber-green hover:underline truncate"
                    >
                      {st.stateName}
                    </Link>
                  ))}
                  <Link
                    href={`/states`}
                    className="text-[13px] text-uber-gray-500 hover:text-uber-black font-medium mt-2"
                  >
                    View all 50 states →
                  </Link>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
    </>
  );
}
