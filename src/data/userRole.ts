import prisma from '@/lib/prisma'

export const getUserTypeById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } })

    if (!user) {
      return null
    }
    if (user.role === 'MEMBER') {
      const userType = await prisma.member.findUnique({
        where: { userId: user.id },
      })
      return {
        ...user,
        ...userType,
      }
    }

    if (user.role === 'COMPANY') {
      const userType = await prisma.company.findUnique({
        where: { userId: user.id },
      })
      return {
        ...user,
        ...userType,
      }
    }
  } catch {
    return null
  }
}
