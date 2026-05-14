import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";

export default function ReportsPage() {
  return <section className="p-6"><h1 className="text-3xl font-bold text-care-ink">Reports and analytics</h1><div className="mt-6 grid gap-6 lg:grid-cols-2"><Card><CardHeader><CardTitle>Revenue trend</CardTitle></CardHeader><CardContent><RevenueChart /></CardContent></Card><Card><CardHeader><CardTitle>Export center</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">PDF and Excel exports for patient flow, diagnoses, inventory turnover, doctor performance, and HMO claims.</CardContent></Card></div></section>;
}
