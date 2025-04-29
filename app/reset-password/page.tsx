// app/reset-password/page.tsx  ← NO "use client" here!
import ResetPasswordForm from './ResetPasswordForm'

export const metadata = {
  title: 'Reset Password',
}

export default function ResetPasswordPage() {
  return <ResetPasswordForm />
}
