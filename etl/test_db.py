import os
from supabase import create_client

url = "https://jogfubnnajfjfayyomrg.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvZ2Z1Ym5uYWpmamZheXlvbXJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5NDM3MDUsImV4cCI6MjA5MjUxOTcwNX0.mBWOXYbPsp_rMzKdnavIJgJg4D8ZoE4JQMuPr-iWgzo"
client = create_client(url, key)

res = client.table('facilities').select('name, address, city, state, zip_code').ilike('city', '%Boston%').limit(5).execute()
for r in res.data:
    print(r)
