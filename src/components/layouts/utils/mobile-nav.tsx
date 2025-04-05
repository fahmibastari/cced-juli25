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

interface MobileNavProps {
  isLoggedIn: boolean
}

const MobileNav = ({ isLoggedIn }: MobileNavProps) => {
  const logout = async () => {
    await signOut()
  }

  return (
    <div className='md:hidden w-full bg-white shadow-md p-4'>
      <NavigationMenu className='w-full'>
        <NavigationMenuList className='flex flex-col items-start gap-2'>

          {/* Blog */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className='w-full text-left bg-transparent text-sm font-semibold text-[#025908] hover:text-green-600 transition duration-200'>
              Blog
            </NavigationMenuTrigger>
            <NavigationMenuContent className='w-full bg-white shadow-lg'>
              <ul className='flex flex-col gap-2 p-4'>
                <li className='hover:bg-gray-100 p-2 rounded-md'>
                  <Link href='/blog/news' className='block text-gray-500 hover:text-green-600'>
                    <h3 className='text-base font-bold'>Berita</h3>
                    <p className='text-xs text-gray-500'>Kumpulan berita seputar CCED</p>
                  </Link>
                </li>
                <li className='hover:bg-gray-100 p-2 rounded-md'>
                  <Link href='/blog/article' className='block text-gray-500 hover:text-green-600'>
                    <h3 className='text-base font-bold'>Artikel</h3>
                    <p className='text-xs text-gray-500'>Artikel-artikel menarik</p>
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Kegiatan */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className='w-full text-left bg-transparent text-sm font-semibold text-[#025908] hover:text-green-600 transition duration-200'>
              Kegiatan
            </NavigationMenuTrigger>
            <NavigationMenuContent className='w-full bg-white shadow-lg'>
              <ul className='flex flex-col gap-2 p-4'>
                <li className='hover:bg-gray-100 p-2 rounded-md'>
                  <Link href='/kegiatan/event' className='block text-gray-500 hover:text-green-600'>
                    <h3 className='text-base font-bold'>Event</h3>
                  </Link>
                </li>
                <li className='hover:bg-gray-100 p-2 rounded-md'>
                  <Link href='/kegiatan/kewirausahaan' className='block text-gray-500 hover:text-green-600'>
                    <h3 className='text-base font-bold'>Kewirausahaan</h3>
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Assessment */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className='w-full text-left bg-transparent text-sm font-semibold text-[#025908] hover:text-green-600 transition duration-200'>
              Assessment
            </NavigationMenuTrigger>
            <NavigationMenuContent className='w-full bg-white shadow-lg'>
              <ul className='flex flex-col gap-2 p-4'>
                <li className='hover:bg-gray-100 p-2 rounded-md'>
                  <Link href='/assessment/kepribadian' className='block text-gray-500 hover:text-green-600'>
                    <h3 className='text-base font-bold'>Tes Kepribadian</h3>
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* About Us */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className='w-full text-left bg-transparent text-sm font-semibold text-[#025908] hover:text-green-600 transition duration-200'>
              About Us
            </NavigationMenuTrigger>
            <NavigationMenuContent className='w-full bg-white shadow-lg'>
              <ul className='flex flex-col gap-2 p-4'>
                <li className='hover:bg-gray-100 p-2 rounded-md'>
                  <Link href='/about/profile' className='block text-gray-500 hover:text-green-600'>
                    <h3 className='text-base font-bold'>Profil</h3>
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Tracer Study */}
          <NavigationMenuItem>
            <Link href='https://tracerstudy.unila.ac.id/' legacyBehavior passHref>
              <NavigationMenuLink className='w-full text-left bg-transparent text-sm font-semibold text-[#025908] hover:text-green-600 transition duration-200'>
                Tracer Study
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Auth Links */}
      <div className='flex flex-col items-start gap-2 mt-4'>
        {!isLoggedIn ? (
          <>
            <Link className='text-sm font-semibold text-[#025908] hover:text-green-600 transition duration-200' href='/register'>
              Register
            </Link>
            <Link className='text-sm font-semibold text-[#025908] hover:text-green-600 transition duration-200' href='/login'>
              Login
            </Link>
          </>
        ) : (
          <>
            <Button className='text-sm font-semibold text-[#025908] hover:text-green-600 transition duration-200' onClick={logout} variant={'ghost'}>
              Logout
            </Button>
            <Button className='text-sm font-semibold text-[#025908] hover:text-green-600 transition duration-200' variant={'ghost'}>
              <Link href={'/dashboard'}>Dashboard</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default MobileNav
