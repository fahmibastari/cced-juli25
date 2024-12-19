/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

// import { useEffect, useState } from 'react'
import CardNewsBig from './utils/CardNewsBig'
import CardNewsSmall from './utils/CardNewsSmall'

// import { getNews, getFeaturedNews } from '@/data/news'
import { news, featuredNews } from '@/data/dummyNews'

const News = () => {
  // const [news, setNews] = useState<any[]>([])
  // const [featuredNews, setFeaturedNews] = useState<any>({})

  // useEffect(() => {
  //   const fetchNews = async () => {
  //     const newsData = await getNews();
  //     const featuredData = await getFeaturedNews();
  //     setNews(newsData);
  //     setFeaturedNews(featuredData);
  //   };

  //   fetchNews()
  // }, [])
  return (
    <main className='container mx-auto my-8 p-4'>
      {/* Main News Section */}
      <section>
        <h3 className='mb-4 text-xl font-semibold'>Berita Terbaru</h3>
        <CardNewsBig
          href='#'
          srcImage={featuredNews?.thumbnail}
          Title={featuredNews?.title}
          description={featuredNews?.content}
          publishedAt={featuredNews?.publishedAt}
        />
      </section>

      {/* Other News Section */}
      <section>
        <h3 className='mb-4 text-xl font-semibold'>Berita Lainnya</h3>
        <div className='grid gap-4 md:grid-cols-3'>
          {news.map((data, index) => (
            <CardNewsSmall
              href='#'
              key={index}
              srcImage={data.thumbnail}
              title={data.title}
              description={data.content}
              // publishedAt={data.publishedAt}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default News
