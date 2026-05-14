import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/35 lg:grid lg:grid-cols-[260px_1fr]">
      <DashboardSidebar />
      <main>{children}</main>
    </div>
  );
}
