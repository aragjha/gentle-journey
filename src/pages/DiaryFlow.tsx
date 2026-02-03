import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { DiaryCategory, frequencyOptions, impactOptions } from "@/data/diaryContent";
import CTAButton from "@/components/CTAButton";
import SelectionChip from "@/components/SelectionChip";
import GratificationScreen from "@/components/GratificationScreen";

interface DiaryFlowProps {
  diary: DiaryCategory;
  onComplete: () => void;
  onBack: () => void;
}

type DiaryStep = "intro" | "symptoms" | "troublesome" | "frequency" | "impact" | "worst_time" | "safety" | "complete";

const DiaryFlow = ({ diary, onComplete, onBack }: DiaryFlowProps) => {
  const [step, setStep] = useState<DiaryStep>("intro");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [mostTroublesome, setMostTroublesome] = useState<string | null>(null);
  const [frequency, setFrequency] = useState<number | null>(null);
  const [impact, setImpact] = useState<number | null>(null);
  const [worstTime, setWorstTime] = useState<string | null>(null);
  const [otherText, setOtherText] = useState("");
  const [showSafetyPrompt, setShowSafetyPrompt] = useState(false);

  // Calculate total steps and current progress
  const getProgressInfo = () => {
    // Base steps: symptoms, troublesome, frequency, impact
    // Optional: worst_time (if diary has it), safety (conditional)
    const hasWorstTime = !!diary.worstTimeOptions;
    const hasTroublesome = selectedSymptoms.length > 1 && !selectedSymptoms.includes("none");
    
    // Build the actual step sequence for this diary
    let stepSequence: DiaryStep[] = ["symptoms"];
    if (hasTroublesome) stepSequence.push("troublesome");
    stepSequence.push("frequency", "impact");
    if (hasWorstTime) stepSequence.push("worst_time");
    // Safety is conditional and shown between impact and worst_time/complete
    
    const currentIndex = stepSequence.indexOf(step);
    const totalSteps = stepSequence.length;
    
    // For steps not in sequence (intro, complete, safety), return special values
    if (step === "intro" || step === "complete") {
      return { current: 0, total: totalSteps, progress: 0 };
    }
    if (step === "safety") {
      // Safety appears after impact, show as if between impact and next step
      const impactIndex = stepSequence.indexOf("impact");
      return { current: impactIndex + 1, total: totalSteps, progress: ((impactIndex + 1) / totalSteps) * 100 };
    }
    
    return { 
      current: currentIndex + 1, 
      total: totalSteps, 
      progress: ((currentIndex + 1) / totalSteps) * 100 
    };
  };

  const progressInfo = getProgressInfo();

  const handleSymptomToggle = (symptomId: string) => {
    if (symptomId === "none") {
      // If "none" is selected, clear all others
      setSelectedSymptoms(["none"]);
    } else {
      // Remove "none" if selecting other symptoms
      setSelectedSymptoms((prev) => {
        const withoutNone = prev.filter((s) => s !== "none");
        if (withoutNone.includes(symptomId)) {
          return withoutNone.filter((s) => s !== symptomId);
        }
        return [...withoutNone, symptomId];
      });
    }
  };

  const handleSymptomsNext = () => {
    if (selectedSymptoms.includes("none") || selectedSymptoms.length === 0) {
      // Skip to complete if no symptoms
      setStep("complete");
    } else if (selectedSymptoms.length === 1) {
      // Auto-select most troublesome if only one
      setMostTroublesome(selectedSymptoms[0]);
      setStep("frequency");
    } else {
      setStep("troublesome");
    }
  };

  const handleTroublesomeNext = () => {
    setStep("frequency");
  };

  const handleFrequencyNext = () => {
    setStep("impact");
  };

  const handleImpactNext = () => {
    // Check for safety triggers
    const hasSafetyTrigger = diary.safetyTriggers?.some((trigger) =>
      selectedSymptoms.includes(trigger)
    );
    
    if (hasSafetyTrigger && diary.safetyMessage) {
      setShowSafetyPrompt(true);
      setStep("safety");
    } else if (diary.worstTimeOptions) {
      setStep("worst_time");
    } else {
      setStep("complete");
    }
  };

  const handleSafetyNext = () => {
    if (diary.worstTimeOptions) {
      setStep("worst_time");
    } else {
      setStep("complete");
    }
  };

  const handleWorstTimeNext = () => {
    setStep("complete");
  };

  const getSelectedSymptomLabels = () => {
    return selectedSymptoms
      .map((id) => diary.symptoms.find((s) => s.id === id)?.label)
      .filter(Boolean) as string[];
  };

  const renderStep = () => {
    switch (step) {
      case "intro":
        return (
          <motion.div
            key="intro"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col justify-center items-center px-6 text-center"
          >
            <span className="text-6xl mb-6">{diary.icon}</span>
            <h1 className="text-h1-lg text-foreground mb-3">{diary.title}</h1>
            <p className="text-body text-muted-foreground mb-8">{diary.description}</p>
            <CTAButton size="full" onClick={() => setStep("symptoms")}>
              Start
            </CTAButton>
          </motion.div>
        );

      case "symptoms":
        return (
          <motion.div
            key="symptoms"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <h2 className="text-h1-lg text-foreground mb-2">What did you experience?</h2>
            <p className="text-helper-lg text-muted-foreground mb-6">Select all that apply</p>
            
            <div className="flex-1 overflow-y-auto space-y-3 mb-6">
              {diary.symptoms.map((symptom) => (
                <button
                  key={symptom.id}
                  onClick={() => handleSymptomToggle(symptom.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all ${
                    selectedSymptoms.includes(symptom.id)
                      ? "bg-accent/20 border-accent text-foreground"
                      : "bg-card border-border text-foreground hover:border-accent/50"
                  }`}
                >
                  <span className="text-body">{symptom.label}</span>
                </button>
              ))}
              
              {/* Other option */}
              <div className="space-y-2">
                <button
                  onClick={() => handleSymptomToggle("other")}
                  className={`w-full p-4 rounded-2xl border text-left transition-all ${
                    selectedSymptoms.includes("other")
                      ? "bg-accent/20 border-accent text-foreground"
                      : "bg-card border-border text-foreground hover:border-accent/50"
                  }`}
                >
                  <span className="text-body">Other</span>
                </button>
                {selectedSymptoms.includes("other") && (
                  <input
                    type="text"
                    value={otherText}
                    onChange={(e) => setOtherText(e.target.value)}
                    placeholder="Describe your symptom..."
                    className="w-full p-4 rounded-2xl border border-border bg-background text-foreground placeholder:text-muted-foreground"
                    maxLength={120}
                  />
                )}
              </div>
            </div>

            <CTAButton
              size="full"
              onClick={handleSymptomsNext}
              disabled={selectedSymptoms.length === 0}
            >
              Next
            </CTAButton>
          </motion.div>
        );

      case "troublesome":
        const symptomOptions = getSelectedSymptomLabels();
        return (
          <motion.div
            key="troublesome"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <h2 className="text-h1-lg text-foreground mb-2">Which ONE is most troublesome?</h2>
            <p className="text-helper-lg text-muted-foreground mb-6">Pick the one that bothers you most</p>
            
            <div className="flex-1 overflow-y-auto space-y-3 mb-6">
              {selectedSymptoms
                .filter((id) => id !== "none" && id !== "other")
                .map((symptomId) => {
                  const symptom = diary.symptoms.find((s) => s.id === symptomId);
                  if (!symptom) return null;
                  return (
                    <button
                      key={symptom.id}
                      onClick={() => setMostTroublesome(symptom.id)}
                      className={`w-full p-4 rounded-2xl border text-left transition-all ${
                        mostTroublesome === symptom.id
                          ? "bg-accent/20 border-accent text-foreground"
                          : "bg-card border-border text-foreground hover:border-accent/50"
                      }`}
                    >
                      <span className="text-body">{symptom.label}</span>
                    </button>
                  );
                })}
              {selectedSymptoms.includes("other") && otherText && (
                <button
                  onClick={() => setMostTroublesome("other")}
                  className={`w-full p-4 rounded-2xl border text-left transition-all ${
                    mostTroublesome === "other"
                      ? "bg-accent/20 border-accent text-foreground"
                      : "bg-card border-border text-foreground hover:border-accent/50"
                  }`}
                >
                  <span className="text-body">{otherText}</span>
                </button>
              )}
            </div>

            <CTAButton
              size="full"
              onClick={handleTroublesomeNext}
              disabled={!mostTroublesome}
            >
              Next
            </CTAButton>
          </motion.div>
        );

      case "frequency":
        return (
          <motion.div
            key="frequency"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <h2 className="text-h1-lg text-foreground mb-2">How often?</h2>
            <p className="text-helper-lg text-muted-foreground mb-6">Rate the frequency</p>
            
            <div className="flex-1 flex flex-col justify-center space-y-3 mb-6">
              {frequencyOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFrequency(option.value)}
                  className={`w-full p-4 rounded-2xl border text-center transition-all ${
                    frequency === option.value
                      ? "bg-accent/20 border-accent text-foreground"
                      : "bg-card border-border text-foreground hover:border-accent/50"
                  }`}
                >
                  <span className="text-body font-medium">{option.label}</span>
                </button>
              ))}
            </div>

            <CTAButton
              size="full"
              onClick={handleFrequencyNext}
              disabled={frequency === null}
            >
              Next
            </CTAButton>
          </motion.div>
        );

      case "impact":
        return (
          <motion.div
            key="impact"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <h2 className="text-h1-lg text-foreground mb-2">How much did it affect your day?</h2>
            <p className="text-helper-lg text-muted-foreground mb-6">Rate the impact</p>
            
            <div className="flex-1 flex flex-col justify-center space-y-3 mb-6">
              {impactOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setImpact(option.value)}
                  className={`w-full p-4 rounded-2xl border text-center transition-all ${
                    impact === option.value
                      ? "bg-accent/20 border-accent text-foreground"
                      : "bg-card border-border text-foreground hover:border-accent/50"
                  }`}
                >
                  <span className="text-body font-medium">{option.label}</span>
                </button>
              ))}
            </div>

            <CTAButton
              size="full"
              onClick={handleImpactNext}
              disabled={impact === null}
            >
              {diary.worstTimeOptions ? "Next" : "Save"}
            </CTAButton>
          </motion.div>
        );

      case "safety":
        return (
          <motion.div
            key="safety"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col justify-center items-center px-6 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-warning/20 flex items-center justify-center mb-6">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="text-h1-lg text-foreground mb-4">Important</h2>
            <p className="text-body text-muted-foreground mb-8">{diary.safetyMessage}</p>
            <CTAButton size="full" onClick={handleSafetyNext}>
              OK
            </CTAButton>
          </motion.div>
        );

      case "worst_time":
        return (
          <motion.div
            key="worst_time"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <h2 className="text-h1-lg text-foreground mb-2">When is it worst?</h2>
            <p className="text-helper-lg text-muted-foreground mb-6">Select the time</p>
            
            <div className="flex-1 flex flex-col justify-center space-y-3 mb-6">
              {diary.worstTimeOptions?.map((time) => (
                <button
                  key={time}
                  onClick={() => setWorstTime(time)}
                  className={`w-full p-4 rounded-2xl border text-center transition-all ${
                    worstTime === time
                      ? "bg-accent/20 border-accent text-foreground"
                      : "bg-card border-border text-foreground hover:border-accent/50"
                  }`}
                >
                  <span className="text-body font-medium">{time}</span>
                </button>
              ))}
            </div>

            <CTAButton
              size="full"
              onClick={handleWorstTimeNext}
              disabled={!worstTime}
            >
              Save
            </CTAButton>
          </motion.div>
        );

      case "complete":
        return (
          <GratificationScreen
            title="Saved ✅"
            subtitle={`${diary.title} diary saved.`}
            onContinue={onComplete}
            ctaText="Done"
            type="success"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background safe-layout">
      {/* Header with Progress */}
      {step !== "intro" && step !== "complete" && (
        <div className="px-4 pt-4">
          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-helper text-muted-foreground">
                Step {progressInfo.current} of {progressInfo.total}
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressInfo.progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          </div>
          
          {/* Back button and title */}
          <div className="flex items-center">
            <button
              onClick={step === "symptoms" ? onBack : () => {
                // Go back one step
                const steps: DiaryStep[] = ["intro", "symptoms", "troublesome", "frequency", "impact", "worst_time"];
                const currentIndex = steps.indexOf(step);
                if (currentIndex > 0) {
                  setStep(steps[currentIndex - 1]);
                }
              }}
              className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <span className="flex-1 text-center text-helper-lg text-muted-foreground">
              {diary.title}
            </span>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 px-4 pb-8 flex flex-col">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DiaryFlow;
