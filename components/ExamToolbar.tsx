'use client';
import Link from 'next/link';

export default function ExamToolbar({
  index,
  total,
  percent,
  goPrev,
  goNext,
}: {
  index: number;
  total: number;
  percent: number;
  goPrev: () => void;
  goNext: () => void;
}) {
  return (
    <header className="border-b flex items-center justify-between px-4 py-2 bg-white sticky top-0 z-20">
      {/* back */}
      <button
        onClick={goPrev}
        className="p-1 disabled:opacity-40"
        disabled={index === 0}
      >
        ←
      </button>

      {/* centre: counter + flag */}
      <div className="flex items-center gap-3 text-sm">
        <span>
          Question {index + 1} of {total}
        </span>
        <button
          title="Flag for review"
          className="text-gray-400 hover:text-red-600"
        >
          🚩
        </button>
      </div>

      {/* right: score % and next */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">Score: {percent}%</span>
        <button
          onClick={goNext}
          className="p-1 disabled:opacity-40"
          disabled={index === total - 1}
        >
          →
        </button>
      </div>
    </header>
  );
}
