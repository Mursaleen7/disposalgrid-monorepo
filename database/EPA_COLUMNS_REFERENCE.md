# EPA Data - Quick Column Reference

## Must-Have Columns (10)

| # | Column Name | Example | Purpose |
|---|-------------|---------|---------|
| 1 | HANDLER ID | "AK0000000430" | Unique EPA facility ID |
| 5 | HANDLER NAME | "DPW-USDW AND HEMF" | Facility name |
| 14 | LOCATION STREET1 | "1105 FIRST STREET" | Primary address |
| 16 | LOCATION CITY | "NUIQSUT" | City |
| 17 | LOCATION STATE | "AK" | State code |
| 18 | LOCATION ZIP | "99789" | ZIP code |
| 20 | LOCATION COUNTY NAME | "NORTH SLOPE" | County name |
| 118 | LOCATION LATITUDE | "70.214" | Latitude |
| 119 | LOCATION LONGITUDE | "-150.988" | Longitude |
| 12 | ACTIVE SITE | "HPA--" | Active status |

## Nice-to-Have Columns (8)

| # | Column Name | Example | Purpose |
|---|-------------|---------|---------|
| 60 | GENSTATUS | "SQG" | Generator size (VSG/SQG/LQG) |
| 66 | RECYCLER | "N" | Is recycling facility? |
| 65 | TRANSFER FACILITY | "N" | Is transfer station? |
| 73 | USED OIL | "N" | Accepts used oil? |
| 71 | UNIVWASTE | "N" | Universal waste handler? |
| 40 | CONTACT PHONE AND EXT | "907-382-4353" | Phone number |
| 42 | CONTACT EMAIL ADDRESS | "email@example.com" | Email |
| 109 | HHANDLER LAST CHANGE | "20250916" | Last updated |

## Data Stats

- **Total Records**: 1,589,000+ facilities
- **Total Columns**: 122 columns
- **Files**: 2 CSV files
- **Format**: Quoted CSV with comma delimiter

## Generator Status Codes

- **VSG** = Very Small Quantity Generator
- **SQG** = Small Quantity Generator
- **LQG** = Large Quantity Generator
- **HQ** = Headquarters (not a generator)

## Active Site Codes

The ACTIVE SITE field uses position-based flags:
- Position 1: H = Handler
- Position 2: P = Permit
- Position 3: A = Active
- Example: "HPA--" = Handler with Permit, Active

## Quick Filter Rules

```sql
-- Active facilities only
WHERE ACTIVE SITE LIKE 'H%'

-- US facilities only  
WHERE LOCATION COUNTRY = 'US'

-- Has coordinates
WHERE LOCATION LATITUDE != '' AND LOCATION LONGITUDE != ''

-- Recycling facilities
WHERE RECYCLER = 'Y'
```

## Column Index Quick Reference

```
1-10:    IDs and metadata
11-24:   Location address
25-31:   Mailing address
32-43:   Contact info
44-49:   Owner/operator
50-53:   NAICS codes
54-74:   Handler type flags
75-109:  Regulatory/compliance
110-122: Notes, coordinates, language
```
