'use client'

import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getJob } from '@/actions/company-action'
import { JobApplication } from '@prisma/client'
import ListDetailAplicants from './list-detail-aplicants'

const handleDownloadExcel = async () => {
  const response = await fetch('/api/export-excel', {
    method: 'GET',
  });
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'daftar_pelamar.xlsx'; // Nama file Excel yang akan diunduh
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const DetailJob = () => {
  const token = useSearchParams().get('token')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [detailData, setDetailData] = useState<any>()

  useEffect(() => {
    const fetchAndSetData = async () => {
      if (token) {
        const response = await getJob(token)
        if (response?.data) {
          const job = response.data
          setDetailData(job)
        }
      }
    }
    fetchAndSetData()
  }, [token])
  return (
    <Card className='mx-auto my-12 w-full max-w-3xl rounded-lg bg-white shadow-xl'>
      <CardHeader className='text-center space-y-3 pb-8 border-b'>
        <CardTitle className='text-4xl font-bold text-green-800'>
          {detailData?.title || 'Title'}
        </CardTitle>
        <CardDescription className='text-sm text-gray-500'>
          Dibuat oleh : {detailData?.company?.companyName || 'Perusahaan'}
        </CardDescription>
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
  <h3 className='mb-3 text-lg font-semibold text-gray-800'>Status Pegawai</h3>
  <p className='text-gray-600'>{detailData?.employmentType ?? '-'}</p>
</section>

<section>
  <h3 className='mb-3 text-lg font-semibold text-gray-800'>Waktu Kerja</h3>
  <p className='text-gray-600'>{detailData?.workTime ?? '-'}</p>
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
            <button onClick={handleDownloadExcel}>Download Excel</button>  {/* Tombol untuk mengunduh Excel */}
            <section>
              <h3 className='mb-3 text-lg font-semibold text-gray-800'>
                Pelamar
              </h3>
              {detailData?.jobApplication?.length > 0 ? (
                detailData.jobApplication.map(
                  (data: JobApplication, index: number) => (
                    // todo
                    <ListDetailAplicants
                      key={data.id}
                      data={data}
                      index={index}
                    />
                  )
                )
              ) : (
                <p>Tidak ada pelamar</p>
              )}
            </section>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className='text-center pt-6 border-t'>
        <Link
          href='/dashboard'
          className='text-lg font-medium text-green-600 hover:text-green-700 hover:underline'
        >
          Kembali ke dashboard
        </Link>
      </CardFooter>
    </Card>
  )
}

export default DetailJob
