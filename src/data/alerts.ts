import type { DemoState } from "./districts";
export type AlertItem = { level: "CRITICAL" | "HIGH" | "WATCH" | "INFO"; title: string; district: string; message: string; updated: string };
export const alerts: Record<DemoState, AlertItem[]> = {
  Assam: [
    { level: "CRITICAL", title: "Flood Risk", district: "Dhubri", message: "Water level and rainfall indicators show increased flood exposure.", updated: "08:42 IST" },
    { level: "HIGH", title: "Heavy Rainfall", district: "Barpeta", message: "Sustained rainfall may affect low-lying habitations.", updated: "07:35 IST" },
    { level: "WATCH", title: "River Level Rising", district: "Dibrugarh", message: "Brahmaputra tributary gauges show a rising trend.", updated: "06:52 IST" },
    { level: "INFO", title: "Relocation Centre Capacity Updated", district: "Morigaon", message: "Latest simulated occupancy figures are available.", updated: "06:20 IST" },
  ],
  Bihar: [
    { level: "CRITICAL", title: "Flood Risk", district: "Darbhanga", message: "Water level and rainfall indicators show increased flood exposure.", updated: "08:42 IST" },
    { level: "HIGH", title: "Heavy Rainfall", district: "Supaul", message: "Sustained rainfall may affect low-lying habitations.", updated: "07:35 IST" },
    { level: "WATCH", title: "River Level Rising", district: "Sitamarhi", message: "River gauges show a rising trend.", updated: "06:52 IST" },
    { level: "INFO", title: "Relocation Centre Capacity Updated", district: "Muzaffarpur", message: "Latest simulated occupancy figures are available.", updated: "06:20 IST" },
  ],
};
