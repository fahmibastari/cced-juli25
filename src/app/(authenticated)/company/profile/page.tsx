import { FormSuccess } from '@/components/auth/form-succsess'
import RoleGate from '@/components/auth/role-gate'
import { Role } from '@prisma/client'

export default function Page() {
  return (
    <RoleGate accessRole={Role.COMPANY}>
      <div className='w-full h-screen flex items-center justify-center'>
        <FormSuccess message='You have an access to this page' />
      </div>
    </RoleGate>
  )
}
