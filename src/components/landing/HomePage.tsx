import Link from 'next/link'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import HomePageClient from './HomePageClient'
import { getArticles, getNews } from '@/data/data'
import prisma from '@/lib/prisma'

export default async function HomePage() {
  const jobs = await prisma.job.findMany({
    where: {
      status: 'aktif',
      deadline: {
        gte: new Date(),
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 9, // ⛔ ganti ini
  })
  

  return (
    <div className='bg-white text-gray-800'>
      <section className='container mx-auto py-12'>
        <h2 className='text-2xl font-bold text-green-800 mb-6'>Lowongan Terbaru</h2>
        <HomePageClient jobs={jobs} />
      </section>
    </div>
  )
}
