import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { doctors, specialties } from "@/lib/data";
import { currency } from "@/lib/utils";

export function generateStaticParams() {
  return specialties.map((specialty) => ({ slug: specialty.slug }));
}

export default function SpecialtyPage({ params }: { params: { slug: string } }) {
  const specialty = specialties.find((item) => item.slug === params.slug);
  if (!specialty) notFound();
  const deptDoctors = doctors.filter((doctor) => doctor.specialty === specialty.name);
  return (
    <>
      <section className="relative min-h-[460px] overflow-hidden">
        <Image src={specialty.image} alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-care-ink/70" />
        <div className="container relative flex min-h-[460px] items-end pb-14 text-white">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-wide text-accent">{currency(specialty.fee)} consultation</p>
            <h1 className="text-5xl font-bold tracking-normal">{specialty.name}</h1>
            <p className="mt-5 text-lg leading-8 text-white/82">{specialty.summary}</p>
            <Button asChild className="mt-7"><Link href={`/book?specialty=${specialty.slug}`}><CalendarDays className="h-4 w-4" /> Book Consultation</Link></Button>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <h2 className="text-3xl font-bold text-care-ink">Treatments and equipment</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {specialty.treatments.map((item) => <div key={item} className="flex gap-3 rounded-lg border p-4"><CheckCircle2 className="h-5 w-5 text-primary" /><span className="font-medium">{item}</span></div>)}
            </div>
          </div>
          <div className="rounded-lg bg-muted p-6">
            <h2 className="font-bold">Doctors in this department</h2>
            <div className="mt-5 grid gap-4">
              {(deptDoctors.length ? deptDoctors : doctors.slice(0, 2)).map((doctor) => <Link key={doctor.slug} href={`/doctors/${doctor.slug}`} className="font-semibold text-primary">{doctor.name}</Link>)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
