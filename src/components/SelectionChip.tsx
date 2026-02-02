import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface SelectionChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  multiSelect?: boolean;
}

const SelectionChip = ({ label, selected, onClick, icon, multiSelect = false }: SelectionChipProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "chip w-full text-left gap-3",
        selected && "selected"
      )}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {icon && <span className="text-xl">{icon}</span>}
      <span className="flex-1">{label}</span>
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
        >
          <Check className="w-5 h-5 text-accent" />
        </motion.div>
      )}
    </motion.button>
  );
};

export default SelectionChip;
