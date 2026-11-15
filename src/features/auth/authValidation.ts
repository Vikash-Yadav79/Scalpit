import { z } from 'zod';

export const loginSchema = z.object({
  countryCode: z.string().min(1, 'Country code is required'),
  mobile: z
    .string()
    .min(10, 'Mobile number must be at least 10 digits')
    .max(10, 'Mobile number cannot exceed 10 digits')
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, 'OTP must be exactly 6 digits')
    .regex(/^\d{6}$/, 'OTP must contain numbers only'),
});

export type OtpFormData = z.infer<typeof otpSchema>;

export const signupSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(60, 'Name cannot exceed 60 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name should only contain letters'),
  countryCode: z.string().default('+91'),
  mobile: z
    .string()
    .min(10, 'Mobile number must be at least 10 digits')
    .max(10, 'Mobile number cannot exceed 10 digits')
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),
  termsAccepted: z
    .boolean()
    .refine(val => val === true, 'You must accept the terms & conditions'),
});

export type SignupFormData = z.infer<typeof signupSchema>;

export const profileSetupSchema = z.object({
  panNumber: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Please enter a valid 10-digit PAN (e.g. ABCDE1234F)')
    .optional()
    .or(z.literal('')),
  dateOfBirth: z.string().optional(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
});

export type ProfileSetupFormData = z.infer<typeof profileSetupSchema>;
