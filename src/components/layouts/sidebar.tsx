'use client'

import Link from 'next/link'
import { Button } from '../ui/button'
import {
  Bell,
  BriefcaseBusiness,
  Building2,
  FileText,
  LayoutGrid,
  LogOut,
  UserCog,
  Users,
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

const Sidebar = () => {
  const logout = async () => {
    await signOut()
  }
  const pathname = usePathname() // Mendapatkan path aktif saat ini
  const isActive = (path: string) => pathname === path
  return (
    <div className='w-64 bg-white shadow-lg'>
      <h1 className='text-center text-xl font-bold text-[#025908] mt-9 mb-8'>
        Admin Panel
      </h1>
      <hr className='mb-4' />
      <nav className='p-4 mb-20 flex flex-col gap-1'>
        <Button
          variant='outline'
          className={`mb-2 w-full items-center rounded-lg hover:bg-gray-50 p-3 text-left ${
            isActive('/dashboard')
              ? 'bg-green-200 text-green-800'
              : 'bg-green-50 text-green-600'
          }`}
        >
          <Link
            href='/dashboard'
            className='flex w-full items-center justify-evenly'
          >
            <span>Dashboard</span>
            <LayoutGrid />
          </Link>
        </Button>

        <Button
          variant='outline'
          className={`mb-2 w-full items-center rounded-lg hover:bg-gray-50 p-3 text-left ${
            isActive('/admin/users')
              ? 'bg-green-200 text-green-800'
              : 'bg-green-50 text-green-600'
          }`}
        >
          <Link
            href='/admin/users'
            className='flex w-full items-center justify-evenly'
          >
            <span>Users</span>
            <UserCog />
          </Link>
        </Button>

        <Button
          variant='outline'
          className={`mb-2 w-full items-center rounded-lg hover:bg-gray-50 p-3 text-left ${
            isActive('/admin/companies')
              ? 'bg-green-200 text-green-800'
              : 'bg-green-50 text-green-600'
          }`}
        >
          <Link
            href='/admin/companies'
            className='flex w-full items-center justify-evenly'
          >
            <span>Companies</span>
            <Building2 />
          </Link>
        </Button>

        <Button
          variant='outline'
          className={`mb-2 w-full items-center rounded-lg hover:bg-gray-50 p-3 text-left ${
            isActive('/admin/members')
              ? 'bg-green-200 text-green-800'
              : 'bg-green-50 text-green-600'
          }`}
        >
          <Link
            href='/admin/members'
            className='flex w-full items-center justify-evenly'
          >
            <span>Members</span>
            <Users />
          </Link>
        </Button>

        <Button
          variant='outline'
          className={`mb-2 w-full items-center rounded-lg hover:bg-gray-50 p-3 text-left ${
            isActive('/admin/content')
              ? 'bg-green-200 text-green-800'
              : 'bg-green-50 text-green-600'
          }`}
        >
          <Link
            href='/admin/content'
            className='flex w-full items-center justify-evenly'
          >
            <span>Contents</span>
            <FileText />
          </Link>
        </Button>

        <Button
          variant='outline'
          className={`mb-2 w-full items-center rounded-lg hover:bg-gray-50 p-3 text-left ${
            isActive('/admin/jobs')
              ? 'bg-green-200 text-green-800'
              : 'bg-green-50 text-green-600'
          }`}
        >
          <Link
            href='/admin/jobs'
            className='flex w-full items-center justify-evenly'
          >
            <span>Jobs</span>
            <BriefcaseBusiness />
          </Link>
        </Button>

        <Button
          variant='outline'
          className={`mb-2 w-full items-center rounded-lg hover:bg-gray-50 p-3 text-left ${
            isActive('/admin/request')
              ? 'bg-green-200 text-green-800'
              : 'bg-green-50 text-green-600'
          }`}
        >
          <Link
            href='/admin/request'
            className='flex w-full items-center justify-evenly'
          >
            <span>Request</span>
            <Bell />
          </Link>
        </Button>
      </nav>

      <Button
        variant='outline'
        onClick={logout}
        className={`mb-2 w-full flex items-center justify-evenly rounded-lg bg-red-600 hover:bg-red-800 p-3 text-left text-white hover:text-white`}
      >
        <span>Logout</span>
        <LogOut />
      </Button>
    </div>
  )
}

export default Sidebar
