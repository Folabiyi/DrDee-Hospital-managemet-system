import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-muted/45 p-4">
      <Card className="w-full max-w-md"><CardContent className="p-8">
        <h1 className="text-3xl font-bold text-care-ink">Create patient account</h1>
        <form className="mt-6 grid gap-4"><Input placeholder="Full name" /><Input type="email" placeholder="Email address" /><Input type="password" placeholder="Password" /><Button type="button">Register</Button></form>
        <Link className="mt-5 block text-sm text-primary" href="/login">Already have an account?</Link>
      </CardContent></Card>
    </main>
  );
}
