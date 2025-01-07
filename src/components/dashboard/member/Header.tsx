import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'
import Link from 'next/link'

interface HeaderMemberProps {
  fullname: string
  membertype: string
  img: string
}

const HeaderMember = ({ fullname, membertype, img }: HeaderMemberProps) => {
  return (
    <div className='flex items-center justify-between bg-gray-100 p-4'>
      <div className='flex items-center gap-4'>
        <Link href={'/member/profile'}>
          <Avatar>
            <AvatarImage src={img} alt='@shadcn' />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <h2 className='text-lg font-bold'>{fullname || 'Fullname'}</h2>
          <p className='text-sm'>{membertype.toLowerCase() || 'typeMember'}</p>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <Button variant='outline'>
          <Link href='/member/edit-profile-member'>Edit Profil Anda</Link>
        </Button>
      </div>
    </div>
  )
}

export default HeaderMember
