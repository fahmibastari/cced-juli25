'use server'

import db from '@/lib/db'
import { saveFile } from '@/lib/file-handler'
import { registerSchema } from '@/lib/zod'
import { Role } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { ZodError } from 'zod'

export default async function register(formData: FormData) {
  try {
    const validatedFields = registerSchema.parse(Object.fromEntries(formData))

    const hashedPassword = await bcrypt.hash(validatedFields.password, 10)

    const user = await db.user.create({
      data: {
        username: validatedFields.username,
        fullname: validatedFields.fullName,
        email: validatedFields.email,
        password: hashedPassword,
        role: validatedFields.role,
      },
    })

    if (validatedFields.role === Role.MEMBER) {
      await db.member.create({
        data: {
          userId: user.id,
          memberType: validatedFields.memberType,
          nim: validatedFields.nim,
          phone: validatedFields.phone,
        },
      })
    } else if (validatedFields.role === Role.COMPANY) {
      const logoFile = await saveFile('company-logos', validatedFields.logo)

      await db.company.create({
        data: {
          userId: user.id,
          logoId: logoFile.id,
          companyName: validatedFields.companyName,
          industry: validatedFields.industry,
          ownership: validatedFields.ownership,
          phone: validatedFields.phoneNumber,
          companyPhone: validatedFields.companyPhone,
          website: validatedFields.website,
          publicMail: validatedFields.emailPublic,
          bio: validatedFields.bio,
        },
      })
    }

    return {
      success: true,
      message: 'Pendaftaran berhasil!',
    }
  } catch (error) {
    // Handle validation errors
    if (error instanceof ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
      }
    }

    // Handle other potential errors
    console.error('Terjadi kesalahan:', error)
    return {
      success: false,
      message: 'Terjadi kesalahan pada server.',
    }
  }
}
