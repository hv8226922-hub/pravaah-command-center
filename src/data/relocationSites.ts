import type { DemoState } from "./districts";
export type RelocationSite = { name: string; shortName: string; distance: string; capacity: number; occupancy: number; food: string; water: string; medical: string; road: string; hazard: string; status: "AVAILABLE" | "LIMITED"; position: [number, number] };
export const relocationSites: Record<DemoState, RelocationSite[]> = {
  Assam: [
    { name: "Bilasipara Relief Centre", shortName: "Bilasipara", distance: "18.4 km", capacity: 18000, occupancy: 12200, food: "14 days", water: "Available", medical: "Available", road: "Accessible", hazard: "Low", status: "AVAILABLE", position: [26.23, 90.23] },
    { name: "Gauripur Safe Zone", shortName: "Gauripur", distance: "24.2 km", capacity: 15000, occupancy: 10800, food: "9 days", water: "Available", medical: "Limited", road: "Accessible", hazard: "Low", status: "AVAILABLE", position: [26.08, 89.97] },
    { name: "South Salmara Camp", shortName: "South Salmara", distance: "31 km", capacity: 12000, occupancy: 10900, food: "18 days", water: "Available", medical: "Available", road: "Restricted", hazard: "Low", status: "LIMITED", position: [25.85, 89.88] },
    { name: "Raha Community Shelter", shortName: "Raha", distance: "12 km", capacity: 9000, occupancy: 4800, food: "11 days", water: "Available", medical: "Available", road: "Accessible", hazard: "Low", status: "AVAILABLE", position: [26.23, 92.52] },
    { name: "Gogamukh Transit Site", shortName: "Gogamukh", distance: "20 km", capacity: 7500, occupancy: 3900, food: "8 days", water: "Available", medical: "Limited", road: "Accessible", hazard: "Low", status: "AVAILABLE", position: [27.44, 94.31] },
  ],
  Bihar: [
    { name: "Benipur Relief Centre", shortName: "Benipur", distance: "16.8 km", capacity: 17000, occupancy: 10800, food: "12 days", water: "Available", medical: "Available", road: "Accessible", hazard: "Low", status: "AVAILABLE", position: [26.08, 86.12] },
    { name: "Sakri Safe Zone", shortName: "Sakri", distance: "22.5 km", capacity: 14500, occupancy: 10100, food: "8 days", water: "Available", medical: "Limited", road: "Accessible", hazard: "Low", status: "AVAILABLE", position: [26.22, 86.08] },
    { name: "Kusheshwar Camp", shortName: "Kusheshwar", distance: "29 km", capacity: 11000, occupancy: 9900, food: "16 days", water: "Available", medical: "Available", road: "Restricted", hazard: "Low", status: "LIMITED", position: [25.99, 86.25] },
  ],
};
