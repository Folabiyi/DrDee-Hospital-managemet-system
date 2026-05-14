import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { MobileStaffNav } from "@/components/dashboard/mobile-staff-nav";

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MobileStaffNav />
      <div className="min-h-screen bg-muted/35 lg:grid lg:grid-cols-[260px_1fr]">
        <DashboardSidebar />
        <main>{children}</main>
      </div>
    </>
  );
}
