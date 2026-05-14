import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { hospital, publicNav } from "@/lib/config";

export function PublicFooter() {
  return (
    <footer className="bg-care-ink text-white">
      <div className="container grid gap-10 py-12 md:grid-cols-[1.2fr_0.8fr_1fr]">
        <div>
          <div className="mb-4 text-2xl font-bold">{hospital.name}</div>
          <p className="max-w-md text-sm leading-6 text-white/75">{hospital.description}</p>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/70">Quick links</h2>
          <div className="grid gap-2">
            {publicNav.map((item) => (
              <Link className="text-sm text-white/80 hover:text-white" href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="grid gap-3 text-sm text-white/80">
          <span className="flex gap-2"><MapPin className="h-4 w-4 text-accent" /> {hospital.address}</span>
          <a className="flex gap-2" href={`tel:${hospital.phone}`}><Phone className="h-4 w-4 text-accent" /> {hospital.phone}</a>
          <a className="flex gap-2" href={`mailto:${hospital.email}`}><Mail className="h-4 w-4 text-accent" /> {hospital.email}</a>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        © 2026 {hospital.name}. Built for secure, specialist-led care.
      </div>
    </footer>
  );
}
