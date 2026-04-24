import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default async function EventDetailPage({ params }: { params: { "event-id": string } }) {
  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("event_id", params["event-id"])
    .single();

  if (!event) {
    notFound();
  }

  const eventDate = new Date(event.date);
  const dateStr = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="bg-uber-black pt-[120px] pb-[64px] px-6 lg:px-12">
        <div className="max-w-[1248px] mx-auto">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-[14px] text-uber-gray-400 hover:text-white mb-6 transition-colors"
          >
            ← Back to Events
          </Link>
          <h1 className="text-[44px] md:text-[52px] font-bold text-white tracking-[-1.5px] leading-[1.05] mb-5">
            {event.name}
          </h1>
          <p className="text-[18px] text-uber-gray-400 mb-2">{dateStr}</p>
          <p className="text-[16px] text-uber-gray-400">
            {event.location} · {event.county}, {event.state}
          </p>
        </div>
      </div>

      <div className="max-w-[1248px] mx-auto px-6 lg:px-12 py-[64px]">
        <div className="prose max-w-none">
          <h2 className="text-[24px] font-bold text-uber-black mb-4">Event Details</h2>
          <p className="text-[16px] text-uber-gray-600 mb-8">
            This is a household hazardous waste collection event. Please check with the organizer for specific details about accepted materials and requirements.
          </p>

          <div className="bg-uber-gray-50 rounded-uber-md p-6 mb-8">
            <h3 className="text-[18px] font-bold text-uber-black mb-3">Location</h3>
            <p className="text-[15px] text-uber-gray-600">{event.location}</p>
            <p className="text-[15px] text-uber-gray-600">{event.county}, {event.state}</p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center h-12 px-8 bg-uber-black text-white text-[14px] font-medium rounded-uber-pill hover:bg-uber-gray-800 transition-colors"
          >
            View All Events
          </Link>
        </div>
      </div>
    </div>
  );
}
