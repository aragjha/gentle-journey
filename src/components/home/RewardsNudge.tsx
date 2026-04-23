import { Trophy, ChevronRight } from "lucide-react";

interface RewardsNudgeProps {
  pointsToNext?: number;
  nextTierName?: string;
  perk?: string;
  onClick?: () => void;
}

const RewardsNudge = ({
  pointsToNext = 20,
  nextTierName = "Trigger Sleuth",
  perk = "$10 gift card + clinician badge",
  onClick,
}: RewardsNudgeProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-[20px] p-4 flex items-center gap-3.5 text-left active:scale-[0.99] transition-transform"
      style={{
        background: "var(--gold-soft)",
        border: "1px solid var(--gold)",
      }}
    >
      <div
        className="w-11 h-11 rounded-2xl text-white flex items-center justify-center shrink-0"
        style={{
          background: "linear-gradient(135deg, #FFB547, var(--gold))",
          boxShadow: "0 4px 10px rgba(232,168,56,0.35)",
        }}
      >
        <Trophy className="w-[22px] h-[22px]" strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-bold" style={{ color: "var(--gold)" }}>
          {pointsToNext} pts to &ldquo;{nextTierName}&rdquo;
        </div>
        <div className="text-[11px] mt-0.5 truncate text-foreground/80">{perk}</div>
      </div>
      <ChevronRight className="w-[18px] h-[18px] shrink-0 text-muted-foreground" />
    </button>
  );
};

export default RewardsNudge;
