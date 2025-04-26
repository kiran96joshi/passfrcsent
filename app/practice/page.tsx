'use client';
import { useState } from 'react';
import { demoQuestions } from '@/data/demo-questions';
import QuestionCard from '@/components/QuestionCard';

export default function Practice() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const next = (correct: boolean) => {
    if (correct) setScore((s) => s + 1);
    setIndex((i) => i + 1);
  };

  if (index >= demoQuestions.length)
    return (
      <section className="max-w-md mx-auto py-24 text-center">
        <h2 className="text-2xl font-semibold mb-2">Finished!</h2>
        <p className="mb-6">
          You scored {score} / {demoQuestions.length}
        </p>
        <a
          href="/practice"
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          Try Again
        </a>
      </section>
    );

  const q = demoQuestions[index];
  return (
    <section className="max-w-2xl mx-auto py-16 px-4">
      <div className="mb-6 text-sm text-gray-500">
        Question {index + 1} / {demoQuestions.length}
      </div>
      <QuestionCard question={q} onNext={next} />
    </section>
  );
}
