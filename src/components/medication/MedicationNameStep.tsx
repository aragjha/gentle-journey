import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { popularMedications } from "@/data/medicationContent";
import CTAButton from "@/components/CTAButton";

interface MedicationNameStepProps {
  value: string;
  onChange: (name: string) => void;
  onContinue: () => void;
  medicationCount: number;
}

const MedicationNameStep = ({ 
  value, 
  onChange, 
  onContinue,
  medicationCount 
}: MedicationNameStepProps) => {
  const [searchQuery, setSearchQuery] = useState(value);
  
  // Filter medications based on search
  const filteredMedications = useMemo(() => {
    if (!searchQuery.trim()) return popularMedications.slice(0, 6);
    return popularMedications.filter(
      med => med.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSelectMedication = (name: string) => {
    setSearchQuery(name);
    onChange(name);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchQuery(newValue);
    onChange(newValue);
  };

  const handleClear = () => {
    setSearchQuery("");
    onChange("");
  };

  return (
    <motion.div
      key="med_name"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 flex flex-col"
    >
      <div className="mb-6">
        <h1 className="text-h1-lg text-foreground mb-2">
          {medicationCount === 0 ? "What medication do you take?" : "Add another medication"}
        </h1>
        <p className="text-helper-lg text-muted-foreground">
          Select from common PD medications or enter your own
        </p>
      </div>

      {/* Search Input */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search or type medication name..."
          className="w-full pl-12 pr-12 py-4 rounded-2xl border border-border bg-card text-foreground text-body placeholder:text-muted-foreground focus:outline-none focus:border-accent"
          autoFocus
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Popular Medications Chips */}
      <div className="mb-4">
        <p className="text-helper text-muted-foreground mb-3">
          {searchQuery.trim() ? "Matching medications" : "Popular PD medications"}
        </p>
        <div className="flex flex-wrap gap-2">
          {filteredMedications.map((med, index) => (
            <motion.button
              key={med.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => handleSelectMedication(med.name)}
              className={`px-4 py-2.5 rounded-full border transition-all ${
                value === med.name
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-card border-border text-foreground hover:border-accent/50"
              }`}
            >
              <span className="text-sm font-medium">{med.name}</span>
            </motion.button>
          ))}
          
          {/* Show "Use custom" if typing something not in list */}
          {searchQuery.trim() && 
           !popularMedications.some(m => m.name.toLowerCase() === searchQuery.toLowerCase()) && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => onChange(searchQuery)}
              className={`px-4 py-2.5 rounded-full border border-dashed transition-all ${
                value === searchQuery && !popularMedications.some(m => m.name === value)
                  ? "bg-accent/20 text-accent border-accent"
                  : "border-accent/50 text-accent hover:bg-accent/10"
              }`}
            >
              <span className="text-sm font-medium">+ Use "{searchQuery}"</span>
            </motion.button>
          )}
        </div>
      </div>

      {/* All medications list when searching */}
      {searchQuery.trim() && filteredMedications.length === 0 && (
        <p className="text-helper text-muted-foreground text-center py-4">
          No matching medications. Your custom name will be used.
        </p>
      )}

      <div className="flex-1" />
      
      <CTAButton 
        size="full" 
        onClick={onContinue}
        disabled={!value.trim()}
      >
        Continue
      </CTAButton>
    </motion.div>
  );
};

export default MedicationNameStep;