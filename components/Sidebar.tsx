'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function Sidebar({
  answers,
  correctAnswers,
  checked,
}: {
  answers: (number | null)[];
  correctAnswers: number[];
  checked: boolean[];
}) {
  const done = checked.filter(Boolean).length;
  const correct = checked.filter(
    (_, i) => checked[i] && answers[i] === correctAnswers[i]
  ).length;
  const percent = done ? Math.round((correct / done) * 100) : 0;

  /* toggle score visibility */
  const [showScore, setShowScore] = useState(true);

  return (
    <aside className="w-64 shrink-0 space-y-4 text-sm overflow-y-auto">
      {/* score box */}
      <div className="border rounded p-3">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Score</h3>
          <button
            onClick={() => setShowScore((s) => !s)}
            title={showScore ? 'Hide' : 'Show'}
            className="text-gray-500 hover:text-gray-700"
          >
            {showScore ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>

        {showScore ? (
          <p className="text-3xl font-bold text-center">{percent}%</p>
        ) : (
          <p className="text-center text-gray-400 select-none">hidden</p>
        )}
      </div>

      {/* question list */}
      <div className="border rounded max-h-80 overflow-y-auto">
        {answers.map((a, i) => {
          let symbol = '○';
          if (checked[i]) {
            symbol = a === correctAnswers[i] ? '✓' : '✕';
          }
          const colour =
            symbol === '✓'
              ? 'text-emerald-600'
              : symbol === '✕'
              ? 'text-rose-600'
              : 'text-gray-400';

          return (
            <div
              key={i}
              className="py-1 px-3 border-b last:border-none flex justify-between"
            >
              <span>Question&nbsp;{i + 1}</span>
              <span className={colour}>{symbol}</span>
            </div>
          );
        })}
      </div>

      {/* textbook / media cards (place-holders) */}
      <div className="border rounded p-3 bg-blue-50">
        <h4 className="font-semibold">Textbooks</h4>
        <p className="mt-1 text-xs">High-yield reference</p>
      </div>

      <div className="border rounded p-3 bg-blue-50">
        <h4 className="font-semibold mb-2">Media</h4>
        <Image
          src="/placeholder.png"
          alt="media"
          width={180}
          height={100}
          className="mx-auto rounded"
        />
      </div>
    </aside>
  );
}
