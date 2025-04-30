// middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server'

// This will apply Clerk’s auth check only to these routes.
// Anything *not* matched here—your `/`, `/demo`, `/login`, `/register`,
// `/forgot-password`, `/reset-password` (and all their sub-paths)—will skip
// the middleware and remain publicly accessible.
export default clerkMiddleware()

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/bank/:path*',
    '/api/:path*',
  ],
}
