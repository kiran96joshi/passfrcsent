'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabaseBrowser';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await supabaseBrowser.auth.getSession(); // sets cookie
      router.replace('/dashboard');            // landing page after login
    })();
  }, [router]);

  return (
    <main className="h-screen flex items-center justify-center">
      <p>Signing you in…</p>
    </main>
  );
}
