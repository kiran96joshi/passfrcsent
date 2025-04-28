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
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(total).fill(null)
  );
  const [checked, setChecked] = useState<boolean[]>(
    Array(total).fill(false)
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [finished, setFinished] = useState(false);

  const q = demoQuestions[index];

  /* ---------- score ---------- */
  const correctCount = checked.filter(
    (_, i) => checked[i] && answers[i] === demoQuestions[i].answer
  ).length;
  const answeredCount = checked.filter(Boolean).length;
  const percent = answeredCount
    ? Math.round((correctCount / answeredCount) * 100)
    : 0;

  /* ---------- handlers ---------- */
  const selectAnswer = (choice: number) =>
    setAnswers((prev) => {
      const arr = [...prev];
      arr[index] = choice;
      return arr;
    });

  const handleMainButton = () => {
    if (!checked[index]) {
      /* 1) Check answer */
      setChecked((prev) => {
        const arr = [...prev];
        arr[index] = true;
        return arr;
      });
    } else if (index < total - 1) {
      /* 2) Next question */
      setIndex((i) => i + 1);
    } else {
      /* 3) Finish */
      setFinished(true);
    }
  };

  const buttonLabel = !checked[index]
    ? 'Check answer'
    : index < total - 1
    ? 'Next question'
    : 'Finish';

  const buttonDisabled =
    (!checked[index] && answers[index] === null) || finished;

  /* ---------- FINISH PAGE ---------- */
  if (finished) {
    return (
      <section className="max-w-xl mx-auto py-24 px-4 space-y-8 text-center">
        <h1 className="text-3xl font-semibold">Well done!</h1>
        <p className="text-lg">
          You answered {correctCount} of {total} questions correctly (
          {Math.round((correctCount / total) * 100)}%).
        </p>

        <button
          className="px-6 py-3 rounded bg-blue-600 text-white"
          onClick={() => {
            setIndex(0);
            setAnswers(Array(total).fill(null));
            setChecked(Array(total).fill(false));
            setFinished(false);
          }}
        >
          Restart
        </button>
      </section>
    );
  }

  /* ---------- MAIN PAGE ---------- */
  return (
    <>
      <ExamToolbar
        index={index}
        total={total}
        percent={percent}
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen((s) => !s)}
        goPrev={() => setIndex((i) => Math.max(0, i - 1))}
        goNext={() => setIndex((i) => Math.min(total - 1, i + 1))}
      />

      <section className="max-w-7xl mx-auto p-4 mt-4 flex flex-col lg:flex-row gap-6">
        {/* main column */}
        <div className="flex-1 space-y-6">
          <QuestionCard
            key={q.id}
            question={q}
            selected={answers[index]}
            revealed={checked[index]}
            onSelect={selectAnswer}
            disabled={checked[index]}
          />

          <div className="flex justify-end">
            <button
              className="px-6 py-2 rounded bg-blue-600 text-white disabled:opacity-40"
              disabled={buttonDisabled}
              onClick={handleMainButton}
            >
              {buttonLabel}
            </button>
          </div>
        </div>

        {/* sidebar (right on desktop, slides below on mobile) */}
        {sidebarOpen && (
        <Sidebar
        answers={answers}
        correctAnswers={demoQuestions.map(q => q.answer)}
        checked={checked}
        onJump={(i) => setIndex(i)}
        />
        )}
      </section>
    </>
  );
}
