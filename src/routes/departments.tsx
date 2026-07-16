import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, User } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { departments, getBuilding } from "@/lib/campus-data";

export const Route = createFileRoute("/departments")({
  head: () => ({
    meta: [
      { title: "Departments — Campus Navigation Portal" },
      { name: "description", content: "Explore every school and department across the campus." },
      { property: "og:title", content: "Campus Departments" },
      { property: "og:description", content: "9 departments across engineering, sciences, arts and management." },
    ],
  }),
  component: DepartmentsPage,
});

function DepartmentsPage() {
  return (
    <>
      <PageShell
        eyebrow="Departments"
        title="Schools & departments"
        description="From engineering to arts — meet the faculties that make up the campus."
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((d) => {
            const b = getBuilding(d.buildingId);
            return (
              <Card key={d.id} className="group relative overflow-hidden p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-elegant">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand text-primary-foreground shadow-soft">
                  <d.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{d.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d.short}</p>

                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <User className="h-3.5 w-3.5" /> HoD · {d.head}
                </div>

                {b && (
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                    <Badge variant="secondary" className="rounded-full">{b.name}</Badge>
                    <Link
                      to="/buildings/$id"
                      params={{ id: b.id }}
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      Visit <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
