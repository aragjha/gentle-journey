import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DiaryTileProps {
  title: string;
  icon: string;
  onClick: () => void;
  completed?: boolean;
  delay?: number;
}

const DiaryTile = ({ title, icon, onClick, completed = false, delay = 0 }: DiaryTileProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "w-full aspect-square glass-card flex flex-col items-center justify-center gap-2 p-4",
        completed && "bg-success/10 border-success/30"
      )}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
    >
      <span className="text-3xl">{icon}</span>
      <span className="text-helper-lg text-foreground text-center font-semibold leading-tight">
        {title}
      </span>
      {completed && (
        <span className="text-xs text-success font-medium">Done</span>
      )}
    </motion.button>
  );
};

export default DiaryTile;
