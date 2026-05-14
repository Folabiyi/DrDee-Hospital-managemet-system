import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PrescriptionsPage() {
  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold text-care-ink">E-prescriptions</h1>
      <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-lg border bg-white p-5">
          <h2 className="font-bold">Prescription writer</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <Input placeholder="Medication" /><Input placeholder="Dosage" /><Input placeholder="Frequency" /><Input placeholder="Duration" />
          </div>
          <Button className="mt-4" type="button">Send to pharmacy</Button>
        </div>
        <div className="rounded-lg border bg-white p-5">
          <h2 className="font-bold">Interaction warnings</h2>
          <p className="mt-3 text-sm text-muted-foreground">Warnings are checked against the medication interaction array before dispensing and PDF generation.</p>
        </div>
      </div>
    </section>
  );
}
