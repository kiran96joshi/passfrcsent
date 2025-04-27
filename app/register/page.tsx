'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseBrowser } from '@/lib/supabaseBrowser'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail]             = useState('')
  const [password, setPassword]       = useState('')
  const [confirm, setConfirm]         = useState('')
  const [showPassword, setShowPassword]   = useState(false)
  const [showConfirm, setShowConfirm]     = useState(false)
  const [errorMsg, setErrorMsg]       = useState<string|null>(null)
  const [loading, setLoading]         = useState(false)

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    if (password !== confirm) {
      setErrorMsg('Passwords do not match')
      return
    }

    setLoading(true)
    const { data, error } = await supabaseBrowser.auth.signUp({
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
      <form onSubmit={handleRegister} className="space-y-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center">Register</h1>

        {errorMsg && <p className="text-red-600 text-center">{errorMsg}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full p-3 border rounded"
        />

        {/* Password field with toggle */}
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

        {/* Confirm password field with toggle */}
        <div className="relative">
          <input
            type={showConfirm ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
            className="w-full p-3 border rounded"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(v => !v)}
            className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600"
          >
            {showConfirm ? 'Hide' : 'Show'}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
        >
          {loading ? 'Registering…' : 'Register'}
        </button>
      </form>
    </main>
  )
}
