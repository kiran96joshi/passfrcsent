// app/layout.tsx
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import NavBar from '@/components/NavBar'

export const metadata = {
  title: 'PassFRCSENT',
  description: 'Fast, focused SBA practice for FRCS (ORL-HNS) Part 1',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <ClerkProvider>
          <NavBar />
          <main className="flex-1">{children}</main>
        </ClerkProvider>
        <footer className="bg-gray-50 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} PassFRCSENT Ltd
        </footer>
      </body>
    </html>
  )
}
