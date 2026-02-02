// Shared lesson content for Journey Maps and Daily Regime
// This maps the 4-week progression to specific lessons

export interface LessonNode {
  id: string;
  title: string;
  stage: string;
  status: "done" | "current" | "locked";
  description?: string;
  videoTitle?: string;
  aboutStation?: string;
  actionToTake?: string;
  neuroQueryPrompts?: string[];
  questionsForTeam?: string[];
  additionalResources?: string[];
  // Daily regime mapping
  weekNumber?: number;
  dayInWeek?: number;
}

// All lessons in the journey map
export const allLessons: LessonNode[] = [
  // Week 1: Baseline habits - Diagnosis basics
  {
    id: "1",
    title: "Recognize Possible Symptoms",
    stage: "Diagnosis",
    status: "done",
    weekNumber: 1,
    dayInWeek: 1,
    description: "Identifying early motor and non-motor signs that may suggest Parkinson's disease.",
    videoTitle: "What is Parkinson's Disease? (Michael J. Fox Foundation)",
    aboutStation: "Parkinson's disease often starts slowly. Key motor signs include resting tremor, muscular rigidity, bradykinesia (slowness of movement) and postural instability. Non-motor symptoms such as loss of smell, constipation, depression or REM-sleep behaviour disorder may also precede motor symptoms.",
    actionToTake: "Keep a symptom diary noting tremors, stiffness, changes in handwriting, slowness or non-motor problems. Discuss concerns with a trusted family member. If symptoms persist or interfere with daily activities, proceed to seek medical evaluation.",
    neuroQueryPrompts: [
      "Are my tremors only when I'm stressed or also at rest?",
      "Do I have trouble writing or buttoning shirts compared with a year ago?",
      "Am I experiencing other changes (constipation, depression, loss of smell) that might be related?",
    ],
    questionsForTeam: [
      "What symptoms are typical of early PD?",
      "Could my medicines be causing these symptoms?",
      "What lifestyle changes might help while we wait for evaluation?",
    ],
    additionalResources: [
      "National Institute of Neurological Disorders and Stroke (NINDS) PD overview",
      "Family Caregiver Alliance article on prodromal and stage I PD",
    ],
  },
  {
    id: "2",
    title: "Non-Motor Symptoms",
    stage: "Diagnosis",
    status: "done",
    weekNumber: 1,
    dayInWeek: 2,
    description: "Understanding early non-motor signs that often precede motor symptoms.",
    videoTitle: "Non-motor Symptoms of Parkinson's Disease",
    aboutStation: "Non-motor symptoms such as anosmia (loss of smell), constipation, fatigue, anxiety, depression, and REM sleep behaviour disorder may appear years before motor symptoms. Recognising them can prompt earlier evaluation.",
    actionToTake: "If you or your loved one have unexplained constipation, mood changes or acting out dreams, discuss these symptoms with your doctor. Keep a list to bring to the evaluation.",
    neuroQueryPrompts: [
      "Have I noticed a reduced sense of smell over the past few years?",
      "Do I act out my dreams or flail at night?",
      "Are there sudden drops in blood pressure causing dizziness?",
    ],
    questionsForTeam: [
      "Could these non-motor symptoms be related to Parkinson's or another condition?",
      "Are there treatments to improve sleep and bowel function?",
      "Should I see a sleep specialist or gastroenterologist?",
    ],
    additionalResources: [
      "Parkinson's Foundation information on non-motor symptoms",
    ],
  },
  {
    id: "3",
    title: "Seek Medical Evaluation",
    stage: "Diagnosis",
    status: "current",
    weekNumber: 1,
    dayInWeek: 3,
    description: "Contact a health professional to discuss symptoms and obtain referrals.",
    videoTitle: "Diagnosis of Parkinson's Disease (Froedtert & MCW Health Network)",
    aboutStation: "In most health systems, you start with a primary care provider. Your GP will review medical history, medication list and perform a neurological exam. They may order blood tests or imaging to exclude other causes and then refer you to a neurologist.",
    actionToTake: "Prepare a list of all medications and supplements (some can cause drug-induced parkinsonism). Bring your symptom diary. Ask for referral to a neurologist or movement disorder specialist.",
    neuroQueryPrompts: [
      "Are my current medications contributing to my symptoms?",
      "What tests can rule out other conditions?",
      "What should I expect from a neurologist visit?",
    ],
    questionsForTeam: [
      "What should I expect from a neurologist visit?",
      "Do I need any imaging before seeing the specialist?",
      "How long is the wait time for a specialist appointment?",
    ],
    additionalResources: [
      "Specialist Link or local health service Parkinson's primary care pathway",
      "Parkinson's Foundation helpline for referrals",
    ],
  },
  {
    id: "4",
    title: "Neurologist Evaluation",
    stage: "Diagnosis",
    status: "locked",
    weekNumber: 1,
    dayInWeek: 4,
    description: "Comprehensive neurological examination and confirmation of Parkinson's disease.",
    videoTitle: "Stanford Medicine 25: Parkinson's Disease Physical Exam",
    aboutStation: "Diagnosis of PD is clinical; there is no single definitive test. The neurologist will take a detailed history, perform a neurological exam, and may order tests to exclude other disorders.",
    actionToTake: "Answer questions about symptom onset, progression and family history. Bring a family member for second-hand observations. Ask about the diagnosis and prognosis.",
    neuroQueryPrompts: [
      "What criteria are used to diagnose PD?",
      "Do I need a DaTSCAN or other imaging?",
      "Should genetic testing be considered?",
    ],
    questionsForTeam: [
      "How certain are you of the diagnosis?",
      "What symptoms should prompt immediate contact?",
      "When should I schedule follow-up visits?",
    ],
    additionalResources: [
      "NINDS description of PD diagnosis and tests",
      "NICE guideline on confirming PD and annual review by specialists",
    ],
  },
  // Week 2: Sleep/Mood - Treatment introduction
  {
    id: "5",
    title: "First-Line Treatment",
    stage: "Treatment",
    status: "locked",
    weekNumber: 2,
    dayInWeek: 1,
    description: "Initiate medication to control motor symptoms and improve quality of life.",
    videoTitle: "Medication Treatments for Parkinson's Disease (Parkinson's Foundation)",
    aboutStation: "Once PD is diagnosed and symptoms impact quality of life, pharmacological therapy is recommended. Medications replenish or mimic dopamine to improve movement. Levodopa is the most effective; dopamine agonists and MAO-B inhibitors may be used alone in early disease or added later.",
    actionToTake: "Discuss medication options, benefits and side effects with your specialist. Start with the lowest effective dose and monitor response. Keep a log of symptom improvements and adverse effects.",
    neuroQueryPrompts: [
      "What are the common side effects of levodopa?",
      "How do dopamine agonists differ from levodopa?",
      "What lifestyle changes complement medication?",
    ],
    questionsForTeam: [
      "Which medication is best for my symptoms?",
      "How long before I notice improvement?",
      "What side effects should I watch for?",
    ],
    additionalResources: [
      "Parkinson's Foundation medication guide",
      "NICE guidelines on pharmacological treatment",
    ],
  },
  {
    id: "6",
    title: "Managing Side Effects",
    stage: "Treatment",
    status: "locked",
    weekNumber: 2,
    dayInWeek: 2,
    description: "Strategies to handle medication side effects and motor fluctuations.",
    videoTitle: "Managing Dyskinesia and Motor Fluctuations",
    aboutStation: "Over time, you may experience motor fluctuations (wearing off) or dyskinesia. Working with your care team to adjust timing, doses or add medications can help manage these challenges.",
    actionToTake: "Keep a detailed diary of when symptoms worsen and when medications are taken. Report any new movements or 'off' periods to your neurologist promptly.",
    neuroQueryPrompts: [
      "Why do my medications seem to wear off before the next dose?",
      "What is dyskinesia and how is it managed?",
      "Should I take my medication with or without food?",
    ],
    questionsForTeam: [
      "How can we adjust my medication timing?",
      "Are there additional medications to smooth out fluctuations?",
      "When should I consider advanced therapies?",
    ],
    additionalResources: [
      "Parkinson's Foundation guide on motor fluctuations",
    ],
  },
  // Week 3: ON/OFF awareness - Advanced treatment
  {
    id: "7",
    title: "Understanding ON/OFF States",
    stage: "Treatment",
    status: "locked",
    weekNumber: 3,
    dayInWeek: 1,
    description: "Learn to recognize and track your medication response patterns.",
    videoTitle: "ON and OFF Times in Parkinson's",
    aboutStation: "As PD progresses, you may notice times when medications work well (ON) and times when they wear off (OFF). Understanding these patterns helps optimize your treatment.",
    actionToTake: "Use a simple diary to track ON and OFF times throughout the day. Note what you were doing, when you took medication, and how you felt.",
    neuroQueryPrompts: [
      "How do I know if I'm in an ON or OFF state?",
      "What triggers my OFF periods?",
      "Can I predict when my medication will wear off?",
    ],
    questionsForTeam: [
      "How can I reduce my OFF time?",
      "Should I adjust when I take my medication?",
      "Are there rescue medications for sudden OFF periods?",
    ],
    additionalResources: [
      "Parkinson's Foundation ON/OFF tracking tools",
    ],
  },
  // Week 4: Care planning - Living well
  {
    id: "8",
    title: "Daily Routines",
    stage: "Living",
    status: "locked",
    weekNumber: 4,
    dayInWeek: 1,
    description: "Building structured daily habits to manage symptoms effectively.",
    videoTitle: "Living Well with Parkinson's: Daily Tips",
    aboutStation: "Establishing consistent routines for medication timing, meals, exercise and sleep can improve symptom control and overall wellbeing. Small adaptations at home can maintain independence longer.",
    actionToTake: "Create a daily schedule that includes medication times, exercise, meals and rest. Use timers or apps to remind you of medication doses. Adapt your home environment for safety.",
    neuroQueryPrompts: [
      "How can I remember to take my medications on time?",
      "What home modifications help with mobility?",
      "How do I maintain energy throughout the day?",
    ],
    questionsForTeam: [
      "What daily routine do you recommend?",
      "Should I see an occupational therapist?",
      "Are there devices that can help with daily tasks?",
    ],
    additionalResources: [
      "Parkinson's Foundation tips for daily living",
      "Occupational therapy resources for PD",
    ],
  },
  {
    id: "9",
    title: "Exercise & Movement",
    stage: "Living",
    status: "locked",
    weekNumber: 4,
    dayInWeek: 2,
    description: "The importance of physical activity in managing Parkinson's symptoms.",
    videoTitle: "Exercise and Parkinson's: What the Research Shows",
    aboutStation: "Regular exercise has been shown to improve balance, flexibility, strength and mood. Activities like walking, cycling, swimming, tai chi and dance are particularly beneficial for people with PD.",
    actionToTake: "Aim for at least 150 minutes of moderate exercise per week. Consider joining a PD-specific exercise class. Work with a physiotherapist to develop a safe exercise plan.",
    neuroQueryPrompts: [
      "What types of exercise are best for Parkinson's?",
      "How do I stay motivated to exercise regularly?",
      "Can exercise slow the progression of PD?",
    ],
    questionsForTeam: [
      "What exercise program do you recommend for my stage?",
      "Should I see a physiotherapist?",
      "Are there local PD exercise groups?",
    ],
    additionalResources: [
      "Parkinson's Foundation exercise recommendations",
      "Research on exercise and neuroprotection in PD",
    ],
  },
  {
    id: "10",
    title: "Building Your Care Team",
    stage: "Living",
    status: "locked",
    weekNumber: 4,
    dayInWeek: 3,
    description: "Assembling the right specialists and support network for your journey.",
    videoTitle: "Your Parkinson's Care Team",
    aboutStation: "A comprehensive care team may include a neurologist, movement disorder specialist, physiotherapist, occupational therapist, speech therapist, and mental health support. Family and caregiver involvement is also crucial.",
    actionToTake: "Make a list of your current healthcare providers. Identify any gaps in your care team. Ask your neurologist for referrals to other specialists as needed.",
    neuroQueryPrompts: [
      "Who should be on my care team?",
      "How often should I see each specialist?",
      "How do I coordinate between different providers?",
    ],
    questionsForTeam: [
      "Do I need to see any additional specialists?",
      "How do I find a movement disorder specialist?",
      "What support groups are available locally?",
    ],
    additionalResources: [
      "Parkinson's Foundation care team guide",
      "Tips for caregiver support",
    ],
  },
];

// Get the current lesson (first one with status "current")
export const getCurrentLesson = (): LessonNode | undefined => {
  return allLessons.find((lesson) => lesson.status === "current");
};

// Get today's lesson based on current progress
export const getTodaysLesson = (): LessonNode => {
  const current = getCurrentLesson();
  return current || allLessons[0];
};

// Get lessons by stage
export const getLessonsByStage = (stage: string): LessonNode[] => {
  return allLessons.filter((lesson) => lesson.stage === stage);
};

// Get all stages
export const stages = ["Diagnosis", "Treatment", "Living"];
