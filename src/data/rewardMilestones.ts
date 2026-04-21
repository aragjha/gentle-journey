export interface RewardMilestone {
  id: string;
  amount: number; // USD value of Amazon gift card
  title: string;
  requirement: string;
  requirementType: "first-complete-week" | "consecutive-weeks" | "total-weeks";
  targetWeeks: number;
}

export const rewardMilestones: RewardMilestone[] = [
  {
    id: "first-week",
    amount: 10,
    title: "First Complete Week",
    requirement: "7 daily check-ins + 2 diary entries in one week",
    requirementType: "first-complete-week",
    targetWeeks: 1,
  },
  {
    id: "4-week-streak",
    amount: 25,
    title: "4-Week Streak",
    requirement: "4 consecutive complete weeks",
    requirementType: "consecutive-weeks",
    targetWeeks: 4,
  },
  {
    id: "12-week-streak",
    amount: 50,
    title: "12-Week Streak",
    requirement: "12 consecutive complete weeks",
    requirementType: "consecutive-weeks",
    targetWeeks: 12,
  },
  {
    id: "6-month-tracker",
    amount: 100,
    title: "6-Month Tracker",
    requirement: "24 complete weeks (total)",
    requirementType: "total-weeks",
    targetWeeks: 24,
  },
];
