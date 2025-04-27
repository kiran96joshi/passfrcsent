/* app/layout.tsx */
import './globals.css';
import { SupabaseProvider } from '@/components/SupabaseProvider';   // ★ NEW
import NavBar from '@/components/NavBar';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'PassFRCSENT',
  description: 'Question-bank for the FRCS (ORL-HNS) exam',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* --------- NAV --------- */}
        <SupabaseProvider>
        <NavBar />
             {/* --------- APP --------- */}
             <main className="flex-1">{children}</main>
        </SupabaseProvider>

        {/* --------- FOOTER --------- */}
        <footer className="bg-gray-50 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} PassFRCSENT · Not affiliated with ICBSE
        </footer>
      </body>
    </html>
  );
}
