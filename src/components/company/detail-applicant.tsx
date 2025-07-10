'use client'

import { JobApplicationSchema } from '@/lib/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { BeatLoader } from 'react-spinners'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { FormSuccess } from '@/components/auth/form-succsess'
import { FormError } from '@/components/auth/form-error'
import { zodResolver } from '@hookform/resolvers/zod'
import { startTransition, useEffect, useState } from 'react'
import { Button } from '../ui/button'
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
import {
  getDetailJobApplicant,
  updateDetailJobApplicant,
} from '@/actions/company-action'
import Image from 'next/image'
import { Badge } from '../ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

const DetailApplicant = () => {
  const [detailData, setDetailData] = useState<any>()
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [isClickSetButton, setIsClickSetButton] = useState<boolean>(false)
  const [displayNotes, setDisplayNotes] = useState<string>('')
  const token = useSearchParams().get('token')

  const form = useForm<z.infer<typeof JobApplicationSchema>>({
    resolver: zodResolver(JobApplicationSchema),
    defaultValues: {
      notes: detailData?.notes || '',
      resumeMember: detailData?.resumeMember || '',
    },
  })

  const handleClickSetButton = (val: boolean) => {
    setIsClickSetButton(!val)
  }

  useEffect(() => {
    const fetchAndSetData = async () => {
      if (token) {
        const response = await getDetailJobApplicant(token)
        if (response?.data) {
          setDetailData(response.data)
        }
      }
    }
    fetchAndSetData()
  }, [token])

  useEffect(() => {
    if (detailData) {
      form.reset({
        notes: detailData.notes || '',
        resumeMember: detailData.resumeMember || '',
      })
    }
    setDisplayNotes(detailData?.notes || '')
  }, [detailData, form])

  const onSubmit = (data: z.infer<typeof JobApplicationSchema>) => {
    setErrorMessage('')
    setSuccessMessage('')
    startTransition(() => {
      setIsPending(true)
      updateDetailJobApplicant(data, token || '').then((res) => {
        setSuccessMessage(res?.success ?? '')
        setErrorMessage(res?.error ?? '')
        setDisplayNotes(res?.data ?? '')
        setIsPending(false)
      })
    })
  }
  const InfoItem = ({ label, value, noBorder }: { label: string; value?: string, noBorder?: boolean }) => (
    <div className={`flex flex-col pb-2 ${noBorder ? "" : "border-b"}`}>
      <span className="text-gray-500 text-xs uppercase tracking-wider">{label}</span>
      <span className="text-gray-800 font-medium">{value || '-'}</span>
    </div>
  );

  const notesData = ['seleksi berkas', 'dalam komunikasi', 'belum sesuai', 'diterima kerja']

  const getAge = (birthDate: string | Date): number => {
    const birth = new Date(birthDate)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--
    }

    return age
  }

  function mapMemberType(type: string | undefined) {
    if (!type) return '-'
    switch (type.toLowerCase()) {
      case 'mahasiswa_unila': return 'Mahasiswa Unila'
      case 'alumni_unila': return 'Alumni Unila'
      case 'mahasiswa_non_unila': return 'Mahasiswa Non-Unila'
      case 'alumni_non_unila': return 'Alumni Non-Unila'
      default: return type
    }
  }
  
  function mapGender(gender: string | undefined) {
    if (!gender) return '-'
    switch (gender.toLowerCase()) {
      case 'male': case 'laki-laki': return 'Laki-laki'
      case 'female': case 'perempuan': return 'Perempuan'
      default: return gender
    }
  }

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <Card className="mb-6 shadow-md border border-gray-200 rounded-2xl overflow-hidden bg-white">
      <CardHeader className="p-6 border-b border-gray-200 shadow-sm">
    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
      <div className="relative w-24 h-24 md:w-36 md:h-36 min-w-[6rem] md:min-w-[9rem] mx-auto md:mx-0">
        <Image
          src={detailData?.member?.user?.image?.src || '/profile.png'}
          alt="Profile"
          className="rounded-full object-cover border-4 border-green-100 shadow-md"
          fill
          sizes="144px"
          priority
        />
      </div>
      <div className="text-center md:text-left flex-1">
        <CardTitle className="text-2xl font-bold text-green-800 mb-1 flex items-center gap-2 justify-center md:justify-start">
          {detailData?.member.user.fullname || 'Nama Lengkap'}
          <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          {detailData?.member.about || (
            <span className="italic text-gray-400">Tentang Saya</span>
          )}
        </CardDescription>
      </div>
    </div>
  </CardHeader>
  <CardFooter className="w-full flex flex-col items-center justify-between mt-5">
    <div className="w-full flex items-center justify-between">
      <Badge className="text-sm ml-4">{displayNotes}</Badge>
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleClickSetButton(isClickSetButton)}
      >
        Set Notes
      </Button>
    </div>
    <div className={`${isClickSetButton ? 'block' : 'hidden'} w-full p-2 mt-4`}>
      {/* Form Catatan */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catatan</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      value={field.value || ''}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Catatan" />
                      </SelectTrigger>
                      <SelectContent>
                        {notesData.map((note) => (
                          <SelectItem key={note} value={note.toLowerCase()}>
                            {note}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {errorMessage && <FormError message={errorMessage} />}
            {successMessage && <FormSuccess message={successMessage} />}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-md transition-colors"
            >
              {isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <BeatLoader />
                  Memproses...
                </div>
              ) : (
                'Perbarui Catatan'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  </CardFooter>
  <Card className="mb-6 shadow-md border border-gray-200 rounded-2xl overflow-hidden bg-white">
  <CardHeader>
    <CardTitle className="text-3xl font-bold text-green-800 mb-3">
      Informasi Pribadi
    </CardTitle>
  </CardHeader>
  <CardContent className="p-6 text-sm text-gray-700">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InfoItem label="Nama Lengkap" value={detailData?.member.user.fullname} />
      <InfoItem label="Email" value={detailData?.member.user.email} />
      <InfoItem label="Peran" value={detailData?.member.user.role?.toLowerCase()} />
      <InfoItem label="Status" value={mapMemberType(detailData?.member.memberType)} />
      <InfoItem label="NIM" value={detailData?.member.nim} />
      <InfoItem label="Jenjang Studi" value={detailData?.member.studyLevel} />
      <InfoItem label="Program Studi / Jurusan" value={detailData?.member.major} />
      <InfoItem label="Nomor Telepon" value={detailData?.member.phone} />
      <InfoItem label="Alamat" value={detailData?.member.address} />
      <InfoItem label="Kota" value={detailData?.member.city} />
      <InfoItem
        label="Tanggal Lahir"
        value={
          detailData?.member?.birthDate
            ? `${new Date(detailData?.member.birthDate).toLocaleDateString('id-ID')} (${getAge(detailData?.member.birthDate)} tahun)`
            : '-'
        }
      />
      <InfoItem label="Jenis Kelamin" value={mapGender(detailData?.member.gender)} />
    </div>
  </CardContent>
</Card>

  
      </Card>
      <Card className='mb-6'>
  <CardHeader>
    <CardTitle className='text-3xl font-bold text-green-800 mb-3'>
      Pengalaman Kerja
    </CardTitle>
  </CardHeader>
  <CardContent>
    {detailData?.member?.experience?.length > 0 ? (
      <ul className='space-y-4'>
        {detailData.member.experience.map((exp: any) => (
          <li key={exp.id} className="border-b pb-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-lg text-green-900">{exp.position || '-'}</p>
                <p className="text-gray-700">{exp.company || '-'}</p>
              </div>
              <div className="text-xs text-gray-500">
                {exp.startDate ? new Date(exp.startDate).toLocaleDateString('id-ID') : '-'}
                {" - "}
                {exp.isCurrentJob ? "Sekarang" : (exp.endDate ? new Date(exp.endDate).toLocaleDateString('id-ID') : "-")}
              </div>
            </div>
            {exp.description && <p className="text-gray-700 mt-1">{exp.description}</p>}
          </li>
        ))}
      </ul>
    ) : (
      <p className='text-gray-500 italic'>Belum ada pengalaman kerja</p>
    )}
  </CardContent>
</Card>
<Card className="mb-6 shadow-md border border-gray-200 rounded-2xl overflow-hidden bg-white">
  <CardHeader className="p-6 pb-2">
    <CardTitle className="text-2xl md:text-3xl font-bold text-green-800 mb-2">
      Resume
    </CardTitle>
  </CardHeader>
  <CardContent className="p-6 pt-0">
    {Array.isArray(detailData?.member?.resumeMember) && detailData.member.resumeMember.length > 0 ? (
      <ul className="list-disc pl-6 space-y-2 text-gray-700">
        {detailData.member.resumeMember.map((resume: string, index: number) => (
          <li key={index} className="bg-gray-50 rounded-lg px-4 py-2 shadow-sm">{resume}</li>
        ))}
      </ul>
    ) : (
      <p className="italic text-gray-400">Tidak ada Resume</p>
    )}
  </CardContent>
</Card>
<Card className="mb-6 shadow-md border border-gray-200 rounded-2xl overflow-hidden bg-white">
  <CardHeader className="p-6 pb-2">
    <CardTitle className="text-2xl md:text-3xl font-bold text-green-800 mb-2">
      Keahlian
    </CardTitle>
  </CardHeader>
  <CardContent className="p-6 pt-0">
    {detailData?.member?.skills?.length > 0 ? (
      <div className="flex flex-wrap gap-2">
        {detailData.member.skills.map((skill: string) => (
          <span
            key={skill}
            className="inline-block bg-green-100 text-green-800 font-medium px-4 py-1 rounded-full shadow-sm text-sm hover:bg-green-200 transition"
          >
            {skill}
          </span>
        ))}
      </div>
    ) : (
      <p className="italic text-gray-400">Tidak ada keahlian</p>
    )}
  </CardContent>
</Card>



<Card className="mb-6 shadow-md border border-gray-200 rounded-2xl overflow-hidden bg-white">
  <CardHeader className="p-6 pb-2">
    <CardTitle className="text-2xl md:text-3xl font-bold text-green-800 mb-2">
      Ketertarikan
    </CardTitle>
  </CardHeader>
  <CardContent className="p-6 pt-0">
    {detailData?.member?.interests?.length > 0 ? (
      <div className="flex flex-wrap gap-2">
        {detailData.member.interests.map((interest: string) => (
          <span
            key={interest}
            className="inline-block bg-blue-100 text-blue-800 font-medium px-4 py-1 rounded-full shadow-sm text-sm hover:bg-blue-200 transition"
          >
            {interest}
          </span>
        ))}
      </div>
    ) : (
      <p className="italic text-gray-400">Tidak ada ketertarikan</p>
    )}
  </CardContent>
</Card>

<CardFooter className="text-center pt-6 border-t bg-white">
  <Link
    href={`/company/detail-job?token=${detailData?.jobId || ''}`}
    className="text-lg font-medium text-green-600 hover:text-green-700 hover:underline transition"
  >
    Kembali ke Detail Lowongan
  </Link>
</CardFooter>


      </div>
    )
  }

  export default DetailApplicant
