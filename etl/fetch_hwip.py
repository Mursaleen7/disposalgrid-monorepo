#!/usr/bin/env python3
"""
EPA HWIP Data ETL Script
Downloads and processes EPA Hazardous Waste Information Platform data
Filters for active TSDF and public HHW programs
Upserts to Supabase facilities table
"""

import csv
import os
import sys
from datetime import datetime
from typing import Dict, List, Optional
import requests
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_KEY')  # Use service key for write access

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Error: SUPABASE_URL and SUPABASE_SERVICE_KEY must be set in .env file")
    sys.exit(1)

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# EPA HWIP data source (update with actual URL if available)
EPA_HWIP_URL = "https://hwip.epa.gov/bulk-export"  # Placeholder - update with actual URL

# Column indices from EPA data (based on analysis)
COLUMNS = {
    'HANDLER_ID': 0,
    'HANDLER_NAME': 4,
    'STATE': 10,
    'ACTIVE_SITE': 11,
    'LOCATION_STREET1': 13,
    'LOCATION_STREET2': 14,
    'LOCATION_CITY': 15,
    'LOCATION_STATE': 16,
    'LOCATION_ZIP': 17,
    'LOCATION_COUNTY_NAME': 19,
    'OWNER_TYPE': 44,
    'OPERATOR_TYPE': 47,
    'NAIC1': 49,
    'GENSTATUS': 59,
    'TRANSFER_FACILITY': 64,
    'RECYCLER': 65,
    'OFF_SITE_RECEIPT': 69,
    'UNIVWASTE': 70,
    'USED_OIL': 72,
    'AS_FEDERALLY_REGULATED_TSDF': 74,
    'COMMERCIAL_TSD': 81,
    'OPERATING_TSDF': 101,
    'HHANDLER_LAST_CHANGE': 108,
    'LOCATION_LATITUDE': 117,
    'LOCATION_LONGITUDE': 118,
}


def parse_boolean(value: str) -> bool:
    """Convert Y/N string to boolean"""
    return value.strip().upper() == 'Y'


def parse_date(date_str: str) -> Optional[str]:
    """Convert YYYYMMDD to YYYY-MM-DD format"""
    if not date_str or len(date_str) != 8:
        return None
    try:
        return f"{date_str[0:4]}-{date_str[4:6]}-{date_str[6:8]}"
    except:
        return None


def is_active_facility(active_site: str) -> bool:
    """Check if facility is active based on ACTIVE SITE field"""
    # Active sites typically have 'H' in first position
    return active_site and active_site.startswith('H')


def is_target_facility(row: List[str]) -> bool:
    """
    Filter for TSDF or public HHW programs
    Returns True if facility meets criteria
    """
    # Check if active
    if not is_active_facility(row[COLUMNS['ACTIVE_SITE']]):
        return False
        
    naic = row[COLUMNS['NAIC1']].strip()
    naic_prefix = naic[:3] if naic else ''
    off_site = row[COLUMNS['OFF_SITE_RECEIPT']].strip()
    comm_tsd = row[COLUMNS['COMMERCIAL_TSD']].strip()
    owner = row[COLUMNS['OWNER_TYPE']].strip()
    operator = row[COLUMNS['OPERATOR_TYPE']].strip()
    recycler = row[COLUMNS['RECYCLER']].strip()
    transfer = row[COLUMNS['TRANSFER_FACILITY']].strip()
    univwaste = row[COLUMNS['UNIVWASTE']].strip()
    used_oil = row[COLUMNS['USED_OIL']].strip()
    
    # The facility MUST be authorized to receive waste from off-site OR be a commercial TSDF
    is_receiver = (off_site == 'Y') or (comm_tsd == 'Y') or parse_boolean(row[COLUMNS['OPERATING_TSDF']])
    
    if not is_receiver:
        return False
        
    is_government = owner in ('M', 'C') or operator in ('M', 'C')
    is_waste_industry = naic_prefix in ('562', '924')
    
    handles_used_oil = 'Y' in used_oil.upper()
    handles_univwaste = 'Y' in univwaste.upper()
    is_specific_activity = (transfer == 'Y') or (recycler == 'Y') or handles_used_oil or handles_univwaste
    
    return is_waste_industry or is_government or is_specific_activity


def parse_facility_row(row: List[str]) -> Optional[Dict]:
    """Parse a CSV row into a facility dictionary"""
    try:
        # Combine address fields
        address_parts = [
            row[COLUMNS['LOCATION_STREET1']].strip(),
            row[COLUMNS['LOCATION_STREET2']].strip()
        ]
        address = ' '.join(filter(None, address_parts))
        
        # Parse coordinates
        try:
            latitude = float(row[COLUMNS['LOCATION_LATITUDE']]) if row[COLUMNS['LOCATION_LATITUDE']] else None
            longitude = float(row[COLUMNS['LOCATION_LONGITUDE']]) if row[COLUMNS['LOCATION_LONGITUDE']] else None
        except (ValueError, IndexError):
            latitude = None
            longitude = None
        
        # Determine facility type
        facility_types = []
        if parse_boolean(row[COLUMNS['AS_FEDERALLY_REGULATED_TSDF']]):
            facility_types.append('TSDF')
        if parse_boolean(row[COLUMNS['RECYCLER']]):
            facility_types.append('Recycler')
        if parse_boolean(row[COLUMNS['TRANSFER_FACILITY']]):
            facility_types.append('Transfer Facility')
        if parse_boolean(row[COLUMNS['UNIVWASTE']]):
            facility_types.append('Universal Waste')
        
        facility_type = ', '.join(facility_types) if facility_types else 'Other'
        
        # Build facility object
        facility = {
            'handler_id': row[COLUMNS['HANDLER_ID']].strip(),
            'source': 'EPA_HWIP',
            'name': row[COLUMNS['HANDLER_NAME']].strip(),
            'address': address,
            'city': row[COLUMNS['LOCATION_CITY']].strip(),
            'state': row[COLUMNS['LOCATION_STATE']].strip(),
            'zip_code': row[COLUMNS['LOCATION_ZIP']].strip(),
            'county': row[COLUMNS['LOCATION_COUNTY_NAME']].strip(),
            'latitude': latitude,
            'longitude': longitude,
            'facility_type': facility_type,
            'generator_status': row[COLUMNS['GENSTATUS']].strip(),
            'is_recycler': parse_boolean(row[COLUMNS['RECYCLER']]),
            'is_transfer_facility': parse_boolean(row[COLUMNS['TRANSFER_FACILITY']]),
            'accepts_used_oil': parse_boolean(row[COLUMNS['USED_OIL']]),
            'accepts_universal_waste': parse_boolean(row[COLUMNS['UNIVWASTE']]),
            'is_tsdf': parse_boolean(row[COLUMNS['AS_FEDERALLY_REGULATED_TSDF']]),
            'contact_phone': None,
            'contact_email': None,
            'active_status': row[COLUMNS['ACTIVE_SITE']].strip(),
            'last_updated': parse_date(row[COLUMNS['HHANDLER_LAST_CHANGE']]),
            'waste_codes': [],  # TODO: Parse waste codes if available in data
        }
        
        return facility
    except Exception as e:
        print(f"Error parsing row: {e}")
        return None


def upsert_facilities(facilities: List[Dict]) -> int:
    """
    Upsert facilities to Supabase
    Returns number of facilities upserted
    """
    if not facilities:
        return 0
    
    try:
        # Upsert in batches of 1000
        batch_size = 1000
        total_upserted = 0
        
        for i in range(0, len(facilities), batch_size):
            batch = facilities[i:i + batch_size]
            
            # Upsert to Supabase (on_conflict uses handler_id as unique key)
            result = supabase.table('facilities').upsert(
                batch,
                on_conflict='handler_id'
            ).execute()
            
            total_upserted += len(batch)
            print(f"Upserted batch {i//batch_size + 1}: {len(batch)} facilities (Total: {total_upserted})")
        
        return total_upserted
    except Exception as e:
        print(f"Error upserting facilities: {e}")
        return 0


def process_csv_file(file_path: str) -> List[Dict]:
    """Process a single CSV file and return list of facilities"""
    facilities = []
    
    print(f"Processing {file_path}...")
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            reader = csv.reader(f)
            
            # Skip header
            next(reader)
            
            for row_num, row in enumerate(reader, start=2):
                # Filter for target facilities
                if is_target_facility(row):
                    facility = parse_facility_row(row)
                    if facility:
                        facilities.append(facility)
                
                # Progress indicator
                if row_num % 10000 == 0:
                    print(f"  Processed {row_num:,} rows, found {len(facilities):,} target facilities")
        
        print(f"Completed {file_path}: Found {len(facilities):,} target facilities")
        return facilities
    
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return []


def download_hwip_data(output_dir: str = './data') -> List[str]:
    """
    Download EPA HWIP bulk CSV files
    Returns list of downloaded file paths
    
    NOTE: This is a placeholder. Update with actual EPA HWIP download logic
    For now, it assumes files are already downloaded in HD_REPORTING folder
    """
    # Check if data already exists locally
    local_files = [
        '../../HD_REPORTING/HD_REPORTING_0.csv',
        '../../HD_REPORTING/HD_REPORTING_1.csv'
    ]
    
    existing_files = [f for f in local_files if os.path.exists(f)]
    
    if existing_files:
        print(f"Using existing local files: {existing_files}")
        return existing_files
    
    # TODO: Implement actual download from EPA HWIP
    # For now, return empty list if files don't exist
    print("No local files found. Please download EPA HWIP data manually.")
    print("Expected files:")
    for f in local_files:
        print(f"  - {f}")
    
    return []


def main():
    """Main ETL process"""
    print("=" * 60)
    print("EPA HWIP Data ETL Process")
    print("=" * 60)
    print()
    
    # Step 1: Download or locate data files
    print("Step 1: Locating EPA HWIP data files...")
    csv_files = download_hwip_data()
    
    if not csv_files:
        print("Error: No data files found. Exiting.")
        sys.exit(1)
    
    print(f"Found {len(csv_files)} file(s) to process")
    print()
    
    # Step 2: Process CSV files
    print("Step 2: Processing CSV files...")
    all_facilities = []
    
    for csv_file in csv_files:
        facilities = process_csv_file(csv_file)
        all_facilities.extend(facilities)
    
    print()
    print(f"Total facilities found: {len(all_facilities):,}")
    print()
    
    # Step 3: Upsert to Supabase
    print("Step 3: Upserting to Supabase...")
    upserted_count = upsert_facilities(all_facilities)
    
    print()
    print("=" * 60)
    print(f"ETL Complete!")
    print(f"Total facilities upserted: {upserted_count:,}")
    print("=" * 60)


if __name__ == '__main__':
    main()
