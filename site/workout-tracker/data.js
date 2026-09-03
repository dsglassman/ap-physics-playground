window.SIMON_FORZA_DATA = {
  meta: {
    owner: "Simon Forza",
    lastUpdated: "2026-09-03",
    timezone: "America/New_York",
    dataVersion: 4,
    foodPortionPolicy: "If a food is reported without an exact amount, use one standard serving. For packaged foods, use the manufacturer's labeled serving size when known; for generic foods, use a conventional standard serving. Record the assumption in the daily log."
  },
  profile: { heightIn: 72, age: 35, sex: "male" },
  goals: {
    weight: { startLb: 207.4, startDate: "2026-08-31", lossGoalLb: 16, targetLb: 191.4 },
    nutrition: { calorieTargetMin: 1900, calorieTargetMax: 2050, proteinTargetMinG: 140, proteinTargetMaxG: 160 },
    hipThrust: { baselineLb: 240, baselineDate: "2026-08-29", targetMinLb: 270, targetMaxLb: 275, targetDate: "2026-10-01", plan: "Increase 5–10 lb every 1–2 weeks" }
  },
  historicalSummary: {
    datedHeadings: 270, recordedWeights: 198, workoutSessions: 140, workoutMinutes: 638.07,
    rowingDistanceM: 110588, strengthSets: 1524, movementDays: 205, throughDate: "2026-08-30",
    note: "Historical summary imported from the prior structured tracker; detailed historical weight, movement, and session summaries load from history.js."
  },
  foodLibrary: [
    { name: "Wildwood Organic High Protein Tofu", serving: "455 g block", calories: 650, proteinG: 70 },
    { name: "LeafSide Smoky Pea Soup", serving: "1 meal", calories: 592, proteinG: null },
    { name: "LeafSide Southwest Black Bean Soup", serving: "1 pack / meal", calories: 611, proteinG: 27 },
    { name: "LeafSide Sweet Potato Dal", serving: "1 meal", calories: 652, proteinG: 24 },
    { name: "Rummo Maxima 21 Fusilli", serving: "56 g dry (about 1/2 cup dry)", calories: 200, proteinG: 12 },
    { name: "Rao's Marinara", serving: "1/2 cup", calories: 100, proteinG: null },
    { name: "Justin's Peanut Butter", serving: "2 Tbsp", calories: 210, proteinG: 7 },
    {
      name: "Santa Fe Wrap",
      aliases: ["Santa Fe wrap", "Santa de wrap"],
      serving: "1 wrap",
      calories: 550,
      caloriesRange: [500, 600],
      proteinG: 32,
      carbsG: 57,
      fatG: 28,
      fiberG: 10.5,
      provisional: true,
      note: "Provisional working estimate pending a weighed recipe. Use about 550 kcal per wrap, with a plausible range of roughly 500–600 kcal. The main uncertainty is the homemade cashew cheese and exact condiment portions.",
      recipe: [
        { name: "Mission Burrito Restaurant Style Flour Tortilla", amount: "1 tortilla", calories: 170, proteinG: 5, carbsG: 29, fiberG: 3 },
        { name: "Abbot's Plant-Rich Chorizo", amount: "1.5 servings (127.5 g)", calories: 210, proteinG: 22.5, carbsG: 9, fatG: 9, fiberG: 3 },
        { name: "Cashew cheese", amount: "3 Tbsp baseline; possibly 4 Tbsp", calories: 105, caloriesRange: [105, 140], estimated: true },
        { name: "Sriracha", amount: "2 Tbsp", calories: 30, carbsG: 6 },
        { name: "Guacamole", amount: "3 Tbsp", calories: 71, proteinG: 0.9, carbsG: 3.9, fatG: 6.5, fiberG: 3 },
        { name: "Shredded lettuce", amount: "small amount", calories: 2, estimated: true },
        { name: "Red pepper strips", amount: "small amount", calories: 3, estimated: true },
        { name: "Picante or salsa", amount: "2 Tbsp", calories: 10, carbsG: 2 }
      ]
    }
  ],
  daily: [
    { date: "2026-08-13", weightLb: null, stairs: { bouts: 12, completed: 12, ascentSteps: 1224, descentSteps: 1224 }, extras: { pushups: 140, coreCircuits: 10 }, rowing: [], strength: [], food: null },
    { date: "2026-08-14", weightLb: 206.8, stairs: { bouts: 12, completed: 12, ascentSteps: 1224, descentSteps: 1224 }, extras: { pushups: 130, coreCircuits: 11 }, rowing: [], strength: [], food: null },
    { date: "2026-08-17", weightLb: null, stairs: { bouts: 10, completed: 10, ascentSteps: 1020, descentSteps: 1020 }, extras: { pushups: 100, coreCircuits: 10 }, rowing: [], strength: [], food: null },
    { date: "2026-08-18", weightLb: 204.8, stairs: { bouts: 8, completed: 8, ascentSteps: 816, descentSteps: 816 }, extras: { pushups: 80, coreCircuits: 8 }, rowing: [], strength: [], food: null },
    { date: "2026-08-19", weightLb: 204.0, stairs: { bouts: 9, completed: 0, ascentSteps: 0, descentSteps: 0 }, extras: {}, rowing: [], strength: [], food: null, notes: "Nine stair bouts were recorded but none were marked complete in the source log." },
    { date: "2026-08-25", weightLb: 204.2, stairs: null, extras: {}, rowing: [], strength: [], food: null },
    { date: "2026-08-27", weightLb: 201.4, stairs: null, extras: {}, rowing: [], strength: [], food: null },
    { date: "2026-08-28", weightLb: 202.0, stairs: null, extras: {}, rowing: [], strength: [], food: null },
    {
      date: "2026-08-29", weightLb: 204.8, stairs: null, extras: {}, rowing: [], food: null,
      strength: [{ workout: "Leg workout", exercises: [
        { name: "Hip Thrust", equipment: "Machine", sets: [
          { loadLb: 120, reps: 6, role: "warm-up" }, { loadLb: 185, reps: 3, role: "warm-up" }, { loadLb: 215, reps: 1, role: "warm-up" },
          { loadLb: 240, reps: 8, role: "work" }, { loadLb: 240, reps: 7, role: "work", effort: "failure" }
        ]},
        { name: "Seated Leg Curl", equipment: "Machine", sets: [{ loadLb: 105, reps: 12, role: "work" }, { loadLb: 105, reps: 6, role: "work", effort: "failure" }]},
        { name: "Walking Lunge", equipment: "2 x 30 lb kettlebells", sets: [{ loadLb: 60, reps: 20, role: "work", note: "20 steps" }, { loadLb: 60, reps: 20, role: "work", note: "20 steps" }]}
      ]}]
    },
    {
      date: "2026-08-30", weightLb: 208.0, stairs: null, extras: {}, strength: [], food: null,
      rowing: [
        { label: "Morning row", distanceM: 2102, durationSec: 602, splitSec500: 143.2, avgWatts: 119, calories: 118 },
        { label: "Evening row", distanceM: 2066, durationSec: 601, splitSec500: 145.6, avgWatts: 113, calories: 115 }
      ]
    },
    {
      date: "2026-08-31", weightLb: 207.4,
      stairs: { bouts: 7, completed: 7, ascentSteps: 714, descentSteps: 714, times: ["11:00","12:00","13:00","14:00","15:00","16:00","17:00"], pattern: "1" },
      extras: {}, strength: [], rowing: [{ label: "Row", durationSec: 601, distanceM: 2139, splitSec500: 140.5, avgWatts: 126, calories: 122, totalStrokes: null }],
      food: { completeThrough: "evening", caloriesKnown: 1710, proteinGEstimate: 94, items: [
        { name: "LeafSide Smoky Pea Soup", amount: "1 meal", calories: 592 }, { name: "Wildwood High Protein Tofu", amount: "80% block", calories: 520, proteinG: 56 },
        { name: "Banana", amount: "1", calories: 105 }, { name: "Almonds", amount: "~25", calories: 178 }, { name: "Justin's Peanut Butter", amount: "3 Tbsp", calories: 315 }
      ]}
    },
    {
      date: "2026-09-01", weightLb: 205.6,
      stairs: { bouts: 9, completed: 9, ascentSteps: 918, descentSteps: 918, times: ["10:00","11:00","12:00","13:00","14:00","15:00","15:40","16:20","17:00"], pattern: "1" },
      extras: {}, strength: [], rowing: [{ label: "Row", durationSec: 601, distanceM: 2248, splitSec500: 133.7, avgWatts: 146, calories: 134, totalStrokes: 214 }],
      food: { completeThrough: "20:00", caloriesKnown: 1438, proteinGEstimate: 88, incomplete: true,
        note: "Rao's marinara amount was not reported; one standard labeled serving (1/2 cup, 100 kcal) is assumed under the tracker portion policy.",
        items: [
          { name: "LeafSide Sweet Potato Dal", amount: "80% meal", calories: 522, proteinG: 19 },
          { name: "Wildwood High Protein Tofu", amount: "64% block (80% of an 80% portion)", calories: 416, proteinG: 44.8 },
          { name: "Rummo Maxima 21 Fusilli", amount: "~2 cups cooked", calories: 400, proteinG: 24 },
          { name: "Rao's Marinara", amount: "1 standard serving assumed (1/2 cup)", calories: 100, assumedAmount: true }
        ]}
    },
    {
      date: "2026-09-02", weightLb: 204.0,
      stairs: { bouts: 10, completed: 10, ascentSteps: 1020, descentSteps: 1020, times: ["10:00","11:00","11:40","12:20","13:00","14:40","15:10","15:40","16:10","16:40"], pattern: "1" },
      extras: {}, strength: [],
      rowing: [{ label: "Row", durationSec: 601, distanceM: 2205, splitSec500: 136.3, avgWatts: 138, calories: 129, totalStrokes: 223 }],
      food: {
        completeThrough: "18:00", caloriesKnown: 1851, proteinGEstimate: 113, incomplete: true,
        note: "Food log is through 6 PM. LeafSide nutrition uses the current labeled serving. Fettuccine and cashew-cauliflower Alfredo calories are estimates because brand/recipe nutrition was not supplied.",
        items: [
          { name: "LeafSide Southwest Black Bean Soup", amount: "1 pack / meal", calories: 611, proteinG: 27 },
          { name: "Wildwood High Protein Tofu", amount: "1 full 455 g block", calories: 650, proteinG: 70 },
          { name: "Fettuccine", amount: "2 cups cooked", calories: 400, proteinG: 14, estimated: true },
          { name: "Cauliflower Alfredo sauce with cashew cream", amount: "3 Tbsp", calories: 70, proteinG: 2, estimated: true },
          { name: "Chili oil", amount: "1 Tbsp", calories: 120, proteinG: 0 }
        ]
      }
    }
  ]
};
