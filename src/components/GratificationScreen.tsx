import { motion } from "framer-motion";
import CTAButton from "./CTAButton";
import { Check, Star, Sparkles } from "lucide-react";

interface GratificationScreenProps {
  title: string;
  subtitle?: string;
  onContinue: () => void;
  ctaText?: string;
  type?: "success" | "celebration" | "milestone";
}

const GratificationScreen = ({
  title,
  subtitle,
  onContinue,
  ctaText = "Continue",
  type = "success"
}: GratificationScreenProps) => {
  const icons = {
    success: Check,
    celebration: Sparkles,
    milestone: Star,
  };
  
  const Icon = icons[type];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Content centered */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
        {/* Animated Icon */}
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2 
          }}
        >
          <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
            >
              <Icon className="w-12 h-12 text-accent" />
            </motion.div>
          </div>
          
          {/* Sparkles animation */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-accent"
              initial={{ 
                opacity: 0,
                x: 0,
                y: 0,
                scale: 0
              }}
              animate={{ 
                opacity: [0, 1, 0],
                x: Math.cos(i * 60 * Math.PI / 180) * 60,
                y: Math.sin(i * 60 * Math.PI / 180) * 60,
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 1,
                delay: 0.5 + i * 0.1,
                ease: "easeOut"
              }}
              style={{
                left: "50%",
                top: "50%",
                marginLeft: -4,
                marginTop: -4
              }}
            />
          ))}
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-h1-lg text-foreground mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            className="text-body text-muted-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Fixed CTA at bottom */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 px-6 pt-4 pb-8 bg-gradient-to-t from-background via-background to-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <CTAButton size="full" onClick={onContinue}>
          {ctaText}
        </CTAButton>
      </motion.div>
    </div>
  );
};

export default GratificationScreen;
