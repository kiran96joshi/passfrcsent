'use client'

import Link from 'next/link'
import { useUser } from '@/lib/useUser'

export default function NavBar() {
  const user = useUser()

  return (
    <nav className="sticky top-0 bg-white shadow-sm z-10">
      <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo / Home */}
        <Link href="/" className="font-bold text-lg text-blue-700">
          PassFRCSENT
        </Link>

        <div className="flex items-center space-x-4">
          {/* Bank */}
          <Link href="/bank" className="hover:text-blue-600">
            Question Bank
          </Link>

          {/* Dashboard */}
          <Link href="/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>

          {/* Login button (only when NOT logged in) */}
          {!user && (
            <Link
              href="/login"
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
