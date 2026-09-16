# RAHAT SIH Prototype

## Goal
Build a compact, desktop-first disaster-management command center that opens directly to the operational dashboard and uses local demo data only.

## Experience
- Persistent command sidebar and compact Assam intelligence header
- Four working views: Overview, Risk Map, Relocation, and Alerts
- Dense, professional dark GIS styling using the supplied palette and IBM Plex Sans
- Responsive behavior with a collapsible mobile sidebar, full-width map, and scrollable tables

## Core Build
- Dashboard KPIs, situation panel, population-risk chart, weather trend, and priority-habitation table
- Interactive Assam map with selectable risk polygons, relocation markers, layer controls, legend, popups, and red-zone detail drawer
- Relocation centre comparison with capacity gap and working demo-plan modal
- Alert center with clear severity states
- “What If?” rainfall simulation modal
- Assam/Bihar selector that swaps the requested demo labels, figures, and relocation content

## Technical Details
- TanStack Start, React, TypeScript, Tailwind v4, shadcn controls, Lucide icons, Recharts
- Leaflet loaded client-side to remain compatible with server rendering
- All data kept in small TypeScript files; no authentication, database, backend, APIs, or real-time services
- Add route-specific metadata and verify desktop/mobile rendering plus all key interactions
