import { NeuraContent } from "@/components/NeuraContentCard";

export const neuraContentLibrary: Record<string, NeuraContent> = {
  "triggers-overview": {
    id: "triggers-overview",
    source: "maps-lesson",
    sourceLabel: "NeuroCare Learn",
    title: "Understanding Your Triggers",
    thumbnail: "🎯",
    duration: "5 min read",
    body: "Migraine triggers are factors that increase your likelihood of having an attack. The most common ones are stress, poor sleep, hormonal changes, skipped meals, and weather shifts. Not every trigger causes an attack every time — most people need a combination of triggers within a threshold period.\n\nThe goal of tracking isn't to avoid every trigger (impossible) — it's to understand which combinations matter most to YOU, so you can make targeted changes.\n\nStart by logging your next 10 attacks with as much trigger detail as you can. Patterns usually emerge within 3-4 weeks.",
  },
  "cgrp-medications": {
    id: "cgrp-medications",
    source: "explainer",
    sourceLabel: "Explainer",
    title: "CGRP Medications Explained",
    thumbnail: "💊",
    duration: "3 min read",
    body: "CGRP (calcitonin gene-related peptide) medications are a newer class of migraine treatments that block a protein involved in migraine attacks.\n\nPreventive CGRP options:\n• Erenumab (Aimovig) — monthly injection\n• Fremanezumab (Ajovy) — monthly or quarterly injection\n• Galcanezumab (Emgality) — monthly injection\n• Eptinezumab (Vyepti) — quarterly IV infusion\n• Atogepant (Qulipta) — daily pill\n\nAcute CGRP options:\n• Ubrogepant (Ubrelvy) — pill taken at attack onset\n• Rimegepant (Nurtec ODT) — dissolvable pill\n• Zavegepant (Zavzpret) — nasal spray\n\nCGRPs tend to have fewer side effects than older preventive drugs like topiramate or beta-blockers. Talk to your neurologist about whether they're right for you.",
  },
  "sleep-hygiene": {
    id: "sleep-hygiene",
    source: "maps-lesson",
    sourceLabel: "NeuroCare Learn",
    title: "Sleep & Migraine",
    thumbnail: "😴",
    duration: "4 min read",
    body: "Sleep and migraine have a complicated relationship — both too little and too much sleep can trigger attacks, and migraines can disrupt sleep.\n\nCore principles:\n• Keep a consistent bedtime and wake time (even weekends)\n• Aim for 7-8 hours\n• Wind down 30 minutes before bed — no screens\n• Keep the room cool (65-68°F), dark, and quiet\n• Limit caffeine after noon\n\nIf you consistently wake up with a headache, talk to your doctor about sleep apnea screening.",
  },
  "stress-management": {
    id: "stress-management",
    source: "maps-lesson",
    sourceLabel: "NeuroCare Learn",
    title: "Stress & Migraine Triggers",
    thumbnail: "🧘",
    duration: "5 min read",
    body: "Stress is the #1 reported migraine trigger. But it's not always acute stress that causes attacks — often it's the 'let-down' after stress ends (like getting a migraine on Friday evening after a tough week).\n\nStrategies that work:\n• Daily 10-minute breathing or meditation practice\n• Regular aerobic exercise (3-4 times per week)\n• Consistent meal times\n• Progressive muscle relaxation\n• Cognitive behavioral therapy (CBT) for chronic stress\n\nEven small daily habits can significantly reduce stress-triggered attacks over time.",
  },
  "menstrual-migraine": {
    id: "menstrual-migraine",
    source: "maps-lesson",
    sourceLabel: "NeuroCare Learn",
    title: "Menstrual Migraines",
    thumbnail: "📅",
    duration: "4 min read",
    body: "About 60% of women with migraine notice a connection between their attacks and their menstrual cycle. The drop in estrogen that happens just before your period is a known trigger.\n\nThese migraines often:\n• Hit 2 days before to 3 days after period starts\n• Are more severe and last longer than other attacks\n• Respond less well to standard triptans\n\nOptions to discuss with your doctor:\n• Short-term preventive medication during the menstrual window\n• Hormonal therapy (if appropriate)\n• CGRP medications for prevention\n\nTracking your cycle alongside your attacks helps confirm the pattern and gives your doctor clear data.",
  },
  "when-to-see-doctor": {
    id: "when-to-see-doctor",
    source: "explainer",
    sourceLabel: "Explainer",
    title: "When to See a Doctor",
    thumbnail: "👩‍⚕️",
    duration: "2 min read",
    body: "Most migraines are manageable at home, but see a doctor or seek emergency care if:\n\n🚨 Emergency (call 911):\n• 'Worst headache of your life' (thunderclap)\n• Sudden weakness on one side of the body\n• Trouble speaking or confusion\n• Fever + stiff neck + headache\n• Headache after a head injury\n\n📞 Call your doctor soon if:\n• You have a new type of headache after age 50\n• Frequency is increasing (more than 4 per month)\n• Rescue medications aren't working\n• Attacks are interfering with work or life regularly\n\nEven if none of these apply, a neurologist can help you build a better prevention plan and discuss newer medication options.",
  },
  "preventive-vs-acute": {
    id: "preventive-vs-acute",
    source: "explainer",
    sourceLabel: "Explainer",
    title: "Preventive vs Acute Medications",
    thumbnail: "💊",
    duration: "3 min read",
    body: "Migraine medications fall into two categories:\n\n**Acute (rescue)** — taken when an attack starts to stop it:\n• Triptans (sumatriptan, rizatriptan, eletriptan)\n• Gepants (ubrogepant, rimegepant, zavegepant)\n• NSAIDs (ibuprofen, naproxen, ketorolac)\n• Ditans (lasmiditan)\n• Combination analgesics (Excedrin Migraine)\n\n**Preventive** — taken daily or periodically to reduce attack frequency:\n• CGRP antibodies (Aimovig, Ajovy, Emgality, Vyepti)\n• CGRP gepant (Qulipta)\n• Botox injections (for chronic migraine)\n• Topiramate, propranolol, amitriptyline\n• Magnesium, riboflavin, CoQ10 supplements\n\nIf you're using acute medication more than 2 days per week, you likely need preventive treatment. Talk to your doctor.",
  },
  "aura-what-is-it": {
    id: "aura-what-is-it",
    source: "explainer",
    sourceLabel: "Explainer",
    title: "What Is Migraine Aura?",
    thumbnail: "⚡",
    duration: "3 min read",
    body: "Aura is a temporary neurological change that happens before or during a migraine attack. About 25-30% of migraine sufferers experience aura.\n\nCommon aura types:\n• **Visual** (most common) — flashing lights, zigzag patterns, blind spots\n• **Sensory** — tingling or numbness, often in hand/face\n• **Speech** — difficulty finding words\n• **Motor** — weakness (rare; called hemiplegic migraine)\n\nAura usually lasts 20-60 minutes and resolves before or as the headache begins. Most aura is harmless, but:\n\n⚠️ Seek immediate medical attention if:\n• Aura lasts over an hour\n• You experience sudden one-sided weakness that's new to you\n• You have symptoms that mimic stroke (facial drooping, arm weakness, speech trouble)",
  },
  "daily-habits": {
    id: "daily-habits",
    source: "maps-lesson",
    sourceLabel: "NeuroCare Learn",
    title: "Daily Habits That Reduce Attacks",
    thumbnail: "🌱",
    duration: "5 min read",
    body: "The 'SEEDS' framework is widely used by headache specialists:\n\n**S - Sleep:** Consistent 7-8 hours, same bedtime every day.\n**E - Exercise:** 30 min aerobic activity, 3-4 times per week.\n**E - Eat:** Regular meals, stay hydrated, limit known food triggers.\n**D - Diary:** Track daily to identify patterns.\n**S - Stress management:** Meditation, CBT, yoga, breathing exercises.\n\nConsistency matters more than intensity. A steady baseline of these habits can reduce attack frequency by 30-50% over 3 months — without any medication.",
  },
  "effective-rescue": {
    id: "effective-rescue",
    source: "explainer",
    sourceLabel: "Explainer",
    title: "Making Rescue Medication Work Better",
    thumbnail: "⏱️",
    duration: "3 min read",
    body: "Timing is everything with migraine rescue medication. Here's how to maximize effectiveness:\n\n**Take it early.** Rescue meds (triptans, gepants, NSAIDs) work best when taken within 30 minutes of pain starting. Once pain peaks, they're less effective.\n\n**Don't chase the pain.** If you're unsure, take it. Waiting often makes attacks harder to stop.\n\n**Pair with non-drug strategies:** Dark room, rest, hydration, ice pack, and caffeine (if you normally respond well) can boost medication effectiveness.\n\n**Track what works.** Rate each medication's effectiveness after each attack so you and your doctor know which drugs are worth continuing.\n\n**Watch for rebound.** Using acute medication more than 10 days per month can cause medication-overuse headache — a cycle that makes things worse. Talk to your doctor if you're approaching this.",
  },
  "diet-triggers": {
    id: "diet-triggers",
    source: "explainer",
    sourceLabel: "Explainer",
    title: "Food and Migraine",
    thumbnail: "🍫",
    duration: "4 min read",
    body: "Food triggers vary wildly between people — what sets off one person's migraine may be totally fine for another. But some foods come up repeatedly in the research.\n\n**Commonly reported food triggers:**\n• Aged cheeses (cheddar, blue, parmesan) — contain tyramine\n• Processed meats (salami, hot dogs) — contain nitrates\n• Chocolate — contains both tyramine and caffeine\n• Alcohol, especially red wine and beer\n• MSG and some Asian cuisines\n• Artificial sweeteners (aspartame)\n• Citrus fruits for some people\n\n**How to find YOUR triggers:**\nTry an elimination approach. For 4 weeks, cut out the top suspects. Then reintroduce them one at a time, spaced 3-4 days apart, while logging attacks. Patterns usually show up clearly.\n\n**Don't go overboard.** Food is rarely the only factor — most attacks need a combination of triggers (stress, sleep, hormones) to fire. Skipping meals triggers more migraines than any single food.",
  },
  "caffeine": {
    id: "caffeine",
    source: "explainer",
    sourceLabel: "Explainer",
    title: "Caffeine & Migraine",
    thumbnail: "☕",
    duration: "3 min read",
    body: "Caffeine has a complicated relationship with migraine. It can help OR trigger attacks depending on how you use it.\n\n**How caffeine helps:**\n• Constricts blood vessels (migraines involve vessel dilation)\n• Boosts the effect of NSAIDs and aspirin — that's why Excedrin Migraine includes it\n• Taken at attack onset, 100-200mg can abort a mild migraine\n\n**How caffeine hurts:**\n• Daily use builds tolerance — your brain adapts\n• Missing your usual dose causes caffeine withdrawal headaches\n• More than ~200mg/day regularly can worsen migraine frequency\n• Late-day caffeine disrupts sleep, which is itself a trigger\n\n**Guidance most headache specialists give:**\nKeep caffeine under 200mg/day (about 2 cups of coffee), consume it at consistent times, and cut it off by noon. If you're already a heavy caffeine user and want to reduce, taper slowly over 2-3 weeks to avoid rebound headaches.",
  },
  "exercise": {
    id: "exercise",
    source: "explainer",
    sourceLabel: "Explainer",
    title: "Exercise & Migraine",
    thumbnail: "🏃",
    duration: "3 min read",
    body: "Regular aerobic exercise is one of the most evidence-backed non-drug prevention strategies for migraine. Studies show 3-4 sessions per week can reduce attack frequency by 20-40%.\n\n**What works best:**\n• Aerobic activity — walking, cycling, swimming, jogging\n• 30-40 minutes, 3-4 times per week\n• Moderate intensity (can hold a conversation, slightly breathless)\n\n**Ease in if you're new to it.** Sudden intense exertion can trigger an attack (called exertional headache). Start with 10-15 minutes of walking and build up over 4-6 weeks.\n\n**When to skip:**\n• During an active migraine\n• When dehydrated or meal-skipped\n• In extreme heat without acclimatization\n\n**Pro tips:**\n• Hydrate before and during\n• Warm up for 5-10 minutes\n• Eat something small 30-60 min before\n• If you get exercise-triggered migraines, talk to your doctor about taking a preventive dose before workouts",
  },
  "weather-triggers": {
    id: "weather-triggers",
    source: "explainer",
    sourceLabel: "Explainer",
    title: "Weather & Migraine",
    thumbnail: "🌧️",
    duration: "3 min read",
    body: "About half of migraine sufferers notice weather as a trigger. The most cited culprit is barometric pressure — a sudden drop (ahead of a storm) or rise can set off attacks.\n\n**Other weather triggers:**\n• High humidity\n• Temperature extremes (heatwaves, cold snaps)\n• Strong winds\n• Bright sun glare\n• Dry air\n\n**The hard truth:** You can't change the weather. But you CAN prepare.\n\n**What helps:**\n• Check a barometric pressure tracker (apps like Migraine Buddy show this)\n• When pressure is shifting rapidly, double down on your controllable factors — sleep, hydration, stress, meals\n• Have your rescue medication ready and take it early\n• Talk to your doctor about a short-term preventive during high-risk weather windows (some people take a triptan the day a big storm arrives)\n• Stay indoors during extreme conditions\n\nWeather sensitivity doesn't usually cause migraines on its own — it's a lowering-of-threshold factor. Control the other triggers and weather matters less.",
  },
  "hydration": {
    id: "hydration",
    source: "explainer",
    sourceLabel: "Explainer",
    title: "Hydration & Migraine",
    thumbnail: "💧",
    duration: "2 min read",
    body: "Dehydration is one of the most preventable migraine triggers. Even mild dehydration (1-2% body water loss) can trigger an attack in susceptible people.\n\n**Why it matters:**\nYour brain sits in fluid. When you're dehydrated, brain tissue contracts slightly, tugging on pain-sensitive membranes. For migraine-prone brains, that's enough.\n\n**Daily target:**\n• Roughly half your body weight in ounces (e.g., 150 lbs → 75 oz)\n• More if you're active, in heat, or drinking caffeine/alcohol\n• Urine should be pale yellow — darker means you're behind\n\n**Practical tips:**\n• Keep a water bottle visible all day\n• Drink a full glass on waking\n• Alternate alcohol with water\n• Electrolytes help if you sweat heavily or drink a lot of coffee\n\n**If you feel a migraine coming on,** drink 16-20oz of water with electrolytes right away — especially if you can't remember your last drink. It's free, safe, and sometimes aborts the attack.",
  },
  "chronic-vs-episodic": {
    id: "chronic-vs-episodic",
    source: "explainer",
    sourceLabel: "Explainer",
    title: "Chronic vs Episodic Migraine",
    thumbnail: "📊",
    duration: "3 min read",
    body: "Migraine is classified by frequency:\n\n**Episodic migraine:** Fewer than 15 headache days per month.\n**Chronic migraine:** 15+ headache days per month for at least 3 months, with at least 8 of those being migraine-specific.\n\nThe distinction matters because chronic migraine:\n• Opens up different treatment options (Botox, certain CGRPs are specifically approved for it)\n• Often qualifies for disability accommodations\n• Signals that current prevention isn't working well enough\n• Is often linked to medication overuse — which can be treated\n\n**Transformation to chronic** usually happens gradually over months or years. Warning signs:\n• Headache frequency climbing over 6 months\n• Rescue medication use creeping past 10 days/month\n• Sleep, stress, or hormonal changes getting worse\n\n**The good news:** Chronic migraine is NOT permanent for most people. With the right prevention strategy (CGRP, Botox, lifestyle, handling medication overuse), many return to episodic or remission.\n\nIf you're tracking 10+ headache days a month, bring the data to your neurologist — don't wait until it crosses 15.",
  },
  "rebound-headache": {
    id: "rebound-headache",
    source: "explainer",
    sourceLabel: "Explainer",
    title: "Medication Overuse Headache",
    thumbnail: "⚠️",
    duration: "3 min read",
    body: "Medication Overuse Headache (MOH), also called rebound headache, happens when taking acute migraine medication too often actually causes MORE headaches.\n\n**The thresholds that matter:**\n• Triptans, gepants, ergotamines: more than 10 days/month\n• Combination analgesics (Excedrin): more than 10 days/month\n• Plain NSAIDs or acetaminophen: more than 15 days/month\n• Opioids and butalbital: any regular use is risky\n\n**Warning signs you're in MOH:**\n• Headache on most days, often on waking\n• Rescue meds don't work as well as they used to\n• You feel like you 'need' meds to function\n• Frequency has slowly climbed over months\n\n**What to do:**\nDo NOT just stop cold — withdrawal can be rough. Work with your doctor on a taper plan. Most protocols involve:\n1. Starting a preventive medication (CGRP, Botox, etc.)\n2. Gradually cutting back on the overused acute med\n3. Bridging with a different acute option during the transition\n4. Expect 2-8 weeks of worse headaches before things improve\n\nMost people feel dramatically better within 2-3 months of breaking the cycle. Don't be ashamed — MOH is common and very treatable.",
  },
  "getting-second-opinion": {
    id: "getting-second-opinion",
    source: "explainer",
    sourceLabel: "Explainer",
    title: "Getting a Second Opinion",
    thumbnail: "🩺",
    duration: "3 min read",
    body: "Seeking a second opinion — especially from a headache specialist — is smart, not disloyal. Migraine care has advanced rapidly in the last 5 years, and many general neurologists don't keep up.\n\n**When to consider a second opinion:**\n• Your current plan hasn't reduced attacks in 3-6 months\n• You've tried 2+ preventive meds with no success\n• Your doctor hasn't discussed CGRP, Botox, or newer gepants\n• You feel dismissed or rushed in visits\n• Attack frequency is rising despite treatment\n\n**What to look for:**\nA board-certified headache specialist (UCNS certification) sees migraine all day — they're much more up-to-date than general neurology. The National Headache Foundation and American Migraine Foundation have 'find a specialist' directories.\n\n**How to make it productive:**\n1. Bring your migraine log (apps like this one make it easy to export)\n2. List every medication you've tried, with doses and outcomes\n3. Have your family history ready\n4. Write down your top 3 questions beforehand\n5. Ask specifically about the newest options for your pattern\n\n**Tips:**\n• Telehealth specialists exist if you can't find one locally\n• You don't always need a referral — check your insurance\n• You can keep your current neurologist — second opinions don't require switching",
  },
};

/** Intent keywords → content IDs mapping */
export const intentToContentMap: Record<string, string[]> = {
  triggers: ["triggers-overview"],
  trigger: ["triggers-overview"],
  cgrp: ["cgrp-medications", "preventive-vs-acute"],
  gepant: ["cgrp-medications"],
  medication: ["preventive-vs-acute", "cgrp-medications"],
  sleep: ["sleep-hygiene", "daily-habits"],
  stress: ["stress-management"],
  menstrual: ["menstrual-migraine"],
  period: ["menstrual-migraine"],
  cycle: ["menstrual-migraine"],
  doctor: ["when-to-see-doctor"],
  emergency: ["when-to-see-doctor"],
  preventive: ["preventive-vs-acute", "cgrp-medications"],
  aura: ["aura-what-is-it"],
  habits: ["daily-habits"],
  rescue: ["effective-rescue"],
  triptan: ["preventive-vs-acute", "effective-rescue"],
  // Diet / food
  food: ["diet-triggers"],
  diet: ["diet-triggers"],
  eat: ["diet-triggers"],
  foods: ["diet-triggers"],
  // Caffeine
  caffeine: ["caffeine"],
  coffee: ["caffeine"],
  // Exercise
  exercise: ["exercise"],
  workout: ["exercise"],
  running: ["exercise"],
  // Weather
  weather: ["weather-triggers"],
  barometric: ["weather-triggers"],
  pressure: ["weather-triggers"],
  storm: ["weather-triggers"],
  // Hydration
  water: ["hydration"],
  hydration: ["hydration"],
  hydrated: ["hydration"],
  dehydrated: ["hydration"],
  dehydration: ["hydration"],
  // Chronic vs episodic
  chronic: ["chronic-vs-episodic"],
  episodic: ["chronic-vs-episodic"],
  // Rebound / overuse
  rebound: ["rebound-headache"],
  overuse: ["rebound-headache"],
  "too much medication": ["rebound-headache"],
  moh: ["rebound-headache"],
  // Second opinion
  "second opinion": ["getting-second-opinion"],
  "new doctor": ["getting-second-opinion"],
  specialist: ["getting-second-opinion"],
};

export function findContentForIntent(query: string): NeuraContent[] {
  const normalized = query.toLowerCase();
  const matched = new Set<string>();
  Object.entries(intentToContentMap).forEach(([keyword, ids]) => {
    if (normalized.includes(keyword)) {
      ids.forEach((id) => matched.add(id));
    }
  });
  return Array.from(matched)
    .map((id) => neuraContentLibrary[id])
    .filter(Boolean);
}
