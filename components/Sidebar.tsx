import Image from 'next/image';

export default function Sidebar({
  answers,
  correctAnswers,
  checked,                // ← NEW
}: {
  answers: (number | null)[];
  correctAnswers: number[];
  checked: boolean[];      // ← NEW
}) {
  const done = checked.filter(Boolean).length;
  const correct = checked.filter(
    (_, i) => checked[i] && answers[i] === correctAnswers[i]
  ).length;
  const percent = done ? Math.round((correct / done) * 100) : 0;

  return (
    <aside className="w-60 shrink-0 space-y-4 text-sm">
      {/* score box */}
      <div className="border rounded p-3">
        <h3 className="font-semibold mb-2">Score: {percent}%</h3>
        <ol className="space-y-1">
          {answers.map((a, i) => {
            let symbol = '○';                 // default: not checked yet
            if (checked[i]) {
              symbol =
                a === correctAnswers[i] ? '✓' : '✕';
            }
            return (
              <li key={i}>
                {i + 1} <span className={symbol === '✓' ? 'text-emerald-600' : symbol === '✕' ? 'text-rose-600' : 'text-gray-400'}>{symbol}</span>
              </li>
            );
          })}
        </ol>
      </div>

      {/* textbook card */}
      <div className="border rounded p-3 bg-blue-50">
        <h4 className="font-semibold">Textbooks</h4>
        <p className="mt-1">
          <span className="px-1.5 py-0.5 text-xs bg-blue-200 rounded">
            High-yield reference
          </span>
        </p>
      </div>

      {/* media card */}
      <div className="border rounded p-3 bg-blue-50">
        <h4 className="font-semibold mb-2">Media</h4>
        <Image
          src="/placeholder.png"
          alt="media"
          width={180}
          height={100}
          className="mx-auto rounded"
        />
        <p className="mt-1 text-xs">
          Approach to obesity and weight gain
        </p>
      </div>
    </aside>
  );
}
