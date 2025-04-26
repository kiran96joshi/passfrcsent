'use client';
import { useState } from 'react';

export default function OptionCard({
  label,
  index,
  selected,
  correct,
  explanation,
  disabled,
  revealed,
  onSelect,
}: {
  label: string;
  index: number;
  selected: number | null;
  correct: number;
  explanation: string;
  disabled: boolean;
  revealed: boolean;
  onSelect: (i: number) => void;
}) {
  const chosen = selected === index;
  const isCorrect = index === correct;
  const showExplain =
    revealed && selected !== null && (chosen || isCorrect);

  /* styling ---------------------------------------------------------- */
  const base =
    'w-full text-left border rounded p-3 transition flex items-start justify-between';
  const neutral = 'hover:bg-gray-50';
  const highlight = 'ring-2 ring-blue-500 bg-blue-50';          // ← NEW
  const wrong = 'border-rose-500 bg-rose-50';
  const right = 'border-emerald-500 bg-emerald-50';

  const active = !revealed
    ? chosen
      ? highlight                                          // ← NEW
      : neutral
    : isCorrect
    ? right
    : chosen
    ? wrong
    : 'opacity-70';

  return (
    <div className="space-y-1">
      <button
        className={`${base} ${active}`}
        disabled={disabled}
        onClick={() => onSelect(index)}
      >
        <span>{label}</span>
        {revealed &&
          (isCorrect ? (
            <span className="text-emerald-600">✓</span>
          ) : chosen ? (
            <span className="text-rose-600">✕</span>
          ) : null)}
      </button>

      {showExplain && (
        <div className="ml-3 mb-3 text-sm text-gray-700">{explanation}</div>
      )}
    </div>
  );
}
