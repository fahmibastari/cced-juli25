'use client'

import useCurrentUser from '@/hooks/useCurrentUser'

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = useCurrentUser()
  if (user?.role === 'ADMIN') {
    return (
      <div>
        {/* <h1>ini layout admin</h1> */}
        {children}
      </div>
    )
  }

  if (user?.role === 'COMPANY') {
    return (
      <div>
        {/* <h1>ini layout company</h1> */}
        {children}
      </div>
    )
  }

  if (user?.role === 'MEMBER') {
    return (
      <div>
        {/* <h1>ini layout member</h1> */}
        {children}
      </div>
    )
  }
}
