/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import prisma from '@/lib/prisma'
import { saveFile } from '@/lib/file-handler'
import { registerSchema } from '@/lib/zod'
import { Role } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { ZodError } from 'zod'

interface Response {
  success: boolean
  message?: string
  role?: Role
  errors?: Record<string, string[]>
}

type MemberType =
  | 'ALUMNI_UNILA'
  | 'MAHASISWA_UNILA'
  | 'ALUMNI_NON_UNILA'
  | 'MAHASISWA_NON_UNILA'

export default async function register(formData: FormData): Promise<Response> {
  try {
    const validatedFields = registerSchema.parse(Object.fromEntries(formData))

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedFields.password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        username: validatedFields.username,
        fullname: validatedFields.fullName,
        email: validatedFields.email,
        password: hashedPassword,
        role: validatedFields.role,
      },
    })

    // Handle role-specific registration
    if (validatedFields.role === Role.MEMBER) {
      await handleMemberRegistration(user.id, validatedFields)
    } else if (validatedFields.role === Role.COMPANY) {
      await handleCompanyRegistration(user.id, validatedFields)
    }

    return {
      success: true,
      message: 'Pendaftaran berhasil!',
      role: validatedFields.role,
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const normalizedErrors: Record<string, string[]> = Object.fromEntries(
        Object.entries(error.flatten().fieldErrors).map(([key, value]) => [
          key,
          value || [],
        ])
      )

      return {
        success: false,
        errors: normalizedErrors,
      }
    }

    console.error('Unexpected error during registration:', error)
    return {
      success: false,
      message: 'Terjadi kesalahan saat mendaftar. Silakan coba lagi nanti.',
    }
  }
}

interface MemberFields {
  memberType: MemberType
  nim: string
  phone: string
}

async function handleMemberRegistration(
  userId: string,
  fields: MemberFields
): Promise<void> {
  await prisma.member.create({
    data: {
      userId,
      memberType: fields.memberType,
      nim: fields.nim,
      phone: fields.phone,
    },
  })
}

interface CompanyFields {
  logo: File
  companyName: string
  industry: string
  ownership: string
  phoneNumber: string
  companyPhone: string
  website: string
  emailPublic: string
  bio: string
}

async function handleCompanyRegistration(
  userId: string,
  fields: CompanyFields
): Promise<void> {
  const logoFile = await saveFile('company-logos', fields.logo)

  await prisma.company.create({
    data: {
      userId,
      logoId: logoFile.id,
      companyName: fields.companyName,
      industry: fields.industry,
      ownership: fields.ownership,
      phone: fields.phoneNumber,
      companyPhone: fields.companyPhone,
      website: fields.website,
      publicMail: fields.emailPublic,
      bio: fields.bio,
    },
  })
}
