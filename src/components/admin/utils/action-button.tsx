/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { Button } from '@/components/ui/button'

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
  return (
    <div className='flex gap-4 justify-end'>
      <Button onClick={handleClickDelete} variant='destructive' size='sm'>
        Hapus
      </Button>

      {isVerified ? (
        <Button size='sm' variant='outline' disabled>
          Verified
        </Button>
      ) : (
        <Button onClick={handleClickVerifikasi} size='sm' variant='outline'>
          Verifikasi
        </Button>
      )}

      <Button size='sm' variant='default'>
        Detail {id.slice(0, 5)}
      </Button>
    </div>
  )
}

export default ButtonAction
