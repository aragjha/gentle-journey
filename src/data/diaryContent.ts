// Diary categories and symptom content from Well-Being Map

export interface DiarySymptom {
  id: string;
  label: string;
}

export interface DiaryCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  tag: string;
  symptoms: DiarySymptom[];
  worstTimeOptions?: string[];
  safetyTriggers?: string[]; // symptom IDs that trigger safety prompts
  safetyMessage?: string;
}

export const diaryCategories: DiaryCategory[] = [
  {
    id: "sleep",
    title: "Sleep",
    icon: "😴",
    description: "Track sleep and daytime energy in 60 seconds.",
    tag: "sleep",
    symptoms: [
      { id: "none", label: "No symptoms experienced" },
      { id: "restless", label: "I have restless sleep" },
      { id: "falling_asleep", label: "I have difficulty falling asleep at night" },
      { id: "staying_asleep", label: "I have difficulty staying asleep" },
      { id: "back_to_sleep", label: "I have difficulty getting back to sleep once awake" },
      { id: "morning_tiredness", label: "I have morning tiredness" },
      { id: "fatigue", label: "I have fatigue during the day" },
      { id: "doze_off", label: "I frequently doze off at inappropriate moments" },
    ],
    worstTimeOptions: ["Bedtime", "Night", "Early morning", "Daytime", "Random"],
  },
  {
    id: "attention_memory",
    title: "Attention & Memory",
    icon: "🧠",
    description: "Quick check-in on attention and memory.",
    tag: "cognition",
    symptoms: [
      { id: "none", label: "No symptoms experienced" },
      { id: "train_of_thought", label: "I lose my train of thought during conversations" },
      { id: "concentrate", label: "I am unable to concentrate during activities" },
      { id: "slowness_speech", label: "I have slowness of speech" },
      { id: "forgetful", label: "I am forgetful" },
      { id: "remembering", label: "I have difficulty remembering names, numbers, events" },
    ],
  },
  {
    id: "digestion",
    title: "Digestion & Gut",
    icon: "🥗",
    description: "Track swallowing, nausea, and bowel changes.",
    tag: "gut",
    symptoms: [
      { id: "none", label: "No symptoms experienced" },
      { id: "swallowing", label: "I have difficulty swallowing" },
      { id: "drooling", label: "I am dribbling/drooling (a lot of saliva)" },
      { id: "nausea", label: "I have bouts of vomiting or feeling sick (nausea)" },
      { id: "constipation", label: "I have constipation" },
      { id: "diarrhoea", label: "I have diarrhoea" },
      { id: "upset_stomach", label: "I have an upset stomach" },
    ],
    safetyTriggers: ["swallowing", "nausea"],
    safetyMessage: "If swallowing or vomiting is new or worsening, tell your clinician.",
  },
  {
    id: "movement",
    title: "Movement",
    icon: "🏃",
    description: "Track tremor, stiffness, freezing, balance.",
    tag: "movement",
    symptoms: [
      { id: "none", label: "No symptoms experienced" },
      { id: "freezing", label: "My feet feel stuck to the floor / I have trouble starting to move" },
      { id: "morning_stiffness", label: "My movements feel stiff (Rigidity) predominantly in the early morning after waking-up" },
      { id: "stiffness_day", label: "I have stiffness (Rigidity) throughout the day" },
      { id: "tremor", label: "I have shaking (Tremor)" },
      { id: "bradykinesia", label: "I have slowness of movement (Bradykinesia)" },
      { id: "decreased_movement", label: "I have decreased ability to move at some times during the day" },
      { id: "dyskinesias", label: "I have involuntary movements (Dyskinesias)" },
      { id: "balance", label: "I lose my balance" },
      { id: "falls", label: "I fall over" },
      { id: "leaning", label: "I lean towards or to the side" },
      { id: "talking", label: "I have trouble talking" },
      { id: "micrographia", label: "I have small handwriting (Micrographia)" },
    ],
    worstTimeOptions: ["Morning", "Mid-day", "Evening", "Night", "Random"],
    safetyTriggers: ["falls", "balance"],
    safetyMessage: "Falls risk flagged. Track where/when it happened. Ask about balance/PT and home safety.",
  },
  {
    id: "pain",
    title: "Pain",
    icon: "🩹",
    description: "Track cramps, stiffness pain, headaches.",
    tag: "pain",
    symptoms: [
      { id: "none", label: "No symptoms experienced" },
      { id: "dystonia", label: "I have early morning painful cramps (dystonia) affecting toes, fingers ankles, wrists causing me to wake up" },
      { id: "stiff_day", label: "I have painful, stiff limbs during the day" },
      { id: "stiff_night", label: "I have painful, stiff limbs at night" },
      { id: "shooting_pain", label: "I have shock-like shooting pain down my limbs" },
      { id: "dyskinesia_pain", label: "I have pain with abnormal involuntary movements (Dyskinesia)" },
      { id: "headaches", label: "I have severe headaches" },
    ],
  },
  {
    id: "bladder",
    title: "Bladder & Sexual",
    icon: "💧",
    description: "Track urgency, nighttime urination, sexual changes.",
    tag: "bladder",
    symptoms: [
      { id: "none", label: "No symptoms experienced" },
      { id: "urge", label: "I feel the urge to pass urine" },
      { id: "night_urination", label: "I get up at night to pass urine" },
      { id: "interest_sex", label: "I have an altered interest in sex" },
      { id: "difficulty_sex", label: "I have difficulty having sex" },
    ],
  },
  {
    id: "nonmotor",
    title: "Other Non-Motor",
    icon: "📋",
    description: "Quick check-in on dizziness, sweating, smell, hallucinations.",
    tag: "nms",
    symptoms: [
      { id: "none", label: "No symptoms experienced" },
      { id: "dizzy", label: "I feel light-headed/dizzy when standing from a lying position" },
      { id: "fainting", label: "I fall due to fainting/blackouts" },
      { id: "smell_taste", label: "I notice a change in my ability to smell/taste" },
      { id: "weight", label: "I notice a change in weight (not due to change in diet)" },
      { id: "sweating", label: "I have excessive sweating" },
      { id: "hallucinations", label: "I see/hear things that are not there" },
    ],
    safetyTriggers: ["hallucinations"],
    safetyMessage: "Hallucinations flagged. Tell your clinician promptly. Medication changes may help.",
  },
  {
    id: "mood",
    title: "Mood",
    icon: "💭",
    description: "Track low mood, anxiety, loss of interest.",
    tag: "mood",
    symptoms: [
      { id: "none", label: "No symptoms experienced" },
      { id: "loss_interest", label: "I feel a loss of interest" },
      { id: "lack_pleasure", label: "I lack pleasure from things I used to enjoy" },
      { id: "unhappy", label: "I feel unhappy" },
      { id: "anxious", label: "I am anxious, frightened or panicky" },
      { id: "depressed", label: "I am depressed" },
    ],
  },
];

// Frequency scale (0-4)
export const frequencyOptions = [
  { value: 0, label: "Never" },
  { value: 1, label: "Occasionally" },
  { value: 2, label: "Sometimes" },
  { value: 3, label: "Often" },
  { value: 4, label: "Always" },
];

// Impact scale (0-4)
export const impactOptions = [
  { value: 0, label: "None" },
  { value: 1, label: "Mild" },
  { value: 2, label: "Medium" },
  { value: 3, label: "High" },
  { value: 4, label: "Very high" },
];

export const getDiaryById = (id: string): DiaryCategory | undefined => {
  return diaryCategories.find((d) => d.id === id);
};
