import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import SplashScreen from "@/components/SplashScreen";
import OnboardingFlow, { OnboardingState } from "@/components/OnboardingFlow";
import AuthPage from "@/pages/AuthPage";
import HomeHub from "@/pages/HomeHub";
import OffModeHome from "@/pages/OffModeHome";
import DiariesHub from "@/pages/DiariesHub";
import DiaryFlow from "@/pages/DiaryFlow";
import DailyCheckinFlow from "@/pages/DailyCheckinFlow";
import MapsPage from "@/pages/MapsPage";
import ToolsHub from "@/pages/ToolsHub";
import NeuroQueryChat from "@/pages/NeuroQueryChat";
import ProfilePage from "@/pages/ProfilePage";
import MedicationOnboarding from "@/pages/MedicationOnboarding";
import MedicationHub from "@/pages/MedicationHub";
import MedicationLogScreen from "@/pages/MedicationLogScreen";
import GratificationScreen from "@/components/GratificationScreen";
import { getTodaysLesson } from "@/data/lessonContent";
import { getDiaryById } from "@/data/diaryContent";
import { Medication, MedicationLog } from "@/data/medicationContent";

type AppScreen = 
  | "splash"
  | "auth"
  | "onboarding" 
  | "onboarding-complete"
  | "home" 
  | "home-off"
  | "diaries" 
  | "diary-flow"
  | "checkin" 
  | "maps" 
  | "maps-lesson"
  | "tools" 
  | "chat" 
  | "profile"
  | "medication-onboarding"
  | "medication-onboarding-from-flow"
  | "medication-hub"
  | "medication-log";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("splash");
  const [previousScreen, setPreviousScreen] = useState<AppScreen>("home");
  const [openLessonId, setOpenLessonId] = useState<string | null>(null);
  const [openDiaryId, setOpenDiaryId] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  // Track if user is a guest (skipped login) - guests always see onboarding
  const [isGuestUser, setIsGuestUser] = useState(false);
  
  // ON/OFF mode state
  const [isOnMode, setIsOnMode] = useState(true);
  
  // Medication state (in real app, this would be persisted to database)
  const [medications, setMedications] = useState<Medication[]>([]);
  const [medicationLogs, setMedicationLogs] = useState<MedicationLog[]>([]);
  
  // Onboarding state for resuming after medication setup
  const [savedOnboardingState, setSavedOnboardingState] = useState<OnboardingState | undefined>();

  // Check for existing session on mount and listen for auth changes
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        // User just signed in (e.g., from OAuth redirect)
        setIsGuestUser(false);
        setCurrentScreen("onboarding");
      } else if (event === "SIGNED_OUT") {
        setIsGuestUser(false);
        setCurrentScreen("splash");
      }
    });

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // User is already logged in, go to home
        setIsGuestUser(false);
        setCurrentScreen("home");
      }
      setIsCheckingAuth(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSplashContinue = () => {
    setCurrentScreen("auth");
  };

  const handleAuthSuccess = () => {
    setIsGuestUser(false);
    setCurrentScreen("onboarding");
  };

  const handleAuthBack = () => {
    setCurrentScreen("splash");
  };

  // Skip login - mark as guest and show onboarding
  const handleSkipToHome = () => {
    setIsGuestUser(true);
    setCurrentScreen("onboarding");
  };

  // Skip onboarding - go to home
  const handleSkipOnboarding = () => {
    setCurrentScreen("home");
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen("onboarding-complete");
  };

  const handleOnboardingGratificationComplete = () => {
    setCurrentScreen("home");
  };

  const handleNavigate = (tab: "home" | "maps" | "tools" | "profile") => {
    setOpenLessonId(null); // Reset lesson when navigating via tabs
    // When navigating to home, respect the current ON/OFF mode
    if (tab === "home") {
      setCurrentScreen(isOnMode ? "home" : "home-off");
    } else {
      setCurrentScreen(tab);
    }
  };

  const handleToggleMode = (isOn: boolean) => {
    setIsOnMode(isOn);
    setCurrentScreen(isOn ? "home" : "home-off");
  };

  const handleStartCheckin = () => {
    setPreviousScreen(currentScreen);
    setCurrentScreen("checkin");
  };

  const handleCheckinComplete = () => {
    setCurrentScreen("home");
  };

  const handleOpenChat = () => {
    setCurrentScreen("chat");
  };

  const handleOpenLesson = () => {
    // Open the current lesson from home page
    const todaysLesson = getTodaysLesson();
    setOpenLessonId(todaysLesson.id);
    setPreviousScreen("home");
    setCurrentScreen("maps-lesson");
  };

  const handleLessonClose = () => {
    // When closing lesson opened from home, go back to home
    if (previousScreen === "home") {
      setOpenLessonId(null);
      setCurrentScreen("home");
    }
  };

  const handleOpenDiary = (diaryId: string) => {
    setOpenDiaryId(diaryId);
    setPreviousScreen("diaries");
    setCurrentScreen("diary-flow");
  };

  const handleDiaryComplete = () => {
    setOpenDiaryId(null);
    setCurrentScreen("diaries");
  };

  // Medication handlers
  const handleOpenMedications = () => {
    if (medications.length === 0) {
      setCurrentScreen("medication-onboarding");
    } else {
      setCurrentScreen("medication-hub");
    }
  };

  const handleMedicationOnboardingComplete = (newMeds: Medication[]) => {
    setMedications(newMeds);
    if (newMeds.length > 0) {
      setCurrentScreen("medication-hub");
    } else {
      setCurrentScreen("tools");
    }
  };

  const handleMedicationOnboardingFromFlowComplete = (newMeds: Medication[]) => {
    setMedications(newMeds);
    // Return to onboarding flow after adding medications
    setCurrentScreen("onboarding");
  };

  const handleToggleMedicationReminder = (medId: string) => {
    setMedications((prev) =>
      prev.map((m) =>
        m.id === medId ? { ...m, reminderEnabled: !m.reminderEnabled } : m
      )
    );
  };

  const handleMedicationLogComplete = (logs: MedicationLog[]) => {
    setMedicationLogs((prev) => [...prev, ...logs]);
    setCurrentScreen("medication-hub");
  };

  // Show loading while checking auth
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "splash":
        return <SplashScreen onContinue={handleSplashContinue} />;
      case "auth":
        return <AuthPage onAuthSuccess={handleAuthSuccess} onBack={handleAuthBack} onSkip={handleSkipToHome} />;
      case "onboarding":
        return (
          <OnboardingFlow 
            onComplete={handleOnboardingComplete} 
            onSkip={handleSkipOnboarding}
            onAddMedications={(state) => {
              setSavedOnboardingState(state);
              setCurrentScreen("medication-onboarding-from-flow");
            }}
            initialState={savedOnboardingState}
          />
        );
      case "onboarding-complete":
        return (
          <GratificationScreen
            title="Your plan is ready! 🎉"
            subtitle="Let's start your personalized journey together."
            onContinue={handleOnboardingGratificationComplete}
            ctaText="Enter NeuraChamp"
            type="milestone"
          />
        );
      case "home":
        return (
          <HomeHub 
            onStartCheckin={handleStartCheckin} 
            onNavigate={handleNavigate}
            onOpenLesson={handleOpenLesson}
            isOnMode={isOnMode}
            onToggleMode={handleToggleMode}
          />
        );
      case "home-off":
        return (
          <OffModeHome 
            onSwitchToOn={() => handleToggleMode(true)}
          />
        );
      case "diaries":
        return (
          <DiariesHub 
            onStartCheckin={handleStartCheckin} 
            onNavigate={handleNavigate}
            onOpenDiary={handleOpenDiary}
          />
        );
      case "diary-flow":
        const diary = openDiaryId ? getDiaryById(openDiaryId) : null;
        if (!diary) return null;
        return (
          <DiaryFlow
            diary={diary}
            onComplete={handleDiaryComplete}
            onBack={() => setCurrentScreen("diaries")}
          />
        );
      case "checkin":
        return (
          <DailyCheckinFlow 
            onComplete={handleCheckinComplete}
            onBack={() => setCurrentScreen(previousScreen)}
          />
        );
      case "maps":
        return <MapsPage onNavigate={handleNavigate} />;
      case "maps-lesson":
        return (
          <MapsPage 
            onNavigate={handleNavigate}
            initialLessonId={openLessonId}
            onLessonClose={handleLessonClose}
          />
        );
      case "tools":
        return (
          <ToolsHub 
            onNavigate={handleNavigate}
            onStartCheckin={handleStartCheckin}
            onOpenChat={handleOpenChat}
            onOpenDiaries={() => setCurrentScreen("diaries")}
            onOpenMedications={handleOpenMedications}
          />
        );
      case "medication-onboarding":
        return (
          <MedicationOnboarding
            onComplete={handleMedicationOnboardingComplete}
            onBack={() => setCurrentScreen("tools")}
          />
        );
      case "medication-onboarding-from-flow":
        return (
          <MedicationOnboarding
            onComplete={handleMedicationOnboardingFromFlowComplete}
            onBack={() => setCurrentScreen("onboarding")}
          />
        );
      case "medication-hub":
        return (
          <MedicationHub
            medications={medications}
            onAddMedication={() => setCurrentScreen("medication-onboarding")}
            onEditMedication={(med) => {
              // For now, just log - would need edit flow
              console.log("Edit medication:", med);
            }}
            onToggleReminder={handleToggleMedicationReminder}
            onOpenLog={() => setCurrentScreen("medication-log")}
            onBack={() => setCurrentScreen("tools")}
          />
        );
      case "medication-log":
        return (
          <MedicationLogScreen
            medications={medications}
            onComplete={handleMedicationLogComplete}
            onBack={() => setCurrentScreen("medication-hub")}
          />
        );
      case "chat":
        return <NeuroQueryChat onNavigate={handleNavigate} />;
      case "profile":
        return <ProfilePage onNavigate={handleNavigate} />;
      default:
        return <SplashScreen onContinue={handleSplashContinue} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Index;
