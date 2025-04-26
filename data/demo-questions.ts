export type Question = {
  id: string;
  stem: string;
  options: string[];
  answer: number;       // index of correct option
  explanation: string;
};

export const demoQuestions: Question[] = [
  {
    id: 'q1',
    stem:
      'A 36-year-old man has a subtotal petrosectomy for recurrent cholesteatoma leaving a BC threshold of 50 dB. What is the optimal hearing-rehab option?',
    options: [
      'Conventional hearing aid',
      'Ossiculoplasty',
      'Percutaneous bone-anchored implant',
      'OSIA transcutaneous implant',
      'Bonebridge transcutaneous implant',
    ],
    answer: 4,
    explanation:
      'After subtotal petrosectomy the middle ear is absent, so a fully implantable transcutaneous bone-conduction device such as the Bonebridge is preferred.',
  },
  {
    id: 'q2',
    stem:
      'A patient’s tinnitus is pulsatile but *not* synchronous with the heartbeat. Which diagnosis is most likely?',
    options: [
      'Intracranial hypertension',
      'Atherosclerosis',
      'Arteriovenous malformation',
      'Paraganglioma',
      'Palatal myoclonus',
    ],
    answer: 4,
    explanation:
      'Palatal myoclonus produces muscular clicks that are rhythmic yet independent of cardiac pulse.',
  },
  /* 8 more questions abridged for demo ― same pattern */
  {
    id: 'q3',
    stem: 'Cough during ear-wax microsuction is mediated by which nerve?',
    options: [
      'Trigeminal (auriculotemporal)',
      'Facial',
      'Jacobson’s nerve',
      'Glossopharyngeal',
      'Arnold’s nerve',
    ],
    answer: 4,
    explanation: 'Arnold’s branch of the vagus innervates the posterior canal → “ear-cough reflex”.',
  },
  {
    id: 'q4',
    stem: 'Spiral ganglion axons run through which cochlear structure?',
    options: [
      'Helicotrema',
      'Stria vascularis',
      'Modiolus',
      'Reissner’s membrane',
      'Organ of Corti',
    ],
    answer: 2,
    explanation: 'The modiolus houses both the spiral ganglion cell bodies and the cochlear blood supply.',
  },
  {
    id: 'q5',
    stem:
      'Most important prognostic factor when restoring localisation in an 18-year-old with longstanding unilateral profound deafness is…',
    options: [
      'Daily hours of CROS-aid use',
      'Daily hours of bone-conduction implant use',
      'Duration of deafness',
      'Status of ipsilateral VIII nerve',
      'Status of contralateral VIII nerve',
    ],
    answer: 2,
    explanation: 'The longer the auditory deprivation, the poorer cortical binaural integration becomes.',
  },
  {
    id: 'q6',
    stem:
      'During cholesteatoma surgery you divide the tensor-tympani tendon and expose a structure just medial & superior to its origin. What is that structure?',
    options: [
      'Cog',
      'Supratubal recess',
      'Geniculate ganglion',
      'Oval window',
      'Malleus head',
    ],
    answer: 2,
    explanation: 'Superior to the tensor fold lies the supratubal recess (anterior epitympanum).',
  },
  {
    id: 'q7',
    stem:
      'A 55-year-old with otorrhoea and otalgia despite topical antibiotics; CT shows bony EAC erosion. Which history item most strongly suggests malignant otitis externa?',
    options: [
      'Radiotherapy for nasopharyngeal carcinoma',
      'CT bony erosion',
      'Pseudomonas growth',
      'Diffusion-weighted MRI',
      'Technetium bone scan',
    ],
    answer: 0,
    explanation: 'Previous head-&-neck RT is a recognised predisposing factor for skull-base osteomyelitis.',
  },
  {
    id: 'q8',
    stem: 'Which semicircular canal is most commonly involved in BPPV?',
    options: ['Anterior', 'Posterior', 'Horizontal', 'Superior'],
    answer: 1,
    explanation: '≈90 % of canalithiasis originates in the posterior canal.',
  },
  {
    id: 'q9',
    stem: 'Carhart’s notch at 2 kHz on audiogram suggests…',
    options: ['Otosclerosis', 'Ménière’s disease', 'Acoustic neuroma', 'Ossicular discontinuity'],
    answer: 0,
    explanation: 'A 2 kHz BC dip is characteristic of stapes fixation in otosclerosis.',
  },
  {
    id: 'q10',
    stem: 'Drug causing *both* ototoxicity and nephrotoxicity?',
    options: ['Gentamicin', 'Ciprofloxacin', 'Azithromycin', 'Flucloxacillin'],
    answer: 0,
    explanation: 'Aminoglycosides damage hair cells and renal proximal tubules.',
  },
];
