'use client';
import type { Question } from '@/data/demo-questions';
import OptionCard from '@/components/OptionCard';

export default function QuestionCard({
  question,
  selected,
  revealed,          // ← NEW
  onSelect,
  disabled,
}: {
  question: Question;
  selected: number | null;
  revealed: boolean; // ← NEW
  onSelect: (choice: number) => void;
  disabled: boolean;
}) {
  return (
    <div className="space-y-6">
      <p className="font-medium">{question.stem}</p>

      <ul className="space-y-3">
        {question.options.map((opt, idx) => (
          <li key={idx}>
            <OptionCard
              label={opt}
              index={idx}
              selected={selected}
              correct={question.answer}
              explanation={question.explanation}
              disabled={disabled}
              revealed={revealed}   // ← NEW
              onSelect={onSelect}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
