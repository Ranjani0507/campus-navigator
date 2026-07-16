import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, Heart, Layers, MapPin, Navigation } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getBuilding, buildings, type Building } from "@/lib/campus-data";
import { useFavorites } from "@/lib/favorites";
import { cn } from "@/lib/utils";


export const Route = createFileRoute("/buildings/$id")({
  loader: ({ params }) => {
    const b = getBuilding(params.id);
    if (!b) throw notFound();
    return { building: b };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.building.name} — Campus Navigation Portal` },
          { name: "description", content: loaderData.building.short },
          { property: "og:title", content: loaderData.building.name },
          { property: "og:description", content: loaderData.building.short },
        ]
      : [{ title: "Building — Campus Navigation Portal" }],
  }),
  component: BuildingDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Building not found</h1>
      <Button asChild className="mt-6"><Link to="/buildings">Back to buildings</Link></Button>
    </div>
  ),
});

function BuildingDetail() {
  const data = Route.useLoaderData() as { building: Building };
  const b = data.building;
  const { has, toggle, hydrated } = useFavorites();
  const fav = hydrated && has(b.id);
  const nearby = b.nearby.map((id: string) => buildings.find((x) => x.id === id)).filter(Boolean) as Building[];


  return (
    <>
      <div className="relative h-[42vh] min-h-[320px] w-full overflow-hidden">
        <img src={b.image} alt={b.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/10" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
            <Button asChild variant="ghost" size="sm" className="mb-4 backdrop-blur">
              <Link to="/buildings"><ArrowLeft className="mr-1 h-4 w-4" /> All buildings</Link>
            </Button>
            <Badge className="mb-3 border-0 bg-background/90 text-foreground">{b.category}</Badge>
            <h1 className="font-display text-4xl font-bold sm:text-5xl">{b.name}</h1>
            <p className="mt-2 max-w-2xl text-lg text-muted-foreground">{b.short}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-6 shadow-soft">
            <h2 className="font-display text-xl font-semibold">About</h2>
            <p className="mt-2 text-muted-foreground leading-relaxed">{b.description}</p>
          </Card>

          <Card className="p-6 shadow-soft">
            <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-semibold">
              <Layers className="h-5 w-5 text-primary" /> Floors
            </h2>
            <ul className="divide-y divide-border">
              {b.floors.map((f, i) => (
                <li key={i} className="flex items-center gap-4 py-3 text-sm">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-secondary font-semibold text-primary">
                    {i}
                  </div>
                  <div>{f}</div>
                </li>
              ))}
            </ul>
          </Card>

          {b.departments.length > 0 && (
            <Card className="p-6 shadow-soft">
              <h2 className="mb-3 font-display text-xl font-semibold">Departments here</h2>
              <div className="flex flex-wrap gap-2">
                {b.departments.map((d) => (
                  <Badge key={d} variant="secondary" className="rounded-full px-3 py-1">{d}</Badge>
                ))}
              </div>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card className="p-6 shadow-soft">
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 text-primary" />
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Hours</div>
                  <div className="font-medium">{b.openingHours}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Location</div>
                  <div className="font-medium">Zone {String.fromCharCode(65 + Math.floor(b.x / 25))} · Sector {Math.floor(b.y / 25) + 1}</div>
                </div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <Button
                onClick={() => toast.success("Opening directions", { description: `Route to ${b.name}` })}
                className="bg-gradient-brand text-primary-foreground hover:opacity-90"
              >
                <Navigation className="mr-1 h-4 w-4" /> Directions
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  toggle(b.id);
                  toast.success(fav ? "Removed from favorites" : "Added to favorites", { description: b.name });
                }}
              >
                <Heart className={cn("mr-1 h-4 w-4", fav && "fill-current text-destructive")} />
                {fav ? "Saved" : "Save"}
              </Button>
            </div>
          </Card>

          {nearby.length > 0 && (
            <Card className="p-6 shadow-soft">
              <h3 className="mb-3 font-display text-lg font-semibold">Nearby</h3>
              <div className="space-y-2">
                {nearby.map((n) => n && (
                  <Link
                    key={n.id}
                    to="/buildings/$id"
                    params={{ id: n.id }}
                    className="flex items-center gap-3 rounded-lg p-2 hover:bg-secondary"
                  >
                    <div className="grid h-9 w-9 place-items-center rounded-lg text-primary-foreground" style={{ backgroundColor: n.color }}>
                      <n.icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">{n.name}</div>
                      <div className="truncate text-xs text-muted-foreground">{n.category}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
