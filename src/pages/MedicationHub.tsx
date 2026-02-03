import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Plus, Bell, BellOff, ChevronRight, Edit2 } from "lucide-react";
import { Medication, getTimeLabel, getFrequencyLabel, timeOptions } from "@/data/medicationContent";
import CTAButton from "@/components/CTAButton";

interface MedicationHubProps {
  medications: Medication[];
  onAddMedication: () => void;
  onEditMedication: (med: Medication) => void;
  onToggleReminder: (medId: string) => void;
  onOpenLog: () => void;
  onBack: () => void;
}

const MedicationHub = ({ 
  medications, 
  onAddMedication, 
  onEditMedication, 
  onToggleReminder,
  onOpenLog,
  onBack 
}: MedicationHubProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (medId: string) => {
    setExpandedId(expandedId === medId ? null : medId);
  };

  // Group medications by time of day for the schedule view
  const getScheduleByTime = () => {
    const schedule: Record<string, Medication[]> = {
      morning: [],
      afternoon: [],
      evening: [],
      night: [],
    };
    
    medications.forEach((med) => {
      med.times.forEach((time) => {
        schedule[time].push(med);
      });
    });
    
    return schedule;
  };

  const schedule = getScheduleByTime();

  return (
    <div className="min-h-screen flex flex-col bg-background safe-layout">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center mb-4">
          <button
            onClick={onBack}
            className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="flex-1 text-center text-h2 text-foreground font-semibold">
            Medications
          </h1>
          <button
            onClick={onAddMedication}
            className="p-2 -mr-2 text-accent hover:text-accent/80 transition-colors"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-24 overflow-y-auto">
        {medications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col items-center justify-center py-16"
          >
            <span className="text-6xl mb-4">💊</span>
            <h2 className="text-h2 text-foreground mb-2">No medications yet</h2>
            <p className="text-body text-muted-foreground text-center mb-6">
              Add your medications to track and get reminders
            </p>
            <CTAButton onClick={onAddMedication}>
              <Plus className="w-5 h-5 mr-2" />
              Add Medication
            </CTAButton>
          </motion.div>
        ) : (
          <>
            {/* Today's Schedule Overview */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <h2 className="text-helper-lg text-muted-foreground uppercase tracking-wide mb-3">
                Today's Schedule
              </h2>
              <div className="grid grid-cols-4 gap-2">
                {timeOptions.map((time) => {
                  const medsAtTime = schedule[time.id];
                  return (
                    <div 
                      key={time.id}
                      className="glass-card p-3 text-center"
                    >
                      <span className="text-xl">{time.icon}</span>
                      <p className="text-helper text-muted-foreground mt-1">{time.label}</p>
                      <p className="text-h2 text-foreground font-bold">{medsAtTime.length}</p>
                    </div>
                  );
                })}
              </div>
            </motion.section>

            {/* Medication List */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-helper-lg text-muted-foreground uppercase tracking-wide mb-3">
                Your Medications
              </h2>
              <div className="space-y-3">
                {medications.map((med, index) => (
                  <motion.div
                    key={med.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="glass-card overflow-hidden"
                  >
                    {/* Main card content */}
                    <button
                      onClick={() => toggleExpand(med.id)}
                      className="w-full p-4 flex items-center gap-4 text-left"
                    >
                      <div 
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                        style={{ backgroundColor: `${med.color}20` }}
                      >
                        💊
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-body font-semibold text-foreground truncate">
                          {med.name}
                        </h3>
                        <p className="text-helper text-muted-foreground">
                          {med.dosage} • {getFrequencyLabel(med.frequency)}
                        </p>
                        <div className="flex gap-1 mt-1">
                          {med.times.map((time) => (
                            <span 
                              key={time}
                              className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent"
                            >
                              {getTimeLabel(time)}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ChevronRight 
                        className={`w-5 h-5 text-muted-foreground transition-transform ${
                          expandedId === med.id ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                    
                    {/* Expanded actions */}
                    {expandedId === med.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-border"
                      >
                        <div className="p-3 flex gap-2">
                          <button
                            onClick={() => onEditMedication(med)}
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-muted text-foreground hover:bg-muted/80 transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                            <span className="text-helper-lg font-medium">Edit</span>
                          </button>
                          <button
                            onClick={() => onToggleReminder(med.id)}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-colors ${
                              med.reminderEnabled 
                                ? "bg-accent/20 text-accent" 
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {med.reminderEnabled ? (
                              <>
                                <Bell className="w-4 h-4" />
                                <span className="text-helper-lg font-medium">Reminder On</span>
                              </>
                            ) : (
                              <>
                                <BellOff className="w-4 h-4" />
                                <span className="text-helper-lg font-medium">Reminder Off</span>
                              </>
                            )}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </>
        )}
      </div>

      {/* Sticky Log Button */}
      {medications.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent pt-8">
          <CTAButton size="full" onClick={onOpenLog}>
            Log Today's Medications
          </CTAButton>
        </div>
      )}
    </div>
  );
};

export default MedicationHub;
