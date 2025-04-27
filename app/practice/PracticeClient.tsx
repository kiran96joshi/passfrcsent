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
  // 1) Always get these hooks in the same order:
  const user      = useUser()
  const search    = useSearchParams()
  const router    = useRouter()

  // 2) Read IDs
  const idList    = (search.get('ids') ?? '').split(',').filter(Boolean)

  // 3) Question fetch state
  const [questions, setQuestions] = useState<any[]>([])
  const [loading,    setLoading]   = useState(true)

  // 4) Practice session state
  const [index,       setIndex]      = useState(0)
  const [answers,     setAnswers]    = useState<(number|null)[]>([])
  const [checked,     setChecked]    = useState<boolean[]>([])
  const [sidebarOpen, setSidebarOpen]= useState(true)
  const [finished,    setFinished]   = useState(false)
  const [reviewMode,  setReviewMode] = useState(false)

  // 5) Derived values
  const total        = questions.length
  const q            = questions[index]
  const readOnly     = reviewMode
  const correctCount = checked.filter((c,i) => c && answers[i] === q.answer).length
  const answered     = checked.filter(Boolean).length
  const percent      = answered ? Math.round((correctCount/answered)*100) : 0

  // 6) Handlers (stable definitions)
  const selectAnswer = (choice: number) =>
    setAnswers(a => { const x = [...a]; x[index] = choice; return x })

  const handleMain = () => {
    if (!checked[index]) {
      setChecked(c => { const x = [...c]; x[index] = true; return x })
    } else if (index < total - 1) {
      setIndex(i => i + 1)
    } else {
      setFinished(true)
    }
  }

  const restartSession = () => {
    if (confirm('Are you sure you want to restart the session?')) {
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
    : index < total - 1
      ? 'Next question'
      : 'Finish'

  const buttonDisabled = (!checked[index] && answers[index] === null) || finished

  // 7) Effects in fixed sequence:

  // a) fetch questions once on mount / idList change
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

  // b) initialize answers/checked arrays once questions arrive
  useEffect(() => {
    if (!questions.length) return
    setAnswers(Array(questions.length).fill(null))
    setChecked(Array(questions.length).fill(false))
  }, [questions.length])

  // c) save session + attempts once finished & user available
  useEffect(() => {
    if (!finished || !user) return

    (async () => {
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
  }, [finished, user])

  // 8) Early returns now that all hooks & effects are set up:

  if (!user)      return <p className="p-4">Please sign in to practice.</p>
  if (loading)    return <p className="p-4">Loading…</p>
  if (!questions.length) return <p className="p-4">No questions found.</p>

  // 9) Summary screen
  if (finished && !reviewMode) {
    return (
      <section className="max-w-xl mx-auto py-24 px-4 space-y-8 text-center">
        <h1 className="text-3xl font-semibold">Session complete!</h1>
        <p className="text-lg">
          You answered {correctCount} of {total} correctly ({percent}%).
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="px-6 py-3 rounded bg-gray-200 hover:bg-gray-300"
            onClick={() => setReviewMode(true)}
          >
            Review answers
          </button>
          <button
            className="px-6 py-3 rounded bg-blue-600 text-white"
            onClick={restartSession}
          >
            Restart session
          </button>
        </div>
      </section>
    )
  }

  // 10) Practice / review screen
  return (
    <>
      <ExamToolbar
        index={index}
        total={total}
        percent={percent}
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(s => !s)}
        goPrev={() => setIndex(i => Math.max(0, i - 1))}
        goNext={() => setIndex(i => Math.min(total - 1, i + 1))}
      />

      <section className="max-w-7xl mx-auto p-4 mt-4 flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          {readOnly && (
            <div className="flex justify-end">
              <button
                onClick={exitReview}
                className="mb-4 px-4 py-1.5 rounded bg-gray-200 hover:bg-gray-300 text-sm"
              >
                Exit review
              </button>
            </div>
          )}

          <QuestionCard
            key={q.id}
            question={q}
            selected={answers[index]}
            revealed={checked[index] || readOnly}
            onSelect={readOnly ? () => {} : selectAnswer}
            disabled={checked[index] || readOnly}
          />

          {!readOnly && (
            <div className="flex justify-end">
              <button
                className="px-6 py-2 rounded bg-blue-600 text-white disabled:opacity-40"
                disabled={buttonDisabled}
                onClick={handleMain}
              >
                {buttonLabel}
              </button>
            </div>
          )}
        </div>

        {sidebarOpen && (
          <Sidebar
            answers={answers}
            correctAnswers={questions.map((qq) => qq.answer)}
            checked={checked}
          />
        )}
      </section>
    </>
  )
}
