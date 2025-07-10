import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '../ui/badge'

interface ListDetailAplicantsProps {
  data: any
  index: number
}

const ListDetailAplicants = ({ data, index }: ListDetailAplicantsProps) => {
  const member = data?.member
  return (
    <Link
      href={`/company/detail-job/detail-applicant?token=${data.id}`}
      className="block"
      tabIndex={0}
    >
      <div className="group flex items-center gap-4 bg-white rounded-xl border shadow-sm px-4 py-3 hover:bg-green-50 hover:shadow-md transition cursor-pointer">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <Image
            src={member?.user?.image?.src || '/profile.png'}
            alt="Avatar"
            width={44}
            height={44}
            className="rounded-full object-cover border border-green-100 group-hover:scale-105 transition"
          />
        </div>
        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="text-base font-semibold text-green-900 truncate">
            {member?.user?.fullname || 'Nama Tidak ditemukan'}
          </div>
          <div className="text-xs text-gray-500">
            {member?.user?.email || '-'}
          </div>
        </div>
        {/* Feedback */}
        <div className="flex flex-col items-end gap-1 min-w-[60px]">
          {data.notes && (
            <Badge className="bg-green-100 text-green-700 border border-green-200 px-3 py-1 text-xs font-medium whitespace-nowrap">
              {data.notes}
            </Badge>
          )}
          <span className="text-xs text-gray-400">{`Pelamar #${index + 1}`}</span>
        </div>
      </div>
    </Link>
  )
}

export default ListDetailAplicants

