'use client'

import { useState } from 'react'
import { type Article, type News } from '@prisma/client'
import CardBig from '../blog/utils/CardBig'
import CardSmall from '../blog/utils/CardSmall'
import ArticleModal from '../blog/utils/ArticleModal'
import JobCardPublic from '../dashboard/member/JobCardPublic' // ✅ Ganti JobCard

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

interface Props {
  jobs: any[] // idealnya pakai interface Job
}

const HomePageClient = ({ jobs }: Props) => {
  const [modalData, setModalData] = useState<
    (News | Article) & { type: 'news' | 'article' } | null
  >(null)

  const handleCloseModal = () => setModalData(null)

  const sanitizeImageUrl = (url: string) => (url.startsWith('blob:') ? '' : url)

  return (
    <>
      {/* Bagian Lowongan Pekerjaan */}
<section id='lowongan' className='py-16'>
  <div className='container mx-auto'>
    {jobs.length > 0 ? (
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4'>
        {jobs.map((job) => (
          <JobCardPublic
            key={job.id}
            jobId={job.id}
            companyLogo={job.companyLogo}
            companyName={job.companyName}
            title={job.title}
            location={job.location}
            deadline={new Date(job.deadline)}
            salary={job.salary}
          />
        ))}
      </div>
    ) : (
      <p className='text-center text-gray-500'>Memuat lowongan...</p>
    )}
  </div>
</section>

    </>
  )
}

export default HomePageClient
