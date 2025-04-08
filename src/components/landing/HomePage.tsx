import Link from 'next/link'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import HomePageClient from './HomePageClient'
import { getArticles, getNews } from '@/data/data'

export default async function HomePage() {
  const news = await getNews()
  const articles = await getArticles()

  return (
    <div className='bg-white text-gray-800'>
      {/* ----------------- HEADER ------------------ */}
      <header className='bg-gradient-to-r from-[#025908] to-[#038f0a] py-16 text-white shadow-2xl'>
        <div className='container mx-auto flex h-96 flex-col justify-center text-center'>
          <Label className='text-4xl font-bold leading-tight lg:text-5xl'>
            Selamat Datang di Center for Career & Entrepreurship Development
          </Label>
          <Label className='mt-4 text-lg lg:text-xl'>
            Solusi mudah untuk mencari pekerjaan dan merekrut karyawan terbaik.
          </Label>
          <Link href='#'>
            <Button className='mt-8 rounded-lg bg-white px-8 py-4 text-xl font-semibold text-[#025908] shadow-lg transition-transform duration-300 ease-in-out hover:bg-gray-100 hover:scale-105'>
              Jelajahi Fitur
            </Button>
          </Link>
        </div>
      </header>

      {/* ----------------- CONTENT ------------------ */}
      <HomePageClient news={news} articles={articles} />
    </div>
  )
}
