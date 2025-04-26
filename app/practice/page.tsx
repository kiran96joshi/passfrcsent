'use client';
import { useState } from 'react';
import { demoQuestions } from '@/data/demo-questions';
import QuestionCard from '@/components/QuestionCard';

export default function Practice() {
  const total = demoQuestions.length;

  const [index, setIndex]     = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    Array(total).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);

  const selectAnswer = (choice: number) =>
    setAnswers((prev) => {
      const arr = [...prev];
      arr[index] = choice;
      return arr;
    });

  const correctCount = answers.filter(
    (a, i) => a !== null && a === demoQuestions[i].answer
  ).length;
  const answeredCount = answers.filter((a) => a !== null).length;
  const percent = answeredCount
    ? Math.round((correctCount / answeredCount) * 100)
    : 0;

  if (submitted) {
    return (
      <section className="max-w-md mx-auto py-24 text-center">
        <h2 className="text-2xl font-semibold mb-2">Results</h2>
        <p className="mb-2">
          {correctCount} / {total} correct ({Math.round(
            (correctCount / total) * 100
          )}
          %)
        </p>
        <button
          className="px-4 py-2 rounded bg-blue-600 text-white"
          onClick={() => {
            setIndex(0);
            setAnswers(Array(total).fill(null));
            setSubmitted(false);
          }}
        >
          Start Again
        </button>
      </section>
    );
  }

  const q = demoQuestions[index];

  return (
    <section className="flex max-w-6xl mx-auto py-10 px-4 gap-6">
      {/* ------------ SIDEBAR ------------ */}
      <aside className="w-28 shrink-0 space-y-2">
        {demoQuestions.map((_, i) => {
          const ans = answers[i];
          const done = ans !== null;
          const correct = done && ans === demoQuestions[i].answer;

          const bg = !done
            ? 'bg-gray-100'
            : correct
            ? 'bg-emerald-500'
            : 'bg-rose-500';

          return (
            <div
              key={i}
              className={`${bg} text-white rounded flex items-center justify-center h-8 cursor-pointer ${
                i === index ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setIndex(i)}
            >
              {done ? (correct ? '✓' : '✕') : i + 1}
            </div>
          );
        })}

        <div className="text-center text-sm mt-4">
          Score: {percent}%
        </div>
      </aside>

      {/* ------------ MAIN CARD ------------ */}
      <div className="flex-1 space-y-6">
        <div className="text-sm text-gray-500">
          Question {index + 1} / {total}
        </div>

        <QuestionCard
          key={q.id}
          question={q}
          selected={answers[index]}
          onSelect={selectAnswer}
        />

        <div className="flex justify-between pt-4">
          <button
            className="px-4 py-2 rounded bg-gray-100 disabled:opacity-40"
            disabled={index === 0}
            onClick={() => setIndex((i) => i - 1)}
          >
            ← Back
          </button>

          {index < total - 1 && (
            <button
              className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-40"
              disabled={answers[index] === null}
              onClick={() => setIndex((i) => i + 1)}
            >
              Next →
            </button>
          )}

          {index === total - 1 && (
            <button
              className="px-4 py-2 rounded bg-emerald-600 text-white disabled:opacity-40"
              disabled={answers.some((a) => a === null)}
              onClick={() => setSubmitted(true)}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
