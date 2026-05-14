import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata = { title: "Careers" };

export default function CareersPage() {
  return (
    <section className="section">
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-bold text-care-ink">Careers</h1>
        <div className="mt-8 grid gap-4">
          {["Consultant Radiologist", "Senior Staff Nurse", "Pharmacy Technician"].map((job) => <div key={job} className="rounded-lg border p-5"><h2 className="font-bold">{job}</h2><p className="mt-2 text-sm text-muted-foreground">Full-time · Osogbo · Private hospital experience preferred</p></div>)}
        </div>
        <form className="mt-10 grid gap-4 rounded-lg bg-muted p-6"><Input placeholder="Full name" /><Input placeholder="Email" /><Input type="file" /><Button type="button">Apply</Button></form>
      </div>
    </section>
  );
}
