grant usage on schema public to anon, authenticated;

grant select on
  hospitals,
  specialties,
  doctors,
  blog_posts,
  testimonials
to anon, authenticated;

grant select on
  lab_tests
to authenticated;

grant usage, select on all sequences in schema public to authenticated;
