import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import type { DemoState } from "@/data/districts";
import type { HazardZone } from "@/data/hazards";
import type { RelocationSite } from "@/data/relocationSites";

type Props = {
  state: DemoState;
  zones: HazardZone[];
  sites: RelocationSite[];
  onZoneDetails: (zone: HazardZone) => void;
};

export function RiskMap({ state, zones, sites, onZoneDetails }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    let cancelled = false;
    void import("leaflet").then((L) => {
      if (cancelled || !containerRef.current) return;
      mapRef.current?.remove();
      const center: [number, number] = state === "Assam" ? [26.55, 92.8] : [26.05, 85.9];
      const map = L.map(containerRef.current, { zoomControl: true, attributionControl: true }).setView(center, state === "Assam" ? 7 : 8);
      mapRef.current = map;
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 18,
      }).addTo(map);

      const critical = L.layerGroup().addTo(map);
      const high = L.layerGroup().addTo(map);
      const centres = L.layerGroup().addTo(map);

      zones.forEach((zone) => {
        const isCritical = zone.risk === "CRITICAL";
        const polygon = L.polygon(zone.coordinates, {
          color: isCritical ? "#d64545" : "#d79b35",
          fillColor: isCritical ? "#d64545" : "#d79b35",
          fillOpacity: 0.32,
          weight: 2,
        }).addTo(isCritical ? critical : high);
        const popup = document.createElement("div");
        popup.className = "map-popup";
        popup.innerHTML = `<span class="map-kicker">${zone.risk === "CRITICAL" ? "RED ZONE" : "HIGH RISK"}</span><strong>${zone.location}</strong><dl><div><dt>Zone</dt><dd>${zone.id}</dd></div><div><dt>Hazard</dt><dd>${zone.hazard}</dd></div><div><dt>Population at risk</dt><dd>${zone.population.toLocaleString("en-IN")}</dd></div><div><dt>Vulnerable</dt><dd>${zone.vulnerable.toLocaleString("en-IN")}</dd></div></dl>`;
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "VIEW DETAILS";
        button.onclick = () => onZoneDetails(zone);
        popup.appendChild(button);
        polygon.bindPopup(popup, { minWidth: 230 });
        polygon.bindTooltip(zone.location, { direction: "top", permanent: true, className: "district-label" });
      });

      const centreIcon = L.divIcon({ className: "centre-marker", html: "<span></span>", iconSize: [20, 20], iconAnchor: [10, 10] });
      sites.forEach((site) => {
        L.marker(site.position, { icon: centreIcon })
          .addTo(centres)
          .bindPopup(`<div class="map-popup"><span class="map-kicker safe">SAFE RELOCATION CENTRE</span><strong>${site.name}</strong><dl><div><dt>Available</dt><dd>${(site.capacity - site.occupancy).toLocaleString("en-IN")}</dd></div><div><dt>Road</dt><dd>${site.road}</dd></div></dl></div>`);
      });

      L.control.layers(undefined, { "Red zones": critical, "High risk": high, "Relocation centres": centres }, { collapsed: false }).addTo(map);
      requestAnimationFrame(() => map.invalidateSize());
    });
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [state, zones, sites, onZoneDetails]);

  return <div ref={containerRef} className="h-full min-h-[460px] w-full" aria-label={`${state} hazard risk map`} />;
}