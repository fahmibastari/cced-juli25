import prisma from '@/lib/prisma'

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        fullname: true,
        email: true,
        emailVerified: true,
        password: true, // <-- INI WAJIB buat credentials auth!
        role: true,
        imageId: true, // <-- field string, id file
        image: {       // relasi
          select: { src: true }
        },
        member: {
          select: {
            studyLevel: true,
            major: true,
          }
        }
      }
    })
    // Ubah format return, supaya image = url string | null
    return user
      ? {
          ...user,
          image: user.image?.src ?? null, // flatten ke string/null
        }
      : null
  } catch {
    return null
  }
}


export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        fullname: true,
        email: true,
        emailVerified: true,
        password: true,  
        imageId: true,  
        role: true,
        image: { select: { src: true } },
        member: { select: { studyLevel: true, major: true } },
        company: {
          select: {
            companyName: true,
            industry: true,
            logo: { select: { src: true } },
          }
        }
      }
    })
    return user
      ? {
          ...user,
          image: user.image?.src ?? null,
          companyLogo: user.company?.logo?.src ?? null, // <--- TAMBAH INI
        }
      : null
  } catch {
    return null
  }
}
