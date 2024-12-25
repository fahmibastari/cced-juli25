/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import prisma from '@/lib/prisma'
import { saveFile } from '@/lib/file-handler'
import { companySchema, memberSchema } from '@/lib/zod'
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

  // Create user
  const user = await prisma.user.create({
    data: {
      username,
      fullname,
      email,
      password: hashedPassword,
      role: role as Role,
    },
  })

  await prisma.member.create({
    data: {
      userId: user.id,
      memberType,
      nim,
      phone,
    },
  })
  const verificationToken = await generateVerificationToken(email)
  await sendVerificationEmail(verificationToken.email, verificationToken.token)

  return {
    success: true,
    message: 'Account created successfully Please Verifiy your email',
    role,
  }
}

export const registerCompany = async (value: z.infer<typeof companySchema>) => {
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
  } = data
  const logoFile = logo ? await saveFile('company-logos', logo) : undefined

  if (!logoFile) {
    return { error: 'Logo is required' }
  }

  const emailExists = await getUserByEmail(email)
  if (emailExists) {
    return { error: 'Email already exists' }
  }
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create user
  const user = await prisma.user.create({
    data: {
      username,
      fullname,
      email,
      password: hashedPassword,
      role: role as Role,
    },
  })

  await prisma.company.create({
    data: {
      userId: user.id,
      logoId: logoFile.id,
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
  const verificationToken = await generateVerificationToken(email)
  await sendVerificationEmail(verificationToken.email, verificationToken.token)

  return {
    success: true,
    message: 'Account created successfully Please Verifiy your email',
    role,
  }
}
