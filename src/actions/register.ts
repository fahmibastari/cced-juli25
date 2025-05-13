/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import prisma from '@/lib/prisma'
import { saveFile } from '@/lib/file-handler'
import { companySchema, memberSchema, userSchema } from '@/lib/zod'
import bcrypt from 'bcryptjs'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'
import * as z from 'zod'
import { getUserByEmail } from '@/data/user'
import { Role } from '@prisma/client'

export const registerMember = async (value: z.infer<typeof memberSchema>) => {
  const validatedFields = memberSchema.safeParse(value)
  if (!validatedFields.success) {
    return { error: 'Please fill all the fields' }
  }

  const { data } = validatedFields

  const { username, fullname, email, password, role, memberType, nim, phone } =
    data

  const emailExists = await getUserByEmail(email)
  if (emailExists) {
    return { error: 'Email already exists' }
  }
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)
  const emailVerified = role === 'MEMBER' ? new Date(Date.now()) : null;

  // Create user
  const user = await prisma.user.create({
    data: {
      username,
      fullname,
      email,
      password: hashedPassword,
      emailVerified,
      role: role as Role,
    },
  })

  await prisma.member.create({
    data: {
      userId: user.id,
      memberType,
      nim: nim ?? '',
      phone,
    },
  })
  const verificationToken = await generateVerificationToken(email)
  await sendVerificationEmail(verificationToken.email, verificationToken.token)

  return {
    success: true,
    message: 'Akun berhasil dibuat.',
    role,
  }
}

export const registerCompany = async (value: z.infer<typeof companySchema>) => {
  // Validasi input
  const validatedFields = companySchema.safeParse(value)
  if (!validatedFields.success) {
    return { error: 'Please fill all the fields' }
  }

  const { data } = validatedFields
  const {
    username,
    fullname,
    email,
    password,
    role,
    companyName,
    industry,
    ownership,
    phone,
    companyPhone,
    website,
    publicMail,
    bio,
    logo,
    berkas,
  } = data

  // Parallel tasks (cek email, simpan logo dan berkas)
  const [emailExists, logoFile, berkasFile] = await Promise.all([
    getUserByEmail(email),
    logo ? saveFile('company-logos', logo) : undefined,
    berkas ? saveFile('company-berkas', berkas) : undefined,
  ])

  if (emailExists) {
    return { error: 'Email already exists' }
  }

  // Pastikan berkas dan logo ada
  if (!berkasFile) {
    return { error: 'Berkas is required' }
  }

  if (!logoFile) {
    return { error: 'Logo is required' }
  }

  // Hash password dengan rounds lebih rendah (8 lebih cepat)
  const hashedPassword = await bcrypt.hash(password, 8)

  try {
    // Create user in the database
    const user = await prisma.user.create({
      data: {
        username,
        fullname,
        email,
        password: hashedPassword,
        role: role as Role,
      },
    })

    // Create company record
    await prisma.company.create({
      data: {
        userId: user.id,
        logoId: logoFile.id,
        berkasId: berkasFile.id,
        companyName,
        industry,
        ownership,
        phone,
        companyPhone,
        website,
        publicMail,
        bio,
      },
    })

    // Generate email verification token
    const verificationToken = await generateVerificationToken(email)

    // Send verification email
    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    // Return success response
    return {
      success: true,
      message: 'Akun berhasil dibuat, silahkan tunggu admin mengverifikasi akun anda.',
      role,
    }
  } catch (error) {
    console.error('Error during registration:', error)
    return {
      error: 'Something went wrong during the registration process.',
    }
  }
}


export const registerAdmin = async (value: z.infer<typeof userSchema>) => {
  const validatedFields = userSchema.safeParse(value)
  if (!validatedFields.success) {
    return { error: 'Please fill all the fields' }
  }

  const { data } = validatedFields
  const { username, fullname, email, password, role } = data

  const emailExists = await getUserByEmail(email)
  if (emailExists) {
    return { error: 'Email already exists' }
  }
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)
  try {
    const emailVerified = role === 'MEMBER' ? new Date(Date.now()) : null;
    // Create user
    await prisma.user.create({

      data: {
        username,
        fullname,
        email,
        password: hashedPassword,
        emailVerified, 
        role: role as Role,
      },
    })

    return {
      success: 'Account created successfully!',
    }
  } catch {
    return {
      error: 'Something went wrong',
    }
  }
}
