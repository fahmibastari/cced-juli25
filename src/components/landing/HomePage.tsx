/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Link from 'next/link'
import { Label } from '../ui/label'
import { Button, buttonVariants } from '../ui/button'
import {
  dummyArticleData,
  dummyFiturData,
  dummyKegiatanData,
  dummyManfaatData,
} from '@/data/FiturData'
import CardSmallLanding from './utils/CardSmallLanding'
import { useEffect, useState } from 'react'
import { type News } from '@prisma/client'
import CardBig from '../blog/utils/CardBig'
import CardSmall from '../blog/utils/CardSmall'

export default function HomePage() {
  const [news, setNews] = useState<News[]>([]) // Inisialisasi sebagai array kosong
  const [featuredNews, setFeaturedNews] = useState<News | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/public/get-news')
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
                <CardSmallLanding
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
                <CardSmallLanding
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
            {featuredNews ? (
              <CardBig
                href='#'
                srcImage={featuredNews.thumbnail}
                title={featuredNews.title}
                description={featuredNews.content.slice(0, 250)}
                createdAt={featuredNews.createdAt ?? undefined}
              />
            ) : (
              <p>Loading berita terbaru...</p>
            )}
            <div className='grid gap-3 md:grid-cols-3'>
              {news.length > 0 ? (
                news
                  .slice(1, 4) // Ambil item dari index 1 hingga sebelum index 4 (total 3 item)
                  .map((data: News) => (
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
            <div className='mt-10 flex justify-center'>
              <Link
                href='/blog/news'
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
                  <CardSmallLanding
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
                <CardSmallLanding
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
