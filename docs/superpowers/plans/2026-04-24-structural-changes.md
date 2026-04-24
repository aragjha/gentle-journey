# Structural Changes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire real persisted attack/check-in logs, add OTP verification, apply conditional flow logic (#9 skip attack re-entry, #11b menstrual gating, #11c skip med-help), and add the post-migraine recap flow.

**Architecture:** Single `Index.tsx` router with `usePersistedState` for localStorage; all new state is added there and passed as props. Two new pages (`OtpVerifyPage`, `PostMigraineFlow`) follow the existing page pattern — full-screen components with no routing of their own. A shared `src/types/logs.ts` defines `HeadacheLog`/`CheckInLog`; `src/utils/attackUtils.ts` holds the `hasAttackToday` helper.

**Tech Stack:** React 18 + TypeScript, Vite, TailwindCSS + shadcn/ui, Framer Motion, `usePersistedState` hook (`src/hooks/usePersistedState.ts`).

**Verification command (run after each task):** `npx tsc --noEmit` — expect zero output (zero errors).

---

### Task 1: Types + State Foundation

**Files:**
- Create: `src/types/logs.ts`
- Create: `src/utils/attackUtils.ts`
- Modify: `src/pages/Index.tsx`

- [ ] **Step 1: Create `src/types/logs.ts`**

```ts
export interface HeadacheLog {
  id: string;
  startTime: string;       // ISO string
  endTime?: string;
  duration?: number;       // minutes
  zones: string[];
  painPeak: number;        // 0-10
  painEnd?: number;
  symptoms: string[];
  triggers: string[];
  medications: string[];
  reliefEffectiveness?: number;
  lingeringSymptoms?: string[];
  notes?: string;
  status: "active" | "ended";
}

export interface CheckInLog {
  id: string;
  date: string;            // YYYY-MM-DD
  feeling: number;         // overall slider 0-10
  hadHeadache: boolean;
  headacheSeverity?: string;
  sleepQuality?: string;
  medicationTaken?: string;
  mood?: string;
  disability?: number;     // 0-3 MIDAS
  painLocations?: string[];
  symptoms?: string[];
  triggers?: string[];
}
```

- [ ] **Step 2: Create `src/utils/attackUtils.ts`**

```ts
import { HeadacheLog } from "@/types/logs";

export function hasAttackToday(logs: HeadacheLog[]): boolean {
  const today = new Date().toDateString();
  return logs.some((l) => new Date(l.startTime).toDateString() === today);
}

export function timingToStartTime(timingId: string): string {
  const now = new Date();
  switch (timingId) {
    case "1h_ago":
      return new Date(now.getTime() - 60 * 60 * 1000).toISOString();
    case "2h_ago":
      return new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString();
    case "this_morning": {
      const m = new Date(now);
      m.setHours(7, 0, 0, 0);
      return m.toISOString();
    }
    default:
      return now.toISOString();
  }
}
```

- [ ] **Step 3: Add new state to `Index.tsx`**

At the top of `Index.tsx`, add to the imports:
```ts
import { HeadacheLog, CheckInLog } from "@/types/logs";
```

Inside the `Index` component, after the existing `headacheCount` line (line ~88), add:
```ts
const [attackLogs, setAttackLogs] = usePersistedState<HeadacheLog[]>("nc-attack-logs", []);
const [checkInLogs, setCheckInLogs] = usePersistedState<CheckInLog[]>("nc-checkin-logs", []);
const [menstrualEnabled, setMenstrualEnabled] = usePersistedState<boolean>("nc-menstrual-enabled", false);
const [otpEmail, setOtpEmail] = useState<string>("");
```

Replace the existing `activeMigraine` type on line ~89:
```ts
// Before:
const [activeMigraine, setActiveMigraine] = useState<{ startTime: Date } | null>(null);

// After:
const [activeMigraine, setActiveMigraine] = useState<{
  startTime: Date;
  painPeak?: number;
  zones?: string[];
  medsTaken?: string[];
  attackLogId?: string;
} | null>(null);
```

- [ ] **Step 4: Add `updateAttackLog` helper inside Index component (after state declarations)**

```ts
const updateAttackLog = (id: string, patch: Partial<HeadacheLog>) => {
  setAttackLogs((prev) =>
    prev.map((l) => (l.id === id ? { ...l, ...patch } : l))
  );
};
```

- [ ] **Step 5: Verify**

```bash
npx tsc --noEmit
```
Expected: no output (zero errors).

- [ ] **Step 6: Commit**

```bash
git add src/types/logs.ts src/utils/attackUtils.ts src/pages/Index.tsx
git commit -m "feat: add HeadacheLog/CheckInLog types, attackUtils, and new persisted state"
```

---

### Task 2: Wire LogHeadacheFlow to Emit a Log

**Files:**
- Modify: `src/pages/LogHeadacheFlow.tsx`
- Modify: `src/pages/Index.tsx`

- [ ] **Step 1: Update `LogHeadacheFlowProps` interface in `LogHeadacheFlow.tsx`**

```ts
// Before (line ~10):
interface LogHeadacheFlowProps {
  onComplete: () => void;
  onBack: () => void;
}

// After:
import { HeadacheLog } from "@/types/logs";
import { timingToStartTime } from "@/utils/attackUtils";

interface LogHeadacheFlowProps {
  onComplete: (log: HeadacheLog) => void;
  onBack: () => void;
}
```

- [ ] **Step 2: Build and emit the log in the `complete` step handler**

The `complete` case is at line ~112. The `GratificationScreen` `onContinue` currently calls `onComplete`. Replace with:

```tsx
if (currentStep === "complete") {
  const log: HeadacheLog = {
    id: crypto.randomUUID(),
    startTime: timingToStartTime(timing ?? "just_now"),
    zones: selectedZones,
    painPeak: painLevel,
    symptoms: answers["symptoms"] ?? [],
    triggers: answers["triggers"] ?? [],
    medications: answers["medications"] ?? [],
    notes: notes || undefined,
    status: "active",
  };
  return (
    <GratificationScreen
      title="Headache Logged ✅"
      subtitle="Tracking attacks helps identify patterns and triggers."
      onContinue={() => onComplete(log)}
      ctaText="Back to Home"
      type="success"
    />
  );
}
```

- [ ] **Step 3: Update `log-headache` case in `Index.tsx`**

Find the `case "log-headache":` block (line ~456) and replace the `onComplete` handler:

```tsx
case "log-headache":
  return (
    <LogHeadacheFlow
      onComplete={(log) => {
        setHeadacheCount((c) => c + 1);
        setAttackLogs((prev) => [...prev, log]);
        setActiveMigraine({
          startTime: new Date(log.startTime),
          painPeak: log.painPeak,
          zones: log.zones,
          medsTaken: log.medications,
          attackLogId: log.id,
        });
        if (localStorage.getItem("smart-dark-mode") === "true") {
          document.documentElement.classList.add("dark");
          document.documentElement.setAttribute("data-theme", "dark");
          localStorage.setItem("theme", "dark");
        }
        setCurrentScreen("home");
      }}
      onBack={() => setCurrentScreen(previousScreen === "log-headache" ? "home" : previousScreen)}
    />
  );
```

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit
```
Expected: no output.

- [ ] **Step 5: Commit**

```bash
git add src/pages/LogHeadacheFlow.tsx src/pages/Index.tsx
git commit -m "feat: LogHeadacheFlow emits HeadacheLog on complete, wired into attackLogs + activeMigraine"
```

---

### Task 3: Wire DailyCheckinFlow to Emit a Log

**Files:**
- Modify: `src/pages/DailyCheckinFlow.tsx`
- Modify: `src/pages/Index.tsx`

- [ ] **Step 1: Update `DailyCheckinFlowProps` and add import**

At the top of `DailyCheckinFlow.tsx` add:
```ts
import { CheckInLog } from "@/types/logs";
```

Update the props interface (line ~170):
```ts
// Before:
interface DailyCheckinFlowProps {
  onComplete: () => void;
  onBack: () => void;
  diagnosis?: Diagnosis | null;
}

// After:
interface DailyCheckinFlowProps {
  onComplete: (log: CheckInLog) => void;
  onBack: () => void;
  diagnosis?: Diagnosis | null;
  attackLogs?: HeadacheLog[];
  onUpdateAttackNote?: (attackId: string, note: string) => void;
}
```

Also add to the top import:
```ts
import { HeadacheLog } from "@/types/logs";
```

- [ ] **Step 2: Build and emit CheckInLog in the gratification handler**

The `showGratification` is set to `true` in `handleContinue` when on the last question (line ~218). Change `setShowGratification(true)` to call `onComplete` with the log before showing the screen. Easiest: store the log in state.

Add a state var and build the log:

```ts
// Add after existing useState lines:
const [completedLog, setCompletedLog] = useState<CheckInLog | null>(null);
```

Change `handleContinue` at line ~217:
```ts
const handleContinue = () => {
  if (currentQuestionIndex >= checkInQuestions.length - 1) {
    const ans = answers;
    const log: CheckInLog = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().split("T")[0],
      feeling: typeof ans.overall === "number" ? ans.overall : 5,
      hadHeadache: (ans.headache_today as string[])?.[0] !== "no",
      headacheSeverity: (ans.headache_today as string[])?.[0],
      medicationTaken: (ans.medication_taken as string[])?.[0],
      disability: parseInt((ans.disability as string[])?.[0] ?? "0", 10),
      painLocations: (ans.pain_location as string[]) ?? [],
      symptoms: (ans.symptoms as string[]) ?? [],
      triggers: (ans.triggers as string[]) ?? [],
    };
    setCompletedLog(log);
    setShowGratification(true);
  } else {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }
};
```

Update the GratificationScreen `onContinue` at line ~239:
```tsx
onContinue={() => onComplete(completedLog!)}
```

- [ ] **Step 3: Update `checkin` case in `Index.tsx` (line ~385)**

```tsx
// Before:
const handleCheckinComplete = () => setCurrentScreen("home");

// After:
const handleCheckinComplete = (log: CheckInLog) => {
  setCheckInLogs((prev) => [...prev, log]);
  setCurrentScreen("home");
};
```

Also update `handleStartCheckin` — it routes to Neura, but the standalone `checkin` case needs updated props. Update the `case "checkin":` block:
```tsx
case "checkin":
  return (
    <DailyCheckinFlow
      onComplete={handleCheckinComplete}
      onBack={() => setCurrentScreen(previousScreen)}
      diagnosis={diagnosis}
      attackLogs={attackLogs}
      onUpdateAttackNote={(id, note) => updateAttackLog(id, { notes: note })}
    />
  );
```

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit
```
Expected: no output.

- [ ] **Step 5: Commit**

```bash
git add src/pages/DailyCheckinFlow.tsx src/pages/Index.tsx
git commit -m "feat: DailyCheckinFlow emits CheckInLog on complete, wired into checkInLogs"
```

---

### Task 4: DiariesHub — Replace Mock Calendar Data with Real Logs

**Files:**
- Modify: `src/pages/DiariesHub.tsx`
- Modify: `src/pages/Index.tsx`

- [ ] **Step 1: Update `DiariesHubProps` and add imports**

Add to top of `DiariesHub.tsx`:
```ts
import { HeadacheLog, CheckInLog } from "@/types/logs";
```

Update props interface (line ~23):
```ts
interface DiariesHubProps {
  onStartCheckin: () => void;
  onNavigate: (tab: "home" | "maps" | "tools" | "profile") => void;
  onOpenDiary: (diaryId: string) => void;
  onOpenNeuraWithScript?: (scriptId: ScriptId | null) => void;
  diagnosis?: Diagnosis | null;
  attackLogs?: HeadacheLog[];
  checkInLogs?: CheckInLog[];
}
```

- [ ] **Step 2: Add prop destructuring and derived calendar data**

Update destructuring in `DiariesHub` component body:
```ts
const DiariesHub = ({
  onStartCheckin: _onStartCheckin,
  onNavigate,
  onOpenDiary,
  onOpenNeuraWithScript,
  diagnosis,
  attackLogs = [],
  checkInLogs = [],
}: DiariesHubProps) => {
```

Remove the `const MOCK_ATTACKS` and `const MOCK_CHECKINS` lines at the top of the file (lines ~32-33).

Inside the component body, replace the hardcoded `attacks` list (line ~167) with:
```ts
// Current month/year for calendar
const now = new Date();
const calYear = now.getFullYear();
const calMonth = now.getMonth();
const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
// Day offset: 0=Sun, 1=Mon, ..., 6=Sat
const calOffset = new Date(calYear, calMonth, 1).getDay();
const calMonthLabel = now.toLocaleDateString("en-US", { month: "long", year: "numeric" });

// Map attack logs to { day: painLevel } for current month
const calAttacks: Record<number, number> = {};
attackLogs.forEach((l) => {
  const d = new Date(l.startTime);
  if (d.getFullYear() === calYear && d.getMonth() === calMonth) {
    const day = d.getDate();
    calAttacks[day] = Math.max(calAttacks[day] ?? 0, l.painPeak);
  }
});

// Map check-in logs to Set<day> for current month
const calCheckins = new Set<number>();
checkInLogs.forEach((l) => {
  const d = new Date(l.date);
  if (d.getFullYear() === calYear && d.getMonth() === calMonth) {
    calCheckins.add(d.getDate());
  }
});

// Recent attacks list for display (last 10, newest first)
const recentAttacks = [...attackLogs]
  .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
  .slice(0, 10)
  .map((l) => ({
    d: new Date(l.startTime).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    pain: l.painPeak,
    dur: l.duration ? `${Math.round(l.duration / 60)}h` : "—",
    trig: l.triggers.length > 0 ? l.triggers.slice(0, 2).join(" + ") : "No triggers logged",
  }));
```

- [ ] **Step 3: Update `MonthCalendar` call and hardcoded calendar props**

Find the `MonthCalendar` call in the render and update to use real data:
```tsx
<MonthCalendar attacks={calAttacks} checkins={calCheckins} />
```

Update the `MonthCalendar` component header text from hardcoded `"April 2026"` to `{calMonthLabel}` — pass it as a prop:

In `MonthCalendar` component (line ~53), add `label` prop:
```ts
const MonthCalendar = ({ attacks, checkins, label, daysInMonth, offset }: {
  attacks: Record<number, number>;
  checkins: Set<number>;
  label: string;
  daysInMonth: number;
  offset: number;
}) => {
  const days: (number | null)[] = [];
  for (let i = 0; i < offset; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  // today is dynamic: only mark "today" if current month/year matches
  const now = new Date();
  const today = now.getDate();
  // Replace hardcoded "April 2026" header text with {label}
  // Replace hardcoded `const today = d === 21` check with `d === today`
  // Rest of render unchanged
```

Update the call site:
```tsx
<MonthCalendar
  attacks={calAttacks}
  checkins={calCheckins}
  label={calMonthLabel}
  daysInMonth={daysInMonth}
  offset={calOffset}
/>
```

Replace the hardcoded `const attacks = [...]` list in the component body with `recentAttacks` (already computed above). Pass to `AttackList`:
```tsx
{view === "list" && <AttackList items={recentAttacks} />}
```

- [ ] **Step 4: Update `diaries` case in `Index.tsx` (line ~363)**

```tsx
case "diaries":
  return (
    <DiariesHub
      onStartCheckin={handleStartCheckin}
      onNavigate={handleNavigate}
      onOpenDiary={handleOpenDiary}
      onOpenNeuraWithScript={handleOpenNeuraWithScript}
      diagnosis={diagnosis}
      attackLogs={attackLogs}
      checkInLogs={checkInLogs}
    />
  );
```

- [ ] **Step 5: Verify**

```bash
npx tsc --noEmit
```
Expected: no output.

- [ ] **Step 6: Commit**

```bash
git add src/pages/DiariesHub.tsx src/pages/Index.tsx
git commit -m "feat: DiariesHub calendar uses real attackLogs/checkInLogs instead of mock data"
```

---

### Task 5: MigraineOnboarding → Persist Menstrual Flag

**Files:**
- Modify: `src/components/MigraineOnboarding.tsx`
- Modify: `src/components/OnboardingFlow.tsx`
- Modify: `src/pages/Index.tsx`

- [ ] **Step 1: Add `onMenstrualEnabled` prop to `MigraineOnboarding`**

In `MigraineOnboarding.tsx`, update `MigraineOnboardingProps` (line ~10):
```ts
interface MigraineOnboardingProps {
  onComplete: (profile: MigraineProfile) => void;
  onSkip?: () => void;
  onBack?: () => void;
  onAddMedications?: (profile: MigraineProfile) => void;
  onMenstrualEnabled?: () => void;
}
```

Update component destructuring (line ~210):
```ts
const MigraineOnboarding = ({
  onComplete,
  onBack,
  onAddMedications,
  onMenstrualEnabled,
}: MigraineOnboardingProps) => {
```

- [ ] **Step 2: Call `onMenstrualEnabled` in the ready step button handler**

Find the "ready" step button click handler (line ~516):
```tsx
// Before:
onClick={() => {
  if (onAddMedications) onAddMedications(data);
  else onComplete(data);
}}

// After:
onClick={() => {
  if (["yes", "irregular", "peri"].includes(data.menstrual ?? "")) {
    onMenstrualEnabled?.();
  }
  if (onAddMedications) onAddMedications(data);
  else onComplete(data);
}}
```

- [ ] **Step 3: Thread `onMenstrualEnabled` through `OnboardingFlow`**

In `OnboardingFlow.tsx`, add to `OnboardingFlowProps` (line ~300):
```ts
interface OnboardingFlowProps {
  onComplete: (diagnosis: Diagnosis) => void;
  onSkip?: () => void;
  onAddMedications?: (state: OnboardingState) => void;
  initialState?: OnboardingState;
  onMenstrualEnabled?: () => void;
}
```

Update destructuring:
```ts
const OnboardingFlow = ({ onComplete, onSkip, onAddMedications, initialState, onMenstrualEnabled }: OnboardingFlowProps) => {
```

Pass to `MigraineOnboarding` render (line ~520):
```tsx
<MigraineOnboarding
  onComplete={(profile) => { ... }}  // unchanged
  onSkip={onSkip}
  onBack={() => setShowDiagnosisQuestion(true)}
  onMenstrualEnabled={onMenstrualEnabled}
/>
```

- [ ] **Step 4: Pass `onMenstrualEnabled` from `Index.tsx`**

Find the `case "onboarding":` `<OnboardingFlow` render (line ~310):
```tsx
<OnboardingFlow
  onComplete={handleOnboardingComplete}
  onSkip={handleSkipOnboarding}
  onAddMedications={...}
  initialState={savedOnboardingState}
  onMenstrualEnabled={() => setMenstrualEnabled(true)}
/>
```

- [ ] **Step 5: Verify**

```bash
npx tsc --noEmit
```
Expected: no output.

- [ ] **Step 6: Commit**

```bash
git add src/components/MigraineOnboarding.tsx src/components/OnboardingFlow.tsx src/pages/Index.tsx
git commit -m "feat: persist menstrual flag when MigraineOnboarding completes with cycle answer"
```

---

### Task 6: Menstrual Gate — NotificationSettings + TriggerMedicationFlow

**Files:**
- Modify: `src/components/NotificationSettings.tsx`
- Modify: `src/pages/TriggerMedicationFlow.tsx`

- [ ] **Step 1: Read menstrual flag in `NotificationSettings`**

In `NotificationSettings.tsx`, modify the component to read the flag and filter the cycle-alert setting:

```tsx
const NotificationSettings = () => {
  const menstrualEnabled = localStorage.getItem("nc-menstrual-enabled") === "true";
  
  const filteredDefaults = menstrualEnabled
    ? defaultSettings
    : defaultSettings.filter((s) => s.id !== "cycle-alert");

  const [settings, setSettings] = useState<NotificationSetting[]>(filteredDefaults);
  // ... rest unchanged
};
```

- [ ] **Step 2: Add `menstrualEnabled` prop to `TriggerMedicationFlow`**

In `TriggerMedicationFlow.tsx`, update the props interface (line ~14):
```ts
interface TriggerMedicationFlowProps {
  onComplete: () => void;
  onBack: () => void;
  menstrualEnabled?: boolean;
}
```

Update component destructuring:
```ts
const TriggerMedicationFlow = ({ onComplete, onBack, menstrualEnabled = false }: TriggerMedicationFlowProps) => {
```

- [ ] **Step 3: Filter menstrual subtype when not enabled**

Find where the subtypes for the selected trigger type are rendered (in `renderTriggerDetail`). The `periodical` type has a `menstrual` subtype. Add a filter:

```tsx
// In the subtype rendering map, filter if not enabled:
const visibleSubtypes = selectedType?.subtypes.filter(
  (s) => s.id !== "menstrual" || menstrualEnabled
) ?? [];

// Replace selectedType?.subtypes.map(...) with visibleSubtypes.map(...)
```

- [ ] **Step 4: Pass `menstrualEnabled` from `Index.tsx`**

Find the `case "trigger-medication":` block (line ~473):
```tsx
case "trigger-medication":
  return (
    <TriggerMedicationFlow
      onComplete={() => setCurrentScreen("home")}
      onBack={() => setCurrentScreen(previousScreen === "trigger-medication" ? "home" : previousScreen)}
      menstrualEnabled={menstrualEnabled}
    />
  );
```

- [ ] **Step 5: Verify**

```bash
npx tsc --noEmit
```
Expected: no output.

- [ ] **Step 6: Commit**

```bash
git add src/components/NotificationSettings.tsx src/pages/TriggerMedicationFlow.tsx src/pages/Index.tsx
git commit -m "feat: gate cycle-alert and menstrual trigger subtype behind nc-menstrual-enabled flag"
```

---

### Task 7: OTP Verification Screen

**Files:**
- Create: `src/pages/OtpVerifyPage.tsx`
- Modify: `src/pages/AuthPage.tsx`
- Modify: `src/pages/Index.tsx`

- [ ] **Step 1: Create `src/pages/OtpVerifyPage.tsx`**

```tsx
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

interface OtpVerifyPageProps {
  email: string;
  onVerified: () => void;
  onBack: () => void;
}

const OtpVerifyPage = ({ email, onVerified, onBack }: OtpVerifyPageProps) => {
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(30);
  const [error, setError] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setInterval(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [resendCooldown]);

  const handleDigitChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = digit;
    setDigits(next);
    setError(false);
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    if (digit && index === 5) {
      handleVerify(next);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (d = digits) => {
    const code = d.join("");
    if (code.length < 6) return;
    setLoading(true);
    // Demo: any 6-digit code succeeds.
    // Real: await supabase.auth.verifyOtp({ email, token: code, type: "signup" });
    setTimeout(() => {
      setLoading(false);
      onVerified();
    }, 600);
  };

  const code = digits.join("");

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">
      <div className="px-5 pt-14 pb-2 flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center active:bg-muted/70"
          aria-label="Go back"
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={2.2} />
        </button>
        <div className="flex-1 h-1.5 rounded-sm bg-foreground/10 overflow-hidden">
          <div
            className="h-full rounded-sm"
            style={{ width: "100%", background: "linear-gradient(90deg, #3B82F6 0%, #7C3AED 100%)" }}
          />
        </div>
        <div className="w-10 text-xs text-muted-foreground text-right tabular-nums">1/1</div>
      </div>

      <div className="flex-1 flex flex-col px-6 pt-5">
        <div
          className="text-[36px] font-medium leading-[1.05] text-foreground mb-2"
          style={{ fontFamily: "'Fraunces', Georgia, serif", letterSpacing: "-0.02em" }}
        >
          Check your email
        </div>
        <div className="text-muted-foreground text-[15px] mb-8">
          We sent a 6-digit code to <span className="font-semibold text-foreground">{email}</span>
        </div>

        <motion.div
          className="flex gap-2.5 mb-6"
          animate={error ? { x: [0, -8, 8, -8, 8, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={2}
              value={d}
              onChange={(e) => handleDigitChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              disabled={loading}
              className={`flex-1 h-14 text-center text-[22px] font-bold rounded-[14px] border-[1.5px] outline-none bg-card text-foreground transition-colors ${
                error
                  ? "border-red-500"
                  : d
                  ? "border-accent"
                  : "border-border focus:border-accent"
              }`}
            />
          ))}
        </motion.div>

        {error && (
          <p className="text-[13px] text-red-500 text-center mb-4">
            That code didn't work. Please try again.
          </p>
        )}

        <button
          disabled={code.length < 6 || loading}
          onClick={() => handleVerify()}
          className="w-full h-14 rounded-[28px] border-0 text-white text-base font-bold flex items-center justify-center mb-4 transition-transform active:scale-[0.98] disabled:cursor-not-allowed"
          style={{
            background:
              code.length < 6 || loading
                ? "hsl(var(--border))"
                : "linear-gradient(135deg, #1B2A4E 0%, #3B82F6 100%)",
            color: code.length < 6 || loading ? "hsl(var(--muted-foreground))" : "#fff",
            boxShadow: code.length < 6 || loading ? "none" : "0 8px 22px rgba(59,130,246,0.32)",
          }}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        <div className="text-center text-[13px] text-muted-foreground">
          Didn't get it?{" "}
          {resendCooldown > 0 ? (
            <span className="text-muted-foreground/60">Resend code ({resendCooldown}s)</span>
          ) : (
            <button
              onClick={() => setResendCooldown(30)}
              className="bg-transparent border-0 cursor-pointer text-accent font-semibold"
            >
              Resend code
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpVerifyPage;
```

- [ ] **Step 2: Add `onNeedsOtpVerify` prop to `AuthPage`**

In `AuthPage.tsx`, update `AuthPageProps` (line ~8):
```ts
interface AuthPageProps {
  onAuthSuccess: () => void;
  onBack: () => void;
  onSkip?: () => void;
  initialMode?: AuthMode;
  onNeedsOtpVerify?: (email: string) => void;
}
```

Update component destructuring:
```ts
const AuthPage = ({ onAuthSuccess, onBack, onSkip, initialMode = "signup", onNeedsOtpVerify }: AuthPageProps) => {
```

In `handleEmailAuth`, find the signup success path (line ~169):
```ts
// Before:
toast.success("Check your email to verify your account!");
onAuthSuccess();

// After:
toast.success("Check your email for your 6-digit verification code!");
if (onNeedsOtpVerify) {
  onNeedsOtpVerify(email);
} else {
  onAuthSuccess();
}
```

- [ ] **Step 3: Add OTP routing to `Index.tsx`**

Add `"verify-otp"` to the `AppScreen` union (line ~39):
```ts
type AppScreen =
  | "splash"
  | "auth"
  | "verify-otp"       // ← add this
  | "consent"
  // ... rest unchanged
```

Add import at top:
```ts
import OtpVerifyPage from "@/pages/OtpVerifyPage";
```

Add handler after `handleAuthBack`:
```ts
const handleNeedsOtpVerify = (email: string) => {
  setOtpEmail(email);
  setCurrentScreen("verify-otp");
};
```

Update `case "auth":` to pass the new prop:
```tsx
case "auth":
  return (
    <AuthPage
      onAuthSuccess={handleAuthSuccess}
      onBack={handleAuthBack}
      onSkip={handleSkipToHome}
      initialMode={authMode}
      onNeedsOtpVerify={handleNeedsOtpVerify}
    />
  );
```

Add new routing case after `case "auth":`:
```tsx
case "verify-otp":
  return (
    <OtpVerifyPage
      email={otpEmail}
      onVerified={handleAuthSuccess}
      onBack={() => setCurrentScreen("auth")}
    />
  );
```

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit
```
Expected: no output.

- [ ] **Step 5: Commit**

```bash
git add src/pages/OtpVerifyPage.tsx src/pages/AuthPage.tsx src/pages/Index.tsx
git commit -m "feat: add OTP verification screen between signup and consent"
```

---

### Task 8: DailyCheckinFlow Conditional Logic (#9 + #11c)

**Files:**
- Modify: `src/pages/DailyCheckinFlow.tsx`

- [ ] **Step 1: Add imports and props for attack-already-logged interstitial**

`DailyCheckinFlow.tsx` already has `attackLogs` and `onUpdateAttackNote` props from Task 3. Add import:
```ts
import { hasAttackToday } from "@/utils/attackUtils";
```

- [ ] **Step 2: Add interstitial state**

After the existing `useState` declarations (line ~178):
```ts
const [showAttackInterstitial, setShowAttackInterstitial] = useState(false);
const [interstitialNote, setInterstitialNote] = useState("");
const [showNoteInput, setShowNoteInput] = useState(false);
```

- [ ] **Step 3: Override `handleSelect` auto-advance for `headache_today`**

The auto-advance timer fires 300ms after a single-select answer. For `headache_today = "yes"` when an attack was already logged today, intercept before advancing:

```ts
const handleSelect = (id: string) => {
  if (!currentQuestion) return;

  if (currentQuestion.type === "multi") {
    const current = (answers[currentQuestion.id] as string[]) || [];
    if (current.includes(id)) {
      setAnswers({ ...answers, [currentQuestion.id]: current.filter((v) => v !== id) });
    } else {
      setAnswers({ ...answers, [currentQuestion.id]: [...current, id] });
    }
  } else {
    setAnswers({ ...answers, [currentQuestion.id]: [id] });
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);

    // #9: intercept headache_today="yes" if attack already logged today
    if (
      currentQuestion.id === "headache_today" &&
      id !== "no" &&
      hasAttackToday(attackLogs ?? [])
    ) {
      autoAdvanceTimer.current = setTimeout(() => {
        setShowAttackInterstitial(true);
      }, 300);
      return;
    }

    autoAdvanceTimer.current = setTimeout(() => {
      handleContinue();
    }, 300);
  }
};
```

- [ ] **Step 4: Add `getNextIndex` for #11c skip**

Add helper inside the component (before `handleContinue`):
```ts
const getNextIndex = (currentIdx: number, currentAnswers: typeof answers): number => {
  const q = checkInQuestions[currentIdx];
  if (!q) return currentIdx + 1;
  // #11c: after medication_taken = "no", jump to disability
  if (q.id === "medication_taken") {
    const medAnswer = (currentAnswers[q.id] as string[])?.[0];
    if (medAnswer === "no") {
      const disabilityIdx = checkInQuestions.findIndex((q) => q.id === "disability");
      return disabilityIdx >= 0 ? disabilityIdx : currentIdx + 1;
    }
  }
  return currentIdx + 1;
};
```

Update `handleContinue` to use the helper:
```ts
const handleContinue = () => {
  const nextIdx = getNextIndex(currentQuestionIndex, answers);
  if (nextIdx >= checkInQuestions.length) {
    // build log and show gratification (same as Task 3 Step 2)
    const ans = answers;
    const log: CheckInLog = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().split("T")[0],
      feeling: typeof ans.overall === "number" ? ans.overall : 5,
      hadHeadache: (ans.headache_today as string[])?.[0] !== "no",
      headacheSeverity: (ans.headache_today as string[])?.[0],
      medicationTaken: (ans.medication_taken as string[])?.[0],
      disability: parseInt((ans.disability as string[])?.[0] ?? "0", 10),
      painLocations: (ans.pain_location as string[]) ?? [],
      symptoms: (ans.symptoms as string[]) ?? [],
      triggers: (ans.triggers as string[]) ?? [],
    };
    setCompletedLog(log);
    setShowGratification(true);
  } else {
    setCurrentQuestionIndex(nextIdx);
  }
};
```

- [ ] **Step 5: Render the interstitial screen**

Add this render block just before the `if (showGratification)` check:
```tsx
if (showAttackInterstitial) {
  const disabilityIdx = checkInQuestions.findIndex((q) => q.id === "disability");
  const jumpToDisability = () => {
    setShowAttackInterstitial(false);
    setCurrentQuestionIndex(disabilityIdx >= 0 ? disabilityIdx : checkInQuestions.length - 1);
  };
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground px-6 pt-20">
      <div
        className="text-[28px] font-medium leading-tight text-foreground mb-2"
        style={{ fontFamily: "'Fraunces', Georgia, serif" }}
      >
        Already logged today
      </div>
      <p className="text-[15px] text-muted-foreground mb-8">
        You already logged a migraine today. Anything you want to add?
      </p>
      {showNoteInput ? (
        <div className="flex flex-col gap-3 mb-6">
          <textarea
            className="w-full rounded-[14px] border-[1.5px] border-border bg-card text-foreground text-[15px] p-4 outline-none focus:border-accent resize-none"
            rows={4}
            placeholder="Any updates, new symptoms, or notes..."
            value={interstitialNote}
            onChange={(e) => setInterstitialNote(e.target.value)}
          />
          <button
            onClick={() => {
              if (interstitialNote.trim()) {
                // Find most recent attack today and update notes
                const todayStr = new Date().toDateString();
                const todayAttack = [...(attackLogs ?? [])]
                  .filter((l) => new Date(l.startTime).toDateString() === todayStr)
                  .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())[0];
                if (todayAttack) onUpdateAttackNote?.(todayAttack.id, interstitialNote.trim());
              }
              jumpToDisability();
            }}
            className="w-full h-14 rounded-[28px] border-0 text-white text-base font-bold"
            style={{ background: "linear-gradient(135deg, #1B2A4E 0%, #3B82F6 100%)" }}
          >
            Save & Continue
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <button
            onClick={jumpToDisability}
            className="w-full h-14 rounded-[28px] border-0 text-white text-base font-bold"
            style={{ background: "linear-gradient(135deg, #1B2A4E 0%, #3B82F6 100%)" }}
          >
            All good — nothing to add
          </button>
          <button
            onClick={() => setShowNoteInput(true)}
            className="w-full h-14 rounded-[28px] border-[1.5px] border-border bg-card text-foreground text-base font-semibold"
          >
            Add a note
          </button>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 6: Verify**

```bash
npx tsc --noEmit
```
Expected: no output.

- [ ] **Step 7: Commit**

```bash
git add src/pages/DailyCheckinFlow.tsx
git commit -m "feat: DailyCheckinFlow skips attack re-entry (#9) and med-help steps on no-medication (#11c)"
```

---

### Task 9: PostMigraineFlow

**Files:**
- Create: `src/pages/PostMigraineFlow.tsx`
- Modify: `src/pages/Index.tsx`
- Modify: `src/pages/HomeHub.tsx`

- [ ] **Step 1: Create `src/pages/PostMigraineFlow.tsx`**

```tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import PainSlider from "@/components/PainSlider";
import GratificationScreen from "@/components/GratificationScreen";
import { HeadacheLog } from "@/types/logs";

interface PostMigraineFlowProps {
  activeMigraine: {
    startTime: Date;
    painPeak?: number;
    zones?: string[];
    medsTaken?: string[];
    attackLogId?: string;
  };
  onComplete: (patch: Partial<HeadacheLog>) => void;
  onBack: () => void;
}

type PostStep = "pain-now" | "helped" | "lingering" | "complete";
const POST_STEPS: PostStep[] = ["pain-now", "helped", "lingering"];

const HELPED_OPTIONS = [
  { id: "medication", label: "Medication" },
  { id: "rest", label: "Rest" },
  { id: "darkness", label: "Darkness / quiet" },
  { id: "ice", label: "Ice pack" },
  { id: "nothing", label: "Nothing helped" },
];

const LINGERING_OPTIONS = [
  { id: "fatigue", label: "Fatigue" },
  { id: "nausea", label: "Nausea" },
  { id: "neck_stiffness", label: "Neck stiffness" },
  { id: "brain_fog", label: "Brain fog" },
  { id: "none", label: "None" },
];

function formatDuration(start: Date): string {
  const ms = Date.now() - start.getTime();
  const mins = Math.round(ms / 60000);
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

const RecapCard = ({ activeMigraine }: { activeMigraine: PostMigraineFlowProps["activeMigraine"] }) => (
  <div className="bg-card border border-border rounded-[20px] p-4 mb-5">
    <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.15em] mb-2">
      This migraine
    </div>
    <div className="grid grid-cols-2 gap-2">
      {[
        { label: "Duration", value: formatDuration(activeMigraine.startTime) },
        { label: "Peak pain", value: activeMigraine.painPeak != null ? `${activeMigraine.painPeak}/10` : "—" },
        { label: "Location", value: activeMigraine.zones?.slice(0, 2).join(", ") || "—" },
        { label: "Meds taken", value: activeMigraine.medsTaken?.slice(0, 2).join(", ") || "—" },
      ].map(({ label, value }) => (
        <div key={label}>
          <div className="text-[10px] text-muted-foreground">{label}</div>
          <div className="text-[13px] font-semibold text-foreground truncate">{value}</div>
        </div>
      ))}
    </div>
  </div>
);

const PostMigraineFlow = ({ activeMigraine, onComplete, onBack }: PostMigraineFlowProps) => {
  const [step, setStep] = useState<PostStep>("pain-now");
  const [painEnd, setPainEnd] = useState(0);
  const [helped, setHelped] = useState<string[]>([]);
  const [lingering, setLingering] = useState<string[]>([]);
  const stepIndex = POST_STEPS.indexOf(step);

  const toggleChip = (setter: React.Dispatch<React.SetStateAction<string[]>>, id: string) => {
    setter((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (step === "lingering") {
      const patch: Partial<HeadacheLog> = {
        endTime: new Date().toISOString(),
        painEnd,
        reliefEffectiveness: helped.includes("nothing") ? 0 : helped.length > 0 ? 7 : undefined,
        lingeringSymptoms: lingering.filter((l) => l !== "none"),
        status: "ended",
      };
      onComplete(patch);
      setStep("complete");
    } else {
      setStep(POST_STEPS[stepIndex + 1]);
    }
  };

  if (step === "complete") {
    return (
      <GratificationScreen
        title="Migraine logged."
        subtitle="Rest up — the data is saved. We'll look for patterns as you track more."
        onContinue={onBack}
        ctaText="Back to Home"
        type="success"
      />
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-background text-foreground flex flex-col">
      <div className="px-5 pt-14 pb-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-muted flex items-center justify-center border-0 cursor-pointer"
          aria-label="Back"
        >
          <ChevronLeft className="w-[18px] h-[18px]" strokeWidth={2.2} />
        </button>
        <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full transition-[width] duration-300"
            style={{
              width: `${((stepIndex + 1) / POST_STEPS.length) * 100}%`,
              background: "linear-gradient(90deg, #3B82F6 0%, #7C3AED 100%)",
            }}
          />
        </div>
        <div className="text-[11px] font-bold text-muted-foreground tabular-nums min-w-[28px] text-right">
          {stepIndex + 1}/{POST_STEPS.length}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.22 }}
          className="flex-1 flex flex-col px-5 pt-2 pb-8 overflow-y-auto"
        >
          <RecapCard activeMigraine={activeMigraine} />

          {step === "pain-now" && (
            <>
              <h2 className="text-xl font-bold text-foreground mb-1">How's the pain now?</h2>
              <p className="text-sm text-muted-foreground mb-6">Rate the pain as it is right now.</p>
              <div className="flex-1 flex flex-col items-center justify-center">
                <PainSlider value={painEnd} onChange={setPainEnd} />
              </div>
              <button
                onClick={handleNext}
                className="w-full h-14 rounded-[28px] border-0 text-white text-base font-bold mt-6"
                style={{ background: "linear-gradient(135deg, #1B2A4E 0%, #3B82F6 100%)" }}
              >
                Next
              </button>
            </>
          )}

          {step === "helped" && (
            <>
              <h2 className="text-xl font-bold text-foreground mb-1">What helped most?</h2>
              <p className="text-sm text-muted-foreground mb-5">Select all that apply.</p>
              <div className="flex flex-wrap gap-2.5 mb-8">
                {HELPED_OPTIONS.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => toggleChip(setHelped, o.id)}
                    className={`px-4 py-2.5 rounded-full border text-[13px] font-semibold transition-colors ${
                      helped.includes(o.id)
                        ? "bg-accent/15 border-accent text-accent"
                        : "bg-card border-border text-foreground"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
              <button
                onClick={handleNext}
                disabled={helped.length === 0}
                className="w-full h-14 rounded-[28px] border-0 text-white text-base font-bold disabled:cursor-not-allowed"
                style={{
                  background: helped.length === 0 ? "hsl(var(--border))" : "linear-gradient(135deg, #1B2A4E 0%, #3B82F6 100%)",
                  color: helped.length === 0 ? "hsl(var(--muted-foreground))" : "#fff",
                }}
              >
                Next
              </button>
            </>
          )}

          {step === "lingering" && (
            <>
              <h2 className="text-xl font-bold text-foreground mb-1">Any lingering symptoms?</h2>
              <p className="text-sm text-muted-foreground mb-5">Select all that apply.</p>
              <div className="flex flex-wrap gap-2.5 mb-8">
                {LINGERING_OPTIONS.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => toggleChip(setLingering, o.id)}
                    className={`px-4 py-2.5 rounded-full border text-[13px] font-semibold transition-colors ${
                      lingering.includes(o.id)
                        ? "bg-accent/15 border-accent text-accent"
                        : "bg-card border-border text-foreground"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
              <button
                onClick={handleNext}
                disabled={lingering.length === 0}
                className="w-full h-14 rounded-[28px] border-0 text-white text-base font-bold disabled:cursor-not-allowed"
                style={{
                  background: lingering.length === 0 ? "hsl(var(--border))" : "linear-gradient(135deg, #1B2A4E 0%, #3B82F6 100%)",
                  color: lingering.length === 0 ? "hsl(var(--muted-foreground))" : "#fff",
                }}
              >
                Done
              </button>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PostMigraineFlow;
```

- [ ] **Step 2: Add routing in `Index.tsx`**

Add `"post-migraine"` to `AppScreen` union:
```ts
type AppScreen =
  | "splash"
  | "auth"
  | "verify-otp"
  | "consent"
  // ... existing ...
  | "post-migraine";
```

Add import:
```ts
import PostMigraineFlow from "@/pages/PostMigraineFlow";
```

Change `onStopMigraine` handler (line ~352) from `setActiveMigraine(null)` to navigate to post-migraine:
```ts
// Before in the "home" case:
onStopMigraine={() => setActiveMigraine(null)}

// After:
onStopMigraine={() => {
  setPreviousScreen("home");
  setCurrentScreen("post-migraine");
}}
```

Add new routing case (before the `default:` case):
```tsx
case "post-migraine":
  if (!activeMigraine) return null;
  return (
    <PostMigraineFlow
      activeMigraine={activeMigraine}
      onComplete={(patch) => {
        if (activeMigraine.attackLogId) {
          updateAttackLog(activeMigraine.attackLogId, patch);
        } else {
          // No prior log (timer started without LogHeadacheFlow) — create minimal entry
          const log: HeadacheLog = {
            id: crypto.randomUUID(),
            startTime: activeMigraine.startTime.toISOString(),
            zones: activeMigraine.zones ?? [],
            painPeak: activeMigraine.painPeak ?? 0,
            symptoms: [],
            triggers: [],
            medications: activeMigraine.medsTaken ?? [],
            ...patch,
            status: "ended",
          };
          setAttackLogs((prev) => [...prev, log]);
        }
        setActiveMigraine(null);
        setCurrentScreen("home");
      }}
      onBack={() => {
        setActiveMigraine(null);
        setCurrentScreen("home");
      }}
    />
  );
```

- [ ] **Step 3: Update `HomeHub` `activeMigraine` prop type**

`HomeHub.tsx` props interface has `activeMigraine?: { startTime: Date } | null`. Update to match the extended type:

```ts
// In HomeHub.tsx interface:
activeMigraine?: {
  startTime: Date;
  painPeak?: number;
  zones?: string[];
  medsTaken?: string[];
  attackLogId?: string;
} | null;
```

The component only uses `activeMigraine.startTime` — no other changes needed inside the component body.

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit
```
Expected: no output.

- [ ] **Step 5: Commit**

```bash
git add src/pages/PostMigraineFlow.tsx src/pages/Index.tsx src/pages/HomeHub.tsx
git commit -m "feat: PostMigraineFlow — 3-step recap triggered after Mark migraine ended"
```

---

## Final Verification

After all tasks are complete, run:

```bash
npx tsc --noEmit && npm run build
```

Expected: TypeScript exits clean (no output), Vite build succeeds.

**Manual checks:**
1. Log a headache → verify attack appears on DiariesHub calendar on the correct day
2. Complete a daily check-in → verify calendar dot appears for today
3. Complete onboarding as female with "Yes, regularly" → open Notifications → verify Cycle Alerts is visible; revisit as "no" → Cycle Alerts hidden
4. Trigger flow with periodical/menstrual selected when `menstrualEnabled=false` → menstrual subtype not visible
5. Sign up with new email → OTP screen appears → type any 6 digits → advances to consent
6. Daily check-in: answer headache_today=mild after a headache is already logged → "Already logged today" interstitial appears
7. Daily check-in: medication_taken=no → disability question appears immediately (no extra steps)
8. Start a headache timer from HomeHub → tap "Mark migraine ended" → PostMigraineFlow appears → complete all 3 steps → confirm attack entry in DiariesHub has endTime set
