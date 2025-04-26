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
    stem: 'Which ossicle is most often eroded in chronic otitis media?',
    options: ['Malleus', 'Incus', 'Stapes', 'Footplate'],
    answer: 1,
    explanation: 'The long process of the incus has a tenuous blood supply.',
  },
  {
    id: 'q2',
    stem: 'Sensory supply of the larynx above the vocal cords is via?',
    options: [
      'Recurrent laryngeal nerve',
      'External branch of superior laryngeal',
      'Internal branch of superior laryngeal',
      'Glossopharyngeal nerve',
    ],
    answer: 2,
    explanation: 'The internal branch of the superior laryngeal nerve.',
  },
  /* --- add 18 more quick-fire ENT SBAs --- */
  {
    id: 'q3',
    stem: 'A thyroglossal duct cyst moves with…',
    options: [
      'Head turning',
      'Tongue protrusion',
      'Mouth opening',
      'Swallow initiation',
    ],
    answer: 1,
    explanation: 'It is attached to the foramen cecum via a fibrous tract.',
  },
  {
    id: 'q4',
    stem: 'First-line antibiotic for malignant otitis externa?',
    options: ['Ciprofloxacin', 'Amoxicillin', 'Metronidazole', 'Erythromycin'],
    answer: 0,
    explanation: 'Targets Pseudomonas aeruginosa.',
  },
  { id: 'q5', stem: 'Most common neck space infection in children?', options: ['Parapharyngeal', 'Retropharyngeal', 'Submandibular', 'Pretracheal'], answer: 1, explanation: 'Retropharyngeal abscess is common in <5-year-olds.' },
  { id: 'q6', stem: 'Which semicircular canal is most commonly involved in B
