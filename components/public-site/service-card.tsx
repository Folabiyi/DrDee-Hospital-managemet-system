import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { currency } from "@/lib/utils";
import { specialties } from "@/lib/data";

type Specialty = (typeof specialties)[number];

export function ServiceCard({ specialty }: { specialty: Specialty }) {
  const Icon = specialty.icon;
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[4/3]">
        <Image src={specialty.image} alt="" fill className="object-cover" sizes="(min-width: 1024px) 25vw, 100vw" />
      </div>
      <CardContent className="p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-secondary text-primary">
            <Icon className="h-5 w-5" />
          </span>
          {specialty.fee > 0 ? <span className="text-sm font-semibold">{currency(specialty.fee)}</span> : null}
        </div>
        <h3 className="text-lg font-bold text-care-ink">{specialty.name}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{specialty.summary}</p>
        <Link href={`/services/${specialty.slug}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          View specialty <ArrowRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
