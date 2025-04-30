// app/layout.tsx
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import NavBar from '@/components/NavBar'
import { SupabaseProvider } from '@/components/SupabaseProvider'

export const metadata = {
  title: 'PassFRCSENT',
  description: 'Fast, focused SBA practice for FRCS (ORL-HNS) Part 1',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* 1) Clerk handles front-end auth */}
        <ClerkProvider>
          {/* 2) Our simple Supabase client context */}
          <SupabaseProvider>
            {/* 3) Your site-wide NavBar */}
            <NavBar />
            {/* 4) Your app content */}
            <main className="flex-1">{children}</main>
          </SupabaseProvider>
        </ClerkProvider>

        {/* 5) Global footer */}
        <footer className="bg-gray-50 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} PassFRCSENT Ltd
        </footer>
      </body>
    </html>
  )
}
