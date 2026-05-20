import os
import sys
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_KEY')

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Error: SUPABASE_URL and SUPABASE_SERVICE_KEY must be set in .env file")
    sys.exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def clear_facilities():
    print("Starting deletion of all existing facilities...")
    try:
        # Supabase requires a filter for deletes. Since all handler_ids are not empty strings, this will match all rows.
        res = supabase.table('facilities').delete().neq('handler_id', 'DELETE_ALL_ROWS_TRICK_VALUE_NEVER_MATCHES').execute()
        print(f"Successfully deleted facilities. Deleted {len(res.data)} rows.")
    except Exception as e:
        print(f"Error deleting facilities: {e}")

if __name__ == '__main__':
    clear_facilities()
