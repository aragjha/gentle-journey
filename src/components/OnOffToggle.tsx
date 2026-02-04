import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, AlertTriangle } from "lucide-react";

interface OnOffToggleProps {
  isOn: boolean;
  onChange: (isOn: boolean) => void;
  label?: string;
  helperText?: string;
}

const OnOffToggle = ({ 
  isOn, 
  onChange, 
  label = "Medicine Effect Status",
  helperText = "OFF switches to quick support mode."
}: OnOffToggleProps) => {
  return (
    <div className="glass-card p-5">
      {/* Label */}
      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
        {label}
      </p>
      
      {/* Toggle Container - Pill shaped segmented control */}
      <div className="relative flex bg-muted rounded-2xl p-1">
        {/* Animated Background Pill */}
        <motion.div
          className={cn(
            "absolute top-1 bottom-1 rounded-xl",
            isOn ? "bg-success" : "bg-warning"
          )}
          initial={false}
          animate={{
            left: isOn ? "4px" : "50%",
            right: isOn ? "50%" : "4px",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />

        {/* ON Button */}
        <motion.button
          onClick={() => onChange(true)}
          className={cn(
            "relative flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-lg transition-colors z-10 min-h-[56px]",
            isOn 
              ? "text-success-foreground" 
              : "text-muted-foreground hover:text-foreground"
          )}
          whileTap={{ scale: 0.98 }}
        >
          <span>ON</span>
          {isOn && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <Check className="w-5 h-5" strokeWidth={3} />
            </motion.div>
          )}
        </motion.button>

        {/* OFF Button */}
        <motion.button
          onClick={() => onChange(false)}
          className={cn(
            "relative flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-lg transition-colors z-10 min-h-[56px]",
            !isOn 
              ? "text-warning-foreground" 
              : "text-muted-foreground hover:text-foreground"
          )}
          whileTap={{ scale: 0.98 }}
        >
          <span>OFF</span>
          {!isOn && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <AlertTriangle className="w-5 h-5" strokeWidth={2.5} />
            </motion.div>
          )}
        </motion.button>
      </div>

      {/* Helper Text */}
      <p className="text-sm text-muted-foreground mt-3 text-center">{helperText}</p>
    </div>
  );
};

export default OnOffToggle;
