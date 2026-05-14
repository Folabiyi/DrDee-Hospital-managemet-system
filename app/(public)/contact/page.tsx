import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { hospital } from "@/lib/config";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="section bg-muted/45">
      <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-primary">Contact</p>
          <h1 className="mt-3 text-4xl font-bold text-care-ink">Speak with CareBridge</h1>
          <div className="mt-8 grid gap-4 text-sm">
            <span className="flex gap-3"><MapPin className="h-5 w-5 text-primary" /> {hospital.address}</span>
            <a className="flex gap-3" href={`tel:${hospital.phone}`}><Phone className="h-5 w-5 text-primary" /> {hospital.phone}</a>
            <a className="flex gap-3" href={`mailto:${hospital.email}`}><Mail className="h-5 w-5 text-primary" /> {hospital.email}</a>
          </div>
          <div className="mt-8 overflow-hidden rounded-lg border bg-white">
            <iframe title="CareBridge map" className="h-72 w-full" loading="lazy" src="https://www.google.com/maps?q=Osogbo%20Osun%20State%20Nigeria&output=embed" />
          </div>
        </div>
        <form className="grid gap-4 rounded-lg border bg-white p-6">
          <Input placeholder="Full name" /><Input placeholder="Email address" /><Input placeholder="Phone" /><Textarea placeholder="How can we help?" /><Button type="button">Send message</Button>
        </form>
      </div>
    </section>
  );
}
