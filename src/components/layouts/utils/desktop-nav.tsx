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
          {/* Blog */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className='bg-transparent lg:text-lg md:text-base font-semibold text-[#025908] hover:text-green-600 transition duration-200'>
              Blog
            </NavigationMenuTrigger>
            <NavigationMenuContent className='mt-2 rounded-md bg-white shadow-lg'>
              <ul className='grid w-[545px] z-50 gap-4 p-4'>
                <li className='hover:bg-gray-100 p-4 rounded-md'>
                  <Link
                    href='/blog/news'
                    className='block hover:text-green-600 text-gray-500'
                  >
                    <h3 className='text-lg font-bold'>Berita</h3>
                    <p className='text-sm text-gray-500 hover:text-gray-800'>
                      Kumpulan berita seputar CCED
                    </p>
                  </Link>
                </li>
                <li className='hover:bg-gray-100 p-4 rounded-md'>
                  <Link
                    href='/blog/article'
                    className='block hover:text-green-600 text-gray-500'
                  >
                    <h3 className='text-lg font-bold'>Artikel</h3>
                    <p className='text-sm text-gray-500 hover:text-gray-800'>
                      Artikel-artikel menarik
                    </p>
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Kegiatan */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className='bg-transparent lg:text-lg md:text-base font-semibold text-[#025908] hover:text-green-600 transition duration-200'>
              Kegiatan
            </NavigationMenuTrigger>
            <NavigationMenuContent className='mt-2 rounded-md bg-white shadow-lg'>
              <ul className='grid w-[545px] z-50 gap-4 p-4'>
                <li className='hover:bg-gray-100 p-4 rounded-md'>
                  <Link
                    href='/kegiatan/event'
                    className='block hover:text-green-600 text-gray-500'
                  >
                    <h3 className='text-lg font-bold'>Event</h3>
                    <p className='text-sm text-gray-500 hover:text-gray-800'>
                      Daftar event yang akan datang
                    </p>
                  </Link>
                </li>
                <li className='hover:bg-gray-100 p-4 rounded-md'>
                  <Link
                    href='/kegiatan/kewirausahaan'
                    className='block hover:text-green-600 text-gray-500'
                  >
                    <h3 className='text-lg font-bold'>Kewirausahaan</h3>
                    <p className='text-sm text-gray-500 hover:text-gray-800'>
                      Program kewirausahaan
                    </p>
                  </Link>
                </li>
                <li className='hover:bg-gray-100 p-4 rounded-md'>
                  <Link
                    href='/kegiatan/sertifikat'
                    className='block hover:text-green-600 text-gray-500'
                  >
                    <h3 className='text-lg font-bold'>Sertifikat</h3>
                    <p className='text-sm text-gray-500 hover:text-gray-800'>
                      Sertifikat kegiatan
                    </p>
                  </Link>
                </li>
                <li className='hover:bg-gray-100 p-4 rounded-md'>
                  <Link
                    href='/kegiatan/absensi'
                    className='block hover:text-green-600 text-gray-500'
                  >
                    <h3 className='text-lg font-bold'>Absensi</h3>
                    <p className='text-sm text-gray-500 hover:text-gray-800'>
                      Sistem absensi kegiatan
                    </p>
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Assessment */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className='bg-transparent lg:text-lg md:text-base font-semibold text-[#025908] hover:text-green-600 transition duration-200'>
              Assessment
            </NavigationMenuTrigger>
            <NavigationMenuContent className='mt-2 rounded-md bg-white shadow-lg'>
              <ul className='grid w-[545px] z-50 gap-4 p-4'>
                <li className='hover:bg-gray-100 p-4 rounded-md'>
                  <Link
                    href='/assessment/kepribadian'
                    className='block hover:text-green-600 text-gray-500'
                  >
                    <h3 className='text-lg font-bold'>Tes Kepribadian</h3>
                    <p className='text-sm text-gray-500 hover:text-gray-800'>
                      Tes untuk mengetahui kepribadian
                    </p>
                  </Link>
                </li>
                <li className='hover:bg-gray-100 p-4 rounded-md'>
                  <Link
                    href='/assessment/minat-bakat'
                    className='block hover:text-green-600 text-gray-500'
                  >
                    <h3 className='text-lg font-bold'>Tes Minat Bakat</h3>
                    <p className='text-sm text-gray-500 hover:text-gray-800'>
                      Tes untuk mengetahui minat dan bakat
                    </p>
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* About Us */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className='bg-transparent lg:text-lg md:text-base font-semibold text-[#025908] hover:text-green-600 transition duration-200'>
              About Us
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
                      Profil organisasi
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
                      Struktur organisasi kami
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
              Register
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
              onClick={logout}
              variant={'ghost'}
            >
              Logout
            </Button>
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
