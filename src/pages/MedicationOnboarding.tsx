import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Plus, Check } from "lucide-react";
import { 
  Medication, 
  frequencyOptions, 
  timeOptions, 
  medicationColors, 
  generateId 
} from "@/data/medicationContent";
import CTAButton from "@/components/CTAButton";
import GratificationScreen from "@/components/GratificationScreen";

interface MedicationOnboardingProps {
  onComplete: (medications: Medication[]) => void;
  onBack: () => void;
}

type OnboardingStep = 
  | "has_meds" 
  | "med_name" 
  | "med_dosage" 
  | "med_frequency" 
  | "med_times" 
  | "add_another" 
  | "complete";

const MedicationOnboarding = ({ onComplete, onBack }: MedicationOnboardingProps) => {
  const [step, setStep] = useState<OnboardingStep>("has_meds");
  const [medications, setMedications] = useState<Medication[]>([]);
  const [currentMed, setCurrentMed] = useState<Partial<Medication>>({});
  const [hasMedications, setHasMedications] = useState<boolean | null>(null);

  // Progress calculation
  const getProgress = () => {
    const steps: OnboardingStep[] = ["has_meds", "med_name", "med_dosage", "med_frequency", "med_times", "add_another"];
    const currentIndex = steps.indexOf(step);
    if (step === "complete") return 100;
    return ((currentIndex + 1) / steps.length) * 100;
  };

  const handleHasMeds = (value: boolean) => {
    setHasMedications(value);
    if (value) {
      setStep("med_name");
    } else {
      setStep("complete");
    }
  };

  const handleNameSubmit = () => {
    if (currentMed.name?.trim()) {
      setStep("med_dosage");
    }
  };

  const handleDosageSubmit = () => {
    if (currentMed.dosage?.trim()) {
      setStep("med_frequency");
    }
  };

  const handleFrequencySelect = (freq: Medication["frequency"]) => {
    setCurrentMed({ ...currentMed, frequency: freq });
    setStep("med_times");
  };

  const handleTimeToggle = (time: "morning" | "afternoon" | "evening" | "night") => {
    const currentTimes = currentMed.times || [];
    if (currentTimes.includes(time)) {
      setCurrentMed({ ...currentMed, times: currentTimes.filter((t) => t !== time) });
    } else {
      setCurrentMed({ ...currentMed, times: [...currentTimes, time] });
    }
  };

  const handleTimesSubmit = () => {
    if (currentMed.times?.length) {
      const newMed: Medication = {
        id: generateId(),
        name: currentMed.name || "",
        dosage: currentMed.dosage || "",
        frequency: currentMed.frequency || "once",
        times: currentMed.times || [],
        reminderEnabled: true,
        color: medicationColors[medications.length % medicationColors.length],
      };
      setMedications([...medications, newMed]);
      setCurrentMed({});
      setStep("add_another");
    }
  };

  const handleAddAnother = (addMore: boolean) => {
    if (addMore) {
      setStep("med_name");
    } else {
      setStep("complete");
    }
  };

  const handleComplete = () => {
    onComplete(medications);
  };

  const renderStep = () => {
    switch (step) {
      case "has_meds":
        return (
          <motion.div
            key="has_meds"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex-1 flex flex-col justify-center">
              <span className="text-5xl mb-6 text-center">💊</span>
              <h1 className="text-h1-lg text-foreground text-center mb-3">
                Do you take any medications?
              </h1>
              <p className="text-body text-muted-foreground text-center mb-8">
                We'll help you track and remember them
              </p>
            </div>
            
            <div className="space-y-3">
              <CTAButton size="full" onClick={() => handleHasMeds(true)}>
                Yes, let's add them
              </CTAButton>
              <button
                onClick={() => handleHasMeds(false)}
                className="w-full py-4 text-muted-foreground hover:text-foreground transition-colors text-body font-medium"
              >
                No medications right now
              </button>
            </div>
          </motion.div>
        );

      case "med_name":
        return (
          <motion.div
            key="med_name"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex-1 flex flex-col justify-center">
              <h1 className="text-h1-lg text-foreground mb-2">
                {medications.length === 0 ? "What's your first medication?" : "Add another medication"}
              </h1>
              <p className="text-helper-lg text-muted-foreground mb-8">
                Enter the medication name
              </p>
              
              <input
                type="text"
                value={currentMed.name || ""}
                onChange={(e) => setCurrentMed({ ...currentMed, name: e.target.value })}
                placeholder="e.g., Levodopa, Carbidopa..."
                className="w-full p-4 rounded-2xl border border-border bg-card text-foreground text-h2 placeholder:text-muted-foreground focus:outline-none focus:border-accent"
                autoFocus
              />
            </div>
            
            <CTAButton 
              size="full" 
              onClick={handleNameSubmit}
              disabled={!currentMed.name?.trim()}
            >
              Continue
            </CTAButton>
          </motion.div>
        );

      case "med_dosage":
        return (
          <motion.div
            key="med_dosage"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex-1 flex flex-col justify-center">
              <h1 className="text-h1-lg text-foreground mb-2">
                What's the dosage?
              </h1>
              <p className="text-helper-lg text-muted-foreground mb-8">
                For {currentMed.name}
              </p>
              
              <input
                type="text"
                value={currentMed.dosage || ""}
                onChange={(e) => setCurrentMed({ ...currentMed, dosage: e.target.value })}
                placeholder="e.g., 100mg, 1 tablet..."
                className="w-full p-4 rounded-2xl border border-border bg-card text-foreground text-h2 placeholder:text-muted-foreground focus:outline-none focus:border-accent"
                autoFocus
              />
            </div>
            
            <CTAButton 
              size="full" 
              onClick={handleDosageSubmit}
              disabled={!currentMed.dosage?.trim()}
            >
              Continue
            </CTAButton>
          </motion.div>
        );

      case "med_frequency":
        return (
          <motion.div
            key="med_frequency"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <h1 className="text-h1-lg text-foreground mb-2">
              How often?
            </h1>
            <p className="text-helper-lg text-muted-foreground mb-6">
              For {currentMed.name} ({currentMed.dosage})
            </p>
            
            <div className="flex-1 space-y-3">
              {frequencyOptions.map((freq) => (
                <button
                  key={freq.id}
                  onClick={() => handleFrequencySelect(freq.id as Medication["frequency"])}
                  className="w-full p-4 rounded-2xl border border-border bg-card text-foreground hover:border-accent/50 transition-all flex items-center gap-4"
                >
                  <span className="text-2xl">{freq.icon}</span>
                  <span className="text-body font-medium">{freq.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case "med_times":
        return (
          <motion.div
            key="med_times"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <h1 className="text-h1-lg text-foreground mb-2">
              When do you take it?
            </h1>
            <p className="text-helper-lg text-muted-foreground mb-6">
              Select all that apply
            </p>
            
            <div className="flex-1 grid grid-cols-2 gap-3">
              {timeOptions.map((time) => {
                const isSelected = currentMed.times?.includes(time.id as any);
                return (
                  <button
                    key={time.id}
                    onClick={() => handleTimeToggle(time.id as any)}
                    className={`p-6 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all ${
                      isSelected
                        ? "bg-accent/20 border-accent"
                        : "bg-card border-border hover:border-accent/50"
                    }`}
                  >
                    <span className="text-3xl">{time.icon}</span>
                    <span className="text-body font-medium text-foreground">{time.label}</span>
                    <span className="text-helper text-muted-foreground">{time.time}</span>
                  </button>
                );
              })}
            </div>
            
            <div className="mt-6">
              <CTAButton 
                size="full" 
                onClick={handleTimesSubmit}
                disabled={!currentMed.times?.length}
              >
                Add Medication
              </CTAButton>
            </div>
          </motion.div>
        );

      case "add_another":
        return (
          <motion.div
            key="add_another"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex-1 flex flex-col justify-center items-center">
              <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mb-6">
                <Check className="w-8 h-8 text-success" />
              </div>
              <h1 className="text-h1-lg text-foreground text-center mb-2">
                {medications[medications.length - 1]?.name} added!
              </h1>
              <p className="text-body text-muted-foreground text-center mb-4">
                You have {medications.length} medication{medications.length > 1 ? "s" : ""} set up
              </p>
              
              {/* Mini medication list */}
              <div className="w-full max-w-xs space-y-2 mb-8">
                {medications.map((med) => (
                  <div 
                    key={med.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border"
                  >
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: med.color }}
                    />
                    <span className="text-body text-foreground">{med.name}</span>
                    <span className="text-helper text-muted-foreground ml-auto">{med.dosage}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <CTAButton size="full" onClick={() => handleAddAnother(true)}>
                <Plus className="w-5 h-5 mr-2" />
                Add Another Medication
              </CTAButton>
              <button
                onClick={() => handleAddAnother(false)}
                className="w-full py-4 text-accent hover:text-accent/80 transition-colors text-body font-semibold"
              >
                I'm done, continue →
              </button>
            </div>
          </motion.div>
        );

      case "complete":
        return (
          <GratificationScreen
            title={medications.length > 0 ? "Medications Set! 💊" : "All Set! ✅"}
            subtitle={
              medications.length > 0 
                ? `${medications.length} medication${medications.length > 1 ? "s" : ""} ready to track`
                : "You can add medications anytime"
            }
            onContinue={handleComplete}
            ctaText="Continue"
            type="success"
          />
        );

      default:
        return null;
    }
  };

  const canGoBack = step !== "has_meds" && step !== "complete";

  const handleBack = () => {
    const stepOrder: OnboardingStep[] = ["has_meds", "med_name", "med_dosage", "med_frequency", "med_times", "add_another"];
    const currentIndex = stepOrder.indexOf(step);
    if (currentIndex > 0) {
      setStep(stepOrder[currentIndex - 1]);
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background safe-layout">
      {/* Header with Progress */}
      {step !== "complete" && (
        <div className="px-4 pt-4">
          {/* Progress bar */}
          <div className="mb-4">
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${getProgress()}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          </div>
          
          {/* Back button */}
          <div className="flex items-center">
            <button
              onClick={canGoBack ? handleBack : onBack}
              className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <span className="flex-1 text-center text-helper-lg text-muted-foreground">
              Medications
            </span>
            <div className="w-10" />
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

export default MedicationOnboarding;
