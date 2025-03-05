import { sizeInMB } from '@/lib/utils'
import { MemberType, Role } from '@prisma/client'
import { z } from 'zod'

const MAX_FILE_SIZE = 1

export const signInSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required'),
})

export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
})

export const resetPasswordSchema = z.object({
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password is required'),
})
// Base user schema
export const userSchema = z
  .object({
    role: z.nativeEnum(Role).nullable(),
    username: z.string().min(3),
    fullname: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

// Member schema extending userSchema
export const memberSchema = z
  .object({
    role: z.nativeEnum(Role).nullable(),
    username: z.string().min(3),
    fullname: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    memberType: z.nativeEnum(MemberType),
    nim: z.string().min(10),
    phone: z.string().min(10),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

// Company schema extending userSchema
export const companySchema = z
  .object({
    role: z.nativeEnum(Role).nullable(),
    username: z.string().min(3),
    fullname: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    logo: z
      .instanceof(File)
      .refine((file) => file.type.startsWith('image/'), {
        message: 'Logo must be an image file',
      })
      .refine((file) => sizeInMB(file.size) <= MAX_FILE_SIZE, {
        message: `Logo must be less than or equal to ${MAX_FILE_SIZE} MB`,
      })
      .optional(),
    companyName: z.string().min(3),
    industry: z.string().min(3),
    ownership: z.string().min(3),
    phone: z.string().min(10),
    companyPhone: z.string().min(10),
    website: z.string(),
    publicMail: z.string(),
    bio: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

// Register schema as a union of member and company schemas
export const registerSchema = z.union([memberSchema, companySchema])

export const JobSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().nullable().optional(),
  requirements: z
    .array(z.string())
    .min(1, 'At least one requirement is needed'),
  location: z.string().nullable().optional(),
  deadline: z.date().nullable().optional(),
  status: z.string().nullable().optional(),
  skills: z.array(z.string()).min(1, 'At least one skill is required'),
  type: z.string().nullable().optional(),
  salary: z.string().nullable().optional(),
})

// Validasi untuk model JobApplication
export const JobApplicationSchema = z.object({
  notes: z.string().nullable().optional(),
  resumeMember: z
    .string()
    .min(1, 'Resume is required')
    .max(5000, 'Resume cannot exceed 5000 characters'),
})

export const updateUserSchema = z.object({
  username: z.string().min(3),
  fullname: z.string().min(3),
})

export const updateCompanySchema = z.object({
  username: z.string().min(3).optional(),
  fullname: z.string().min(3).optional(),
  companyName: z.string().min(3).optional(),
  industry: z.string().min(3).optional(),
  ownership: z.string().min(3).optional(),
  phone: z.string().min(10).optional(),
  companyPhone: z.string().min(10).optional(),
  website: z.string().min(1).optional(),
  publicMail: z.string().min(1).optional(),
  bio: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
  city: z.string().min(1).optional(),
})

export const updateMemberSchema = z.object({
  username: z.string().min(3).optional(),
  fullname: z.string().min(3).optional(),
  memberType: z.string().optional(),
  nim: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  birthDate: z.date().nullable().optional(),
  gender: z.string().optional(),
  about: z.string().optional(),
  resume: z.string().optional(),
  cv: z.string().optional(),
  skills: z.array(z.string()).optional(),
  interests: z.array(z.string()).optional(),
})
