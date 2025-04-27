// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
  // we create the Supabase client bound to the Next.js request & response
  const res = NextResponse.next()
  const supabase = createMiddlewareSupabaseClient({ req, res })

  // this will read the access_token/refresh_token cookies (or set them if you call setSession())
  // and attach the supabase session to the response cookies
  await supabase.auth.getSession()

  return res
}

// Run this middleware for all routes *except* _next/static, API routes, etc.
export const config = {
  matcher: [
    /*
      Match all request paths except for the ones starting with:
      - _next
      - static files
      - favicon.ico
      - api routes
    */
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
}
