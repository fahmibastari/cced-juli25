import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import authConfig from './auth.config'
import prisma from './lib/prisma'
import { getUserById } from './data/user'
import { Role } from '@prisma/client'

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!account) return false
      const existingUser = await getUserById(user.id ?? '')
      if (!existingUser?.emailVerified) {
        return false
      }
      return true
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (token.role && session.user) {
        session.user.role = token.role as Role
      }
      // force "as any" for ALL
      const t = token as any
      // @ts-ignore
      session.user.fullname = t.fullname
      // @ts-ignore
      session.user.img = t.img
      // @ts-ignore
      session.user.studylevel = t.studylevel
      // @ts-ignore
      session.user.major = t.major
      // @ts-ignore
      session.user.companyLogo = t.companyLogo

      return session
    }
    
    ,
    async jwt({ token }) {
      if (!token.sub) return token

      // Perbaiki dengan type assertion biar TypeScript aman
      const user = await getUserById(token.sub) as {
        id: string
        fullname?: string | null
        image?: string | null
        member?: { studyLevel?: string | null, major?: string | null }
        role: Role
      }
      if (!user) return token

      token.role = user.role
      token.fullname = user.fullname
      token.img = user.image // string|null sesuai hasil flatten
      token.studylevel = user.member?.studyLevel ?? null
      token.major = user.member?.major ?? null
      token.companyLogo = (user as any).company?.logo?.src ?? null

      

      return token
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
})
