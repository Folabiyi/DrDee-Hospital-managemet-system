import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { hmsModules } from "@/lib/hms-data";

type Module = (typeof hmsModules)[number];

export function ModuleCard({ module }: { module: Module }) {
  const Icon = module.icon;
  return (
    <Link href={module.href} className="block">
      <Card className="h-full transition hover:border-primary hover:shadow-soft">
        <CardContent className="flex h-full flex-col p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="grid h-11 w-11 place-items-center rounded-md bg-secondary text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-xs font-bold text-primary">{module.metric}</span>
          </div>
          <h2 className="text-lg font-bold text-care-ink">{module.title}</h2>
          <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{module.description}</p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
            Open module <ArrowRight className="h-4 w-4" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
