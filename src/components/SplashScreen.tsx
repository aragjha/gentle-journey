import { motion, AnimatePresence } from "framer-motion";
import CTAButton from "@/components/CTAButton";
import logoLight from "@/assets/logo-light.png";
interface SplashScreenProps {
  step: 1 | 2 | 3;
  onContinue: () => void;
}
const splashContent = [{
  emoji: "🧠",
  title: "Your Parkinson's companion",
  subtitle: "Clinically-guided daily routines designed for you—without overwhelm."
}, {
  emoji: "📊",
  title: "Track what matters",
  subtitle: "Quick 2-minute check-ins that help you understand your symptoms and patterns."
}, {
  emoji: "🎯",
  title: "Build tiny habits",
  subtitle: "One small step each day. Watch your streak grow and celebrate every win."
}];
const SplashScreen = ({
  step,
  onContinue
}: SplashScreenProps) => {
  const content = splashContent[step - 1];

  // Screen 1: Logo + Slogan only
  if (step === 1) {
    return <div className="min-h-screen flex flex-col bg-background">
        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          {/* Logo - centered and larger */}
          <motion.img src={logoLight} alt="NeuraChamp" className="w-64 max-w-[80vw] h-auto" initial={{
          opacity: 0,
          scale: 0.8
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 200
        }} />

          {/* Slogan below logo */}
          <motion.p className="text-sm tracking-[0.25em] uppercase mt-4 text-primary-foreground font-bold" initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.4,
          duration: 0.4
        }}>
            NEURO CARE REDEFINED
          </motion.p>
        </div>

        {/* CTA */}
        <div className="px-6 pb-safe-bottom mb-8">
          <CTAButton size="full" onClick={onContinue}>
            Continue
          </CTAButton>
        </div>
      </div>;
  }

  // Screens 2 & 3: Value props
  return <div className="min-h-screen flex flex-col bg-background">
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{
          opacity: 0,
          x: 50
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: -50
        }} transition={{
          duration: 0.3
        }} className="flex flex-col items-center">
            {/* Emoji */}
            <motion.span className="text-7xl mb-8" initial={{
            scale: 0
          }} animate={{
            scale: 1
          }} transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
            delay: 0.1
          }}>
              {content.emoji}
            </motion.span>

            {/* Title */}
            <motion.h1 className="text-h1-lg text-foreground mb-4" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2
          }}>
              {content.title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p className="text-body-lg text-muted-foreground max-w-xs" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.3
          }}>
              {content.subtitle}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-6">
        {[1, 2, 3].map(dot => <motion.div key={dot} className={`w-2 h-2 rounded-full transition-colors ${dot === step ? "bg-accent" : "bg-muted"}`} initial={{
        scale: 0
      }} animate={{
        scale: 1
      }} transition={{
        delay: dot * 0.1
      }} />)}
      </div>

      {/* CTA */}
      <div className="px-6 pb-safe-bottom mb-8">
        <CTAButton size="full" onClick={onContinue}>
          {step === 3 ? "Get Started" : "Continue"}
        </CTAButton>
      </div>
    </div>;
};
export default SplashScreen;