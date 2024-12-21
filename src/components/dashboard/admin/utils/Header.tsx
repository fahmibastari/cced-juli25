'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Bell } from 'lucide-react'

interface HeaderProps {
  title: string
}

const Header = ({ title }: HeaderProps) => {
  return (
    <header className='flex h-36 items-center justify-between bg-white p-4 shadow-md'>
      {/* Title Section */}
      <h1 className='text-3xl font-bold text-[#025908] hover:text-[#44b64b]'>
        {title}
      </h1>

      {/* Right Section: Notification and Logo */}
      <div className='flex items-center gap-4'>
        {/* Notification Button */}
        <div className='relative'>
          <button
            className='rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200'
            aria-label='Notifikasi'
          >
            <Bell size={20} />
          </button>
          <span className='absolute right-0 top-0 inline-block h-2 w-2 rounded-full bg-red-500' />
        </div>

        {/* Avatar/Logo */}
        <Avatar className='h-8 w-8'>
          <AvatarImage src='/path-to-your-logo.png' alt='Logo' />
          <AvatarFallback>ANUUU</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

export default Header
