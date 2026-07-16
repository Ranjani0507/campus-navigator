import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Card } from "@/components/ui/card";
import { facilities, getBuilding } from "@/lib/campus-data";

export const Route = createFileRoute("/facilities")({
  head: () => ({
    meta: [
      { title: "Facilities — Campus Navigation Portal" },
      { name: "description", content: "Library, cafeteria, ATM, medical, sports and every facility available on campus." },
      { property: "og:title", content: "Campus Facilities" },
      { property: "og:description", content: "Everything you need on campus — from Wi-Fi to sports complex." },
    ],
  }),
  component: FacilitiesPage,
});

function FacilitiesPage() {
  return (
    <>
      <PageShell
        eyebrow="Facilities"
        title="Everything you need, on campus"
        description="Amenities that keep student life running — food, health, sports, connectivity."
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((f) => {
            const b = getBuilding(f.buildingId);
            return (
              <Card key={f.id} className="group flex items-start gap-4 p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-elegant">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <f.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-display text-base font-semibold">{f.name}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{f.description}</p>
                  {b && (
                    <Link
                      to="/buildings/$id"
                      params={{ id: b.id }}
                      className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      Located at {b.name} <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
