// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';   // ←  ✅ IMPORT

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON!
);

/* optional: expose for browser console debugging */
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.supabase = supabase;
}

export default supabase;
