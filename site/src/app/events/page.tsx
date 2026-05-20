import React from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const metadata = {
  title: "HHW Events | DisposalGrid",
  description: "Find local Household Hazardous Waste collection events.",
};

export default async function EventsHub() {
  const { data: dbEvents } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true });

  const mockEvents = [
    {
      id: "mock-1",
      event_id: "mock-1",
      date: "2024-06-07T10:00:00Z",
      name: "Rubicon Technologies Receives Delisting Notice from the New York Stock Exchange",
      location: "Corporate HQ",
      county: "Fayette",
      state: "KY"
    },
    {
      id: "mock-2",
      event_id: "mock-2",
      date: "2024-03-12T09:00:00Z",
      name: "Rubicon Announces Fourth Quarter and Full Year 2023 Financial Results",
      location: "Virtual Webcast",
      county: "Fayette",
      state: "KY"
    },
    {
      id: "mock-3",
      event_id: "mock-3",
      date: "2023-12-05T08:00:00Z",
      name: "Rubicon Signs Multi-Year Agreement with Leading National Logistics Provider",
      location: "Press Room",
      county: "Fayette",
      state: "KY"
    }
  ];

  const events = dbEvents && dbEvents.length > 0 ? dbEvents : mockEvents;

  return (
    <div className="w-full min-h-screen bg-[#FFFFFF] text-[#1A1A1A] font-sans">
      {/* ━━━ Hero / Title Area ━━━ */}
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12 pt-[120px] pb-4">
        <h1 className="text-[56px] md:text-[72px] font-light text-[#1A1A1A] tracking-[-1px] leading-none mb-16 text-left">
          HHW Events
        </h1>
        
        {/* Navigation Tabs */}
        <div className="flex gap-8 border-b border-[#E5E5E5]">
          <button className="pb-4 text-[16px] font-bold text-[#1A1A1A] border-b-[3px] border-[#1A1A1A] hover:text-[#0C3839] transition-colors">
            Upcoming Events
          </button>
          <button className="pb-4 text-[16px] font-medium text-[#666666] hover:text-[#1A1A1A] transition-colors">
            Past Events
          </button>
        </div>
      </div>

      {/* ━━━ Content Section (The News Feed) ━━━ */}
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12 pb-[160px]">
        <div className="flex flex-col">
          {events && events.map((evt) => {
            // Parse date to "June 7, 2024" format
            const eventDate = new Date(evt.date);
            const dateStr = eventDate.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            });

            return (
              <div key={evt.id} className="py-10 border-b border-[#E5E5E5] group">
                <div className="text-[14px] text-[#666666] font-medium mb-3">
                  {dateStr}
                </div>
                <Link href={`/events/${evt.event_id}`} className="inline-block">
                  <h3 className="text-[26px] md:text-[32px] font-medium text-[#1A1A1A] leading-[1.15] tracking-tight group-hover:text-[#0C3839] group-hover:underline decoration-1 underline-offset-4 transition-all">
                    {evt.name}
                  </h3>
                </Link>
                {/* Clean presentation of location metadata */}
                <div className="text-[15px] text-[#666666] mt-4 font-light">
                  {evt.location} <span className="mx-2 text-[#E5E5E5]">|</span> {evt.county}, {evt.state}
                </div>
              </div>
            );
          })}
        </div>

        {(!events || events.length === 0) && (
          <div className="py-[80px] text-left">
            <h3 className="text-[24px] font-medium text-[#1A1A1A] mb-3">No events scheduled</h3>
            <p className="text-[16px] text-[#666666]">
              Check back soon — counties update their collection schedules quarterly.
            </p>
          </div>
        )}

        {/* Load More Button */}
        {events && events.length > 0 && (
          <div className="mt-16 flex justify-start">
            <button className="px-10 py-3.5 rounded-full border border-[#1A1A1A] text-[#1A1A1A] text-[15px] font-medium hover:bg-[#F4F5F6] transition-colors duration-300">
              Load more
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
