import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { appointments } from "@/lib/data";

export default function PatientPortalPage() {
  return (
    <section className="container py-8">
      <h1 className="text-3xl font-bold text-care-ink">Patient dashboard</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <Card><CardHeader><CardTitle>Upcoming appointments</CardTitle></CardHeader><CardContent className="grid gap-3">{appointments.slice(0, 2).map((a) => <div key={a.patient} className="rounded-md border p-3"><strong>{a.time}</strong><p className="text-sm text-muted-foreground">{a.doctor} · {a.status}</p></div>)}<Button type="button">Book new appointment</Button></CardContent></Card>
        <Card><CardHeader><CardTitle>Care records</CardTitle></CardHeader><CardContent className="grid gap-3 text-sm text-muted-foreground"><p>Recent visits, prescriptions, lab results, invoices, and telemedicine links appear here with secure downloads.</p><Button variant="outline" type="button">Download latest invoice</Button></CardContent></Card>
      </div>
    </section>
  );
}
