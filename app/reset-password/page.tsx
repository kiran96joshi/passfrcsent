// app/reset-password/page.tsx
import React, { Suspense } from 'react'
import ResetPasswordForm from './ResetPasswordForm'

export const metadata = {
  title: 'Reset Password',
}

export default function ResetPasswordPage() {
  return (
    // Wrap the client component in Suspense so Next.js won't try
    // to prerender its hooks on the server
    <Suspense fallback={<p className="p-6">Loading…</p>}>
      <ResetPasswordForm />
    </Suspense>
  )
}
