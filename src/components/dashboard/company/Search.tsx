import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

const Seacrh = () => {
  return (
    <div className='flex items-center justify-between'>
      <div className='my-4 ml-[340px] flex justify-center gap-2 w-full'>
        <Input placeholder='Cari Lowongan Kamu' className='max-w-sm' />
        <Button variant='outline'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='h-4 w-4'
          >
            <circle cx='11' cy='11' r='8' />
            <path d='m21 21-4.3-4.3' />
          </svg>
        </Button>
      </div>
      <Button variant='outline' className='mr-40'>
        <Link href='company/add-job'>Tambah Lowongan</Link>
      </Button>
    </div>
  )
}

export default Seacrh
