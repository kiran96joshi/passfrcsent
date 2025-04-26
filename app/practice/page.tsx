'use client';
import { useState } from 'react';
import { demoQuestions } from '@/data/demo-questions';
import QuestionCard from '@/components/QuestionCard';
import ExamToolbar from '@/components/ExamToolbar';
import Sidebar from '@/components/Sidebar';

export default function Practice() {
  const total = demoQuestions.length;

  /* state ------------------------------------------------------------ */
  const [index, setIndex]     = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    Array(total).fill(null)
  );
  const [checked, setChecked] = useState<boolean[]>(
    Array(total).fill(false)
  );

  const q = demoQuestions[index];

  /* score ------------------------------------------------------------ */
  const correctCount = checked.filter(
    (_, i) => checked[i] && answers[i] === demoQuestions[i].answer
  ).length;
  const answeredCount = checked.filter(Boolean).length;
  const percent = answeredCount
    ? Math.round((correctCount / answeredCount) * 100)
    : 0;

  /* handlers --------------------------------------------------------- */
  const selectAnswer = (choice: number) =>
    setAnswers((prev) => {
      const arr = [...prev];
      arr[index] = choice;
      return arr;
    });

  const handleButton = () => {
    if (!checked[index]) {
      // first click = mark answers
      setChecked((prev) => {
        const arr = [...prev];
        arr[index] = true;
        return arr;
      });
    } else {
      // second click = go to next question
      setIndex((i) => Math.min(total - 1, i + 1));
    }
  };

  const buttonDisabled = answers[index] === null && !checked[index];
  const buttonLabel = checked[index] ? 'Next question' : 'Check answer';

  /* JSX -------------------------------------------------------------- */
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
            revealed={checked[index]}      /* NEW */
            onSelect={selectAnswer}
            disabled={checked[index]}
          />

          <div className="flex justify-end">
            <button
              className="px-6 py-2 rounded bg-blue-600 text-white disabled:opacity-40"
              disabled={buttonDisabled}
              onClick={handleButton}
            >
              {buttonLabel}
            </button>
          </div>
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
