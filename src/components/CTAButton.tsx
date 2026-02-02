import { motion, HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "large" | "full";
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ children, className, variant = "primary", size = "default", isLoading, disabled, onClick, type = "button" }, ref) => {
    const baseStyles = "relative inline-flex items-center justify-center font-bold rounded-full transition-all duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2";
    
    const variants = {
      primary: "btn-cta",
      secondary: "bg-secondary text-secondary-foreground border-2 border-border hover:bg-secondary/80 py-4 px-8",
      ghost: "bg-transparent text-foreground hover:bg-muted py-4 px-8",
    };

    const sizes = {
      default: "min-h-[56px] px-8 text-lg",
      large: "min-h-[64px] px-10 text-xl",
      full: "min-h-[56px] w-full text-lg",
    };

    return (
      <motion.button
        ref={ref}
        type={type}
        whileTap={{ scale: 0.98, y: 2 }}
        transition={{ duration: 0.1 }}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          disabled && "opacity-40 cursor-not-allowed",
          className
        )}
        disabled={disabled || isLoading}
        onClick={onClick}
      >
        {isLoading ? (
          <motion.div
            className="w-6 h-6 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

CTAButton.displayName = "CTAButton";

export default CTAButton;
