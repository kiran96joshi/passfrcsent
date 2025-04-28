// app/layout.tsx
'use client'

import './globals.css'
import ClientShell from '@/components/ClientShell'
import type { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* Everything here is client-side */}
        <ClientShell>
          {children}
        </ClientShell>
      </body>
    </html>
  )
}
