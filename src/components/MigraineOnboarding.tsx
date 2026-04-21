import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import CTAButton from "@/components/CTAButton";
import PainSlider from "@/components/PainSlider";

/**
 * Streamlined migraine onboarding — 5 questions (4 if not female).
 * Additional data (DOB, head pain location, warning signs) is collected
 * later at first-use moments, not up-front.
 */

interface MigraineOnboardingProps {
  onComplete: () => void;
  onSkip?: () => void;
  onBack?: () => void;
}

const genderOptions = [
  { id: "female", label: "Female", icon: "♀️" },
  { id: "male", label: "Male", icon: "♂️" },
  { id: "non-binary", label: "Non-binary", icon: "⚧️" },
  { id: "prefer-not-to-say", label: "Prefer not to say", icon: "🤐" },
];

const menstrualOptions = [
  { id: "yes", label: "Yes, I notice a pattern", sub: "Migraines around my period", icon: "📅" },
  { id: "maybe", label: "Not sure yet", sub: "Let's track and find out", icon: "🤔" },
  { id: "no", label: "No / Not applicable", sub: "Skip this tracking", icon: "➡️" },
];

const goalOptions = [
  { id: "triggers", label: "Find my triggers", icon: "⚡", color: "from-violet-500/20 to-violet-600/10 border-violet-500/30" },
  { id: "relief", label: "Find what relieves my pain", icon: "💊", color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30" },
  { id: "understand", label: "Understand my migraine better", icon: "🧠", color: "from-blue-500/20 to-blue-600/10 border-blue-500/30" },
  { id: "doctor", label: "Communicate better with my doctor", icon: "👩‍⚕️", color: "from-pink-500/20 to-pink-600/10 border-pink-500/30" },
];

const frequencyOptions = [
  { id: "rare", label: "1-3 / month", sub: "Episodic", color: "bg-green-500" },
  { id: "moderate", label: "4-7 / month", sub: "Moderate", color: "bg-yellow-500" },
  { id: "frequent", label: "8-14 / month", sub: "Frequent", color: "bg-orange-500" },
  { id: "chronic", label: "15+ / month", sub: "Chronic", color: "bg-red-500" },
];

type StepId = "gender" | "menstrual" | "goals" | "frequency" | "pain";

const MAX_GOALS = 2;

const MigraineOnboarding = ({ onComplete, onSkip, onBack }: MigraineOnboardingProps) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [gender, setGender] = useState<string | null>(null);
  const [tracksMenstruation, setTracksMenstruation] = useState<string | null>(null);
  const [goals, setGoals] = useState<string[]>([]);
  const [frequency, setFrequency] = useState<string | null>(null);
  const [painLevel, setPainLevel] = useState(5);

  const hasMenstrualStep = gender === "female";
  const stepSequence: StepId[] = useMemo(
    () => [
      "gender",
      ...(hasMenstrualStep ? (["menstrual"] as StepId[]) : []),
      "goals",
      "frequency",
      "pain",
    ],
    [hasMenstrualStep]
  );

  const totalSteps = stepSequence.length;
  const progress = ((stepIndex + 1) / totalSteps) * 100;
  const currentStepId = stepSequence[stepIndex];

  const toggleGoal = (id: string) => {
    setGoals((prev) => {
      if (prev.includes(id)) return prev.filter((g) => g !== id);
      if (prev.length >= MAX_GOALS) return prev;
      return [...prev, id];
    });
  };

  const canContinue = () => {
    switch (currentStepId) {
      case "gender":
        return gender !== null;
      case "menstrual":
        return tracksMenstruation !== null;
      case "goals":
        return goals.length > 0;
      case "frequency":
        return frequency !== null;
      case "pain":
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (stepIndex < stepSequence.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    } else if (onBack) {
      onBack();
    }
  };

  const autoAdvance = () => {
    setTimeout(handleNext, 400);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      {/* Top bar */}
      <div className="px-5 pt-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          <button onClick={handleBack} className="p-1 -ml-1 text-muted-foreground">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs text-muted-foreground font-medium">
            {stepIndex + 1} / {totalSteps}
          </span>
          {onSkip && stepIndex === 0 ? (
            <button onClick={onSkip} className="text-xs text-muted-foreground">
              Skip
            </button>
          ) : (
            <div className="w-8" />
          )}
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pb-6 flex flex-col overflow-y-auto">
        <AnimatePresence mode="wait">
          {currentStepId === "gender" && (
            <motion.div
              key="gender"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="flex-1 flex flex-col"
            >
              <h1 className="text-xl font-bold text-foreground mt-4 mb-1">How do you identify?</h1>
              <p className="text-sm text-muted-foreground mb-6">
                This helps us track the right symptoms — like hormonal triggers.
              </p>
              <div className="flex-1 flex flex-col justify-center gap-3">
                {genderOptions.map((opt) => (
                  <motion.button
                    key={opt.id}
                    onClick={() => {
                      setGender(opt.id);
                      autoAdvance();
                    }}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                      gender === opt.id
                        ? "border-accent bg-accent/10 shadow-md"
                        : "border-border bg-card hover:border-accent/30"
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    <div className="text-left flex-1">
                      <div className="text-base font-semibold text-foreground">{opt.label}</div>
                    </div>
                    {gender === opt.id && (
                      <div className="ml-auto w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {currentStepId === "menstrual" && (
            <motion.div
              key="menstrual"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="flex-1 flex flex-col"
            >
              <h1 className="text-xl font-bold text-foreground mt-4 mb-1">
                Do your migraines connect to your cycle?
              </h1>
              <p className="text-sm text-muted-foreground mb-6">
                About 60% of women with migraine notice a menstrual pattern.
              </p>
              <div className="flex-1 flex flex-col justify-center gap-3">
                {menstrualOptions.map((opt) => (
                  <motion.button
                    key={opt.id}
                    onClick={() => {
                      setTracksMenstruation(opt.id);
                      autoAdvance();
                    }}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                      tracksMenstruation === opt.id
                        ? "border-accent bg-accent/10 shadow-md"
                        : "border-border bg-card hover:border-accent/30"
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    <div className="text-left flex-1">
                      <div className="text-base font-semibold text-foreground">{opt.label}</div>
                      <div className="text-xs text-muted-foreground">{opt.sub}</div>
                    </div>
                    {tracksMenstruation === opt.id && (
                      <div className="ml-auto w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {currentStepId === "goals" && (
            <motion.div
              key="goals"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="flex-1 flex flex-col"
            >
              <h1 className="text-xl font-bold text-foreground mt-4 mb-1">
                What do you want most from NeuroCare?
              </h1>
              <p className="text-sm text-muted-foreground mb-5">
                Pick what matters — we'll shape your experience around it. Up to 2.
              </p>
              <div className="flex flex-col gap-3 flex-1 justify-center">
                {goalOptions.map((opt) => {
                  const selected = goals.includes(opt.id);
                  const disabled = !selected && goals.length >= MAX_GOALS;
                  return (
                    <motion.button
                      key={opt.id}
                      onClick={() => toggleGoal(opt.id)}
                      disabled={disabled}
                      className={`relative w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all bg-gradient-to-r ${opt.color} ${
                        selected
                          ? "ring-2 ring-accent border-accent shadow-lg"
                          : "border-transparent"
                      } ${disabled ? "opacity-40" : ""}`}
                      whileTap={disabled ? undefined : { scale: 0.98 }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                        <span className="text-2xl">{opt.icon}</span>
                      </div>
                      <span className="text-base font-semibold text-foreground text-left">
                        {opt.label}
                      </span>
                      {selected && (
                        <div className="ml-auto w-6 h-6 rounded-full bg-accent flex items-center justify-center shrink-0">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
              <CTAButton
                size="full"
                onClick={handleNext}
                disabled={!canContinue()}
                className="mt-5"
              >
                Continue
              </CTAButton>
            </motion.div>
          )}

          {currentStepId === "frequency" && (
            <motion.div
              key="freq"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="flex-1 flex flex-col"
            >
              <h1 className="text-xl font-bold text-foreground mt-4 mb-1">
                How often do you get migraines?
              </h1>
              <p className="text-sm text-muted-foreground mb-6">A rough estimate is fine.</p>
              <div className="flex-1 flex flex-col justify-center gap-3">
                {frequencyOptions.map((opt) => (
                  <motion.button
                    key={opt.id}
                    onClick={() => {
                      setFrequency(opt.id);
                      autoAdvance();
                    }}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                      frequency === opt.id
                        ? "border-accent bg-accent/10 shadow-md"
                        : "border-border bg-card hover:border-accent/30"
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-4 h-4 rounded-full ${opt.color} shrink-0`} />
                    <div className="text-left">
                      <div className="text-base font-semibold text-foreground">{opt.label}</div>
                      <div className="text-xs text-muted-foreground">{opt.sub}</div>
                    </div>
                    {frequency === opt.id && (
                      <div className="ml-auto w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {currentStepId === "pain" && (
            <motion.div
              key="pain"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="flex-1 flex flex-col"
            >
              <h1 className="text-xl font-bold text-foreground mt-4 mb-1">
                On a bad day, how intense is the pain?
              </h1>
              <p className="text-sm text-muted-foreground mb-6">Slide to rate your typical worst.</p>
              <div className="flex-1 flex flex-col items-center justify-center">
                <PainSlider value={painLevel} onChange={setPainLevel} />
              </div>
              <CTAButton size="full" onClick={handleNext} className="mt-5">
                Continue
              </CTAButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MigraineOnboarding;
