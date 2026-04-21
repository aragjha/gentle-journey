import { motion } from "framer-motion";
import { Gift, ChevronRight } from "lucide-react";
import { RewardState } from "@/data/rewardProgressEngine";

interface RewardProgressCardProps {
  state: RewardState;
  onOpenRewards?: () => void;
}

const RewardProgressCard = ({ state, onOpenRewards }: RewardProgressCardProps) => {
  const { currentWeek, nextMilestone } = state;

  if (!nextMilestone) {
    // All tiers earned
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-card border border-border p-4 shadow-sm-soft"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
            <Gift className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-foreground">All rewards earned</h3>
            <p className="text-xs text-muted-foreground">You've unlocked every tier. Legend.</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
      onClick={onOpenRewards}
      className="w-full text-left rounded-2xl bg-card border border-border p-4 shadow-sm-soft"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
          <Gift className="w-5 h-5 text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-foreground">Reward Progress</h3>
          <p className="text-xs text-muted-foreground">
            {currentWeek.checkinsCount}/7 check-ins · {currentWeek.diaryCount}/2 diary entries this week
          </p>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
      </div>

      <div className="rounded-xl bg-accent/5 border border-accent/20 p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Next reward</span>
          <span className="text-sm font-bold text-accent">${nextMilestone.amount} Amazon gift card</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${Math.min(100, (state.progressTowardNext.current / state.progressTowardNext.target) * 100)}%`,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
        <p className="text-[10px] text-muted-foreground mt-1.5">
          {state.progressTowardNext.current} / {state.progressTowardNext.target}{" "}
          {nextMilestone.requirementType === "consecutive-weeks" ? "consecutive weeks" : nextMilestone.requirementType === "total-weeks" ? "total weeks" : "complete week"}
        </p>
      </div>
    </motion.button>
  );
};

export default RewardProgressCard;
