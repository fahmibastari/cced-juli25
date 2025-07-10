//src\auth.config.ts

import Credentials from 'next-auth/providers/credentials'
import bcryptjs from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'

import { signInSchema } from './lib/zod'
import { getUserByEmail } from './data/user'
import prisma from '@/lib/prisma' // Pastikan import prisma

export default {
  providers: [
Credentials({
  async authorize(credentials) {
    const validateField = signInSchema.safeParse(credentials)
    if (!validateField.success) return null

    const { email, password } = validateField.data
    const user = await getUserByEmail(email)
    if (!user || !user.password) return null

    const passwordMatch = await bcryptjs.compare(password, user.password)
    if (!passwordMatch) return null

    // Update lastLogin sebelum return user
    await prisma.user.update({
      where: { email: user.email },
      data: { lastLogin: new Date() }
    })
    return user
  },
}),

  ],
} satisfies NextAuthConfig
