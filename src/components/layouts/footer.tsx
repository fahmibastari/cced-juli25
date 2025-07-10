import Image from 'next/image'
import Link from 'next/link'
import { FaInstagram, FaFacebook, FaTwitter, FaMapMarkerAlt, FaYoutube, FaWhatsapp } from 'react-icons/fa'
import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi'

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white text-sm pt-16 pb-10 mt-auto">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Logo & Deskripsi */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/LOGO-CCED.png"
              alt="Logo CCED"
              width={200}
              height={200}
              className="rounded-md"
            />
            {/* <h2 className="text-xl font-bold">CCED UNILA</h2> */}
          </div>
          <p className="text-neutral-400 leading-relaxed">
            Pusat pengembangan karier & kewirausahaan Universitas Lampung. Platform resmi untuk pencari kerja dan perekrut di lingkungan UNILA.
          </p>
        </div>

        {/* Kontak */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Hubungi Kami</h3>
          <ul className="space-y-2 text-neutral-300">
            <li className="flex items-center gap-2">
              <HiOutlineMail className="text-lg" />
              <Link href="mailto:kemitraan.cced@kpa.unila.ac.id" className="hover:underline">kemitraan.cced@kpa.unila.ac.id</Link>

            </li>
            <li className="flex items-center gap-2">
              <HiOutlinePhone className="text-lg" />
              <Link href="tel:+6281271662745" className="hover:underline">+62822 8168 6132</Link>
            </li>
          </ul>
        </div>

        {/* Lokasi */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Alamat</h3>
          <div className="flex items-start gap-2 text-neutral-300">
            <FaMapMarkerAlt className="text-lg mt-1" />
            <p>
            Gedung Rektorat Lama Lantai 1, Universitas Lampung <br />
Jl. Profesor Doktor Sumantri Brojonegoro No. 1, <br />
Gedong Meneng, Kec. Rajabasa, Kota Bandar Lampung, <br />
Lampung, Indonesia.
            </p>
          </div>
        </div>

        {/* Sosial Media */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Ikuti Kami</h3>
          <div className="flex space-x-4 text-neutral-300">
            <Link href="https://www.instagram.com/cced_unila" target="_blank" aria-label="Instagram" className="hover:text-white">
              <FaInstagram className="text-2xl" />
            </Link>
            <Link href="https://www.youtube.com/@cced_unila" target="_blank" aria-label="Facebook" className="hover:text-white">
              <FaYoutube className="text-2xl" />
            </Link>
            <Link href="https://s.id/ShintaCCED" target="_blank" aria-label="Twitter" className="hover:text-white">
              <FaWhatsapp className="text-2xl" />
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-700 mt-12 pt-6 text-center text-neutral-500">
        © 2025 CCED Universitas Lampung. Semua Hak Dilindungi. | <Link href="/privacy" className="hover:underline">Kebijakan Privasi</Link>
      </div>
    </footer>
  )
}

export default Footer
