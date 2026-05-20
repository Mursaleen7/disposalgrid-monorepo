import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()
client = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_SERVICE_KEY"))

ids = ["MAC300003555", "MAR000010959"]
res = client.table("facilities").select("*").in_("handler_id", ids).execute()
import json
print(json.dumps(res.data, indent=2))
