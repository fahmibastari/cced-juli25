import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import JobDetailPublic from '@/components/public/JobDetailPublic'

interface Props {
  params: {
    id: string
  }
}

export default async function JobDetailPage({ params }: Props) {
  const job = await prisma.job.findUnique({
    where: { id: params.id },
    include: { company: true },
  })

  if (!job || job.status !== 'aktif') return notFound()

  return (
    <main className='min-h-screen bg-white text-gray-800 px-4'>
      <JobDetailPublic job={job} />
    </main>
  )
}
