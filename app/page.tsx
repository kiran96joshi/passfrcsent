'use client';
import { useState } from 'react';
import { demoQuestions } from '@/data/demo-questions';
import QuestionCard from '@/components/QuestionCard';

export default function Practice() {
  const total = demoQuestions.length;

  const [index, setIndex]       = useState(0);
  const [answers, setAnswers]   = useState<(number | null)[]>(() =>
    Array(total).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);

  // called by QuestionCard
  const selectAnswer = (choice: number) =>
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = choice;
      return next;
    });

  const score = answers.filter(
    (ans, i) => ans === demoQuestions[i].answer
  ).length;

  if (submitted) {
    return (
      <section className="max-w-md mx-auto py-24 text-center">
        <h2 className="text-2xl font-semibold mb-2">Results</h2>
        <p className="mb-6">
          You scored {score} / {total}
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
// …earlier code above is unchanged …

const q = demoQuestions[index];

return (
  <section className="max-w-2xl mx-auto py-16 px-4 space-y-6">
    <div className="text-sm text-gray-500">
      Question {index + 1} / {total}
    </div>

    {/* ---- FIXED: no onNext prop, uses selected/onSelect ---- */}
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
          disabled={index >= total - 1}
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
  </section>
);
}

