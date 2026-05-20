-- DisposalGrid Database Schema - Updated for EPA HWIP Data
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing facilities table if updating
-- DROP TABLE IF EXISTS facilities CASCADE;

-- Facilities table (updated for EPA HWIP data)
CREATE TABLE IF NOT EXISTS facilities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  handler_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  county TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  facility_type TEXT,
  generator_status TEXT,
  is_recycler BOOLEAN DEFAULT FALSE,
  is_transfer_facility BOOLEAN DEFAULT FALSE,
  accepts_used_oil BOOLEAN DEFAULT FALSE,
  accepts_universal_waste BOOLEAN DEFAULT FALSE,
  is_tsdf BOOLEAN DEFAULT FALSE,
  contact_phone TEXT,
  contact_email TEXT,
  active_status TEXT,
  waste_codes TEXT[],
  last_updated DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_facilities_handler_id ON facilities(handler_id);
CREATE INDEX IF NOT EXISTS idx_facilities_county ON facilities(county);
CREATE INDEX IF NOT EXISTS idx_facilities_state ON facilities(state);
CREATE INDEX IF NOT EXISTS idx_facilities_city ON facilities(city);
CREATE INDEX IF NOT EXISTS idx_facilities_zip ON facilities(zip_code);
CREATE INDEX IF NOT EXISTS idx_facilities_location ON facilities(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_facilities_type ON facilities(facility_type);
CREATE INDEX IF NOT EXISTS idx_facilities_active ON facilities(active_status);

-- Enable Row Level Security (RLS)
ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
DROP POLICY IF EXISTS "Allow public read access on facilities" ON facilities;
CREATE POLICY "Allow public read access on facilities" ON facilities
  FOR SELECT USING (true);

-- Success message
SELECT 'Updated schema created successfully!' as message;
