import { motion } from "framer-motion";
import { 
  Medication, 
  medicationTypes, 
  frequencyOptions, 
  timeOptions,
  dosagePresets,
  quantityPresets 
} from "@/data/medicationContent";
import { Slider } from "@/components/ui/slider";
import CTAButton from "@/components/CTAButton";

interface MedicationDetailsStepProps {
  name: string;
  dosage: number;
  quantity: number;
  type: Medication["type"];
  frequency: Medication["frequency"];
  times: Medication["times"];
  onDosageChange: (value: number) => void;
  onQuantityChange: (value: number) => void;
  onTypeChange: (value: Medication["type"]) => void;
  onFrequencyChange: (value: Medication["frequency"]) => void;
  onTimeToggle: (time: "morning" | "afternoon" | "evening" | "night") => void;
  onSubmit: () => void;
}

const MedicationDetailsStep = ({
  name,
  dosage,
  quantity,
  type,
  frequency,
  times,
  onDosageChange,
  onQuantityChange,
  onTypeChange,
  onFrequencyChange,
  onTimeToggle,
  onSubmit,
}: MedicationDetailsStepProps) => {
  const isValid = dosage > 0 && quantity > 0 && times.length > 0;

  return (
    <>
      <motion.div
        key="med_details"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="flex-1 flex flex-col overflow-hidden"
      >
        <div className="mb-4">
          <h1 className="text-h1-lg text-foreground mb-1">{name}</h1>
          <p className="text-helper-lg text-muted-foreground">
            Set up dosage and schedule
          </p>
        </div>

        <div className="flex-1 overflow-y-auto space-y-6 pb-28">
          {/* Medication Type */}
          <section>
            <label className="text-helper-lg text-muted-foreground uppercase tracking-wide mb-3 block">
              Type
            </label>
            <div className="flex flex-wrap gap-2">
              {medicationTypes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onTypeChange(t.id as Medication["type"])}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all ${
                    type === t.id
                      ? "bg-accent text-accent-foreground border-accent"
                      : "bg-card border-border text-foreground hover:border-accent/50"
                  }`}
                >
                  <span>{t.icon}</span>
                  <span className="text-sm font-medium">{t.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Dosage Slider */}
          <section>
            <div className="flex justify-between items-center mb-3">
              <label className="text-helper-lg text-muted-foreground uppercase tracking-wide">
                Dosage
              </label>
              <span className="text-h2 text-foreground font-bold">{dosage}mg</span>
            </div>
            <Slider
              value={[dosage]}
              onValueChange={(v) => onDosageChange(v[0])}
              min={25}
              max={500}
              step={25}
              className="mb-3"
            />
            <div className="flex flex-wrap gap-2">
              {dosagePresets.map((d) => (
                <button
                  key={d}
                  onClick={() => onDosageChange(d)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                    dosage === d
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {d}mg
                </button>
              ))}
            </div>
          </section>

          {/* Quantity */}
          <section>
            <div className="flex justify-between items-center mb-3">
              <label className="text-helper-lg text-muted-foreground uppercase tracking-wide">
                Quantity per dose
              </label>
              <span className="text-h2 text-foreground font-bold">{quantity}</span>
            </div>
            <div className="flex gap-3">
              {quantityPresets.map((q) => (
                <button
                  key={q}
                  onClick={() => onQuantityChange(q)}
                  className={`flex-1 py-4 rounded-2xl border text-center transition-all ${
                    quantity === q
                      ? "bg-accent text-accent-foreground border-accent"
                      : "bg-card border-border text-foreground hover:border-accent/50"
                  }`}
                >
                  <span className="text-h2 font-bold">{q}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Frequency */}
          <section>
            <label className="text-helper-lg text-muted-foreground uppercase tracking-wide mb-3 block">
              How often?
            </label>
            <div className="flex flex-wrap gap-2">
              {frequencyOptions.map((f) => (
                <button
                  key={f.id}
                  onClick={() => onFrequencyChange(f.id as Medication["frequency"])}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all ${
                    frequency === f.id
                      ? "bg-accent text-accent-foreground border-accent"
                      : "bg-card border-border text-foreground hover:border-accent/50"
                  }`}
                >
                  <span className="text-sm font-medium">{f.shortLabel}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Time of Day */}
          <section>
            <label className="text-helper-lg text-muted-foreground uppercase tracking-wide mb-3 block">
              When do you take it?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {timeOptions.map((time) => {
                const isSelected = times.includes(time.id as any);
                return (
                  <button
                    key={time.id}
                    onClick={() => onTimeToggle(time.id as any)}
                    className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all ${
                      isSelected
                        ? "bg-accent/20 border-accent"
                        : "bg-card border-border hover:border-accent/50"
                    }`}
                  >
                    <span className="text-2xl">{time.icon}</span>
                    <span className="text-body font-medium text-foreground">{time.label}</span>
                    <span className="text-helper text-muted-foreground">{time.time}</span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </motion.div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent pt-8">
        {!isValid && (
          <p className="text-center text-helper text-muted-foreground mb-2">
            Select at least one time of day
          </p>
        )}
        <CTAButton 
          size="full" 
          onClick={onSubmit}
          disabled={!isValid}
        >
          Add Medication
        </CTAButton>
      </div>
    </>
  );
};

export default MedicationDetailsStep;