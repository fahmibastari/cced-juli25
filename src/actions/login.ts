'use server'

import { signIn } from '@/auth'
import { getUserByEmail } from '@/data/user'
import { generateVerificationToken } from '@/lib/tokens'
import { signInSchema } from '@/lib/zod'
import { AuthError } from 'next-auth'
import * as z from 'zod'

export default async function login(
  values: z.infer<typeof signInSchema>
): Promise<{ error?: string; success?: string }> {
  const validatedFields = signInSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser?.email || !existingUser?.password) {
    return { error: 'Invalid credentials!' }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    )
    console.log(verificationToken) // jangan lupa hapus ini
    return { success: 'Confirmation Email Sent!' }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/dashboard',
    })
    return {}
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' }
        default:
          return { error: 'Something went wrong!' }
      }
    }

    throw error
  }
}
