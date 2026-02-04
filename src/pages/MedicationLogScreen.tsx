import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Check, X, Clock } from "lucide-react";
import { Medication, MedicationLog, timeOptions, getTimeIcon, formatDosage, getTypeIcon } from "@/data/medicationContent";
import CTAButton from "@/components/CTAButton";
import GratificationScreen from "@/components/GratificationScreen";

interface MedicationLogScreenProps {
  medications: Medication[];
  onComplete: (logs: MedicationLog[]) => void;
  onBack: () => void;
}

interface LogEntry {
  medicationId: string;
  time: "morning" | "afternoon" | "evening" | "night";
  status: "pending" | "taken" | "skipped";
}

const MedicationLogScreen = ({ medications, onComplete, onBack }: MedicationLogScreenProps) => {
  const [currentTimeIndex, setCurrentTimeIndex] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [showComplete, setShowComplete] = useState(false);

  // Get all time slots that have medications
  const activeTimeSlots = timeOptions.filter((time) =>
    medications.some((med) => med.times.includes(time.id as any))
  );

  // Get medications for current time slot
  const currentTimeSlot = activeTimeSlots[currentTimeIndex];
  const medsForCurrentTime = medications.filter((med) =>
    med.times.includes(currentTimeSlot?.id as any)
  );

  // Get log status for a medication at current time
  const getLogStatus = (medId: string): "pending" | "taken" | "skipped" => {
    const log = logs.find(
      (l) => l.medicationId === medId && l.time === currentTimeSlot?.id
    );
    return log?.status || "pending";
  };

  // Check if all meds for current time are logged
  const allCurrentMedsLogged = medsForCurrentTime.every(
    (med) => getLogStatus(med.id) !== "pending"
  );

  // Check if all meds across all times are logged
  const allMedsLogged = activeTimeSlots.every((time) =>
    medications
      .filter((med) => med.times.includes(time.id as any))
      .every((med) => 
        logs.some((l) => l.medicationId === med.id && l.time === time.id)
      )
  );

  const handleLogMed = (medId: string, status: "taken" | "skipped") => {
    const existingIndex = logs.findIndex(
      (l) => l.medicationId === medId && l.time === currentTimeSlot?.id
    );
    
    if (existingIndex >= 0) {
      // Update existing log
      const newLogs = [...logs];
      newLogs[existingIndex].status = status;
      setLogs(newLogs);
    } else {
      // Add new log
      setLogs([
        ...logs,
        { medicationId: medId, time: currentTimeSlot?.id as any, status },
      ]);
    }
  };

  const handleNext = () => {
    if (currentTimeIndex < activeTimeSlots.length - 1) {
      setCurrentTimeIndex(currentTimeIndex + 1);
    } else {
      // All done
      setShowComplete(true);
    }
  };

  const handleComplete = () => {
    const finalLogs: MedicationLog[] = logs.map((log) => ({
      id: Math.random().toString(36).substring(2, 9),
      medicationId: log.medicationId,
      scheduledTime: log.time,
      takenAt: log.status === "taken" ? new Date() : null,
      skipped: log.status === "skipped",
      date: new Date().toISOString().split("T")[0],
    }));
    onComplete(finalLogs);
  };

  // Calculate progress
  const progress = ((currentTimeIndex + 1) / activeTimeSlots.length) * 100;
  const takenCount = logs.filter((l) => l.status === "taken").length;
  const totalToLog = activeTimeSlots.reduce(
    (acc, time) => acc + medications.filter((m) => m.times.includes(time.id as any)).length,
    0
  );

  if (showComplete) {
    return (
      <GratificationScreen
        title="All Logged! 💊✅"
        subtitle={`${takenCount} of ${totalToLog} medications taken`}
        onContinue={handleComplete}
        ctaText="Done"
        type="success"
      />
    );
  }

  if (activeTimeSlots.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background safe-layout">
        <div className="px-4 pt-4 flex items-center">
          <button
            onClick={onBack}
            className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <span className="text-5xl mb-4">📋</span>
          <h2 className="text-h2 text-foreground mb-2 text-center">No medications scheduled</h2>
          <p className="text-body text-muted-foreground text-center">
            Add medications to start logging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background safe-layout">
      {/* Header with Progress */}
      <div className="px-4 pt-4">
        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-helper text-muted-foreground">
              {currentTimeSlot?.label} medications
            </span>
            <span className="text-helper text-muted-foreground">
              {currentTimeIndex + 1} of {activeTimeSlots.length}
            </span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
        </div>
        
        {/* Back button and title */}
        <div className="flex items-center">
          <button
            onClick={currentTimeIndex === 0 ? onBack : () => setCurrentTimeIndex(currentTimeIndex - 1)}
            className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="flex-1 text-center text-helper-lg text-muted-foreground">
            Medication Log
          </span>
          <div className="w-10" />
        </div>
      </div>

      {/* Time slot header */}
      <div className="px-4 py-6 text-center">
        <span className="text-5xl">{getTimeIcon(currentTimeSlot?.id)}</span>
        <h1 className="text-h1-lg text-foreground mt-3">{currentTimeSlot?.label}</h1>
        <p className="text-helper-lg text-muted-foreground">{currentTimeSlot?.time}</p>
      </div>

      {/* Medication cards */}
      <div className="flex-1 px-4 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTimeSlot?.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {medsForCurrentTime.map((med, index) => {
              const status = getLogStatus(med.id);
              return (
                <motion.div
                  key={med.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`glass-card p-4 transition-all ${
                    status === "taken" 
                      ? "border-success/50 bg-success/5" 
                      : status === "skipped"
                      ? "border-muted-foreground/30 opacity-60"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                      style={{ backgroundColor: `${med.color}20` }}
                    >
                      {getTypeIcon(med.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-body font-semibold text-foreground">
                        {med.name}
                      </h3>
                      <p className="text-helper text-muted-foreground">
                        {formatDosage(med.dosage, med.quantity, med.type)}
                      </p>
                    </div>
                    {status === "taken" && (
                      <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                    {status === "skipped" && (
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <X className="w-5 h-5 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleLogMed(med.id, "taken")}
                      className={`flex-1 py-3 rounded-xl font-medium text-helper-lg transition-all flex items-center justify-center gap-2 ${
                        status === "taken"
                          ? "bg-success text-white"
                          : "bg-success/20 text-success hover:bg-success/30"
                      }`}
                    >
                      <Check className="w-5 h-5" />
                      Taken
                    </button>
                    <button
                      onClick={() => handleLogMed(med.id, "skipped")}
                      className={`flex-1 py-3 rounded-xl font-medium text-helper-lg transition-all flex items-center justify-center gap-2 ${
                        status === "skipped"
                          ? "bg-muted-foreground text-white"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      <X className="w-5 h-5" />
                      Skip
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Next button */}
        <div className="mt-8">
          <CTAButton 
            size="full" 
            onClick={handleNext}
            disabled={!allCurrentMedsLogged}
          >
            {currentTimeIndex < activeTimeSlots.length - 1 ? "Next Time Slot" : "Complete"}
          </CTAButton>
          
          {!allCurrentMedsLogged && (
            <p className="text-center text-helper text-muted-foreground mt-3">
              Log all medications to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicationLogScreen;
