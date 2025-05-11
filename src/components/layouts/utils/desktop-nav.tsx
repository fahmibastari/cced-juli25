import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

interface DesktopNavProps {
  isLoggedIn: boolean
}

const DesktopNav = ({ isLoggedIn }: DesktopNavProps) => {
  const logout = async () => {
    await signOut()
  }
  return (
    <div className='hidden md:flex md:mx-16 md:flex-wrap items-center justify-between px-4 py-4'>
      <NavigationMenu className='mr-28'>
        <NavigationMenuList className='flex items-center gap-6 py-2'>
          {/* About Us */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className='bg-transparent lg:text-lg md:text-base font-semibold text-[#025908] hover:text-green-600 transition duration-200'>
              Tentang
            </NavigationMenuTrigger>
            <NavigationMenuContent className='mt-2 rounded-md bg-white shadow-lg'>
              <ul className='grid w-[545px] z-50 gap-4 p-4'>
                <li className='hover:bg-gray-100 p-4 rounded-md'>
                  <Link
                    href='/about/profile'
                    className='block hover:text-green-600 text-gray-500'
                  >
                    <h3 className='text-lg font-bold'>Profil</h3>
                    <p className='text-sm text-gray-500 hover:text-gray-800'>
                      Profil
                    </p>
                  </Link>
                </li>
                <li className='hover:bg-gray-100 p-4 rounded-md'>
                  <Link
                    href='/about/struktur'
                    className='block hover:text-green-600 text-gray-500'
                  >
                    <h3 className='text-lg font-bold'>Struktur Organisasi</h3>
                    <p className='text-sm text-gray-500 hover:text-gray-800'>
                      Struktur organisasi CCED Universitas Lampung
                    </p>
                  </Link>
                </li>
                <li className='hover:bg-gray-100 p-4 rounded-md'>
                  <Link
                    href='/about/faq'
                    className='block hover:text-green-600 text-gray-500'
                  >
                    <h3 className='text-lg font-bold'>FAQ</h3>
                    <p className='text-sm text-gray-500 hover:text-gray-800'>
                      Pertanyaan yang sering ditanyakan
                    </p>
                  </Link>
                </li>
                <li className='hover:bg-gray-100 p-4 rounded-md'>
                  <Link
                    href='/about/contact'
                    className='block hover:text-green-600 text-gray-500'
                  >
                    <h3 className='text-lg font-bold'>Kontak</h3>
                    <p className='text-sm text-gray-500 hover:text-gray-800'>
                      Hubungi kami
                    </p>
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Tracer Study */}
          <NavigationMenuItem>
            <Link
              href='https://tracerstudy.unila.ac.id/'
              legacyBehavior
              passHref
            >
              <NavigationMenuLink className='bg-transparent lg:text-lg md:text-base font-semibold text-[#025908] hover:text-green-600 transition duration-200'>
                Tracer Study
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Auth Links */}
      <div className='flex items-center gap-8 px-4'>
        {!isLoggedIn ? (
          <>
            <Link
              className='text-base font-semibold text-[#025908] hover:text-green-600 transition duration-200'
              href='/register'
            >
              Daftar
            </Link>
            <Link
              className='text-base font-semibold text-[#025908] hover:text-green-600 transition duration-200'
              href='/login'
            >
              Login
            </Link>
          </>
        ) : (
          <>
            <Button
              className='text-base font-semibold text-[#025908] hover:text-green-600 transition duration-200'
              variant={'ghost'}
            >
              <Link href={'/dashboard'}>Dashboard</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default DesktopNav
