"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./tabs";
import { FacilityCard } from "./facility-card";
import { JunkRemovalCTA } from "./junk-removal-cta";
import { FacilityBadgeType } from "./facility-card";

/* ─── Interfaces ─── */

export interface FacilityData {
  id: string;
  epaHandlerId: string;
  name: string;
  address: string;
  distance: string;
  status: string;
  isFree: boolean;
  acceptedCodes: string[];
}

export interface FacilityFilterProps {
  facilities: FacilityData[];
  county: string;
}

export function FacilityFilter({ facilities, county }: FacilityFilterProps) {
  const [activeTab, setActiveTab] = useState("all");

  // Derive badges from raw data to match UI spec cleanly
  const augmentWithBadges = (fac: FacilityData) => {
    const badges: { type: FacilityBadgeType; label: string }[] = [];
    if (fac.isFree) badges.push({ type: "free", label: "Free drop-off" });
    
    // Simple logic to translate raw SQLite JSON text "acceptedCodes" into badge arrays
    const codesStr = Array.isArray(fac.acceptedCodes) ? fac.acceptedCodes.join(",") : fac.acceptedCodes || "";
    
    if (codesStr.includes("Limit:")) {
       badges.push({ type: "limit", label: "Limit restrictions apply" });
    }
    if (fac.status.includes("Appointment")) {
       badges.push({ type: "warning", label: "Appointment Required" });
    }
    if (!fac.isFree && !codesStr.includes("Limit:")) {
       badges.push({ type: "accepted", label: "Paid Drop-off" });
    }

    return { ...fac, badges };
  };

  // Filter Logic
  const getFilteredFacilities = () => {
    let filtered = [...facilities];
    
    if (activeTab === "free") {
      filtered = filtered.filter(f => f.isFree);
    } else if (activeTab === "events") {
      // Mocking: Assume some facilities are event-only locations for the sake of the tab, or return empty indicating look at sidebar
      filtered = filtered.filter(f => f.status.includes("Event"));
    } else if (activeTab === "accepted") {
      // Mock: sorts by widest accepted range
      filtered = filtered.sort((a,b) => b.acceptedCodes.length - a.acceptedCodes.length);
    }
    
    return filtered.map(augmentWithBadges);
  };

  const filteredData = getFilteredFacilities();

  return (
    <>
      <div className="mb-8 border-b border-uber-gray-200">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-transparent border-0 h-auto p-0 flex space-x-6 overflow-x-auto hide-scrollbar">
            <TabsTrigger 
              value="all" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-uber-black data-[state=active]:text-uber-black data-[state=active]:bg-transparent text-uber-gray-500 font-medium px-1 py-3"
            >
              All locations
            </TabsTrigger>
            <TabsTrigger 
              value="free" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-uber-black data-[state=active]:text-uber-black data-[state=active]:bg-transparent text-uber-gray-500 font-medium px-1 py-3"
            >
              Free only
            </TabsTrigger>
            <TabsTrigger 
              value="events" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-uber-black data-[state=active]:text-uber-black data-[state=active]:bg-transparent text-uber-gray-500 font-medium px-1 py-3"
            >
              Upcoming events
            </TabsTrigger>
            <TabsTrigger 
              value="accepted" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-uber-black data-[state=active]:text-uber-black data-[state=active]:bg-transparent text-uber-gray-500 font-medium px-1 py-3"
            >
              What's accepted
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-4 mb-8">
        {filteredData.length === 0 ? (
           <div className="py-8 text-center text-uber-gray-500 border border-uber-gray-200 border-dashed rounded-uber-md">
              No matching drop-off locations found for this filter.
           </div>
        ) : (
          filteredData.map((fac, idx) => (
            <React.Fragment key={fac.epaHandlerId}>
              <FacilityCard
                variant="full"
                name={fac.name}
                epaHandlerId={fac.epaHandlerId}
                address={fac.address}
                distance={fac.distance}
                status={fac.status}
                badges={fac.badges}
              />

              {/* Interspersed Monetization component after 3rd facility (index 2) */}
              {idx === 2 && (
                <div className="py-2">
                   <JunkRemovalCTA countyName={county} />
                </div>
              )}
            </React.Fragment>
          ))
        )}
      </div>
    </>
  );
}
