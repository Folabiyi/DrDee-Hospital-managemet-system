import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, CalendarDays, HeartPulse, MapPin, ShieldCheck, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/public-site/section-heading";
import { ServiceCard } from "@/components/public-site/service-card";
import { Reveal } from "@/components/public-site/reveal";
import { doctors, posts, specialties, testimonials } from "@/lib/data";
import { hospital } from "@/lib/config";

export default function HomePage() {
  const reasons = [
    { title: "Specialist-led teams", text: "Consultants, nurses, lab, pharmacy, and billing work from one secure record.", Icon: HeartPulse },
    { title: "Digital-first operations", text: "Online booking, reminders, patient portal access, and downloadable invoices.", Icon: ShieldCheck },
    { title: "Premium clinical environment", text: "Modern diagnostics, private rooms, and thoughtful patient coordination.", Icon: Award }
  ];

  return (
    <>
      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
        <Image src={hospital.images.hero} alt="Modern hospital reception and care team" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-care-ink/88 via-care-ink/55 to-transparent" />
        <div className="container relative flex min-h-[calc(100vh-4rem)] items-center py-20">
          <div className="max-w-3xl text-white">
            <Badge className="mb-5 bg-white/15 text-white backdrop-blur">Private specialist care in Osogbo</Badge>
            <h1 className="text-5xl font-bold tracking-normal sm:text-6xl lg:text-7xl">{hospital.name}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/86">
              Premium diagnostics, compassionate specialists, digital records, and seamless appointments for patients who expect care to feel personal.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link href="/book"><CalendarDays className="h-5 w-5" /> Book a Consultation</Link></Button>
              <Button asChild size="lg" variant="secondary"><Link href="/services">Explore Services</Link></Button>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-16 z-40 bg-destructive py-3 text-white shadow-soft">
        <div className="container flex flex-wrap items-center justify-between gap-3 text-sm font-semibold">
          <span>24/7 emergency hotline: {hospital.emergencyPhone}</span>
          <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {hospital.address}</span>
        </div>
      </div>

      <section className="section bg-white">
        <div className="container grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["18+", "Years of specialist care"],
            ["42", "Consultant doctors"],
            ["125k+", "Patients served"],
            ["24/7", "Emergency and inpatient care"]
          ].map(([value, label]) => (
            <div key={label} className="rounded-lg border bg-muted/40 p-6">
              <div className="text-4xl font-bold text-primary">{value}</div>
              <div className="mt-2 text-sm font-medium text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-muted/45">
        <div className="container">
          <SectionHeading eyebrow="Specialties" title="Integrated care, from first consult to recovery" text="Departments are connected through one clinical record, giving every care team a clearer view of each patient." />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {specialties.slice(0, 8).map((specialty) => <Reveal key={specialty.slug}><ServiceCard specialty={specialty} /></Reveal>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[5/4] overflow-hidden rounded-lg">
            <Image src={hospital.images.facility} alt="Hospital clinical suite" fill className="object-cover" />
          </div>
          <div>
            <SectionHeading eyebrow="Why choose us" title="Care that feels calm because the system behind it is strong" />
            <div className="mt-8 grid gap-5">
              {reasons.map(({ title, text, Icon }) => (
                <div className="flex gap-4" key={title}>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-secondary text-primary"><Icon className="h-5 w-5" /></span>
                  <div>
                    <h3 className="font-bold text-care-ink">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-care-ink text-white">
        <div className="container">
          <SectionHeading eyebrow="Doctors" title="Meet the specialists leading your care" className="text-white [&_h2]:text-white [&_p]:text-white/70" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {doctors.map((doctor) => (
              <Reveal key={doctor.slug}><Link href={`/doctors/${doctor.slug}`} className="group block overflow-hidden rounded-lg bg-white text-care-ink">
                <div className="relative aspect-[4/4]">
                  <Image src={doctor.image} alt={doctor.name} fill className="object-cover transition-transform group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold">{doctor.name}</h3>
                  <p className="mt-1 text-sm text-primary">{doctor.specialty}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{doctor.qualifications} · {doctor.experience} years</p>
                </div>
              </Link></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Patient voices" title="Trusted by families and professionals across Osun State" />
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <Card key={item.name}>
                <CardContent className="p-5">
                  <div className="mb-4 flex text-accent">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
                  <p className="text-sm leading-6 text-muted-foreground">“{item.quote}”</p>
                  <div className="mt-5 flex items-center gap-3">
                    <Image src={item.image} alt={item.name} width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
                    <div><div className="text-sm font-bold">{item.name}</div><div className="text-xs text-muted-foreground">{item.role}</div></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-muted/45">
        <div className="container">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading eyebrow="Health blog" title="Latest health insights" />
            <Button asChild variant="outline"><Link href="/blog">All articles <ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className="overflow-hidden rounded-lg border bg-white">
                <div className="relative aspect-[16/10]"><Image src={post.image} alt="" fill className="object-cover" /></div>
                <div className="p-5">
                  <Badge>{post.category}</Badge>
                  <h3 className="mt-3 text-lg font-bold text-care-ink">{post.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
