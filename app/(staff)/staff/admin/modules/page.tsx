import { ModuleCard } from "@/components/dashboard/module-card";
import { hmsModules } from "@/lib/hms-data";

export default function HmsModulesPage() {
  return (
    <section className="p-6">
      <p className="text-sm font-bold uppercase tracking-wide text-primary">Hospital management system</p>
      <h1 className="mt-2 text-3xl font-bold text-care-ink">Operational modules</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
        These screens map directly to the core HMS workflows: front desk, clinical care, lab, pharmacy, finance, inpatient care, inventory, HR, telemedicine, notifications, and analytics.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {hmsModules.map((module) => <ModuleCard key={module.href} module={module} />)}
      </div>
    </section>
  );
}
