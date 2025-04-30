// components/NavBar.tsx
'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  useUser,
  SignInButton,
  SignOutButton,
} from '@clerk/nextjs'

export default function NavBar() {
  const { isLoaded, isSignedIn } = useUser()
  const router = useRouter()

  // wait until Clerk finishes loading
  if (!isLoaded) return null

  return (
    <nav className="sticky top-0 bg-white shadow-sm z-10">
      <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-blue-700">
          PassFRCSENT
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/bank" className="hover:text-blue-600">
            Question Bank
          </Link>
          <Link href="/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>

          {isSignedIn ? (
            <SignOutButton>
              <button
                onClick={() => {/* Clerk handles sign-out */}}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Log out
              </button>
            </SignOutButton>
          ) : (
            <>
              <Link
                href="/register"
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Register
              </Link>
              <SignInButton mode="redirect" forceRedirectUrl="/dashboard">
                <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Log in
                </button>
              </SignInButton>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
