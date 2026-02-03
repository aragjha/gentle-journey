import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SplashScreen from "@/components/SplashScreen";
import OnboardingQuestion from "@/components/OnboardingQuestion";
import GratificationScreen from "@/components/GratificationScreen";

// Onboarding questions organized by phase
const onboardingPhases = [
  {
    phase: "A",
    showInterstitialAfter: true,
    questions: [
      {
        id: "role",
        title: "Let's get to know you",
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
        helper: "Choose what feels closest to you.",
        type: "single" as const,
        options: [
          { id: "newly", label: "Newly diagnosed", icon: "🌱" },
          { id: "few_years", label: "A few years in", icon: "🌿" },
          { id: "long_time", label: "Long-time warrior", icon: "🌳" },
          { id: "unsure", label: "Not sure yet", icon: "❓" },
        ],
      },
    ],
  },
  {
    phase: "B",
    showInterstitialAfter: false,
    questions: [
      {
        id: "main_concern",
        title: "What's on your mind lately?",
        helper: "Pick your biggest concern right now.",
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
        title: "How are you feeling today?",
        helper: "Slide to show your energy level.",
        type: "slider" as const,
        options: [],
      },
    ],
  },
  {
    phase: "C",
    showInterstitialAfter: true,
    questions: [
      {
        id: "medications",
        title: "Are you taking any PD medications?",
        type: "single" as const,
        options: [
          { id: "yes", label: "Yes, I am", icon: "💊" },
          { id: "no", label: "Not yet", icon: "⏳" },
          { id: "unsure", label: "I'm not sure", icon: "🤔" },
        ],
      },
      {
        id: "add_medications",
        title: "Want to add your medications now?",
        helper: "You can always do this later in Tools.",
        type: "single" as const,
        showIf: "medications_yes",
        options: [
          { id: "yes", label: "Yes, let's do it", icon: "✅" },
          { id: "later", label: "I'll do it later", icon: "⏰" },
        ],
      },
      {
        id: "tracking_goal",
        title: "What would you like to track?",
        helper: "Pick as many as you'd like.",
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
    showInterstitialAfter: false,
    questions: [
      {
        id: "reminder_time",
        title: "When should we check in?",
        helper: "We'll send a gentle daily reminder.",
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
        title: "Share updates with a caregiver?",
        helper: "They'll only see summaries, never raw data.",
        type: "single" as const,
        options: [
          { id: "yes", label: "Yes, I'd like that", icon: "👥" },
          { id: "later", label: "Maybe later", icon: "⏰" },
          { id: "no", label: "Keep it private", icon: "🔒" },
        ],
      },
    ],
  },
];

export interface OnboardingState {
  phaseIndex: number;
  questionIndex: number;
  answers: Record<string, string[] | number>;
}

interface OnboardingFlowProps {
  onComplete: () => void;
  onSkip?: () => void;
  onAddMedications?: (state: OnboardingState) => void;
  initialState?: OnboardingState;
}

const OnboardingFlow = ({ onComplete, onSkip, onAddMedications, initialState }: OnboardingFlowProps) => {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(initialState?.phaseIndex ?? 0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(initialState?.questionIndex ?? 0);
  const [showGratification, setShowGratification] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string[] | number>>(initialState?.answers ?? {});

  const currentPhase = onboardingPhases[currentPhaseIndex];
  
  // Get filtered questions for current phase (skip conditional questions that shouldn't show)
  const getVisibleQuestions = () => {
    if (!currentPhase) return [];
    return currentPhase.questions.filter((q) => {
      if ((q as any).showIf === "medications_yes") {
        // Only show "add_medications" if user selected "yes" to having medications
        const medsAnswer = answers["medications"];
        return Array.isArray(medsAnswer) && medsAnswer.includes("yes");
      }
      return true;
    });
  };
  
  const visibleQuestions = getVisibleQuestions();
  const currentQuestion = visibleQuestions[currentQuestionIndex];

  // Calculate total progress (accounting for conditional questions)
  const getTotalVisibleQuestions = () => {
    return onboardingPhases.reduce((sum, phase) => {
      return sum + phase.questions.filter((q) => {
        if ((q as any).showIf === "medications_yes") {
          const medsAnswer = answers["medications"];
          return Array.isArray(medsAnswer) && medsAnswer.includes("yes");
        }
        return true;
      }).length;
    }, 0);
  };
  
  const totalQuestions = getTotalVisibleQuestions();
  const completedQuestions = onboardingPhases
    .slice(0, currentPhaseIndex)
    .reduce((sum, phase) => {
      return sum + phase.questions.filter((q) => {
        if ((q as any).showIf === "medications_yes") {
          const medsAnswer = answers["medications"];
          return Array.isArray(medsAnswer) && medsAnswer.includes("yes");
        }
        return true;
      }).length;
    }, 0) + currentQuestionIndex;

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
      // Single selection - set answer and auto-advance after a short delay
      setAnswers({ ...answers, [currentQuestion.id]: [id] });
      
      // Auto-advance for single selection questions
      setTimeout(() => {
        handleContinueInternal([id]);
      }, 300);
    }
  };

  const handleContinueInternal = (currentAnswer?: string[]) => {
    // Check if user wants to add medications now
    if (currentQuestion?.id === "add_medications") {
      const addMedsAnswer = currentAnswer || answers["add_medications"];
      if (Array.isArray(addMedsAnswer) && addMedsAnswer.includes("yes") && onAddMedications) {
        const nextQuestionIndex = currentQuestionIndex + 1;
        const isLastInPhase = nextQuestionIndex >= visibleQuestions.length;
        
        onAddMedications({
          phaseIndex: isLastInPhase ? currentPhaseIndex + 1 : currentPhaseIndex,
          questionIndex: isLastInPhase ? 0 : nextQuestionIndex,
          answers: { ...answers, [currentQuestion.id]: addMedsAnswer },
        });
        return;
      }
    }
    
    const isLastQuestionInPhase = currentQuestionIndex >= visibleQuestions.length - 1;
    const isLastPhase = currentPhaseIndex >= onboardingPhases.length - 1;

    if (isLastQuestionInPhase) {
      if (isLastPhase) {
        onComplete();
      } else if (currentPhase.showInterstitialAfter) {
        setShowGratification(true);
      } else {
        // Skip interstitial and go to next phase
        setCurrentPhaseIndex(currentPhaseIndex + 1);
        setCurrentQuestionIndex(0);
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSliderChange = (value: number) => {
    if (!currentQuestion) return;
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const handleContinue = () => {
    handleContinueInternal();
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentPhaseIndex > 0) {
      // Go to last question of previous phase
      const prevPhase = onboardingPhases[currentPhaseIndex - 1];
      const prevVisibleQuestions = prevPhase.questions.filter((q) => {
        if ((q as any).showIf === "medications_yes") {
          const medsAnswer = answers["medications"];
          return Array.isArray(medsAnswer) && medsAnswer.includes("yes");
        }
        return true;
      });
      setCurrentPhaseIndex(currentPhaseIndex - 1);
      setCurrentQuestionIndex(prevVisibleQuestions.length - 1);
    }
  };

  // Check if we can go back
  const canGoBack = currentPhaseIndex > 0 || currentQuestionIndex > 0;

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

  // Only 2 interstitials now - after Phase A and Phase C
  const gratificationMessages: Record<number, { title: string; subtitle: string }> = {
    0: { title: "Great, nice to meet you! 🌟", subtitle: "Now let's understand how you're feeling." },
    2: { title: "You're all set! 🎯", subtitle: "Just a couple more preferences to go." },
  };

  if (showGratification) {
    const message = gratificationMessages[currentPhaseIndex] || { 
      title: "Looking good! ✨", 
      subtitle: "Let's keep going." 
    };
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
          showBackButton={canGoBack}
          onBack={handleBack}
          showSkip={currentPhaseIndex === 0 && currentQuestionIndex === 0}
          onSkip={onSkip}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default OnboardingFlow;
