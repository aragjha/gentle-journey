// Appointment types and sample data

export type AppointmentType = 
  | "general-checkup"
  | "neurologist"
  | "physical-therapy"
  | "occupational-therapy"
  | "speech-therapy"
  | "mental-health"
  | "specialist"
  | "other";

export interface Appointment {
  id: string;
  title: string;
  type: AppointmentType;
  doctorName: string;
  location?: string;
  date: Date;
  time: string;
  reminderEnabled: boolean;
  reminderMinutesBefore: number;
  notes: string;
  pointsToDiscuss: string[];
  attachments?: string[];
  completed: boolean;
  postAppointmentNotes?: string;
}

export const appointmentTypeLabels: Record<AppointmentType, string> = {
  "general-checkup": "General Checkup",
  "neurologist": "Neurologist",
  "physical-therapy": "Physical Therapy",
  "occupational-therapy": "Occupational Therapy",
  "speech-therapy": "Speech Therapy",
  "mental-health": "Mental Health",
  "specialist": "Specialist",
  "other": "Other",
};

export const appointmentTypeIcons: Record<AppointmentType, string> = {
  "general-checkup": "🩺",
  "neurologist": "🧠",
  "physical-therapy": "🏃",
  "occupational-therapy": "🤲",
  "speech-therapy": "🗣️",
  "mental-health": "💭",
  "specialist": "👨‍⚕️",
  "other": "📋",
};

export const reminderOptions = [
  { value: 15, label: "15 minutes before" },
  { value: 30, label: "30 minutes before" },
  { value: 60, label: "1 hour before" },
  { value: 120, label: "2 hours before" },
  { value: 1440, label: "1 day before" },
  { value: 2880, label: "2 days before" },
];

// Helper to generate unique IDs
export const generateAppointmentId = (): string => {
  return `apt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Sample appointments for demo
export const sampleAppointments: Appointment[] = [
  {
    id: "apt-001",
    title: "Monthly Neurologist Visit",
    type: "neurologist",
    doctorName: "Dr. Sarah Chen",
    location: "Neurology Center, 123 Medical Dr",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    time: "10:00 AM",
    reminderEnabled: true,
    reminderMinutesBefore: 1440,
    notes: "Bring updated medication list",
    pointsToDiscuss: [
      "Discuss tremor changes",
      "Sleep quality update",
      "Medication side effects"
    ],
    completed: false,
  },
  {
    id: "apt-002",
    title: "Physical Therapy Session",
    type: "physical-therapy",
    doctorName: "Mike Thompson, PT",
    location: "Movement Therapy Clinic",
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    time: "2:30 PM",
    reminderEnabled: true,
    reminderMinutesBefore: 60,
    notes: "Wear comfortable clothes",
    pointsToDiscuss: [
      "Balance exercises progress",
      "New stretching routine"
    ],
    completed: false,
  },
];
