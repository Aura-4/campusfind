// ─────────────────────────────────────────────────────────────
// Zod validation schemas for all forms
// ─────────────────────────────────────────────────────────────

import { z } from 'zod'
import {
  ITEM_CATEGORIES,
  CAMPUS_LOCATIONS,
  DEPARTMENTS,
  YEAR_GROUPS,
  KEY_CATEGORIES,
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_SIZE_BYTES,
  MAX_IMAGES_PER_ITEM,
} from './constants'

// ─── Auth ─────────────────────────────────────────────────────

export const loginSchema = z.object({
  usn: z
    .string()
    .min(1, 'USN is required')
    .regex(/^[A-Z0-9]+$/i, 'Enter a valid USN'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    usn: z
      .string()
      .min(1, 'USN is required')
      .regex(/^[A-Z0-9]+$/i, 'Enter a valid USN'),
    email: z.string().email('Enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    department: z.enum(DEPARTMENTS as [string, ...string[]]),
    yearGroup: z.enum(YEAR_GROUPS as [string, ...string[]]),
    phone: z
      .string()
      .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number')
      .optional()
      .or(z.literal('')),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

// ─── Items ────────────────────────────────────────────────────

const imageFileSchema = z
  .instanceof(File)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    'Only JPEG, PNG or WebP images are accepted'
  )
  .refine(
    (file) => file.size <= MAX_IMAGE_SIZE_BYTES,
    'Image must be smaller than 5 MB'
  )

export const reportItemSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(80, 'Title must be under 80 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be under 500 characters'),
  category: z.enum(ITEM_CATEGORIES as [string, ...string[]], {
    errorMap: () => ({ message: 'Select a category' }),
  }),
  location: z.enum(CAMPUS_LOCATIONS as [string, ...string[]], {
    errorMap: () => ({ message: 'Select a campus location' }),
  }),
  locationDetail: z
    .string()
    .max(100, 'Detail must be under 100 characters')
    .optional(),
  date: z.string().min(1, 'Date is required'),
  images: z
    .array(imageFileSchema)
    .max(MAX_IMAGES_PER_ITEM, `Maximum ${MAX_IMAGES_PER_ITEM} images allowed`)
    .optional(),
  tags: z.array(z.string()).optional(),
})

// ─── Claims ───────────────────────────────────────────────────

export const submitClaimSchema = z.object({
  description: z
    .string()
    .min(20, 'Please provide at least 20 characters explaining ownership')
    .max(1000, 'Description must be under 1000 characters'),
  proofImages: z
    .array(imageFileSchema)
    .max(3, 'Maximum 3 proof images allowed')
    .optional(),
})

// ─── Keys ─────────────────────────────────────────────────────

export const addKeySchema = z.object({
  keyIdentifier: z
    .string()
    .min(1, 'Key identifier is required')
    .max(50, 'Identifier must be under 50 characters'),
  label: z
    .string()
    .min(2, 'Label must be at least 2 characters')
    .max(100, 'Label must be under 100 characters'),
  category: z.enum(KEY_CATEGORIES as [string, ...string[]], {
    errorMap: () => ({ message: 'Select a key category' }),
  }),
  issuedToUsn: z
    .string()
    .regex(/^[A-Z0-9]+$/i, 'Enter a valid USN')
    .optional()
    .or(z.literal('')),
  notes: z.string().max(200, 'Notes must be under 200 characters').optional(),
})

// ─── Inferred types for form usage ────────────────────────────

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
export type ReportItemFormValues = z.infer<typeof reportItemSchema>
export type SubmitClaimFormValues = z.infer<typeof submitClaimSchema>
export type AddKeyFormValues = z.infer<typeof addKeySchema>
