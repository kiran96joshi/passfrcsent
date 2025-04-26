'use client';
import type { Question } from '@/data/demo-questions';
import { useMemo } from 'react';

export default function QuestionCard({
  question,
  selected,
  revealed,
  onSelect,
  disabled,
}: {
  question: Question;
  selected: number | null;
  revealed: boolean;
  onSelect: (choice: number) => void;
  disabled: boolean;
}) {
  const baseBtn =
    'w-full text-left border rounded p-3 transition flex justify-between items-start';
  const highlight = 'ring-2 ring-blue-500 bg-blue-50';
  const wrong = 'border-rose-500 bg-rose-50';
  const right = 'border-emerald-500 bg-emerald-50';

  const renderOption = (opt: string, idx: number) => {
    const chosen = selected === idx;
    const isCorrect = idx === question.answer;
    const styleBeforeReveal = chosen ? highlight : 'hover:bg-gray-50';
    const styleAfterReveal = isCorrect
      ? right
      : chosen
      ? wrong
      : 'opacity-70';

    return (
      <li key={idx}>
        <button
          disabled={disabled}
          onClick={() => onSelect(idx)}
          className={`${baseBtn} ${revealed ? styleAfterReveal : styleBeforeReveal}`}
        >
          {opt}
          {revealed &&
            (isCorrect ? (
              <span className="text-emerald-600">✓</span>
            ) : chosen ? (
              <span className="text-rose-600">✕</span>
            ) : null)}
        </button>
      </li>
    );
  };

  return (
    <div className="space-y-6">
      <p className="font-medium">{question.stem}</p>

      <ul className="space-y-3">{question.options.map(renderOption)}</ul>

      {revealed && (
        <div className="border rounded bg-gray-50 p-4 text-sm text-gray-700">
          {question.explanation}
        </div>
      )}
    </div>
  );
}
