import { getMockCheckins, getMockDiaries } from "./mockUserData";
import { rewardMilestones, RewardMilestone } from "./rewardMilestones";

export interface WeekProgress {
  weekStart: string; // YYYY-MM-DD (Monday)
  checkinsCount: number;
  diaryCount: number;
  isComplete: boolean; // 7 check-ins + ≥2 diaries
}

export interface CurrentWeekProgress {
  weekStart: string;
  checkinsCount: number;
  diaryCount: number;
  daysInWeekSoFar: number; // how many days of this week have passed
  percentComplete: number; // 0-100 approximate
}

export interface RewardState {
  currentWeek: CurrentWeekProgress;
  totalCompleteWeeks: number;
  consecutiveCompleteWeeks: number;
  earnedMilestones: RewardMilestone[];
  nextMilestone: RewardMilestone | null;
  progressTowardNext: { current: number; target: number };
  totalEarnedDollars: number;
}

/** Get the Monday of the week for a given date (ISO-like) */
function getWeekStart(date: Date): string {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sunday, 1 = Monday, ...
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d.toISOString().split("T")[0];
}

/** Group check-ins + diaries by week */
export function getWeekProgress(referenceDate: Date = new Date("2026-04-15")): WeekProgress[] {
  const checkins = getMockCheckins();
  const diaries = getMockDiaries();
  const weeks: Record<string, { checkins: number; diaries: number }> = {};

  checkins.forEach((c) => {
    const week = getWeekStart(new Date(c.date));
    if (!weeks[week]) weeks[week] = { checkins: 0, diaries: 0 };
    weeks[week].checkins += 1;
  });
  diaries.forEach((d) => {
    const week = getWeekStart(new Date(d.date));
    if (!weeks[week]) weeks[week] = { checkins: 0, diaries: 0 };
    weeks[week].diaries += 1;
  });

  return Object.entries(weeks)
    .map(([weekStart, counts]) => ({
      weekStart,
      checkinsCount: counts.checkins,
      diaryCount: counts.diaries,
      isComplete: counts.checkins >= 7 && counts.diaries >= 2,
    }))
    .sort((a, b) => a.weekStart.localeCompare(b.weekStart));
}

/** Compute reward state as of referenceDate */
export function getRewardState(referenceDate: Date = new Date("2026-04-15")): RewardState {
  const allWeeks = getWeekProgress(referenceDate);
  const currentWeekStart = getWeekStart(referenceDate);

  // Current week (partial)
  const currentWeekRecord = allWeeks.find((w) => w.weekStart === currentWeekStart);
  const dayOfWeek = ((referenceDate.getDay() + 6) % 7) + 1; // Monday=1, Sunday=7
  const currentWeek: CurrentWeekProgress = {
    weekStart: currentWeekStart,
    checkinsCount: currentWeekRecord?.checkinsCount ?? 0,
    diaryCount: currentWeekRecord?.diaryCount ?? 0,
    daysInWeekSoFar: dayOfWeek,
    percentComplete: Math.round(
      (((currentWeekRecord?.checkinsCount ?? 0) / 7 + Math.min((currentWeekRecord?.diaryCount ?? 0) / 2, 1)) / 2) * 100
    ),
  };

  // Completed weeks (past only, not including current incomplete week)
  const completedPastWeeks = allWeeks.filter(
    (w) => w.isComplete && w.weekStart < currentWeekStart
  );

  // Count consecutive complete weeks ending at most recent fully-completed week
  let consecutive = 0;
  for (let i = allWeeks.length - 1; i >= 0; i--) {
    const w = allWeeks[i];
    if (w.weekStart >= currentWeekStart) continue; // skip current
    if (w.isComplete) consecutive++;
    else break;
  }

  // Determine earned milestones
  const totalWeeks = completedPastWeeks.length;
  const earned: RewardMilestone[] = [];

  for (const milestone of rewardMilestones) {
    switch (milestone.requirementType) {
      case "first-complete-week":
        if (totalWeeks >= 1) earned.push(milestone);
        break;
      case "consecutive-weeks":
        if (consecutive >= milestone.targetWeeks) earned.push(milestone);
        break;
      case "total-weeks":
        if (totalWeeks >= milestone.targetWeeks) earned.push(milestone);
        break;
    }
  }

  // Next milestone
  const nextMilestone = rewardMilestones.find((m) => !earned.includes(m)) ?? null;

  // Progress toward next
  let current = 0;
  let target = 0;
  if (nextMilestone) {
    target = nextMilestone.targetWeeks;
    switch (nextMilestone.requirementType) {
      case "first-complete-week":
        current = totalWeeks;
        target = 1;
        break;
      case "consecutive-weeks":
        current = consecutive;
        break;
      case "total-weeks":
        current = totalWeeks;
        break;
    }
  }

  const totalEarnedDollars = earned.reduce((sum, m) => sum + m.amount, 0);

  return {
    currentWeek,
    totalCompleteWeeks: totalWeeks,
    consecutiveCompleteWeeks: consecutive,
    earnedMilestones: earned,
    nextMilestone,
    progressTowardNext: { current, target },
    totalEarnedDollars,
  };
}
