/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Link from 'next/link'
import { Label } from '../ui/label'
import { Button, buttonVariants } from '../ui/button'
import CardNewsArticle from './utils/CardNewsArticle'
import CardBigNewsArticle from './utils/CardFeaturedNewsArticle'
import {
  dummyArticleData,
  dummyFiturData,
  dummyKegiatanData,
  dummyManfaatData,
} from '@/data/FiturData'
import CardSmall from './utils/CardSmall'
import { useEffect, useState } from 'react'
import { getFeaturedNews, getNews } from '@/data/news'

export default function HomePage() {
  const [news, setNews] = useState<any[]>([])
  const [featuredNews, setFeaturedNews] = useState<any>({})

  useEffect(() => {
    const fetchNews = async () => {
      const newsData = await getNews()
      setNews(newsData)

      const featuredData = await getFeaturedNews()
      setFeaturedNews(featuredData)
    }

    fetchNews()
  }, [])

  const handleClickView = (id: string) => {
    // Implementasi navigasi atau aksi ketika card diklik
    console.log('Navigasi atau aksi ketika card diklik:', id)
  }
  return (
    <div className='bg-white text-gray-800'>
      {/* ----------------- HEADER ------------------ */}
      <header className='bg-[#025908] py-20 text-white shadow-2xl'>
        <div className='container mx-auto flex h-96 flex-col justify-center text-center'>
          <Label className='text-4xl font-bold'>
            Selamat Datang di Center for Career & Entrepreurship Development
          </Label>
          <Label className='mt-4 text-lg'>
            Solusi mudah untuk mencari pekerjaan dan merekrut karyawan terbaik.
          </Label>
          <Link href='#'>
            <Button className='mt-6 rounded-md bg-white px-6 py-3 text-xl font-semibold text-[#025908] shadow-md hover:bg-gray-100'>
              Jelajahi Fitur
            </Button>
          </Link>
        </div>
      </header>
      {/* ----------------- CONTENT ------------------ */}
      <div>
        <section id='fitur' className='py-16'>
          <div className='container mx-auto'>
            <h2 className='mb-8 text-center text-3xl font-bold text-[#025908]'>
              Fitur Unggulan
            </h2>
            <div className='grid gap-8 md:grid-cols-3 m-4'>
              {dummyFiturData.map((data, index) => (
                <CardSmall
                  key={index}
                  styleCard='rounded-lg border border-[#025908] bg-white p-4 shadow-md'
                  styleTitle='text-xl font-bold text-[#025908]'
                  styleDescription='mt-2 text-gray-600'
                  title={data.title}
                  description={data.description}
                />
              ))}
            </div>
          </div>
        </section>

        <section id='manfaat' className='bg-gray-100 py-16'>
          <div className='container mx-auto'>
            <h2 className='mb-8 text-center text-3xl font-bold text-[#025908]'>
              Manfaat Sistem
            </h2>
            <div className='space-y-8'>
              {dummyManfaatData.map((data, index) => (
                <CardSmall
                  key={index}
                  styleCard='bg-white rounded-lg shadow-md p-6'
                  styleTitle='text-2xl font-semibold text-[#025908] text-center'
                  styleDescription='mt-2 text-gray-600 text-center'
                  title={data.title}
                  description={data.description}
                />
              ))}
            </div>
          </div>
        </section>

        <section id='berita' className='py-16'>
          <div className='container mx-auto p-10'>
            <h2 className='mb-12 text-center text-3xl font-bold text-[#025908]'>
              Berita Terbaru
            </h2>
            <CardBigNewsArticle
              title={featuredNews?.title}
              thumbnail={featuredNews?.thumbnail}
              publishedAt={featuredNews?.publishedAt}
            />
            <div className='grid gap-3 md:grid-cols-3'>
              {news.map((data) => (
                <CardNewsArticle
                  key={data.id}
                  title={data.title}
                  content={data.content}
                  thumbnail={data.thumbnail}
                  publishedAt={data.publishedAt}
                  handleClick={() => handleClickView(data.id)}
                />
              ))}
            </div>
            <div className='mt-10 flex justify-center'>
              <Link
                href='/berita'
                className={buttonVariants({ variant: 'outline' })}
              >
                Lihat berita lainnya
              </Link>
            </div>
          </div>
        </section>

        <section id='artikel' className='bg-gray-100 py-16'>
          <div className='container mx-auto'>
            <h2 className='mb-8 text-center text-3xl font-bold text-[#025908]'>
              Artikel Pilihan
            </h2>
            <div className='space-y-8'>
              {dummyArticleData.map((data, index) => (
                <article
                  className='rounded-lg bg-white p-6 shadow-md'
                  key={index}
                >
                  <CardSmall
                    key={index}
                    styleCard='bg-white'
                    styleTitle='text-2xl font-semibold'
                    styleDescription='mt-2 text-gray-600'
                    title={data.title}
                    description={data.description}
                  />
                  <Link
                    href={'#'}
                    className='mt-2 inline-block pl-6 font-semibold text-[#025908]'
                  >
                    Baca Selengkapnya →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id='kegiatan' className='py-16'>
          <div className='container mx-auto'>
            <h2 className='mb-8 text-center text-3xl font-bold text-[#025908]'>
              Kegiatan Terbaru
            </h2>
            <div className='grid gap-8 md:grid-cols-3 m-4'>
              {dummyKegiatanData.map((data, index) => (
                <CardSmall
                  key={index}
                  styleCard='bg-white rounded-lg shadow-md p-4'
                  styleTitle='text-xl font-bold text-[#025908]'
                  styleDescription='mt-2 text-gray-600'
                  title={data.title}
                  description={data.description}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
