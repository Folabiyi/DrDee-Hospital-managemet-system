import { StatCard } from "@/components/dashboard/stat-card";

export default function BillingPage() {
  return <section className="p-6"><h1 className="text-3xl font-bold text-care-ink">Billing and invoices</h1><div className="mt-6 grid gap-4 md:grid-cols-3"><StatCard label="Paid today" value="₦1.48m" /><StatCard label="Insurance claims" value="27" /><StatCard label="Unpaid invoices" value="₦3.2m" /></div><div className="mt-6 grid gap-4 lg:grid-cols-2"><div className="rounded-lg border bg-white p-5">Invoices are generated from consultations, lab orders, pharmacy dispensing, admissions, and procedures. Paystack webhook endpoints live under API routes.</div><div className="rounded-lg border bg-white p-5"><h2 className="font-bold">Payment channels</h2><p className="mt-2 text-sm text-muted-foreground">Cash, POS/card, transfer, Paystack online checkout, and insurance/HMO claims tracking.</p></div></div></section>;
}
