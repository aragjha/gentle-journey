import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Camera, Upload, AlertCircle, Bell, Check } from "lucide-react";
import CTAButton from "@/components/CTAButton";
import {
  triggerTypes,
  menstrualQuestions,
  warningSymptoms,
  triggerFrequencyOptions,
  reminderOptions,
  generateTriggerProfileId,
  TriggerProfile,
} from "@/data/triggerMedicationContent";

interface TriggerMedicationFlowProps {
  onComplete: (profile: TriggerProfile) => void;
  onBack: () => void;
}

type FlowStep =
  | "trigger-type"
  | "trigger-detail"
  | "menstrual-questions"
  | "medications"
  | "warning-symptoms"
  | "reminder"
  | "complete";

const commonMedications = [
  { id: "sumatriptan", label: "Sumatriptan" },
  { id: "rizatriptan", label: "Rizatriptan" },
  { id: "ibuprofen", label: "Ibuprofen" },
  { id: "naproxen", label: "Naproxen" },
  { id: "acetaminophen", label: "Acetaminophen" },
  { id: "excedrin", label: "Excedrin" },
];

const slideVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

const TriggerMedicationFlow = ({ onComplete, onBack }: TriggerMedicationFlowProps) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>("trigger-type");
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const [selectedSubtypeId, setSelectedSubtypeId] = useState<string | null>(null);
  const [menstrualAnswers, setMenstrualAnswers] = useState<Record<string, string[]>>({});
  const [menstrualSubStep, setMenstrualSubStep] = useState(0);
  const [selectedMeds, setSelectedMeds] = useState<string[]>([]);
  const [showUploadMockup, setShowUploadMockup] = useState(false);
  const [selectedWarnings, setSelectedWarnings] = useState<string[]>([]);
  const [selectedFrequency, setSelectedFrequency] = useState<string | null>(null);
  const [selectedReminder, setSelectedReminder] = useState<string | null>(null);

  const autoAdvanceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    };
  }, []);

  // Derived data
  const selectedType = triggerTypes.find((t) => t.id === selectedTypeId);
  const selectedSubtype = selectedType?.subtypes.find((s) => s.id === selectedSubtypeId);
  const isMenstrualFlow = selectedTypeId === "periodical" && selectedSubtypeId === "menstrual";

  // Step order (dynamic based on menstrual selection)
  const getStepOrder = (): FlowStep[] => {
    const steps: FlowStep[] = ["trigger-type", "trigger-detail"];
    if (isMenstrualFlow) steps.push("menstrual-questions");
    steps.push("medications", "warning-symptoms", "reminder", "complete");
    return steps;
  };

  const stepOrder = getStepOrder();
  const stepIndex = stepOrder.indexOf(currentStep);
  // Exclude "complete" from the total visual steps
  const totalVisualSteps = stepOrder.length - 1;
  const visualStepIndex = Math.min(stepIndex, totalVisualSteps - 1);

  const goToStep = (step: FlowStep) => {
    setCurrentStep(step);
  };

  const goNext = () => {
    const nextIdx = stepIndex + 1;
    if (nextIdx < stepOrder.length) {
      setCurrentStep(stepOrder[nextIdx]);
    }
  };

  const goBack = () => {
    if (currentStep === "trigger-type") {
      onBack();
      return;
    }

    // Handle menstrual sub-step back
    if (currentStep === "menstrual-questions" && menstrualSubStep > 0) {
      // Walk backwards, skipping questions that should be skipped
      let prevSub = menstrualSubStep - 1;
      while (prevSub >= 0) {
        const q = menstrualQuestions[prevSub];
        if (q.type === "single" && prevSub > 0) {
          // Check skip logic - but going back we just show all visited questions
          break;
        }
        break;
      }
      setMenstrualSubStep(prevSub);
      return;
    }

    const prevIdx = stepIndex - 1;
    if (prevIdx >= 0) {
      const prevStep = stepOrder[prevIdx];
      if (prevStep === "menstrual-questions") {
        setMenstrualSubStep(menstrualQuestions.length - 1);
      }
      setCurrentStep(prevStep);
    }
  };

  const autoAdvance = (callback: () => void) => {
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    autoAdvanceTimer.current = setTimeout(callback, 400);
  };

  // Handle trigger type selection
  const handleTypeSelect = (typeId: string) => {
    setSelectedTypeId(typeId);
    autoAdvance(() => goToStep("trigger-detail"));
  };

  // Handle subtype selection
  const handleSubtypeSelect = (subtypeId: string) => {
    setSelectedSubtypeId(subtypeId);
    const willBeMenstrual = selectedTypeId === "periodical" && subtypeId === "menstrual";
    autoAdvance(() => {
      if (willBeMenstrual) {
        setMenstrualSubStep(0);
        goToStep("menstrual-questions");
      } else {
        goToStep("medications");
      }
    });
  };

  // Handle menstrual question answer
  const handleMenstrualAnswer = (questionId: string, optionId: string, isMulti: boolean) => {
    if (isMulti) {
      const current = menstrualAnswers[questionId] || [];
      if (current.includes(optionId)) {
        setMenstrualAnswers({ ...menstrualAnswers, [questionId]: current.filter((v) => v !== optionId) });
      } else {
        setMenstrualAnswers({ ...menstrualAnswers, [questionId]: [...current, optionId] });
      }
    } else {
      setMenstrualAnswers({ ...menstrualAnswers, [questionId]: [optionId] });

      // Auto-advance for single select
      autoAdvance(() => {
        // If answered "no" to first question, skip remaining menstrual questions
        if (questionId === "has_menstrual_migraine" && optionId === "no") {
          goToStep("medications");
          return;
        }
        advanceMenstrualSubStep();
      });
    }
  };

  const advanceMenstrualSubStep = () => {
    let nextSub = menstrualSubStep + 1;
    // Skip questions based on skip logic
    while (nextSub < menstrualQuestions.length) {
      const q = menstrualQuestions[nextSub];
      // All questions after Q1 are skipped if "no" was answered
      if (menstrualAnswers["has_menstrual_migraine"]?.[0] === "no") {
        goToStep("medications");
        return;
      }
      break;
    }
    if (nextSub >= menstrualQuestions.length) {
      goToStep("medications");
    } else {
      setMenstrualSubStep(nextSub);
    }
  };

  // Toggle medication selection
  const handleMedToggle = (medId: string) => {
    setSelectedMeds((prev) =>
      prev.includes(medId) ? prev.filter((m) => m !== medId) : [...prev, medId]
    );
  };

  // Toggle warning symptom
  const handleWarningToggle = (symptomId: string) => {
    setSelectedWarnings((prev) =>
      prev.includes(symptomId) ? prev.filter((s) => s !== symptomId) : [...prev, symptomId]
    );
  };

  // Handle frequency selection
  const handleFrequencySelect = (freqId: string) => {
    setSelectedFrequency(freqId);
  };

  // Handle reminder selection
  const handleReminderSelect = (reminderId: string) => {
    setSelectedReminder(reminderId);
    autoAdvance(() => goToStep("complete"));
  };

  // Build final profile
  const buildProfile = (): TriggerProfile => {
    return {
      id: generateTriggerProfileId(),
      type: (selectedTypeId as "activity" | "event" | "periodical") || "activity",
      subtype: selectedSubtypeId || "",
      name: selectedSubtype?.label || "",
      medications: selectedMeds,
      warningSymptoms: selectedWarnings,
      frequency: selectedFrequency || "",
      reminderBefore: selectedReminder || "none",
    };
  };

  const handleComplete = () => {
    onComplete(buildProfile());
  };

  // Get trigger name for display
  const triggerName = selectedSubtype?.label || selectedType?.label || "this trigger";

  // Get reminder preview text
  const selectedReminderOption = reminderOptions.find((r) => r.id === selectedReminder);

  // ── RENDER STEPS ──

  const renderTriggerType = () => (
    <motion.div
      key="trigger-type"
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.25 }}
      className="flex-1 flex flex-col"
    >
      <h2 className="text-xl font-bold text-foreground mb-1">What kind of trigger?</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Select the category that best describes your trigger.
      </p>

      <div className="flex-1 flex flex-col justify-center space-y-4">
        {triggerTypes.map((type) => (
          <motion.button
            key={type.id}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleTypeSelect(type.id)}
            className={`w-full p-5 rounded-2xl border-2 text-left transition-all bg-gradient-to-r ${type.color} ${
              selectedTypeId === type.id
                ? "border-accent bg-accent/10"
                : "border-border"
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">{type.icon}</span>
              <div>
                <div className="text-lg font-bold text-foreground">{type.label}</div>
                <div className="text-sm text-muted-foreground mt-0.5">{type.description}</div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );

  const renderTriggerDetail = () => {
    if (!selectedType) return null;
    return (
      <motion.div
        key="trigger-detail"
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.25 }}
        className="flex-1 flex flex-col"
      >
        <h2 className="text-xl font-bold text-foreground mb-1">
          {selectedType.icon} {selectedType.label} Triggers
        </h2>
        <p className="text-sm text-muted-foreground mb-6">Which one specifically?</p>

        <div className="flex-1 overflow-y-auto space-y-3">
          {selectedType.subtypes.map((sub) => (
            <motion.button
              key={sub.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSubtypeSelect(sub.id)}
              className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-3 ${
                selectedSubtypeId === sub.id
                  ? "border-accent bg-accent/10"
                  : "border-border bg-card hover:border-accent/50"
              }`}
            >
              <span className="text-2xl">{sub.icon}</span>
              <span className="text-base font-medium text-foreground">{sub.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    );
  };

  const renderMenstrualQuestions = () => {
    const question = menstrualQuestions[menstrualSubStep];
    if (!question) return null;
    const isMulti = question.type === "multi";
    const selected = menstrualAnswers[question.id] || [];

    return (
      <motion.div
        key={`menstrual-${menstrualSubStep}`}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.25 }}
        className="flex-1 flex flex-col"
      >
        <h2 className="text-xl font-bold text-foreground mb-1">{question.question}</h2>
        {isMulti && (
          <p className="text-sm text-muted-foreground mb-4">Select all that apply.</p>
        )}

        <div className="flex-1 overflow-y-auto space-y-3 mt-4">
          {question.options.map((opt) => (
            <motion.button
              key={opt.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleMenstrualAnswer(question.id, opt.id, isMulti)}
              className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-3 ${
                selected.includes(opt.id)
                  ? "border-accent bg-accent/10"
                  : "border-border bg-card hover:border-accent/50"
              }`}
            >
              <span className="text-lg">{opt.icon}</span>
              <span className="text-base font-medium text-foreground">{opt.label}</span>
              {selected.includes(opt.id) && (
                <Check className="w-5 h-5 text-accent ml-auto" />
              )}
            </motion.button>
          ))}
        </div>

        {isMulti && (
          <CTAButton
            size="full"
            onClick={advanceMenstrualSubStep}
            className="mt-4"
          >
            {selected.length > 0 ? "Next" : "Skip"}
          </CTAButton>
        )}
      </motion.div>
    );
  };

  const renderMedications = () => (
    <motion.div
      key="medications"
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.25 }}
      className="flex-1 flex flex-col"
    >
      <h2 className="text-xl font-bold text-foreground mb-1">
        Which medications do you take for this trigger?
      </h2>
      <p className="text-sm text-muted-foreground mb-5">Select medications or upload a prescription.</p>

      {/* Upload / Camera mockup */}
      <div className="flex gap-3 mb-5">
        <button
          onClick={() => setShowUploadMockup(!showUploadMockup)}
          className="flex-1 flex items-center justify-center gap-2 p-3 rounded-2xl border-2 border-dashed border-accent/50 bg-accent/5 text-accent-foreground hover:bg-accent/10 transition-all"
        >
          <Camera className="w-5 h-5" />
          <span className="text-sm font-medium">Upload Prescription</span>
        </button>
      </div>

      {showUploadMockup && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-5 p-6 rounded-2xl border-2 border-dashed border-muted-foreground/30 bg-muted/30 flex flex-col items-center justify-center gap-3"
        >
          <Upload className="w-8 h-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground text-center">
            Drag & drop or tap to upload a photo of your prescription
          </p>
          <p className="text-xs text-muted-foreground/60">JPG, PNG, PDF supported</p>
        </motion.div>
      )}

      {/* Quick-select medications */}
      <p className="text-sm font-semibold text-foreground mb-3">Add Manually</p>
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-wrap gap-2">
          {commonMedications.map((med) => (
            <motion.button
              key={med.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleMedToggle(med.id)}
              className={`px-4 py-2.5 rounded-full border-2 text-sm font-medium transition-all ${
                selectedMeds.includes(med.id)
                  ? "border-accent bg-accent/15 text-foreground"
                  : "border-border bg-card text-foreground hover:border-accent/50"
              }`}
            >
              {selectedMeds.includes(med.id) && (
                <Check className="w-3.5 h-3.5 inline mr-1.5" />
              )}
              {med.label}
            </motion.button>
          ))}
        </div>
      </div>

      <CTAButton size="full" onClick={goNext} className="mt-5">
        {selectedMeds.length > 0 ? "Next" : "Skip"}
      </CTAButton>
    </motion.div>
  );

  const renderWarningSymptoms = () => (
    <motion.div
      key="warning-symptoms"
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.25 }}
      className="flex-1 flex flex-col"
    >
      <h2 className="text-xl font-bold text-foreground mb-1">
        Do you notice any early warning signs before this trigger leads to a migraine?
      </h2>
      <p className="text-sm text-muted-foreground mb-5">Select all that apply.</p>

      <div className="flex-1 overflow-y-auto mb-4">
        <div className="grid grid-cols-2 gap-2">
          {warningSymptoms.map((symptom) => (
            <motion.button
              key={symptom.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleWarningToggle(symptom.id)}
              className={`p-3 rounded-2xl border-2 text-left transition-all flex items-center gap-2 ${
                selectedWarnings.includes(symptom.id)
                  ? "border-accent bg-accent/10"
                  : "border-border bg-card hover:border-accent/50"
              }`}
            >
              <span className="text-lg">{symptom.icon}</span>
              <span className="text-xs font-medium text-foreground leading-tight">{symptom.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Frequency sub-question */}
      <div className="border-t border-border pt-4 mb-4">
        <h3 className="text-base font-bold text-foreground mb-3">
          How often does this trigger lead to a migraine?
        </h3>
        <div className="space-y-2">
          {triggerFrequencyOptions.map((freq) => (
            <motion.button
              key={freq.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleFrequencySelect(freq.id)}
              className={`w-full p-3.5 rounded-2xl border-2 text-left transition-all flex items-center gap-3 ${
                selectedFrequency === freq.id
                  ? "border-accent bg-accent/10"
                  : "border-border bg-card hover:border-accent/50"
              }`}
            >
              <span className="text-lg">{freq.icon}</span>
              <span className="text-sm font-medium text-foreground">{freq.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <CTAButton
        size="full"
        onClick={goNext}
        disabled={!selectedFrequency}
      >
        Next
      </CTAButton>
    </motion.div>
  );

  const renderReminder = () => (
    <motion.div
      key="reminder"
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.25 }}
      className="flex-1 flex flex-col"
    >
      <h2 className="text-xl font-bold text-foreground mb-1">
        Want a reminder before {triggerName}?
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        We can nudge you to prepare and take medication.
      </p>

      <div className="flex-1 overflow-y-auto space-y-3">
        {reminderOptions.map((opt) => (
          <motion.button
            key={opt.id}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleReminderSelect(opt.id)}
            className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-3 ${
              selectedReminder === opt.id
                ? "border-accent bg-accent/10"
                : "border-border bg-card hover:border-accent/50"
            }`}
          >
            <Bell className="w-5 h-5 text-muted-foreground" />
            <div>
              <div className="text-base font-medium text-foreground">{opt.label}</div>
              <div className="text-xs text-muted-foreground">{opt.description}</div>
            </div>
            {selectedReminder === opt.id && (
              <Check className="w-5 h-5 text-accent ml-auto" />
            )}
          </motion.button>
        ))}
      </div>

      {/* Reminder preview */}
      {selectedReminder && selectedReminder !== "none" && selectedReminderOption && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 rounded-2xl bg-accent/10 border-2 border-accent/30"
        >
          <div className="flex items-center gap-2 text-sm text-foreground">
            <span className="text-lg">📬</span>
            <span>
              We'll remind you <strong>{selectedReminderOption.label.toLowerCase()}</strong>{" "}
              {triggerName}
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );

  const renderComplete = () => (
    <motion.div
      key="complete"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex-1 flex flex-col items-center justify-center text-center px-4"
    >
      {/* Green checkmark animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mb-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
        >
          <Check className="w-10 h-10 text-white" strokeWidth={3} />
        </motion.div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-2xl font-bold text-foreground mb-2"
      >
        Trigger Linked!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-muted-foreground mb-8 max-w-xs"
      >
        Your trigger profile is all set.
      </motion.p>

      {/* Summary card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-sm rounded-2xl border-2 border-border bg-card p-5 text-left space-y-3 mb-8"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{selectedSubtype?.icon || selectedType?.icon}</span>
          <span className="text-base font-bold text-foreground">{triggerName}</span>
          <span className="ml-auto px-2 py-0.5 rounded-full bg-accent/15 text-accent-foreground text-xs font-medium">
            {selectedType?.label}
          </span>
        </div>

        {selectedMeds.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground mb-1">Medications</p>
            <div className="flex flex-wrap gap-1">
              {selectedMeds.map((medId) => {
                const med = commonMedications.find((m) => m.id === medId);
                return (
                  <span
                    key={medId}
                    className="px-2 py-0.5 rounded-full bg-muted text-xs font-medium text-foreground"
                  >
                    {med?.label || medId}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {selectedWarnings.length > 0 && selectedWarnings[0] !== "none" && (
          <div>
            <p className="text-xs text-muted-foreground mb-1">Warning Signs</p>
            <div className="flex flex-wrap gap-1">
              {selectedWarnings.map((wId) => {
                const w = warningSymptoms.find((s) => s.id === wId);
                return (
                  <span
                    key={wId}
                    className="px-2 py-0.5 rounded-full bg-muted text-xs font-medium text-foreground"
                  >
                    {w?.icon} {w?.label || wId}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {selectedFrequency && (
          <div>
            <p className="text-xs text-muted-foreground mb-1">Frequency</p>
            <p className="text-sm text-foreground">
              {triggerFrequencyOptions.find((f) => f.id === selectedFrequency)?.label}
            </p>
          </div>
        )}

        {selectedReminder && selectedReminder !== "none" && (
          <div>
            <p className="text-xs text-muted-foreground mb-1">Reminder</p>
            <p className="text-sm text-foreground">
              {reminderOptions.find((r) => r.id === selectedReminder)?.label}
            </p>
          </div>
        )}
      </motion.div>

      <CTAButton size="full" onClick={handleComplete}>
        Back to Home
      </CTAButton>
    </motion.div>
  );

  // ── RENDER STEP DISPATCH ──

  const renderStep = () => {
    switch (currentStep) {
      case "trigger-type":
        return renderTriggerType();
      case "trigger-detail":
        return renderTriggerDetail();
      case "menstrual-questions":
        return renderMenstrualQuestions();
      case "medications":
        return renderMedications();
      case "warning-symptoms":
        return renderWarningSymptoms();
      case "reminder":
        return renderReminder();
      case "complete":
        return renderComplete();
      default:
        return null;
    }
  };

  // ── MAIN LAYOUT ──

  if (currentStep === "complete") {
    return (
      <div className="min-h-[100dvh] flex flex-col bg-background">
        <div className="flex-1 px-5 pb-6 flex flex-col overflow-y-auto">
          {renderComplete()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      {/* Header with Progress */}
      <div className="px-5 pt-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          <button onClick={goBack} className="p-1 -ml-1 text-muted-foreground">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs text-muted-foreground font-medium">
            {visualStepIndex + 1} / {totalVisualSteps}
          </span>
          <div className="w-6" />
        </div>
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #8b5cf6, #ec4899, #22d3ee)" }}
            initial={{ width: 0 }}
            animate={{ width: `${((visualStepIndex + 1) / totalVisualSteps) * 100}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pb-6 flex flex-col overflow-y-auto">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TriggerMedicationFlow;
