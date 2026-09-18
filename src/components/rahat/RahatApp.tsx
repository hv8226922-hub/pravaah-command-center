import { useCallback, useMemo, useState } from "react";
import {
  AlertTriangle, Bell, Building2, Check, ChevronDown, ChevronUp, CloudRain, Database, Droplets,
  Gauge, Home, LocateFixed, Map, Menu, Navigation, Radio, Search, ShieldAlert, Users,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { alerts } from "@/data/alerts";
import { districts, stateStats, type DemoState } from "@/data/districts";
import { assamZones, biharZones, type HazardZone } from "@/data/hazards";
import { habitations, populationRisk } from "@/data/population";
import { relocationSites } from "@/data/relocationSites";
import { weather } from "@/data/weather";
import { RiskMap } from "./RiskMap";

type View = "overview" | "map" | "relocation" | "alerts";

const nav = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "map", label: "Risk Map", icon: Map },
  { id: "relocation", label: "Relocation", icon: Navigation },
  { id: "alerts", label: "Alerts", icon: ShieldAlert },
] as const;

function Status({ children, tone = "info" }: { children: React.ReactNode; tone?: string }) {
  return <span className={`status status-${tone}`}>{children}</span>;
}

function SectionTitle({ children, label }: { children: React.ReactNode; label?: string }) {
  return <div className="section-title"><h2>{children}</h2>{label && <span>{label}</span>}</div>;
}

export function RahatApp() {
  const [view, setView] = useState<View>("overview");
  const [state, setState] = useState<DemoState>("Assam");
  const [district, setDistrict] = useState("All Districts");
  const [sidebar, setSidebar] = useState(false);
  const [zone, setZone] = useState<HazardZone | null>(null);
  const [simulation, setSimulation] = useState(false);
  const [plan, setPlan] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedSites, setSelectedSites] = useState<string[]>([]);
  const zones = state === "Assam" ? assamZones : biharZones;
  const sites = relocationSites[state];
  const selectedZone: HazardZone = zones[0] ?? {
    id: "DEMO-001", location: state === "Assam" ? "Dhubri" : "Darbhanga", hazard: "Flood",
    population: 0, vulnerable: 0, risk: "CRITICAL", center: [26, 90], coordinates: [],
  };
  const available = sites.slice(0, 3).reduce((sum, site) => sum + site.capacity - site.occupancy, 0);
  const relocationPopulation = state === "Assam" ? 31500 : 34800;
  const stats = stateStats[state];
  const openZone = useCallback((item: HazardZone) => setZone(item), []);
  const kpis = useMemo(() => [
    { label: "Population at risk", value: stats.atRisk, note: "Modelled estimate", icon: Users },
    { label: "Active red zones", value: stats.redZones, note: "12 Critical", icon: AlertTriangle },
    { label: "Priority habitations", value: stats.habitations, note: "High vulnerability", icon: Building2 },
    { label: "Relocation capacity", value: stats.capacity, note: "persons", icon: LocateFixed },
    { label: "Active alerts", value: stats.alerts, note: "2 Critical", icon: Bell },
  ], [stats]);

  const searchResults = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return [];
    const zoneResults = zones.filter((item) => `${item.location} ${item.id} ${item.hazard}`.toLowerCase().includes(needle)).map((item) => ({ label: item.location, meta: `${item.id} · ${item.hazard}`, zone: item }));
    const siteResults = sites.filter((item) => item.name.toLowerCase().includes(needle)).map((item) => ({ label: item.name, meta: `Relocation centre · ${item.distance}`, site: item.name }));
    return [...zoneResults, ...siteResults].slice(0, 6);
  }, [query, zones, sites]);

  const changeState = (next: DemoState) => { setState(next); setDistrict("All Districts"); setSelectedSites([]); setQuery(""); };
  const openSearchResult = (result: (typeof searchResults)[number]) => {
    setQuery("");
    if (result.zone) { setView("map"); setZone(result.zone); }
    else { setView("relocation"); setSelectedSites(result.site ? [result.site] : []); }
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebar ? "sidebar-open" : ""}`}>
        <div className="brand"><div className="brand-mark"><ShieldAlert /></div><div><strong>RAHAT</strong><span>DISASTER INTELLIGENCE</span></div></div>
        <div className="side-rule" />
        <nav aria-label="Primary navigation">
          {nav.map(({ id, label, icon: Icon }) => <Button key={id} variant="ghost" onClick={() => { setView(id); setSidebar(false); }} className={view === id ? "nav-active" : "nav-item"}><Icon />{label}</Button>)}
        </nav>
        <div className="side-rule" />
        <label className="side-label">STATE</label>
        <Select value={state} onValueChange={(value) => changeState(value as DemoState)}><SelectTrigger className="side-select"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Assam">Assam</SelectItem><SelectItem value="Bihar">Bihar</SelectItem></SelectContent></Select>
        <label className="side-label">DISTRICT</label>
        <Select value={district} onValueChange={setDistrict}><SelectTrigger className="side-select"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="All Districts">All Districts</SelectItem>{districts[state].map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent></Select>
        <div className="system-state"><p><span /> Demo System Online</p><small>Demo Data</small><small>Last simulated update: 09:42 IST</small></div>
      </aside>
      {sidebar && <button className="sidebar-scrim" aria-label="Close navigation" onClick={() => setSidebar(false)} />}

      <div className="workspace">
        <header className="topbar">
          <Button variant="ghost" size="icon" className="menu-button" onClick={() => setSidebar(true)} aria-label="Open navigation"><Menu /></Button>
          <strong>{state.toUpperCase()} DISASTER INTELLIGENCE</strong>
          <div className="search-area"><div className="search"><Search /><input aria-label="Search location" placeholder="Search zones or centres..." value={query} onChange={(event) => setQuery(event.target.value)} /></div>{query && <div className="search-results">{searchResults.length ? searchResults.map((result) => <button type="button" key={`${result.label}-${result.meta}`} onClick={() => openSearchResult(result)}><Search /><span><strong>{result.label}</strong><small>{result.meta}</small></span></button>) : <p>No demo locations found</p>}</div>}</div>
          <div className="top-state">{state}<ChevronDown /></div>
          <span className="date">16 Sep 2026</span>
          <Status tone="critical">● DEMO MODE</Status>
          <Button variant="ghost" size="icon" className="notification-button" aria-label="Notifications" onClick={() => setNotifications(true)}><Bell /><span>{stats.alerts}</span></Button>
        </header>

        <main>
          {view === "overview" && <>
            <div className="command-strip"><div><Radio /><span>OPS NODE</span><strong>RHT-{state === "Assam" ? "AS" : "BR"}-01</strong></div><div><span>ALERT LEVEL</span><strong className="critical-text">CRITICAL</strong></div><div><span>MAP FEED</span><strong className="safe-text">SYNCHRONISED</strong></div><div><span>MODEL RUN</span><strong>09:42 IST</strong></div></div>
            <div className="page-heading"><div><span className="page-kicker">STATE OPERATIONS / LIVE OVERVIEW</span><h1>{state} Disaster Intelligence</h1><p>Multi-hazard monitoring and proactive relocation decision support.</p></div><Status>DEMO DATA</Status></div>
            <div className="kpi-grid">{kpis.map(({ label, value, note, icon: Icon }) => <article className="kpi" key={label}><div><span>{label}</span><strong>{value}</strong><small>{note}</small></div><Icon /></article>)}</div>
            <div className="map-layout">
              <section className="panel map-panel"><SectionTitle label="LIVE OPERATIONAL VIEW">RISK MAP — {state.toUpperCase()}</SectionTitle><div className="map-wrap"><RiskMap state={state} zones={zones} sites={sites} onZoneDetails={openZone} /><div className="map-legend"><span><i className="legend-critical" /> Red zone</span><span><i className="legend-high" /> High risk</span><span><i className="legend-safe" /> Relocation centre</span></div></div></section>
              <aside className="situation panel">
                <SectionTitle label="DEMO DATA">CURRENT SITUATION</SectionTitle>
                <div className="alert-strip"><Status tone="critical">CRITICAL ALERT</Status><p>Heavy rainfall may increase flood exposure in selected districts.</p><div>{districts[state].slice(0, 3).map((d) => <span key={d}>{d}</span>)}</div></div>
                <div className="metric-block"><div><Droplets /><span>RAINFALL</span></div><dl><div><dt>Today</dt><dd>86 mm</dd></div><div><dt>Last 24h</dt><dd>64 mm</dd></div><div><dt>Status</dt><dd className="warning-text">ABOVE NORMAL</dd></div></dl></div>
                <div className="metric-block"><div><CloudRain /><span>WEATHER</span></div><strong className="temperature">28°C</strong><p>Rain · 84% humidity</p><small>Forecast: Rain likely</small></div>
                <div className="what-if"><div><span>WHAT IF?</span><small>Scenario planning</small></div><Button variant="outline" onClick={() => setSimulation(true)}><CloudRain />Simulate +20% rainfall</Button></div>
              </aside>
            </div>
            <div className="analytics-grid">
              <section className="panel"><SectionTitle label="DEMO RISK MODEL">POPULATION AT RISK</SectionTitle><div className="chart-and-note"><div className="risk-chart"><ResponsiveContainer width="100%" height={245}><BarChart data={populationRisk} layout="vertical" margin={{ left: 18, right: 35 }}><CartesianGrid horizontal={false} stroke="var(--border)" /><XAxis type="number" hide /><YAxis dataKey="category" type="category" width={145} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} axisLine={false} tickLine={false} /><Tooltip cursor={{ fill: "var(--muted)" }} contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 4 }} /><Bar dataKey="value" radius={[0, 2, 2, 0]}>{populationRisk.map((_, i) => <Cell key={i} fill={i === 3 ? "var(--warning)" : "var(--map-blue)"} />)}</Bar></BarChart></ResponsiveContainer></div><div className="model-note"><Gauge /><strong>DEMO RISK MODEL</strong><p>Priority is calculated from hazard exposure + population vulnerability.</p><small>Illustrative scoring only</small></div></div></section>
              <section className="panel weather-panel"><SectionTitle label="DEMO WEATHER DATA">{state.toUpperCase()} WEATHER</SectionTitle><div className="weather-now"><strong>28°C</strong><div><b>Rain</b><span>Humidity 84%</span><span>Wind 12 km/h</span></div><div><small>RAINFALL</small><b>64 mm / 24h</b></div></div><h3>7 DAY TREND</h3><ResponsiveContainer width="100%" height={145}><LineChart data={weather.trend} margin={{ top: 12, right: 8, left: -25 }}><CartesianGrid stroke="var(--border)" vertical={false} /><XAxis dataKey="day" tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} /><YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 4 }} /><Line type="monotone" dataKey="rain" stroke="var(--map-blue)" strokeWidth={2} dot={{ fill: "var(--map-blue)", r: 3 }} /></LineChart></ResponsiveContainer></section>
            </div>
            <section className="panel table-panel"><SectionTitle label="MODELLED PRIORITY">PRIORITY HABITATIONS</SectionTitle><div className="table-scroll"><table><thead><tr><th>Location</th><th>District</th><th>Hazard</th><th>Population</th><th>Risk</th><th>Action</th></tr></thead><tbody>{habitations.map((row) => <tr key={row.location}><td><strong>{row.location}</strong></td><td>{state === "Assam" ? row.district : districts.Bihar[habitations.indexOf(row)]}</td><td>{row.hazard}</td><td>{row.population}</td><td><Status tone={row.risk === "Critical" ? "critical" : row.risk === "High" ? "warning" : "watch"}>{row.risk}</Status></td><td><Button variant="ghost" size="sm" onClick={() => setView("relocation")}>{row.action}</Button></td></tr>)}</tbody></table></div></section>
          </>}

          {view === "map" && <><div className="page-heading"><div><h1>Risk Map</h1><p>District-level hazard exposure and safe relocation sites.</p></div><Status>DEMO GIS DATA</Status></div><section className="panel full-map"><SectionTitle label={`${zones.length} ACTIVE ZONES`}>{state.toUpperCase()} HAZARD OVERVIEW</SectionTitle><div className="map-wrap"><RiskMap state={state} zones={zones} sites={sites} onZoneDetails={openZone} /><div className="map-legend"><span><i className="legend-critical" /> Red zone</span><span><i className="legend-high" /> High risk</span><span><i className="legend-safe" /> Relocation centre</span></div></div></section></>}

          {view === "relocation" && <RelocationView state={state} zone={selectedZone} sites={sites.slice(0, 3)} population={relocationPopulation} available={available} selectedSites={selectedSites} onSelect={(name) => setSelectedSites((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name])} onPlan={() => setPlan(true)} />}
          {view === "alerts" && <AlertsView state={state} />}
        </main>
        <footer className="ops-footer"><span><i /> PRIMARY MAP LINK: ACTIVE</span><span><i /> DEMO TELEMETRY: CONNECTED</span><span>NODE RHT-{state === "Assam" ? "AS" : "BR"}-01</span><span>16 SEP 2026 · 09:42 IST</span></footer>
      </div>

      <Sheet open={Boolean(zone)} onOpenChange={(open) => !open && setZone(null)}><SheetContent className="zone-sheet"><SheetHeader><span className="eyebrow">RED ZONE INTELLIGENCE</span><SheetTitle>{zone?.location} Risk Profile</SheetTitle><SheetDescription>Demo scoring model · Authority review required</SheetDescription></SheetHeader>{zone && <ZoneDetails zone={zone} />}</SheetContent></Sheet>
      <Dialog open={simulation} onOpenChange={setSimulation}><DialogContent className="command-dialog"><DialogHeader><span className="eyebrow">SIMULATED SCENARIO</span><DialogTitle>Scenario Simulation</DialogTitle><DialogDescription>This is not a real forecast. Values demonstrate proactive planning support.</DialogDescription></DialogHeader><div className="simulation-grid">{[["Rainfall", "+20%"], ["Potential affected zones", "+8"], ["Population at risk", "+126K"], ["Relocation demand", "+42K"], ["Capacity gap", "+18K"], ["Food requirement", "+620 MT"]].map(([a,b]) => <div key={a}><span>{a}</span><strong>{b}</strong></div>)}</div></DialogContent></Dialog>
      <Dialog open={plan} onOpenChange={setPlan}><DialogContent className="command-dialog"><DialogHeader><span className="eyebrow">DEMO RELOCATION PLAN</span><DialogTitle>{state === "Assam" ? "Dhubri" : "Darbhanga"} Red Zone</DialogTitle><DialogDescription>Requires authority validation.</DialogDescription></DialogHeader><dl className="plan-list"><div><dt>Source</dt><dd>{selectedZone.id}</dd></div><div><dt>Population</dt><dd>{relocationPopulation.toLocaleString("en-IN")}</dd></div><div><dt>Primary Site</dt><dd>{selectedSites[0] ?? sites[0]?.shortName}</dd></div><div><dt>Secondary Site</dt><dd>{selectedSites[1] ?? sites[1]?.shortName}</dd></div><div><dt>Status</dt><dd><Status tone="warning">DRAFT</Status></dd></div></dl></DialogContent></Dialog>
      <Dialog open={notifications} onOpenChange={setNotifications}><DialogContent className="command-dialog notification-dialog"><DialogHeader><span className="eyebrow">ACTIVE SIGNALS</span><DialogTitle>Operational Notifications</DialogTitle><DialogDescription>{stats.alerts} active demo alerts · showing highest priority</DialogDescription></DialogHeader><div className="notification-list">{alerts[state].slice(0, 3).map((alert) => <button type="button" key={alert.title} onClick={() => { setNotifications(false); setView("alerts"); }}><Status tone={alert.level === "CRITICAL" ? "critical" : alert.level === "HIGH" ? "warning" : "watch"}>{alert.level}</Status><span><strong>{alert.title} · {alert.district}</strong><small>Updated {alert.updated}</small></span><ChevronDown /></button>)}</div><Button onClick={() => { setNotifications(false); setView("alerts"); }}>Open alert center</Button></DialogContent></Dialog>
    </div>
  );
}

function ZoneDetails({ zone }: { zone: HazardZone }) {
  const facts = [["Zone ID", zone.id], ["District", zone.location], ["Primary Hazard", "Flood"], ["Secondary Hazard", "River Erosion"], ["Risk", zone.risk], ["Population", zone.population.toLocaleString("en-IN")], ["Vulnerable", zone.vulnerable.toLocaleString("en-IN")], ["Affected Habitations", "18"], ["Critical Infrastructure", "14"]];
  const factors = [["Flood Exposure", 96], ["Population Vulnerability", 81], ["Historical Recurrence", 91], ["Access Difficulty", 64]];
  return <div className="zone-content"><dl className="facts">{facts.map(([a,b]) => <div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}</dl><div className="history"><span>HISTORICAL EVENTS</span><div>{[2022, 2023, 2024, 2025].map((y) => <b key={y}>{y}</b>)}</div></div><h3>RISK FACTORS</h3>{factors.map(([label, value]) => <div className="factor" key={label}><div><span>{label}</span><b>{value}</b></div><div className="factor-bar"><i style={{ width: `${value}%` }} /></div></div>)}<small>DEMO SCORING MODEL</small></div>;
}

function RelocationView({ state, zone, sites, population, available, selectedSites, onSelect, onPlan }: { state: DemoState; zone: HazardZone; sites: ReturnType<typeof relocationSites[DemoState]["slice"]>; population: number; available: number; selectedSites: string[]; onSelect: (name: string) => void; onPlan: () => void }) {
  const gap = population - available;
  return <><div className="page-heading"><div><span className="page-kicker">ALLOCATION ENGINE / SITE COMPARISON</span><h1>Relocation Intelligence</h1><p>Identify safer locations for people living inside high-risk zones.</p></div><Status>DEMO DATA</Status></div><section className="selection-band"><div><span>SELECT RED ZONE</span><strong>{zone.location} — {zone.id}</strong></div><div><span>POPULATION REQUIRING RELOCATION</span><strong>{population.toLocaleString("en-IN")}</strong></div></section><div className="site-grid">{sites.map((site, i) => { const free = site.capacity - site.occupancy; const selected = selectedSites.includes(site.name); return <article className={`site-card ${selected ? "site-selected" : ""}`} key={site.name}><div className="site-head"><div><span>RELOCATION CENTRE 0{i + 1}</span><h2>{site.name}</h2><p><Navigation /> {site.distance} from risk zone</p></div><Status tone={site.status === "AVAILABLE" ? "safe" : "warning"}>{site.status}</Status></div><div className="capacity"><div><span>TOTAL CAPACITY</span><strong>{site.capacity.toLocaleString("en-IN")}</strong></div><div><span>CURRENT OCCUPANCY</span><strong>{site.occupancy.toLocaleString("en-IN")}</strong></div><div><span>AVAILABLE</span><strong className="safe-text">{free.toLocaleString("en-IN")}</strong></div></div><div className="occupancy"><i style={{ width: `${site.occupancy / site.capacity * 100}%` }} /></div><dl className="amenities">{[["Food", site.food], ["Water", site.water], ["Medical", site.medical], ["Road", site.road], ["Hazard", site.hazard]].map(([a,b]) => <div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}</dl><Button variant={selected ? "default" : "outline"} className="select-site" onClick={() => onSelect(site.name)}>{selected ? <><Check /> SELECTED</> : "SELECT SITE"}</Button></article>; })}</div><section className="decision-panel"><div><span>RELOCATION REQUIREMENT</span><strong>{population.toLocaleString("en-IN")} people</strong></div><div><span>AVAILABLE CAPACITY</span><strong>{available.toLocaleString("en-IN")}</strong></div><div><span>CAPACITY GAP</span><strong className="critical-text">{gap.toLocaleString("en-IN")}</strong></div><div className="decision-status"><Status tone="critical">RELOCATION CAPACITY INSUFFICIENT</Status><p>{selectedSites.length} centre{selectedSites.length === 1 ? "" : "s"} selected · additional safe sites required.</p></div><Button onClick={onPlan}><Database />Create demo relocation plan</Button></section></>;
}

function AlertsView({ state }: { state: DemoState }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  return <><div className="page-heading"><div><span className="page-kicker">INCIDENT FEED / PRIORITY ORDER</span><h1>Disaster Alert Center</h1><p>Prioritised operational alerts for {state}.</p></div><Status>ALL DEMO ALERTS</Status></div><div className="alerts-list">{alerts[state].map((alert) => { const open = expanded === alert.title; return <article className={`alert-card alert-${alert.level.toLowerCase()} ${open ? "alert-open" : ""}`} key={alert.title}><div className="alert-icon"><AlertTriangle /></div><div><div className="alert-heading"><Status tone={alert.level === "CRITICAL" ? "critical" : alert.level === "HIGH" ? "warning" : alert.level === "WATCH" ? "watch" : "info"}>{alert.level}</Status><span>Updated {alert.updated}</span></div><h2>{alert.title}</h2><strong>{alert.district}</strong><p>{alert.message}</p>{open && <div className="alert-detail"><span>RECOMMENDED DEMO ACTION</span><p>{alert.level === "CRITICAL" ? "Review exposed habitations and initiate relocation readiness checks." : alert.level === "HIGH" ? "Pre-position response teams and monitor local rainfall indicators." : "Continue monitoring and verify the next simulated update."}</p></div>}</div><Button variant="ghost" size="icon" aria-label={`${open ? "Close" : "Open"} ${alert.title}`} onClick={() => setExpanded(open ? null : alert.title)}>{open ? <ChevronUp /> : <ChevronDown />}</Button></article>; })}</div></>;
}