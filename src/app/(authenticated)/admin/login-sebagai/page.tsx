import { getMembers } from '@/actions/admin-action'
import AdminChangePasswordForm from '@/components/admin/AdminChangePasswordForm'
import RoleGate from '@/components/auth/role-gate'
import { Role } from '@prisma/client'


export default async function AdminChangePasswordPage() {
    return (
      <RoleGate accessRole={Role.ADMIN}>
        budix
      </RoleGate>
    )
  }