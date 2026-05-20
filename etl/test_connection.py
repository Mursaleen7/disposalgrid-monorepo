#!/usr/bin/env python3
"""
Test Supabase connection and schema
Run this before running the main ETL script
"""

import os
import sys
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_KEY')

def test_connection():
    """Test Supabase connection"""
    print("Testing Supabase connection...")
    print(f"URL: {SUPABASE_URL}")
    
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("❌ Error: SUPABASE_URL and SUPABASE_SERVICE_KEY must be set in .env file")
        return False
    
    try:
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        print("✅ Connection successful!")
        return supabase
    except Exception as e:
        print(f"❌ Connection failed: {e}")
        return None


def test_schema(supabase: Client):
    """Test if facilities table exists and has correct schema"""
    print("\nTesting facilities table schema...")
    
    try:
        # Try to query the table (limit 0 to just check schema)
        result = supabase.table('facilities').select('*').limit(0).execute()
        print("✅ Facilities table exists!")
        
        # Try to get count
        count_result = supabase.table('facilities').select('*', count='exact').limit(0).execute()
        count = count_result.count if hasattr(count_result, 'count') else 0
        print(f"✅ Current facility count: {count}")
        
        return True
    except Exception as e:
        print(f"❌ Schema test failed: {e}")
        print("\nPlease run the schema_updated.sql file in Supabase SQL Editor")
        return False


def test_insert(supabase: Client):
    """Test inserting a sample facility"""
    print("\nTesting insert operation...")
    
    test_facility = {
        'handler_id': 'TEST000000001',
        'name': 'Test Facility',
        'address': '123 Test St',
        'city': 'Test City',
        'state': 'CA',
        'zip_code': '90210',
        'county': 'Test County',
        'latitude': 34.0522,
        'longitude': -118.2437,
        'facility_type': 'Test',
        'is_recycler': False,
        'is_transfer_facility': False,
        'accepts_used_oil': False,
        'accepts_universal_waste': False,
        'is_tsdf': False,
        'active_status': 'TEST',
    }
    
    try:
        # Insert test facility
        result = supabase.table('facilities').upsert(test_facility, on_conflict='handler_id').execute()
        print("✅ Insert successful!")
        
        # Clean up - delete test facility
        supabase.table('facilities').delete().eq('handler_id', 'TEST000000001').execute()
        print("✅ Cleanup successful!")
        
        return True
    except Exception as e:
        print(f"❌ Insert test failed: {e}")
        return False


def main():
    print("=" * 60)
    print("Supabase Connection Test")
    print("=" * 60)
    print()
    
    # Test 1: Connection
    supabase = test_connection()
    if not supabase:
        sys.exit(1)
    
    # Test 2: Schema
    if not test_schema(supabase):
        sys.exit(1)
    
    # Test 3: Insert
    if not test_insert(supabase):
        sys.exit(1)
    
    print()
    print("=" * 60)
    print("✅ All tests passed! Ready to run ETL script.")
    print("=" * 60)


if __name__ == '__main__':
    main()
