'use client'

import { useState } from 'react'
import { type Article, type News } from '@prisma/client'
import CardBig from '../blog/utils/CardBig'
import CardSmall from '../blog/utils/CardSmall'
import ArticleModal from '../blog/utils/ArticleModal'

interface Props {
  news: News[]
  articles: Article[]
}

const HomePageClient = ({ news, articles }: Props) => {
  const [modalData, setModalData] = useState<
    (News | Article) & { type: 'news' | 'article' } | null
  >(null)

  const handleCloseModal = () => setModalData(null)

  const sanitizeImageUrl = (url: string) => (url.startsWith('blob:') ? '' : url)
  const featuredNews = news[0]

  return (
    <>
      <section id='berita' className='py-16'>
        <div className='container mx-auto p-10'>
          <h2 className='mb-12 text-center text-3xl font-bold text-[#025908]'>
            Berita Terbaru
          </h2>
          {featuredNews ? (
            <div onClick={() => setModalData({ ...featuredNews, type: 'news' })}>
              <CardBig
                href='#'
                srcImage={sanitizeImageUrl(featuredNews.thumbnail)}
                title={featuredNews.title}
                description={featuredNews.content.slice(0, 250)}
                createdAt={featuredNews.createdAt ?? undefined}
              />
            </div>
          ) : (
            <p>Loading berita terbaru...</p>
          )}

          <div className='grid gap-3 md:grid-cols-3 mt-6'>
            {news.length > 0 ? (
              news.slice(1, 4).map((data) => (
                <div key={data.id} onClick={() => setModalData({ ...data, type: 'news' })}>
                  <CardSmall
                    href='#'
                    srcImage={sanitizeImageUrl(data.thumbnail)}
                    title={data.title}
                    description={data.content.slice(0, 100)}
                    createdAt={data.createdAt ?? undefined}
                  />
                </div>
              ))
            ) : (
              <p>Loading berita lainnya...</p>
            )}
          </div>
        </div>
      </section>

      <section id='artikel' className='bg-gray-100 py-16'>
        <div className='container mx-auto'>
          <h2 className='mb-8 text-center text-3xl font-bold text-[#025908]'>
            Artikel Pilihan
          </h2>
          <div className='space-y-8'>
            {articles.length > 0 ? (
              articles.slice(0, 4).map((data) => (
                <div key={data.id} onClick={() => setModalData({ ...data, type: 'article' })}>
                  <CardSmall
                    href='#'
                    srcImage={sanitizeImageUrl(data.thumbnail)}
                    title={data.title}
                    description={data.content.slice(0, 100)}
                    createdAt={data.createdAt ?? undefined}
                  />
                </div>
              ))
            ) : (
              <p>Loading artikel lainnya...</p>
            )}
          </div>
        </div>
      </section>

      {modalData && (
        <ArticleModal
          isOpen={!!modalData}
          onClose={handleCloseModal}
          title={modalData.title}
          content={modalData.content}
          thumbnail={sanitizeImageUrl(modalData.thumbnail)}
          createdAt={modalData.createdAt ?? undefined}
        />
      )}
    </>
  )
}

export default HomePageClient
