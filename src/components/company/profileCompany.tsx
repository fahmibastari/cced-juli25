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
import { createRequestVerified } from '@/actions/company-action'
import { FormError } from '../auth/form-error'
import { FormSuccess } from '../auth/form-succsess'
import { signOut } from 'next-auth/react'


interface ProfileCompanyProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

const ProfileCompany = ({ data }: ProfileCompanyProps) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [checkIsWaiting, setCheckIsWaiting] = useState<boolean>(
    data.company.RequestVerified.length > 0
  )

  const InfoRow = ({ label, value }: { label: string; value?: React.ReactNode }) => (
    <div className="flex flex-col md:flex-row gap-1 md:gap-3">
      <span className="w-56 font-medium text-gray-900">{label}:</span>
      <span className="text-gray-700">{value || '-'}</span>
    </div>
  );
  

  // Hapus useEffect yang ada

  const handleAjukan = async () => {
    const res = await createRequestVerified(data.company.id);
    setErrorMessage(res?.error ?? '');
    setSuccessMessage(res?.success ?? '');
  
    if (res?.success) {
      setCheckIsWaiting(true);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
  {/* Profil Penyedia */}
  <Card className="shadow-md border rounded-2xl overflow-hidden">
    <CardHeader className=" p-6 border-b ">
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
        <div className="relative w-24 h-24 md:w-36 md:h-36 min-w-[6rem] md:min-w-[9rem] mx-auto md:mx-0">
          <Image
            src={data.company.logo.src}
            alt="Profile"
            className="rounded-full object-cover"
            fill
          />
        </div>
        <div className="text-center md:text-left flex-1">
          <CardTitle className="text-2xl font-bold text-green-800 mb-1">
            {data.company.companyName || 'Nama Perusahaan'}
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            {data.company.bio || 'Tentang perusahaan'}
          </CardDescription>
        </div>
      </div>

      {/* Status Verifikasi */}
      <div className="mt-4 space-y-4">
        {data.company.isVerified ? (
          <StatusVerifikasi type="verified" />
        ) : checkIsWaiting ? (
          <>
            <StatusVerifikasi type="waiting" />
            {errorMessage && <FormError message={errorMessage} />}
            {successMessage && <FormSuccess message={successMessage} />}
          </>
        ) : (
          <>
            <StatusVerifikasi type="" />
            <Button
              onClick={handleAjukan}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-md transition-colors"
            >
              Ajukan Verifikasi
            </Button>
          </>
        )}
      </div>
      {/* Tombol Logout */}
  <div className="flex justify-end pt-3">
    <Button
      onClick={() => signOut({ callbackUrl: '/' })}
      variant="destructive"
      className="text-sm font-semibold"
    >
      Logout
    </Button>
  </div>
    </CardHeader>
  </Card>

  {/* Informasi Pribadi */}
  <Card className="shadow-sm border rounded-xl">
    <CardHeader className="p-6 border-b">
      <CardTitle className="text-2xl font-bold text-green-800">
        Informasi Pribadi
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6 text-sm text-gray-700 space-y-2">
      <InfoRow label="Nama Lengkap" value={data.fullname} />
      <InfoRow label="Email" value={data.email} />
      <InfoRow label="Peran" value={data.role.toLowerCase()} />
    </CardContent>
  </Card>

  {/* Informasi Penyedia Kerja */}
  <Card className="shadow-sm border rounded-xl">
    <CardHeader className="p-6 border-b">
      <CardTitle className="text-2xl font-bold text-green-800">
        Informasi Penyedia Kerja
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6 text-sm text-gray-700 space-y-2">
      <InfoRow label="Nama Penyedia Kerja" value={data.company.companyName} />
      <InfoRow label="Industri" value={data.company.industry} />
      <InfoRow label="Skala Perusahaan" value={data.company.ownership} />
      <InfoRow label="Nomor Telepon" value={data.company.phone} />
      <InfoRow
        label="Nomor Telepon Penyedia Kerja"
        value={data.company.companyPhone}
      />
      <InfoRow
        label="Website Penyedia Kerja"
        value={
          data.company.website ? (
            <a
              href={`https://${data.company.website}`}
              className="text-green-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.company.website}
            </a>
          ) : (
            '-'
          )
        }
      />
      <InfoRow label="Alamat Penyedia Kerja" value={data.company.address} />
      <InfoRow label="Kota" value={data.company.city} />
    </CardContent>
  </Card>

  {/* Footer */}
  <CardFooter className="text-center pt-6 border-t">
    <Link
      href={`/dashboard`}
      className="text-lg font-medium text-green-600 hover:text-green-700 hover:underline"
    >
      Kembali ke Dashboard
    </Link>
  </CardFooter>
</div>
  )
}

export default ProfileCompany
