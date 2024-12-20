'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Role } from '@prisma/client'
import { BriefcaseIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface RoleOption {
  id: Role
  title: string
  icon: React.ReactNode
  description: string
}

interface RoleSelectionProps {
  onSelectRole: (roleId: Role) => void
  onSubmit: () => void
}

const RoleSelection: React.FC<RoleSelectionProps> = ({
  onSelectRole,
  onSubmit,
}) => {
  const [selectedRole, setSelectedRole] = React.useState<Role | null>(null)

  const roles: RoleOption[] = [
    {
      id: Role.MEMBER,
      title: 'Member',
      icon: <UserIcon className='h-12 w-12' />,
      description: 'Akun personal biasa',
    },
    {
      id: Role.COMPANY,
      title: 'Perusahaan',
      icon: <BriefcaseIcon className='h-12 w-12' />,
      description: 'Akun business/perusahaan',
    },
  ]

  const handleRoleSelect = (roleId: Role) => {
    setSelectedRole(roleId)
    onSelectRole(roleId)
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 p-4'>
      <Card className='w-full max-w-2xl'>
        <CardContent className='p-6'>
          <div className='space-y-6'>
            <div className='text-center'>
              <h1 className='text-2xl font-bold'>Daftar Akun</h1>
              <p className='mt-1 text-sm text-gray-500'>
                Pilih jenis akun yang kamu buat.
              </p>
            </div>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className={`relative rounded-lg border-2 p-6 transition-all duration-200 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    selectedRole === role.id
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  type='button'
                  aria-pressed={selectedRole === role.id}
                >
                  <div className='flex flex-col items-center space-y-3 text-center'>
                    <div
                      className={`rounded-full p-3 transition-colors ${
                        selectedRole === role.id
                          ? 'text-primary'
                          : 'text-gray-400'
                      }`}
                    >
                      {role.icon}
                    </div>
                    <div>
                      <h3 className='font-medium'>{role.title}</h3>
                      <p className='mt-1 text-sm text-gray-500'>
                        {role.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className='mt-8 flex items-center justify-between'>
              <p className='text-sm text-gray-500'>
                Sudah punya akun?{' '}
                <Link
                  href='/login'
                  className={`${buttonVariants({ variant: 'link' })} ml-0 pl-0`}
                >
                  Login akun kamu
                </Link>
              </p>
              <Button
                onClick={onSubmit}
                disabled={!selectedRole}
                className='px-8'
                type='button'
              >
                Lanjut
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default RoleSelection
