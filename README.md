# CareBridge Hospital Management System

Full-stack Next.js 14 hospital management system with a premium public website, patient portal, and role-based staff dashboards.

## Stack

- Next.js App Router, TypeScript, Server Components where appropriate
- Tailwind CSS with shadcn-style local UI primitives
- Supabase PostgreSQL, Auth, RLS, and Storage-ready schema
- React Hook Form + Zod booking validation
- TanStack Query provider for server state
- Recharts analytics
- Resend email route and Paystack webhook route
- Vercel-ready deployment shape

## Included Routes

- Public: `/`, `/about`, `/services`, `/services/[slug]`, `/doctors`, `/doctors/[slug]`, `/book`, `/blog`, `/contact`, `/careers`
- Auth: `/login`, `/register`, `/forgot-password`
- Patient: `/patient`
- Staff: `/staff/admin`, `/staff/doctor`, `/staff/nurse`, `/staff/receptionist`, `/staff/lab`, `/staff/pharmacy`
- API: `/api/payments/paystack`, `/api/notifications/email`

## Supabase

Run the migrations in `supabase/migrations/001_initial_schema.sql` and `supabase/migrations/002_public_read_grants.sql`, then seed with either `supabase/seed.sql` in the SQL editor or:

```bash
npm run seed:supabase
```

The schema includes:

- RBAC profile roles
- Patients, doctors, specialties, appointments
- EMR consultations with SOAP notes and ICD-10 code fields
- Prescriptions and medication inventory
- Lab catalog, orders, and results
- Invoices, payments, admissions, wards, beds
- Blog posts, testimonials, notifications, audit logs
- RLS policies for patient-only access and staff operational access

## Environment

Copy `.env.example` to `.env.local` and fill in the keys for Supabase, Paystack, Resend, and optional SMS/video providers.

## Local Development

```bash
npm install
npm run dev
```

On Windows machines that reject Supabase/Google HTTPS certificates from Node, use:

```bash
npm run dev:ca
```

Open `http://localhost:3000`.

## Deployment

1. Create a Supabase project and run the SQL migration.
2. Configure Supabase Auth email redirects for your Vercel domain.
3. Add all environment variables in Vercel.
4. Configure the Paystack webhook URL as `/api/payments/paystack`.
5. Deploy with Vercel.

## Production Notes

This scaffold is designed as a production-ready foundation, but the final production pass should connect each form mutation to Supabase server actions, enable Storage buckets and policies for records, add complete audit triggers, configure SMS providers, and add E2E tests for booking, billing, and EMR workflows.
