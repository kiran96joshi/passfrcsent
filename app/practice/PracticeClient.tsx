// app/practice/PracticeClient.tsx
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useUser } from '@/lib/useUser'
import { supabaseBrowser } from '@/lib/supabaseBrowser'

import QuestionCard from '@/components/QuestionCard'
import ExamToolbar  from '@/components/ExamToolbar'
import Sidebar      from '@/components/Sidebar'

export default function PracticeClient() {
  // ─── 1) Guard user up front ───────────────────
  const user = useUser()
  if (!user) {
    return <p className="p-4">Please sign in to practice.</p>
  }

  // ─── 2) Read IDs and fetch questions ──────────
  const search = useSearchParams()
  const router = useRouter()
  const idList = (search.get('ids') ?? '').split(',').filter(Boolean)

  const [questions, setQuestions] = useState<any[]>([])
  const [loading,    setLoading]   = useState(true)

  useEffect(() => {
    if (!idList.length) {
      router.replace('/bank')
      return
    }
    supabaseBrowser
      .from('questions')
      .select('*')
      .in('id', idList)
      .then(({ data, error }) => {
        if (error) console.error('Fetch error', error)
        setQuestions(data ?? [])
        setLoading(false)
      })
  }, [idList, router])

  // ─── 3) Practice state ───────────────────────
  const [index,       setIndex]      = useState(0)
  const [answers,     setAnswers]    = useState<(number|null)[]>([])
  const [checked,     setChecked]    = useState<boolean[]>([])
  const [sidebarOpen, setSidebarOpen]= useState(true)
  const [finished,    setFinished]   = useState(false)
  const [reviewMode,  setReviewMode] = useState(false)

  useEffect(() => {
    if (!questions.length) return
    setAnswers(Array(questions.length).fill(null))
    setChecked(Array(questions.length).fill(false))
  }, [questions.length])

  if (loading)           return <p className="p-4">Loading…</p>
  if (!questions.length) return <p className="p-4">No questions found.</p>

  // ─── 4) Derived & handlers ───────────────────
  const total        = questions.length
  const q            = questions[index]
  const readOnly     = reviewMode
  const correctCount = checked.filter((c,i) => c && answers[i] === q.answer).length
  const answered     = checked.filter(Boolean).length
  const percent      = answered ? Math.round((correctCount/answered)*100) : 0

  const selectAnswer = (choice:number) =>
    setAnswers(a=>{const x=[...a];x[index]=choice;return x})

  const handleMain = () => {
    if (!checked[index]) {
      setChecked(c=>{const x=[...c];x[index]=true;return x})
    } else if (index < total-1) {
      setIndex(i=>i+1)
    } else {
      setFinished(true)
    }
  }

  const restartSession = () => {
    if (confirm('Are you sure?')) {
      setIndex(0)
      setAnswers(Array(total).fill(null))
      setChecked(Array(total).fill(false))
      setFinished(false)
      setReviewMode(false)
    }
  }

  const exitReview = () => {
    setReviewMode(false)
    setIndex(0)
  }

  const buttonLabel = !checked[index]
    ? 'Check answer'
    : index < total-1
      ? 'Next question'
      : 'Finish'

  const buttonDisabled = (!checked[index] && answers[index]===null) || finished

  // ─── 5) **Save session & attempts** ───────────
  useEffect(() => {
    if (!finished || !user) return

    (async () => {
      // 1) sessions.insert
      const { data: sess, error: sessErr } = await supabaseBrowser
        .from('sessions')
        .insert({
          user_id: user.id,
          score:   correctCount,
          total,
          percent,
        })
        .select('id')
        .single()

      if (sessErr || !sess) {
        console.error('Session insert failed:', sessErr)
        return
      }

      // 2) attempts.insert
      const batch = questions.map((qq, i) => ({
        session_id:  sess.id,
        question_id: qq.id,
        selected:     answers[i] ?? -1,
        correct:      answers[i] === qq.answer,
      }))
      const { error: atErr } = await supabaseBrowser
        .from('attempts')
        .insert(batch)

      if (atErr) console.error('Attempts insert failed:', atErr)
      else console.log('🎉 Session & attempts saved.')
    })()
  }, [finished, user])  // <— include `user`

  // ─── 6) Finish / summary screen ──────────────
  if (finished && !reviewMode) {
    return (
      <section className="…">
        {/* your summary UI */}
      </section>
    )
  }

  // ─── 7) Practice / review screen ─────────────
  return (
    <>
      {/* your toolbar, question card, sidebar… */}
    </>
  )
}
