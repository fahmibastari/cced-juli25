import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

interface DetailAplicantsProps {
    data: any
    index: number
  }
  

export const ApplicantCard = ({ data }: { data: any }) => {
  const member = data.member
  const applicantId = data.id // jobApplicationId

  return (
    <Link
      href={`/company/detail-job/detail-applicant?token=${data.id}`}
      className="block"
    >
      <div className="bg-white rounded-xl border shadow group flex gap-4 items-center p-4 hover:shadow-lg hover:border-green-200 transition cursor-pointer h-full">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <Image
            src={member?.user?.image?.src || '/profile.png'}
            alt="Avatar"
            width={54}
            height={54}
            className="rounded-full border-2 border-green-200 object-cover group-hover:scale-105 transition"
          />
        </div>
        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-green-900 truncate text-base md:text-lg">
            {member?.user?.fullname || '-'}
          </div>
          <div className="text-xs text-gray-500 truncate">{member?.user?.email || '-'}</div>
          <div className="flex gap-2 mt-1 flex-wrap">
            {member?.city && (
              <span className="bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 text-xs font-medium border">
                {member.city}
              </span>
            )}
          </div>
        </div>
        {/* Notes/Feedback Badge */}
        <div className="flex flex-col items-end min-w-[80px]">
          {data.notes && (
            <Badge className="bg-green-100 text-green-700 border border-green-200 whitespace-nowrap">{data.notes}</Badge>
          )}
        </div>
      </div>
    </Link>
  )
}
