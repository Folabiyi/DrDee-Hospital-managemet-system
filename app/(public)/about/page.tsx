import Image from "next/image";
import { Award, Compass, Eye, HeartHandshake } from "lucide-react";
import { SectionHeading } from "@/components/public-site/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { doctors } from "@/lib/data";
import { hospital } from "@/lib/config";

export const metadata = { title: "About Us" };

export default function AboutPage() {
  const gallery = [hospital.images.facility, hospital.images.theatre, hospital.images.team];
  const principles = [
    { title: "Mission", text: "Deliver safe, specialist-led care that is easy to access and clearly communicated.", Icon: Compass },
    { title: "Vision", text: "Set the standard for premium digital healthcare operations in West Africa.", Icon: Eye },
    { title: "Values", text: "Compassion, privacy, clinical rigor, accountability, and continuous improvement.", Icon: HeartHandshake }
  ];

  return (
    <>
      <section className="section bg-muted/45">
        <div className="container grid items-center gap-10 lg:grid-cols-2">
          <SectionHeading eyebrow="About us" title="A private hospital built around clinical excellence and human warmth" text="CareBridge was founded to bring specialist-led, digitally coordinated care to families, professionals, and international patients in Osogbo and across Osun State." />
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image src={hospital.images.team} alt="Hospital care team" fill className="object-cover" />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container grid gap-6 md:grid-cols-3">
          {principles.map(({ title, text, Icon }) => (
            <Card key={title}><CardContent className="p-6"><Icon className="mb-4 h-8 w-8 text-primary" /><h2 className="text-xl font-bold">{title}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p></CardContent></Card>
          ))}
        </div>
      </section>
      <section className="section bg-muted/45">
        <div className="container">
          <SectionHeading eyebrow="Leadership" title="Clinical leaders" />
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {doctors.map((doctor) => (
              <div key={doctor.slug} className="overflow-hidden rounded-lg border bg-white">
                <div className="relative aspect-square"><Image src={doctor.image} alt={doctor.name} fill className="object-cover" /></div>
                <div className="p-4"><h3 className="font-bold">{doctor.name}</h3><p className="text-sm text-primary">{doctor.specialty}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Accreditations" title="Quality markers patients can verify" />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {["ISO-aligned quality program", "NDPR privacy governance", "Specialist college affiliations"].map((item) => <div key={item} className="flex items-center gap-3 rounded-lg border p-5"><Award className="h-5 w-5 text-accent" /><span className="font-semibold">{item}</span></div>)}
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {gallery.map((image) => <div key={image} className="relative aspect-[4/3] overflow-hidden rounded-lg"><Image src={image} alt="CareBridge facility" fill className="object-cover" /></div>)}
          </div>
        </div>
      </section>
    </>
  );
}
