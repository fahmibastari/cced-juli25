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
      role,
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
    message: 'Pendaftaran berhasil!',
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
    logo,
    companyName,
    industry,
    ownership,
    phone,
    companyPhone,
    website,
    publicMail,
    bio,
  } = data
  const logoFile = await saveFile('company-logos', logo)

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
      role,
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
    message: 'Pendaftaran berhasil!',
    role,
  }
}
