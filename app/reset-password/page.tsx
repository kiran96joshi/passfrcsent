// app/reset-password/page.tsx
export const dynamic = 'force-dynamic'  // ← prevent static prerendering

import ResetPasswordForm from './ResetPasswordForm'

export const metadata = {
  title: 'Reset Password',
}

export default function ResetPasswordPage() {
  return <ResetPasswordForm />
}
