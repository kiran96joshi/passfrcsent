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
  { id: 'q6', stem: 'Which semicircular canal is most commonly involved in BPPV?', options: ['Anterior', 'Posterior', 'Horizontal', 'Superior'], answer: 1, explanation: 'Posterior canal (≈90 %).' },
  { id: 'q7', stem: 'Carhart’s notch at 2 kHz suggests?', options: ['Otosclerosis', 'Ménière’s', 'Acoustic neuroma', 'Ossicular discontinuity'], answer: 0, explanation: 'It’s a classic audiometric finding in otosclerosis.' },
  { id: 'q8', stem: 'Drug causing ototoxicity + nephrotoxicity?', options: ['Gentamicin', 'Ciprofloxacin', 'Azithromycin', 'Flucloxacillin'], answer: 0, explanation: 'Gentamicin is aminoglycoside-class.' },
  { id: 'q9', stem: 'Cranial nerve exiting stylomastoid foramen?', options: ['V', 'VII', 'IX', 'XI'], answer: 1, explanation: 'Facial nerve (CN VII).' },
  { id: 'q10', stem: 'Most common salivary gland tumour overall?', options: ['Mucoepidermoid', 'Pleomorphic adenoma', 'Adenoid cystic', 'Warthin’s'], answer: 1, explanation: 'Pleomorphic adenoma (~60 %).' },
  { id: 'q11', stem: 'Which artery supplies Kiesselbach’s plexus?', options: ['Sphenopalatine', 'Greater palatine', 'Anterior ethmoidal', 'All of the above'], answer: 3, explanation: 'All anastomose to form Little’s area.' },
  { id: 'q12', stem: 'Gold standard test for sleep apnoea severity?', options: ['STOP-BANG', 'Overnight oximetry', 'Polysomnography', 'Epworth score'], answer: 2, explanation: 'Polysomnography measures AHI directly.' },
  { id: 'q13', stem: 'Glottic cancer T1a involves…', options: ['One cord', 'Both cords', 'Supraglottis', 'Subglottis'], answer: 0, explanation: 'Confined to one vocal cord.' },
  { id: 'q14', stem: 'Epistaxis initial first-aid position?', options: ['Supine', 'Head back', 'Sitting forward', 'Left lateral'], answer: 2, explanation: 'Reduces aspiration and venous pressure.' },
  { id: 'q15', stem: 'Primary management of perichondritis?', options: ['Oral ciprofloxacin', 'IV flucloxacillin', 'Topical steroid', 'Needle aspiration'], answer: 0, explanation: 'Anti-pseudomonal coverage is essential.' },
  { id: 'q16', stem: 'Most common site of oesophageal foreign body impaction?', options: ['Cricopharyngeus', 'Aortic arch level', 'Left main bronchus level', 'Lower oesophageal sphincter'], answer: 0, explanation: 'Narrowest point at C6.' },
  { id: 'q17', stem: 'Which imaging for cochlear implant candidacy?', options: ['CT temporal bone', 'MRI IAC', 'PET-CT', 'Plain X-ray'], answer: 0, explanation: 'Evaluates cochlear patency and anomalies.' },
  { id: 'q18', stem: 'Hypoglossal nerve palsy causes tongue deviation…', options: ['To healthy side', 'To affected side', 'Mid-line', 'Depends on severity'], answer: 1, explanation: 'Genioglossus weakness pulls to lesion side.' },
  { id: 'q19', stem: 'Sensorineural hearing loss with café-au-lait spots?', options: ['NF2', 'NF1', 'Usher', 'Pendred'], answer: 0, explanation: 'Neurofibromatosis type 2 (bilateral vestibular schwannomas).' },
  { id: 'q20', stem: 'Inverted papilloma commonly arises from…', options: ['Septum', 'Middle meatus', 'Inferior turbinate', 'Nasopharynx'], answer: 1, explanation: 'Lateral nasal wall in middle meatus.' },
];
