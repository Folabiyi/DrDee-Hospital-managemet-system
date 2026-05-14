export default function StaffManagementPage() {
  return <section className="p-6"><h1 className="text-3xl font-bold text-care-ink">Staff management</h1><div className="mt-6 grid gap-4 md:grid-cols-3">{["Duty roster", "Doctor availability", "Leave management"].map((item) => <div key={item} className="rounded-lg border bg-white p-5"><h2 className="font-bold">{item}</h2><p className="mt-2 text-sm text-muted-foreground">Role-aware scheduling and staff profile management for hospital operations.</p></div>)}</div></section>;
}
