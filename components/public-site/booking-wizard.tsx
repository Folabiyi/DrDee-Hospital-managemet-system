"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, CheckCircle2, CreditCard, FileUp, UserRound } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { doctors, specialties } from "@/lib/data";
import { currency } from "@/lib/utils";
import { bookingSchema, type BookingInput } from "@/lib/validations/booking";

const times = ["09:00", "10:30", "12:00", "14:00", "15:30"];
const steps = [
  { number: 1, label: "Care team", Icon: UserRound },
  { number: 2, label: "Date and time", Icon: CalendarDays },
  { number: 3, label: "Patient details", Icon: UserRound },
  { number: 4, label: "Visit reason", Icon: FileUp },
  { number: 5, label: "Payment", Icon: CreditCard },
  { number: 6, label: "Review", Icon: CheckCircle2 }
];

export function BookingWizard() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [confirmation, setConfirmation] = useState<{ patientNumber: string; invoiceNumber: string } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const defaultSpecialty = searchParams.get("specialty") ?? specialties[0].slug;
  const defaultDoctor = searchParams.get("doctor") ?? "";
  const form = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      specialty: defaultSpecialty,
      doctor: defaultDoctor,
      appointmentDate: "",
      appointmentTime: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      reason: "",
      paymentMethod: "paystack"
    }
  });
  const selectedSpecialty = form.watch("specialty");
  const fee = useMemo(() => specialties.find((item) => item.slug === selectedSpecialty)?.fee ?? 0, [selectedSpecialty]);

  function next() {
    setStep((value) => Math.min(value + 1, 6));
  }

  async function onSubmit(values: BookingInput) {
    setSubmitError(null);
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    const result = await response.json();

    if (!response.ok) {
      setSubmitError(result.error ?? "Could not create appointment. Please try again.");
      return;
    }

    setConfirmation({
      patientNumber: result.patientNumber,
      invoiceNumber: result.invoice.invoice_number
    });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="section bg-muted/45">
        <div className="container max-w-3xl">
          <Card><CardContent className="p-8 text-center"><CheckCircle2 className="mx-auto h-14 w-14 text-primary" /><h1 className="mt-5 text-3xl font-bold">Appointment request confirmed</h1><p className="mt-3 text-muted-foreground">Your appointment has been saved in Supabase. Patient ID: <strong>{confirmation?.patientNumber}</strong>. Invoice: <strong>{confirmation?.invoiceNumber}</strong>.</p></CardContent></Card>
        </div>
      </section>
    );
  }

  return (
    <section className="section bg-muted/45">
      <div className="container max-w-5xl">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-wide text-primary">Book consultation</p>
          <h1 className="mt-3 text-4xl font-bold text-care-ink">Schedule specialist care</h1>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 lg:grid-cols-[0.35fr_0.65fr]">
          <Card><CardContent className="p-5">
            {steps.map(({ number, label, Icon }) => (
              <button type="button" key={label} onClick={() => setStep(number)} className={`mb-2 flex w-full items-center gap-3 rounded-md p-3 text-left text-sm font-semibold ${step === number ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
                <Icon className="h-4 w-4" /> {number}. {label}
              </button>
            ))}
          </CardContent></Card>
          <Card><CardContent className="p-6">
            {step === 1 && (
              <div className="grid gap-4">
                <label className="text-sm font-semibold">Specialty<select className="mt-2 h-11 w-full rounded-md border bg-white px-3" {...form.register("specialty")}>{specialties.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></label>
                <label className="text-sm font-semibold">Doctor<select className="mt-2 h-11 w-full rounded-md border bg-white px-3" {...form.register("doctor")}><option value="">Next available doctor</option>{doctors.map((doctor) => <option key={doctor.slug} value={doctor.slug}>{doctor.name}</option>)}</select></label>
                <Button type="button" onClick={next}>Continue</Button>
              </div>
            )}
            {step === 2 && (
              <div className="grid gap-4">
                <Input type="date" {...form.register("appointmentDate")} />
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">{times.map((time) => <button type="button" key={time} onClick={() => form.setValue("appointmentTime", time)} className={`rounded-md border p-3 text-sm font-semibold ${form.watch("appointmentTime") === time ? "border-primary bg-secondary text-primary" : "bg-white"}`}>{time}</button>)}</div>
                <Button type="button" onClick={next}>Continue</Button>
              </div>
            )}
            {step === 3 && (
              <div className="grid gap-4 md:grid-cols-2">
                <Input placeholder="First name" {...form.register("firstName")} /><Input placeholder="Last name" {...form.register("lastName")} /><Input placeholder="Email" {...form.register("email")} /><Input placeholder="Phone" {...form.register("phone")} />
                <Button className="md:col-span-2" type="button" onClick={next}>Continue</Button>
              </div>
            )}
            {step === 4 && (
              <div className="grid gap-4">
                <Textarea placeholder="Reason for visit" {...form.register("reason")} />
                <Input type="file" />
                <Button type="button" onClick={next}>Continue</Button>
              </div>
            )}
            {step === 5 && (
              <div className="grid gap-4">
                <div className="rounded-lg bg-secondary p-5"><strong>Consultation fee:</strong> {currency(fee)}</div>
                <select className="h-11 rounded-md border bg-white px-3" {...form.register("paymentMethod")}><option value="paystack">Paystack</option><option value="cash">Pay at hospital</option><option value="insurance">Insurance/HMO</option></select>
                <Button type="button" onClick={next}>Review booking</Button>
              </div>
            )}
            {step === 6 && (
              <div className="grid gap-4">
                <div className="rounded-lg border p-5 text-sm leading-7">Your booking will create an appointment, patient record if needed, invoice, and notification workflow. Payment webhooks complete the appointment confirmation.</div>
                {Object.values(form.formState.errors).length ? <p className="text-sm font-semibold text-destructive">Please complete all required fields before confirming.</p> : null}
                {submitError ? <p className="text-sm font-semibold text-destructive">{submitError}</p> : null}
                <Button type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? "Saving..." : "Confirm appointment"}</Button>
              </div>
            )}
          </CardContent></Card>
        </form>
      </div>
    </section>
  );
}
