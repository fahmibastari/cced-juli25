'use client'

import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

interface ButtonActionProps {
  id: string
  isVerified: boolean
  showDelete?: boolean // <-- added prop
  handleClickDelete?: () => void
  handleClickVerifikasi?: () => void
}

const ButtonAction = ({
  id,
  isVerified,
  handleClickVerifikasi,
}: ButtonActionProps) => {


  return (
    <div className='flex gap-4 justify-end'>
      {/* Tidak perlu lagi pengecekan isUserPage */}
      {isVerified ? (
        <Button size='sm' variant='outline' disabled>
          Verified
        </Button>
      ) : (
        <Button onClick={handleClickVerifikasi} size='sm' variant='outline'>
          Verifikasi
        </Button>
      )}
    </div>
  )
}

export default ButtonAction
