import prisma from '@/lib/prisma' // Asumsi `db` sudah diinisialisasi di file ini

// Fungsi untuk mendapatkan berita unggulan
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

    // Periksa jika `news` null, log pesan informatif
    if (!news) {
      console.log('No featured news found.')
      return null
    }

    return news
  } catch (error) {
    console.error('Error fetching featured news:', error)
    return null // Kembalikan null jika terjadi error
  }
}

// Fungsi untuk mendapatkan daftar berita terbaru
export const getNews = async () => {
  try {
    const news = await prisma.news.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        publishedAt: 'desc',
      },
      take: 10, // Ambil maksimal 10 berita
    })

    // Periksa jika hasilnya kosong, log pesan informatif
    if (!news.length) {
      console.log('No news found.')
    }

    return news
  } catch (error) {
    console.error('Error fetching news:', error)
    return [] // Kembalikan array kosong jika terjadi error
  }
}
