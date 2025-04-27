'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabaseBrowser } from '@/lib/supabaseBrowser'

export default function LoginPage() {
  const router       = useRouter()
  const searchParams = useSearchParams()

  // form state
  const [email, setEmail] = useState('')
  const [sent,  setSent]  = useState(false)

  // ─── 1) Magic-link callback handler ─────────────────────────────────────────
  useEffect(() => {
    const accessToken  = searchParams.get('access_token')
    const refreshToken = searchParams.get('refresh_token')
    const errorDesc    = searchParams.get('error_description')

    if (errorDesc) {
      console.error('Magic link error:', errorDesc)
    }

    if (accessToken && refreshToken) {
      supabaseBrowser.auth
        .setSession({ access_token: accessToken, refresh_token: refreshToken })
        .then(({ error }) => {
          if (error) {
            console.error('Error setting session:', error.message)
          } else {
            // session cookie is now set, redirect to dashboard
            router.replace('/dashboard')
          }
        })
    }
  }, [searchParams, router])

  // ─── 2) Send magic link ──────────────────────────────────────────────────────
  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault()
    const { error } = await supabaseBrowser.auth.signInWithOtp({ email })
    if (error) {
      console.error('Sign-in error:', error.message)
    } else {
      setSent(true)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      {sent ? (
        <p className="text-center text-lg">
          Check your email for a magic link to sign in!
        </p>
      ) : (
        <form onSubmit={handleSignIn} className="space-y-6 w-full max-w-sm">
          <h1 className="text-2xl font-semibold text-center">Sign in</h1>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full p-3 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            Send Magic Link
          </button>
        </form>
      )}
    </main>
  )
}
