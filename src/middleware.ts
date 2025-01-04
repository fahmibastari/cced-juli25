import authConfig from './auth.config'
import NextAuth from 'next-auth'
import {
  apiAuthPrefix,
  publicRoutes,
  DEFAULT_LOGIN_REDIRECT,
  authRoutes,
  blogPrefix,
  kegiatanPrefix,
  assessmentPrefix,
  aboutPrefix,
  apiPublicPrefix,
  adminRoutes,
} from './routes'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const { pathname } = req.nextUrl

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isApiPublicRoute = nextUrl.pathname.startsWith(apiPublicPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isBlogRoute = nextUrl.pathname.startsWith(blogPrefix)
  const iskegiatanRoute = nextUrl.pathname.startsWith(kegiatanPrefix)
  const isAssessmentRoute = nextUrl.pathname.startsWith(assessmentPrefix)
  const isAboutRoute = nextUrl.pathname.startsWith(aboutPrefix)

  // Allow spesific admin
  // Izinkan hanya jika rute cocok dengan `adminRoutes`
  if (pathname === adminRoutes) {
    return
  }

  // Allow blog routes
  if (isBlogRoute) {
    return // Kembali tanpa melakukan apa-apa
  }

  // Allow kegiatan routes
  if (iskegiatanRoute) {
    return // Kembali tanpa melakukan apa-apa
  }

  // Allow assessment routes
  if (isAssessmentRoute) {
    return // Kembali tanpa melakukan apa-apa
  }

  // Allow about routes
  if (isAboutRoute) {
    return // Kembali tanpa melakukan apa-apa
  }

  // Allow API Public routes
  if (isApiPublicRoute) {
    return // Kembali tanpa melakukan apa-apa
  }

  // Allow API Auth routes
  if (isApiAuthRoute) {
    return // Kembali tanpa melakukan apa-apa
  }

  // Allow public routes
  if (isPublicRoute) {
    return // Kembali tanpa melakukan apa-apa
  }

  // Redirect logged-in users trying to access auth routes
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return // Kembali tanpa melakukan apa-apa
  }

  // Protect private routes (e.g., /settings)
  if (!isLoggedIn) {
    return Response.redirect(new URL('/login', nextUrl))
  }

  return // Allow access to all other routes for logged-in users
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
