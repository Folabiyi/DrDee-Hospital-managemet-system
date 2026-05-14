"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { dashboardNav } from "@/components/dashboard/sidebar";

export function MobileStaffNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white lg:hidden">
      <div className="flex h-16 items-center justify-between px-4">
        <Link href="/staff/admin" className="font-bold text-care-ink">CareBridge HMS</Link>
        <Button type="button" variant="outline" size="icon" onClick={() => setOpen((value) => !value)} aria-label="Toggle staff navigation">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      {open ? (
        <nav className="grid max-h-[calc(100vh-4rem)] gap-1 overflow-y-auto border-t bg-white p-3">
          {dashboardNav.map(([href, label, Icon]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-primary"
            >
              <Icon className="h-4 w-4" /> {label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
