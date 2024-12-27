'use client'

import { useEffect, useState } from 'react'
import CardBig from '../utils/CardBig'
import CardSmall from '../utils/CardSmall'
import { type Article } from '@prisma/client'
import PaginationArticleArticle from '../utils/Pagination'

const ArticleContent = () => {
  const [article, setArticle] = useState<Article[]>([]) // Inisialisasi sebagai array kosong
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch('/api/public/get-articles')
        if (!response.ok) {
          throw new Error('Failed to fetch Article')
        }
        const data = await response.json()
        setArticle(data)
        if (data.length > 0) {
          setFeaturedArticle(data[0]) // Set berita utama
        }
      } catch (error) {
        console.error('Error fetching Article:', error)
      }
    }

    fetchArticle()
  }, [])

  return (
    <main className='container mx-auto my-8 p-4 flex-col space-y-14'>
      {/* Main Article Section */}
      <section>
        <h3 className='mb-4 text-2xl font-bold md:text-3xl text-[#025908]'>
          Berita Terbaru
        </h3>
        {featuredArticle ? (
          <CardBig
            href='#'
            srcImage={featuredArticle.thumbnail}
            title={featuredArticle.title}
            description={featuredArticle.content.slice(0, 250)}
            createdAt={featuredArticle.createdAt ?? undefined}
          />
        ) : (
          <p>Loading berita terbaru...</p>
        )}
      </section>

      {/* Other Article Section */}
      <section>
        <h3 className='mb-4 text-xl font-bold md:text-2xl text-[#025908]'>
          Berita Lainnya
        </h3>
        <div className='grid gap-4 md:grid-cols-3'>
          {article.length > 0 ? (
            article
              .slice(1)
              .map((data: Article) => (
                <CardSmall
                  href='#'
                  key={data.id}
                  srcImage={data.thumbnail}
                  title={data.title}
                  description={data.content.slice(0, 100)}
                  createdAt={data.createdAt ?? undefined}
                />
              ))
          ) : (
            <p>Loading berita lainnya...</p>
          )}
        </div>
      </section>
      <PaginationArticleArticle />
    </main>
  )
}

export default ArticleContent
