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
import { signOut } from 'next-auth/react'
import { Button } from '../ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { User } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'
import { markNotesAsRead } from '@/actions/member-action' // sesuaikan path jika beda
import { useState } from 'react'
import { useRouter } from 'next/navigation'




interface ProfileMemberProps {
  data: any
}
// Minimal type, biar tidak error
type JobType = {
  status?: string
  deadline?: string | Date
}

function isLowonganAktif(job: JobType) {
  if (!job) return false
  if (job.status !== 'aktif') return false
  if (!job.deadline) return true // fallback, jika tidak ada deadline
  const deadline = typeof job.deadline === 'string' ? new Date(job.deadline) : job.deadline
  return deadline.getTime() >= Date.now()
}

const mapMemberType = (type: string | undefined) => {
  switch (type?.toUpperCase()) {
    case 'ALUMNI_UNILA':
      return 'Alumni UNILA'
    case 'MAHASISWA_UNILA':
      return 'Mahasiswa UNILA'
    case 'ALUMNI_NON_UNILA':
      return 'Alumni Non UNILA'
    case 'MAHASISWA_NON_UNILA':
      return 'Mahasiswa Non UNILA'
    default:
      return type || '-'
  }
}

const InfoItem = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex flex-col border-b pb-2">
    <span className="text-gray-500 text-xs uppercase tracking-wider">{label}</span>
    <span className="text-gray-800 font-medium">{value || '-'}</span>
  </div>
);


const mapGender = (gender: string | undefined) => {
  switch (gender?.toLowerCase()) {
    case 'male':
    case 'laki-laki':
      return 'Laki-laki'
    case 'female':
    case 'perempuan':
      return 'Perempuan'
    default:
      return gender || '-'
  }
}

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


const ProfileMember = ({ data }: ProfileMemberProps) => {
  const [jobApps, setJobApps] = useState(data.member?.jobApplication ?? [])
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const router = useRouter()

  // Handler tombol Baca
  const handleReadNotes = async (jobAppId: string) => {
    setLoadingId(jobAppId)
    const res = await markNotesAsRead(jobAppId)
    console.log('markNotesAsRead response', res)

    if (res?.success && res.notesReadAt) {
      setJobApps((prev: any[]) =>
        prev.map((ja: any) =>
          ja.id === jobAppId ? { ...ja, notesReadAt: res.notesReadAt } : ja
        )
      )
      router.refresh()
    }
    setLoadingId(null)
  }
  
  
  
  return (
    <div className='max-w-4xl mx-auto p-6'>
      <Card className="mb-6 shadow-md border border-gray-200 rounded-2xl overflow-hidden">
  {/* Header dengan Foto dan Deskripsi */}
  <CardHeader className=" p-6 border-b border-black-200 shadow-md">
  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
    <div className="relative w-24 h-24 md:w-36 md:h-36 min-w-[6rem] md:min-w-[9rem] mx-auto md:mx-0">
      <Image
        src={data?.image?.src || '/default-thumbnail.jpg'}
        alt="Profile"
        className="rounded-full object-cover"
        fill
      />
    </div>
    <div className="text-center md:text-left flex-1">
      <CardTitle className="text-2xl font-bold text-green-800 mb-1">
        {data.fullname || 'Nama Lengkap'}
      </CardTitle>
      <CardDescription className="text-sm text-gray-600">
        {data.member?.about || 'Tentang Saya'}
      </CardDescription>
    </div>
  </div>
</CardHeader>



  {/* Informasi Personal */}
  <CardContent className="p-6 text-sm text-gray-700">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InfoItem label="Nama Lengkap" value={data.fullname} />
      <InfoItem label="Email" value={data.email} />
      <InfoItem label="Peran" value={data.role?.toLowerCase()} />
      <InfoItem label="Status" value={mapMemberType(data.member?.memberType)} />
      <InfoItem label="NPM Unila" value={data.member?.nim} />
      <InfoItem label="Jenjang Studi" value={data.member?.studyLevel} />
      <InfoItem label="Program Studi / Jurusan" value={data.member?.major} />
      <InfoItem label="Nomor Telepon" value={data.member?.phone} />
      <InfoItem label="Alamat" value={data.member?.address} />
      <InfoItem label="Kota" value={data.member?.city} />
      <InfoItem
        label="Tanggal Lahir"
        value={
          data.member?.birthDate
            ? `${new Date(data.member.birthDate).toLocaleDateString('id-ID')} (${getAge(data.member.birthDate)} tahun)`
            : '-'
        }
      />
      <InfoItem label="Jenis Kelamin" value={mapGender(data.member?.gender)} />
    </div>
  </CardContent>
</Card>


<Card className="mb-6 shadow-md border border-gray-200 rounded-2xl overflow-hidden">
  <CardHeader className="p-6 border-b border-gray-200 shadow-sm">
    <CardTitle className="text-2xl font-bold text-green-800 mb-1">
      Pekerjaan yang Dilamar
    </CardTitle>
    <p className="text-sm text-green-700">Riwayat aplikasi kerja pengguna</p>
  </CardHeader>
  <CardContent className="p-0">
    {jobApps.length > 0 ? (
      <ul className="flex flex-col gap-4 p-4">
        {jobApps.map((jobApp: any, index: number) => {
          const deadlineTime = jobApp.job.deadline
            ? typeof jobApp.job.deadline === 'string'
              ? new Date(jobApp.job.deadline).getTime()
              : jobApp.job.deadline.getTime()
            : Infinity;
          const isActive = jobApp.job.status === 'aktif' && deadlineTime >= Date.now();
          const isNewFeedback =
            jobApp.notes &&
            (!jobApp.notesReadAt ||
              new Date(jobApp.notesUpdatedAt).getTime() > new Date(jobApp.notesReadAt).getTime());

          let notesColor = "bg-gray-100 text-gray-700";
          if (jobApp.notes === 'seleksi berkas') notesColor = "bg-white-100 text-green-700";
          else if (jobApp.notes === 'dalam komunikasi') notesColor = "bg-yellow-100 text-yellow-700";
          else if (jobApp.notes === 'belum sesuai') notesColor = "bg-red-100 text-red-700";
          else if (jobApp.notes === 'diterima kerja') notesColor = "bg-green-100 text-bold-green-700";

          return (
            <li
              key={jobApp.id}
              className={`flex flex-col sm:flex-row gap-3 sm:items-center border border-gray-100 rounded-xl p-4 bg-gray-50 hover:bg-green-50 transition 
                ${isNewFeedback ? "ring-2 ring-green-300" : ""}`}
            >
              {/* Logo & Detail */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Avatar className="w-12 h-12 flex-shrink-0">
                  <AvatarImage
                    src={jobApp.job.company?.logo?.src || '/default-logo.png'}
                    alt={jobApp.job.company?.companyName || 'Logo'}
                  />
                  <AvatarFallback>
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 truncate">{jobApp.job.title}</p>
                  <p className="text-sm text-gray-600 truncate">{jobApp.job.company?.companyName || 'Nama Perusahaan'}</p>
                  <span className={`text-xs mt-0.5 ${isActive ? 'text-green-700' : 'text-red-600'}`}>
                    {isActive ? 'Aktif' : 'Nonaktif'}
                  </span>
                  {jobApp.notesUpdatedAt && (
                    <span className="text-xs text-gray-400 ml-2">
                      {formatDistanceToNow(new Date(jobApp.notesUpdatedAt), { addSuffix: true, locale: id })}
                    </span>
                  )}
                </div>
              </div>
              {/* Badge & Button */}
              <div className="flex flex-row sm:flex-col items-center gap-2 sm:items-end mt-2 sm:mt-0">
                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${notesColor} break-all`}>
                  {jobApp.notes
                    ? jobApp.notes.replace(/^\w/, (c: string) => c.toUpperCase())
                    : 'Belum ada feedback'}
                  {isNewFeedback && <span className="ml-2 text-blue-500 animate-bounce">🆕</span>}
                </span>
                {isNewFeedback && (
                  <button
                    onClick={() => handleReadNotes(jobApp.id)}
                    className="px-3 py-1 rounded bg-blue-100 text-blue-800 text-xs font-medium hover:bg-blue-200 transition whitespace-nowrap"
                    disabled={loadingId === jobApp.id}
                  >
                    {loadingId === jobApp.id ? '...' : 'Tandai sudah dibaca'}
                  </button>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    ) : (
      <p className="text-sm text-gray-600 italic p-4">Tidak ada pekerjaan yang dilamar.</p>
    )}
  </CardContent>
</Card>


  {/* Pengalaman Kerja Card */}
  <Card className='bg-white shadow-lg rounded-lg border p-6 mb-6'>
    <CardHeader>
      <CardTitle className='text-2xl font-bold text-green-800 mb-1'>
        Pengalaman Kerja
      </CardTitle>
    </CardHeader>
    <CardContent>
      {data.member?.experience?.length > 0 ? (
        <ul className='space-y-4'>
          {data.member.experience.map((exp: any) => (
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


       {/* Resume Card */}
<Card className="mb-6 shadow-md border border-gray-200 rounded-2xl overflow-hidden bg-white">
  <CardHeader className="p-6 pb-2">
    <CardTitle className="text-2xl md:text-3xl font-bold text-green-800 mb-2">
      Resume
    </CardTitle>
  </CardHeader>
  <CardContent className="p-6 pt-0">
    {data?.member?.resume ? (
      <div className="bg-gray-50 rounded-lg px-4 py-2 shadow-sm text-gray-700">
        {data.member.resume}
      </div>
    ) : (
      <p className="italic text-gray-400">Belum melengkapi resume</p>
    )}
  </CardContent>
</Card>

{/* Keahlian Card */}
<Card className="mb-6 shadow-md border border-gray-200 rounded-2xl overflow-hidden bg-white">
  <CardHeader className="p-6 pb-2">
    <CardTitle className="text-2xl md:text-3xl font-bold text-green-800 mb-2">
      Keahlian
    </CardTitle>
  </CardHeader>
  <CardContent className="p-6 pt-0">
    {data.member?.skills?.length > 0 ? (
      <div className="flex flex-wrap gap-2">
        {data.member.skills.map((skill: string) => (
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

{/* Ketertarikan Card */}
<Card className="mb-6 shadow-md border border-gray-200 rounded-2xl overflow-hidden bg-white">
  <CardHeader className="p-6 pb-2">
    <CardTitle className="text-2xl md:text-3xl font-bold text-green-800 mb-2">
      Ketertarikan
    </CardTitle>
  </CardHeader>
  <CardContent className="p-6 pt-0">
    {data.member?.interests?.length > 0 ? (
      <div className="flex flex-wrap gap-2">
        {data.member.interests.map((interest: string) => (
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
    href={`/dashboard`}
    className="text-lg font-medium text-green-600 hover:text-green-700 hover:underline transition"
  >
    Kembali ke Dashboard
  </Link>
</CardFooter>

    </div>
  )
}

export default ProfileMember
