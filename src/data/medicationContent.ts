// Medication tracking types and utilities

export interface Medication {
  id: string;
  name: string;
  dosage: number; // in mg
  quantity: number; // number of pills/tablets
  type: "tablet" | "capsule" | "patch" | "injection" | "liquid";
  frequency: "once" | "twice" | "three" | "four" | "as_needed";
  times: ("morning" | "afternoon" | "evening" | "night")[];
  reminderEnabled: boolean;
  color: string;
}

export interface MedicationLog {
  id: string;
  medicationId: string;
  scheduledTime: "morning" | "afternoon" | "evening" | "night";
  takenAt: Date | null;
  skipped: boolean;
  date: string; // YYYY-MM-DD
}

// Popular Parkinson's medications
export const popularMedications = [
  { name: "Levodopa", category: "Dopamine Precursor" },
  { name: "Carbidopa", category: "Decarboxylase Inhibitor" },
  { name: "Pramipexole", category: "Dopamine Agonist" },
  { name: "Ropinirole", category: "Dopamine Agonist" },
  { name: "Rotigotine", category: "Dopamine Agonist" },
  { name: "Apomorphine", category: "Dopamine Agonist" },
  { name: "Rasagiline", category: "MAO-B Inhibitor" },
  { name: "Selegiline", category: "MAO-B Inhibitor" },
  { name: "Safinamide", category: "MAO-B Inhibitor" },
  { name: "Entacapone", category: "COMT Inhibitor" },
  { name: "Opicapone", category: "COMT Inhibitor" },
  { name: "Amantadine", category: "Antiviral/Antiparkinsonian" },
];

export const medicationTypes = [
  { id: "tablet", label: "Tablet", icon: "💊" },
  { id: "capsule", label: "Capsule", icon: "💠" },
  { id: "patch", label: "Patch", icon: "🩹" },
  { id: "injection", label: "Injection", icon: "💉" },
  { id: "liquid", label: "Liquid", icon: "🧴" },
];

export const frequencyOptions = [
  { id: "once", label: "Once daily", shortLabel: "1x", icon: "1️⃣" },
  { id: "twice", label: "Twice daily", shortLabel: "2x", icon: "2️⃣" },
  { id: "three", label: "Three times", shortLabel: "3x", icon: "3️⃣" },
  { id: "four", label: "Four times", shortLabel: "4x", icon: "4️⃣" },
  { id: "as_needed", label: "As needed", shortLabel: "PRN", icon: "🔄" },
];

export const timeOptions = [
  { id: "morning", label: "Morning", time: "8:00 AM", icon: "🌅" },
  { id: "afternoon", label: "Afternoon", time: "12:00 PM", icon: "☀️" },
  { id: "evening", label: "Evening", time: "6:00 PM", icon: "🌆" },
  { id: "night", label: "Night", time: "10:00 PM", icon: "🌙" },
];

export const dosagePresets = [25, 50, 100, 150, 200, 250, 300, 400, 500];
export const quantityPresets = [1, 2, 3, 4];

export const medicationColors = [
  "#4ECDC4", // Teal
  "#FF6B6B", // Coral
  "#45B7D1", // Sky blue
  "#96CEB4", // Sage
  "#FFEAA7", // Yellow
  "#DDA0DD", // Plum
  "#98D8C8", // Mint
  "#F7DC6F", // Gold
];

export const getTimeLabel = (time: string): string => {
  const option = timeOptions.find((t) => t.id === time);
  return option?.label || time;
};

export const getTimeIcon = (time: string): string => {
  const option = timeOptions.find((t) => t.id === time);
  return option?.icon || "⏰";
};

export const getFrequencyLabel = (freq: string): string => {
  const option = frequencyOptions.find((f) => f.id === freq);
  return option?.label || freq;
};

export const getTypeIcon = (type: string): string => {
  const option = medicationTypes.find((t) => t.id === type);
  return option?.icon || "💊";
};

export const formatDosage = (dosage: number, quantity: number, type: string): string => {
  const typeLabel = medicationTypes.find((t) => t.id === type)?.label.toLowerCase() || type;
  return `${dosage}mg × ${quantity} ${typeLabel}${quantity > 1 ? "s" : ""}`;
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};
