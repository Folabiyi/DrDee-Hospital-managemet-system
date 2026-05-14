import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

function loadEnv() {
  const env = readFileSync(".env", "utf8");
  for (const line of env.split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match) process.env[match[1]] = match[2];
  }
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false }
});

async function upsert(table, rows, onConflict) {
  const { error } = await supabase.from(table).upsert(rows, { onConflict });
  if (error) throw new Error(`${table}: ${error.message}`);
}

async function insertMissingByName(table, rows) {
  for (const row of rows) {
    const { data, error: selectError } = await supabase.from(table).select("id").eq("name", row.name).maybeSingle();
    if (selectError) throw new Error(`${table}: ${selectError.message}`);
    if (data) continue;

    const { error: insertError } = await supabase.from(table).insert(row);
    if (insertError) throw new Error(`${table}: ${insertError.message}`);
  }
}

await upsert(
  "hospitals",
  [
    {
      name: "CareBridge Specialist Hospital",
      slug: "carebridge",
      address: "Ogo-Oluwa Area, Osogbo, Osun State, Nigeria",
      phone: "+234 700 227 3243",
      emergency_phone: "+234 700 911 0000"
    }
  ],
  "slug"
);

const { data: hospital, error: hospitalError } = await supabase
  .from("hospitals")
  .select("id")
  .eq("slug", "carebridge")
  .single();

if (hospitalError || !hospital) {
  throw new Error(hospitalError?.message ?? "Hospital not found after upsert.");
}

await upsert(
  "specialties",
  [
    ["Cardiology", "cardiology", "Preventive and specialist heart care.", 55000],
    ["Pediatrics", "pediatrics", "Newborn, child, and adolescent medicine.", 35000],
    ["Orthopedics", "orthopedics", "Bone, joint, and sports injury care.", 50000],
    ["Neurology", "neurology", "Brain, nerve, stroke, seizure, and headache care.", 60000],
    ["Diagnostics", "diagnostics", "Laboratory and imaging services.", 25000],
    ["General Medicine", "general-medicine", "Adult primary and urgent medical care.", 30000]
  ].map(([name, slug, description, consultation_fee]) => ({
    hospital_id: hospital.id,
    name,
    slug,
    description,
    consultation_fee
  })),
  "slug"
);

await insertMissingByName(
  "medications",
  [
    { name: "Amlodipine", form: "tablet", strength: "5mg", interactions: ["Simvastatin"], reorder_level: 50 },
    { name: "Amoxicillin/Clavulanate", form: "tablet", strength: "625mg", interactions: ["Warfarin"], reorder_level: 40 },
    { name: "Paracetamol", form: "tablet", strength: "500mg", interactions: [], reorder_level: 100 },
    { name: "Metformin", form: "tablet", strength: "500mg", interactions: ["Contrast media"], reorder_level: 60 }
  ]
);

await insertMissingByName(
  "lab_tests",
  [
    { name: "Full Blood Count", category: "Hematology", price: 12000, turnaround_hours: 6 },
    { name: "Lipid Profile", category: "Chemistry", price: 18000, turnaround_hours: 12 },
    { name: "HbA1c", category: "Chemistry", price: 15000, turnaround_hours: 12 },
    { name: "Malaria Parasite", category: "Microbiology", price: 8000, turnaround_hours: 4 }
  ]
);

console.log("Supabase seed complete.");
