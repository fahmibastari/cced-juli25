import { auth } from '@/auth'

export default auth((req) => {
  const isLoggedIn = !!req.auth

  if (!isLoggedIn && req.nextUrl.pathname === '/dashboard') {
    const newUrl = new URL('/login', req.nextUrl.origin)
    return Response.redirect(newUrl)
  }

  if (isLoggedIn && req.nextUrl.pathname === '/login') {
    const newUrl = new URL('/dashboard', req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

export const config = {
  matcher: ['/login', '/dashboard'],
}
