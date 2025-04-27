'use client';
import { useSessionContext } from '@supabase/auth-helpers-react';

export function useUser() {
  const { session } = useSessionContext();
  return session?.user ?? null;
}
