-- DisposalGrid Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Facilities table
CREATE TABLE facilities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  epa_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  address TEXT,
  county TEXT,
  state TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table (HHW events)
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  date DATE,
  location TEXT,
  county TEXT,
  state TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Counties table
CREATE TABLE counties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  state TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  population INTEGER,
  facilities_count INTEGER DEFAULT 0,
  events_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Materials table
CREATE TABLE materials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT,
  description TEXT,
  disposal_instructions TEXT,
  hazardous BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Source log table (tracks data scraping/updates)
CREATE TABLE source_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_name TEXT NOT NULL,
  source_type TEXT,
  records_processed INTEGER DEFAULT 0,
  status TEXT,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_facilities_county ON facilities(county);
CREATE INDEX idx_facilities_state ON facilities(state);
CREATE INDEX idx_facilities_epa_id ON facilities(epa_id);

CREATE INDEX idx_events_county ON events(county);
CREATE INDEX idx_events_state ON events(state);
CREATE INDEX idx_events_date ON events(date);

CREATE INDEX idx_counties_state ON counties(state);
CREATE INDEX idx_counties_slug ON counties(slug);

CREATE INDEX idx_materials_slug ON materials(slug);
CREATE INDEX idx_materials_category ON materials(category);

CREATE INDEX idx_source_log_created_at ON source_log(created_at);
CREATE INDEX idx_source_log_status ON source_log(status);

-- Enable Row Level Security (RLS)
ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE counties ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE source_log ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on facilities" ON facilities
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on events" ON events
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on counties" ON counties
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on materials" ON materials
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on source_log" ON source_log
  FOR SELECT USING (true);

-- Insert some sample materials
INSERT INTO materials (name, slug, category, description, hazardous) VALUES
  ('Electronics', 'electronics', 'E-Waste', 'Computers, phones, TVs, and other electronic devices', true),
  ('Paint & Solvents', 'paint-solvents', 'Household Hazardous Waste', 'Latex and oil-based paints, paint thinners, solvents', true),
  ('Mattresses', 'mattresses', 'Bulky Items', 'Mattresses and box springs for recycling', false),
  ('Batteries', 'batteries', 'Household Hazardous Waste', 'All types of batteries including lithium, alkaline, and car batteries', true),
  ('Motor Oil', 'motor-oil', 'Automotive', 'Used motor oil and automotive fluids', true),
  ('Tires', 'tires', 'Automotive', 'Used vehicle tires', false);

-- Success message
SELECT 'Schema created successfully!' as message;
