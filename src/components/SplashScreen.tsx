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
    headline: "Reconnect with what they love",
    subtext: "Bring back comfort through memories, routines, and familiar moments.",
  },
  {
    image: splashSlide2,
    headline: "Taking care is easier now",
    subtext: "Understand today's condition and make informed decisions with clarity.",
  },
  {
    image: splashSlide3,
    headline: "All care, in one place",
    subtext: "Manage medicines, appointments, and daily activities like never before.",
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
      {/* Header: Logo centered, Theme toggle right */}
      <div className="relative flex items-center justify-center pt-8 pb-4 px-6">
        {/* Logo - centered */}
        <motion.img
          src={logoLight}
          alt="NeuraChamp"
          className="w-72 h-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Theme Toggle - absolute right */}
        <div className="absolute right-6 top-8">
          <ThemeToggle />
        </div>
      </div>

      {/* Tagline */}
      <motion.p
        className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase text-center mb-6"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        NEURO CARE REDEFINED
      </motion.p>

      {/* Carousel */}
      <div className="flex-1 flex flex-col px-6 overflow-hidden">
        <div className="relative flex-1 flex flex-col">
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
          <div className="mt-6 text-center">
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
                <p className="text-base text-muted-foreground max-w-xs mx-auto">
                  {slides[currentSlide].subtext}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-accent w-8"
                    : "bg-muted hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="px-6 pb-safe-bottom mb-8 mt-6">
        <CTAButton size="full" onClick={onContinue} className="uppercase font-bold">
          Get Started
        </CTAButton>
      </div>
    </div>
  );
};

export default SplashScreen;
