'use client'
export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import supabase from '@/lib/supabase'

import QuestionCard from '@/components/QuestionCard'
import ExamToolbar  from '@/components/ExamToolbar'
import Sidebar      from '@/components/Sidebar'

export default function Practice() {
  /* 1. Read IDs from URL */
  const search = useSearchParams()
  const router = useRouter()
  const idList = (search.get('ids') ?? '').split(',').filter(Boolean)

  /* 2. Load questions */
  const [questions, setQuestions] = useState<any[]>([])
  const [loading,    setLoading]   = useState(true)

  useEffect(() => {
    if (!idList.length) return router.replace('/bank')
    supabase
      .from('questions')
      .select('*')
      .in('id', idList)
      .then(({ data, error }) => {
        if (!error) setQuestions(data ?? [])
        setLoading(false)
      })
  }, [idList, router])

  /* 3. Session hooks (always in same order) */
  const [index,       setIndex]      = useState(0)
  const [answers,     setAnswers]    = useState<(number|null)[]>([])
  const [checked,     setChecked]    = useState<boolean[]>([])
  const [sidebarOpen, setSidebarOpen]= useState(true)
  const [finished,    setFinished]   = useState(false)
  const [reviewMode,  setReviewMode] = useState(false)

  /* 4. Initialize arrays once questions arrive */
  useEffect(() => {
    if (!questions.length) return
    setAnswers(Array(questions.length).fill(null))
    setChecked(Array(questions.length).fill(false))
  }, [questions.length])

  /* 5. Early returns after hooks */
  if (loading)           return <p className="p-4">Loading…</p>
  if (!questions.length) return <p className="p-4">No questions found.</p>

  /* 6. Derived data */
  const total        = questions.length
  const q            = questions[index]
  const readOnly     = reviewMode
  const correctCount = checked.filter((c,i) => c && answers[i]===questions[i].answer).length
  const answered     = checked.filter(Boolean).length
  const percent      = answered ? Math.round((correctCount/answered)*100) : 0

  /* 7. Handlers */
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
    setIndex(0) // back to summary
  }

  const buttonLabel = !checked[index]
    ? 'Check answer'
    : index < total-1
    ? 'Next question'
    : 'Finish'

  const buttonDisabled = (!checked[index] && answers[index]===null) || finished

  /* 8. Finish / summary screen */
  if (finished && !reviewMode) {
    return (
      <section className="max-w-xl mx-auto py-24 px-4 space-y-8 text-center">
        <h1 className="text-3xl font-semibold">Session complete!</h1>
        <p className="text-lg">
          You answered {correctCount} of {total} correctly ({Math.round((correctCount/total)*100)}%).
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="px-6 py-3 rounded bg-gray-200 hover:bg-gray-300"
            onClick={()=>setReviewMode(true)}
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

  /* 9. Practice / Review screen */
  return (
    <>
      <ExamToolbar
        index={index}
        total={total}
        percent={percent}
        sidebarOpen={sidebarOpen}
        toggleSidebar={()=>setSidebarOpen(s=>!s)}
        goPrev={()=>setIndex(i=>Math.max(0,i-1))}
        goNext={()=>setIndex(i=>Math.min(total-1,i+1))}
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
            revealed={checked[index]||readOnly}
            onSelect={readOnly?()=>{}:selectAnswer}
            disabled={checked[index]||readOnly}
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
            correctAnswers={questions.map(q=>q.answer)}
            checked={checked}
          />
        )}
      </section>
    </>
  )
}