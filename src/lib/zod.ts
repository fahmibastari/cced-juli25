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
const userSchema = z.object({
  role: z.nativeEnum(Role).nullable(),
  username: z.string().min(3),
  fullName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
})

// Member schema extending userSchema
export const memberSchema = userSchema
  .extend({
    role: z.literal(Role.MEMBER),
    memberType: z.nativeEnum(MemberType),
    nim: z.string().min(10),
    phone: z.string().min(10),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

// Company schema extending userSchema
export const companySchema = userSchema
  .extend({
    role: z.literal(Role.COMPANY),
    logo: z
      .instanceof(File)
      .refine((file) => file.type.startsWith('image/'), {
        message: 'Logo must be an image file',
      })
      .refine((file) => sizeInMB(file.size) <= MAX_FILE_SIZE, {
        message: `Logo must be less than or equal to ${MAX_FILE_SIZE} MB`,
      }),
    companyName: z.string().min(3),
    industry: z.string().min(3),
    ownership: z.string().min(3),
    phoneNumber: z.string().min(10),
    companyPhone: z.string().min(10),
    website: z.string().url(),
    emailPublic: z.string().email(),
    bio: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

// Register schema as a union of member and company schemas
export const registerSchema = z.union([memberSchema, companySchema])
