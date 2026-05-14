import {
  Bed,
  Bell,
  CalendarClock,
  ClipboardList,
  CreditCard,
  FlaskConical,
  Package,
  Pill,
  Stethoscope,
  Users,
  Video,
  WalletCards
} from "lucide-react";

export const hmsModules = [
  {
    href: "/staff/admin/patients",
    title: "Patient Management",
    description: "Registration, HSP IDs, medical history, allergies, documents, duplicate merge.",
    icon: Users,
    metric: "12,482 records"
  },
  {
    href: "/staff/receptionist",
    title: "Appointments",
    description: "Doctor calendars, walk-ins, queue tokens, reminders, cancellations, no-shows.",
    icon: CalendarClock,
    metric: "64 today"
  },
  {
    href: "/staff/doctor",
    title: "EMR",
    description: "SOAP notes, vitals, ICD-10 diagnosis, visit timeline, attachments.",
    icon: ClipboardList,
    metric: "38 active visits"
  },
  {
    href: "/staff/doctor/prescriptions",
    title: "E-Prescriptions",
    description: "Medication orders, dosage, interaction warnings, PDF prescriptions.",
    icon: Pill,
    metric: "19 pending"
  },
  {
    href: "/staff/lab",
    title: "Laboratory",
    description: "Test catalog, orders, sample collection, result entry, result release.",
    icon: FlaskConical,
    metric: "27 orders"
  },
  {
    href: "/staff/pharmacy",
    title: "Pharmacy",
    description: "Dispensing, batch tracking, expiry alerts, stock in/out, suppliers.",
    icon: WalletCards,
    metric: "8 low stock"
  },
  {
    href: "/staff/admin/billing",
    title: "Billing",
    description: "Invoices, payments, Paystack, cash, transfer, insurance and HMO claims.",
    icon: CreditCard,
    metric: "₦3.2m due"
  },
  {
    href: "/staff/nurse",
    title: "Wards and Beds",
    description: "Admissions, discharge workflow, bed status, nursing notes, rounds.",
    icon: Bed,
    metric: "18 admitted"
  },
  {
    href: "/staff/admin/inventory",
    title: "Inventory",
    description: "Hospital supplies, purchase orders, reorder levels, equipment maintenance.",
    icon: Package,
    metric: "143 items"
  },
  {
    href: "/staff/admin/staff",
    title: "Staff Management",
    description: "Staff profiles, roles, schedules, duty rosters, leave requests.",
    icon: Stethoscope,
    metric: "74 staff"
  },
  {
    href: "/staff/admin/telemedicine",
    title: "Telemedicine",
    description: "Video links, virtual visit status, notes saved into EMR.",
    icon: Video,
    metric: "6 today"
  },
  {
    href: "/staff/admin/notifications",
    title: "Notifications",
    description: "Email, SMS, in-app reminders, lab result alerts, receipts.",
    icon: Bell,
    metric: "214 sent"
  }
];

export const patients = [
  { id: "HSP-2026-00001", name: "Mrs. Kemi Adeyemi", phone: "+234 803 221 0901", lastVisit: "2026-05-12", balance: "₦0" },
  { id: "HSP-2026-00002", name: "Mr. Ibrahim Bello", phone: "+234 805 443 1221", lastVisit: "2026-05-13", balance: "₦45,000" },
  { id: "HSP-2026-00003", name: "Miss Aisha Musa", phone: "+234 807 112 9088", lastVisit: "2026-05-09", balance: "₦12,000" }
];

export const inventoryAlerts = [
  { item: "Amlodipine 5mg", batch: "AML-0526", qty: 22, status: "Low stock" },
  { item: "IV Cannula 18G", batch: "CAN-8821", qty: 31, status: "Reorder" },
  { item: "Ceftriaxone 1g", batch: "CEF-1104", qty: 14, status: "Expiring soon" }
];
