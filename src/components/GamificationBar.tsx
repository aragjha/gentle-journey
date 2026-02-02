import { Flame, Star, Award } from "lucide-react";
import { motion } from "framer-motion";

interface GamificationBarProps {
  streak: number;
  xp: number;
  level: number;
}

const GamificationBar = ({ streak, xp, level }: GamificationBarProps) => {
  return (
    <motion.div 
      className="flex items-center justify-center gap-4 py-3"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      {/* Streak */}
      <div className="badge-streak">
        <Flame className="w-4 h-4" />
        <span>{streak}</span>
      </div>

      {/* XP */}
      <div className="badge-xp">
        <Star className="w-4 h-4" />
        <span>{xp} XP</span>
      </div>

      {/* Level */}
      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-sm font-bold">
        <Award className="w-4 h-4" />
        <span>Lv {level}</span>
      </div>
    </motion.div>
  );
};

export default GamificationBar;
