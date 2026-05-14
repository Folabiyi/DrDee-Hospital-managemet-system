create extension if not exists "uuid-ossp";

create type app_role as enum (
  'super_admin', 'admin', 'doctor', 'nurse', 'receptionist',
  'lab_technician', 'pharmacist', 'accountant', 'patient'
);

create type appointment_status as enum (
  'scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show'
);

create table hospitals (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  address text,
  phone text,
  emergency_phone text,
  created_at timestamptz default now()
);

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  hospital_id uuid references hospitals(id),
  full_name text not null,
  email text not null,
  role app_role not null default 'patient',
  avatar_url text,
  phone text,
  created_at timestamptz default now()
);

create table specialties (
  id uuid primary key default uuid_generate_v4(),
  hospital_id uuid references hospitals(id),
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  consultation_fee numeric(12,2) default 0
);

create table doctors (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references profiles(id),
  specialty_id uuid references specialties(id),
  qualifications text,
  years_experience int default 0,
  languages text[] default '{}',
  bio text,
  schedule jsonb default '{}'::jsonb,
  active boolean default true
);

create table patients (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references profiles(id),
  hospital_id uuid references hospitals(id),
  patient_number text unique not null,
  full_name text,
  email text,
  phone text,
  date_of_birth date,
  gender text,
  address text,
  emergency_contact jsonb,
  insurance_info jsonb,
  allergies text[] default '{}',
  current_medications text[] default '{}',
  medical_history text,
  created_at timestamptz default now()
);

create sequence patient_number_seq start 1;

create or replace function generate_patient_number()
returns trigger language plpgsql as $$
begin
  if new.patient_number is null or new.patient_number = '' then
    new.patient_number := 'HSP-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('patient_number_seq')::text, 5, '0');
  end if;
  return new;
end;
$$;

create trigger set_patient_number
before insert on patients
for each row execute function generate_patient_number();

create table appointments (
  id uuid primary key default uuid_generate_v4(),
  hospital_id uuid references hospitals(id),
  patient_id uuid references patients(id),
  doctor_id uuid references doctors(id),
  specialty_id uuid references specialties(id),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status appointment_status default 'scheduled',
  reason text,
  appointment_type text default 'scheduled',
  payment_reference text,
  created_at timestamptz default now()
);

create table consultations (
  id uuid primary key default uuid_generate_v4(),
  appointment_id uuid references appointments(id),
  patient_id uuid references patients(id),
  doctor_id uuid references doctors(id),
  subjective text,
  objective text,
  assessment text,
  plan text,
  diagnosis_codes text[] default '{}',
  vitals jsonb,
  created_at timestamptz default now()
);

create table medications (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  form text,
  strength text,
  interactions text[] default '{}',
  reorder_level int default 10
);

create table prescriptions (
  id uuid primary key default uuid_generate_v4(),
  consultation_id uuid references consultations(id),
  patient_id uuid references patients(id),
  doctor_id uuid references doctors(id),
  status text default 'sent_to_pharmacy',
  created_at timestamptz default now()
);

create table prescription_items (
  id uuid primary key default uuid_generate_v4(),
  prescription_id uuid references prescriptions(id) on delete cascade,
  medication_id uuid references medications(id),
  dosage text not null,
  frequency text not null,
  duration text not null,
  instructions text
);

create table lab_tests (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  category text,
  price numeric(12,2) default 0,
  turnaround_hours int default 24
);

create table lab_orders (
  id uuid primary key default uuid_generate_v4(),
  consultation_id uuid references consultations(id),
  patient_id uuid references patients(id),
  doctor_id uuid references doctors(id),
  status text default 'ordered',
  created_at timestamptz default now()
);

create table lab_results (
  id uuid primary key default uuid_generate_v4(),
  lab_order_id uuid references lab_orders(id) on delete cascade,
  lab_test_id uuid references lab_tests(id),
  result_data jsonb,
  file_url text,
  verified_by uuid references profiles(id),
  released_at timestamptz
);

create table invoices (
  id uuid primary key default uuid_generate_v4(),
  patient_id uuid references patients(id),
  invoice_number text unique not null,
  status text default 'draft',
  total numeric(12,2) default 0,
  due_at timestamptz,
  created_at timestamptz default now()
);

create table payments (
  id uuid primary key default uuid_generate_v4(),
  invoice_id uuid references invoices(id),
  amount numeric(12,2) not null,
  method text not null,
  provider_reference text,
  paid_at timestamptz default now()
);

create table wards (
  id uuid primary key default uuid_generate_v4(),
  hospital_id uuid references hospitals(id),
  name text not null,
  type text
);

create table beds (
  id uuid primary key default uuid_generate_v4(),
  ward_id uuid references wards(id),
  bed_number text not null,
  status text default 'vacant'
);

create table admissions (
  id uuid primary key default uuid_generate_v4(),
  patient_id uuid references patients(id),
  bed_id uuid references beds(id),
  admitted_at timestamptz default now(),
  discharged_at timestamptz,
  notes text
);

create table suppliers (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  phone text,
  email text
);

create table inventory_items (
  id uuid primary key default uuid_generate_v4(),
  supplier_id uuid references suppliers(id),
  name text not null,
  category text,
  batch_number text,
  quantity int default 0,
  expiry_date date,
  reorder_level int default 10
);

create table notifications (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references profiles(id),
  title text not null,
  body text,
  read_at timestamptz,
  created_at timestamptz default now()
);

create table blog_posts (
  id uuid primary key default uuid_generate_v4(),
  author_id uuid references profiles(id),
  title text not null,
  slug text unique not null,
  category text,
  excerpt text,
  content text,
  featured_image_url text,
  published_at timestamptz
);

create table testimonials (
  id uuid primary key default uuid_generate_v4(),
  patient_name text not null,
  role text,
  quote text not null,
  image_url text,
  approved boolean default false
);

create table audit_logs (
  id uuid primary key default uuid_generate_v4(),
  actor_id uuid references profiles(id),
  action text not null,
  entity_table text not null,
  entity_id uuid,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

alter table profiles enable row level security;
alter table patients enable row level security;
alter table appointments enable row level security;
alter table consultations enable row level security;
alter table prescriptions enable row level security;
alter table lab_orders enable row level security;
alter table lab_results enable row level security;
alter table invoices enable row level security;
alter table payments enable row level security;
alter table notifications enable row level security;

create or replace function public.current_app_role()
returns app_role
language sql
stable
security definer
set search_path = public
as $$
  select role from profiles where id = auth.uid()
$$;

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    current_app_role() in (
      'super_admin',
      'admin',
      'doctor',
      'nurse',
      'receptionist',
      'lab_technician',
      'pharmacist',
      'accountant'
    ),
    false
  )
$$;

create policy "profiles own or staff" on profiles
for select using (id = auth.uid() or is_staff());

create policy "patients own or staff" on patients
for select using (profile_id = auth.uid() or is_staff());

create policy "appointments own patient doctor or staff" on appointments
for select using (
  exists (select 1 from patients p where p.id = patient_id and p.profile_id = auth.uid())
  or exists (select 1 from doctors d where d.id = doctor_id and d.profile_id = auth.uid())
  or is_staff()
);

create policy "clinical records own or staff" on consultations
for select using (
  exists (select 1 from patients p where p.id = patient_id and p.profile_id = auth.uid())
  or exists (select 1 from doctors d where d.id = doctor_id and d.profile_id = auth.uid())
  or is_staff()
);

create policy "prescriptions own or staff" on prescriptions
for select using (
  exists (select 1 from patients p where p.id = patient_id and p.profile_id = auth.uid())
  or is_staff()
);

create policy "lab own or staff" on lab_orders
for select using (
  exists (select 1 from patients p where p.id = patient_id and p.profile_id = auth.uid())
  or is_staff()
);

create policy "invoices own or staff" on invoices
for select using (
  exists (select 1 from patients p where p.id = patient_id and p.profile_id = auth.uid())
  or is_staff()
);

create policy "notifications own" on notifications
for select using (profile_id = auth.uid());

create policy "staff can write operational records" on appointments
for all using (is_staff()) with check (is_staff());
