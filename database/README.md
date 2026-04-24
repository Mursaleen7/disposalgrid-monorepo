# Database Setup Guide

## Supabase Setup Instructions

### Step 1: Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in:
   - **Project name**: DisposalGrid
   - **Database password**: (save this securely)
   - **Region**: Choose closest to your users
5. Click "Create new project" and wait for setup to complete

### Step 2: Run the Schema SQL

1. In your Supabase dashboard, click on **SQL Editor** in the left sidebar
2. Click **New query**
3. Copy the entire contents of `schema.sql` from this folder
4. Paste it into the SQL editor
5. Click **Run** (or press Cmd/Ctrl + Enter)
6. You should see "Schema created successfully!" message

### Step 3: Get Your Connection Details

1. Go to **Project Settings** (gear icon in sidebar)
2. Click **API** tab
3. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

### Step 4: Configure Your App

Create a `.env.local` file in `disposalgrid-monorepo/site/`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## Database Schema Overview

### Tables Created

1. **facilities** - Disposal facilities and drop-off locations
   - `id`, `epa_id`, `name`, `address`, `county`, `state`, `created_at`

2. **events** - Household Hazardous Waste (HHW) events
   - `id`, `event_id`, `name`, `date`, `location`, `county`, `state`, `created_at`

3. **counties** - County information and statistics
   - `id`, `name`, `state`, `slug`, `population`, `facilities_count`, `events_count`, `created_at`

4. **materials** - Types of materials that can be disposed
   - `id`, `name`, `slug`, `category`, `description`, `disposal_instructions`, `hazardous`, `created_at`

5. **source_log** - Tracks data scraping and ETL operations
   - `id`, `source_name`, `source_type`, `records_processed`, `status`, `error_message`, `created_at`

### Features Included

- ✅ UUID primary keys
- ✅ Indexes for fast queries
- ✅ Row Level Security (RLS) enabled
- ✅ Public read access policies
- ✅ Sample materials data pre-populated

## Next Steps

1. **Install Supabase client** in your Next.js app:
   ```bash
   cd disposalgrid-monorepo/site
   npm install @supabase/supabase-js
   ```

2. **Create Supabase client** (`src/lib/supabase.ts`):
   ```typescript
   import { createClient } from '@supabase/supabase-js'

   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
   const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

   export const supabase = createClient(supabaseUrl, supabaseAnonKey)
   ```

3. **Start querying data**:
   ```typescript
   import { supabase } from '@/lib/supabase'

   // Get all materials
   const { data, error } = await supabase
     .from('materials')
     .select('*')
   ```

## Troubleshooting

- **"relation does not exist" error**: Make sure you ran the entire schema.sql file
- **"permission denied" error**: Check that RLS policies are created
- **Can't connect**: Verify your `.env.local` file has correct credentials
