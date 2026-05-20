# EPA Hazardous Waste Data Analysis

## Data Source
**EPA Hazardous Waste Information Platform (HWIP)**
- URL: hwip.epa.gov
- Data Location: `HD_REPORTING/` folder
- Files: `HD_REPORTING_0.csv`, `HD_REPORTING_1.csv`

## Dataset Overview

### File Statistics
- **Total Records**: ~1,589,000 rows (1.6M facilities)
- **File 1**: 1,000,001 rows (including header)
- **File 2**: 589,002 rows (including header)
- **Total Columns**: 122 columns

### Data Format
- Format: CSV (Comma-separated values)
- Encoding: Standard text with quoted fields
- Delimiter: Comma (`,`)
- Quote Character: Double quote (`"`)

## Column Structure (122 Total Columns)

### 🔑 Key Identification Fields
1. **HANDLER ID** - Unique EPA facility identifier (e.g., "AK0000000430")
2. **HANDLER NAME** - Facility name (e.g., "DPW-USDW AND HEMF")
3. **SEQ NUMBER** - Sequence number for the handler

### 📍 Location Fields (Critical for DisposalGrid)
13. **LOCATION STREET NO** - Street number
14. **LOCATION STREET1** - Primary street address
15. **LOCATION STREET2** - Secondary address line
16. **LOCATION CITY** - City name (e.g., "NUIQSUT")
17. **LOCATION STATE** - State code (e.g., "AK")
18. **LOCATION ZIP** - ZIP code (e.g., "99789")
19. **LOCATION COUNTY CODE** - County FIPS code (e.g., "AK185")
20. **LOCATION COUNTY NAME** - County name (e.g., "NORTH SLOPE")
21. **LOCATION COUNTRY** - Country code (e.g., "US")
118. **LOCATION LATITUDE** - Latitude coordinate (e.g., "70.214")
119. **LOCATION LONGITUDE** - Longitude coordinate (e.g., "-150.988")
120. **LOCATION GIS PRIMARY** - GIS primary indicator
121. **LOCATION GIS ORIGIN** - GIS data origin code

### 📧 Contact Information
32. **CONTACT NAME** - Contact person name
40. **CONTACT PHONE AND EXT** - Phone number with extension
41. **CONTACT FAX** - Fax number
42. **CONTACT EMAIL ADDRESS** - Email address
43. **CONTACT TITLE** - Contact person's title
122. **CONTACT LANGUAGE** - Language preference (e.g., "EN")

### 🏢 Facility Classification
10. **REGION** - EPA region number
11. **STATE** - State code
12. **ACTIVE SITE** - Active status indicator
24. **LAND TYPE** - Type of land (F=Federal, M=Municipal, P=Private, I=Indian)
50-53. **NAIC1-4** - NAICS industry codes

### ♻️ Waste Handler Types (Boolean Flags)
60. **GENSTATUS** - Generator status (VSG, SQG, LQG)
61. **SHORT TERM GENERATOR** - Short-term generator flag
62. **IMPORTER** - Waste importer flag
63. **MIXED WASTE GENERATOR** - Mixed waste flag
64. **TRANSPORTER** - Transporter flag
65. **TRANSFER FACILITY** - Transfer facility flag
66. **RECYCLER** - Recycling facility flag
67. **ONSITE BURNER EXEMPT** - Onsite burner exemption
68. **FURNACE EXEMPTION** - Furnace exemption flag
69. **UNDERGROUND INJECTION** - Underground injection flag
70. **OFF SITE RECEIPT** - Off-site receipt flag
71. **UNIVWASTE** - Universal waste handler
72. **UNIVERSAL WASTE DEST FACILITY** - Universal waste destination
73. **USED OIL** - Used oil handler
115. **RECYCLER NONSTORAGE** - Recycler without storage

### 📅 Temporal Fields
7. **RECEIVE DATE** - Date received (YYYYMMDD format, e.g., "20250915")
8. **REPORT CYCLE** - Reporting cycle
109. **HHANDLER LAST CHANGE** - Last change date (YYYYMMDD format)

### 🏛️ Regulatory & Compliance
75-78. **AS FEDERALLY REGULATED TSDF** - Treatment, Storage, Disposal Facility flags
79. **FEDERAL INDICATOR** - Federal facility indicator
102. **OPERATING TSDF** - Operating TSDF flag
103. **FULL ENFORCEMENT** - Full enforcement flag
104. **SNC** - Significant Non-Complier flag
105. **UNADDRESSED SNC** - Unaddressed SNC
106. **ADDRESSED SNC** - Addressed SNC

### 📝 Owner/Operator Information
44. **OWNER NAME** - Owner name
45. **OWNER TYPE** - Owner type code
47. **OPERATOR NAME** - Operator name
48. **OPERATOR TYPE** - Operator type code

## Sample Data Row

```csv
Handler ID: AK0000000430
Name: DPW-USDW AND HEMF
City: NUIQSUT
State: AK
ZIP: 99789
County: NORTH SLOPE
Latitude: 70.214
Longitude: -150.988
Generator Status: SQG (Small Quantity Generator)
Land Type: M (Municipal)
```

## Key Observations for ETL Design

### ✅ Good News
1. **Geocoding Complete** - Lat/Long already provided (columns 118-119)
2. **Standardized IDs** - EPA Handler IDs are unique and consistent
3. **County Data** - Both county codes and names provided
4. **Active Status** - Can filter for active facilities only
5. **Facility Types** - Multiple boolean flags to categorize facilities

### ⚠️ Challenges to Address
1. **Data Volume** - 1.6M records need efficient processing
2. **Multiple Files** - Data split across 2 CSV files
3. **Many Columns** - 122 columns but only need ~15-20 for DisposalGrid
4. **Boolean Flags** - Many Y/N flags need to be parsed
5. **Date Format** - Dates in YYYYMMDD format need conversion
6. **Empty Fields** - Many optional fields may be empty
7. **Generator Status Codes** - Need to decode VSG, SQG, LQG, etc.

### 🎯 Columns We Actually Need for DisposalGrid

**Essential (10 columns):**
1. HANDLER ID (EPA ID)
2. HANDLER NAME (Facility name)
3. LOCATION STREET1 + STREET2 (Address)
4. LOCATION CITY
5. LOCATION STATE
6. LOCATION ZIP
7. LOCATION COUNTY NAME
8. LOCATION LATITUDE
9. LOCATION LONGITUDE
10. ACTIVE SITE (Filter for active only)

**Useful (8 columns):**
11. GENSTATUS (Generator type)
12. RECYCLER (Is recycling facility?)
13. TRANSFER FACILITY (Is transfer station?)
14. USED OIL (Accepts used oil?)
15. UNIVWASTE (Universal waste handler?)
16. CONTACT PHONE AND EXT
17. CONTACT EMAIL ADDRESS
18. HHANDLER LAST CHANGE (Last updated)

## Generator Status Codes

Based on the data:
- **VSG** = Very Small Quantity Generator
- **SQG** = Small Quantity Generator  
- **LQG** = Large Quantity Generator
- **HQ** = Headquarters (not a generator)

## Next Steps for ETL

### DO NOT CODE YET - Planning Phase

1. **Filter Strategy**
   - Filter for ACTIVE SITE = "H" or contains "H"
   - Filter for US facilities only (LOCATION COUNTRY = "US")
   - Consider filtering by STATE for initial testing

2. **Data Transformation Needs**
   - Combine LOCATION STREET1 + STREET2 into single address
   - Convert YYYYMMDD dates to proper date format
   - Parse boolean Y/N flags to true/false
   - Handle empty/null values gracefully

3. **Database Mapping**
   - Map to `facilities` table in Supabase
   - EPA HANDLER ID → epa_id
   - HANDLER NAME → name
   - Combined address → address
   - LOCATION COUNTY NAME → county
   - LOCATION STATE → state
   - Add lat/long fields to schema

4. **Performance Considerations**
   - Process in batches (10k-50k rows at a time)
   - Use bulk insert operations
   - Create indexes after data load
   - Consider parallel processing for multiple states

5. **Data Quality Checks**
   - Verify lat/long are valid coordinates
   - Check for duplicate HANDLER IDs
   - Validate state codes match location
   - Ensure required fields are not empty

## Questions to Answer Before Coding

- [ ] Do we want ALL 1.6M facilities or filter by type?
- [ ] Should we prioritize certain facility types (recyclers, transfer stations)?
- [ ] Do we need historical data or just current active facilities?
- [ ] What's the update frequency? (Daily, weekly, monthly?)
- [ ] Should we store raw data or only processed data?

## File Locations

- **Raw Data**: `HD_REPORTING/HD_REPORTING_0.csv`, `HD_REPORTING_1.csv`
- **This Analysis**: `disposalgrid-monorepo/database/EPA_DATA_ANALYSIS.md`
- **Schema**: `disposalgrid-monorepo/database/schema.sql`
