import prisma from '@/lib/prisma'

export const getFeaturedNews = async () => {
  try {
    const news = await prisma.news.findFirst({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' },
    })

    if (!news) {
      console.info('No featured news found')
      return null
    }

    return news
  } catch (error) {
    console.error('Error fetching featured news:', error)
    return null
  }
}

export const getNews = async () => {
  try {
    const news = await prisma.news.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' },
      take: 10,
    })

    if (!news || news.length === 0) {
      console.info('No news found')
      return []
    }

    return news
  } catch (error) {
    console.error('Error fetching news:', error)
    return []
  }
}
