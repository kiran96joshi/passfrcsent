// pages/api/my-sessions.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { auth } from '@clerk/nextjs/server'     
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!, 
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 1️⃣ Await Clerk’s API helper and destructure userId
  const { userId } = await auth()
  if (!userId) {
    return res.status(401).end()
  }

  // 2️⃣ Fetch that user’s sessions from Supabase
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  // 3️⃣ Return JSON list of sessions
  return res.status(200).json(data)
}
