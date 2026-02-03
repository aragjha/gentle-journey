import { motion } from "framer-motion";
import Header from "@/components/Header";
import CTAButton from "@/components/CTAButton";
import SelectionChip from "@/components/SelectionChip";
import QuestionSlider from "@/components/QuestionSlider";

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
  showSkip?: boolean;
  onSkip?: () => void;
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
  showSkip = false,
  onSkip,
}: OnboardingQuestionProps) => {
  // Show continue button only for multi-select and slider (single auto-advances)
  const showContinueButton = questionType === "multi" || questionType === "slider";

  return (
    <div className="min-h-screen flex flex-col bg-background safe-layout">
      {/* Header with back button */}
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
        <div className="mt-6">
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
        </div>
      </div>

      {/* Sticky CTA - only for multi-select and slider questions */}
      {(showContinueButton || showSkip) && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 px-4 pt-4 pb-6 bg-gradient-to-t from-background via-background to-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="space-y-3">
            {showContinueButton && (
              <CTAButton 
                size="full" 
                onClick={onContinue}
                disabled={!canContinue}
              >
                Continue
              </CTAButton>
            )}
            {showSkip && onSkip && (
              <button
                onClick={onSkip}
                className="w-full py-3 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                Skip onboarding
              </button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default OnboardingQuestion;
