'use client'

import { Fragment, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUser } from '@/lib/useUser'
import { supabaseBrowser } from '@/lib/supabaseBrowser'

export default function NavBar() {
  const user   = useUser()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    if (!confirm('Are you sure you want to log out?')) return
    const { error } = await supabaseBrowser.auth.signOut()
    if (error) {
      console.error('Logout error:', error.message)
    } else {
      router.push('/')
    }
  }

  return (
    <nav className="sticky top-0 bg-white shadow-sm z-10">
      <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-blue-700">
          PassFRCSENT
        </Link>

        <div className="flex items-center space-x-4">
          <Link href="/bank" className="hover:text-blue-600">Question Bank</Link>
          <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setOpen(o => !o)}
                className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
              >
                Account ▼
              </button>
              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow">
                  <Link
                    href="/account"
                    className="block px-4 py-2 hover:bg-gray-50"
                    onClick={()=>setOpen(false)}
                  >
                    Settings
                  </Link>
                  <Link
                    href="/contact"
                    className="block px-4 py-2 hover:bg-gray-50"
                    onClick={()=>setOpen(false)}
                  >
                    Contact Us
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50"
                  >
                    Log out
                  </button>
                  {/* Dark mode toggle */}
                  <button
                    onClick={() => {
                      document.documentElement.classList.toggle('dark')
                      setOpen(false)
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50"
                  >
                    Toggle Dark
                  </button>
                </div>
              )}
            </div>
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
