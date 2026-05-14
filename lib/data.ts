import {
  Activity,
  Baby,
  Bone,
  Brain,
  HeartPulse,
  Microscope,
  Pill,
  Stethoscope
} from "lucide-react";

export const specialties = [
  {
    slug: "cardiology",
    name: "Cardiology",
    icon: HeartPulse,
    fee: 55000,
    image:
      "https://images.unsplash.com/photo-1628595351029-c2bf17511435?auto=format&fit=crop&w=1200&q=80",
    summary: "Preventive heart checks, hypertension clinics, ECG, echocardiography, and cardiac rehabilitation.",
    treatments: ["ECG and echo", "Hypertension management", "Chest pain assessment", "Cardiac rehabilitation"]
  },
  {
    slug: "pediatrics",
    name: "Pediatrics",
    icon: Baby,
    fee: 35000,
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
    summary: "Warm, family-centered newborn, child, immunization, and adolescent care.",
    treatments: ["Immunization", "Newborn care", "Growth monitoring", "Pediatric emergency review"]
  },
  {
    slug: "orthopedics",
    name: "Orthopedics",
    icon: Bone,
    fee: 50000,
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80",
    summary: "Bone, joint, sports injury, fracture, and post-surgical rehabilitation services.",
    treatments: ["Fracture care", "Joint injections", "Sports medicine", "Physiotherapy planning"]
  },
  {
    slug: "neurology",
    name: "Neurology",
    icon: Brain,
    fee: 60000,
    image:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1200&q=80",
    summary: "Specialist assessment for headaches, seizures, stroke risk, neuropathy, and memory concerns.",
    treatments: ["Stroke review", "Seizure care", "Migraine clinic", "Neuropathy evaluation"]
  },
  {
    slug: "diagnostics",
    name: "Diagnostics",
    icon: Microscope,
    fee: 25000,
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80",
    summary: "Modern laboratory and imaging workflows with rapid, clinician-reviewed results.",
    treatments: ["Chemistry panels", "Hematology", "Ultrasound", "Digital X-ray"]
  },
  {
    slug: "general-medicine",
    name: "General Medicine",
    icon: Stethoscope,
    fee: 30000,
    image:
      "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1200&q=80",
    summary: "Primary and urgent care for adults, chronic disease reviews, and wellness checks.",
    treatments: ["Annual medicals", "Diabetes care", "Infectious disease review", "Travel medicine"]
  },
  {
    slug: "pharmacy",
    name: "Pharmacy",
    icon: Pill,
    fee: 0,
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80",
    summary: "Integrated pharmacy with medication counselling, refill support, and stock safety checks.",
    treatments: ["Medication counselling", "Prescription refills", "Interaction checks", "Chronic medicines"]
  },
  {
    slug: "wellness",
    name: "Executive Wellness",
    icon: Activity,
    fee: 85000,
    image:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80",
    summary: "Discreet, comprehensive health screening packages for individuals and corporate teams.",
    treatments: ["Executive screening", "Lifestyle review", "Risk profiling", "Corporate wellness"]
  }
];

export const doctors = [
  {
    slug: "dayo-folami",
    name: "Dr. Folami Oladayo",
    specialty: "Cardiology",
    qualifications: "MBBS, FWACP, FESC",
    experience: 14,
    languages: ["English", "Igbo"],
    availability: "Mon, Wed, Fri",
    image: "/images/doctors/dr-clinical.jpg",
    bio: "Consultant cardiologist focused on preventive cardiology, hypertension, and cardiac rehabilitation.",
    education: ["Obafemi Awolowo University", "West African College of Physicians"],
    publications: ["Urban hypertension patterns in West Africa", "Patient adherence in cardiac rehab"]
  },
  {
    slug: "dr-dee",
    name: "Dr. Dee Folami",
    specialty: "Orthopedics",
    qualifications: "MBBS, FMCS Ortho",
    experience: 12,
    languages: ["English", "Yoruba"],
    availability: "Tue, Thu, Sat",
    image: "/images/doctors/dr-portrait.jpg",
    bio: "Orthopedic surgeon with expertise in sports injuries, trauma care, and joint preservation.",
    education: ["Obafemi Awolowo University", "National Postgraduate Medical College"],
    publications: ["ACL outcomes in amateur athletes", "Fracture care pathways"]
  },
  {
    slug: "nadia-musa",
    name: "Dr. Nadia Musa",
    specialty: "Pediatrics",
    qualifications: "MBBS, FWACP Paed",
    experience: 10,
    languages: ["English", "Hausa"],
    availability: "Mon - Thu",
    image: "/images/doctors/dr-bimpe-adeleke.svg",
    bio: "Pediatrician providing newborn care, immunization planning, and child development reviews.",
    education: ["Ahmadu Bello University", "West African College of Physicians"],
    publications: ["Childhood vaccination adherence", "Neonatal jaundice follow-up"]
  },
  {
    slug: "emeka-nwosu",
    name: "Dr. Emeka Nwosu",
    specialty: "Neurology",
    qualifications: "MBBS, MSc, FWACP",
    experience: 16,
    languages: ["English", "Igbo", "French"],
    availability: "Wed, Fri",
    image: "/images/doctors/dr-chinedu-okoro.svg",
    bio: "Neurologist specializing in stroke prevention, epilepsy, migraines, and neuropathy.",
    education: ["University of Nigeria", "King's College London"],
    publications: ["Stroke risk in young adults", "Epilepsy care continuity"]
  }
];

export const testimonials = [
  {
    name: "Kemi A.",
    role: "Cardiology patient",
    image:
      "/images/people/patient-kemi.svg",
    quote: "The team made every step calm and clear. I felt known, not rushed."
  },
  {
    name: "David E.",
    role: "Executive screening client",
    image:
      "/images/people/patient-david.svg",
    quote: "Fast diagnostics, excellent follow-up, and a genuinely premium experience."
  },
  {
    name: "Aisha M.",
    role: "Parent",
    image:
      "/images/people/patient-aisha.svg",
    quote: "Our pediatrician was warm, precise, and wonderful with our son."
  }
];

export const posts = [
  {
    slug: "heart-health-osogbo",
    title: "Five heart health numbers every adult should know",
    category: "Cardiology",
    author: "Dr. Amara Okafor",
    image:
      "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Blood pressure, cholesterol, glucose, BMI, and resting pulse can reveal risk before symptoms start.",
    date: "2026-04-18"
  },
  {
    slug: "child-immunization",
    title: "Keeping your child's immunization record complete",
    category: "Pediatrics",
    author: "Dr. Nadia Musa",
    image:
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80",
    excerpt: "A practical guide to appointments, catch-up schedules, and what to expect after vaccines.",
    date: "2026-03-29"
  },
  {
    slug: "executive-screening",
    title: "What happens during an executive health screening?",
    category: "Wellness",
    author: "CareBridge Wellness Team",
    image:
      "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=1200&q=80",
    excerpt: "How screening packages are designed, interpreted, and translated into prevention plans.",
    date: "2026-03-11"
  }
];

export const appointments = [
  { patient: "Sarah Johnson", doctor: "Dr. Amara Okafor", time: "09:00", status: "confirmed" },
  { patient: "Ibrahim Bello", doctor: "Dr. Nadia Musa", time: "10:30", status: "in-progress" },
  { patient: "Ngozi Eze", doctor: "Dr. Tunde Balogun", time: "12:00", status: "scheduled" },
  { patient: "Michael Cole", doctor: "Dr. Emeka Nwosu", time: "14:00", status: "scheduled" }
];

export const revenueSeries = [
  { name: "Mon", revenue: 920000, patients: 42 },
  { name: "Tue", revenue: 1120000, patients: 51 },
  { name: "Wed", revenue: 860000, patients: 37 },
  { name: "Thu", revenue: 1260000, patients: 58 },
  { name: "Fri", revenue: 1480000, patients: 64 },
  { name: "Sat", revenue: 740000, patients: 29 }
];
