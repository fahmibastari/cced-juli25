import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import authConfig from './auth.config'
import { db } from './lib/db'
import { getUserById } from './data/user'
import { Role } from '@prisma/client'

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    // callback ini jenis nya ada 4 jwt, session, signin, dan redirect.
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (token.role && session.user) {
        session.user.role = token.role as Role
      }
      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const user = await getUserById(token.sub)
      if (!user) return token

      token.role = user.role

      return token
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
})
