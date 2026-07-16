import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { BuildingCard } from "@/components/building-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { buildings } from "@/lib/campus-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/buildings")({
  head: () => ({
    meta: [
      { title: "Buildings — Campus Navigation Portal" },
      { name: "description", content: "Browse every building on campus: academic blocks, library, hostels, sports and more." },
      { property: "og:title", content: "Campus Buildings" },
      { property: "og:description", content: "All academic, residential and facility buildings in one place." },
    ],
  }),
  component: BuildingsPage,
});

const CATS = ["All", "Academic", "Facility", "Residential", "Admin"] as const;

function BuildingsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return buildings.filter((b) => {
      const catOk = cat === "All" || b.category === cat;
      const qOk =
        !s ||
        b.name.toLowerCase().includes(s) ||
        b.short.toLowerCase().includes(s) ||
        b.departments.join(" ").toLowerCase().includes(s);
      return catOk && qOk;
    });
  }, [q, cat]);

  return (
    <>
      <PageShell
        eyebrow="Buildings"
        title="Every block, every floor"
        description="Search, filter and discover buildings across the campus."
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search building or department…"
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {CATS.map((c) => (
              <Button
                key={c}
                size="sm"
                variant={cat === c ? "default" : "outline"}
                onClick={() => setCat(c)}
                className={cn("rounded-full", cat === c && "bg-gradient-brand text-primary-foreground")}
              >
                {c}
              </Button>
            ))}
          </div>
        </div>
      </PageShell>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
            No buildings match your search.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((b) => (
              <BuildingCard key={b.id} b={b} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
