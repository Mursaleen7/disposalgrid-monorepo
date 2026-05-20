import os
from supabase import create_client

url = "https://jogfubnnajfjfayyomrg.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvZ2Z1Ym5uYWpmamZheXlvbXJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5NDM3MDUsImV4cCI6MjA5MjUxOTcwNX0.mBWOXYbPsp_rMzKdnavIJgJg4D8ZoE4JQMuPr-iWgzo"
client = create_client(url, key)

try:
    res = client.table('facilities').select('handler_id').limit(1).execute()
    print("Anon key works for SELECT!")
    
    # Try delete
    res = client.table('facilities').delete().neq('handler_id', 'dummy_value').execute()
    print("Anon key works for DELETE!")
except Exception as e:
    print(f"Error: {e}")
