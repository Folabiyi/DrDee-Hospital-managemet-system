insert into hospitals (name, slug, address, phone, emergency_phone)
values ('CareBridge Specialist Hospital', 'carebridge', 'Ogo-Oluwa Area, Osogbo, Osun State, Nigeria', '+234 700 227 3243', '+234 700 911 0000');

insert into specialties (name, slug, description, consultation_fee)
values
('Cardiology', 'cardiology', 'Preventive and specialist heart care.', 55000),
('Pediatrics', 'pediatrics', 'Newborn, child, and adolescent medicine.', 35000),
('Orthopedics', 'orthopedics', 'Bone, joint, and sports injury care.', 50000),
('Neurology', 'neurology', 'Brain, nerve, stroke, seizure, and headache care.', 60000),
('Diagnostics', 'diagnostics', 'Laboratory and imaging services.', 25000),
('General Medicine', 'general-medicine', 'Adult primary and urgent medical care.', 30000);

insert into medications (name, form, strength, interactions, reorder_level)
values
('Amlodipine', 'tablet', '5mg', '{"Simvastatin"}', 50),
('Amoxicillin/Clavulanate', 'tablet', '625mg', '{"Warfarin"}', 40),
('Paracetamol', 'tablet', '500mg', '{}', 100),
('Metformin', 'tablet', '500mg', '{"Contrast media"}', 60);

insert into lab_tests (name, category, price, turnaround_hours)
values
('Full Blood Count', 'Hematology', 12000, 6),
('Lipid Profile', 'Chemistry', 18000, 12),
('HbA1c', 'Chemistry', 15000, 12),
('Malaria Parasite', 'Microbiology', 8000, 4);

insert into testimonials (patient_name, role, quote, approved)
values
('Kemi A.', 'Cardiology patient', 'The team made every step calm and clear. I felt known, not rushed.', true),
('David E.', 'Executive screening client', 'Fast diagnostics, excellent follow-up, and a genuinely premium experience.', true);
