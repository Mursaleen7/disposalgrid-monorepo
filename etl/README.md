# EPA HWIP ETL Pipeline

## Overview

This ETL script downloads and processes EPA Hazardous Waste Information Platform (HWIP) data, filtering for:
- **Active facilities only**
- **TSDF** (Treatment, Storage, Disposal Facilities)
- **Public HHW programs** (Recyclers, Transfer Facilities, Universal Waste handlers)

The script then upserts the data to Supabase using the EPA Handler ID as the primary key.

## Prerequisites

1. **Python 3.8+** installed
2. **Supabase project** set up with the updated schema
3. **EPA HWIP data files** downloaded (or script will attempt to download)

## Setup

### 1. Install Dependencies

```bash
cd disposalgrid-monorepo/etl
pip install -r requirements.txt
```

### 2. Configure Environment Variables

Copy the example env file and fill in your Supabase credentials:

```bash
cp .env.example .env
```

Edit `.env` and add:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
```

**Important:** Use the **SERVICE ROLE** key (not the anon key) for write access.

Find this in: Supabase Dashboard → Project Settings → API → `service_role` key

### 3. Update Database Schema

Run the updated schema in Supabase SQL Editor:

```bash
# Copy contents of ../database/schema_updated.sql
# Paste into Supabase SQL Editor and run
```

## Usage

### Run the ETL Script

```bash
python fetch_hwip.py
```

The script will:
1. ✅ Locate EPA HWIP CSV files (currently looks in `../HD_REPORTING/`)
2. ✅ Parse and filter for active TSDF and HHW facilities
3. ✅ Extract: Handler ID, name, address, lat/lon, facility type, waste codes
4. ✅ Upsert to Supabase `facilities` table in batches of 1,000

### Expected Output

```
============================================================
EPA HWIP Data ETL Process
============================================================

Step 1: Locating EPA HWIP data files...
Found 2 file(s) to process

Step 2: Processing CSV files...
Processing ../HD_REPORTING/HD_REPORTING_0.csv...
  Processed 10,000 rows, found 1,234 target facilities
  Processed 20,000 rows, found 2,456 target facilities
  ...
Completed: Found 15,678 target facilities

Total facilities found: 25,432

Step 3: Upserting to Supabase...
Upserted batch 1: 1,000 facilities (Total: 1,000)
Upserted batch 2: 1,000 facilities (Total: 2,000)
...

============================================================
ETL Complete!
Total facilities upserted: 25,432
============================================================
```

## Data Filtering Logic

### Active Facilities
- `ACTIVE SITE` field starts with 'H' (Handler)

### TSDF Facilities
- `AS FEDERALLY REGULATED TSDF` = 'Y'
- OR `OPERATING TSDF` = 'Y'

### Public HHW Programs
- `RECYCLER` = 'Y'
- OR `TRANSFER FACILITY` = 'Y'
- OR `UNIVWASTE` = 'Y' (Universal Waste handler)

## Data Mapping

| EPA Column | Supabase Column | Notes |
|------------|-----------------|-------|
| HANDLER ID | handler_id | Unique key |
| HANDLER NAME | name | Facility name |
| LOCATION STREET1 + STREET2 | address | Combined |
| LOCATION CITY | city | |
| LOCATION STATE | state | 2-letter code |
| LOCATION ZIP | zip_code | |
| LOCATION COUNTY NAME | county | |
| LOCATION LATITUDE | latitude | Decimal degrees |
| LOCATION LONGITUDE | longitude | Decimal degrees |
| GENSTATUS | generator_status | VSG/SQG/LQG |
| RECYCLER | is_recycler | Boolean |
| TRANSFER FACILITY | is_transfer_facility | Boolean |
| USED OIL | accepts_used_oil | Boolean |
| UNIVWASTE | accepts_universal_waste | Boolean |
| AS FEDERALLY REGULATED TSDF | is_tsdf | Boolean |
| CONTACT PHONE AND EXT | contact_phone | |
| CONTACT EMAIL ADDRESS | contact_email | |
| ACTIVE SITE | active_status | |
| HHANDLER LAST CHANGE | last_updated | Date |

## Troubleshooting

### "No data files found"
- Ensure EPA HWIP CSV files are in `../HD_REPORTING/` folder
- Or update `download_hwip_data()` function with correct path

### "SUPABASE_URL and SUPABASE_SERVICE_KEY must be set"
- Check `.env` file exists and has correct values
- Ensure you're using SERVICE ROLE key, not anon key

### "Error upserting facilities"
- Verify Supabase schema is updated (run `schema_updated.sql`)
- Check Supabase service is running
- Verify network connection

### "Error parsing row"
- Check CSV format matches expected EPA HWIP structure
- Verify column indices in `COLUMNS` dict are correct

## Performance

- **Processing Speed**: ~10,000 rows/second
- **Batch Size**: 1,000 facilities per upsert
- **Expected Runtime**: 2-5 minutes for 1.6M rows

## Next Steps

1. **Schedule Regular Updates**: Set up cron job or GitHub Action
2. **Add Waste Codes**: Parse and store accepted waste codes
3. **Download Automation**: Implement automatic EPA HWIP download
4. **Error Logging**: Add detailed error logging to database
5. **Data Validation**: Add validation checks for coordinates, addresses

## File Structure

```
etl/
├── fetch_hwip.py          # Main ETL script
├── requirements.txt       # Python dependencies
├── .env.example          # Environment variables template
├── .env                  # Your credentials (gitignored)
└── README.md             # This file
```
