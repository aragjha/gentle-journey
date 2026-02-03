import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CTAButton from "@/components/CTAButton";
import ThemeToggle from "@/components/ThemeToggle";
import logoLight from "@/assets/logo-light.png";
import splashSlide1 from "@/assets/splash-slide-1.png";
import splashSlide2 from "@/assets/splash-slide-2.png";
import splashSlide3 from "@/assets/splash-slide-3.png";

interface SplashScreenProps {
  onContinue: () => void;
}

const slides = [
  {
    image: splashSlide1,
    headline: "Your daily partner",
    subtext: "Track symptoms, meds, and moods.",
  },
  {
    image: splashSlide2,
    headline: "See your progress",
    subtext: "Insights that help you thrive.",
  },
  {
    image: splashSlide3,
    headline: "Never care alone",
    subtext: "Share updates with loved ones.",
  },
];

const SplashScreen = ({ onContinue }: SplashScreenProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-scroll every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header: Logo left/center, Theme toggle right - same row */}
      <div className="flex items-center justify-between pt-6 pb-2 px-6">
        {/* Spacer for balance */}
        <div className="w-10" />
        
        {/* Logo - centered */}
        <motion.img
          src={logoLight}
          alt="NeuraChamp"
          className="w-72 h-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Theme Toggle - right aligned */}
        <ThemeToggle />
      </div>

      {/* Tagline */}
      <motion.p
        className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase text-center mt-2 mb-8"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        NEURO CARE REDEFINED
      </motion.p>

      {/* Carousel */}
      <div className="flex-1 flex flex-col px-6">
        <div className="flex flex-col gap-5">
          {/* Image Carousel */}
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                src={slides[currentSlide].image}
                alt={slides[currentSlide].headline}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>

            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* Text Content */}
          <div className="text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  {slides[currentSlide].headline}
                </h1>
                <p className="text-base text-muted-foreground max-w-sm mx-auto leading-relaxed">
                  {slides[currentSlide].subtext}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2.5 mt-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-accent w-8"
                    : "bg-muted w-2.5 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="px-6 pb-safe-bottom mb-8 mt-auto pt-6">
        <CTAButton size="full" onClick={onContinue} className="uppercase font-bold">
          Get Started
        </CTAButton>
      </div>
    </div>
  );
};

export default SplashScreen;
