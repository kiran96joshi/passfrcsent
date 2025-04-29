// app/reset-password/page.tsx
import dynamic from 'next/dynamic'

// Dynamically import the client-only form, disabling SSR so the server never runs hooks
const ResetPasswordForm = dynamic(
  () => import('./ResetPasswordForm'),
  { ssr: false }
)

export const metadata = {
  title: 'Reset Password',
}

export default function ResetPasswordPage() {
  return <ResetPasswordForm />
}
