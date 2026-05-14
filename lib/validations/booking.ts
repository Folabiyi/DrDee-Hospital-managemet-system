import { z } from "zod";

export const bookingSchema = z.object({
  specialty: z.string().min(1, "Select a specialty"),
  doctor: z.string().optional(),
  appointmentDate: z.string().min(1, "Choose a date"),
  appointmentTime: z.string().min(1, "Choose a time"),
  firstName: z.string().min(2, "Enter your first name"),
  lastName: z.string().min(2, "Enter your last name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(8, "Enter a valid phone number"),
  reason: z.string().min(10, "Briefly describe the reason for your visit"),
  paymentMethod: z.enum(["paystack", "cash", "insurance"])
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const patientRegistrationSchema = z.object({
  fullName: z.string().min(2, "Enter the patient's full name"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  phone: z.string().min(8, "Enter a valid phone number"),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  address: z.string().optional(),
  emergencyName: z.string().optional(),
  emergencyPhone: z.string().optional(),
  allergies: z.string().optional(),
  medicalHistory: z.string().optional()
});

export type PatientRegistrationInput = z.infer<typeof patientRegistrationSchema>;
