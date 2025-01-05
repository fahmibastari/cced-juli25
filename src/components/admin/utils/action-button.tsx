'use client'

import { Button } from '@/components/ui/button'

interface ButtonActionProps {
  id: string
  handleClickDelete?: () => void
}

const ButtonAction = ({ id, handleClickDelete }: ButtonActionProps) => {
  return (
    <div className='flex gap-4 justify-end'>
      <Button onClick={handleClickDelete} variant={'destructive'} size={'sm'}>
        Hapus
      </Button>

      <Button size={'sm'} variant={'default'}>
        Detail {id.slice(0, 5)}
      </Button>
    </div>
  )
}

export default ButtonAction
