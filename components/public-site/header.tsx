import Link from "next/link";
import { CalendarDays, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hospital, publicNav } from "@/lib/config";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/92 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 font-bold text-care-ink">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-primary text-white">CB</span>
          <span className="hidden sm:inline">{hospital.shortName}</span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex">
          {publicNav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-muted-foreground hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a className="hidden items-center gap-2 text-sm font-semibold text-care-ink md:flex" href={`tel:${hospital.emergencyPhone}`}>
            <Phone className="h-4 w-4 text-destructive" /> Emergency
          </a>
          <Button asChild size="sm">
            <Link href="/book">
              <CalendarDays className="h-4 w-4" /> Book
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
