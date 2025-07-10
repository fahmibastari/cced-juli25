import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { User, Bell } from 'lucide-react'
import Link from 'next/link'

interface HeaderMemberProps {
  fullname: string
  membertype: string
  img: string
  feedbacks?: any[]
  studylevel: string
  major: string
}

const HeaderMember = ({
  fullname,
  major,
  studylevel,
  img,
  feedbacks = [],
}: HeaderMemberProps) => {
  const hasFeedback = feedbacks && feedbacks.length > 0

  return (
    <header
      className="
        w-full rounded-2xl mb-6
        flex flex-col md:flex-row items-center justify-between gap-4
        px-6 py-4
        backdrop-blur-xl
        bg-white/60
        border border-white/50 shadow-lg
        transition
      "
      style={{
        // Optional, biar background makin glossy di dark mode
        background: 'rgba(255,255,255,0.7)',
        WebkitBackdropFilter: 'blur(20px)',
        backdropFilter: 'blur(20px)'
      }}
    >
      {/* Kiri: Avatar + Info */}
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="relative">
          <Link href="/member/profile" className="block group">
            <Avatar className="h-16 w-16 border-2 border-green-400 group-hover:border-green-600 transition-all duration-150 shadow-md">
              <AvatarImage src={img} alt={fullname} className="object-cover" />
              <AvatarFallback>
                <User className="h-10 w-10 text-green-800" />
              </AvatarFallback>
            </Avatar>
            {/* Badge feedback */}
            {hasFeedback && (
              <span className="
                absolute -top-1.5 -right-1.5 bg-blue-600 text-white
                text-xs font-bold rounded-full px-2 py-0.5 shadow
                flex items-center justify-center
                border-2 border-white
                z-10
              ">
                {feedbacks.length}
              </span>
            )}
          </Link>
        </div>
        <div className="min-w-0 flex flex-col gap-1">
          <h2 className="text-xl md:text-2xl font-bold text-green-900 truncate flex items-center gap-2">
            {fullname || 'Nama Lengkap'}
            {hasFeedback && (
              <span className="inline-flex items-center gap-1 bg-blue-50/90 text-blue-700 text-xs px-2 py-0.5 rounded-full font-semibold shadow-sm">
                <Bell className="w-4 h-4" /> {feedbacks.length} Feedback Baru
              </span>
            )}
          </h2>
          <span className="text-sm text-gray-500 font-medium capitalize">{studylevel || '-'} - {major || '-'}</span>
        </div>
      </div>
      {/* Kanan: Edit Profil */}
      <div className="flex-shrink-0 w-full md:w-auto flex items-center justify-end">
        <Link href="/member/edit-profile-member" className="block">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full px-5 py-2 text-green-800 font-semibold border-green-200 hover:border-green-400 hover:bg-green-50 transition shadow"
          >
            Edit Profil Anda
          </Button>
        </Link>
      </div>
    </header>
  )
}

export default HeaderMember
