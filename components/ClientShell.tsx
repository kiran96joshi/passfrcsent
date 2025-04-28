// components/ClientShell.tsx
'use client'

import { ReactNode } from 'react'
import { SupabaseProvider } from './SupabaseProvider'
import NavBar from './NavBar'

export default function ClientShell({ children }: { children: ReactNode }) {
  return (
    <SupabaseProvider>
      <NavBar />
      <main className="flex-1">{children}</main>
    </SupabaseProvider>
  )
}
