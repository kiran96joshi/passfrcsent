'use client';
import { useState } from 'react';
import { supabaseBrowser } from '@/lib/supabaseBrowser';

export default function Login() {
  const [email, setEmail] = useState('');
  const [sent, setSent]   = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabaseBrowser.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });    
    if (!error) setSent(true);
  };

  if (sent)
    return (
      <main className="h-screen flex items-center justify-center">
        <p>Magic link sent! Check your inbox.</p>
      </main>
    );

  return (
    <main className="h-screen flex items-center justify-center">
      <form onSubmit={handleSignIn} className="space-y-4">
        <h1 className="text-xl font-semibold">Sign in</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-72"
          placeholder="you@example.com"
          required
        />
        <button
          type="submit"
          className="block w-full bg-blue-600 text-white py-2 rounded"
        >
          Send magic link
        </button>
      </form>
    </main>
  );
}
