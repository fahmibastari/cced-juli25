'use client'

import { Button } from '@/components/ui/button'

interface ButtonActionUsersProps {
  id: string
  handleClickDelete?: () => void
}

const ButtonActionUsers = ({
  id,
  handleClickDelete,
}: ButtonActionUsersProps) => {
  return (
    <div className='flex gap-2 justify-end'>
      <Button onClick={handleClickDelete} variant={'destructive'} size={'sm'}>
        Hapus
      </Button>

      <Button size={'sm'} variant={'default'}>
        Detail {id.slice(0, 5)}
      </Button>
    </div>
  )
}

export default ButtonActionUsers
