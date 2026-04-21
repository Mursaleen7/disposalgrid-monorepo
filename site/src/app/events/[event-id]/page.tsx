import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Breadcrumb, HHWEventCard, EventReminderForm } from "@/components";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent, Card } from "@/components";

/* ─── Static Generation ─── */
export async function generateStaticParams() {
  const evts = await prisma.hhwEvent.findMany({ select: { id: true } });
  return evts.map((e) => ({ "event-id": e.id }));
}

/* ─── Dynamic Metadata ─── */
export async function generateMetadata({ params }: { params: { "event-id": string } }): Promise<Metadata> {
  const evt = await prisma.hhwEvent.findUnique({ where: { id: params["event-id"] } });
  if (!evt) return {};
  return {
    title: `${evt.title} | ${evt.county}, ${evt.state} | DisposalGrid`,
    description: `Join the HHW collection event hosted by ${evt.organizer} on ${evt.startDate.toLocaleDateString()}. Map ${evt.address}.`,
    openGraph: {
      images: [`/api/og?title=${encodeURIComponent("HHW Event")}&subtitle=${encodeURIComponent(evt.startDate.toLocaleDateString() + " in " + evt.county)}`]
    }
  };
}

/* ─── Page Component ─── */
export default async function HHWEventPage({
  params,
}: {
  params: { "event-id": string };
}) {
  const hhwEvent = await prisma.hhwEvent.findUnique({
    where: { id: params["event-id"] }
  });

  if (!hhwEvent) return notFound();

  // Related events
  const relatedRaw = await prisma.hhwEvent.findMany({
    where: { state: hhwEvent.state, county: hhwEvent.county, id: { not: hhwEvent.id } },
    take: 2
  });

  // Derived properties
  const isUpcoming = hhwEvent.startDate > new Date();
  
  const friendlyDate = hhwEvent.startDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  const timeString = `${hhwEvent.startDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })} – ${hhwEvent.endDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;

  const stateFriendly = hhwEvent.state === "TX" ? "Texas" : hhwEvent.state;
  const countySlug = hhwEvent.county.toLowerCase().replace(/ /g, '-');
  
  const breadcrumbs = [
    { label: stateFriendly, href: `/${stateFriendly.toLowerCase()}` },
    { label: hhwEvent.county, href: `/${stateFriendly.toLowerCase()}/${countySlug}` },
    { label: "HHW Events" },
  ];

  // Parse arrays
  let acceptedList: string[] = [];
  try { acceptedList = JSON.parse(hhwEvent.acceptedItems); }
  catch { acceptedList = hhwEvent.acceptedItems ? hhwEvent.acceptedItems.split(',') : []; }

  let restrictionsList: string[] = [];
  try { restrictionsList = JSON.parse(hhwEvent.restrictions); }
  catch { restrictionsList = hhwEvent.restrictions ? hhwEvent.restrictions.split(',') : []; }

  // JSON-LD Event Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": hhwEvent.title,
    "startDate": hhwEvent.startDate.toISOString(),
    "endDate": hhwEvent.endDate.toISOString(),
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": isUpcoming ? "https://schema.org/EventScheduled" : "https://schema.org/EventMovedOnline",
    "location": {
      "@type": "Place",
      "name": hhwEvent.address,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": hhwEvent.county,
        "addressRegion": hhwEvent.state
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": hhwEvent.organizer
    }
  };

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div className="w-full bg-[#fcfcfc] min-h-screen">
      
      {/* ─── Status Banner ─── */}
      <div className={`w-full py-3 text-center ${isUpcoming ? 'bg-uber-green' : 'bg-uber-gray-200'}`}>
         <span className="text-[12px] font-bold text-uber-black tracking-widest uppercase">
           {isUpcoming ? `UPCOMING EVENT · ${hhwEvent.startDate.toLocaleDateString()}` : 'THIS EVENT HAS PASSED'}
         </span>
      </div>

      <div className="max-w-[1248px] mx-auto px-6 lg:px-12 pt-10 pb-8">
        <Breadcrumb items={breadcrumbs} />
        
        <h1 className="text-[36px] lg:text-[40px] font-bold text-uber-black leading-[1.1] tracking-[-1px] mt-8 mb-8 max-w-[900px]">
          {hhwEvent.title}
        </h1>
      </div>

      {/* ─── Event Details Grid (4-column black bar) ─── */}
      <div className="w-full bg-uber-black h-auto md:h-[88px] flex items-center">
         <div className="max-w-[1248px] w-full mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-6 py-6 md:py-0">
            {/* Date */}
            <div className="flex flex-col justify-center">
               <span className="text-[11px] font-bold text-uber-gray-400 tracking-wider uppercase mb-1">Date</span>
               <span className="text-[15px] font-medium text-white">{friendlyDate}</span>
            </div>
            {/* Time */}
            <div className="flex flex-col justify-center md:border-l md:border-uber-gray-800 md:pl-6">
               <span className="text-[11px] font-bold text-uber-gray-400 tracking-wider uppercase mb-1">Time</span>
               <span className="text-[15px] font-medium text-white">{timeString}</span>
            </div>
            {/* Location */}
            <div className="flex flex-col justify-center md:border-l md:border-uber-gray-800 md:pl-6">
               <span className="text-[11px] font-bold text-uber-gray-400 tracking-wider uppercase mb-1">Location</span>
               <span className="text-[15px] font-medium text-white">{hhwEvent.address}</span>
            </div>
            {/* Free/Organizer */}
            <div className="flex flex-col justify-center md:border-l md:border-uber-gray-800 md:pl-6">
               <span className="text-[11px] font-bold text-uber-gray-400 tracking-wider uppercase mb-1">Hosted By</span>
               <span className="text-[15px] font-medium text-uber-green truncate">{hhwEvent.organizer}</span>
            </div>
         </div>
      </div>

      <div className="max-w-[1248px] mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* ─── LEFT COLUMN (65%) ─── */}
          <div className="w-full lg:w-[65%] space-y-12">
            
            {/* Full Event Description */}
            <section>
              <p className="text-[16px] text-uber-gray-600 leading-relaxed max-w-[700px]">
                 Residents of <strong>{hhwEvent.county}</strong> are invited to safely dispose of their household hazardous waste. Please remain in your vehicle while volunteers unload items from your trunk or truck bed. Proof of residency (driver's license or utility bill) is typically required.
              </p>
            </section>

            {/* What's accepted Accordion */}
            <section>
              <h3 className="text-[22px] font-bold text-uber-black mb-6">What's accepted</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-main">
                  <AccordionTrigger className="text-[16px] font-bold text-uber-black hover:no-underline px-2 py-5">
                    Permitted Hazardous Items
                  </AccordionTrigger>
                  <AccordionContent className="text-[15px] text-uber-gray-600 leading-relaxed px-2 pb-5 pt-0">
                    <ul className="list-disc pl-5 space-y-1">
                      {acceptedList.map((itm, i) => <li key={i}>{itm}</li>)}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            {/* What's NOT accepted (Red Left Border Card) */}
            <section>
               <div className="flex bg-white rounded-uber-md border border-uber-gray-200 overflow-hidden shadow-sm">
                  <div className="w-1.5 bg-[#D44333] shrink-0" />
                  <div className="p-6">
                    <h3 className="text-[18px] font-bold text-uber-black mb-4 flex items-center gap-2">
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#D44333]">
                         <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                       </svg>
                       What is NOT accepted
                    </h3>
                    <ul className="space-y-2">
                       {restrictionsList.length > 0 ? restrictionsList.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-[15px] text-uber-gray-600">
                             <span className="text-[#D44333] font-bold mt-[-1px]">•</span> {item}
                          </li>
                       )) : (
                          <li className="text-[15px] text-uber-gray-600">No strict restrictions provided in database.</li>
                       )}
                    </ul>
                  </div>
               </div>
            </section>

            {/* Directions Card */}
            <section>
               <h3 className="text-[22px] font-bold text-uber-black mb-6">Location & Directions</h3>
               <div className="w-full rounded-uber-md border border-uber-gray-200 overflow-hidden bg-white shadow-sm flex flex-col md:flex-row">
                  {/* Embedded Map */}
                  <div className="w-full md:w-1/2 h-[240px] md:h-auto bg-uber-gray-100 flex items-center justify-center relative">
                    <span className="text-[13px] font-medium text-uber-gray-400 font-mono">[Google Maps Embed]</span>
                  </div>
                  <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                     <h4 className="text-[16px] font-bold text-uber-black mb-2">Event Address</h4>
                     <p className="text-[15px] text-uber-gray-600 mb-6">{hhwEvent.address}</p>
                     
                     <h4 className="text-[16px] font-bold text-uber-black mb-2">Parking & Routing Notes</h4>
                     <p className="text-[14px] text-uber-gray-500 leading-relaxed">Enter designated routing channels and do not exit your vehicle.</p>
                  </div>
               </div>
            </section>

          </div>

          {/* ─── RIGHT COLUMN (35%) ─── */}
          <div className="w-full lg:w-[35%] space-y-6">
             
             {/* Add to Calendar Card */}
             <Card className="rounded-uber-md border border-uber-gray-200 overflow-hidden shadow-sm p-6 pb-8">
               <h4 className="text-[18px] font-bold text-uber-black mb-4">Add to calendar</h4>
               <div className="flex flex-col gap-3">
                  <button className="flex items-center justify-between h-12 px-5 rounded-uber-pill border border-uber-gray-200 bg-white hover:border-uber-black hover:bg-uber-gray-50 transition-colors duration-uber-fast ease-uber text-[14px] font-medium text-uber-black">
                     Google Calendar
                     <span className="text-uber-gray-400">→</span>
                  </button>
                  <button className="flex items-center justify-between h-12 px-5 rounded-uber-pill border border-uber-gray-200 bg-white hover:border-uber-black hover:bg-uber-gray-50 transition-colors duration-uber-fast ease-uber text-[14px] font-medium text-uber-black">
                     Apple Calendar
                     <span className="text-uber-gray-400">→</span>
                  </button>
                  <button className="flex items-center justify-between h-12 px-5 rounded-uber-pill border border-uber-gray-200 bg-white hover:border-uber-black hover:bg-uber-gray-50 transition-colors duration-uber-fast ease-uber text-[14px] font-medium text-uber-black">
                     Outlook
                     <span className="text-uber-gray-400">→</span>
                  </button>
               </div>
             </Card>

             {/* Get Reminders Card */}
             <Card className="rounded-uber-md border-0 bg-uber-green overflow-hidden shadow-sm p-6 pt-7">
               <div className="flex items-center gap-3 mb-3">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-uber-black">
                   <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
                 </svg>
                 <h4 className="text-[20px] font-bold text-uber-black leading-none">Get reminders</h4>
               </div>
               <p className="text-[14px] text-uber-black/80 mb-5 font-medium leading-snug">
                 We'll remind you 7 days and 1 day before the event.
               </p>
               <EventReminderForm variant="dark" />
             </Card>

             {/* Share Card */}
             <div className="pt-2 pb-6 border-b border-uber-gray-200">
               <h4 className="text-[14px] font-bold text-uber-gray-500 uppercase tracking-widest mb-4">Share this event</h4>
               <div className="flex gap-4">
                  <span className="font-medium text-[14px] text-uber-black hover:text-uber-green transition-colors cursor-pointer">Twitter/X</span>
                  <span className="text-uber-gray-300">·</span>
                  <span className="font-medium text-[14px] text-uber-black hover:text-uber-green transition-colors cursor-pointer">Facebook</span>
                  <span className="text-uber-gray-300">·</span>
                  <button className="font-medium text-[14px] text-uber-black hover:text-uber-green transition-colors">Copy link</button>
               </div>
             </div>

             {/* Related Events */}
             {relatedRaw.length > 0 && (
                 <div className="pt-2">
                    <h4 className="text-[18px] font-bold text-uber-black mb-5">Also upcoming nearby</h4>
                    <div className="space-y-4">
                       {relatedRaw.map((evt) => {
                          let rAcc = [];
                          try { rAcc = JSON.parse(evt.acceptedItems); } catch {}
                          return (
                            <HHWEventCard
                               key={evt.id}
                               eventId={evt.id}
                               title={evt.title}
                               location={evt.address}
                               time={`${evt.startDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - ${evt.endDate.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}`}
                               day={evt.startDate.getDate()}
                               month={evt.startDate.toLocaleString('default', {month:'short'}).toUpperCase()}
                               acceptedItems={rAcc}
                               maxVisibleItems={2}
                            />
                          );
                       })}
                    </div>
                 </div>
             )}

          </div>

        </div>
      </div>
    </div>
    </>
  );
}
