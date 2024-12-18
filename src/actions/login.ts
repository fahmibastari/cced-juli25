'use server'

import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { LoginSchema } from '@/schemas'
import { AuthError } from 'next-auth'
import * as z from 'zod'

export const login = async (data: z.infer<typeof LoginSchema>) => {
  const validateField = LoginSchema.safeParse(data)
  if (!validateField.success) {
    return { error: 'Invalid Credentials' }
  }

  const { email, password } = validateField.data

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (e) {
    if (e instanceof AuthError) {
      switch (e.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid Credentials' }
        default:
          return { error: 'Something went wrong' }
      }
    }
    throw e
  }
}
