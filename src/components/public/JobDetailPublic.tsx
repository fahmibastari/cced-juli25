'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { Job, Company } from '@prisma/client'

interface JobDetailPublicProps {
    job: Job & {
      company?: Company
      employmentType?: string | null
      workTime?: string | null
    }
  }
  

const JobDetailPublic = ({ job }: JobDetailPublicProps) => {
  return (
    <Card className='mx-auto w-full max-w-3xl rounded-lg bg-white shadow-xl my-10'>
      <CardHeader className='text-center space-y-3 pb-8 border-b'>
        <CardTitle>
          <h2 className='text-4xl font-bold text-green-800'>{job.title}</h2>
          <p className='text-sm text-gray-500 pt-2'>
            Dibuat oleh: {job.company?.companyName ?? 'Perusahaan'}
          </p>
        </CardTitle>
      </CardHeader>

      <CardContent className='pt-8'>
        <div className='space-y-6 border border-gray-200 bg-gray-50 p-6 rounded-lg'>

          <section>
            <h3 className='mb-3 text-lg font-semibold text-gray-800'>Deskripsi</h3>
            <p className='text-gray-600'>{job.description ?? '-'}</p>
          </section>

          <section>
            <h3 className='mb-3 text-lg font-semibold text-gray-800'>Gaji</h3>
            <p className='text-gray-600'>{job.salary ?? '-'}</p>
          </section>
          

          <section>
            <h3 className='mb-3 text-lg font-semibold text-gray-800'>Lokasi</h3>
            <p className='text-gray-600'>{job.location ?? '-'}</p>
          </section>
          <section>
  <h3 className='mb-3 text-lg font-semibold text-gray-800'>Status Pegawai</h3>
  <p className='text-gray-600'>{job.employmentType ?? '-'}</p>
</section>

<section>
  <h3 className='mb-3 text-lg font-semibold text-gray-800'>Waktu Kerja</h3>
  <p className='text-gray-600'>{job.workTime ?? '-'}</p>
</section>


          <section>
            <h3 className='mb-3 text-lg font-semibold text-gray-800'>Persyaratan</h3>
            {job.requirements?.length ? (
              <ul className='list-disc space-y-2 pl-6 text-gray-700'>
                {job.requirements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className='text-gray-600'>Tidak ada persyaratan</p>
            )}
          </section>

          <section>
            <h3 className='mb-3 text-lg font-semibold text-gray-800'>Skills</h3>
            {job.skills?.length ? (
              <ul className='list-disc space-y-2 pl-6 text-gray-700'>
                {job.skills.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className='text-gray-600'>Tidak ada skills</p>
            )}
          </section>

          <section>
            <h3 className='mb-3 text-lg font-semibold text-gray-800'>Deadline</h3>
            <p className='text-gray-600'>
              {job.deadline ? new Date(job.deadline).toLocaleDateString('id-ID') : '-'}
            </p>
          </section>

          <div className='text-center pt-6 space-y-2'>
            <Link href='/login'>
              <Button>Login untuk Melamar</Button>
            </Link>
            <div>
              <Link href='/'>
                <Button variant='ghost' className='text-sm text-gray-600 hover:text-green-700'>
                  ← Kembali ke Beranda
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default JobDetailPublic
