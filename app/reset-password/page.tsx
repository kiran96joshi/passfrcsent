// app/reset-password/page.tsx
import React, { Suspense } from 'react'
import ResetPasswordForm from './ResetPasswordForm'

export const metadata = {
  title: 'Reset Password',
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p className="p-6">Loading…</p>}>
      <ResetPasswordForm />
    </Suspense>
  )
}
