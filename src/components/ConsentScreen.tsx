import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, X } from "lucide-react";
import CTAButton from "@/components/CTAButton";
import { consentShortForm, consentFullForm, termsShortForm } from "@/data/consentContent";

interface ConsentScreenProps {
  onConsent: () => void;
  onSignOut?: () => void;
}

const ConsentScreen = ({ onConsent, onSignOut }: ConsentScreenProps) => {
  const [sheet, setSheet] = useState<"consent" | "terms" | null>(null);

  const handleConsent = () => {
    localStorage.setItem("nc-consent-at", new Date().toISOString());
    onConsent();
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <div className="flex-1 px-5 pt-8 pb-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col items-center max-w-md mx-auto"
        >
          <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-5">
            <ShieldCheck className="w-8 h-8 text-accent" />
          </div>

          <h1 className="text-h1 text-foreground text-center mb-3">{consentShortForm.title}</h1>
          <p className="text-body text-muted-foreground text-center mb-6 leading-relaxed">
            {consentShortForm.intro}
          </p>

          <div className="w-full space-y-4 mb-6">
            {consentShortForm.sections.map((section) => (
              <div
                key={section.heading}
                className="rounded-2xl bg-card border border-border p-4 shadow-sm-soft"
              >
                <h3 className="text-sm font-bold text-foreground mb-1">{section.heading}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground text-center mb-6 leading-relaxed">
            {consentShortForm.footer}
          </p>

          <div className="flex flex-col items-center gap-3 text-xs text-muted-foreground mb-8">
            <button
              onClick={() => setSheet("consent")}
              className="text-accent underline underline-offset-2"
            >
              View Full Consent
            </button>
            <button
              onClick={() => setSheet("terms")}
              className="text-accent underline underline-offset-2"
            >
              Terms & Conditions
            </button>
          </div>
        </motion.div>
      </div>

      <div className="px-5 pb-safe-bottom pb-5 border-t border-border bg-background">
        <div className="max-w-md mx-auto pt-4">
          <CTAButton variant="primary" size="full" onClick={handleConsent}>
            I Consent & Continue
          </CTAButton>
          {onSignOut && (
            <button
              onClick={onSignOut}
              className="w-full text-center text-xs text-muted-foreground mt-3 py-2"
            >
              Not now — sign out
            </button>
          )}
        </div>
      </div>

      {/* Bottom sheet for full consent / T&C */}
      <AnimatePresence>
        {sheet && (
          <>
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setSheet(null)}
            />
            <motion.div
              key="sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-3xl border-t border-border shadow-lg-soft max-h-[85vh] flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <h2 className="text-h2 text-foreground">
                  {sheet === "consent" ? "Core Patient Consent" : "Terms & Conditions"}
                </h2>
                <button
                  onClick={() => setSheet(null)}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-4">
                <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
                  {sheet === "consent" ? consentFullForm : termsShortForm}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConsentScreen;
