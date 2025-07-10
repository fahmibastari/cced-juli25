// actions/change-password.ts
'use server'

import prisma from '@/lib/prisma'
import bcryptjs from 'bcryptjs'
import * as z from 'zod'
import { getPasswordResetTokenByToken } from '@/data/reset-password'
import { getUserByEmail } from '@/data/user'
import { resetPasswordSchema } from '@/lib/zod'

// Fungsi untuk reset password menggunakan token
export const changePasswordWithToken = async (
  data: z.infer<typeof resetPasswordSchema>, 
  token: string | null
) => {
  const validateField = resetPasswordSchema.safeParse(data)

  if (!validateField.success) {
    return { error: 'Email Tidak Valid!' }
  }

  const { password } = validateField.data

  if (!token) {
    return { error: 'Token Tidak Valid!' }
  }

  const existingToken = await getPasswordResetTokenByToken(token)

  if (!existingToken) {
    return { error: 'Terjadi Kesalahan!' }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()
  if (hasExpired) {
    return { error: 'Token Telah Kedaluwarsa!' }
  }

  const user = await getUserByEmail(existingToken.email)

  if (!user) {
    return { error: 'Terjadi Kesalahan!' }
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { password: await bcryptjs.hash(password, 10) },
  })

  await prisma.passwordResetToken.delete({
    where: { id: existingToken.id },
  })

  return { success: 'Kata Sandi Berhasil Diubah!' }
}

// Fungsi baru untuk ubah kata sandi pengguna yang sudah login
export const changePasswordForUser = async (
  oldPassword: string, 
  newPassword: string,
  userId: string
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    return { error: 'Pengguna tidak ditemukan' }
  }

  const isOldPasswordCorrect = await bcryptjs.compare(oldPassword, user.password)

  if (!isOldPasswordCorrect) {
    return { error: 'Kata sandi lama salah' }
  }

  const hashedPassword = await bcryptjs.hash(newPassword, 10)

  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  })

  return { success: 'Kata sandi berhasil diubah' }
}

export const changePasswordForAdmin = async (
  userId: string,
  newPassword: string
) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return { error: 'Pengguna tidak ditemukan' }
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10)

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    })

    return { success: 'Kata sandi berhasil diubah' }
  } catch (error) {
    console.error('Error changing password for admin:', error)
    return { error: 'Terjadi kesalahan saat mengganti kata sandi pengguna.' }
  }
}