export type Question = {
  id: string;
  stem: string;
  options: string[];
  answer: number;
  explanation: string;
};

export const demoQuestions: Question[] = [
  {
    id: 'q1',
    stem: 'Which ossicle is most commonly eroded in chronic otitis media?',
    options: ['Malleus', 'Incus', 'Stapes', 'Footplate'],
    answer: 1,
    explanation: 'The long process of the incus has a tenuous blood supply and is most susceptible to necrosis.',
  },
  {
    id: 'q2',
    stem: 'The sensory supply of the larynx above the vocal cords is via?',
    options: [
      'Recurrent laryngeal nerve',
      'External branch of superior laryngeal nerve',
      'Internal branch of superior laryngeal nerve',
      'Glossopharyngeal nerve',
    ],
    answer: 2,
    explanation: 'The internal branch of the superior laryngeal nerve supplies sensation above the cords.',
  },
  {
    id: 'q3',
    stem: 'Which congenital neck cyst typically moves upward on tongue protrusion?',
    options: [
      'Thyroglossal duct cyst',
      'Branchial cleft cyst',
      'Dermoid cyst',
      'Cystic hygroma',
    ],
    answer: 0,
    explanation: 'A thyroglossal cyst is attached to the hyoid and moves with tongue protrusion or swallowing.',
  },
];
