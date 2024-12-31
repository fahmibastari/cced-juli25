import prisma from '@/lib/prisma'

export const getNews = async () => {
  const news = await prisma.news.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 10,
  })
  return news
}

export const getArticles = async () => {
  const news = await prisma.article.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 10,
  })
  return news
}
