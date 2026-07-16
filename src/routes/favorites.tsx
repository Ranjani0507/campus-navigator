import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { BuildingCard } from "@/components/building-card";
import { Button } from "@/components/ui/button";
import { buildings } from "@/lib/campus-data";
import { useFavorites } from "@/lib/favorites";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "My Favorites — Campus Navigation Portal" },
      { name: "description", content: "Your saved buildings and locations across campus." },
    ],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { ids, hydrated } = useFavorites();
  const saved = buildings.filter((b) => ids.includes(b.id));

  return (
    <>
      <PageShell
        eyebrow="Personal"
        title="My favorites"
        description="Quick access to the places you visit most."
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {!hydrated ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-80 animate-pulse rounded-2xl bg-secondary/70" />
            ))}
          </div>
        ) : saved.length === 0 ? (
          <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-dashed border-border p-12 text-center">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-secondary">
              <Heart className="h-6 w-6 text-muted-foreground" />
            </div>
            <h2 className="mt-4 font-display text-xl font-semibold">No favorites yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Tap the heart on any building to save it here for quick access.
            </p>
            <Button asChild className="mt-6 bg-gradient-brand text-primary-foreground hover:opacity-90">
              <Link to="/buildings">Browse buildings</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map((b) => <BuildingCard key={b.id} b={b} />)}
          </div>
        )}
      </div>
    </>
  );
}
