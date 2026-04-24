import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const qMat = (searchParams.get("material") ?? "").trim();
  const qLoc = (searchParams.get("location") ?? "").trim();

  if (!qMat && !qLoc) {
    return NextResponse.json({ facilities: [] });
  }

  // Build Supabase query
  // Location can be a city, county, state, or zip — search across all
  let query = supabase
    .from("facilities")
    .select(
      "id, handler_id, name, address, city, state, county, zip_code, facility_type, active_status, is_recycler, accepts_used_oil, accepts_universal_waste, latitude, longitude"
    )
    .limit(50);

  if (qLoc) {
    // Extract just the city name if format is "City, ST"
    const locationParts = qLoc.split(',');
    const cityName = locationParts[0].trim();
    const stateCode = locationParts[1]?.trim();
    
    if (stateCode) {
      // If we have both city and state, use AND logic for better precision
      query = query
        .or(`city.ilike.%${cityName}%,county.ilike.%${cityName}%`)
        .ilike('state', `%${stateCode}%`);
    } else {
      // Single term search across all location fields
      query = query.or(
        `city.ilike.%${qLoc}%,county.ilike.%${qLoc}%,state.ilike.%${qLoc}%,zip_code.ilike.%${qLoc}%`
      );
    }
  }

  // Material filtering: narrow by facility type or boolean columns
  if (qMat) {
    const matLower = qMat.toLowerCase();
    if (matLower.includes("oil")) {
      query = query.eq("accepts_used_oil", true);
    } else if (matLower.includes("recycle") || matLower.includes("electronics") || matLower.includes("universal")) {
      query = query.or("is_recycler.eq.true,accepts_universal_waste.eq.true");
    }
    // For other materials we return all facilities in the location
    // (they accept general HHW — the facility type field has context)
  }

  // Get total count first (without limit)
  const countQuery = supabase
    .from("facilities")
    .select("id", { count: "exact", head: true });

  // Apply same filters to count query
  let countQueryFiltered = countQuery;
  
  if (qLoc) {
    const locationParts = qLoc.split(',');
    const cityName = locationParts[0].trim();
    const stateCode = locationParts[1]?.trim();
    
    if (stateCode) {
      countQueryFiltered = countQueryFiltered
        .or(`city.ilike.%${cityName}%,county.ilike.%${cityName}%`)
        .ilike('state', `%${stateCode}%`);
    } else {
      countQueryFiltered = countQueryFiltered.or(
        `city.ilike.%${qLoc}%,county.ilike.%${qLoc}%,state.ilike.%${qLoc}%,zip_code.ilike.%${qLoc}%`
      );
    }
  }

  if (qMat) {
    const matLower = qMat.toLowerCase();
    if (matLower.includes("oil")) {
      countQueryFiltered = countQueryFiltered.eq("accepts_used_oil", true);
    } else if (matLower.includes("recycle") || matLower.includes("electronics") || matLower.includes("universal")) {
      countQueryFiltered = countQueryFiltered.or("is_recycler.eq.true,accepts_universal_waste.eq.true");
    }
  }

  const { count: totalCount } = await countQueryFiltered;
  const { data, error } = await query;

  if (error) {
    console.error("Supabase search error:", error);
    return NextResponse.json({ facilities: [], error: error.message }, { status: 500 });
  }

  return NextResponse.json({ 
    facilities: data ?? [], 
    total: totalCount ?? 0,
    showing: (data ?? []).length,
    hasMore: (totalCount ?? 0) > 50
  });
}
