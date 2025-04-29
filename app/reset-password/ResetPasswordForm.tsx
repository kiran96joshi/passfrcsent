// app/reset-password/ResetPasswordForm.tsx
'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useRouter }                   from 'next/navigation'
import { createPagesBrowserClient }    from '@supabase/auth-helpers-nextjs'

export default function ResetPasswordForm() {
  const supabase = createPagesBrowserClient()
  const router   = useRouter()

  const [step,     setStep]     = useState<'loading'|'form'|'success'>('loading')
  const [errorMsg, setErrorMsg] = useState<string|null>(null)
  const [password, setPassword] = useState('')
  const [confirm,  setConfirm]  = useState('')

  // 1️⃣ Let Supabase hydrate/validate the session tokens from the URL
  useEffect(() => {
    supabase.auth
      .getSessionFromUrl({ storeSession: true })
      .then(({ data, error }) => {
        if (error) {
          setErrorMsg(error.message)
        } else {
          // we now have a valid session and can show the form
          setStep('form')
        }
      })
  }, [supabase])

  // 2️⃣ Once hydrated, allow the user to actually submit a new password
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

  // 3️⃣ Render all the states
  if (errorMsg) {
    return <p className="p-6 text-red-600">{errorMsg}</p>
  }
  if (step === 'loading') {
    return <p className="p-6">Validating recovery link…</p>
  }
  if (step === 'success') {
    return (
      <p className="p-6 text-green-600">
        Password updated! Redirecting to login…
      </p>
    )
  }

  // step === 'form'
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={handleReset} className="space-y-6 w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center">
          Choose a new password
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
