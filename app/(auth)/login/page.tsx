import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-muted/45 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          <h1 className="text-3xl font-bold text-care-ink">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to access your portal or staff dashboard.</p>
          <form className="mt-6 grid gap-4">
            <Input type="email" placeholder="Email address" />
            <Input type="password" placeholder="Password" />
            <Button type="button">Sign in</Button>
          </form>
          <div className="mt-5 flex justify-between text-sm">
            <Link className="text-primary" href="/register">Create account</Link>
            <Link className="text-primary" href="/forgot-password">Forgot password?</Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
