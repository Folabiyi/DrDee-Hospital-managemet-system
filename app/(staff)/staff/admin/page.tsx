import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { StatCard } from "@/components/dashboard/stat-card";
import { ModuleCard } from "@/components/dashboard/module-card";
import { hmsModules } from "@/lib/hms-data";
import { getDashboardStats, getTodayAppointments } from "@/lib/supabase/queries";
import { currency } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const [stats, appointments] = await Promise.all([getDashboardStats(), getTodayAppointments()]);

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold text-care-ink">Operations dashboard</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <StatCard label="Patients" value={String(stats.patientCount)} />
        <StatCard label="Today appointments" value={String(stats.appointmentCount)} />
        <StatCard label="Admissions" value={String(stats.admissionCount)} />
        <StatCard label="Outstanding bills" value={currency(stats.outstanding)} />
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3 xl:grid-cols-4">
        {hmsModules.slice(0, 8).map((module) => <ModuleCard key={module.href} module={module} />)}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader><CardTitle>Revenue analytics</CardTitle></CardHeader>
          <CardContent><RevenueChart /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Today&apos;s queue</CardTitle></CardHeader>
          <CardContent className="grid gap-3">
            {appointments.map((appointment) => (
              <div key={`${appointment.patient}-${appointment.time}`} className="rounded-md border p-3 text-sm">
                <strong>{appointment.time}</strong> {appointment.patient}
                <p className="text-muted-foreground">{appointment.doctor} - {appointment.status}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
