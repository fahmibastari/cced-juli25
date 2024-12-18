import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getNews = async () => {
  try {
    const news = await prisma.news.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        publishedAt: 'desc',
      },
      take: 10, // Batasi hanya 10 berita terbaru
    })
    return news
  } catch (error) {
    console.log(error)
    return []
  }
}

export const getFeaturedNews = async () => {
  try {
    const news = await prisma.news.findFirst({
      where: {
        isPublished: true,
      },
      orderBy: {
        publishedAt: 'desc',
      },
    })
    return news
  } catch (error) {
    console.log(error)
    return null // Mengembalikan null jika tidak ada berita yang ditemukan
  }
}
