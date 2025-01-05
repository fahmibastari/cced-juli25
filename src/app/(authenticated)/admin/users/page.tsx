import { getUsers } from '@/actions/admin-action'
import UsersControl from '@/components/admin/user-control-admin'
import RoleGate from '@/components/auth/role-gate'
import { Role } from '@prisma/client'

export default async function Page() {
  const users = await getUsers()
  return (
    <RoleGate accessRole={Role.ADMIN}>
      <UsersControl users={users || []} />
    </RoleGate>
  )
}
