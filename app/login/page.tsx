// app/login/page.tsx
export const dynamic = 'force-dynamic'   // ensure this page is never statically optimized

import LoginClient from './LoginClient'

export default function LoginPage() {
  return <LoginClient />
}
