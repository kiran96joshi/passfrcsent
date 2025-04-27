// lib/supabaseBrowser.ts
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';

export const supabaseBrowser = createBrowserSupabaseClient<
  Database  // <-- if you have generated types; else remove
>();
