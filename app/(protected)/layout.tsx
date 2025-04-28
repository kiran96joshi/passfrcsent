// app/(protected)/layout.tsx
'use client'

import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/lib/useUser'
import { SupabaseProvider } from '@/components/SupabaseProvider'
import NavBar from '@/components/NavBar'

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const user = useUser()       // 1) hook
  const router = useRouter()   // 2) hook

  // 3) redirect if not logged in
  useEffect(() => {
    if (user === null) router.replace('/login')
  }, [user, router])

  // 4) while loading session, render nothing
  if (user === undefined) return null

  // 5) if still not a user, bail (redirect effect will fire)
  if (!user) return null

  // 6) now render your provider, navbar and page
  return (
    <SupabaseProvider>
      <NavBar />
      <main className="flex-1">{children}</main>
    </SupabaseProvider>
  )
}
