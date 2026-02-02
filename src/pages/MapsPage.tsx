import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import CTAButton from "@/components/CTAButton";
import { Play, Check, Lock, ChevronRight } from "lucide-react";

interface MapsPageProps {
  onNavigate: (tab: "home" | "maps" | "tools" | "profile") => void;
}

const stages = ["Diagnosis", "Treatment", "Living"];

const mapNodes = [
  { id: "1", title: "What is Parkinson's?", stage: "Diagnosis", status: "done", xp: 10 },
  { id: "2", title: "Common early symptoms", stage: "Diagnosis", status: "done", xp: 10 },
  { id: "3", title: "Getting a diagnosis", stage: "Diagnosis", status: "current", xp: 10 },
  { id: "4", title: "Understanding your team", stage: "Diagnosis", status: "locked", xp: 10 },
  { id: "5", title: "Medication basics", stage: "Treatment", status: "locked", xp: 10 },
  { id: "6", title: "Managing side effects", stage: "Treatment", status: "locked", xp: 10 },
  { id: "7", title: "Daily routines", stage: "Living", status: "locked", xp: 10 },
  { id: "8", title: "Exercise & movement", stage: "Living", status: "locked", xp: 10 },
];

const MapsPage = ({ onNavigate }: MapsPageProps) => {
  const [activeStage, setActiveStage] = useState("Diagnosis");

  const filteredNodes = mapNodes.filter((node) => node.stage === activeStage);
  const currentNode = mapNodes.find((node) => node.status === "current");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="px-4 pt-safe-top">
        <Header showSpeaker={false} />
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-24 overflow-y-auto">
        {/* Title */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-h1-lg text-foreground">Your Journey Map 🗺️</h1>
          <p className="text-body text-muted-foreground">One tiny lesson at a time.</p>
        </motion.div>

        {/* Stage Tabs */}
        <motion.div
          className="flex gap-2 mb-6 overflow-x-auto pb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {stages.map((stage) => (
            <button
              key={stage}
              onClick={() => setActiveStage(stage)}
              className={`px-4 py-2 rounded-full text-helper-lg font-semibold whitespace-nowrap transition-colors ${
                activeStage === stage
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {stage}
            </button>
          ))}
        </motion.div>

        {/* Journey Path */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-border" />

          {/* Nodes */}
          <div className="space-y-4">
            {filteredNodes.map((node, index) => (
              <motion.div
                key={node.id}
                className="relative flex items-start gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                {/* Node Indicator */}
                <div
                  className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                    node.status === "done"
                      ? "bg-success text-success-foreground"
                      : node.status === "current"
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {node.status === "done" ? (
                    <Check className="w-5 h-5" />
                  ) : node.status === "current" ? (
                    <Play className="w-5 h-5" />
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                </div>

                {/* Node Card */}
                <button
                  className={`flex-1 glass-card flex items-center justify-between ${
                    node.status === "locked" && "opacity-50"
                  }`}
                  disabled={node.status === "locked"}
                >
                  <div>
                    <h3 className="text-body-lg font-semibold text-foreground text-left">
                      {node.title}
                    </h3>
                    <p className="text-helper text-muted-foreground">
                      {node.status === "current" && "You're here"}
                      {node.status === "done" && "Completed"}
                      {node.status === "locked" && "Complete previous first"}
                    </p>
                  </div>
                  {node.status !== "locked" && (
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Continue CTA */}
        {currentNode && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <CTAButton size="full" onClick={() => {}}>
              Continue: {currentNode.title}
            </CTAButton>
          </motion.div>
        )}
      </div>

      {/* Bottom Nav */}
      <BottomNav activeTab="maps" onTabChange={onNavigate} />
    </div>
  );
};

export default MapsPage;
