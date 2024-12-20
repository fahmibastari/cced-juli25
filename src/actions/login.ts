'use server'

import { signIn } from '@/auth'
import { getUserByEmail } from '@/data/user'
import { signInSchema } from '@/lib/zod'
import { AuthError } from 'next-auth'
import * as z from 'zod'

export default async function login(
  values: z.infer<typeof signInSchema>
): Promise<{ error?: string }> {
  const validatedFields = signInSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return { error: 'Invalid credentials!' }
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
