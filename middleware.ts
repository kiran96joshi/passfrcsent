import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';

/**
 * Supabase auth-helper middleware
 * - refreshes the session cookie on every request
 * - makes `useSessionContext` work on the client
 */
export async function middleware(req: NextRequest) {
  const res  = NextResponse.next();
  const supa = createMiddlewareSupabaseClient({ req, res });

  // ensure cookie always contains a fresh session
  await supa.auth.getSession();
  return res;
}

/* -- optional: limit paths that need the cookie -- */
// export const config = {
//   matcher: ['/((?!_next|favicon.ico).*)'],
// };
