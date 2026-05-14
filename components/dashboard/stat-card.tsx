import { Card, CardContent } from "@/components/ui/card";

export function StatCard({ label, value, change }: { label: string; value: string; change?: string }) {
  return (
    <Card><CardContent className="p-5"><p className="text-sm font-medium text-muted-foreground">{label}</p><div className="mt-2 text-3xl font-bold text-care-ink">{value}</div>{change ? <p className="mt-2 text-xs font-semibold text-primary">{change}</p> : null}</CardContent></Card>
  );
}
