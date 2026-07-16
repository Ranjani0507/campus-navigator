import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { buildings, type Building } from "@/lib/campus-data";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export function CampusMapSVG() {
  const [active, setActive] = useState<Building | null>(buildings[0]);

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-secondary/60 to-accent/40 shadow-soft">
        <svg viewBox="0 0 100 100" className="block h-[520px] w-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
              <path d="M 4 0 L 0 0 0 4" fill="none" stroke="currentColor" strokeWidth="0.1" className="text-border" />
            </pattern>
            <linearGradient id="grass" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="oklch(0.9 0.05 145)" stopOpacity="0.6" />
              <stop offset="1" stopColor="oklch(0.85 0.06 200)" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" fill="url(#grass)" />
          <rect width="100" height="100" fill="url(#grid)" />
          {/* pathways */}
          <path d="M 0 50 Q 30 45 50 55 T 100 50" stroke="oklch(0.85 0.02 250)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 50 0 Q 45 30 55 50 T 50 100" stroke="oklch(0.85 0.02 250)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 15 15 L 85 85" stroke="oklch(0.88 0.02 250)" strokeWidth="1" strokeDasharray="1,1" fill="none" />

          {buildings.map((b) => {
            const selected = active?.id === b.id;
            return (
              <g
                key={b.id}
                transform={`translate(${b.x} ${b.y})`}
                onClick={() => setActive(b)}
                className="cursor-pointer"
              >
                <circle
                  r={selected ? 4.2 : 2.2}
                  fill={b.color}
                  opacity={selected ? 0.25 : 0.15}
                  className="transition-all"
                />
                <circle
                  r={selected ? 2.4 : 1.8}
                  fill={b.color}
                  stroke="white"
                  strokeWidth="0.4"
                  className="transition-all"
                />
                <text
                  y={-3.5}
                  textAnchor="middle"
                  className="pointer-events-none fill-foreground"
                  style={{ font: "600 2.2px var(--font-display)" }}
                >
                  {b.name.replace("Block ", "").split(" ").slice(0, 2).join(" ")}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {active && (
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-soft">
          <div className="mb-3 aspect-[16/10] overflow-hidden rounded-xl">
            <img src={active.image} alt={active.name} className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="flex items-start gap-2">
            <div
              className="mt-1 grid h-9 w-9 place-items-center rounded-lg text-primary-foreground"
              style={{ backgroundColor: active.color }}
            >
              <active.icon className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{active.category}</div>
              <h3 className="font-display text-lg font-semibold leading-tight">{active.name}</h3>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{active.short}</p>
          <div className="mt-4 space-y-1.5 text-xs">
            <div><span className="text-muted-foreground">Hours: </span>{active.openingHours}</div>
            <div><span className="text-muted-foreground">Floors: </span>{active.floors.length}</div>
          </div>
          <Button asChild className="mt-4 w-full bg-gradient-brand text-primary-foreground hover:opacity-90">
            <Link to="/buildings/$id" params={{ id: active.id }}>
              View details <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
