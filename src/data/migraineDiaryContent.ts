// Migraine diary categories and symptom content

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

export const migraineDiaryCategories: DiaryCategory[] = [
  {
    id: "headache_pain",
    title: "Headache Pain",
    icon: "🤕",
    description: "Track pain location, quality, and intensity in 60 seconds.",
    tag: "pain",
    symptoms: [
      { id: "none", label: "No symptoms experienced" },
      { id: "frontal", label: "Pain in the frontal area (forehead)" },
      { id: "temporal", label: "Pain in the temporal area (sides of head)" },
      { id: "occipital", label: "Pain in the occipital area (back of head)" },
      { id: "one_sided", label: "Pain on one side of the head" },
      { id: "both_sides", label: "Pain on both sides of the head" },
      { id: "throbbing", label: "Throbbing or pulsating pain" },
      { id: "pressing", label: "Pressing or tightening pain" },
      { id: "stabbing", label: "Stabbing or piercing pain" },
      { id: "dull", label: "Dull, aching pain" },
    ],
    worstTimeOptions: ["Morning", "Afternoon", "Evening", "Night", "Random"],
  },
  {
    id: "aura_warning",
    title: "Aura & Warning Signs",
    icon: "⚡",
    description: "Track aura and prodrome symptoms before a migraine.",
    tag: "aura",
    symptoms: [
      { id: "none", label: "No symptoms experienced" },
      { id: "visual_disturbances", label: "I have visual disturbances (flashing lights, zigzag lines, blind spots)" },
      { id: "tingling_head", label: "I have tingling or numbness in my head" },
      { id: "tingling_neck", label: "I have tingling or numbness in my neck" },
      { id: "tingling_eyes", label: "I have tingling or pressure around my eyes" },
      { id: "weakness", label: "I have weakness on one side of my body" },
      { id: "fatigue_achiness", label: "I feel fatigued or achy" },
      { id: "excessive_yawning", label: "I have excessive yawning" },
      { id: "muscle_stiffness", label: "I have muscle stiffness in my neck or shoulders" },
      { id: "irritability", label: "I feel unusually irritable" },
    ],
    safetyTriggers: ["weakness"],
    safetyMessage: "New or sudden weakness on one side may mimic stroke symptoms. Seek immediate medical attention if this is new or severe.",
  },
  {
    id: "triggers",
    title: "Triggers",
    icon: "🎯",
    description: "Identify what may have triggered today's migraine.",
    tag: "triggers",
    symptoms: [
      { id: "none", label: "No identifiable trigger" },
      { id: "stress", label: "Stress" },
      { id: "lack_of_sleep", label: "Lack of sleep" },
      { id: "woke_up_late", label: "Woke up late / overslept" },
      { id: "interrupted_sleep", label: "Interrupted sleep" },
      { id: "depressed_mood", label: "Depressed mood" },
      { id: "anxiety", label: "Anxiety" },
      { id: "skipped_meal", label: "Skipped a meal" },
      { id: "variable_weather", label: "Variable weather or barometric pressure change" },
      { id: "storm", label: "Storm or thunderstorm" },
      { id: "humidity", label: "High humidity" },
      { id: "neck_pain", label: "Neck pain or tension" },
      { id: "hormonal_changes", label: "Hormonal changes (menstrual cycle, oral contraceptives)" },
      { id: "bright_lights", label: "Bright or flickering lights" },
      { id: "strong_odors", label: "Strong odors or perfumes" },
      { id: "alcohol", label: "Alcohol (especially red wine)" },
      { id: "processed_foods", label: "Processed foods or MSG" },
      { id: "chocolate", label: "Chocolate" },
      { id: "cheese", label: "Aged cheese" },
    ],
  },
  {
    id: "associated_symptoms",
    title: "Associated Symptoms",
    icon: "🩺",
    description: "Track symptoms that accompany your migraine.",
    tag: "associated",
    symptoms: [
      { id: "none", label: "No symptoms experienced" },
      { id: "nausea", label: "I feel nauseous" },
      { id: "vomiting", label: "I am vomiting" },
      { id: "light_sensitivity", label: "I am sensitive to light (photophobia)" },
      { id: "sound_sensitivity", label: "I am sensitive to sound (phonophobia)" },
      { id: "odor_sensitivity", label: "I am sensitive to odors (osmophobia)" },
      { id: "dizziness", label: "I feel dizzy or lightheaded" },
      { id: "vision_changes", label: "I have vision changes or blurriness" },
      { id: "difficulty_concentrating", label: "I have difficulty concentrating" },
      { id: "fatigue", label: "I feel fatigued or exhausted" },
      { id: "neck_stiffness", label: "I have neck stiffness" },
    ],
    safetyTriggers: ["vomiting"],
    safetyMessage: "Persistent vomiting during a migraine can lead to dehydration. If you cannot keep fluids down for several hours, contact your clinician.",
  },
  {
    id: "relief_methods",
    title: "Relief Methods",
    icon: "💆",
    description: "Track what helped relieve your migraine.",
    tag: "relief",
    symptoms: [
      { id: "none", label: "Nothing helped" },
      { id: "dark_room_rest", label: "Resting in a dark, quiet room" },
      { id: "sleep", label: "Sleep" },
      { id: "yoga_meditation", label: "Yoga or meditation" },
      { id: "stay_indoor", label: "Staying indoors" },
      { id: "ice_packs", label: "Ice packs on head or neck" },
      { id: "food", label: "Eating food" },
      { id: "caffeine", label: "Caffeine (coffee, tea)" },
      { id: "hot_shower", label: "Hot shower" },
      { id: "cold_shower", label: "Cold shower" },
      { id: "drink_water", label: "Drinking water / hydration" },
      { id: "hot_pad", label: "Hot pad or heating pad" },
      { id: "massage", label: "Massage" },
      { id: "acupressure", label: "Acupressure" },
    ],
  },
  {
    id: "sleep_quality",
    title: "Sleep Quality",
    icon: "😴",
    description: "Track your sleep patterns and quality.",
    tag: "sleep",
    symptoms: [
      { id: "none", label: "No sleep issues" },
      { id: "less_than_5h", label: "I slept less than 5 hours" },
      { id: "5_to_6h", label: "I slept 5-6 hours" },
      { id: "7_to_8h", label: "I slept 7-8 hours (normal)" },
      { id: "more_than_9h", label: "I slept more than 9 hours" },
      { id: "poor_quality", label: "My sleep quality was poor" },
      { id: "difficulty_falling_asleep", label: "I had difficulty falling asleep" },
      { id: "woke_during_night", label: "I woke up during the night" },
      { id: "morning_tiredness", label: "I felt tired upon waking" },
    ],
    worstTimeOptions: ["Bedtime", "Night", "Early morning", "Daytime", "Random"],
  },
  {
    id: "mood_stress",
    title: "Mood & Stress",
    icon: "💭",
    description: "Track mood, anxiety, and stress levels.",
    tag: "mood",
    symptoms: [
      { id: "none", label: "No mood issues" },
      { id: "anxiety_mild", label: "I feel mildly anxious" },
      { id: "anxiety_severe", label: "I feel severely anxious or panicky" },
      { id: "depressed", label: "I feel depressed or low" },
      { id: "irritable", label: "I feel irritable or easily frustrated" },
      { id: "stress_high", label: "My stress level is high" },
      { id: "overwhelmed", label: "I feel overwhelmed" },
      { id: "emotional", label: "I feel unusually emotional or tearful" },
    ],
  },
  // "Attack Log" category removed — headache logging is now a Neura script
  // ("headache-log") accessed via the Home CTA. The legacy LogHeadacheFlow remains
  // available from the Tools hub as a fallback.
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

// Pain intensity scale (0-10) specific to migraine
export const painIntensityOptions = [
  { value: 0, label: "No pain" },
  { value: 1, label: "1 - Barely noticeable" },
  { value: 2, label: "2 - Minor" },
  { value: 3, label: "3 - Mild" },
  { value: 4, label: "4 - Moderate" },
  { value: 5, label: "5 - Distracting" },
  { value: 6, label: "6 - Hard to ignore" },
  { value: 7, label: "7 - Severe" },
  { value: 8, label: "8 - Very severe" },
  { value: 9, label: "9 - Excruciating" },
  { value: 10, label: "10 - Worst possible" },
];

export const getMigraineDiaryById = (id: string): DiaryCategory | undefined => {
  return migraineDiaryCategories.find((d) => d.id === id);
};
