import { motion } from "framer-motion";
import Header from "@/components/Header";
import CTAButton from "@/components/CTAButton";
import SelectionChip from "@/components/SelectionChip";
import QuestionSlider from "@/components/QuestionSlider";
import { Mic } from "lucide-react";

interface OnboardingQuestionProps {
  progress: number;
  totalSteps: number;
  title: string;
  helper?: string;
  questionType: "single" | "multi" | "slider";
  options?: Array<{ id: string; label: string; icon?: string }>;
  selectedValues: string[];
  sliderValue?: number;
  onSelect: (id: string) => void;
  onSliderChange?: (value: number) => void;
  onContinue: () => void;
  canContinue: boolean;
  showBackButton?: boolean;
  onBack?: () => void;
}

const OnboardingQuestion = ({
  progress,
  totalSteps,
  title,
  helper,
  questionType,
  options = [],
  selectedValues,
  sliderValue = 5,
  onSelect,
  onSliderChange,
  onContinue,
  canContinue,
  showBackButton = false,
  onBack,
}: OnboardingQuestionProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background safe-layout">
      {/* Header */}
      <Header 
        showProgress 
        progress={progress} 
        totalSteps={totalSteps}
        showBackButton={showBackButton}
        onBack={onBack}
      />

      {/* Question Content */}
      <div className="flex-1 pt-8">
        {/* Title */}
        <motion.h1
          className="text-h1-lg text-foreground mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {title}
        </motion.h1>

        {/* Helper */}
        {helper && (
          <motion.p
            className="text-body text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {helper}
          </motion.p>
        )}

        {/* Answer Area */}
        <div className="relative mt-6">
          {/* Slider */}
          {questionType === "slider" && (
            <QuestionSlider
              value={sliderValue}
              onChange={onSliderChange || (() => {})}
            />
          )}

          {/* Chips */}
          {(questionType === "single" || questionType === "multi") && (
            <div className="space-y-3">
              {options.map((option, index) => (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <SelectionChip
                    label={option.label}
                    icon={option.icon}
                    selected={selectedValues.includes(option.id)}
                    onClick={() => onSelect(option.id)}
                    multiSelect={questionType === "multi"}
                  />
                </motion.div>
              ))}
            </div>
          )}

          {/* Mic button (placeholder for V2) */}
          <motion.button
            className="absolute -right-2 top-0 p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors"
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ delay: 0.5 }}
            title="Voice input coming soon"
          >
            <Mic className="w-5 h-5 text-muted-foreground" />
          </motion.button>
        </div>
      </div>

      {/* Sticky CTA */}
      <motion.div
        className="sticky bottom-0 left-0 right-0 pt-4 pb-2 bg-gradient-to-t from-background via-background to-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <CTAButton 
          size="full" 
          onClick={onContinue}
          disabled={!canContinue}
        >
          Continue
        </CTAButton>
      </motion.div>
    </div>
  );
};

export default OnboardingQuestion;
