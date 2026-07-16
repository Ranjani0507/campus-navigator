import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { CampusMapSVG } from "@/components/campus-map-svg";

export const Route = createFileRoute("/campus-map")({
  head: () => ({
    meta: [
      { title: "Campus Map — Campus Navigation Portal" },
      { name: "description", content: "Interactive campus map with clickable pins for every building, lab and facility." },
      { property: "og:title", content: "Interactive Campus Map" },
      { property: "og:description", content: "Explore the entire campus with an interactive pin map." },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  return (
    <>
      <PageShell
        eyebrow="Interactive"
        title="Campus Map"
        description="Tap any pin to see photos, hours and directions. Every building on campus, one screen away."
      />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <CampusMapSVG />
      </div>
    </>
  );
}
