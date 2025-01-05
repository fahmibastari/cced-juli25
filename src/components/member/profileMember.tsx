/* eslint-disable @typescript-eslint/no-explicit-any */
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

interface ProfileMemberProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

const ProfileMember = ({ data }: ProfileMemberProps) => {
  return (
    <div className='max-w-4xl mx-auto p-6'>
      <Card className='mb-6'>
        <CardHeader>
          <div className='flex items-center gap-6'>
            <div className='relative w-36 h-36'>
              <Image
                src={
                  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                }
                alt='Profile'
                className='rounded-full object-cover'
                fill
              />
            </div>
            <div>
              <CardTitle className='text-xl font-bold text-green-800 mb-3'>
                {data.fullname || 'Fullname'}
              </CardTitle>
              <CardDescription className='text-sm text-gray-500'>
                {data.member.about || 'about me'}
              </CardDescription>
            </div>
          </div>
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
          <div className='flex items-center gap-3 mb-2'>
            <span className='text-gray-900'>Status:</span>
            <span className='text-gray-600'>
              {data.member.memberType.toLowerCase() || '-'}
            </span>
          </div>
          <div className='flex items-center gap-3 mb-2'>
            <span className='text-gray-900'>NIM:</span>
            <span className='text-gray-600'>{data.member.nim || '-'}</span>
          </div>
          <div className='flex items-center gap-3 mb-2'>
            <span className='text-gray-900'>Nomor Telfon:</span>
            <span className='text-gray-600'>{data.member.phone || '-'}</span>
          </div>
          <div className='flex items-center gap-3 mb-2'>
            <span className='text-gray-900'>Address:</span>
            <span className='text-gray-600'>{data.member.address || '-'}</span>
          </div>
          <div className='flex items-center gap-3 mb-2'>
            <span className='text-gray-900'>Kota:</span>
            <span className='text-gray-600'>{data.member.city || '-'}</span>
          </div>
          <div className='flex items-center gap-3 mb-2'>
            <span className='text-gray-900'>Tanggal Lahir:</span>
            <span className='text-gray-600'>
              {data.member.birthDate || '-'}
            </span>
          </div>
          <div className='flex items-center gap-3 mb-2'>
            <span className='text-gray-900'>Jenis Kelamin:</span>
            <span className='text-gray-600'>{data.member.gender || '-'}</span>
          </div>
        </CardContent>
      </Card>

      <Card className='mb-6'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold text-green-800 mb-3'>
            PekerJaan Dilamar
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data.member?.jobApplication?.length > 0 ? (
            <ul className='list-disc space-y-2 pl-6 text-gray-700'>
              {data.member?.jobApplication?.map((job: any, index: number) => (
                <li key={index}>{job.job.title}</li>
              ))}
            </ul>
          ) : (
            <p>Tidak ada PekerJaan</p>
          )}
        </CardContent>
      </Card>

      <Card className='mb-6'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold text-green-800 mb-3'>
            Resume
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data.member?.resume ? (
            <p>{data.member?.resume}</p>
          ) : (
            <p>Belum Melengkapi Resume</p>
          )}
        </CardContent>
      </Card>

      <Card className='mb-6'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold text-green-800 mb-3'>
            Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data.member?.skills?.length > 0 ? (
            <ul className='list-disc space-y-2 pl-6 text-gray-700'>
              {data.member?.skills?.map((skill: string) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          ) : (
            <p>Tidak ada skill</p>
          )}
        </CardContent>
      </Card>

      <Card className='mb-6'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold text-green-800 mb-3'>
            Interests
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data.member?.interests?.length > 0 ? (
            <ul className='list-disc space-y-2 pl-6 text-gray-700'>
              {data.member?.interests?.map((skill: string) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          ) : (
            <p>Tidak ada ketertarikan</p>
          )}
        </CardContent>
      </Card>

      <Card className='mb-6'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold text-green-800 mb-3'>
            Experience
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data.member?.experience?.length > 0 ? (
            <ul className='list-disc space-y-2 pl-6 text-gray-700'>
              {data.member?.experience?.map((exp: any, index: number) => (
                <li key={index}>test</li>
              ))}
            </ul>
          ) : (
            <p>Tidak ada Pengalaman</p>
          )}
        </CardContent>
      </Card>

      <Card className='mb-6'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold text-green-800 mb-3'>
            EduCation
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data.member?.education?.length > 0 ? (
            <ul className='list-disc space-y-2 pl-6 text-gray-700'>
              {data.member?.education?.map((edu: any, index: number) => (
                <li key={index}>test</li>
              ))}
            </ul>
          ) : (
            <p>Tidak ada Pendidikan</p>
          )}
        </CardContent>
      </Card>

      <Card className='mb-6'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold text-green-800 mb-3'>
            Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data.member?.assessment?.length > 0 ? (
            <ul className='list-disc space-y-2 pl-6 text-gray-700'>
              {data.member?.assessment?.map((ass: any, index: number) => (
                <li key={index}>test</li>
              ))}
            </ul>
          ) : (
            <p>Tidak ada Assessment</p>
          )}
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

export default ProfileMember
