import { motion } from "framer-motion";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import OnOffToggle from "@/components/OnOffToggle";
import NeuraEntryCard from "@/components/NeuraEntryCard";
import { Diagnosis } from "@/components/OnboardingFlow";
import { ActiveMigraineTimer } from "@/components/PainHistory";
import { ScriptId } from "@/data/neuraScripts";
import {
  ClipboardCheck,
  BookOpen,
  Brain,
  Activity,
  Phone,
  PhoneCall,
  AlertCircle,
  Zap,
} from "lucide-react";

interface HomeHubProps {
  diagnosis: Diagnosis | null;
  onStartCheckin: () => void;
  onNavigate: (tab: "home" | "maps" | "tools" | "profile") => void;
  onOpenLesson?: () => void;
  onOpenAppointments?: () => void;
  onOpenMedications?: () => void;
  onOpenNeuroGPT?: () => void;
  onOpenNeuraWithScript?: (scriptId: ScriptId | null) => void;
  onOpenDiaries?: () => void;
  onLogHeadache?: () => void;
  activeMigraine?: { startTime: Date } | null;
  onStopMigraine?: () => void;
  headacheCount?: number;
  isOnMode: boolean;
  onToggleMode: (isOn: boolean) => void;
  onOpenTriggerMedication?: () => void;
  onOpenPainRelief?: () => void;
  onOpenTriggerAnalysis?: () => void;
}

const HomeHub = ({
  diagnosis,
  onStartCheckin,
  onNavigate,
  onOpenLesson,
  onOpenNeuroGPT,
  onOpenNeuraWithScript,
  onOpenDiaries,
  onLogHeadache,
  activeMigraine,
  onStopMigraine,
  headacheCount = 0,
  isOnMode,
  onToggleMode,
  onOpenPainRelief,
}: HomeHubProps) => {
  const isMigraine = diagnosis === "migraine";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Neura-first handlers: route through Neura with a pre-loaded script when available,
  // falling back to the legacy standalone flows.
  const handleNeuroGPTClick = onOpenNeuraWithScript
    ? () => onOpenNeuraWithScript(null)
    : (onOpenNeuroGPT ?? (() => {}));
  const handleLogHeadacheClick = onOpenNeuraWithScript
    ? () => onOpenNeuraWithScript("headache-log")
    : (onLogHeadache ?? (() => {}));

  // PD quick actions remain available for the parkinsons branch.
  const pdQuickActions = [
    { id: "checkin", label: "Check-in", icon: ClipboardCheck, bg: "bg-blue-500", onClick: onStartCheckin },
    { id: "diary", label: "Diary", icon: BookOpen, bg: "bg-violet-500", onClick: onOpenDiaries },
    { id: "learn", label: "Learn", icon: Brain, bg: "bg-pink-500", onClick: onOpenLesson },
    { id: "activity", label: "Activity", icon: Activity, bg: "bg-teal-500", onClick: () => {} },
  ];

  const d = 0.03; // animation delay step

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <div className="px-5 pt-3">
        <Header />
      </div>

      <div className="flex-1 px-5 pb-24 overflow-y-auto">
        {/* PD ON/OFF */}
        {diagnosis === "parkinsons" && (
          <motion.div className="mb-3" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <OnOffToggle isOn={isOnMode} onChange={onToggleMode} />
          </motion.div>
        )}

        {/* Greeting */}
        <motion.div className="mb-3" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: d }}>
          <h1 className="text-xl font-bold text-foreground">{getGreeting()}! 👋</h1>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            {isMigraine ? "How's your head today?" : "Ready for your daily routine?"}
          </p>
        </motion.div>

        {/* Neura entry card — primary way to do everything */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: d * 2 }}
        >
          <NeuraEntryCard onOpen={handleNeuroGPTClick} />
        </motion.div>

        {/* MIGRAINE — simplified layout */}
        {isMigraine && (
          <>
            {/* LOG HEADACHE — Bold Primary CTA (fast-access for most common task) */}
            <motion.button
              onClick={handleLogHeadacheClick}
              className="w-full mb-4 flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/20 active:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: d * 3 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 48 48" className="w-9 h-9">
                  <ellipse cx="24" cy="20" rx="16" ry="18" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="2" />
                  <circle cx="18" cy="18" r="1.5" fill="white" />
                  <circle cx="30" cy="18" r="1.5" fill="white" />
                  <line x1="10" y1="10" x2="14" y2="14" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
                  <line x1="12" y1="8" x2="12" y2="14" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
                  <line x1="38" y1="10" x2="34" y2="14" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
                  <line x1="36" y1="8" x2="36" y2="14" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
                  <rect x="20" y="36" width="8" height="5" rx="2" fill="none" stroke="white" strokeWidth="1.5" />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <div className="text-base font-bold leading-tight">Log Headache</div>
                <div className="text-[11px] text-white/80 mt-0.5">Track pain, triggers & symptoms</div>
              </div>
              <Zap className="w-5 h-5 text-yellow-300" />
            </motion.button>

            {/* Active Migraine Timer — only when an attack is in progress */}
            {activeMigraine && onStopMigraine && (
              <motion.div className="mb-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: d * 4 }}>
                <ActiveMigraineTimer
                  startTime={activeMigraine.startTime}
                  onStopTimer={onStopMigraine}
                  onOpenReliefGuide={onOpenPainRelief}
                />
              </motion.div>
            )}
          </>
        )}

        {/* PD — keep existing PD-specific affordances (unchanged) */}
        {diagnosis === "parkinsons" && (
          <motion.section
            className="mb-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: d * 3 }}
          >
            <h2 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">Quick Access</h2>
            <div className="grid grid-cols-4 gap-2">
              {pdQuickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    key={action.id}
                    onClick={action.onClick}
                    className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-card border border-border/50 active:bg-muted transition-colors"
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${action.bg}`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[10px] font-semibold text-foreground">{action.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* Today's Summary — compact and useful, shown for both tracks */}
        <motion.div
          className="mb-4 rounded-2xl bg-card border border-border/50 p-3.5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: d * 5 }}
        >
          <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">Today</h3>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <div className="text-xl font-bold text-foreground">0/1</div>
              <div className="text-[10px] text-muted-foreground">Check-ins</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-foreground">0/3</div>
              <div className="text-[10px] text-muted-foreground">Meds</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-foreground">{headacheCount}</div>
              <div className="text-[10px] text-muted-foreground">{isMigraine ? "Attacks" : "Logs"}</div>
            </div>
          </div>
        </motion.div>

        {/* Emergency Contacts — safety, always visible */}
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: d * 6 }}
        >
          <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-card border border-border/50 active:bg-muted">
            <Phone className="w-3.5 h-3.5 text-accent" />
            <span className="text-[11px] font-semibold text-foreground">Doctor</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-card border border-border/50 active:bg-muted">
            <PhoneCall className="w-3.5 h-3.5 text-accent" />
            <span className="text-[11px] font-semibold text-foreground">Caregiver</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-destructive/10 border border-destructive/20 active:bg-destructive/20">
            <AlertCircle className="w-3.5 h-3.5 text-destructive" />
            <span className="text-[11px] font-semibold text-destructive">911</span>
          </button>
        </motion.div>
      </div>

      <BottomNav activeTab="home" onTabChange={onNavigate} />
    </div>
  );
};

export default HomeHub;
