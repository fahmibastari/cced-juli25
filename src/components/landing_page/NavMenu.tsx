import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import * as React from 'react'

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'

const NavMenu = () => {
  return (
    <div className="flex w-full items-center justify-between px-4">
      {/* Main Navigation Menu - Centered */}
      <div className="flex flex-1 justify-center">
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-4 pt-4">
            {/* Blog */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Blog</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[480px] gap-3 p-4">
                  <ListItem href="/blog/berita" title="Berita">
                    Kumpulan berita terkini
                  </ListItem>
                  <ListItem href="/blog/artikel" title="Artikel">
                    Artikel-artikel menarik
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Kegiatan */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Kegiatan</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[480px] gap-3 p-4">
                  <ListItem href="/kegiatan/event" title="Event">
                    Daftar event yang akan datang
                  </ListItem>
                  <ListItem
                    href="/kegiatan/kewirausahaan"
                    title="Kewirausahaan"
                  >
                    Program kewirausahaan
                  </ListItem>
                  <ListItem href="/kegiatan/sertifikat" title="Sertifikat">
                    Sertifikat kegiatan
                  </ListItem>
                  <ListItem href="/kegiatan/absensi" title="Absensi">
                    Sistem absensi kegiatan
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Assessment */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Assessment</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[480px] gap-3 p-4">
                  <ListItem
                    href="/assessment/kepribadian"
                    title="Test Kepribadian"
                  >
                    Tes untuk mengetahui kepribadian
                  </ListItem>
                  <ListItem
                    href="/assessment/minat-bakat"
                    title="Test Minat Bakat"
                  >
                    Tes untuk mengetahui minat dan bakat
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* About Us */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[480px] gap-3 p-4">
                  <ListItem href="/about/profil" title="Profil">
                    Profil organisasi
                  </ListItem>
                  <ListItem href="/about/struktur" title="Struktur Organisasi">
                    Struktur organisasi kami
                  </ListItem>
                  <ListItem href="/about/faq" title="FAQ">
                    Pertanyaan yang sering ditanyakan
                  </ListItem>
                  <ListItem href="/about/contact" title="Contact">
                    Hubungi kami
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Tracer Study */}
            <NavigationMenuItem>
              <Link
                href="https://tracerstudy.unila.ac.id/"
                legacyBehavior
                passHref
              >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Tracer Study
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Right-aligned Buttons */}
      <div className="flex items-center gap-4 pt-4">
        <Link href="/register" legacyBehavior passHref>
          <Button variant="outline">Register</Button>
        </Link>
        <Link href="/login" legacyBehavior passHref>
          <Button variant="outline">Login</Button>
        </Link>
        <Link href="/perusahaan" legacyBehavior passHref>
          <Button variant="outline">Perusahaan</Button>
        </Link>
      </div>
    </div>
  )
}

export default NavMenu
