import { StatCard } from "@/components/shared/stat-card";
import { dashboardHighlights } from "@/lib/demo-data";

export function Scoreboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
      {dashboardHighlights.map((item) => (
        <StatCard key={item.label} {...item} />
      ))}
    </div>
  );
}
