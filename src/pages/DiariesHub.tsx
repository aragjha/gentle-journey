import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import GamificationBar from "@/components/GamificationBar";
import HeroCard from "@/components/HeroCard";
import DiaryTile from "@/components/DiaryTile";
import BottomNav from "@/components/BottomNav";

interface DiariesHubProps {
  onStartCheckin: () => void;
  onNavigate: (tab: "home" | "maps" | "tools" | "profile") => void;
}

const allDiaries = [
  { id: "movement", title: "Movement", icon: "🏃" },
  { id: "sleep", title: "Sleep", icon: "😴" },
  { id: "mood", title: "Mood", icon: "💭" },
  { id: "memory", title: "Attention & Memory", icon: "🧠" },
  { id: "digestion", title: "Digestion & Gut", icon: "🥗" },
  { id: "pain", title: "Pain", icon: "🩹" },
  { id: "bladder", title: "Bladder", icon: "💧" },
  { id: "nonmotor", title: "Non-motor", icon: "📋" },
  { id: "medication", title: "Medication Log", icon: "💊" },
];

const DiariesHub = ({ onStartCheckin, onNavigate }: DiariesHubProps) => {
  const [todayCompleted, setTodayCompleted] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="px-4 pt-safe-top">
        <Header showSpeaker={false} />
      </div>

      {/* Gamification Bar */}
      <GamificationBar streak={1} xp={245} level={3} />

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
            subtitle={todayCompleted ? "Great job keeping your streak!" : "Quick symptom check"}
            helper={todayCompleted ? undefined : "Keeps your streak alive 🔥"}
            duration={todayCompleted ? undefined : "~3 mins"}
            xp={todayCompleted ? undefined : 25}
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
            {allDiaries.map((diary, index) => (
              <DiaryTile
                key={diary.id}
                title={diary.title}
                icon={diary.icon}
                onClick={() => {}}
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
