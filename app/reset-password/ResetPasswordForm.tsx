'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useRouter }                from 'next/navigation'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'

export default function ResetPasswordForm() {
  const supabase = createPagesBrowserClient()
  const router   = useRouter()

  const [password, setPassword] = useState('')
  const [confirm,  setConfirm]  = useState('')
  const [step,     setStep]     = useState<'loading'|'form'|'success'>('loading')
  const [errorMsg, setErrorMsg] = useState<string|null>(null)

  // 1️⃣ Extract tokens from either ?query=… or #hash=…
  useEffect(() => {
    let access_token: string | null = null
    let refresh_token: string | null = null
    let type: string | null = null

    // 1a) from query string
    const q = new URLSearchParams(window.location.search)
    type          = q.get('type')
    access_token  = q.get('access_token')
    refresh_token = q.get('refresh_token')

    // 1b) if missing, try the URL fragment (hash)
    if (!access_token || !refresh_token) {
      const h = new URLSearchParams(window.location.hash.replace(/^#/,'?'))
      type          = h.get('type')
      access_token  = h.get('access_token')
      refresh_token = h.get('refresh_token')
    }

    // 1c) validate
    if (type !== 'recovery' || !access_token || !refresh_token) {
      setErrorMsg('Invalid or expired recovery link.')
      return
    }

    // 1d) set the Supabase session
    supabase.auth
      .setSession({ access_token, refresh_token })
      .then(({ error }) => {
        if (error) setErrorMsg(error.message)
        else       setStep('form')
      })
  }, [supabase])

  // 2️⃣ When user submits the new password
  const handleReset = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    if (password !== confirm) {
      setErrorMsg('Passwords do not match')
      return
    }

    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      setErrorMsg(error.message)
    } else {
      setStep('success')
      setTimeout(() => router.replace('/login'), 2000)
    }
  }

  // 3️⃣ Render logic
  if (errorMsg)             return <p className="p-6 text-red-600">{errorMsg}</p>
  if (step === 'loading')   return <p className="p-6">Validating recovery link…</p>
  if (step === 'success')   return <p className="p-6 text-green-600">
                                 Password updated! Redirecting to login…
                               </p>

  // step === 'form'
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={handleReset} className="space-y-6 w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center">
          Choose a New Password
        </h1>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full p-3 border rounded"
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
          className="w-full p-3 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          Reset Password
        </button>
      </form>
    </main>
  )
}
