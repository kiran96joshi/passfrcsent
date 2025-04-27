// app/register/page.tsx
'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseBrowser } from '@/lib/supabaseBrowser'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState<string|null>(null)
  const [loading, setLoading]   = useState(false)

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)

    const { data, error } = await supabaseBrowser.auth.signUp({
      email,
      password,
    })

    setLoading(false)
    if (error) {
      setErrorMsg(error.message)
    } else {
      // auto-sign-in on register
      router.push('/dashboard')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={handleRegister} className="space-y-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center">Register</h1>

        {errorMsg && <p className="text-red-600">{errorMsg}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full p-3 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          minLength={6}
          required
          className="w-full p-3 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
        >
          {loading ? 'Registering…' : 'Register'}
        </button>
      </form>
    </main>
  )
}
