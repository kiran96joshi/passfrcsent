'use client'

import { ReactNode, useState, useEffect } from 'react'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import {
  SessionContextProvider,
  Session,
} from '@supabase/auth-helpers-react'

export function SupabaseProvider({ children }: { children: ReactNode }) {
  // 1) create the browser client (will read the cookie)
  const supabase = createPagesBrowserClient()

  // 2) hold the current session in a state so we can pass it synchronously
  const [initialSession, setInitialSession] = useState<Session | null>(null)

  useEffect(() => {
    // grab the current session, then store it
    supabase.auth.getSession().then(({ data: { session } }) => {
      setInitialSession(session)
    })
  }, [supabase])

  return (
    // 3) now wrap your app in the React helper provider
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={initialSession}
    >
      {children}
    </SessionContextProvider>
  )
}
