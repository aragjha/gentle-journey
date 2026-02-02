import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Play, MessageCircle, ChevronRight, ExternalLink } from "lucide-react";
import NeuroQuerySheet from "@/components/NeuroQuerySheet";
import { type LessonNode } from "@/data/lessonContent";

interface LessonDetailPageProps {
  node: LessonNode;
  onBack: () => void;
}

const LessonDetailPage = ({ node, onBack }: LessonDetailPageProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-3 pt-safe-top flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex-1">
            <p className="text-helper text-muted-foreground">{node.stage}</p>
            <h1 className="text-h3 text-foreground line-clamp-1">{node.title}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Video Placeholder */}
        <motion.div
          className="mx-4 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="relative aspect-video bg-muted rounded-2xl overflow-hidden border border-border">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                <Play className="w-8 h-8 text-accent ml-1" />
              </div>
              <p className="text-body text-muted-foreground text-center px-4">
                {node.videoTitle || "Video coming soon"}
              </p>
            </div>
            {/* YouTube branding hint */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 px-2 py-1 rounded">
              <div className="w-5 h-4 bg-red-600 rounded-sm flex items-center justify-center">
                <Play className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs text-white/80">YouTube</span>
            </div>
          </div>
        </motion.div>

        {/* About this station */}
        {node.aboutStation && (
          <motion.section
            className="mx-4 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-h3 text-foreground mb-2">About this topic</h2>
            <p className="text-body text-muted-foreground leading-relaxed">
              {node.aboutStation}
            </p>
          </motion.section>
        )}

        {/* Action to take */}
        {node.actionToTake && (
          <motion.section
            className="mx-4 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <h2 className="text-h3 text-foreground mb-2">What you can do</h2>
            <div className="glass-card bg-accent/5 border-accent/20">
              <p className="text-body text-foreground leading-relaxed">
                {node.actionToTake}
              </p>
            </div>
          </motion.section>
        )}

        {/* Questions for care team */}
        {node.questionsForTeam && node.questionsForTeam.length > 0 && (
          <motion.section
            className="mx-4 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-h3 text-foreground mb-3">Questions for your care team</h2>
            <div className="space-y-2">
              {node.questionsForTeam.map((question, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-xl bg-muted/50"
                >
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-helper-lg font-semibold text-accent">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-body text-foreground">{question}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* NeuroQuery prompts preview */}
        {node.neuroQueryPrompts && node.neuroQueryPrompts.length > 0 && (
          <motion.section
            className="mx-4 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <h2 className="text-h3 text-foreground mb-3">Dive deeper with NeuroQuery</h2>
            <div className="space-y-2">
              {node.neuroQueryPrompts.slice(0, 3).map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setIsSheetOpen(true)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-accent/50 transition-colors text-left"
                >
                  <MessageCircle className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-body text-foreground flex-1">{prompt}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </motion.section>
        )}

        {/* Additional resources */}
        {node.additionalResources && node.additionalResources.length > 0 && (
          <motion.section
            className="mx-4 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-h3 text-foreground mb-3">Learn more</h2>
            <div className="space-y-2">
              {node.additionalResources.map((resource, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-xl bg-muted/50"
                >
                  <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
                  <p className="text-body text-muted-foreground">{resource}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </div>

      {/* CTAs */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent pt-8 space-y-3">
        <motion.button
          onClick={() => setIsSheetOpen(true)}
          className="w-full py-4 px-6 rounded-2xl bg-accent text-accent-foreground font-semibold text-body-lg flex items-center justify-center gap-3 shadow-lg hover:bg-accent/90 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <MessageCircle className="w-5 h-5" />
          Ask NeuroQuery
        </motion.button>
        <motion.button
          onClick={onBack}
          className="w-full py-3 px-6 rounded-2xl bg-muted text-foreground font-semibold text-body flex items-center justify-center gap-2 hover:bg-muted/80 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Continue
        </motion.button>
      </div>

      {/* NeuroQuery Bottom Sheet */}
      <NeuroQuerySheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        contextTopic={node.title}
        suggestedPrompts={node.neuroQueryPrompts}
      />
    </div>
  );
};

export default LessonDetailPage;
