import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_SERVICE_KEY")

client = create_client(url, key)

print("Deleting all EPA_HWIP facilities...")
res = client.table("facilities").delete().eq("source", "EPA_HWIP").execute()
print(f"Deleted EPA_HWIP facilities.")
