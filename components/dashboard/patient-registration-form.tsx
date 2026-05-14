"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { patientRegistrationSchema, type PatientRegistrationInput } from "@/lib/validations/booking";

export function PatientRegistrationForm() {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<PatientRegistrationInput>({
    resolver: zodResolver(patientRegistrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      gender: "",
      address: "",
      emergencyName: "",
      emergencyPhone: "",
      allergies: "",
      medicalHistory: ""
    }
  });

  async function onSubmit(values: PatientRegistrationInput) {
    setMessage(null);
    setError(null);

    const response = await fetch("/api/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    const result = await response.json();

    if (!response.ok) {
      setError(result.error ?? "Could not register patient.");
      return;
    }

    form.reset();
    setMessage(`Registered ${result.patient.full_name} as ${result.patient.patient_number}.`);
    router.refresh();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border bg-white p-5">
      <div>
        <h2 className="text-lg font-bold text-care-ink">New registration</h2>
        <p className="mt-1 text-sm text-muted-foreground">Create a patient record directly in Supabase.</p>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <Input placeholder="Full name" {...form.register("fullName")} />
        <Input placeholder="Phone number" {...form.register("phone")} />
        <Input placeholder="Email address" {...form.register("email")} />
        <Input type="date" {...form.register("dateOfBirth")} />
        <select className="h-11 rounded-md border bg-white px-3 text-sm" {...form.register("gender")}>
          <option value="">Gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
        </select>
        <Input placeholder="Address" {...form.register("address")} />
        <Input placeholder="Emergency contact name" {...form.register("emergencyName")} />
        <Input placeholder="Emergency contact phone" {...form.register("emergencyPhone")} />
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <Textarea placeholder="Allergies, separated by commas" {...form.register("allergies")} />
        <Textarea placeholder="Medical history" {...form.register("medicalHistory")} />
      </div>
      {form.formState.errors.fullName ? <p className="mt-3 text-sm font-semibold text-destructive">{form.formState.errors.fullName.message}</p> : null}
      {form.formState.errors.phone ? <p className="mt-3 text-sm font-semibold text-destructive">{form.formState.errors.phone.message}</p> : null}
      {error ? <p className="mt-3 text-sm font-semibold text-destructive">{error}</p> : null}
      {message ? <p className="mt-3 text-sm font-semibold text-primary">{message}</p> : null}
      <Button className="mt-4" type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Registering..." : "Register patient"}
      </Button>
    </form>
  );
}
