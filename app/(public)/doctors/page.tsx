import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { doctors, specialties } from "@/lib/data";

export const metadata = { title: "Doctors" };

export default function DoctorsPage() {
  return (
    <section className="section bg-muted/45">
      <div className="container">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-primary">Directory</p>
            <h1 className="mt-3 text-4xl font-bold text-care-ink">Find a doctor</h1>
          </div>
          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <div className="relative"><Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" /><Input className="pl-10" placeholder="Search by name, specialty, availability" /></div>
            <select className="h-11 rounded-md border bg-white px-3 text-sm">{specialties.map((s) => <option key={s.slug}>{s.name}</option>)}</select>
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor) => (
            <Link href={`/doctors/${doctor.slug}`} key={doctor.slug} className="overflow-hidden rounded-lg border bg-white">
              <div className="relative aspect-square"><Image src={doctor.image} alt={doctor.name} fill className="object-cover" /></div>
              <div className="p-5">
                <Badge>{doctor.specialty}</Badge>
                <h2 className="mt-3 text-lg font-bold">{doctor.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{doctor.qualifications}</p>
                <p className="mt-2 text-xs font-semibold">{doctor.availability} · {doctor.languages.join(", ")}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
