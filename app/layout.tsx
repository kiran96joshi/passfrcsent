import './globals.css';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'PassFRCSENT',
  description: 'Question-bank for the FRCS (ORL-HNS) exam',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <nav className="sticky top-0 bg-white shadow-sm z-10">
          <div className="max-w-5xl mx-auto px-4 py-2 flex justify-between">
            <Link href="/" className="font-bold text-lg text-blue-700">
              PassFRCSENT
            </Link>
            <div className="space-x-4">
              <Link href="/practice" className="hover:text-blue-600">
                Practice
              </Link>
              <a
                href="https://vercel.com"
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Deploy
              </a>
            </div>
          </div>
        </nav>
        <main className="flex-1">{children}</main>
        <footer className="bg-gray-50 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} PassFRCSENT · Not affiliated with ICBSE
        </footer>
      </body>
    </html>
  );
}
