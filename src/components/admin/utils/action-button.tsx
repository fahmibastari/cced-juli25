'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

interface ButtonActionProps {
  id: string
  isVerified: boolean
  handleClickDelete?: () => void
  handleClickVerifikasi?: () => void
}

const ButtonAction = ({
  id,
  isVerified,
  handleClickDelete,
  handleClickVerifikasi,
}: ButtonActionProps) => {
  const pathname = usePathname()

  const isUserPage = pathname === '/admin/users'

  return (
    <div className='flex gap-4 justify-end'>
      <Button onClick={handleClickDelete} variant='destructive' size='sm'>
        Hapus
      </Button>

      {isUserPage && (
        isVerified ? (
          <Button size='sm' variant='outline' disabled>
            Verified
          </Button>
        ) : (
          <Button onClick={handleClickVerifikasi} size='sm' variant='outline'>
            Verifikasi
          </Button>
        )
      )}
    </div>
  )
}

export default ButtonAction
