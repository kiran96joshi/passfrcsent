// app/(protected)/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useUser } from '@/lib/useUser'
import { supabaseBrowser } from '@/lib/supabaseBrowser'

type Session = {
  id: string
  score: number
  total: number
  percent: number
  finished_at: string
}

export default function DashboardPage() {
  const user = useUser()
  const [sessions, setSessions] = useState<Session[] | null>(null)
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    if (!user) return

    ;(async () => {
      const { data, error } = await supabaseBrowser
        .from('sessions')
        .select('id, score, total, percent, finished_at')
        .eq('user_id', user.id)
        .order('finished_at', { ascending: false })

      if (error) {
        console.error('Error loading sessions:', error)
        setSessions([])
      } else {
        setSessions(data)
      }
      setLoading(false)
    })()
  }, [user])

  if (!user) return null    // protected layout will redirect
  if (loading)  return <p className="p-4">Loading your history…</p>

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-semibold">Dashboard</h1>

      {sessions && sessions.length > 0 ? (
        <>
          {/* Last session */}
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-xl font-medium mb-2">Last session</h2>
            <p className="text-lg">
              {sessions[0].score} / {sessions[0].total} correct ({sessions[0].percent}%)  
            </p>
            <p className="text-sm text-gray-500">
              {new Date(sessions[0].finished_at).toLocaleString()}
            </p>
          </div>

          {/* History list */}
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-xl font-medium mb-2">Session history</h2>
            <ul className="divide-y">
              {sessions.map((s) => (
                <li key={s.id} className="py-2 flex justify-between">
                  <span>{new Date(s.finished_at).toLocaleDateString()}</span>
                  <span>
                    {s.score}/{s.total} ({s.percent}%)
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p className="text-gray-600">You haven’t completed any sessions yet.</p>
      )}

      <Link
        href="/bank"
        className="block w-full text-center bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
      >
        Start practice
      </Link>
    </main>
  )
}
