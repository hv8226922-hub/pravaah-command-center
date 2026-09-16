export type HazardZone = {
  id: string; location: string; hazard: string; population: number; vulnerable: number;
  risk: "CRITICAL" | "HIGH"; center: [number, number]; coordinates: [number, number][];
};

const box = (lat: number, lng: number, d = 0.14): [number, number][] => [
  [lat - d, lng - d * 1.4], [lat - d * .55, lng + d * 1.35], [lat + d * .8, lng + d], [lat + d, lng - d * .85],
];

export const assamZones: HazardZone[] = [
  { id: "AS-FLD-042", location: "Dhubri", hazard: "Flood + River Erosion", population: 42800, vulnerable: 14310, risk: "CRITICAL", center: [26.02, 89.97], coordinates: box(26.02, 89.97, .19) },
  { id: "AS-FLD-031", location: "Barpeta", hazard: "Flood", population: 31700, vulnerable: 10920, risk: "CRITICAL", center: [26.32, 91.0], coordinates: box(26.32, 91.0, .16) },
  { id: "AS-FLD-027", location: "Morigaon", hazard: "Flood + Waterlogging", population: 24600, vulnerable: 7840, risk: "HIGH", center: [26.25, 92.34], coordinates: box(26.25, 92.34, .14) },
  { id: "AS-FLD-019", location: "Nagaon", hazard: "Flash Flood", population: 19400, vulnerable: 6120, risk: "HIGH", center: [26.35, 92.68], coordinates: box(26.35, 92.68, .13) },
  { id: "AS-FLD-051", location: "Dhemaji", hazard: "Flood", population: 22600, vulnerable: 8310, risk: "CRITICAL", center: [27.48, 94.58], coordinates: box(27.48, 94.58, .17) },
  { id: "AS-ERO-016", location: "Majuli", hazard: "River Erosion", population: 15800, vulnerable: 4990, risk: "HIGH", center: [27.0, 94.22], coordinates: box(27.0, 94.22, .13) },
];

export const biharZones: HazardZone[] = [
  { id: "BR-FLD-018", location: "Darbhanga", hazard: "Flood + Waterlogging", population: 48300, vulnerable: 15800, risk: "CRITICAL", center: [26.15, 85.9], coordinates: box(26.15, 85.9, .18) },
  { id: "BR-FLD-023", location: "Supaul", hazard: "Flood", population: 36400, vulnerable: 11200, risk: "CRITICAL", center: [26.13, 86.6], coordinates: box(26.13, 86.6, .16) },
  { id: "BR-FLD-011", location: "Sitamarhi", hazard: "River Flood", population: 28600, vulnerable: 9100, risk: "HIGH", center: [26.59, 85.49], coordinates: box(26.59, 85.49, .14) },
  { id: "BR-FLD-029", location: "Muzaffarpur", hazard: "Waterlogging", population: 21900, vulnerable: 6900, risk: "HIGH", center: [26.12, 85.36], coordinates: box(26.12, 85.36, .13) },
];
