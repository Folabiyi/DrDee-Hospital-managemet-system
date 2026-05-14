import { addMinutes } from "date-fns";
import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { bookingSchema } from "@/lib/validations/booking";

function invoiceNumber() {
  return `INV-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export async function POST(request: Request) {
  const payload = bookingSchema.parse(await request.json());
  const supabase = createSupabaseAdminClient();

  const { data: hospital, error: hospitalError } = await supabase
    .from("hospitals")
    .select("id")
    .eq("slug", "carebridge")
    .single();

  if (hospitalError || !hospital) {
    return NextResponse.json({ error: hospitalError?.message ?? "Hospital record not found." }, { status: 500 });
  }

  const { data: specialty, error: specialtyError } = await supabase
    .from("specialties")
    .select("id, consultation_fee")
    .eq("slug", payload.specialty)
    .single();

  if (specialtyError || !specialty) {
    return NextResponse.json({ error: specialtyError?.message ?? "Specialty not found." }, { status: 400 });
  }

  const { data: patient, error: patientError } = await supabase
    .from("patients")
    .insert({
      hospital_id: hospital.id,
      full_name: `${payload.firstName} ${payload.lastName}`,
      email: payload.email,
      phone: payload.phone,
      address: null,
      medical_history: `Public booking: ${payload.firstName} ${payload.lastName}. Email: ${payload.email}. Phone: ${payload.phone}. Reason: ${payload.reason}`,
      emergency_contact: { phone: payload.phone, email: payload.email }
    })
    .select("id, patient_number")
    .single();

  if (patientError || !patient) {
    return NextResponse.json({ error: patientError?.message ?? "Could not create patient." }, { status: 500 });
  }

  const startsAt = new Date(`${payload.appointmentDate}T${payload.appointmentTime}:00`);
  const endsAt = addMinutes(startsAt, 30);

  const { data: appointment, error: appointmentError } = await supabase
    .from("appointments")
    .insert({
      hospital_id: hospital.id,
      patient_id: patient.id,
      specialty_id: specialty.id,
      starts_at: startsAt.toISOString(),
      ends_at: endsAt.toISOString(),
      status: payload.paymentMethod === "paystack" ? "scheduled" : "confirmed",
      reason: payload.reason,
      appointment_type: "public_booking"
    })
    .select("id")
    .single();

  if (appointmentError || !appointment) {
    return NextResponse.json({ error: appointmentError?.message ?? "Could not create appointment." }, { status: 500 });
  }

  const { data: invoice, error: invoiceError } = await supabase
    .from("invoices")
    .insert({
      patient_id: patient.id,
      invoice_number: invoiceNumber(),
      status: payload.paymentMethod === "paystack" ? "pending" : "draft",
      total: specialty.consultation_fee ?? 0,
      due_at: startsAt.toISOString()
    })
    .select("invoice_number,total")
    .single();

  if (invoiceError || !invoice) {
    return NextResponse.json({ error: invoiceError.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    patientNumber: patient.patient_number,
    appointmentId: appointment.id,
    invoice
  });
}
