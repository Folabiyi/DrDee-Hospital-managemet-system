import { BookingWizard } from "@/components/public-site/booking-wizard";
import { Suspense } from "react";

export const metadata = { title: "Book Consultation" };

export default function BookPage() {
  return (
    <Suspense fallback={<div className="section container">Loading booking form...</div>}>
      <BookingWizard />
    </Suspense>
  );
}
