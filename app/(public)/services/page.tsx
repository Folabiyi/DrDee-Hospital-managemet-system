import { SectionHeading } from "@/components/public-site/section-heading";
import { ServiceCard } from "@/components/public-site/service-card";
import { specialties } from "@/lib/data";

export const metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <section className="section bg-muted/45">
      <div className="container">
        <SectionHeading eyebrow="Services" title="Specialties and departments" text="Browse departments, compare consultation fees, and book with a specialist or the next available clinician." />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {specialties.map((specialty) => <ServiceCard key={specialty.slug} specialty={specialty} />)}
        </div>
      </div>
    </section>
  );
}
