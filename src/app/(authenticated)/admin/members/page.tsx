import MembersControl from '@/components/admin/member-control-admin'
import RoleGate from '@/components/auth/role-gate'
import { Role } from '@prisma/client'

export default async function Page() {
  return (
    <RoleGate accessRole={Role.ADMIN}>
      <MembersControl />
    </RoleGate>
  )
}
