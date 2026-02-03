import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SplashScreen from "@/components/SplashScreen";
import OnboardingFlow from "@/components/OnboardingFlow";
import HomeHub from "@/pages/HomeHub";
import DiariesHub from "@/pages/DiariesHub";
import DailyCheckinFlow from "@/pages/DailyCheckinFlow";
import MapsPage from "@/pages/MapsPage";
import ToolsHub from "@/pages/ToolsHub";
import NeuroQueryChat from "@/pages/NeuroQueryChat";
import ProfilePage from "@/pages/ProfilePage";
import GratificationScreen from "@/components/GratificationScreen";
import { getTodaysLesson } from "@/data/lessonContent";

type AppScreen = 
  | "splash1" 
  | "splash2" 
  | "splash3" 
  | "onboarding" 
  | "onboarding-complete"
  | "home" 
  | "diaries" 
  | "checkin" 
  | "maps" 
  | "maps-lesson"
  | "tools" 
  | "chat" 
  | "profile";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("splash1");
  const [previousScreen, setPreviousScreen] = useState<AppScreen>("home");
  const [openLessonId, setOpenLessonId] = useState<string | null>(null);

  const handleSplashContinue = () => {
    if (currentScreen === "splash1") setCurrentScreen("splash2");
    else if (currentScreen === "splash2") setCurrentScreen("splash3");
    else if (currentScreen === "splash3") setCurrentScreen("onboarding");
  };

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
    setCurrentScreen(tab);
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

  const renderScreen = () => {
    switch (currentScreen) {
      case "splash1":
        return <SplashScreen step={1} onContinue={handleSplashContinue} />;
      case "splash2":
        return <SplashScreen step={2} onContinue={handleSplashContinue} onSkip={handleSkipOnboarding} />;
      case "splash3":
        return <SplashScreen step={3} onContinue={handleSplashContinue} />;
      case "onboarding":
        return <OnboardingFlow onComplete={handleOnboardingComplete} />;
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
          />
        );
      case "diaries":
        return (
          <DiariesHub 
            onStartCheckin={handleStartCheckin} 
            onNavigate={handleNavigate} 
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
          />
        );
      case "chat":
        return <NeuroQueryChat onNavigate={handleNavigate} />;
      case "profile":
        return <ProfilePage onNavigate={handleNavigate} />;
      default:
        return <SplashScreen step={1} onContinue={handleSplashContinue} />;
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
