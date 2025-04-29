'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useRouter, useSearchParams }   from 'next/navigation'
import { createPagesBrowserClient }      from '@supabase/auth-helpers-nextjs'

export default function ResetPasswordForm() {
  const supabase     = createPagesBrowserClient()
  const router       = useRouter()
  const searchParams = useSearchParams()

  const [password, setPassword] = useState('')
  const [confirm,  setConfirm]  = useState('')
  const [step,     setStep]     = useState<'loading'|'form'|'success'>('loading')
  const [errorMsg, setErrorMsg] = useState<string|null>(null)

  useEffect(() => {
    const access_token  = searchParams.get('access_token')
    const refresh_token = searchParams.get('refresh_token')
    const type          = searchParams.get('type')

    if (type !== 'recovery' || !access_token || !refresh_token) {
      setErrorMsg('Invalid or expired recovery link.')
      return
    }

    // v2: use setSession directly – no getSessionFromUrl ok?
    supabase.auth
      .setSession({ access_token, refresh_token })
      .then(({ error }) => {
        if (error) {
          setErrorMsg(error.message)
        } else {
          setStep('form')
        }
      })
  }, [searchParams, supabase])

  const handleReset = async (e: FormEvent) => {
    e.preventDefault()
    if (password !== confirm) {
      setErrorMsg('Passwords do not match')
      return
    }
    const { error } = await supabase.auth.updateUser({ password })
    if (error) setErrorMsg(error.message)
    else {
      setStep('success')
      setTimeout(() => router.replace('/login'), 2000)
    }
  }

  if (errorMsg) return <p className="p-6 text-red-600">{errorMsg}</p>
  if (step === 'loading') return <p className="p-6">Validating recovery link…</p>
  if (step === 'success') return <p className="p-6 text-green-600">Password updated! Redirecting…</p>

  // step === 'form'
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={handleReset} className="space-y-6 w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center">Choose a New Password</h1>
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
