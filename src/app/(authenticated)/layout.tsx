'use client'

import Header from '@/components/dashboard/company/Header'
import { useEffect, useState } from 'react'
import useCurrentUser from '@/hooks/useCurrentUser'

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = useCurrentUser()
  const [detailsUser, setDetailsUser] = useState<{
    companyName: string
    industry: string
  } | null>(null)

  useEffect(() => {
    const fetchDetailUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/public/user/get-user-type?id=${user?.id}`
        )
        if (!response.ok) {
          throw new Error('Failed to fetch news')
        }
        const data = await response.json()
        setDetailsUser(data)
      } catch (error) {
        console.error('Error fetching news:', error)
      }
    }

    fetchDetailUser()
  }, [user])

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
      <section>
        {detailsUser && (
          <Header
            companyName={detailsUser.companyName}
            industri={detailsUser.industry}
          />
        )}
        {children}
      </section>
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
