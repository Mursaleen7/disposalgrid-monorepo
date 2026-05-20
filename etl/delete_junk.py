import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_SERVICE_KEY")

client = create_client(url, key)

# Get count of non-EPA_HWIP facilities
res = client.table("facilities").select("id", count="exact").neq("source", "EPA_HWIP").execute()
print(f"Non-EPA_HWIP facilities to delete: {res.count}")

if res.count and res.count > 0:
    print("Deleting...")
    # Delete them
    res_del = client.table("facilities").delete().neq("source", "EPA_HWIP").execute()
    print(f"Deleted {len(res_del.data)} facilities.")

