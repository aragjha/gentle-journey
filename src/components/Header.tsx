import { Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import logoLight from "@/assets/logo-light.png";

interface HeaderProps {
  progress?: number;
  totalSteps?: number;
  showProgress?: boolean;
  showSpeaker?: boolean;
  onSpeakerClick?: () => void;
}

const Header = ({ 
  progress = 0, 
  totalSteps = 1, 
  showProgress = false,
  showSpeaker = true,
  onSpeakerClick 
}: HeaderProps) => {
  const progressPercent = totalSteps > 0 ? (progress / totalSteps) * 100 : 0;

  return (
    <header className="w-full">
      {/* Logo and Speaker Row */}
      <div className="flex items-center justify-between mb-4">
        <motion.img
          src={logoLight}
          alt="NeuraChamp"
          className="h-10 w-auto object-contain"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        />
        
        {showSpeaker && (
          <motion.button
            onClick={onSpeakerClick}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            aria-label="Read aloud"
          >
            <Volume2 className="w-6 h-6 text-muted-foreground" />
          </motion.button>
        )}
      </div>

      {/* Progress Bar */}
      {showProgress && (
        <motion.div 
          className="progress-bar"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <motion.div
            className="progress-bar-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </header>
  );
};

export default Header;
