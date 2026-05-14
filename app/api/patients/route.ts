import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { patientRegistrationSchema } from "@/lib/validations/booking";

export async function POST(request: Request) {
  const payload = patientRegistrationSchema.parse(await request.json());
  const supabase = createSupabaseAdminClient();

  const { data: hospital, error: hospitalError } = await supabase
    .from("hospitals")
    .select("id")
    .eq("slug", "carebridge")
    .single();

  if (hospitalError || !hospital) {
    return NextResponse.json({ error: hospitalError?.message ?? "Hospital record not found." }, { status: 500 });
  }

  const allergies = payload.allergies
    ?.split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const { data: patient, error } = await supabase
    .from("patients")
    .insert({
      hospital_id: hospital.id,
      full_name: payload.fullName,
      email: payload.email || null,
      phone: payload.phone,
      date_of_birth: payload.dateOfBirth || null,
      gender: payload.gender || null,
      address: payload.address || null,
      emergency_contact: {
        name: payload.emergencyName || null,
        phone: payload.emergencyPhone || null
      },
      allergies: allergies ?? [],
      medical_history: payload.medicalHistory || null
    })
    .select("id, patient_number, full_name")
    .single();

  if (error) {
    const migrationHint = error.message.includes("full_name")
      ? " Run supabase/migrations/003_patient_registration_fields.sql in Supabase SQL editor, then try again."
      : "";

    return NextResponse.json({ error: `${error.message}${migrationHint}` }, { status: 500 });
  }

  return NextResponse.json({ ok: true, patient });
}
