/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import CardNewsBig from './utils/CardNewsBig'
import CardNewsSmall from './utils/CardNewsSmall'

const News = () => {
  const [news, setNews] = useState<any[]>([]) // Inisialisasi sebagai array kosong
  const [featuredNews, setFeaturedNews] = useState<any | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/get-news')
        if (!response.ok) {
          throw new Error('Failed to fetch news')
        }
        const data = await response.json()
        setNews(data)
        if (data.length > 0) {
          setFeaturedNews(data[0]) // Set berita utama
        }
      } catch (error) {
        console.error('Error fetching news:', error)
      }
    }

    fetchNews()
  }, [])

  return (
    <main className='container mx-auto my-8 p-4'>
      {/* Main News Section */}
      <section>
        <h3 className='mb-4 text-xl font-semibold'>Berita Terbaru</h3>
        {featuredNews ? (
          <CardNewsBig
            href='#'
            srcImage={featuredNews.thumbnail}
            Title={featuredNews.title}
            description={featuredNews.content}
            publishedAt={featuredNews.publishedAt}
          />
        ) : (
          <p>Loading berita terbaru...</p>
        )}
      </section>

      {/* Other News Section */}
      <section>
        <h3 className='mb-4 text-xl font-semibold'>Berita Lainnya</h3>
        <div className='grid gap-4 md:grid-cols-3'>
          {news.length > 0 ? (
            news
              .slice(1)
              .map((data: any) => (
                <CardNewsSmall
                  href='#'
                  key={data.id}
                  srcImage={data.thumbnail}
                  title={data.title}
                  description={data.content}
                />
              ))
          ) : (
            <p>Loading berita lainnya...</p>
          )}
        </div>
      </section>
    </main>
  )
}

export default News
