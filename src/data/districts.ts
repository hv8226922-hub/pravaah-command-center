export type DemoState = "Assam" | "Bihar";

export const districts: Record<DemoState, string[]> = {
  Assam: ["Dhubri", "Barpeta", "Morigaon", "Nagaon", "Dhemaji", "Dibrugarh", "Majuli", "Kamrup"],
  Bihar: ["Darbhanga", "Muzaffarpur", "Sitamarhi", "Supaul", "Madhubani", "Patna", "Bhagalpur", "Purnia"],
};

export const stateStats = {
  Assam: { atRisk: "2.84M", redZones: 47, habitations: 183, capacity: "412K", alerts: "08" },
  Bihar: { atRisk: "3.12M", redZones: 39, habitations: 156, capacity: "386K", alerts: "06" },
};
