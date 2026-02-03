import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SplashScreen from "@/components/SplashScreen";
import OnboardingQuestion from "@/components/OnboardingQuestion";
import GratificationScreen from "@/components/GratificationScreen";

// Onboarding questions organized by phase
const onboardingPhases = [
  {
    phase: "A",
    questions: [
      {
        id: "role",
        title: "Who are you?",
        helper: "This helps us personalize your experience.",
        type: "single" as const,
        options: [
          { id: "patient", label: "I am the patient", icon: "🙋" },
          { id: "caregiver", label: "I'm a caregiver", icon: "💝" },
          { id: "both", label: "Both", icon: "🤝" },
        ],
      },
      {
        id: "stage",
        title: "Where are you in your journey?",
        helper: "Choose what feels closest.",
        type: "single" as const,
        options: [
          { id: "newly", label: "Newly diagnosed", icon: "🌱" },
          { id: "few_years", label: "Living with PD for a few years", icon: "🌿" },
          { id: "long_time", label: "Long-time warrior", icon: "🌳" },
          { id: "unsure", label: "Not sure yet", icon: "❓" },
        ],
      },
    ],
  },
  {
    phase: "B",
    questions: [
      {
        id: "main_concern",
        title: "What concerns you most right now?",
        helper: "Pick the biggest one.",
        type: "single" as const,
        options: [
          { id: "movement", label: "Movement & tremors", icon: "🏃" },
          { id: "sleep", label: "Sleep problems", icon: "😴" },
          { id: "mood", label: "Mood & motivation", icon: "💭" },
          { id: "memory", label: "Memory & focus", icon: "🧠" },
          { id: "other", label: "Something else", icon: "📝" },
        ],
      },
      {
        id: "energy_level",
        title: "How's your energy today?",
        type: "slider" as const,
        options: [],
      },
    ],
  },
  {
    phase: "C",
    questions: [
      {
        id: "medications",
        title: "Are you currently taking PD medications?",
        type: "single" as const,
        options: [
          { id: "yes", label: "Yes", icon: "💊" },
          { id: "no", label: "Not yet", icon: "⏳" },
          { id: "unsure", label: "I'm not sure", icon: "🤔" },
        ],
      },
      {
        id: "tracking_goal",
        title: "What would you like to track?",
        helper: "Select all that apply.",
        type: "multi" as const,
        options: [
          { id: "symptoms", label: "Daily symptoms", icon: "📊" },
          { id: "medications", label: "Medications", icon: "💊" },
          { id: "mood", label: "Mood changes", icon: "🎭" },
          { id: "sleep", label: "Sleep quality", icon: "🌙" },
          { id: "exercise", label: "Exercise & movement", icon: "🏃" },
        ],
      },
    ],
  },
  {
    phase: "D",
    questions: [
      {
        id: "reminder_time",
        title: "When should we remind you?",
        helper: "For your daily check-in.",
        type: "single" as const,
        options: [
          { id: "morning", label: "Morning (8-10am)", icon: "🌅" },
          { id: "midday", label: "Midday (12-2pm)", icon: "☀️" },
          { id: "evening", label: "Evening (6-8pm)", icon: "🌆" },
          { id: "none", label: "No reminders", icon: "🔕" },
        ],
      },
      {
        id: "share_data",
        title: "Share progress with a caregiver?",
        helper: "They'll see summaries, not raw data.",
        type: "single" as const,
        options: [
          { id: "yes", label: "Yes, I'd like that", icon: "👥" },
          { id: "later", label: "Maybe later", icon: "⏰" },
          { id: "no", label: "No, keep it private", icon: "🔒" },
        ],
      },
    ],
  },
  {
    phase: "E",
    questions: [
      {
        id: "daily_time",
        title: "How much time can you spend daily?",
        type: "single" as const,
        options: [
          { id: "2min", label: "2-3 minutes", icon: "⚡" },
          { id: "5min", label: "5-10 minutes", icon: "🕐" },
          { id: "15min", label: "15+ minutes", icon: "🕑" },
        ],
      },
      {
        id: "motivation",
        title: "What motivates you most?",
        type: "single" as const,
        options: [
          { id: "consistency", label: "Staying consistent", icon: "📅" },
          { id: "progress", label: "Seeing my progress", icon: "📈" },
          { id: "learning", label: "Learning new things", icon: "📚" },
          { id: "community", label: "Helping others", icon: "🤝" },
        ],
      },
    ],
  },
];

interface OnboardingFlowProps {
  onComplete: () => void;
  onSkip?: () => void;
}

const OnboardingFlow = ({ onComplete, onSkip }: OnboardingFlowProps) => {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showGratification, setShowGratification] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string[] | number>>({});

  const currentPhase = onboardingPhases[currentPhaseIndex];
  const currentQuestion = currentPhase?.questions[currentQuestionIndex];

  // Calculate total progress
  const totalQuestions = onboardingPhases.reduce((sum, phase) => sum + phase.questions.length, 0);
  const completedQuestions = onboardingPhases
    .slice(0, currentPhaseIndex)
    .reduce((sum, phase) => sum + phase.questions.length, 0) + currentQuestionIndex;

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
    const isLastQuestionInPhase = currentQuestionIndex >= currentPhase.questions.length - 1;
    const isLastPhase = currentPhaseIndex >= onboardingPhases.length - 1;

    if (isLastQuestionInPhase) {
      if (isLastPhase) {
        onComplete();
      } else {
        setShowGratification(true);
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleGratificationContinue = () => {
    setShowGratification(false);
    setCurrentPhaseIndex(currentPhaseIndex + 1);
    setCurrentQuestionIndex(0);
  };

  const canContinue = () => {
    if (!currentQuestion) return false;
    if (currentQuestion.type === "slider") return true;
    const answer = answers[currentQuestion.id];
    return Array.isArray(answer) && answer.length > 0;
  };

  const gratificationMessages = [
    { title: "Great start! 🌟", subtitle: "You're building your foundation." },
    { title: "Making progress! 📊", subtitle: "We're learning about you." },
    { title: "Almost there! 🎯", subtitle: "Just a few more questions." },
    { title: "Keep going! 💪", subtitle: "Your personalized plan awaits." },
    { title: "Creating your plan! ✨", subtitle: "This will be amazing." },
  ];

  if (showGratification) {
    const message = gratificationMessages[currentPhaseIndex];
    return (
      <GratificationScreen
        title={message.title}
        subtitle={message.subtitle}
        onContinue={handleGratificationContinue}
        type="celebration"
      />
    );
  }

  if (!currentQuestion) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${currentPhaseIndex}-${currentQuestionIndex}`}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.25 }}
      >
        <OnboardingQuestion
          progress={completedQuestions + 1}
          totalSteps={totalQuestions}
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
          showSkip={currentPhaseIndex === 0 && currentQuestionIndex === 0}
          onSkip={onSkip}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default OnboardingFlow;
