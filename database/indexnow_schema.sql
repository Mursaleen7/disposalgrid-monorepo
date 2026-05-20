-- Supabase Migration: Create indexnow_logs table to track submitted URLs
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS indexnow_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT UNIQUE NOT NULL,
  priority DECIMAL(3, 2),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index to quickly check if a URL has already been processed
CREATE INDEX IF NOT EXISTS idx_indexnow_logs_url ON indexnow_logs(url);
CREATE INDEX IF NOT EXISTS idx_indexnow_logs_priority ON indexnow_logs(priority);

-- Enable RLS for good measure
ALTER TABLE indexnow_logs ENABLE ROW LEVEL SECURITY;

-- Allow reading logs publicly
CREATE POLICY "Allow public read access on indexnow_logs" ON indexnow_logs
  FOR SELECT USING (true);

-- Allow inserting logs from the API (using anon key)
CREATE POLICY "Allow public insert on indexnow_logs" ON indexnow_logs
  FOR INSERT WITH CHECK (true);

SELECT 'indexnow_logs table created successfully!' as message;
