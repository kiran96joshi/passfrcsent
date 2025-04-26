'use client';
export default function Sidebar({
  answers,
  correctAnswers,
  checked,
}: {
  answers: (number | null)[];
  correctAnswers: number[];
  checked: boolean[];
}) {
  return (
    <aside className="w-64 lg:max-h-[calc(100vh_-_56px)] overflow-y-auto shrink-0 pb-6 lg:pb-0">
      {answers.map((a, i) => {
        let symbol = '○', colour = 'text-gray-400';
        if (checked[i]) {
          const ok = a === correctAnswers[i];
          symbol = ok ? '✓' : '✕';
          colour = ok ? 'text-emerald-600' : 'text-rose-600';
        }
        return (
          <div key={i} className="py-2 px-3 border-b last:border-none flex justify-between text-sm">
            <span>Question&nbsp;{i + 1}</span>
            <span className={colour}>{symbol}</span>
          </div>
        );
      })}
    </aside>
  );
}
