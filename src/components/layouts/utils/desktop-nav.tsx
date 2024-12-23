import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'

const DesktopNav = () => {
  const isLoggedIn = false

  return (
    <div className='hidden md:flex md:mx-16 md:flex-wrap items-center justify-center px-4 py-4'>
      <NavigationMenu className='mr-28'>
        <NavigationMenuList className='flex items-center gap-4 py-4'>
          {/* Blog */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className='bg-transparent lg:text-2xl md:text-xl font-bold text-[#025908] hover:text-green-600'>
              Blog
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid w-[630px] gap-3 p-4'>
                <Link href='/blog/news'>
                  <h3>Berita</h3>
                  <p>Kumpulan berita seputar CCED</p>
                </Link>
                <Link href='/blog/article'>
                  <h3>Artikel</h3>
                  <p>Artikel-artikel menarik</p>
                </Link>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Kegiatan */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className='bg-transparent lg:text-2xl md:text-xl font-bold text-[#025908] hover:text-green-600'>
              Kegiatan
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid w-[630px] gap-3 p-4'>
                <Link href='/kegiatan/event'>
                  <h3>Event</h3>
                  <p>Daftar event yang akan datang</p>
                </Link>
                <Link href='/kegiatan/kewirausahaan'>
                  <h3>Kewirausahaan</h3>
                  <p>Program kewirausahaan</p>
                </Link>
                <Link href='/kegiatan/sertifikat'>
                  <h3>Sertifikat</h3>
                  <p>Sertifikat kegiatan</p>
                </Link>
                <Link href='/kegiatan/absensi'>
                  <h3>Absensi</h3>
                  <p>Sistem absensi kegiatan</p>
                </Link>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Assessment */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className='bg-transparent lg:text-2xl md:text-xl font-bold text-[#025908] hover:text-green-600'>
              Assessment
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid w-[630px] gap-3 p-4'>
                <Link href='/assessment/kepribadian'>
                  <h3>Tes Kepribadian</h3>
                  <p>Tes untuk mengetahui kepribadian</p>
                </Link>
                <Link href='/assessment/minat-bakat'>
                  <h3>Tes Minat Bakat</h3>
                  <p>Tes untuk mengetahui minat dan bakat</p>
                </Link>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* About Us */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className='bg-transparent lg:text-2xl md:text-xl font-bold text-[#025908] hover:text-green-600'>
              About Us
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid w-[630px] gap-3 p-4'>
                <Link href='/about/profile'>
                  <h3>Profil</h3>
                  <p>Profil organisasi</p>
                </Link>
                <Link href='/about/struktur'>
                  <h3>Struktur Organisasi</h3>
                  <p>Struktur organisasi kami</p>
                </Link>
                <Link href='/about/faq'>
                  <h3>FAQ</h3>
                  <p>Pertanyaan yang sering ditanyakan</p>
                </Link>
                <Link href='/about/contact'>
                  <h3>Kontak</h3>
                  <p>Hubungi kami</p>
                </Link>
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
              <NavigationMenuLink className='bg-transparent lg:text-2xl md:text-xl font-bold text-[#025908] hover:text-green-600'>
                Tracer Study
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className='flex items-center gap-10 px-10 py-4'>
        {!isLoggedIn && (
          <>
            <Link
              className='bg-transparent text-xl font-bold text-[#025908] hover:text-green-600'
              href='/register'
            >
              Register
            </Link>
            <Link
              className='bg-transparent text-xl font-bold text-[#025908] hover:text-green-600'
              href='/login'
            >
              Login
            </Link>
          </>
        )}

        <Link
          className='bg-transparent text-xl font-bold text-[#025908] hover:text-green-600'
          href='/logout'
        >
          Logout
        </Link>
        {/* <ButtonLogout/> */}
      </div>
    </div>
  )
}

export default DesktopNav
