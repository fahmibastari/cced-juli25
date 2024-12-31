import DashboardAdmin from '@/components/dashboard/admin/DashboardAdmin'
import DashboardCompany from '@/components/dashboard/company/DashboadCompany'
import DashboardMember from '@/components/dashboard/member/DashboardMember'
import { currentDetailUser } from '@/lib/authenticate'
import { Role } from '@prisma/client'

export default async function Page() {
  const user = await currentDetailUser()
  if (user?.role === Role.ADMIN) {
    return <DashboardAdmin />
  }

  if (user?.role === Role.COMPANY) {
    return <DashboardCompany user={user} />
  }

  if (user?.role === Role.MEMBER) {
    return <DashboardMember />
  }
}
