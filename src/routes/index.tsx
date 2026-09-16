import { createFileRoute } from "@tanstack/react-router";
import { RahatApp } from "@/components/rahat/RahatApp";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RAHAT — Disaster Relocation Intelligence" },
      { name: "description", content: "A Smart India Hackathon prototype for proactive disaster risk assessment and relocation planning." },
      { property: "og:title", content: "RAHAT — Disaster Relocation Intelligence" },
      { property: "og:description", content: "Proactive hazard monitoring and relocation decision support for disaster authorities." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return <RahatApp />;
}
