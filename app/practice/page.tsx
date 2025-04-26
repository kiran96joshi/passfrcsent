'use client';
import { useState } from 'react';
import { demoQuestions } from '@/data/demo-questions';
import QuestionCard from '@/components/QuestionCard';
import ExamToolbar from '@/components/ExamToolbar';
import Sidebar from '@/components/Sidebar';

export default function Practice() {
  const total = demoQuestions.length;

  /* ---------- state ---------- */
  const [index, setIndex]     = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    Array(total).fill(null)
  );
  const [showExplain, setShowExplain] = useState(false);

  const q = demoQuestions[index];

  const selectAnswer = (choice: number) => {
    setAnswers((prev) => {
      const arr = [...prev];
      arr[index] = choice;
      return arr;
    });
    setShowExplain(true);
  };

  /* ---------- live score ---------- */
  const correctCount = answers.filter(
    (a, i) => a !== null && a === demoQuestions[i].answer
  ).length;
  const answeredCount = answers.filter((a) => a !== null).length;
  const percent = answeredCount
    ? Math.round((correctCount / answeredCount) * 100)
    : 0;

  /* ---------- JSX ---------- */
  return (
    <>
      <ExamToolbar
        index={index}
        total={total}
        percent={percent}
        goPrev={() => setIndex((i) => Math.max(0, i - 1))}
        goNext={() => setIndex((i) => Math.min(total - 1, i + 1))}
      />

      <section className="flex max-w-7xl mx-auto gap-6 p-4 mt-4">
        {/* main column */}
        <div className="flex-1 space-y-6">
          <QuestionCard
            key={q.id}
            question={q}
            selected={answers[index]}
            onSelect={selectAnswer}
          />

          {showExplain && answers[index] !== null && (
            <div className="space-y-4 text-sm">
              <div className="bg-emerald-50 border border-emerald-400 rounded p-3">
                <strong>{q.options[q.answer]}</strong> is secreted by adipose
                tissue.
              </div>

              <p>
                <strong className="text-emerald-600">
                  {q.options[q.answer]}
                </strong>{' '}
                is the correct option, as it is secreted by adipose tissue…
              </p>
              <p>
                <strong className="text-rose-600">
                  {answers[index] !== null &&
                    q.options[answers[index] as number]}
                </strong>{' '}
                is incorrect because&nbsp;…
              </p>
            </div>
          )}
        </div>

        {/* sidebar */}
        <Sidebar
          answers={answers}
          correctAnswers={demoQuestions.map((d) => d.answer)}
        />
      </section>
    </>
  );
}
