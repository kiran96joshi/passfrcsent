// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs'
import NavBar from '@/components/NavBar'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <ClerkProvider>
          <NavBar/>
          <main className="flex-1">{children}</main>
        </ClerkProvider>
      </body>
    </html>
  )
}
