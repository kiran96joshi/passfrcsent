// components/NavBar.tsx
'use client'
import Link from 'next/link'
import { SignInButton, SignOutButton, UserButton, useUser } from '@clerk/nextjs'

export default function NavBar() {
  const { isSignedIn } = useUser()

  return (
    <nav className="sticky top-0 bg-white shadow z-10 p-4 flex justify-between items-center">
      <Link href="/" className="font-bold text-xl">PassFRCSENT</Link>
      <div className="space-x-4">
        <Link href="/bank"    className="hover:underline">Question Bank</Link>
        <Link href="/dashboard" className="hover:underline">Dashboard</Link>
        {isSignedIn ? (
          <>
            <UserButton />  {/* avatar dropdown with “Log out” baked in */}
          </>
        ) : (
          <SignInButton mode="modal">
            <button className="px-3 py-1 bg-blue-600 text-white rounded">Sign In / Sign Up</button>
          </SignInButton>
        )}
      </div>
    </nav>
  )
}
