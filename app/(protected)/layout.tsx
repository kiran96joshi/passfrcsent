// app/(protected)/layout.tsx
'use client'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        {children}
      </SignedIn>
    </>
  )
}
