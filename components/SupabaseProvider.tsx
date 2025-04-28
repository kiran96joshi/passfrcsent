// components/SupabaseProvider.tsx
'use client';

import { ReactNode }                 from 'react';
import { SessionContextProvider }    from '@supabase/auth-helpers-react';
import { supabaseBrowser }           from '@/lib/supabaseBrowser';

export function SupabaseProvider({ children }: { children: ReactNode }) {
  return (
    <SessionContextProvider supabaseClient={supabaseBrowser}>
      {children}
    </SessionContextProvider>
  );
}
