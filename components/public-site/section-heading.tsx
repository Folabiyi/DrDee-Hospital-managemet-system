import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  text,
  className
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? <p className="mb-3 text-sm font-bold uppercase tracking-wide text-primary">{eyebrow}</p> : null}
      <h2 className="text-3xl font-bold tracking-normal text-care-ink sm:text-4xl">{title}</h2>
      {text ? <p className="mt-4 text-base leading-7 text-muted-foreground">{text}</p> : null}
    </div>
  );
}
