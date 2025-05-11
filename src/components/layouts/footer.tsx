import { Label } from '../ui/label'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer
      id='kontak'
      className='bg-gradient-to-r from-[#025908] to-[#038f0a] py-16 text-white shadow-2xl mt-auto'
    >
      <div className='container mx-auto text-center flex flex-col lg:flex-row justify-between'>
        {/* Kiri: Hubungi Kami dan Sosial Media */}
        <div className='flex flex-col items-center lg:items-start mb-10 lg:mb-0'>
          {/* Hubungi Kami Section */}
          <div className='mb-10'>
            <Label className='mb-6 text-2xl font-bold'>Hubungi Kami</Label>
            <div className='space-y-4'>
              <Label className='mt-2'>
                Email:{' '}
                <Link
                  href='mailto:fahmibastari549l@gmail.com'
                  className='text-gray-200 underline'
                >
                  fahmibastari549@gmail.com
                </Link>
              </Label>
              <br />
              <Label className='mt-2'>
                Telepon:{' '}
                <Link href='tel:+6281234567890' className='text-gray-200 underline'>
                  +62 812 7166 2745
                </Link>
              </Label>
            </div>
          </div>

          {/* Ikon Sosial Media */}
          <div className='space-x-6 flex justify-center mb-10'>
            <Link href='https://www.instagram.com/' target='_blank'>
              <i className='fab fa-instagram text-2xl text-gray-200 hover:text-white'></i>
            </Link>
            <Link href='https://www.facebook.com/' target='_blank'>
              <i className='fab fa-facebook text-2xl text-gray-200 hover:text-white'></i>
            </Link>
            <Link href='https://twitter.com/' target='_blank'>
              <i className='fab fa-twitter text-2xl text-gray-200 hover:text-white'></i>
            </Link>
          </div>
        </div>

        {/* Kanan: Lokasi Kami */}
        <div className='flex flex-col items-center lg:items-start'>
          <Label className='text-2xl font-bold mb-4'>Lokasi Kami</Label>
          <div className='w-full md:w-3/4 lg:w-2/3 pt-4'>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.338453646342!2d105.2434478!3d-5.365235800000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40c5357a2a520b%3A0x9b9f907791382072!2sUPT%20Pengembangan%20Karier%20dan%20Kewirausahaan%20-%20Unila!5e0!3m2!1sid!2sid!4v1745677879448!5m2!1sid!2sid"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className='rounded-md'
            ></iframe>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className='mt-10 text-center'>
        <Label className='mt-4 text-sm'>
          © 2025 CCED. Semua Hak Dilindungi.
        </Label>
      </div>
    </footer>
  )
}

export default Footer
