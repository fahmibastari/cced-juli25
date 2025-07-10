'use client'

import { Button } from '@/components/ui/button'
import { CardWrapper } from '../card-wrapper'
import { FaWhatsapp } from 'react-icons/fa' // Import ikon WhatsApp

const ForgotPasswordForm = () => {
  const adminWhatsAppNumber = '6281234567890' // Ganti dengan nomor WhatsApp admin yang valid

  const message = `Halo Admin, saya lupa password untuk akun saya. Email saya adalah: `

  const encodedMessage = encodeURIComponent(message)

  return (
    <CardWrapper
      headerLabel='Lupa Password'
      description='Halaman Lupa Password.'
      paragraphSwitchButton='Sudah ingat password?'
      switchButtonLabel='Kembali ke Login'
      switchButtonHref='/login'
    >
      {/* Card styling */}
      <div className="mt-4 text-center">
        <p className="text-gray-700 mb-6 text-lg font-medium leading-relaxed">
          Jika Anda lupa password, Anda dapat menghubungi admin melalui WhatsApp untuk reset password.
        </p>
        
        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${adminWhatsAppNumber}?text=${encodedMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-green-400 to-green-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105"
        >
          <FaWhatsapp className="inline-block mr-2" /> Hubungi Admin via WhatsApp
        </a>

        {/* Additional Information */}
        <p className="mt-7 text-sm text-gray-600 hover:text-green-500 transition duration-300">
          Klik tombol di atas untuk menghubungi admin melalui WhatsApp dan meminta reset password.
        </p>
      </div>
    </CardWrapper>
  )
}

export default ForgotPasswordForm
