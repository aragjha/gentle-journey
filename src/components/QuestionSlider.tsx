import { useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";

interface QuestionSliderProps {
  min?: number;
  max?: number;
  value: number;
  onChange: (value: number) => void;
  labels?: { min: string; max: string };
  showValue?: boolean;
}

const QuestionSlider = ({ 
  min = 0, 
  max = 10, 
  value, 
  onChange,
  labels = { min: "Not at all", max: "Very much" },
  showValue = true
}: QuestionSliderProps) => {
  const getEmoji = (val: number) => {
    const percent = val / max;
    if (percent <= 0.2) return "😊";
    if (percent <= 0.4) return "🙂";
    if (percent <= 0.6) return "😐";
    if (percent <= 0.8) return "😕";
    return "😔";
  };

  return (
    <motion.div 
      className="w-full space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {showValue && (
        <div className="text-center">
          <motion.span
            key={value}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl"
          >
            {getEmoji(value)}
          </motion.span>
          <motion.p
            key={`val-${value}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-bold text-foreground mt-2"
          >
            {value}
          </motion.p>
        </div>
      )}

      <Slider
        value={[value]}
        onValueChange={(vals) => onChange(vals[0])}
        min={min}
        max={max}
        step={1}
        className="w-full"
      />

      <div className="flex justify-between text-helper text-muted-foreground">
        <span>{labels.min}</span>
        <span>{labels.max}</span>
      </div>
    </motion.div>
  );
};

export default QuestionSlider;
