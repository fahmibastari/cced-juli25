import JobsControl from '@/components/admin/jobs-control-admin'
import RoleGate from '@/components/auth/role-gate'
import { Role } from '@prisma/client'

export default async function Page() {
  return (
    <RoleGate accessRole={Role.ADMIN}>
      <JobsControl />
    </RoleGate>
  )
}
