// Medication tracking types and utilities

export interface Medication {
  id: string;
  name: string;
  dosage: string;
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

export const frequencyOptions = [
  { id: "once", label: "Once daily", icon: "1️⃣" },
  { id: "twice", label: "Twice daily", icon: "2️⃣" },
  { id: "three", label: "Three times daily", icon: "3️⃣" },
  { id: "four", label: "Four times daily", icon: "4️⃣" },
  { id: "as_needed", label: "As needed", icon: "🔄" },
];

export const timeOptions = [
  { id: "morning", label: "Morning", time: "8:00 AM", icon: "🌅" },
  { id: "afternoon", label: "Afternoon", time: "12:00 PM", icon: "☀️" },
  { id: "evening", label: "Evening", time: "6:00 PM", icon: "🌆" },
  { id: "night", label: "Night", time: "10:00 PM", icon: "🌙" },
];

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

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};
