import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { appointments as fallbackAppointments } from "@/lib/data";

function firstRelation<T>(value: T | T[] | null | undefined): T | null {
  if (!value) return null;
  return Array.isArray(value) ? value[0] ?? null : value;
}

export async function getDashboardStats() {
  noStore();
  try {
    const supabase = createSupabaseAdminClient();
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const [
      { count: patientCount },
      { count: appointmentCount },
      { count: admissionCount },
      { data: invoices }
    ] = await Promise.all([
      supabase.from("patients").select("id", { count: "exact", head: true }),
      supabase
        .from("appointments")
        .select("id", { count: "exact", head: true })
        .gte("starts_at", todayStart.toISOString()),
      supabase.from("admissions").select("id", { count: "exact", head: true }).is("discharged_at", null),
      supabase.from("invoices").select("total,status").neq("status", "paid")
    ]);

    const outstanding = invoices?.reduce((sum, invoice) => sum + Number(invoice.total ?? 0), 0) ?? 0;

    return {
      patientCount: patientCount ?? 0,
      appointmentCount: appointmentCount ?? 0,
      admissionCount: admissionCount ?? 0,
      outstanding
    };
  } catch {
    return {
      patientCount: 0,
      appointmentCount: fallbackAppointments.length,
      admissionCount: 0,
      outstanding: 0
    };
  }
}

export async function getTodayAppointments() {
  noStore();
  try {
    const supabase = createSupabaseAdminClient();
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);

    const { data, error } = await supabase
      .from("appointments")
      .select("id, starts_at, status, reason, patients(patient_number), specialties(name)")
      .gte("starts_at", todayStart.toISOString())
      .lt("starts_at", todayEnd.toISOString())
      .order("starts_at", { ascending: true });

    if (error || !data?.length) return fallbackAppointments;

    return data.map((appointment) => {
      const patient = firstRelation(appointment.patients);
      const specialty = firstRelation(appointment.specialties);

      return {
      patient: patient?.patient_number ?? "Walk-in patient",
      doctor: specialty?.name ?? "Next available doctor",
      time: new Date(appointment.starts_at).toLocaleTimeString("en-NG", {
        hour: "2-digit",
        minute: "2-digit"
      }),
      status: appointment.status ?? "scheduled"
    };
    });
  } catch {
    return fallbackAppointments;
  }
}

export async function getPatientsForDashboard() {
  noStore();
  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("patients")
      .select("id, patient_number, full_name, email, phone, created_at")
      .order("created_at", { ascending: false })
      .limit(20);

    if (error || !data?.length) return [];

    return data.map((patient) => ({
      dbId: patient.id,
      id: patient.patient_number,
      name: patient.full_name ?? "Patient record",
      phone: patient.phone ?? patient.email ?? "-",
      lastVisit: new Date(patient.created_at).toLocaleDateString("en-NG"),
      balance: "Pending"
    }));
  } catch {
    return [];
  }
}

export async function getPatientRecord(patientNumber: string) {
  noStore();
  const supabase = createSupabaseAdminClient();

  const { data: patient, error } = await supabase
    .from("patients")
    .select(
      "id, patient_number, full_name, email, phone, date_of_birth, gender, address, emergency_contact, insurance_info, allergies, current_medications, medical_history, created_at"
    )
    .eq("patient_number", patientNumber)
    .single();

  if (error || !patient) {
    notFound();
  }

  const [{ data: appointments }, { data: consultations }, { data: invoices }, { data: prescriptions }, { data: labOrders }, { data: admissions }] =
    await Promise.all([
      supabase
        .from("appointments")
        .select("id, starts_at, ends_at, status, reason, appointment_type, specialties(name)")
        .eq("patient_id", patient.id)
        .order("starts_at", { ascending: false })
        .limit(10),
      supabase
        .from("consultations")
        .select("id, subjective, objective, assessment, plan, diagnosis_codes, vitals, created_at")
        .eq("patient_id", patient.id)
        .order("created_at", { ascending: false })
        .limit(10),
      supabase
        .from("invoices")
        .select("id, invoice_number, status, total, due_at, created_at")
        .eq("patient_id", patient.id)
        .order("created_at", { ascending: false })
        .limit(10),
      supabase
        .from("prescriptions")
        .select("id, status, created_at")
        .eq("patient_id", patient.id)
        .order("created_at", { ascending: false })
        .limit(10),
      supabase
        .from("lab_orders")
        .select("id, status, created_at")
        .eq("patient_id", patient.id)
        .order("created_at", { ascending: false })
        .limit(10),
      supabase
        .from("admissions")
        .select("id, admitted_at, discharged_at, notes, beds(bed_number, wards(name))")
        .eq("patient_id", patient.id)
        .order("admitted_at", { ascending: false })
        .limit(5)
    ]);

  return {
    patient,
    appointments: appointments ?? [],
    consultations: consultations ?? [],
    invoices: invoices ?? [],
    prescriptions: prescriptions ?? [],
    labOrders: labOrders ?? [],
    admissions: admissions ?? []
  };
}
