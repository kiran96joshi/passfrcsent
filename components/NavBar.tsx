// components/NavBar.tsx
'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUser } from '@/lib/useUser'
import { supabaseBrowser } from '@/lib/supabaseBrowser'

export default function NavBar() {
  const user   = useUser()
  const router = useRouter()

  const handleLogout = async () => {
    if (!confirm('Are you sure you want to log out?')) return

    // 1) tell Supabase to sign you out (this calls /auth/v1/logout and clears the cookie)
    const { error } = await supabaseBrowser.auth.signOut()
    if (error) {
      console.error('Logout error:', error)
      return
    }

    // 2) refresh Next.js session on the server
    router.refresh()

    // 3) finally, send the user back to home or login
    router.push('/')
  }

  return (
    <nav className="sticky top-0 bg-white shadow-sm z-10">
      <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-blue-700">
          PassFRCSENT
        </Link>

        <div className="flex items-center space-x-4">
          <Link href="/bank" className="hover:text-blue-600">
            Question&nbsp;Bank
          </Link>

          <Link href="/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>

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
