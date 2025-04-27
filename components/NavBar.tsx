'use client'

import Link from 'next/link'
import { useUser } from '@/lib/useUser'
import { supabaseBrowser } from '@/lib/supabaseBrowser'

export default function NavBar() {
  const user = useUser()

  const handleLogout = async () => {
    if (confirm('Are you sure you want to log out?')) {
      await supabaseBrowser.auth.signOut()
      // Redirect back to home after logging out
      window.location.href = '/'
    }
  }

  return (
    <nav className="sticky top-0 bg-white shadow-sm z-10">
      <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo / Home */}
        <Link href="/" className="font-bold text-lg text-blue-700">
          PassFRCSENT
        </Link>

        <div className="flex items-center space-x-4">
          {/* Question Bank */}
          <Link href="/bank" className="hover:text-blue-600">
            Question&nbsp;Bank
          </Link>

          {/* Dashboard */}
          <Link href="/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>

          {/* Login or Log out */}
          {user ? (
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Log out
            </button>
          ) : (
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
