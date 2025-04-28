'use client'            // must be a client component
import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/lib/useUser'
import { SupabaseProvider } from '@/components/SupabaseProvider'
import NavBar from '@/components/NavBar'

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const user = useUser()
  const router = useRouter()

  // 1) while loading session, render nothing
  if (user === undefined) return null

  // 2) if not signed in, kick back to /login
  useEffect(() => {
    if (user === null) router.replace('/login')
  }, [user, router])

  if (!user) return null

  // 3) once signed in, show NavBar + page
  return (
    <SupabaseProvider>
      <NavBar />
      <main className="flex-1">{children}</main>
    </SupabaseProvider>
  )
}
