import { Search } from "lucide-react";
import Link from "next/link";
import { PatientRegistrationForm } from "@/components/dashboard/patient-registration-form";
import { Input } from "@/components/ui/input";
import { getPatientsForDashboard } from "@/lib/supabase/queries";

export default async function PatientsAdminPage() {
  const patients = await getPatientsForDashboard();

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold text-care-ink">Patient management</h1>
      <div className="relative mt-6 max-w-xl">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input className="pl-10" placeholder="Search by HSP ID, name, phone, email" />
      </div>
      <div className="mt-6 overflow-hidden rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-muted text-left">
            <tr>
              <th className="p-3">Patient ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Last visit</th>
              <th className="p-3">Balance</th>
            </tr>
          </thead>
          <tbody>
            {patients.length ? patients.map((patient) => (
              <tr key={patient.id} className="border-t hover:bg-secondary/50">
                <td className="p-3 font-semibold text-primary">
                  <Link href={`/staff/admin/patients/${patient.id}`}>{patient.id}</Link>
                </td>
                <td className="p-3">
                  <Link className="block font-medium text-care-ink" href={`/staff/admin/patients/${patient.id}`}>{patient.name}</Link>
                </td>
                <td className="p-3">{patient.phone}</td>
                <td className="p-3">{patient.lastVisit}</td>
                <td className="p-3">{patient.balance}</td>
              </tr>
            )) : (
              <tr className="border-t">
                <td className="p-6 text-center text-muted-foreground" colSpan={5}>
                  No Supabase patient records yet. Use the registration form below to create the first patient.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-6 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <PatientRegistrationForm />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
          {["Merge duplicates", "Upload records"].map((item) => (
            <div key={item} className="rounded-lg border bg-white p-5 font-semibold">
              {item}
              <p className="mt-2 text-sm font-normal text-muted-foreground">
                Connected to Supabase Auth, Storage, audit logs, and RLS patient ownership.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
