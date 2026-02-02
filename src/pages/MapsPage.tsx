import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import CTAButton from "@/components/CTAButton";
import LessonDetailPage from "@/pages/LessonDetailPage";
import { Play, Check, Lock, ChevronRight } from "lucide-react";

interface MapsPageProps {
  onNavigate: (tab: "home" | "maps" | "tools" | "profile") => void;
}

const stages = ["Diagnosis", "Treatment", "Living"];

export interface LessonNode {
  id: string;
  title: string;
  stage: string;
  status: "done" | "current" | "locked";
  description?: string;
  videoTitle?: string;
  aboutStation?: string;
  actionToTake?: string;
  neuroQueryPrompts?: string[];
  questionsForTeam?: string[];
  additionalResources?: string[];
}

const mapNodes: LessonNode[] = [
  {
    id: "1",
    title: "Recognize Possible Symptoms",
    stage: "Diagnosis",
    status: "done",
    description: "Identifying early motor and non-motor signs that may suggest Parkinson's disease.",
    videoTitle: "What is Parkinson's Disease? (Michael J. Fox Foundation)",
    aboutStation: "Parkinson's disease often starts slowly. Key motor signs include resting tremor, muscular rigidity, bradykinesia (slowness of movement) and postural instability. Non-motor symptoms such as loss of smell, constipation, depression or REM-sleep behaviour disorder may also precede motor symptoms.",
    actionToTake: "Keep a symptom diary noting tremors, stiffness, changes in handwriting, slowness or non-motor problems. Discuss concerns with a trusted family member. If symptoms persist or interfere with daily activities, proceed to seek medical evaluation.",
    neuroQueryPrompts: [
      "Are my tremors only when I'm stressed or also at rest?",
      "Do I have trouble writing or buttoning shirts compared with a year ago?",
      "Am I experiencing other changes (constipation, depression, loss of smell) that might be related?",
    ],
    questionsForTeam: [
      "What symptoms are typical of early PD?",
      "Could my medicines be causing these symptoms?",
      "What lifestyle changes might help while we wait for evaluation?",
    ],
    additionalResources: [
      "National Institute of Neurological Disorders and Stroke (NINDS) PD overview",
      "Family Caregiver Alliance article on prodromal and stage I PD",
    ],
  },
  {
    id: "2",
    title: "Non-Motor Symptoms",
    stage: "Diagnosis",
    status: "done",
    description: "Understanding early non-motor signs that often precede motor symptoms.",
    videoTitle: "Non-motor Symptoms of Parkinson's Disease",
    aboutStation: "Non-motor symptoms such as anosmia (loss of smell), constipation, fatigue, anxiety, depression, and REM sleep behaviour disorder may appear years before motor symptoms. Recognising them can prompt earlier evaluation.",
    actionToTake: "If you or your loved one have unexplained constipation, mood changes or acting out dreams, discuss these symptoms with your doctor. Keep a list to bring to the evaluation.",
    neuroQueryPrompts: [
      "Have I noticed a reduced sense of smell over the past few years?",
      "Do I act out my dreams or flail at night?",
      "Are there sudden drops in blood pressure causing dizziness?",
    ],
    questionsForTeam: [
      "Could these non-motor symptoms be related to Parkinson's or another condition?",
      "Are there treatments to improve sleep and bowel function?",
      "Should I see a sleep specialist or gastroenterologist?",
    ],
    additionalResources: [
      "Parkinson's Foundation information on non-motor symptoms",
    ],
  },
  {
    id: "3",
    title: "Seek Medical Evaluation",
    stage: "Diagnosis",
    status: "current",
    description: "Contact a health professional to discuss symptoms and obtain referrals.",
    videoTitle: "Diagnosis of Parkinson's Disease (Froedtert & MCW Health Network)",
    aboutStation: "In most health systems, you start with a primary care provider. Your GP will review medical history, medication list and perform a neurological exam. They may order blood tests or imaging to exclude other causes and then refer you to a neurologist.",
    actionToTake: "Prepare a list of all medications and supplements (some can cause drug-induced parkinsonism). Bring your symptom diary. Ask for referral to a neurologist or movement disorder specialist.",
    neuroQueryPrompts: [
      "Are my current medications contributing to my symptoms?",
      "What tests can rule out other conditions?",
      "What should I expect from a neurologist visit?",
    ],
    questionsForTeam: [
      "What should I expect from a neurologist visit?",
      "Do I need any imaging before seeing the specialist?",
      "How long is the wait time for a specialist appointment?",
    ],
    additionalResources: [
      "Specialist Link or local health service Parkinson's primary care pathway",
      "Parkinson's Foundation helpline for referrals",
    ],
  },
  {
    id: "4",
    title: "Neurologist Evaluation",
    stage: "Diagnosis",
    status: "locked",
    description: "Comprehensive neurological examination and confirmation of Parkinson's disease.",
    videoTitle: "Stanford Medicine 25: Parkinson's Disease Physical Exam",
    aboutStation: "Diagnosis of PD is clinical; there is no single definitive test. The neurologist will take a detailed history, perform a neurological exam, and may order tests to exclude other disorders.",
    actionToTake: "Answer questions about symptom onset, progression and family history. Bring a family member for second-hand observations. Ask about the diagnosis and prognosis.",
    neuroQueryPrompts: [
      "What criteria are used to diagnose PD?",
      "Do I need a DaTSCAN or other imaging?",
      "Should genetic testing be considered?",
    ],
    questionsForTeam: [
      "How certain are you of the diagnosis?",
      "What symptoms should prompt immediate contact?",
      "When should I schedule follow-up visits?",
    ],
    additionalResources: [
      "NINDS description of PD diagnosis and tests",
      "NICE guideline on confirming PD and annual review by specialists",
    ],
  },
  {
    id: "5",
    title: "First-Line Treatment",
    stage: "Treatment",
    status: "locked",
    description: "Initiate medication to control motor symptoms and improve quality of life.",
    videoTitle: "Medication Treatments for Parkinson's Disease (Parkinson's Foundation)",
    aboutStation: "Once PD is diagnosed and symptoms impact quality of life, pharmacological therapy is recommended. Medications replenish or mimic dopamine to improve movement. Levodopa is the most effective; dopamine agonists and MAO-B inhibitors may be used alone in early disease or added later.",
    actionToTake: "Discuss medication options, benefits and side effects with your specialist. Start with the lowest effective dose and monitor response. Keep a log of symptom improvements and adverse effects.",
    neuroQueryPrompts: [
      "What are the common side effects of levodopa?",
      "How do dopamine agonists differ from levodopa?",
      "What lifestyle changes complement medication?",
    ],
    questionsForTeam: [
      "Which medication is best for my symptoms?",
      "How long before I notice improvement?",
      "What side effects should I watch for?",
    ],
    additionalResources: [
      "Parkinson's Foundation medication guide",
      "NICE guidelines on pharmacological treatment",
    ],
  },
  {
    id: "6",
    title: "Managing Side Effects",
    stage: "Treatment",
    status: "locked",
    description: "Strategies to handle medication side effects and motor fluctuations.",
    videoTitle: "Managing Dyskinesia and Motor Fluctuations",
    aboutStation: "Over time, you may experience motor fluctuations (wearing off) or dyskinesia. Working with your care team to adjust timing, doses or add medications can help manage these challenges.",
    actionToTake: "Keep a detailed diary of when symptoms worsen and when medications are taken. Report any new movements or 'off' periods to your neurologist promptly.",
    neuroQueryPrompts: [
      "Why do my medications seem to wear off before the next dose?",
      "What is dyskinesia and how is it managed?",
      "Should I take my medication with or without food?",
    ],
    questionsForTeam: [
      "How can we adjust my medication timing?",
      "Are there additional medications to smooth out fluctuations?",
      "When should I consider advanced therapies?",
    ],
    additionalResources: [
      "Parkinson's Foundation guide on motor fluctuations",
    ],
  },
  {
    id: "7",
    title: "Daily Routines",
    stage: "Living",
    status: "locked",
    description: "Building structured daily habits to manage symptoms effectively.",
    videoTitle: "Living Well with Parkinson's: Daily Tips",
    aboutStation: "Establishing consistent routines for medication timing, meals, exercise and sleep can improve symptom control and overall wellbeing. Small adaptations at home can maintain independence longer.",
    actionToTake: "Create a daily schedule that includes medication times, exercise, meals and rest. Use timers or apps to remind you of medication doses. Adapt your home environment for safety.",
    neuroQueryPrompts: [
      "How can I remember to take my medications on time?",
      "What home modifications help with mobility?",
      "How do I maintain energy throughout the day?",
    ],
    questionsForTeam: [
      "What daily routine do you recommend?",
      "Should I see an occupational therapist?",
      "Are there devices that can help with daily tasks?",
    ],
    additionalResources: [
      "Parkinson's Foundation tips for daily living",
      "Occupational therapy resources for PD",
    ],
  },
  {
    id: "8",
    title: "Exercise & Movement",
    stage: "Living",
    status: "locked",
    description: "The importance of physical activity in managing Parkinson's symptoms.",
    videoTitle: "Exercise and Parkinson's: What the Research Shows",
    aboutStation: "Regular exercise has been shown to improve balance, flexibility, strength and mood. Activities like walking, cycling, swimming, tai chi and dance are particularly beneficial for people with PD.",
    actionToTake: "Aim for at least 150 minutes of moderate exercise per week. Consider joining a PD-specific exercise class. Work with a physiotherapist to develop a safe exercise plan.",
    neuroQueryPrompts: [
      "What types of exercise are best for Parkinson's?",
      "How do I stay motivated to exercise regularly?",
      "Can exercise slow the progression of PD?",
    ],
    questionsForTeam: [
      "What exercise program do you recommend for my stage?",
      "Should I see a physiotherapist?",
      "Are there local PD exercise groups?",
    ],
    additionalResources: [
      "Parkinson's Foundation exercise recommendations",
      "Research on exercise and neuroprotection in PD",
    ],
  },
];

const MapsPage = ({ onNavigate }: MapsPageProps) => {
  const [activeStage, setActiveStage] = useState("Diagnosis");
  const [selectedNode, setSelectedNode] = useState<LessonNode | null>(null);

  const filteredNodes = mapNodes.filter((node) => node.stage === activeStage);
  const currentNode = mapNodes.find((node) => node.status === "current");

  const handleNodeClick = (node: LessonNode) => {
    if (node.status !== "locked") {
      setSelectedNode(node);
    }
  };

  // Show lesson detail page if a node is selected
  if (selectedNode) {
    return (
      <LessonDetailPage
        node={selectedNode}
        onBack={() => setSelectedNode(null)}
      />
    );
  }

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
                  onClick={() => handleNodeClick(node)}
                  className={`flex-1 glass-card flex items-center justify-between ${
                    node.status === "locked" ? "opacity-50 cursor-not-allowed" : "hover:border-accent/50"
                  }`}
                  disabled={node.status === "locked"}
                >
                  <div>
                    <h3 className="text-body-lg font-semibold text-foreground text-left">
                      {node.title}
                    </h3>
                    <p className="text-helper text-muted-foreground text-left">
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
            <CTAButton size="full" onClick={() => handleNodeClick(currentNode)}>
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
