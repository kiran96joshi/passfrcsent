// components/SupabaseProvider.tsx
'use client'

import { ReactNode, createContext, useContext, useMemo } from 'react'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

/**
 * Make sure you have these two in your .env.local:
 *
 * NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
 * NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ…   ← your anon (public) key
 */
const SupabaseContext = createContext<SupabaseClient | null>(null)

export function SupabaseProvider({ children }: { children: ReactNode }) {
  // only recreate the client once on the client side
  const supabase = useMemo(
    () =>
      createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      ),
    []
  )

  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  )
}

/**
 * Call this from any client component to get your initialized Supabase client.
 */
export function useSupabaseClient() {
  const client = useContext(SupabaseContext)
  if (!client) {
    throw new Error(
      'useSupabaseClient must be used inside a <SupabaseProvider />'
    )
  }
  return client
}
