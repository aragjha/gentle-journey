import { motion } from "framer-motion";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { User, Settings, Bell, Shield, HelpCircle, LogOut, ChevronRight, Award, Flame, Star } from "lucide-react";

interface ProfilePageProps {
  onNavigate: (tab: "home" | "maps" | "tools" | "profile") => void;
}

const menuItems = [
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy & Sharing", icon: Shield },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "help", label: "Help & Support", icon: HelpCircle },
];

const ProfilePage = ({ onNavigate }: ProfilePageProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="px-4 pt-safe-top">
        <Header showSpeaker={false} />
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-24 overflow-y-auto">
        {/* Profile Card */}
        <motion.div
          className="glass-card flex flex-col items-center text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-4">
            <User className="w-10 h-10 text-accent" />
          </div>
          <h1 className="text-h2 text-foreground mb-1">NeuraChamp User</h1>
          <p className="text-body text-muted-foreground mb-4">Member since Feb 2026</p>

          {/* Stats */}
          <div className="flex gap-6 pt-4 border-t border-border w-full justify-center">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-streak">
                <Flame className="w-5 h-5" />
                <span className="text-h2 font-bold">7</span>
              </div>
              <p className="text-helper text-muted-foreground">Day streak</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-xp">
                <Star className="w-5 h-5" />
                <span className="text-h2 font-bold">245</span>
              </div>
              <p className="text-helper text-muted-foreground">Total XP</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-accent">
                <Award className="w-5 h-5" />
                <span className="text-h2 font-bold">3</span>
              </div>
              <p className="text-helper text-muted-foreground">Level</p>
            </div>
          </div>
        </motion.div>

        {/* Menu Items */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                className="w-full glass-card flex items-center gap-4 p-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Icon className="w-5 h-5 text-muted-foreground" />
                <span className="flex-1 text-left text-body font-medium text-foreground">
                  {item.label}
                </span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </motion.button>
            );
          })}
        </motion.div>

        {/* Logout */}
        <motion.button
          className="w-full mt-6 flex items-center justify-center gap-2 py-4 text-destructive font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </motion.button>
      </div>

      {/* Bottom Nav */}
      <BottomNav activeTab="profile" onTabChange={onNavigate} />
    </div>
  );
};

export default ProfilePage;
