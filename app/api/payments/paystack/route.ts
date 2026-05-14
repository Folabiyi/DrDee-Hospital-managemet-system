import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  const signature = request.headers.get("x-paystack-signature");
  const body = await request.text();

  if (!secret || !signature) {
    return NextResponse.json({ error: "Payment webhook is not configured." }, { status: 400 });
  }

  const hash = crypto.createHmac("sha512", secret).update(body).digest("hex");
  if (hash !== signature) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  const event = JSON.parse(body) as { event: string; data: { reference?: string; status?: string } };

  if (event.event === "charge.success") {
    // Production flow: mark payment paid, update invoice, confirm appointment, send receipt.
  }

  return NextResponse.json({ received: true });
}
