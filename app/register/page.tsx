'use client'

import { SignUp } from '@clerk/nextjs'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <SignUp path="/register" routing="path" signInUrl="/login" />
    </div>
  )
}
