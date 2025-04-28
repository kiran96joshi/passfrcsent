'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseBrowser } from '@/lib/supabaseBrowser'
import { useUser } from '@/lib/useUser'
import Link from 'next/link'

type Session = {
  id: string
  user_id: string
  score: number
  total: number
  percent: number
  started_at: string
  finished_at: string
}

export default function DashboardPage() {
  const router = useRouter()
  const user   = useUser()

  const [sessions, setSessions] = useState<Session[] | null>(null)
  const [loading,  setLoading]  = useState(true)
  const [examDate, setExamDate] = useState<string | null>(null)
  const [daysLeft,  setDaysLeft]  = useState<number | null>(null)

  useEffect(() => {
    if (!user) {
      router.replace('/login')
      return
    }

    ;(async () => {
      // 1) fetch sessions
      const { data: sessData, error: sessErr } = await supabaseBrowser
        .from('sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('started_at', { ascending: false })

      if (sessErr) {
        console.error('Error fetching sessions:', sessErr.message)
      } else {
        setSessions(sessData)
      }

      // 2) fetch exam_date
      const { data: profData, error: profErr } = await supabaseBrowser
        .from('profiles')
        .select('exam_date')
        .eq('id', user.id)
        .single()

      if (profErr) {
        console.error('Error fetching profile:', profErr.message)
      } else if (profData?.exam_date) {
        setExamDate(profData.exam_date)
        const diffMs =
          new Date(profData.exam_date).getTime() -
          new Date().getTime()
        setDaysLeft(Math.ceil(diffMs / (1000 * 60 * 60 * 24)))
      }

      setLoading(false)
    })()
  }, [user, router])

  if (loading) return <p className="p-4">Loading your dashboard…</p>
  if (!sessions) return <p className="p-4">No session data.</p>

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-semibold">Your Dashboard</h1>

      {examDate && daysLeft !== null && (
        <div className="p-4 bg-gray-50 rounded">
          <strong>Exam date:</strong> {examDate}{' '}
          {daysLeft > 0
            ? `${daysLeft} day${daysLeft === 1 ? '' : 's'} away`
            : daysLeft === 0
            ? 'Today!'
            : `${-daysLeft} days ago`}
        </div>
      )}

      <section className="flex justify-end">
        <Link
          href="/bank"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go to Question Bank
        </Link>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Recent Sessions</h2>
        {sessions.length === 0 ? (
          <p>No sessions yet.</p>
        ) : (
          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Score</th>
                <th className="px-4 py-2">% Correct</th>
              </tr>
            </thead>
            <tbody>
              {sessions.slice(0, 5).map(s => (
                <tr key={s.id} className="border-t">
                  <td className="px-4 py-2">
                    {new Date(s.started_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    {s.score}/{s.total}
                  </td>
                  <td className="px-4 py-2">{s.percent}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  )
}
