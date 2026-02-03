import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import HeroCard from "@/components/HeroCard";
import DiaryTile from "@/components/DiaryTile";
import BottomNav from "@/components/BottomNav";
import { diaryCategories } from "@/data/diaryContent";

interface DiariesHubProps {
  onStartCheckin: () => void;
  onNavigate: (tab: "home" | "maps" | "tools" | "profile") => void;
  onOpenDiary: (diaryId: string) => void;
}

const DiariesHub = ({ onStartCheckin, onNavigate, onOpenDiary }: DiariesHubProps) => {
  const [todayCompleted, setTodayCompleted] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="px-4 pt-safe-top">
        <Header />
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-24 overflow-y-auto">
        {/* Title */}
        <motion.h1
          className="text-h1-lg text-foreground mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Diaries 📓
        </motion.h1>

        {/* Today's Recommended */}
        <motion.section
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-helper-lg text-muted-foreground uppercase tracking-wide mb-3">
            Today's recommended
          </h2>
          <HeroCard
            title={todayCompleted ? "You're done for today ✅" : "Today's Check-in"}
            subtitle={todayCompleted ? "Great job today!" : "Quick symptom check"}
            helper={todayCompleted ? undefined : "Build healthy habits daily"}
            duration={todayCompleted ? undefined : "~3 mins"}
            icon="📝"
            onClick={onStartCheckin}
            variant="primary"
            completed={todayCompleted}
          />
        </motion.section>

        {/* All Diaries */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-h2 text-foreground mb-4">All Diaries</h2>
          <div className="grid grid-cols-3 gap-3">
            {diaryCategories.map((diary, index) => (
              <DiaryTile
                key={diary.id}
                title={diary.title}
                icon={diary.icon}
                onClick={() => onOpenDiary(diary.id)}
                delay={0.05 * index}
              />
            ))}
          </div>
        </motion.section>

        {/* History Preview */}
        <motion.section
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-h2 text-foreground mb-4">Recent Entries</h2>
          <div className="glass-card">
            <p className="text-muted-foreground text-body text-center py-4">
              Complete your first check-in to see history here
            </p>
          </div>
        </motion.section>
      </div>

      {/* Bottom Nav */}
      <BottomNav activeTab="tools" onTabChange={onNavigate} />
    </div>
  );
};

export default DiariesHub;
