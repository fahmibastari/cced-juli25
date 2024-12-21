import { auth } from '@/auth'
import DashboardAdmin from '@/components/dashboard/admin/DashboardAdmin'
import DashboardCompany from '@/components/dashboard/company/DashboadCompany'
import DashboardMember from '@/components/dashboard/member/DashboardMember'

export default async function Page() {
  const session = await auth()
  const user = session?.user
  console.log(user)
  if (user?.role === 'ADMIN') {
    return <DashboardAdmin />
  }

  if (user?.role === 'COMPANY') {
    return <DashboardCompany />
  }

  if (user?.role === 'MEMBER') {
    return <DashboardMember />
  }
}
