import { useState } from "react";
import { Bell, Clock, Pill, ClipboardCheck, Calendar, Brain } from "lucide-react";
import { motion } from "framer-motion";

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  enabled: boolean;
}

const defaultSettings: NotificationSetting[] = [
  {
    id: "daily-checkin",
    label: "Daily Check-in Reminder",
    description: "Remind me to check in every day",
    icon: ClipboardCheck,
    enabled: true,
  },
  {
    id: "medication",
    label: "Medication Reminders",
    description: "Remind me to take my medications",
    icon: Pill,
    enabled: true,
  },
  {
    id: "diary",
    label: "Diary Prompts",
    description: "Encourage me to complete diary entries",
    icon: Brain,
    enabled: true,
  },
  {
    id: "appointments",
    label: "Appointment Reminders",
    description: "Notify before upcoming appointments",
    icon: Calendar,
    enabled: true,
  },
  {
    id: "streak",
    label: "Streak Alerts",
    description: "Warn me before I lose my streak",
    icon: Clock,
    enabled: false,
  },
  {
    id: "weekly-insights",
    label: "Weekly Insights",
    description: "Summary of my weekly patterns",
    icon: Bell,
    enabled: true,
  },
];

const NotificationSettings = () => {
  const [settings, setSettings] = useState<NotificationSetting[]>(defaultSettings);

  const toggleSetting = (id: string) => {
    setSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  return (
    <div className="space-y-2">
      {settings.map((setting) => {
        const Icon = setting.icon;
        return (
          <div
            key={setting.id}
            className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/50"
          >
            <Icon className="w-5 h-5 text-accent shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-foreground">{setting.label}</div>
              <div className="text-xs text-muted-foreground">{setting.description}</div>
            </div>
            <button
              onClick={() => toggleSetting(setting.id)}
              className={`relative w-10 h-6 rounded-full transition-colors shrink-0 ${
                setting.enabled ? "bg-accent" : "bg-muted"
              }`}
            >
              <motion.div
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm"
                animate={{ left: setting.enabled ? 18 : 2 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationSettings;
