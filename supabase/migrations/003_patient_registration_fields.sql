alter table patients
  add column if not exists full_name text,
  add column if not exists email text,
  add column if not exists phone text;

create index if not exists patients_full_name_idx on patients using gin (to_tsvector('english', coalesce(full_name, '')));
create index if not exists patients_phone_idx on patients (phone);
create index if not exists patients_email_idx on patients (email);
