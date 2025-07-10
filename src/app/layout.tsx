import type { Metadata } from 'next'
import { Inter, Roboto_Mono } from 'next/font/google'
import './globals.css'
import Footer from '@/components/layouts/footer'
import Nav from '@/components/layouts/nav'
import { SessionProvider } from 'next-auth/react'
import { currentUser } from '@/lib/authenticate'
import Sidebar from '@/components/layouts/sidebar'
import Header from '@/components/utils/Header'

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
})

const robotoMono = Roboto_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Lowongan Pekerjaan - CCED Universitas Lampung',
  description: 'Dibuat oleh CCED',
  icons: {
    icon: "/cced-icon.png", // Sesuaikan dengan nama file favicon kamu
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await currentUser()
  const isLoggedIn = !!user
  if (user?.role === 'ADMIN') {
    return (
      <html lang='en' className={`${inter.variable} ${robotoMono.variable}`}>
        <body className='antialiased'>
          <div className='flex h-screen bg-gray-100'>
            <Sidebar />
            <div className='flex-1 overflow-auto'>
              {/* Header */}
              <Header />
              {children}
            </div>
          </div>
        </body>
      </html>
    )
  }

  return (
    <html lang='en' className={`${inter.variable} ${robotoMono.variable}`}>
      <body className='antialiased'>
        <SessionProvider>
        <Nav isLoggedIn={isLoggedIn} user={user} />
          <div className='pt-32'>{children}</div>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}