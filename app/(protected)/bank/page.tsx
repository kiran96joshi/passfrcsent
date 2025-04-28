// app/(protected)/bank/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter }           from 'next/navigation'
import Link                    from 'next/link'

import { useUser }          from '@/lib/useUser'
import { supabaseBrowser }  from '@/lib/supabaseBrowser'

const TOPICS = [
  'Otology',
  'Head and Neck',
  'Paediatrics',
  'Rhinology and Facial Plastics',
  'EBM & Statistics',
]

export default function BankPage() {
  const user   = useUser()
  const router = useRouter()

  // 1) Auth guard
  // — while auth is still initializing, user===undefined, render nothing
  if (user === undefined) return null

  // — if we know user is logged out, kick them back to /login
  useEffect(() => {
    if (user === null) router.replace('/login')
  }, [user, router])

  // — until redirect finishes, don’t show the page
  if (!user) return null

  // 2) Category filters
  const [checked, setChecked] = useState<string[]>(TOPICS)

  // 3) Query state
  const [count,       setCount]       = useState<number | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  // 4) Fetch count + ids from Supabase whenever filters change
  useEffect(() => {
    const run = async () => {
      if (checked.length === 0) {
        setCount(0)
        setSelectedIds([])
        return
      }

      const { data, count: c, error } = await supabaseBrowser
        .from('questions')
        .select('id', { count: 'exact' })
        .in('topic', checked)

      if (!error) {
        setCount(c ?? 0)
        setSelectedIds((data ?? []).map((r) => r.id))
      }
    }
    run()
  }, [checked])

  // 5) Render
  return (
    <main className="max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-semibold mb-4">Question Bank</h1>

      {/* ── Categories */}
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

      {/* ── Results & Start Button */}
      <section className="space-y-3 text-center">
        {count === null ? '…' : `${count} question${count === 1 ? '' : 's'} found`}

        <div>
          <Link
            href={{
              pathname: '/practice',
              query: { ids: selectedIds.join(',') },
            }}
            className={`inline-block bg-blue-600 text-white px-6 py-2 rounded ${
              selectedIds.length ? '' : 'pointer-events-none opacity-40'
            }`}
          >
            Start the questions →
          </Link>
        </div>
      </section>
    </main>
  )
}
