'use client';
import type { Question } from '@/data/demo-questions';

type Props = {
  question: Question;
  selected: number | null;
  onSelect: (choice: number) => void;
};

export default function QuestionCard({ question, selected, onSelect }: Props) {
  return (
    <div className="border rounded-xl shadow p-6 bg-white">
      <h3 className="font-medium mb-4">{question.stem}</h3>

      <ul className="space-y-2">
        {question.options.map((opt, idx) => {
          const base =
            'w-full text-left px-4 py-2 rounded border transition';
          const hover = 'hover:bg-gray-50';
          const chosen =
            idx === selected ? 'ring-2 ring-blue-500' : '';

          return (
            <li key={idx}>
              <button
                className={`${base} ${hover} ${chosen}`}
                onClick={() => onSelect(idx)}
              >
                {opt}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
