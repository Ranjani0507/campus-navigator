import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Heart, Layers } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Building } from "@/lib/campus-data";
import { useFavorites } from "@/lib/favorites";

export function BuildingCard({ b }: { b: Building }) {
  const { has, toggle, hydrated } = useFavorites();
  const fav = hydrated && has(b.id);

  return (
    <Card className="group overflow-hidden border-border/60 bg-gradient-card p-0 shadow-soft transition hover:-translate-y-1 hover:shadow-elegant">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={b.image}
          alt={b.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        <Badge className="absolute left-3 top-3 border-0 bg-background/90 text-foreground shadow-soft">
          {b.category}
        </Badge>
        <button
          type="button"
          onClick={() => {
            toggle(b.id);
            toast.success(fav ? "Removed from favorites" : "Added to favorites", {
              description: b.name,
            });
          }}
          className={cn(
            "absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 shadow-soft transition hover:scale-110",
            fav && "text-destructive"
          )}
          aria-label={fav ? "Remove favorite" : "Add favorite"}
        >
          <Heart className={cn("h-4 w-4", fav && "fill-current")} />
        </button>
      </div>
      <div className="space-y-3 p-5">
        <div>
          <h3 className="font-display text-lg font-semibold leading-tight">{b.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{b.short}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {b.departments.slice(0, 3).map((d) => (
            <Badge key={d} variant="secondary" className="rounded-full font-normal">
              {d}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Layers className="h-3.5 w-3.5" />
            {b.floors.length} floors
          </div>
          <Button asChild size="sm" variant="ghost" className="gap-1 text-primary hover:text-primary">
            <Link to="/buildings/$id" params={{ id: b.id }}>
              View details <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
