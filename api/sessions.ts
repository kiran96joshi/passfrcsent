// pages/api/sessions.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { auth } from '@clerk/nextjs/server'             // clerk middleware helper
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1) must be POST
  if (req.method !== 'POST') return res.status(405).end()

  // 2) get the Clerk userId
  const { userId } = auth(req, res)
  if (!userId) return res.status(401).json({ error: 'Not authenticated' })

  const { score, total, percent, attempts } = req.body as {
    score: number, total: number, percent: number,
    attempts: Array<{ question_id: string, selected: number, correct: boolean }>
  }

  // 3) insert into sessions
  const { data: session, error: sessErr } = await supabase
    .from('sessions')
    .insert({ user_id: userId, score, total, percent })
    .select('id')
    .single()

  if (sessErr || !session) {
    console.error('Session insert error', sessErr)
    return res.status(500).json({ error: 'Could not create session' })
  }

  // 4) map attempts
  const toInsert = attempts.map((a: any) => ({
    session_id:  session.id,
    question_id: a.question_id,
    selected:     a.selected,
    correct:      a.correct
  }))

  const { error: attErr } = await supabase
    .from('attempts')
    .insert(toInsert)

  if (attErr) {
    console.error('Attempts insert error', attErr)
    return res.status(500).json({ error: 'Could not save attempts' })
  }

  res.status(200).json({ ok: true })
}
