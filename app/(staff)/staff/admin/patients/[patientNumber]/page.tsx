import Link from "next/link";
import { ArrowLeft, CalendarDays, ClipboardList, CreditCard, FlaskConical, Pill, Printer, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPatientRecord } from "@/lib/supabase/queries";
import { currency } from "@/lib/utils";

function formatDate(value?: string | null) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function formatDateTime(value?: string | null) {
  if (!value) return "-";
  return new Date(value).toLocaleString("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function relationName(value: unknown, fallback = "-") {
  if (!value) return fallback;
  if (Array.isArray(value)) return relationName(value[0], fallback);
  if (typeof value === "object" && "name" in value && typeof value.name === "string") return value.name;
  return fallback;
}

export default async function PatientDetailPage({ params }: { params: { patientNumber: string } }) {
  const { patient, appointments, consultations, invoices, prescriptions, labOrders, admissions } = await getPatientRecord(params.patientNumber);
  const emergency = patient.emergency_contact as { name?: string | null; phone?: string | null } | null;
  const allergies = (patient.allergies ?? []) as string[];
  const currentMedications = (patient.current_medications ?? []) as string[];
  const outstanding = invoices
    .filter((invoice) => invoice.status !== "paid")
    .reduce((sum, invoice) => sum + Number(invoice.total ?? 0), 0);

  return (
    <section className="p-6">
      <Button asChild variant="ghost" size="sm">
        <Link href="/staff/admin/patients"><ArrowLeft className="h-4 w-4" /> Back to patients</Link>
      </Button>

      <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-primary">{patient.patient_number}</p>
          <h1 className="mt-2 text-3xl font-bold text-care-ink">{patient.full_name ?? "Unnamed patient"}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Registered {formatDate(patient.created_at)} · {patient.phone ?? "No phone"} · {patient.email ?? "No email"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button"><CalendarDays className="h-4 w-4" /> Book appointment</Button>
          <Button type="button" variant="outline"><ClipboardList className="h-4 w-4" /> Start visit</Button>
          <Button type="button" variant="outline"><Printer className="h-4 w-4" /> Print card</Button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Appointments</p><div className="mt-2 text-3xl font-bold">{appointments.length}</div></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Consultations</p><div className="mt-2 text-3xl font-bold">{consultations.length}</div></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Lab orders</p><div className="mt-2 text-3xl font-bold">{labOrders.length}</div></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Outstanding</p><div className="mt-2 text-3xl font-bold">{currency(outstanding)}</div></CardContent></Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-6">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><UserRound className="h-5 w-5 text-primary" /> Demographics</CardTitle></CardHeader>
            <CardContent className="grid gap-3 text-sm">
              <div className="grid grid-cols-2 gap-3"><span className="text-muted-foreground">Date of birth</span><span>{formatDate(patient.date_of_birth)}</span></div>
              <div className="grid grid-cols-2 gap-3"><span className="text-muted-foreground">Gender</span><span className="capitalize">{patient.gender ?? "-"}</span></div>
              <div className="grid grid-cols-2 gap-3"><span className="text-muted-foreground">Address</span><span>{patient.address ?? "-"}</span></div>
              <div className="grid grid-cols-2 gap-3"><span className="text-muted-foreground">Emergency</span><span>{emergency?.name ?? "-"} {emergency?.phone ? `· ${emergency.phone}` : ""}</span></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Clinical summary</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <p className="font-semibold">Allergies</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {allergies.length ? allergies.map((item) => <Badge key={item}>{item}</Badge>) : <span className="text-muted-foreground">No allergies recorded</span>}
                </div>
              </div>
              <div>
                <p className="font-semibold">Current medications</p>
                <p className="mt-2 text-muted-foreground">{currentMedications.length ? currentMedications.join(", ") : "No current medications recorded"}</p>
              </div>
              <div>
                <p className="font-semibold">Medical history</p>
                <p className="mt-2 leading-6 text-muted-foreground">{patient.medical_history ?? "No medical history recorded"}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><CalendarDays className="h-5 w-5 text-primary" /> Appointments</CardTitle></CardHeader>
            <CardContent className="grid gap-3">
              {appointments.length ? appointments.map((appointment) => (
                <div key={appointment.id} className="rounded-md border p-3 text-sm">
                  <div className="flex justify-between gap-3"><strong>{formatDateTime(appointment.starts_at)}</strong><Badge>{appointment.status}</Badge></div>
                  <p className="mt-1 text-muted-foreground">{relationName(appointment.specialties, "No specialty")} · {appointment.reason ?? "No reason recorded"}</p>
                </div>
              )) : <p className="text-sm text-muted-foreground">No appointments yet.</p>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><ClipboardList className="h-5 w-5 text-primary" /> Consultations</CardTitle></CardHeader>
            <CardContent className="grid gap-3">
              {consultations.length ? consultations.map((consultation) => (
                <div key={consultation.id} className="rounded-md border p-3 text-sm">
                  <div className="flex justify-between gap-3"><strong>{formatDateTime(consultation.created_at)}</strong><span>{consultation.diagnosis_codes?.join(", ")}</span></div>
                  <p className="mt-1 text-muted-foreground">{consultation.assessment ?? "No assessment recorded"}</p>
                </div>
              )) : <p className="text-sm text-muted-foreground">No consultations yet.</p>}
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5 text-primary" /> Invoices</CardTitle></CardHeader>
              <CardContent className="grid gap-3">
                {invoices.length ? invoices.map((invoice) => (
                  <div key={invoice.id} className="rounded-md border p-3 text-sm">
                    <strong>{invoice.invoice_number}</strong>
                    <p className="text-muted-foreground">{currency(Number(invoice.total ?? 0))} · {invoice.status}</p>
                  </div>
                )) : <p className="text-sm text-muted-foreground">No invoices yet.</p>}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><FlaskConical className="h-5 w-5 text-primary" /> Lab and Pharmacy</CardTitle></CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <div className="rounded-md border p-3"><FlaskConical className="mb-2 h-4 w-4 text-primary" /> {labOrders.length} lab order(s)</div>
                <div className="rounded-md border p-3"><Pill className="mb-2 h-4 w-4 text-primary" /> {prescriptions.length} prescription(s)</div>
                <div className="rounded-md border p-3">{admissions.length} admission record(s)</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
