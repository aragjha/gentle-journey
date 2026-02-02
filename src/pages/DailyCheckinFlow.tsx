import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OnboardingQuestion from "@/components/OnboardingQuestion";
import GratificationScreen from "@/components/GratificationScreen";

const checkInQuestions = [
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

interface DailyCheckinFlowProps {
  onComplete: () => void;
  onBack: () => void;
}

const DailyCheckinFlow = ({ onComplete, onBack }: DailyCheckinFlowProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showGratification, setShowGratification] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string[] | number>>({});

  const currentQuestion = checkInQuestions[currentQuestionIndex];

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
    }
  };

  const handleSliderChange = (value: number) => {
    if (!currentQuestion) return;
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const handleContinue = () => {
    if (currentQuestionIndex >= checkInQuestions.length - 1) {
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
        subtitle="You're building healthy habits every day."
        xpEarned={25}
        onContinue={onComplete}
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
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default DailyCheckinFlow;
