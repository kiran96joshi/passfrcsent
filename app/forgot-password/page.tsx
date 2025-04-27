// app/forgot-password/page.tsx
'use client'

import { useState, FormEvent } from 'react'
import { supabaseBrowser } from '@/lib/supabaseBrowser'

export default function ForgotPasswordPage() {
  const [email, setEmail]       = useState('')
  const [sent, setSent]         = useState(false)
  const [errorMsg, setErrorMsg] = useState<string|null>(null)
  const [loading, setLoading]   = useState(false)

  const handleReset = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    setLoading(true)

    const { error } = await supabaseBrowser.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`
    })
    setLoading(false)

    if (error) {
      setErrorMsg(error.message)
    } else {
      setSent(true)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      {sent ? (
        <p className="text-center text-lg">
          If that email exists, you’ll receive a password reset link shortly.
        </p>
      ) : (
        <form onSubmit={handleReset} className="space-y-6 w-full max-w-sm">
          <h1 className="text-2xl font-semibold text-center">Reset Password</h1>

          {errorMsg && <p className="text-red-600 text-center">{errorMsg}</p>}

          <input
            type="email"
            placeholder="your-email@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full p-3 border rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            {loading ? 'Sending…' : 'Send Reset Email'}
          </button>
        </form>
      )}
    </main>
  )
}
