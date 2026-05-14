import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const payload = (await request.json()) as { to: string; subject: string; html: string };

  if (!apiKey || !from) {
    return NextResponse.json({ error: "Resend is not configured." }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from,
    to: payload.to,
    subject: payload.subject,
    html: payload.html
  });

  return NextResponse.json(result);
}
