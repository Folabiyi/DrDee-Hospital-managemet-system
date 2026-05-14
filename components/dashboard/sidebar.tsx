import Link from "next/link";
import { Activity, Bed, Bell, CalendarDays, ClipboardList, CreditCard, FlaskConical, LayoutDashboard, Package, Pill, Stethoscope, Users, Video } from "lucide-react";

const nav = [
  ["/staff/admin", "Overview", LayoutDashboard],
  ["/staff/admin/modules", "HMS Modules", Activity],
  ["/staff/receptionist", "Appointments", CalendarDays],
  ["/staff/doctor", "EMR", ClipboardList],
  ["/staff/doctor/prescriptions", "Prescriptions", Pill],
  ["/staff/nurse", "Wards", Bed],
  ["/staff/lab", "Lab", FlaskConical],
  ["/staff/pharmacy", "Pharmacy", Pill],
  ["/staff/admin/patients", "Patients", Users],
  ["/staff/admin/billing", "Billing", CreditCard],
  ["/staff/admin/inventory", "Inventory", Package],
  ["/staff/admin/staff", "Staff", Stethoscope],
  ["/staff/admin/telemedicine", "Telemedicine", Video],
  ["/staff/admin/notifications", "Notifications", Bell],
  ["/staff/admin/reports", "Reports", Activity]
] as const;

export function DashboardSidebar() {
  return (
    <aside className="hidden min-h-screen border-r bg-white lg:block">
      <div className="p-5 text-xl font-bold text-care-ink">CareBridge HMS</div>
      <nav className="grid gap-1 p-3">
        {nav.map(([href, label, Icon]) => (
          <Link key={href} href={href} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-primary">
            <Icon className="h-4 w-4" /> {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
