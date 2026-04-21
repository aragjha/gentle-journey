import { motion } from "framer-motion";
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
  type = "success",
}: GratificationScreenProps) => {
  const icons = {
    success: Check,
    celebration: Sparkles,
    milestone: Star,
  };
  const Icon = icons[type];

  return (
    <div
      className="min-h-[100dvh] flex flex-col text-foreground"
      style={{
        background:
          "linear-gradient(180deg, hsl(var(--background)) 0%, var(--accent-soft, hsl(var(--accent) / 0.1)) 100%)",
      }}
    >
      <div className="flex-1 px-7 pt-10 pb-5 flex flex-col items-center justify-center text-center">
        <motion.div
          className="relative mb-7"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.2, 0.9, 0.3, 1.3] }}
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-white"
            style={{
              background: "linear-gradient(135deg, #16A34A 0%, #3B82F6 100%)",
              boxShadow: "0 20px 50px rgba(22,163,74,0.35)",
            }}
          >
            <Icon className="w-12 h-12" strokeWidth={3} />
          </div>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: "50%",
                top: "50%",
                marginLeft: -4,
                marginTop: -4,
                background: "linear-gradient(135deg, #FF9B5A, #FF6B5C)",
              }}
              initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                x: Math.cos((i * 60 * Math.PI) / 180) * 72,
                y: Math.sin((i * 60 * Math.PI) / 180) * 72,
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1.2,
                delay: 0.35 + i * 0.08,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>

        <motion.h1
          className="text-[36px] font-medium tracking-tight leading-[1.05] text-foreground m-0 mb-3"
          style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            className="text-[15.5px] text-muted-foreground max-w-[300px] leading-[1.5]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      <motion.div
        className="px-6 pb-10 pt-2"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <button
          onClick={onContinue}
          className="w-full h-14 rounded-[28px] border-0 cursor-pointer text-white text-base font-bold flex items-center justify-center active:scale-[0.98] transition-transform"
          style={{
            background: "linear-gradient(135deg, #1B2A4E 0%, #3B82F6 100%)",
            boxShadow: "0 8px 22px rgba(59,130,246,0.32)",
          }}
        >
          {ctaText}
        </button>
      </motion.div>
    </div>
  );
};

export default GratificationScreen;
