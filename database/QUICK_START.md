# Quick Start - Supabase Setup

## What to Type in Supabase

### 1. Open Supabase SQL Editor
- Go to your Supabase project dashboard
- Click **SQL Editor** in the left sidebar
- Click **New query**

### 2. Copy & Paste This SQL

Open the `schema.sql` file in this folder and copy ALL of it, then paste into the Supabase SQL editor.

Or copy this shortened version:

```sql
-- Create tables
CREATE TABLE facilities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  epa_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  address TEXT,
  county TEXT,
  state TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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

CREATE TABLE source_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_name TEXT NOT NULL,
  source_type TEXT,
  records_processed INTEGER DEFAULT 0,
  status TEXT,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. Click "Run"

Press the **Run** button or hit `Cmd + Enter` (Mac) / `Ctrl + Enter` (Windows)

### 4. Verify Tables Created

- Click **Table Editor** in the left sidebar
- You should see 5 tables: facilities, events, counties, materials, source_log

## Done! 🎉

Your database is ready. Next step: Connect your Next.js app to Supabase.
