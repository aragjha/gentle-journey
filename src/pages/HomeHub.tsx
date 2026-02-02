import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import GamificationBar from "@/components/GamificationBar";
import HeroCard from "@/components/HeroCard";
import BottomNav from "@/components/BottomNav";
import DiaryTile from "@/components/DiaryTile";

interface HomeHubProps {
  onStartCheckin: () => void;
  onNavigate: (tab: "home" | "maps" | "tools" | "profile") => void;
}

const regimeSteps = [
  { id: "learn", title: "Today's Lesson", subtitle: "Understanding tremors", duration: "1 min", xp: 10, icon: "📚" },
  { id: "diary", title: "Daily Check-in", subtitle: "How are you today?", duration: "2 min", xp: 25, icon: "📝", isHero: true },
  { id: "log", title: "Log Medication", subtitle: "Quick entry", duration: "30 sec", xp: 5, icon: "💊" },
  { id: "move", title: "Gentle Stretch", subtitle: "1-minute movement", duration: "1 min", xp: 10, icon: "🧘" },
];

const HomeHub = ({ onStartCheckin, onNavigate }: HomeHubProps) => {
  const [streak, setStreak] = useState(1);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [completedToday, setCompletedToday] = useState<string[]>([]);

  const handleStepClick = (stepId: string) => {
    if (stepId === "diary") {
      onStartCheckin();
    }
    // Other steps would navigate to their respective flows
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="px-4 pt-safe-top">
        <Header showSpeaker={false} />
      </div>

      {/* Gamification Bar */}
      <GamificationBar streak={streak} xp={xp} level={level} />

      {/* Content */}
      <div className="flex-1 px-4 pb-24 overflow-y-auto">
        {/* Greeting */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-h1-lg text-foreground">Good morning! 👋</h1>
          <p className="text-body text-muted-foreground">
            Ready for your daily routine?
          </p>
        </motion.div>

        {/* Today's Regime */}
        <motion.section
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-h2 text-foreground mb-4">Today's Regime</h2>
          <div className="space-y-3">
            {regimeSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <HeroCard
                  title={step.title}
                  subtitle={step.subtitle}
                  duration={step.duration}
                  xp={step.xp}
                  icon={step.icon}
                  onClick={() => handleStepClick(step.id)}
                  variant={step.isHero ? "primary" : "secondary"}
                  completed={completedToday.includes(step.id)}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Quick Access Tiles */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-h2 text-foreground mb-4">Quick Access</h2>
          <div className="grid grid-cols-3 gap-3">
            <DiaryTile
              title="Movement"
              icon="🏃"
              onClick={() => {}}
              delay={0.1}
            />
            <DiaryTile
              title="Sleep"
              icon="😴"
              onClick={() => {}}
              delay={0.15}
            />
            <DiaryTile
              title="Mood"
              icon="💭"
              onClick={() => {}}
              delay={0.2}
            />
          </div>
        </motion.section>
      </div>

      {/* Bottom Nav */}
      <BottomNav activeTab="home" onTabChange={onNavigate} />
    </div>
  );
};

export default HomeHub;
