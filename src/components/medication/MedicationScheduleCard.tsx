import { motion } from "framer-motion";
import { Check, X, Clock } from "lucide-react";
import { Medication, getTypeIcon, formatDosage } from "@/data/medicationContent";

interface ScheduleItem {
  medication: Medication;
  status: "pending" | "taken" | "skipped";
}

interface MedicationScheduleCardProps {
  time: { id: string; label: string; time: string; icon: string };
  items: ScheduleItem[];
  onLogMedication: (medId: string, status: "taken" | "skipped") => void;
}

const MedicationScheduleCard = ({ 
  time, 
  items, 
  onLogMedication 
}: MedicationScheduleCardProps) => {
  if (items.length === 0) return null;

  const allLogged = items.every(item => item.status !== "pending");
  const takenCount = items.filter(item => item.status === "taken").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card overflow-hidden ${allLogged ? "opacity-75" : ""}`}
    >
      {/* Time Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border/50">
        <span className="text-2xl">{time.icon}</span>
        <div className="flex-1">
          <h3 className="text-body font-semibold text-foreground">{time.label}</h3>
          <p className="text-helper text-muted-foreground">{time.time}</p>
        </div>
        {allLogged && (
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-success/20 text-success">
            <Check className="w-4 h-4" />
            <span className="text-helper font-medium">{takenCount}/{items.length}</span>
          </div>
        )}
        {!allLogged && (
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-muted text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-helper font-medium">{items.length} meds</span>
          </div>
        )}
      </div>

      {/* Medication Items */}
      <div className="divide-y divide-border/50">
        {items.map((item) => (
          <div 
            key={item.medication.id} 
            className={`p-4 ${item.status !== "pending" ? "bg-muted/30" : ""}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ backgroundColor: `${item.medication.color}20` }}
              >
                {getTypeIcon(item.medication.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-body font-medium text-foreground truncate">
                  {item.medication.name}
                </h4>
                <p className="text-helper text-muted-foreground">
                  {formatDosage(item.medication.dosage, item.medication.quantity, item.medication.type)}
                </p>
              </div>
              {item.status === "taken" && (
                <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
              {item.status === "skipped" && (
                <div className="w-8 h-8 rounded-full bg-muted-foreground flex items-center justify-center">
                  <X className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* Quick Action Buttons */}
            {item.status === "pending" && (
              <div className="flex gap-2">
                <button
                  onClick={() => onLogMedication(item.medication.id, "taken")}
                  className="flex-1 py-2.5 rounded-xl bg-success/20 text-success hover:bg-success/30 transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span className="text-sm font-medium">Taken</span>
                </button>
                <button
                  onClick={() => onLogMedication(item.medication.id, "skipped")}
                  className="flex-1 py-2.5 rounded-xl bg-muted text-muted-foreground hover:bg-muted/80 transition-colors flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  <span className="text-sm font-medium">Skip</span>
                </button>
              </div>
            )}

            {/* Undo Option */}
            {item.status !== "pending" && (
              <button
                onClick={() => onLogMedication(item.medication.id, item.status === "taken" ? "skipped" : "taken")}
                className="text-helper text-accent hover:underline"
              >
                Change to {item.status === "taken" ? "skipped" : "taken"}
              </button>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default MedicationScheduleCard;