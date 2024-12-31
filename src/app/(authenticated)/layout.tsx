import Header from '@/components/dashboard/company/Header'
import { getUserDetailCompany } from '@/data/userRole'
import { currentUser } from '@/lib/authenticate'

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()
  const detailsUser = await getUserDetailCompany(user?.id || '')

  if (!detailsUser) {
    return (
      <div>
        {/* <h1>ini layout guest</h1> */}
        {children}
      </div>
    )
  }

  if (detailsUser.role === 'ADMIN') {
    return (
      <div>
        {/* <h1>ini layout admin</h1> */}
        {children}
      </div>
    )
  }

  if (detailsUser.role === 'COMPANY') {
    return (
      <section>
        {detailsUser && (
          <Header
            companyName={detailsUser.companyName || ''}
            industri={detailsUser.industry || ''}
          />
        )}
        {children}
      </section>
    )
  }

  if (detailsUser.role === 'MEMBER') {
    return (
      <div>
        {/* <h1>ini layout member</h1> */}
        {children}
      </div>
    )
  }
}
