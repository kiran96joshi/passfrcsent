'use client'

import { useUser as useClerkUser } from '@clerk/nextjs'

/**
 * Returns:
 *   - `undefined` while Clerk is still initializing  
 *   - `null` if the user is known to be signed out  
 *   - the Clerk user object if signed in
 */
export function useUser() {
  const { isLoaded, isSignedIn, user } = useClerkUser()

  if (!isLoaded) return undefined
  return isSignedIn ? user : null
}
