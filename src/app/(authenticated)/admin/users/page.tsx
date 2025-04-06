import { getUsersWithBerkas } from '@/actions/admin-action'
import UsersControl from '@/components/admin/user-control-admin'
import RoleGate from '@/components/auth/role-gate'
import { Role } from '@prisma/client'

export default async function Page() {
  const users = await getUsersWithBerkas()
  return (
    <RoleGate accessRole={Role.ADMIN}>
      <UsersControl users={(users || []) as any} />
    </RoleGate>
  )
}
