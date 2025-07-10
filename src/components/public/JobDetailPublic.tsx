'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { Job, Company } from '@prisma/client'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Share2, User } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'



interface JobDetailPublicProps {
  job: Job & {
    posterUrl?: string | null
    posterFile?: {
      src: string
    } | null
    company?: {
      companyName: string
      companyLogo?: string | null
      logo?: {
        src: string
      } | null
    }
    employmentType?: string | null
    workTime?: string | null
  }
}





const JobDetailPublic = ({ job }: JobDetailPublicProps) => {
  return (
    <Card className="mx-auto w-full max-w-3xl rounded-lg bg-white shadow-xl my-10 px-6">
      <CardHeader className="border-b pb-6 px-4 sm:px-6 md:px-8">
  <div className="flex items-center justify-between flex-wrap gap-4">
    {/* Judul dan Logo */}
    <div className="flex items-center gap-4 flex-grow min-w-0 max-w-full">
      <Avatar className="h-16 w-16 flex-shrink-0">
        <AvatarImage
          src={job?.company?.logo?.src || '/default-logo.png'}
          alt={`${job?.company?.companyName || 'Logo'} Logo`}
          className="object-contain"
        />
        <AvatarFallback>
          <User className="h-10 w-10" />
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col truncate min-w-0 max-w-[calc(100vw-112px)]">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800 truncate leading-tight">
          {job?.title}
        </h2>
        <p className="text-sm text-gray-500 truncate">
          Dibuat oleh: {job?.company?.companyName || 'Penyedia Kerja'}
        </p>
      </div>
    </div>

    {/* Tombol share */}
    <div className="flex items-center gap-3 flex-shrink-0">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Bagikan ke WhatsApp"
        onClick={() => {
          const origin = typeof window !== 'undefined' ? window.location.origin : ''
          const jobId = job.id || ''
          const jobTitle = job.title || 'Lowongan'
          const companyName = job.company?.companyName || 'Perusahaan'
          const jobUrl = `${origin}/jobs/${jobId}`
          const shareText = `Cek lowongan kerja di *${companyName}*: "${jobTitle}"\n\n${jobUrl}`
          const waLink = `https://wa.me/?text=${encodeURIComponent(shareText)}`
          window.open(waLink, '_blank')
        }}
      >
        <Share2 className="h-5 w-5 text-green-700" />
      </Button>
    </div>
  </div>
</CardHeader>

      {job.posterUrl ? (
  <div className="my-4 rounded-lg overflow-hidden shadow-sm">
    <img
      src={job.posterUrl}
      alt="Poster Lowongan"
      className="w-full max-h-[400px] object-contain"
    />
  </div>
) : job.posterFile?.src ? (
  <div className="my-4 rounded-lg overflow-hidden shadow-sm">
    <img
      src={job.posterFile.src}
      alt="Poster Lowongan"
      className="w-full max-h-[400px] object-contain"
    />
  </div>
) : null}

      <CardContent className="pt-8 space-y-8">
      
<section>
  <h3 className="mb-3 text-lg font-semibold text-gray-800">Deskripsi Pekerjaan</h3>
  <div className="prose prose-sm max-w-none text-gray-700">
    <ReactMarkdown>
    {job.description ?? '-'}
    </ReactMarkdown>
  </div>
</section>


        {/* Gaji */}
        <section>
          <h3 className="mb-3 text-lg font-semibold text-gray-800">Gaji</h3>
          <p className="text-gray-600">{job.salary ?? '-'}</p>
        </section>

        {/* Lokasi */}
        <section>
          <h3 className="mb-3 text-lg font-semibold text-gray-800">Lokasi</h3>
          <p className="text-gray-600">{job.location ?? '-'}</p>
        </section>

        {/* Status Pegawai */}
        <section>
          <h3 className="mb-3 text-lg font-semibold text-gray-800">Status Pegawai</h3>
          <p className="text-gray-600">{job.employmentType ?? '-'}</p>
        </section>

        {/* Waktu Kerja */}
        <section>
          <h3 className="mb-3 text-lg font-semibold text-gray-800">Waktu Kerja</h3>
          <p className="text-gray-600">{job.workTime ?? '-'}</p>
        </section>

        {/* Persyaratan */}
        <section>
          <h3 className="mb-3 text-lg font-semibold text-gray-800">Persyaratan</h3>
          {(job.requirements ?? []).length > 0 ? (
            <ul className="list-disc space-y-2 pl-6 text-gray-700">
              {job.requirements.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Tidak ada persyaratan</p>
          )}
        </section>

        {/* Keahlian */}
        <section>
          <h3 className="mb-3 text-lg font-semibold text-gray-800">Keahlian</h3>
          {job.skills?.length ? (
            <ul className="list-disc space-y-2 pl-6 text-gray-700">
              {job.skills.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Tidak ada keahlian</p>
          )}
        </section>

        {/* Link Lamaran Eksternal */}
        {job?.type && (
          <section>
            <h3 className="mb-3 text-lg font-semibold text-gray-800">Link Lamaran Eksternal</h3>
            <a
              href={job.type.startsWith('http') ? job.type : `http://${job.type}`}
              className="text-green-700 underline hover:text-green-900 break-words"
              target="_blank"
              rel="noopener noreferrer"
            >
              {job.type}
            </a>
          </section>
        )}

        {/* Deadline */}
        <section>
          <h3 className="mb-3 text-lg font-semibold text-gray-800">Tenggat Waktu</h3>
          <p className="text-gray-600">
            {job.deadline ? new Date(job.deadline).toLocaleDateString('id-ID') : '-'}
          </p>
        </section>

        {/* Tombol aksi */}
        <div className="text-center pt-6 space-y-4">
          {/* <Link href="/login" passHref>
            <Button className="w-full max-w-xs mx-auto">Login untuk Melamar</Button>
          </Link> */}
          <Link href="/" passHref>
          <div>
          <Button variant="ghost" className="text-sm text-gray-600 hover:text-green-700">
              ← Kembali ke Beranda
            </Button>
          </div>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default JobDetailPublic
