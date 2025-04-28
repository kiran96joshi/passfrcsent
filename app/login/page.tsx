// app/login/page.tsx
'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useRouter }                  from 'next/navigation'
import Link                           from 'next/link'
import { supabaseBrowser }            from '@/lib/supabaseBrowser'
import { useUser }                    from '@/lib/useUser'

export default function LoginPage() {
  const router = useRouter()
  const user   = useUser()

  // 1) If they’re already signed in, kick them to /dashboard
  useEffect(() => {
    if (user) router.replace('/dashboard')
  }, [user, router])

  const [email,        setEmail]        = useState('')
  const [password,     setPassword]     = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg,     setErrorMsg]     = useState<string|null>(null)
  const [loading,      setLoading]      = useState(false)

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    setLoading(true)

    const { data, error } = await supabaseBrowser.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)
    if (error) {
      setErrorMsg(error.message)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={handleLogin} className="space-y-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center">Login</h1>

        {errorMsg && <p className="text-red-600 text-center">{errorMsg}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full p-3 border rounded"
        />

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full p-3 border rounded"
          />
          <button
            type="button"
            onClick={() => setShowPassword(v => !v)}
            className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Logging in…' : 'Login'}
        </button>

        <p className="text-center text-sm">
          <Link href="/forgot-password" className="text-blue-600 hover:underline">
            Forgot your password?
          </Link>
        </p>
      </form>
    </main>
  )
}
