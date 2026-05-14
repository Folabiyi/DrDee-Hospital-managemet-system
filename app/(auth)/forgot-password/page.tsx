import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const metadata = { title: "Forgot Password" };

export default function ForgotPasswordPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-muted/45 p-4">
      <Card className="w-full max-w-md"><CardContent className="p-8"><h1 className="text-3xl font-bold text-care-ink">Reset password</h1><p className="mt-2 text-sm text-muted-foreground">Supabase Auth sends a secure reset link.</p><form className="mt-6 grid gap-4"><Input type="email" placeholder="Email address" /><Button type="button">Send reset link</Button></form></CardContent></Card>
    </main>
  );
}
