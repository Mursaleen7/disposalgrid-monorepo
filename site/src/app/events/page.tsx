import React from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const metadata = {
  title: "Upcoming HHW Events | DisposalGrid",
  description: "Find local Household Hazardous Waste collection events to safely drop off chemicals, paint, batteries, and electronics.",
};

export default async function EventsHub() {
  const { data: events = [] } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true });

  return (
    <div className="w-full min-h-screen bg-white">
      {/* ━━━ Hero ━━━ */}
      <div className="bg-uber-black pt-[120px] pb-[64px] px-6 lg:px-12">
        <div className="max-w-[1248px] mx-auto">
          <span className="uber-overline text-uber-green mb-5 inline-block">COLLECTION EVENTS</span>
          <h1 className="text-[44px] md:text-[52px] font-bold text-white tracking-[-1.5px] leading-[1.05] mb-5 max-w-[700px]">
            Household Hazardous Waste drives
          </h1>
          <p className="text-[18px] text-uber-gray-400 max-w-[520px] leading-[1.6] mb-10">
            Drop off prohibited chemicals, volatile solvents, and batteries at safe, county-hosted collection events.
          </p>
          <Link
            href="/search"
            className="inline-flex items-center h-12 px-8 bg-white text-uber-black text-[14px] font-medium rounded-uber-pill hover:bg-uber-gray-200 transition-colors duration-uber-fast"
          >
            Search by location
          </Link>
        </div>
      </div>

      {/* ━━━ Events Feed ━━━ */}
      <div className="max-w-[1248px] mx-auto px-6 lg:px-12 py-[64px]">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-uber-gray-100">
          <h2 className="text-[24px] font-bold text-uber-black tracking-[-0.5px]">National Registry</h2>
          <span className="text-[13px] font-medium text-uber-gray-400">{events?.length || 0} upcoming</span>
        </div>

        <div className="space-y-3">
          {events && events.map((evt) => {
            const accepted: string[] = [];
            
            // Parse date
            const eventDate = new Date(evt.date);
            const day = eventDate.getDate();
            const month = eventDate.toLocaleString("default", { month: "short" }).toUpperCase();
            const dateStr = eventDate.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            });

            return (
              <Link 
                key={evt.id} 
                href={`/events/${evt.event_id}`}
                className="flex items-start gap-6 p-6 rounded-uber-md border border-uber-gray-200 bg-white hover:border-uber-black transition-colors duration-uber-fast group"
              >
                {/* Date Block */}
                <div className="w-[56px] h-[64px] rounded-uber bg-uber-gray-50 flex flex-col items-center justify-center shrink-0 group-hover:bg-uber-green-light transition-colors">
                  <span className="text-[11px] font-bold text-uber-gray-500 uppercase leading-none">{month}</span>
                  <span className="text-[24px] font-bold text-uber-black leading-none mt-0.5">{day}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-[17px] font-bold text-uber-black mb-1 group-hover:text-uber-green transition-colors">
                    {evt.name}
                  </h3>
                  <p className="text-[14px] text-uber-gray-500 mb-1">{dateStr}</p>
                  <p className="text-[14px] text-uber-gray-400 mb-3">{evt.location} · {evt.county}, {evt.state}</p>
                  
                  {accepted.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {accepted.slice(0, 5).map((item, i) => (
                        <span key={i} className="badge-accepted">{item}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Arrow */}
                <div className="hidden sm:flex items-center justify-center w-8 h-8 shrink-0 self-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-uber-gray-300 group-hover:text-uber-black transition-colors"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
              </Link>
            );
          })}
        </div>

        {(!events || events.length === 0) && (
          <div className="py-[80px] text-center">
            <h3 className="text-[20px] font-bold text-uber-black mb-2">No events scheduled</h3>
            <p className="text-[15px] text-uber-gray-500 max-w-[400px] mx-auto">
              Check back soon — counties update their HHW collection schedules quarterly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
