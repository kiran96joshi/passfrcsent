'use client';

import { useState, useEffect } from 'react';
import supabase from '@/lib/supabase';     // server/client helper is fine
import Link from 'next/link';

/* ----------------- CONSTANTS ----------------- */
const TOPICS = [
  'Otology',
  'Head and Neck',
  'Paediatrics',
  'Rhinology and Facial Plastics',
  'EBM & Statistics',
];

/* ----------------- PAGE ---------------------- */
export default function BankPage() {
  /* filters */
  const [checked, setChecked] = useState<string[]>(TOPICS);

  /* count + ids coming from Supabase */
  const [count,       setCount]       = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  /* fetch count + ids whenever filters change */
  useEffect(() => {
    const run = async () => {
      if (checked.length === 0) {
        setCount(0);
        setSelectedIds([]);
        return;
      }

      const { data, count, error } = await supabase
        .from('questions')
        .select('id', { count: 'exact' })
        .in('topic', checked);

      if (!error) {
        setCount(count ?? 0);
        setSelectedIds((data ?? []).map((r) => r.id));
      }
    };

    run();
  }, [checked]);

  /* -------------- RENDER --------------------- */
  return (
    <main className="max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-semibold mb-4">Question bank</h1>

      {/* category checklist */}
      <section className="border rounded p-4">
        <h2 className="font-semibold mb-2">Categories</h2>
        {TOPICS.map((t) => (
          <label key={t} className="block">
            <input
              type="checkbox"
              checked={checked.includes(t)}
              onChange={(e) =>
                setChecked((prev) =>
                  e.target.checked ? [...prev, t] : prev.filter((x) => x !== t)
                )
              }
            />{' '}
            {t}
          </label>
        ))}
      </section>

      {/* result + start button */}
      <section className="space-y-3 text-center">
        {count === null ? '…' : `${count} question${count === 1 ? '' : 's'} found`}

        <div>
          <Link
            href={{
              pathname: '/practice',
              query: { ids: selectedIds.join(',') },
            }}
            className={`inline-block text-white bg-blue-600 px-6 py-2 rounded ${
              selectedIds.length ? '' : 'pointer-events-none opacity-40'
            }`}
          >
            Start the questions →
          </Link>
        </div>
      </section>
    </main>
  );
}
