import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'
import Link from 'next/link'

interface HeaderCompanyProps {
  companyName: string
  industri: string
  logo: string
}

const HeaderCompany = ({ companyName, industri, logo }: HeaderCompanyProps) => {
  return (
    <div className='flex items-center justify-between bg-gray-100 p-4'>
      <div className='flex items-center gap-4'>
        <Link href={'/company/profile'}>
          <Avatar>
            <AvatarImage src={logo} alt='profile' className='object-cover' />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <h2 className='text-lg font-bold'>{companyName || 'Perusahaan'}</h2>
          <p className='text-sm'>Bidang Industri : {industri || 'Industri'}</p>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <Button variant='outline'>
          <Link href='/company/edit-profile-company'>
            Edit Profil Perusahaan
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default HeaderCompany
