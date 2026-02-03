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
  label = "Right now I'm:",
  helperText = "OFF switches to quick support mode."
}: OnOffToggleProps) => {
  return (
    <div className="w-full">
      {/* Label */}
      <p className="text-body font-semibold text-foreground mb-2">{label}</p>
      
      {/* Toggle Pills */}
      <div className="flex gap-2 mb-2">
        {/* ON Pill */}
        <motion.button
          onClick={() => onChange(true)}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-base transition-all duration-200 min-h-[48px]",
            isOn 
              ? "bg-success text-success-foreground shadow-md" 
              : "bg-muted text-muted-foreground border-2 border-border hover:border-success/50"
          )}
          whileTap={{ scale: 0.98 }}
        >
          <span>ON</span>
          {isOn && <Check className="w-5 h-5" />}
        </motion.button>

        {/* OFF Pill */}
        <motion.button
          onClick={() => onChange(false)}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-base transition-all duration-200 min-h-[48px]",
            !isOn 
              ? "bg-warning text-warning-foreground shadow-md" 
              : "bg-muted text-muted-foreground border-2 border-border hover:border-warning/50"
          )}
          whileTap={{ scale: 0.98 }}
        >
          <span>OFF</span>
          {!isOn && <AlertTriangle className="w-5 h-5" />}
        </motion.button>
      </div>

      {/* Helper Text */}
      <p className="text-sm text-muted-foreground">{helperText}</p>
    </div>
  );
};

export default OnOffToggle;
