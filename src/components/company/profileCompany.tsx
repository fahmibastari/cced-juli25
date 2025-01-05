/* eslint-disable @typescript-eslint/no-explicit-any */

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
import Image from 'next/image'
import StatusVerifikasi from './status-verifikasi'
import { Button } from '../ui/button'
import { useState } from 'react'

interface ProfileCompanyProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

const ProfileCompany = ({ data }: ProfileCompanyProps) => {
  const [isClickAjukan, setIsClickAjukan] = useState<string>('')

  const handleAjukan = () => {
    setIsClickAjukan('waiting')
  }

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <Card className='mb-6'>
        <CardHeader>
          <div className='flex items-center gap-6 mb-4'>
            <div className='relative w-36 h-36'>
              <Image
                src={data.company.logo.src}
                alt='Profile'
                className='rounded-full object-cover'
                fill
              />
            </div>
            <div>
              <CardTitle className='text-xl font-bold text-green-800 mb-3'>
                {data.company.companyName || 'Fullname'}
              </CardTitle>
              <CardDescription className='text-sm text-gray-500'>
                {data.company.bio || 'about me'}
              </CardDescription>
            </div>
          </div>
          {/* Verification Status */}
          {data.company.isVerified ? (
            <StatusVerifikasi type={'verified'} />
          ) : (
            <>
              <StatusVerifikasi type={isClickAjukan} />
              <Button
                onClick={handleAjukan}
                className='w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-md transition-colors mt-2'
              >
                Ajukan Verifikasi
              </Button>
            </>
          )}
        </CardHeader>
      </Card>

      <Card className='mb-6'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold text-green-800 mb-3'>
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className='mb-3 text-sm font-semibold text-gray-800'>
          <div className='flex items-center gap-3 mb-2'>
            <span className='text-gray-900'>Fullname:</span>
            <span className='text-gray-600'>{data.fullname || '-'}</span>
          </div>
          <div className='flex items-center gap-3 mb-2'>
            <span className='text-gray-900'>Email:</span>
            <span className='text-gray-600'>{data.email || '-'}</span>
          </div>
          <div className='flex items-center gap-3 mb-2'>
            <span className='text-gray-900'>Role:</span>
            <span className='text-gray-600'>
              {data.role.toLowerCase() || '-'}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className='mb-6'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold text-green-800 mb-3'>
            Company Information
          </CardTitle>
        </CardHeader>
        <CardContent className='mb-3 text-sm font-semibold text-gray-800'>
          <div className='flex items-center gap-3 mb-2'>
            <span className='text-gray-900'>Nama Perusahaan:</span>
            <span className='text-gray-600'>
              {data.company.companyName || '-'}
            </span>
          </div>
          <div className='flex items-center gap-3 mb-2'>
            <span className='text-gray-900'>Industry:</span>
            <span className='text-gray-600'>
              {data.company.industry || '-'}
            </span>
          </div>
          <div className='flex items-center gap-3 mb-2'>
            <span className='text-gray-900'>Status Kepemilikan:</span>
            <span className='text-gray-600'>
              {data.company.ownership || '-'}
            </span>
          </div>
          <div className='flex items-center gap-3 mb-2'>
            <span className='text-gray-900'>Nomor Telepon:</span>
            <span className='text-gray-600'>{data.company.phone || '-'}</span>
          </div>
          <div className='flex items-center gap-3 mb-2'>
            <span className='text-gray-900'>Nomor Telepon Perusahaan:</span>
            <span className='text-gray-600'>
              {data.company.companyPhone || '-'}
            </span>
          </div>
          <div className='flex items-center gap-3 mb-2'>
            <span className='text-gray-900'>Website Perusahaan:</span>
            <span className='text-gray-600'>
              <a href={`https://${data.company.website}`}>
                {data.company.website || '-'}
              </a>
            </span>
          </div>
          <div className='flex items-center gap-3 mb-2'>
            <span className='text-gray-900'>Alamat Perusahaan:</span>
            <span className='text-gray-600'>{data.company.address || '-'}</span>
          </div>
          <div className='flex items-center gap-3 mb-2'>
            <span className='text-gray-900'>Kota:</span>
            <span className='text-gray-600'>{data.company.city || '-'}</span>
          </div>
        </CardContent>
      </Card>

      <Card className='mb-6'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold text-green-800 mb-3'>
            Dokumen Verifikasi
          </CardTitle>
        </CardHeader>
        <CardContent className='mb-3 text-sm font-semibold text-gray-800'>
          Tidak Ada Dokumen
        </CardContent>
      </Card>

      <CardFooter className='text-center pt-6 border-t'>
        <Link
          href={`/dashboard`}
          className='text-lg font-medium text-green-600 hover:text-green-700 hover:underline'
        >
          Kembali ke Dashboard
        </Link>
      </CardFooter>
    </div>
  )
}

export default ProfileCompany
