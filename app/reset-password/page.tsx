// app/reset-password/page.tsx
// ─────────────────────────────────────────────────
// Tell Next.js “this page is fully dynamic”
// and shim out any static prerender step:
'use client'; // everything here is client-side only
export const dynamic = 'force-dynamic';

import ResetPasswordForm from './ResetPasswordForm';

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
