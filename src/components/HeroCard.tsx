import { motion } from "framer-motion";
import { ChevronRight, Clock, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroCardProps {
  title: string;
  subtitle?: string;
  helper?: string;
  xp?: number;
  duration?: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
  completed?: boolean;
}

const HeroCard = ({
  title,
  subtitle,
  helper,
  xp,
  duration,
  onClick,
  variant = "primary",
  icon,
  completed = false
}: HeroCardProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "w-full text-left glass-card relative overflow-hidden",
        variant === "primary" && "bg-gradient-to-br from-accent/20 to-accent/5 border-accent/30",
        completed && "opacity-70"
      )}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        {icon && (
          <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-2xl shrink-0">
            {icon}
          </div>
        )}

        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className="text-h2 text-foreground mb-1">
            {title}
            {completed && " ✅"}
          </h3>

          {/* Meta info */}
          <div className="flex items-center gap-3 text-helper text-muted-foreground mb-2">
            {duration && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {duration}
              </span>
            )}
            {xp && (
              <span className="flex items-center gap-1 text-xp">
                <Star className="w-3.5 h-3.5" />
                +{xp} XP
              </span>
            )}
          </div>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-body-lg text-muted-foreground">
              {subtitle}
            </p>
          )}

          {/* Helper */}
          {helper && (
            <p className="text-helper text-accent mt-2">
              {helper}
            </p>
          )}
        </div>

        {/* Arrow */}
        <ChevronRight className="w-6 h-6 text-muted-foreground shrink-0 mt-1" />
      </div>
    </motion.button>
  );
};

export default HeroCard;
