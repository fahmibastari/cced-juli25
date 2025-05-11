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

          {/* About Us */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className='w-full text-left bg-transparent text-sm font-semibold text-[#025908] hover:text-green-600 transition duration-200'>
              Tentang
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
              Daftar
            </Link>
            <Link className='text-sm font-semibold text-[#025908] hover:text-green-600 transition duration-200' href='/login'>
              Login
            </Link>
          </>
        ) : (
          <>
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
