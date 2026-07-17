import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Coffee,
  Compass,
  Dumbbell,
  MapPin,
  Search,
  Sparkles,
  Wifi,
} from "lucide-react";
import heroImg from "@/assets/hero-campus.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buildings, departments, facilities } from "@/lib/campus-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Campus Navigation Portal — Find your way around campus" },
      { name: "description", content: "Interactive campus map, buildings, departments and facilities. Search any location and get instant directions." },
      { property: "og:title", content: "Campus Navigation Portal — Find your way around campus" },
      { property: "og:description", content: "Interactive campus map, buildings, departments and facilities. Search any location and get instant directions." },
    ],
  }),
  component: Home,
});

type SearchHit = { type: string; label: string; sub: string; to: string; params?: Record<string, string> };

function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const hits: SearchHit[] = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    const out: SearchHit[] = [];
    for (const b of buildings) {
      if (b.name.toLowerCase().includes(s) || b.short.toLowerCase().includes(s) || b.departments.join(" ").toLowerCase().includes(s)) {
        out.push({ type: "Building", label: b.name, sub: b.short, to: "/buildings/$id", params: { id: b.id } });
      }
    }
    for (const d of departments) {
      if (d.name.toLowerCase().includes(s) || d.short.toLowerCase().includes(s)) {
        out.push({ type: "Department", label: d.name, sub: d.short, to: "/departments" });
      }
    }
    for (const f of facilities) {
      if (f.name.toLowerCase().includes(s) || f.description.toLowerCase().includes(s)) {
        out.push({ type: "Facility", label: f.name, sub: f.description, to: "/facilities" });
      }
    }
    return out.slice(0, 6);
  }, [q]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-hero opacity-95" />
        <div className="absolute inset-0 -z-10 opacity-30 mix-blend-overlay [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 md:items-center lg:px-8">
          <div className="text-primary-foreground">
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3 w-3" /> New · Interactive campus map
            </div>
            <h1 className="font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              Never lose your way <br /> around <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">campus.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-white/85">
              Search any building, department or facility. Tap a pin on the map to see photos, floors and directions in one place.
            </p>

            <div className="relative mt-8 max-w-lg">
              <div className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/95 p-2 shadow-elegant">
                <Search className="ml-2 h-5 w-5 text-muted-foreground" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search buildings, labs, departments…"
                  className="border-0 bg-transparent text-foreground shadow-none focus-visible:ring-0"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && hits[0]) {
                      navigate({ to: hits[0].to as "/buildings/$id", params: hits[0].params as { id: string } | undefined });
                    }
                  }}
                />
                <Button asChild size="sm" className="bg-gradient-brand text-primary-foreground shadow-soft hover:opacity-90">
                  <Link to="/campus-map">Open map</Link>
                </Button>
              </div>
              {hits.length > 0 && (
                <Card className="absolute z-20 mt-2 w-full overflow-hidden p-1 shadow-elegant">
                  {hits.map((h, i) => (
                    <button
                      key={i}
                      onClick={() =>
                        navigate({ to: h.to as "/buildings/$id", params: h.params as { id: string } | undefined })
                      }
                      className="flex w-full items-center gap-3 rounded-lg p-2.5 text-left hover:bg-secondary"
                    >
                      <MapPin className="h-4 w-4 text-primary" />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">{h.label}</div>
                        <div className="truncate text-xs text-muted-foreground">{h.sub}</div>
                      </div>
                      <Badge variant="secondary" className="rounded-full text-[10px]">{h.type}</Badge>
                    </button>
                  ))}
                </Card>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/80">
              <div className="flex items-center gap-1.5"><Building2 className="h-4 w-4" /> {buildings.length} buildings</div>
              <div className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> {departments.length} departments</div>
              <div className="flex items-center gap-1.5"><Coffee className="h-4 w-4" /> {facilities.length} facilities</div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-[3rem] bg-white/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-3 backdrop-blur shadow-elegant">
              <img src={heroImg} alt="Campus illustration" width={1600} height={1200} className="rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick nav */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">Quick access</div>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Jump right in</h2>
          </div>
          <Button variant="ghost" asChild className="hidden sm:inline-flex">
            <Link to="/buildings">All buildings <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { to: "/campus-map", icon: Compass, title: "Campus Map", desc: "Interactive pin-based map", color: "from-blue-500/20 to-indigo-500/10" },
            { to: "/buildings", icon: Building2, title: "Buildings", desc: "All academic & residence blocks", color: "from-emerald-500/20 to-teal-500/10" },
            { to: "/departments", icon: BookOpen, title: "Departments", desc: "9 schools & departments", color: "from-amber-500/20 to-orange-500/10" },
            { to: "/facilities", icon: Dumbbell, title: "Facilities", desc: "Library, sports, medical…", color: "from-purple-500/20 to-pink-500/10" },
          ].map((c) => (
            <Link key={c.to} to={c.to} className="group">
              <Card className={`relative overflow-hidden border-border/60 bg-gradient-to-br ${c.color} p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-elegant`}>
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-background/90 shadow-soft">
                  <c.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="mt-6">
                  <div className="font-display text-lg font-semibold">{c.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{c.desc}</div>
                </div>
                <ArrowRight className="absolute right-5 top-5 h-5 w-5 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="border-y border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: MapPin, title: "Pin-perfect", body: "Every building has GPS-precise coordinates, floor breakdowns and photos." },
              { icon: Wifi, title: "Always fresh", body: "Timings, departments and facilities kept up to date by the admin team." },
              { icon: Sparkles, title: "Made for students", body: "Bookmark the places you visit most. Everything is one tap away." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-brand text-primary-foreground">
                  <f.icon className="h-5 w-5" />
                </div>
                <div className="mt-4 font-display text-lg font-semibold">{f.title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
