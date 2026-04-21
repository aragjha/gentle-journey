import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, ChevronRight, CheckCircle2, Circle } from "lucide-react";
import { RewardState } from "@/data/rewardProgressEngine";
import { rewardMilestones } from "@/data/rewardMilestones";

interface MyRewardsSectionProps {
  state: RewardState;
}

const MyRewardsSection = ({ state }: MyRewardsSectionProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">My Rewards</h3>

        {/* Header card */}
        <div className="rounded-2xl bg-accent/5 border border-accent/20 p-4 mb-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
              <Gift className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-muted-foreground">Earned so far</div>
              <div className="text-h1 text-foreground">${state.totalEarnedDollars}</div>
              <div className="text-xs text-muted-foreground">in Amazon gift cards</div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Check your email for reward codes. Your tracking helps migraine research.
          </p>
        </div>

        {/* Next milestone teaser */}
        {state.nextMilestone && (
          <div className="rounded-2xl bg-card border border-border p-3 mb-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground">Next reward</div>
                <div className="text-sm font-bold text-foreground">${state.nextMilestone.amount} · {state.nextMilestone.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {state.progressTowardNext.current} / {state.progressTowardNext.target} {state.nextMilestone.requirementType === "first-complete-week" ? "complete week" : "weeks"}
                </div>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-full flex items-center justify-between p-3 rounded-xl bg-card border border-border"
        >
          <span className="text-sm font-semibold text-foreground">View all milestones</span>
          <motion.div animate={{ rotate: expanded ? 90 : 0 }}>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </button>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-2 space-y-2"
          >
            {rewardMilestones.map((milestone) => {
              const earned = state.earnedMilestones.some((m) => m.id === milestone.id);
              return (
                <div
                  key={milestone.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border"
                >
                  {earned ? (
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground shrink-0" />
                  )}
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-foreground">
                      ${milestone.amount} · {milestone.title}
                    </div>
                    <div className="text-xs text-muted-foreground">{milestone.requirement}</div>
                  </div>
                  {earned && (
                    <span className="text-[10px] font-semibold text-success uppercase tracking-wider">Earned</span>
                  )}
                </div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyRewardsSection;
