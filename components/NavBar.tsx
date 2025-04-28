// components/NavBar.tsx
'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUser } from '@/lib/useUser'
import { supabaseBrowser } from '@/lib/supabaseBrowser'

export default function NavBar() {
  const user = useUser()
  const router = useRouter()

  const handleLogout = async () => {
    if (!confirm('Are you sure you want to log out?')) return
    await supabaseBrowser.auth.signOut()
    router.replace('/login')
  }

  return (
    <nav className="sticky top-0 bg-white shadow-sm z-10">
      <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-blue-700">
          PassFRCSENT
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/bank"      className="hover:text-blue-600">Question Bank</Link>
          <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Log out
            </button>
          ) : (
            <>
              <Link
                href="/register"
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Register
              </Link>
              <Link
                href="/login"
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
