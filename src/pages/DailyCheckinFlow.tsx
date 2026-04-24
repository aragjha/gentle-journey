import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OnboardingQuestion from "@/components/OnboardingQuestion";
import GratificationScreen from "@/components/GratificationScreen";
import { Diagnosis } from "@/components/OnboardingFlow";
import { CheckInLog, HeadacheLog } from "@/types/logs";

const pdCheckInQuestions = [
  {
    id: "overall",
    title: "How are you feeling overall today?",
    helper: "Take a moment to reflect.",
    type: "slider" as const,
    options: [],
  },
  {
    id: "main_area",
    title: "What area bothered you most today?",
    helper: "Pick ONE that stood out.",
    type: "single" as const,
    options: [
      { id: "movement", label: "Movement & tremors", icon: "🏃" },
      { id: "sleep", label: "Sleep issues", icon: "😴" },
      { id: "mood", label: "Mood & motivation", icon: "💭" },
      { id: "pain", label: "Pain or discomfort", icon: "🩹" },
      { id: "none", label: "Nothing major", icon: "✨" },
    ],
  },
  {
    id: "symptoms",
    title: "Which symptoms did you notice?",
    helper: "Select all that apply.",
    type: "multi" as const,
    options: [
      { id: "tremor", label: "Tremor", icon: "🫨" },
      { id: "stiffness", label: "Stiffness", icon: "🦴" },
      { id: "slowness", label: "Slowness", icon: "🐢" },
      { id: "balance", label: "Balance issues", icon: "⚖️" },
      { id: "fatigue", label: "Fatigue", icon: "😓" },
      { id: "none", label: "None today", icon: "🎉" },
    ],
  },
  {
    id: "troublesome",
    title: "Which was most troublesome?",
    helper: "Pick the biggest one.",
    type: "single" as const,
    options: [
      { id: "tremor", label: "Tremor", icon: "🫨" },
      { id: "stiffness", label: "Stiffness", icon: "🦴" },
      { id: "slowness", label: "Slowness", icon: "🐢" },
      { id: "balance", label: "Balance issues", icon: "⚖️" },
      { id: "fatigue", label: "Fatigue", icon: "😓" },
    ],
  },
  {
    id: "frequency",
    title: "How often did you notice symptoms?",
    type: "single" as const,
    options: [
      { id: "0", label: "Not at all", icon: "0️⃣" },
      { id: "1", label: "Once or twice", icon: "1️⃣" },
      { id: "2", label: "A few times", icon: "2️⃣" },
      { id: "3", label: "Often", icon: "3️⃣" },
      { id: "4", label: "Most of the day", icon: "4️⃣" },
    ],
  },
  {
    id: "safety",
    title: "Any safety concerns today?",
    helper: "Falls, fainting, or choking.",
    type: "single" as const,
    options: [
      { id: "no", label: "No, I'm fine", icon: "✅" },
      { id: "fall", label: "I had a fall", icon: "⚠️" },
      { id: "near_fall", label: "Almost fell", icon: "😰" },
      { id: "other", label: "Other concern", icon: "📝" },
    ],
  },
];

const migraineCheckInQuestions = [
  {
    id: "overall",
    title: "How are you feeling overall today?",
    helper: "Take a moment to reflect.",
    type: "slider" as const,
    options: [],
  },
  {
    id: "headache_today",
    title: "Did you have a headache today?",
    helper: "Any head pain counts. Pick the level that best fits.",
    type: "single" as const,
    options: [
      { id: "no", label: "No headache", icon: "✨" },
      { id: "mild", label: "Mild (1-3) — noticeable, doesn't stop daily tasks", icon: "😐" },
      { id: "moderate", label: "Moderate (4-6) — interferes with daily activities", icon: "😣" },
      { id: "severe", label: "Severe (7-10) — had to stop, lie down, or miss plans", icon: "😫" },
    ],
  },
  {
    id: "pain_location",
    title: "Where was the pain?",
    helper: "Pick a side if it was only on one. Select all that apply.",
    type: "multi" as const,
    options: [
      { id: "forehead", label: "Forehead", icon: "🔝" },
      { id: "temples", label: "Temples", icon: "↔️" },
      { id: "behind_eyes", label: "Behind eyes", icon: "👁️" },
      { id: "left_side", label: "Left side only (unilateral)", icon: "⬅️" },
      { id: "right_side", label: "Right side only (unilateral)", icon: "➡️" },
      { id: "both_sides", label: "Both sides (bilateral)", icon: "↔️" },
      { id: "neck", label: "Neck / base of skull", icon: "🦴" },
    ],
  },
  {
    id: "symptoms",
    title: "Any associated symptoms?",
    helper: "Select all that apply.",
    type: "multi" as const,
    options: [
      { id: "nausea", label: "Nausea", icon: "🤢" },
      { id: "light_sensitivity", label: "Light sensitivity", icon: "💡" },
      { id: "sound_sensitivity", label: "Sound sensitivity", icon: "🔊" },
      { id: "dizziness", label: "Dizziness", icon: "💫" },
      { id: "fatigue", label: "Fatigue", icon: "😓" },
      { id: "none", label: "None", icon: "🎉" },
    ],
  },
  {
    id: "triggers",
    title: "Any triggers you noticed?",
    helper: "Select all that apply.",
    type: "multi" as const,
    options: [
      { id: "stress", label: "Stress", icon: "😰" },
      { id: "poor_sleep", label: "Poor sleep", icon: "😴" },
      { id: "skipped_meal", label: "Skipped meal", icon: "🍽️" },
      { id: "weather", label: "Weather change", icon: "🌦️" },
      { id: "screen_time", label: "Screen time", icon: "📱" },
      { id: "unknown", label: "Not sure", icon: "❓" },
    ],
  },
  {
    id: "medication_taken",
    title: "Did you take medication today?",
    helper: "We'll skip follow-up questions if you didn't take any.",
    type: "single" as const,
    options: [
      { id: "yes_helped", label: "Yes — it helped (complete or significant relief)", icon: "✅" },
      { id: "yes_partial", label: "Yes — partial relief", icon: "🟡" },
      { id: "yes_no_help", label: "Yes — didn't help", icon: "😕" },
      { id: "no", label: "No medication taken", icon: "❌" },
    ],
  },
  {
    id: "disability",
    title: "How did headaches affect your day?",
    helper: "Based on the MIDAS disability scale. Pick what best describes today.",
    type: "single" as const,
    options: [
      { id: "0", label: "0 — No effect on activities", icon: "0️⃣" },
      { id: "1", label: "1 — Could manage, with some difficulty", icon: "1️⃣" },
      { id: "2", label: "2 — Had difficulty, cancelled some plans", icon: "2️⃣" },
      { id: "3", label: "3 — Missed work or had to stay in bed", icon: "3️⃣" },
    ],
  },
];

interface DailyCheckinFlowProps {
  onComplete: (log: CheckInLog) => void;
  onBack: () => void;
  diagnosis?: Diagnosis | null;
  attackLogs?: HeadacheLog[];
  onUpdateAttackNote?: (attackId: string, note: string) => void;
}

const DailyCheckinFlow = ({ onComplete, onBack, diagnosis }: DailyCheckinFlowProps) => {
  const checkInQuestions = diagnosis === "migraine" ? migraineCheckInQuestions : pdCheckInQuestions;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showGratification, setShowGratification] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string[] | number>>({});
  const [completedLog, setCompletedLog] = useState<CheckInLog | null>(null);
  const autoAdvanceTimer = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = checkInQuestions[currentQuestionIndex];

  useEffect(() => {
    return () => {
      if (autoAdvanceTimer.current) {
        clearTimeout(autoAdvanceTimer.current);
      }
    };
  }, []);

  const handleSelect = (id: string) => {
    if (!currentQuestion) return;

    if (currentQuestion.type === "multi") {
      const current = (answers[currentQuestion.id] as string[]) || [];
      if (current.includes(id)) {
        setAnswers({ ...answers, [currentQuestion.id]: current.filter((v) => v !== id) });
      } else {
        setAnswers({ ...answers, [currentQuestion.id]: [...current, id] });
      }
    } else {
      setAnswers({ ...answers, [currentQuestion.id]: [id] });
      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
      autoAdvanceTimer.current = setTimeout(() => {
        handleContinue();
      }, 300);
    }
  };

  const handleSliderChange = (value: number) => {
    if (!currentQuestion) return;
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const handleContinue = () => {
    if (currentQuestionIndex >= checkInQuestions.length - 1) {
      const ans = answers;
      const log: CheckInLog = {
        id: crypto.randomUUID(),
        date: new Date().toISOString().split("T")[0],
        feeling: typeof ans.overall === "number" ? ans.overall : 5,
        hadHeadache: (ans.headache_today as string[])?.[0] !== "no",
        headacheSeverity: (ans.headache_today as string[])?.[0],
        medicationTaken: (ans.medication_taken as string[])?.[0],
        disability: parseInt((ans.disability as string[])?.[0] ?? "0", 10),
        painLocations: (ans.pain_location as string[]) ?? [],
        symptoms: (ans.symptoms as string[]) ?? [],
        triggers: (ans.triggers as string[]) ?? [],
      };
      setCompletedLog(log);
      setShowGratification(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const canContinue = () => {
    if (!currentQuestion) return false;
    if (currentQuestion.type === "slider") return true;
    const answer = answers[currentQuestion.id];
    return Array.isArray(answer) && answer.length > 0;
  };

  if (showGratification) {
    return (
      <GratificationScreen
        title="Check-in complete! 🎉"
        subtitle={diagnosis === "migraine"
          ? "Tracking your migraines helps find patterns."
          : "You're building healthy habits every day."}
        onContinue={() => onComplete(completedLog!)}
        type="celebration"
        ctaText="Back to Home"
      />
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.25 }}
      >
        <OnboardingQuestion
          progress={currentQuestionIndex + 1}
          totalSteps={checkInQuestions.length}
          title={currentQuestion.title}
          helper={currentQuestion.helper}
          questionType={currentQuestion.type}
          options={currentQuestion.options}
          selectedValues={(answers[currentQuestion.id] as string[]) || []}
          sliderValue={typeof answers[currentQuestion.id] === "number" ? answers[currentQuestion.id] as number : 5}
          onSelect={handleSelect}
          onSliderChange={handleSliderChange}
          onContinue={handleContinue}
          canContinue={canContinue()}
          showBackButton
          onBack={onBack}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default DailyCheckinFlow;
