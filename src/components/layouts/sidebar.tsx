'use client'

import Link from 'next/link'
import { Button } from '../ui/button'
import {
  LogOut,
  LayoutGrid,
  UserCog,
  Building2,
  Users,
  KeyIcon,
  Menu,
  X,
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useState } from 'react'

const Sidebar = () => {
  const [open, setOpen] = useState(false)
  const logout = async () => {
    await signOut()
  }
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  // Sidebar links for map
  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
    { href: '/admin/users', label: 'Pengguna', icon: UserCog },
    { href: '/admin/companies', label: 'Perusahaan', icon: Building2 },
    { href: '/admin/members', label: 'Pencari Kerja', icon: Users },
    { href: '/admin/passwords', label: 'Password Reset', icon: KeyIcon },
  ]

  return (
    <>
      {/* Button hamburger only on mobile */}
      <div className='lg:hidden fixed top-4 left-4 z-40'>
        <Button
          variant="outline"
          className="p-2"
          onClick={() => setOpen(true)}
        >
          <Menu className='w-6 h-6' />
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full bg-gradient-to-r from-green-500 to-green-400 shadow-lg rounded-l-xl w-64
          transform transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:block
        `}
        style={{ maxWidth: 256 }}
      >
        {/* Close button mobile only */}
        <div className="lg:hidden flex justify-end p-4">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            <X className="w-6 h-6 text-white" />
          </Button>
        </div>

        <h1 className='text-center text-2xl lg:text-3xl font-semibold text-white mt-8 mb-8'>
          Halaman Admin
        </h1>
        <hr className='border-gray-300 mb-4 mx-8' />
        <nav className='p-4 mb-10 flex flex-col gap-3'>
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} passHref className='w-full'>
              <Button
                className={`
                  w-full flex items-center rounded-lg py-3 px-4 text-left
                  transition duration-200 transform hover:scale-105
                  ${isActive(href)
                    ? 'bg-white text-green-800 shadow-lg'
                    : 'bg-green-50 text-green-600'}
                `}
                onClick={() => setOpen(false)}
                asChild
              >
                <span className='flex w-full items-center justify-between text-lg font-medium'>
                  <span>{label}</span>
                  <Icon className='w-6 h-6' />
                </span>
              </Button>
            </Link>
          ))}
        </nav>
        <div className="p-4">
          <Button
            onClick={logout}
            className='w-full flex items-center justify-between rounded-lg bg-red-600 hover:bg-red-800 py-3 px-4 text-lg font-medium text-white hover:text-white transition duration-200'
          >
            <span>Logout</span>
            <LogOut className='w-6 h-6' />
          </Button>
        </div>
      </aside>

      {/* Overlay mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  )
}

export default Sidebar
