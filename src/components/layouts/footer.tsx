import { Label } from '../ui/label'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer
      id='kontak'
      className='bg-gradient-to-r from-[#025908] to-[#038f0a] py-16 text-white shadow-2xl'
    >
      <div className='container mx-auto flex flex-col items-center justify-center text-center'>
        <Label className='mb-6 text-2xl font-bold'>Hubungi Kami</Label>
        <Label className='mt-2'>
          Email:{' '}
          <Link
            href='mailto:info@jobconnect.com'
            className='text-gray-200 underline'
          >
            {' '}
            wildan.cooliah@gmail.com
          </Link>
        </Label>
        <Label className='mt-2'>
          Telepon:{' '}
          <Link href='tel:+6281234567890' className='text-gray-200 underline'>
            {' '}
            +62 812 3456 7890
          </Link>
        </Label>
        <Label className='mt-4 text-sm'>
          © 2024 CCED. Semua Hak Dilindungi.
        </Label>
      </div>
    </footer>
  )
}
export default Footer
