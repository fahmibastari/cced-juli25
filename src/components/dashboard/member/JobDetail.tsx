/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Share2 } from 'lucide-react'

interface JobDetailProps {
  detailData: any
  onClickQuickApply: () => void
}

const JobDetail = ({ detailData, onClickQuickApply }: JobDetailProps) => {
  return (
    <Card className='mx-auto w-full max-w-3xl h-full rounded-lg bg-white shadow-xl'>
      <CardHeader className='text-center space-y-3 pb-8 border-b'>
        <CardTitle>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col items-start'>
              <h2 className='text-5xl font-bold text-green-800'>
                {detailData?.title}
              </h2>
              <p className='text-sm text-gray-500 pt-3'>
                Dibuat oleh : {detailData?.company?.companyName || 'Perusahaan'}
              </p>
            </div>
            <div className='space-x-2'>
              <Button variant='ghost' size='icon'>
                <Share2 className='h-4 w-4' />
              </Button>
              <Button onClick={onClickQuickApply}>Quick Apply</Button>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className='pt-8'>
        <div className='space-y-6 rounded-lg border border-gray-200 bg-gray-50 p-6'>
          <div className='space-y-6'>
            <section>
              <h3 className='mb-3 text-lg font-semibold text-gray-800'>
                Deskripsi Pekerjaan
              </h3>
              <p className='text-gray-600'>
                {detailData?.description || 'Deskripsi'}
              </p>
            </section>

            <section>
              <h3 className='mb-3 text-lg font-semibold text-gray-800'>
                Gaji Pekerjaan
              </h3>
              <p className='text-gray-600'>
                {detailData?.salary || 'Deskripsi'}
              </p>
            </section>

            <section>
              <h3 className='mb-3 text-lg font-semibold text-gray-800'>
                Lokasi
              </h3>
              <p className='text-gray-600'>
                {detailData?.location || 'Lokasi'}
              </p>
            </section>

            <section>
              <h3 className='mb-3 text-lg font-semibold text-gray-800'>
                Persyaratan
              </h3>
              <ul className='list-disc space-y-2 pl-6 text-gray-700'>
                {detailData?.requirements ? (
                  detailData?.requirements.map(
                    (item: string, index: number) => <li key={index}>{item}</li>
                  )
                ) : (
                  <p>Tidak ada persyaratan</p>
                )}
              </ul>
            </section>

            <section>
              <h3 className='mb-3 text-lg font-semibold text-gray-800'>
                Skills
              </h3>
              <ul className='list-disc space-y-2 pl-6 text-gray-700'>
                {detailData?.skills ? (
                  detailData?.skills.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))
                ) : (
                  <p>Tidak ada skills</p>
                )}
              </ul>
            </section>

            <section>
              <h3 className='mb-3 text-lg font-semibold text-gray-800'>
                Deadline
              </h3>
              <p className='text-gray-600'>
                {detailData?.deadline?.toLocaleDateString('id-ID') ||
                  'Deadline'}
              </p>
            </section>

            <section>
              <h3 className='mb-3 text-lg font-semibold text-gray-800'>
                Status
              </h3>
              <p className='text-gray-600'>
                {detailData?.status || 'Tidak ada status'}
              </p>
            </section>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default JobDetail
