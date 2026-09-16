# PRAVAAH Command Center

Build a polished SIH prototype web application called:

RAHAT 

Risk Assessment &Hazard Allocation For habitation transfer

Tagline:

"From disaster response to proactive relocation."

IMPORTANT:

This is a Smart India Hackathon prototype/demo.

Keep the application SMALL and focused so it can be generated and previewed within approximately 10 Lovable credits.

Do NOT build a huge production backend.

Do NOT create authentication.

Do NOT create complex APIs.

Do NOT create real-time database integration.

Do NOT create multiple complicated dashboards.

Use ONLY realistic DEMO DATA stored in simple local TypeScript/JSON data files.

The goal is to create a convincing working prototype that demonstrates the SIH concept visually and interactively.

==================================================

CORE IDEA

==================================================

PRAVAAH helps disaster management authorities answer:

WHERE is the danger?

WHO is affected?

HOW MANY people are at risk?

WHERE can they relocate?

DOES the relocation centre have enough capacity?

WHAT is the current weather/rainfall situation?

The application should feel like a government disaster-management command center.

==================================================

DESIGN STYLE

==================================================

Use a professional GIS command-center interface.

NOT:

• futuristic cyberpunk

• excessive gradients

• glassmorphism

• colorful SaaS cards

• huge rounded cards

• excessive animations

Use:

Background:

#0B1117

Panels:

#111A22

Borders:

#263442

Primary text:

#E8EEF2

Secondary text:

#8B9AA7

Critical:

#D64545

Warning:

#D79B35

Safe:

#3E9B67

Map blue:

#3C82C4

Use Inter or IBM Plex Sans.

Use small radius cards.

Thin borders.

Compact spacing.

Professional typography.

The result should look like software actually designed and coded by a development team.

==================================================

APPLICATION STRUCTURE

==================================================

Only create these main sections:

1. Dashboard

2. Risk Map

3. Relocation

4. Alerts

Do NOT create separate pages for analytics, resources, data sources, settings, etc.

Those can appear as small cards on the dashboard.

==================================================

LEFT SIDEBAR

==================================================

Logo:

PRAVAAH

Navigation:

Overview

Risk Map

Relocation

Alerts

Below navigation:

STATE

Assam

DISTRICT

All Districts

At bottom:

● Demo System Online

Small text:

Demo Data

Last simulated update: 09:42 IST

==================================================

TOP HEADER

==================================================

Top bar:

ASSAM DISASTER INTELLIGENCE

Search location...

State:

Assam ▼

Date:

16 Sep 2026

● DEMO MODE

Notification icon

==================================================

HOME DASHBOARD

==================================================

Create the main dashboard as the most important screen.

Header:

Assam Disaster Intelligence

Subtext:

"Multi-hazard monitoring and proactive relocation decision support."

Show a small badge:

DEMO DATA

--------------------------------------------------

KPI ROW

--------------------------------------------------

Create 5 compact KPI cards.

CARD 1

POPULATION AT RISK

2.84M

Modelled estimate

CARD 2

ACTIVE RED ZONES

47

12 Critical

CARD 3

PRIORITY HABITATIONS

183

High vulnerability

CARD 4

RELOCATION CAPACITY

412K

persons

CARD 5

ACTIVE ALERTS

08

2 Critical

Use DEMO / MODELLED labels.

--------------------------------------------------

MAIN MAP

--------------------------------------------------

The map should occupy approximately 60% of the dashboard width.

Use Leaflet or MapLibre.

Use a realistic India map centered on Assam.

Add simple demo GeoJSON/polygon data.

Map layers:

RED ZONE

HIGH RISK

SAFE RELOCATION CENTRE

Use:

red transparent polygons = red zones

orange = high risk

green markers = relocation centres

Important demo areas:

Dhubri

Barpeta

Morigaon

Nagaon

Dhemaji

Dibrugarh

Majuli

Kamrup

Clicking a red zone should open a popup.

Example:

RED ZONE

Zone:

AS-FLD-042

Location:

Dhubri

Hazard:

Flood + River Erosion

Population at Risk:

42,800

Vulnerable:

14,310

Risk:

CRITICAL

[VIEW DETAILS]

--------------------------------------------------

RIGHT SIDE PANEL

--------------------------------------------------

Create a compact panel next to the map:

CURRENT SITUATION

CRITICAL ALERT

Heavy rainfall may increase flood exposure in selected districts.

Dhubri

Barpeta

Morigaon

Then:

RAINFALL

Today:

86 mm

Last 24h:

64 mm

Status:

ABOVE NORMAL

Then:

WEATHER

28°C

Rain

84% humidity

Forecast:

Rain likely

All of this is DEMO DATA.

--------------------------------------------------

POPULATION AT RISK

--------------------------------------------------

Below the map create a section:

POPULATION AT RISK

Show one simple horizontal bar/chart.

Categories:

Children

Elderly

Women

Persons with Disabilities

General Population

Example:

Children

420K

Elderly

180K

Women

1.32M

Persons with Disabilities

72K

General

2.10M

Use demo values.

Add a small explanatory panel:

"Priority is calculated from hazard exposure + population vulnerability."

Do not make this an actual AI model.

Call it:

DEMO RISK MODEL

--------------------------------------------------

PRIORITY HABITATIONS

--------------------------------------------------

Create a compact table:

PRIORITY HABITATIONS

Columns:

Location

District

Hazard

Population

Risk

Action

Rows:

Char Area A

Dhubri

Flood

12,420

Critical

Relocate

Riverbank B

Barpeta

Flood

8,760

High

Prepare

Village C

Morigaon

Flood

6,240

High

Monitor

Village D

Dhemaji

Flood

4,820

Medium

Monitor

Use status badges.

==================================================

RELOCATION PAGE

==================================================

This is the second most important feature.

Header:

RELOCATION INTELLIGENCE

Subtitle:

"Identify safer locations for people living inside high-risk zones."

Top:

SELECT RED ZONE

Dhubri — AS-FLD-042

Population requiring relocation:

31,500

Then show 3 relocation centres.

--------------------------------------------------

RELOCATION CENTRE 01

Bilasipara Relief Centre

Distance:

18.4 km

Total Capacity:

18,000

Current Occupancy:

12,200

Available:

5,800

Food:

14 days

Water:

Available

Medical:

Available

Road:

Accessible

Hazard:

Low

Status:

AVAILABLE

[SELECT]

--------------------------------------------------

RELOCATION CENTRE 02

Gauripur Safe Zone

Distance:

24.2 km

Capacity:

15,000

Occupancy:

10,800

Available:

4,200

Food:

9 days

Water:

Available

Medical:

Limited

Road:

Accessible

Status:

AVAILABLE

--------------------------------------------------

RELOCATION CENTRE 03

South Salmara Camp

Distance:

31 km

Capacity:

12,000

Occupancy:

10,900

Available:

1,100

Food:

18 days

Water:

Available

Medical:

Available

Road:

Restricted

Status:

LIMITED

--------------------------------------------------

RELOCATION SUMMARY

--------------------------------------------------

Create a bottom decision panel:

RELOCATION REQUIREMENT

31,500 people

Available capacity:

11,100

Capacity gap:

20,400

This should visually show:

RELOCATION CAPACITY INSUFFICIENT

Then show:

"Additional safe sites required."

Button:

[CREATE DEMO RELOCATION PLAN]

When clicked, show a simple modal:

DEMO RELOCATION PLAN

Source:

Dhubri Red Zone

Population:

31,500

Primary Site:

Bilasipara

Secondary Site:

Gauripur

Status:

DRAFT

"Requires authority validation."

==================================================

RED ZONE DETAILS

==================================================

Clicking "VIEW DETAILS" on map should open a side drawer.

Show:

RED ZONE INTELLIGENCE

Zone ID:

AS-FLD-042

District:

Dhubri

Primary Hazard:

Flood

Secondary Hazard:

River Erosion

Risk:

CRITICAL

Population:

42,800

Vulnerable:

14,310

Affected Habitations:

18

Critical Infrastructure:

14

Historical Events:

2022

2023

2024

2025

Then:

RISK FACTORS

Flood Exposure

██████████

Population Vulnerability

████████

Historical Recurrence

█████████

Access Difficulty

██████

This is a DEMO scoring model.

==================================================

ALERTS PAGE

==================================================

Create a simple alert center.

Header:

DISASTER ALERT CENTER

Cards:

CRITICAL

Flood Risk

Dhubri

"Water level and rainfall indicators show increased flood exposure."

Updated:

08:42 IST

--------------------------------------------------

HIGH

Heavy Rainfall

Barpeta

Updated:

07:35 IST

--------------------------------------------------

WATCH

River Level Rising

Dibrugarh

Updated:

06:52 IST

--------------------------------------------------

INFO

Relocation Centre Capacity Updated

Morigaon

Updated:

06:20 IST

Use:

RED = critical

ORANGE = high

YELLOW = watch

BLUE/GREY = information

All alerts are DEMO alerts.

==================================================

WEATHER WIDGET

==================================================

Put a compact weather card on the dashboard.

ASSAM

28°C

Rain

Humidity:

84%

Wind:

12 km/h

Rainfall:

64 mm / 24h

7 DAY TREND

Mon 72mm

Tue 84mm

Wed 65mm

Thu 92mm

Fri 48mm

Sat 35mm

Sun 42mm

Use a simple line chart.

Label:

DEMO WEATHER DATA

==================================================

UNIQUE FEATURE

==================================================

Create one visually impressive but simple feature:

"WHAT IF?"

On dashboard near the map.

Button:

SIMULATE +20% RAINFALL

When clicked:

Show a modal or small panel:

SCENARIO SIMULATION

Rainfall:

+20%

Potential affected zones:

+8

Population at risk:

+126K

Relocation demand:

+42K

Capacity gap:

+18K

Food requirement:

+620 MT

Label:

SIMULATED SCENARIO

This is NOT a real forecast.

The purpose is to demonstrate how the platform can support proactive planning.

==================================================

DEMO DATA

==================================================

Create simple TypeScript data files:

data/districts.ts

data/hazards.ts

data/relocationSites.ts

data/alerts.ts

data/weather.ts

data/population.ts

Use realistic Indian locations but clearly mark values as DEMO.

Default state:

Assam

Demo districts:

Dhubri

Barpeta

Morigaon

Nagaon

Dhemaji

Dibrugarh

Majuli

Kamrup

Add a simple state selector:

Assam

Bihar

If Bihar is selected, change only:

district names

hazard labels

population numbers

relocation sites

Do NOT build a complete second-state dataset.

==================================================

MAP

==================================================

Use a real interactive map library.

Center map on Assam.

Add:

• 5–7 red zone polygons

• 5 relocation centre markers

• district labels if possible

Map controls:

Zoom

Layer toggle

Legend

Legend:

RED ZONE

HIGH RISK

RELOCATION CENTRE

Clicking markers opens a popup.

==================================================

RESPONSIVENESS

==================================================

Desktop-first.

For smaller screens:

Sidebar collapses.

Map becomes full width.

Cards become 2-column.

Tables become horizontally scrollable.

==================================================

TECH STACK

==================================================

Use:

React

TypeScript

Vite

Tailwind CSS

shadcn/ui

Lucide icons

Leaflet

Recharts

No backend.

No database.

No authentication.

No external API requirement.

Keep all demo data local.

==================================================

IMPORTANT LOVABLE OPTIMIZATION

==================================================

Keep implementation compact.

Do not generate:

• authentication

• user management

• backend

• database

• API integration

• complex GIS processing

• machine learning

• real-time sockets

• advanced analytics

• multiple admin roles

• payment system

• complicated forms

The prototype only needs to visually demonstrate the concept.

Prioritize:

1. Beautiful working dashboard

2. Interactive map

3. Red-zone popup

4. Population at risk

5. Relocation capacity

6. Weather

7. Alerts

8. Simple scenario simulation

Every major button should work.

Avoid dead navigation.

==================================================

FINAL EXPERIENCE

==================================================

When the app opens, the jury should immediately understand:

"Here are the dangerous areas."

"Here are the people at risk."

"Here are the available relocation centres."

"Here is their remaining capacity."

"Here is the current rainfall/weather situation."

"And if conditions worsen, the system can simulate the additional relocation requirement."

The UI should feel like a realistic prototype of a State Disaster Management Authority command center.

Use DEMO DATA labels throughout.

Make it visually impressive through:

• strong map

• dense but readable information

• realistic tables

• restrained colors

• professional typography

• subtle hover states

• functional interactions

Do NOT make it look like a landing page.

Open directly to the operational dashboard.

Mke the app atleast available for preview make it under 10 credits give full preview out

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/847c81a6-4271-4cf5-adba-c12103b93d4a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
