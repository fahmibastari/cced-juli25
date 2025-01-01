import DashboardAdmin from '@/components/dashboard/admin/DashboardAdmin'
import DashboardCompany from '@/components/dashboard/company/DashboadCompany'
import DashboardMember from '@/components/dashboard/member/DashboardMember'
import { getJobById } from '@/data/data'
import { currentDetailUserCompany } from '@/lib/authenticate'
import { Role } from '@prisma/client'

export default async function Page() {
  const user = await currentDetailUserCompany()
  if (user?.role === Role.ADMIN) {
    return <DashboardAdmin />
  }

  if (user?.role === Role.COMPANY) {
    const jobs = await getJobById(user?.id || '')
    return <DashboardCompany user={user} jobs={jobs} />
  }

  if (user?.role === Role.MEMBER) {
    return <DashboardMember />
  }
}
