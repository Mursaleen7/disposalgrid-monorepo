import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Supabase client — safe to use in Server Components (RSC) and API routes.
 * Uses the anon key; Row-Level Security in Supabase controls access.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
