# Quick Start Guide - EPA HWIP ETL

## 5-Minute Setup

### Step 1: Install Python Dependencies (1 min)

```bash
cd disposalgrid-monorepo/etl
pip install -r requirements.txt
```

### Step 2: Configure Supabase (2 min)

1. Copy environment template:
```bash
cp .env.example .env
```

2. Get your Supabase credentials:
   - Go to Supabase Dashboard
   - Click **Project Settings** → **API**
   - Copy **Project URL** and **service_role** key

3. Edit `.env`:
```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGc...your-service-key
```

### Step 3: Update Database Schema (1 min)

1. Open Supabase Dashboard → **SQL Editor**
2. Copy contents of `../database/schema_updated.sql`
3. Paste and click **Run**

### Step 4: Test Connection (30 sec)

```bash
python test_connection.py
```

You should see:
```
✅ Connection successful!
✅ Facilities table exists!
✅ Insert successful!
✅ All tests passed!
```

### Step 5: Run ETL (1 min)

```bash
python fetch_hwip.py
```

## Done! 🎉

Your facilities data is now in Supabase and ready to use in your Next.js app.

## Next Steps

1. **Query from Next.js**: Use the Supabase client to fetch facilities
2. **Schedule Updates**: Set up daily/weekly ETL runs
3. **Add More Data**: Process events, materials, etc.

## Troubleshooting

**"No data files found"**
- Ensure CSV files are in `../HD_REPORTING/` folder

**"Connection failed"**
- Check `.env` file has correct credentials
- Verify you're using SERVICE ROLE key (not anon key)

**"Schema test failed"**
- Run `schema_updated.sql` in Supabase SQL Editor
