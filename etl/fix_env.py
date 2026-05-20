with open('.env', 'r') as f:
    lines = f.readlines()

env_vars = {}
for line in lines:
    if '=' in line:
        k, v = line.strip().split('=', 1)
        env_vars[k] = v

with open('.env', 'w') as f:
    for k, v in env_vars.items():
        f.write(f"{k}={v}\n")
    if 'NEXT_PUBLIC_SUPABASE_URL' in env_vars:
        f.write(f"SUPABASE_URL={env_vars['NEXT_PUBLIC_SUPABASE_URL']}\n")
    if 'NEXT_PUBLIC_SUPABASE_ANON_KEY' in env_vars:
        f.write(f"SUPABASE_SERVICE_KEY={env_vars['NEXT_PUBLIC_SUPABASE_ANON_KEY']}\n")
