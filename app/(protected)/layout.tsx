// app/(protected)/layout.tsx
'use client'
import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/lib/useUser'

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const user   = useUser()
  const router = useRouter()

  // while the hook is checking session (user===undefined), render nothing
  if (user === undefined) return null

  // if not signed in (user===null), redirect to login
  useEffect(() => {
    if (user === null) router.replace('/login')
  }, [user, router])

  // until the redirect finishes, don’t flash the page
  if (!user) return null

  // signed in: render the protected content
  return <>{children}</>
}
