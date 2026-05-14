import Link from "next/link";

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-muted/35"><header className="border-b bg-white"><div className="container flex h-16 items-center justify-between"><Link href="/patient" className="font-bold text-care-ink">CareBridge Patient Portal</Link><Link href="/book" className="text-sm font-semibold text-primary">Book appointment</Link></div></header>{children}</div>;
}
