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
          const isChosen  = selected === idx;
          const isCorrect = idx === question.answer;

          const base    = 'w-full text-left px-4 py-2 rounded border transition';
          const idle    = 'hover:bg-gray-50';
          const correct = 'bg-emerald-50 border-emerald-600 text-emerald-800';
          const wrong   = 'bg-rose-50 border-rose-600 text-rose-800';

          const style =
            selected === null
              ? idle
              : isCorrect
              ? correct
              : isChosen
              ? wrong
              : 'opacity-60';

          return (
            <li key={idx}>
              <button
                className={`${base} ${style}`}
                disabled={selected !== null}
                onClick={() => onSelect(idx)}
              >
                {opt}
              </button>
            </li>
          );
        })}
      </ul>

      {selected !== null && (
        <p className="mt-4 text-sm text-gray-600">
          <span className="font-medium">
            {selected === question.answer ? 'Correct! ' : 'Explanation: '}
          </span>
          {question.explanation}
        </p>
      )}
    </div>
  );
}
