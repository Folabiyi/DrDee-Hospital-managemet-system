export default function NotificationsPage() {
  return <section className="p-6"><h1 className="text-3xl font-bold text-care-ink">Notifications</h1><div className="mt-6 grid gap-4 md:grid-cols-3">{["Appointment reminders", "Lab result alerts", "Payment receipts"].map((item) => <div key={item} className="rounded-lg border bg-white p-5"><h2 className="font-bold">{item}</h2><p className="mt-2 text-sm text-muted-foreground">Email, SMS, and in-app notification templates with delivery status.</p></div>)}</div></section>;
}
