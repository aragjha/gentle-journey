// Mock user data layer — Sarah Chen, 34-year-old female migraine patient
// 2 years of tracking history: April 15, 2024 -> April 15, 2026

// ─── Types / Interfaces ─────────────────────────────────────────────────────

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string; // YYYY-MM-DD
  gender: "female" | "male" | "non-binary" | "prefer-not-to-say";
  diagnosis: string;
  onboardingCompletedAt: string;
  createdAt: string;
  migraineProfile: {
    frequency: string;
    averagePainLevel: number;
    knownTriggers: string[];
    warningSignType: string;
    painZones: string[];
    goals: string[];
    menstrualMigraines: boolean;
    auraType: string[];
  };
}

export interface HistoricalAttack {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  painLevel: number; // 0-10
  painZones: string[];
  triggers: string[];
  symptoms: string[];
  medicationsTaken: { name: string; dose: string; helpedLevel: number }[];
  reliefMethods: string[];
  auraPresent: boolean;
  auraSymptoms: string[];
  disability: number; // 0-3 MIDAS
  notes: string;
}

export interface HistoricalCheckin {
  id: string;
  date: string;
  overallFeeling: number; // 0-10
  hadHeadache: boolean;
  painLocations: string[];
  symptoms: string[];
  triggers: string[];
  medicationTaken: string;
  disability: number;
}

export interface MedicationAdherenceRecord {
  date: string;
  medicationId: string;
  medicationName: string;
  scheduledTime: string;
  taken: boolean;
  takenAt: string;
}

export interface DiaryEntry {
  id: string;
  date: string;
  categoryId: string;
  selectedSymptoms: string[];
  frequency: number; // 0-4
  impact: number; // 0-3
  worstTime: string;
  notes: string;
}

export interface MockStats {
  attacksLast30Days: number;
  attacksLast90Days: number;
  avgPainLast30Days: number;
  topTriggers: { trigger: string; count: number }[];
  totalCheckins: number;
  checkinStreak: number;
  medicationAdherenceRate: number;
}

// ─── Constants / Pools ──────────────────────────────────────────────────────

const NOW = new Date("2026-04-15");
const START_DATE = new Date("2024-04-15");

const PAIN_ZONES = [
  "right_side", "left_side", "both_sides", "forehead", "temples",
  "behind_eyes", "top_of_head", "back_of_head", "neck",
];

const TRIGGER_POOL = [
  "stress", "lack_of_sleep", "hormonal_changes", "weather", "skipped_meal",
  "dehydration", "screen_time", "bright_light", "strong_odor", "alcohol",
  "caffeine", "neck_tension", "poor_sleep", "chocolate", "aged_cheese",
  "emotional", "physical_activity",
];

const SYMPTOM_POOL = [
  "nausea", "light_sensitivity", "sound_sensitivity", "dizziness",
  "fatigue", "neck_stiffness", "blurred_vision", "vomiting",
  "nasal_congestion", "difficulty_concentrating", "tinnitus",
];

const AURA_SYMPTOM_POOL = [
  "visual_disturbances", "tingling_head", "tingling_neck",
  "tingling_eyes", "blind_spots", "zigzag_lines",
];

const RELIEF_POOL = [
  "dark_room", "sleep", "cold_pack", "hot_compress", "caffeine_relief",
  "hydration", "massage", "breathing", "medication",
];

const MEDICATION_OPTIONS = [
  { name: "Sumatriptan", dose: "50mg" },
  { name: "Ibuprofen", dose: "400mg" },
  { name: "Acetaminophen", dose: "500mg" },
  { name: "Rizatriptan", dose: "10mg" },
  { name: "Naproxen", dose: "500mg" },
];

const DIARY_CATEGORIES = [
  "headache_pain", "aura_warning", "triggers", "associated_symptoms",
  "relief_methods", "sleep_quality", "mood_stress",
];

const DIARY_SYMPTOMS_BY_CATEGORY: Record<string, string[]> = {
  headache_pain: ["frontal", "temporal", "occipital", "one_sided", "both_sides", "throbbing", "pressing", "stabbing", "dull"],
  aura_warning: ["visual_disturbances", "tingling_head", "tingling_neck", "fatigue_achiness", "excessive_yawning", "muscle_stiffness"],
  triggers: ["stress", "lack_of_sleep", "skipped_meal", "variable_weather", "hormonal_changes", "bright_lights", "neck_pain"],
  associated_symptoms: ["nausea", "light_sensitivity", "sound_sensitivity", "dizziness", "fatigue", "neck_stiffness", "difficulty_concentrating"],
  relief_methods: ["dark_room_rest", "sleep", "ice_packs", "caffeine", "drink_water", "massage", "yoga_meditation"],
  sleep_quality: ["less_than_5h", "5_to_6h", "7_to_8h", "poor_quality", "difficulty_falling_asleep", "woke_during_night", "morning_tiredness"],
  mood_stress: ["anxiety_mild", "depressed", "irritable", "stress_high", "overwhelmed", "emotional"],
};

const WORST_TIME_OPTIONS = ["Morning", "Afternoon", "Evening", "Night", "Random"];

const ATTACK_NOTES = [
  "Woke up with migraine, lasted through afternoon",
  "Started after stressful meeting, gradually worsened",
  "Menstrual migraine, typical pattern",
  "Weather change triggered this one",
  "Skipped lunch, headache followed",
  "Aura started 30 min before pain",
  "Took medication early, resolved faster than usual",
  "Had to leave work early",
  "Light sensitivity was especially bad this time",
  "Neck tension preceded the attack by several hours",
  "",
  "",
  "",
  "",
];

// ─── Helpers ────────────────────────────────────────────────────────────────

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number, decimals = 1): number {
  const val = Math.random() * (max - min) + min;
  const factor = Math.pow(10, decimals);
  return Math.round(val * factor) / factor;
}

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, arr.length));
}

function pickOne<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function formatDate(d: Date): string {
  return d.toISOString().split("T")[0];
}

function formatTime(hour: number, minute: number): string {
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function daysBetween(a: Date, b: Date): number {
  return Math.floor((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

function getDayOfCycle(date: Date): number {
  // Simulate a 28-day menstrual cycle anchored to a known start
  const cycleAnchor = new Date("2024-04-01");
  const days = daysBetween(cycleAnchor, date);
  return ((days % 28) + 28) % 28 + 1; // 1-28
}

function isInMenstrualWindow(date: Date): boolean {
  const day = getDayOfCycle(date);
  return day >= 25 || day <= 3;
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36).slice(-4);
}

// ─── Mock User Profile ──────────────────────────────────────────────────────

export const mockUser: UserProfile = {
  id: "usr_sarah_chen_001",
  firstName: "Sarah",
  lastName: "Chen",
  email: "sarah.chen@example.com",
  dateOfBirth: "1992-03-15",
  gender: "female",
  diagnosis: "Migraine with aura",
  onboardingCompletedAt: "2024-04-15T10:30:00Z",
  createdAt: "2024-04-15T09:00:00Z",
  migraineProfile: {
    frequency: "8-14 per month",
    averagePainLevel: 7,
    knownTriggers: ["stress", "lack_of_sleep", "hormonal_changes", "weather", "skipped_meal"],
    warningSignType: "aura",
    painZones: ["right_side", "temples", "behind_eyes"],
    goals: ["triggers", "relief", "doctor"],
    menstrualMigraines: true,
    auraType: ["visual_disturbances", "tingling_head"],
  },
};

// ─── Lazy-Cached Data Generators ────────────────────────────────────────────

let _attacks: HistoricalAttack[] | null = null;
let _checkins: HistoricalCheckin[] | null = null;
let _adherence: MedicationAdherenceRecord[] | null = null;
let _diaries: DiaryEntry[] | null = null;
let _stats: MockStats | null = null;

export function getMockAttacks(): HistoricalAttack[] {
  if (_attacks) return _attacks;

  const attacks: HistoricalAttack[] = [];
  const totalDays = daysBetween(START_DATE, NOW);

  // Walk month by month
  let currentDate = new Date(START_DATE);

  while (currentDate < NOW) {
    // Determine attacks for this month: 8-12 base, higher in menstrual window
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const lastDayToGenerate = (year === NOW.getFullYear() && month === NOW.getMonth())
      ? NOW.getDate()
      : daysInMonth;

    // Target 8-12 attacks per month
    const monthlyTarget = randomInt(8, 12);

    // Generate candidate attack days
    const attackDays: number[] = [];
    for (let day = 1; day <= lastDayToGenerate; day++) {
      const date = new Date(year, month, day);
      const menstrual = isInMenstrualWindow(date);
      // Higher probability during menstrual window
      const probability = menstrual ? 0.55 : 0.30;
      if (Math.random() < probability) {
        attackDays.push(day);
      }
    }

    // Trim or pad to hit roughly the monthly target
    while (attackDays.length > monthlyTarget + 2) {
      attackDays.splice(randomInt(0, attackDays.length - 1), 1);
    }
    while (attackDays.length < monthlyTarget - 2 && attackDays.length < lastDayToGenerate) {
      const candidate = randomInt(1, lastDayToGenerate);
      if (!attackDays.includes(candidate)) {
        attackDays.push(candidate);
      }
    }

    attackDays.sort((a, b) => a - b);

    for (const day of attackDays) {
      const date = new Date(year, month, day);
      const dateStr = formatDate(date);
      const menstrual = isInMenstrualWindow(date);

      // Pain: 2-10, weighted higher during menstrual
      const basePain = menstrual ? randomInt(4, 10) : randomInt(2, 10);
      const painLevel = Math.min(10, basePain);

      // Duration: 2-12 hours (120-720 minutes)
      const durationMinutes = randomInt(120, 720);
      const startHour = randomInt(4, 18);
      const startMinute = randomInt(0, 59);
      const endMinutes = startHour * 60 + startMinute + durationMinutes;
      const endHour = Math.min(23, Math.floor(endMinutes / 60));
      const endMinute = endMinutes % 60;

      // 35% have aura
      const auraPresent = Math.random() < 0.35;

      // Triggers: 1-3
      const triggerCount = randomInt(1, 3);
      let triggerList = pickRandom(TRIGGER_POOL, triggerCount);
      if (menstrual && !triggerList.includes("hormonal_changes")) {
        triggerList = ["hormonal_changes", ...triggerList.slice(0, triggerCount - 1)];
      }

      // Symptoms: 2-5
      const symptomList = pickRandom(SYMPTOM_POOL, randomInt(2, 5));

      // Medications: 0-2
      const medCount = painLevel >= 5 ? randomInt(1, 2) : Math.random() < 0.5 ? 1 : 0;
      const meds = pickRandom(MEDICATION_OPTIONS, medCount).map((m) => ({
        name: m.name,
        dose: m.dose,
        helpedLevel: randomInt(1, 3),
      }));

      // Relief methods: 1-3
      const relief = pickRandom(RELIEF_POOL, randomInt(1, 3));

      // Disability: correlates with pain level
      let disability: number;
      if (painLevel >= 8) disability = randomInt(2, 3);
      else if (painLevel >= 5) disability = randomInt(1, 2);
      else disability = randomInt(0, 1);

      attacks.push({
        id: generateId(),
        date: dateStr,
        startTime: formatTime(startHour, startMinute),
        endTime: formatTime(endHour, endMinute),
        durationMinutes,
        painLevel,
        painZones: pickRandom(PAIN_ZONES, randomInt(1, 3)),
        triggers: triggerList,
        symptoms: symptomList,
        medicationsTaken: meds,
        reliefMethods: relief,
        auraPresent,
        auraSymptoms: auraPresent ? pickRandom(AURA_SYMPTOM_POOL, randomInt(1, 3)) : [],
        disability,
        notes: pickOne(ATTACK_NOTES),
      });
    }

    // Advance to next month
    currentDate = new Date(year, month + 1, 1);
  }

  _attacks = attacks;
  return _attacks;
}

export function getMockCheckins(): HistoricalCheckin[] {
  if (_checkins) return _checkins;

  const attacks = getMockAttacks();
  const attackDateSet = new Set(attacks.map((a) => a.date));
  const checkins: HistoricalCheckin[] = [];

  const totalDays = daysBetween(START_DATE, NOW);

  for (let i = 0; i <= totalDays; i++) {
    const date = addDays(START_DATE, i);
    const dateStr = formatDate(date);

    // ~80% adherence for daily check-ins
    if (Math.random() > 0.80) continue;

    const hadAttack = attackDateSet.has(dateStr);
    const attackForDay = hadAttack
      ? attacks.find((a) => a.date === dateStr)
      : null;

    // Overall feeling: 6-9 on good days, 2-5 on attack days
    const overallFeeling = hadAttack ? randomInt(2, 5) : randomInt(6, 9);

    const checkin: HistoricalCheckin = {
      id: generateId(),
      date: dateStr,
      overallFeeling,
      hadHeadache: hadAttack,
      painLocations: hadAttack && attackForDay ? attackForDay.painZones : [],
      symptoms: hadAttack && attackForDay
        ? pickRandom(attackForDay.symptoms, randomInt(1, 3))
        : [],
      triggers: hadAttack && attackForDay
        ? attackForDay.triggers
        : Math.random() < 0.2
          ? pickRandom(TRIGGER_POOL, randomInt(1, 2))
          : [],
      medicationTaken: hadAttack
        ? (Math.random() < 0.7 ? "acute" : "both")
        : (Math.random() < 0.85 ? "preventive" : "none"),
      disability: hadAttack && attackForDay ? attackForDay.disability : 0,
    };

    checkins.push(checkin);
  }

  _checkins = checkins;
  return _checkins;
}

export function getMockAdherence(): MedicationAdherenceRecord[] {
  if (_adherence) return _adherence;

  const records: MedicationAdherenceRecord[] = [];

  // Topiramate daily evening starting June 1, 2024
  const medStartDate = new Date("2024-06-01");
  const totalDays = daysBetween(medStartDate, NOW);

  for (let i = 0; i <= totalDays; i++) {
    const date = addDays(medStartDate, i);
    const dateStr = formatDate(date);

    // ~85% adherence
    const taken = Math.random() < 0.85;
    const scheduledHour = 20; // 8 PM
    const takenHour = taken ? randomInt(19, 22) : 0;
    const takenMinute = taken ? randomInt(0, 59) : 0;

    records.push({
      date: dateStr,
      medicationId: "med_topiramate_50",
      medicationName: "Topiramate 50mg",
      scheduledTime: "20:00",
      taken,
      takenAt: taken ? formatTime(takenHour, takenMinute) : "",
    });
  }

  _adherence = records;
  return _adherence;
}

export function getMockDiaries(): DiaryEntry[] {
  if (_diaries) return _diaries;

  const entries: DiaryEntry[] = [];
  const totalDays = daysBetween(START_DATE, NOW);

  for (let i = 0; i <= totalDays; i++) {
    const date = addDays(START_DATE, i);
    const dateStr = formatDate(date);

    // ~2-3 entries per week = ~0.35 probability per day per category
    // On average we want ~2.5 entries/week total, so per-day prob ~ 0.36
    // We pick 0-2 categories per day to reach that weekly average
    const entriesToday = Math.random() < 0.36 ? randomInt(1, 2) : 0;
    if (entriesToday === 0) continue;

    const categories = pickRandom(DIARY_CATEGORIES, entriesToday);

    for (const categoryId of categories) {
      const symptomPool = DIARY_SYMPTOMS_BY_CATEGORY[categoryId] || [];
      const selectedSymptoms = pickRandom(symptomPool, randomInt(1, 4));

      entries.push({
        id: generateId(),
        date: dateStr,
        categoryId,
        selectedSymptoms,
        frequency: randomInt(0, 4),
        impact: randomInt(0, 3),
        worstTime: pickOne(WORST_TIME_OPTIONS),
        notes: "",
      });
    }
  }

  _diaries = entries;
  return _diaries;
}

// ─── Aggregate Stats ────────────────────────────────────────────────────────

export function getMockStats(): MockStats {
  if (_stats) return _stats;

  const attacks = getMockAttacks();
  const checkins = getMockCheckins();
  const adherence = getMockAdherence();

  const now = NOW;
  const thirtyDaysAgo = formatDate(addDays(now, -30));
  const ninetyDaysAgo = formatDate(addDays(now, -90));
  const nowStr = formatDate(now);

  // Attacks last 30 / 90 days
  const attacksLast30 = attacks.filter((a) => a.date >= thirtyDaysAgo && a.date <= nowStr);
  const attacksLast90 = attacks.filter((a) => a.date >= ninetyDaysAgo && a.date <= nowStr);

  // Avg pain last 30 days
  const avgPainLast30Days = attacksLast30.length > 0
    ? parseFloat((attacksLast30.reduce((sum, a) => sum + a.painLevel, 0) / attacksLast30.length).toFixed(1))
    : 0;

  // Top triggers from last 90 days
  const triggerCounts: Record<string, number> = {};
  for (const attack of attacksLast90) {
    for (const trigger of attack.triggers) {
      triggerCounts[trigger] = (triggerCounts[trigger] || 0) + 1;
    }
  }
  const topTriggers = Object.entries(triggerCounts)
    .map(([trigger, count]) => ({ trigger, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Total check-ins
  const totalCheckins = checkins.length;

  // Check-in streak (consecutive days ending at NOW)
  let checkinStreak = 0;
  const checkinDates = new Set(checkins.map((c) => c.date));
  for (let i = 0; i < 365; i++) {
    const dateStr = formatDate(addDays(now, -i));
    if (checkinDates.has(dateStr)) {
      checkinStreak++;
    } else {
      break;
    }
  }

  // Medication adherence rate (last 30 days)
  const recentAdherence = adherence.filter((a) => a.date >= thirtyDaysAgo && a.date <= nowStr);
  const medicationAdherenceRate = recentAdherence.length > 0
    ? parseFloat((recentAdherence.filter((a) => a.taken).length / recentAdherence.length).toFixed(2))
    : 0;

  _stats = {
    attacksLast30Days: attacksLast30.length,
    attacksLast90Days: attacksLast90.length,
    avgPainLast30Days,
    topTriggers,
    totalCheckins,
    checkinStreak,
    medicationAdherenceRate,
  };

  return _stats;
}
