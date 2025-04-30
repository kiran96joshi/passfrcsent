// app/(protected)/bank/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabaseBrowser } from '@/lib/supabaseBrowser'

const TOPICS = [
  'Otology',
  'Head and Neck',
  'Paediatrics',
  'Rhinology and Facial Plastics',
  'EBM & Statistics',
]

export default function BankPage() {
  // 1) Category filters
  const [checked, setChecked] = useState<string[]>(TOPICS)

  // 2) Query result state
  const [count, setCount] = useState<number | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  // 3) Fetch matching question IDs & total whenever `checked` changes
  useEffect(() => {
    let cancelled = false

    async function load() {
      if (checked.length === 0) {
        setCount(0)
        setSelectedIds([])
        return
      }
      const { data, count: c, error } = await supabaseBrowser
        .from('questions')
        .select('id', { count: 'exact' })
        .in('topic', checked)

      if (!cancelled && !error) {
        setCount(c ?? 0)
        setSelectedIds((data ?? []).map((r :{ id: string}) => r.id))
      }
    }

    load()
    return () => { cancelled = true }
  }, [checked])

  return (
    <main className="max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-semibold mb-4">Question Bank</h1>

      {/* ── Category Checklist ── */}
      <section className="border rounded p-4">
        <h2 className="font-semibold mb-2">Categories</h2>
        {TOPICS.map((topic) => (
          <label key={topic} className="block">
            <input
              type="checkbox"
              checked={checked.includes(topic)}
              onChange={(e) =>
                setChecked((prev) =>
                  e.target.checked
                    ? [...prev, topic]
                    : prev.filter((x) => x !== topic)
                )
              }
            />{' '}
            {topic}
          </label>
        ))}
      </section>

      {/* ── Results & Start Button ── */}
      <section className="space-y-3 text-center">
        {count === null ? 'Loading…' : `${count} question${count === 1 ? '' : 's'} found`}

        <Link
          href={{
            pathname: '/practice',
            query: { ids: selectedIds.join(',') },
          }}
          className={`
            inline-block bg-blue-600 text-white px-6 py-2 rounded
            ${selectedIds.length ? 'opacity-100' : 'pointer-events-none opacity-40'}
          `}
        >
          Start the questions →
        </Link>
      </section>
    </main>
  )
}
