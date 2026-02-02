import { motion } from "framer-motion";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import HeroCard from "@/components/HeroCard";

interface ToolsHubProps {
  onNavigate: (tab: "home" | "maps" | "tools" | "profile") => void;
  onStartCheckin: () => void;
  onOpenChat: () => void;
}

const tools = [
  { id: "diaries", title: "Diaries", subtitle: "Track daily symptoms", icon: "📓" },
  { id: "chat", title: "Talk to Neura", subtitle: "Ask anything about PD", icon: "💬" },
  { id: "medication", title: "Medication Log", subtitle: "Track your meds", icon: "💊", comingSoon: true },
  { id: "activity", title: "Activity Tracker", subtitle: "Log exercise & movement", icon: "🏃", comingSoon: true },
  { id: "appointments", title: "Appointments", subtitle: "Prep for doctor visits", icon: "📅", comingSoon: true },
];

const ToolsHub = ({ onNavigate, onStartCheckin, onOpenChat }: ToolsHubProps) => {
  const handleToolClick = (toolId: string) => {
    if (toolId === "diaries") {
      onStartCheckin();
    } else if (toolId === "chat") {
      onOpenChat();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="px-4 pt-safe-top">
        <Header showSpeaker={false} />
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-24 overflow-y-auto">
        <motion.h1
          className="text-h1-lg text-foreground mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Tools 🛠️
        </motion.h1>

        <div className="space-y-3">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative"
            >
              <HeroCard
                title={tool.title}
                subtitle={tool.subtitle}
                icon={tool.icon}
                onClick={() => handleToolClick(tool.id)}
                variant={tool.id === "diaries" ? "primary" : "secondary"}
              />
              {tool.comingSoon && (
                <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] rounded-3xl flex items-center justify-center">
                  <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-helper-lg font-medium">
                    Coming Soon
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <BottomNav activeTab="tools" onTabChange={onNavigate} />
    </div>
  );
};

export default ToolsHub;
