import RoleGate from '@/components/auth/role-gate'
import AddJob from '@/components/company/add-job-form'
import { Role } from '@prisma/client'

export default async function Page() {
  return (
    <RoleGate accessRole={Role.COMPANY}>
      <AddJob />
    </RoleGate>
  )
}
