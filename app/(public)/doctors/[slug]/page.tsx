import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { doctors } from "@/lib/data";

export function generateStaticParams() {
  return doctors.map((doctor) => ({ slug: doctor.slug }));
}

export default function DoctorProfilePage({ params }: { params: { slug: string } }) {
  const doctor = doctors.find((item) => item.slug === params.slug);
  if (!doctor) notFound();
  return (
    <section className="section">
      <div className="container grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg"><Image src={doctor.image} alt={doctor.name} fill className="object-cover" /></div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-primary">{doctor.specialty}</p>
          <h1 className="mt-3 text-5xl font-bold text-care-ink">{doctor.name}</h1>
          <p className="mt-3 font-semibold">{doctor.qualifications} · {doctor.experience} years experience</p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{doctor.bio}</p>
          <Button asChild className="mt-8"><Link href={`/book?doctor=${doctor.slug}`}><CalendarDays className="h-4 w-4" /> Book with this Doctor</Link></Button>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div><h2 className="font-bold">Education</h2><ul className="mt-3 grid gap-2 text-sm text-muted-foreground">{doctor.education.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div><h2 className="font-bold">Publications</h2><ul className="mt-3 grid gap-2 text-sm text-muted-foreground">{doctor.publications.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </div>
          <div className="mt-8 rounded-lg bg-muted p-5"><strong>Schedule:</strong> {doctor.availability}. Languages: {doctor.languages.join(", ")}.</div>
        </div>
      </div>
    </section>
  );
}
