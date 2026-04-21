import { useState } from "react";
import {
  Sparkles,
  CloudRain,
  Calendar,
  BookOpen,
  ClipboardCheck,
  Pill,
  FileText,
} from "lucide-react";
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
    id: "pattern-found",
    label: "Pattern Insights",
    description: "Tell me when you find a new trigger pattern",
    icon: Sparkles,
    enabled: true,
  },
  {
    id: "weather-alert",
    label: "Weather Alerts",
    description: "Warn me when weather could trigger a migraine",
    icon: CloudRain,
    enabled: true,
  },
  {
    id: "cycle-alert",
    label: "Cycle Alerts",
    description: "Remind me before high-risk menstrual days",
    icon: Calendar,
    enabled: true,
  },
  {
    id: "diary-nudge",
    label: "Diary Nudges",
    description: "Remind me if I haven't logged in a few days",
    icon: BookOpen,
    enabled: true,
  },
  {
    id: "daily-checkin",
    label: "Daily Check-in",
    description: "Morning check-in reminder",
    icon: ClipboardCheck,
    enabled: true,
  },
  {
    id: "medication",
    label: "Medication Reminders",
    description: "Remind me to take my meds on time",
    icon: Pill,
    enabled: true,
  },
  {
    id: "weekly-summary",
    label: "Weekly Pattern Report",
    description: "Send me a weekly summary of trends",
    icon: FileText,
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
