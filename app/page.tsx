/* --- app/page.tsx -------------------------------------------------- */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@/lib/useUser';

export default function Home() {
  const user = useUser();
  /* FAQ accordion state */
  const [open, setOpen] = useState<number | null>(null);
  const toggle = (i: number) =>
    setOpen(prev => (prev === i ? null : i));

  return (
    <main className="min-h-screen flex flex-col">
      {/* ---------------- HERO ---------------- */}
      <section className="flex-1 flex flex-col items-center justify-center gap-8 p-6">
        <h1 className="text-4xl font-bold">PassFRCSENT</h1>
        <p className="text-lg text-center max-w-xl">
          Fast, focused SBA practice for the FRCS&nbsp;(ORL-HNS) Part 1.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* demo link */}
          <Link
            href="/demo"
            className="px-8 py-3 rounded bg-blue-600 text-white text-center hover:bg-blue-700"
          >
            Try the demo
          </Link>

          {/* only show “Go to Dashboard” if signed in */}
          {user ? (
            <Link
              href="/dashboard"
              className="px-8 py-3 rounded bg-green-600 text-white text-center hover:bg-green-700"
            >
              Go to Dashboard
            </Link>
          ) : (
            /* placeholder for gating – you could link to /login here */
            <span className="px-8 py-3 rounded border border-gray-300 text-gray-400 text-center">
              Question bank&nbsp;(sign in required)
            </span>
          )}
        </div>
      </section>

      {/* ---------------- FEATURES ---------------- */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Why revise with us?
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              ['1,200+ SBA & EMQ', 'Every question mapped to the latest curriculum.'],
              ['Real-exam interface', 'Timed mocks with negative marking & cohort stats.'],
              ['Personal analytics', 'Instant strength-weakness breakdown by topic.'],
            ].map(([title, text]) => (
              <div
                key={title}
                className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-medium mb-2">{title}</h3>
                <p className="text-sm text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- PRICING ---------------- */}
      <section className="py-20">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-8">Simple pricing</h2>

          <div className="border rounded-xl p-8 shadow-sm hover:shadow-md transition">
            <p className="text-4xl font-bold">£39</p>
            <p className="text-sm text-gray-500 mb-6">
              Access until your next exam sitting
            </p>

            <ul className="space-y-2 text-left mb-8 text-sm">
              <li>✓ Unlimited practice & full mocks</li>
              <li>✓ Detailed explanations</li>
              <li>✓ Performance dashboard</li>
              <li>✓ Priority email support</li>
            </ul>

            <Link
              href="#"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
            >
              Purchase access
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-10">FAQ</h2>

          {[
            [
              'Can I try questions for free?',
              'Yes – click “Try the demo” above for an unrestricted sample.',
            ],
            [
              'Does the bank match the 2024 syllabus?',
              'Every item is tagged to the current JCIE FRCS ORL-HNS curriculum and reviewed monthly.',
            ],
            [
              'Do I get updates after purchase?',
              'Absolutely – new questions and features are added continuously at no extra cost.',
            ],
          ].map(([q, a], i) => (
            <div key={q} className="border-b py-3">
              <button
                className="w-full text-left flex justify-between items-center"
                onClick={() => toggle(i)}
              >
                <span>{q}</span>
                <span>{open === i ? '−' : '+'}</span>
              </button>
              {open === i && (
                <p className="mt-2 text-sm text-gray-600">{a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="bg-gray-100 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} PassFRCSENT Ltd ·{' '}
        <Link href="#" className="underline mx-1">
          Privacy
        </Link>
        ·
        <Link href="#" className="underline mx-1">
          Terms
        </Link>
      </footer>
    </main>
  );
}
