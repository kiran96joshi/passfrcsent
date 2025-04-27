'use client';

import { useUser } from '@/lib/useUser';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

/**
 * Every page inside the (protected) segment inherits this layout.
 * If there's no signed-in user we redirect to /login.
 */
export default function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = useUser();

  if (!user) {
    redirect('/login');   // ⟵ bounce anonymous visitors
  }

  // user is signed in – render the requested page
  return <>{children}</>;
}
