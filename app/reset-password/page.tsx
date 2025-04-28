// app/reset-password/page.tsx
export const metadata = {
  title: 'Reset Password',
  description: 'Choose a new password',
}

import ResetPasswordForm from './ResetPasswordForm'

export default function ResetPasswordPage() {
  return <ResetPasswordForm />
}
