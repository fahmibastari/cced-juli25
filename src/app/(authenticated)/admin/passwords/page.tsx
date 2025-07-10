import { getMembers } from '@/actions/admin-action'
import AdminChangePasswordForm from '@/components/admin/AdminChangePasswordForm'
import RoleGate from '@/components/auth/role-gate'
import { Role } from '@prisma/client'

export default async function AdminChangePasswordPage() {
    return (
      <RoleGate accessRole={Role.ADMIN}>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Ubah Kata Sandi Pengguna</h2>
          {/* Komponen form untuk mengganti password */}
          <AdminChangePasswordForm />
        </div>
      </RoleGate>
    )
  }