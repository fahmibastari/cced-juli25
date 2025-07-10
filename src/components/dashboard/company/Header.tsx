import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { User, Building2 } from 'lucide-react'
import Link from 'next/link'

interface HeaderCompanyProps {
  companyName: string
  industri: string
  logo: string
}

const HeaderCompany = ({ companyName, industri, logo }: HeaderCompanyProps) => {
  return (
    <header
      className="
        w-full rounded-2xl mb-6
        flex flex-col md:flex-row items-center justify-between gap-4
        px-6 py-4
        backdrop-blur-xl
        bg-white/60
        border border-white/50 shadow-lg
        transition
      "
      style={{
        background: 'rgba(255,255,255,0.7)',
        WebkitBackdropFilter: 'blur(20px)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Kiri: Logo dan info */}
      <div className="flex items-center gap-4 w-full md:w-auto">
        <Link href="/company/profile" className="block group relative">
          <Avatar className="h-16 w-16 border-2 border-green-400 group-hover:border-green-600 transition-all duration-150 shadow-md">
            <AvatarImage src={logo} alt={companyName} className="object-cover" />
            <AvatarFallback>
              <Building2 className="h-10 w-10 text-green-800" />
            </AvatarFallback>
          </Avatar>
        </Link>
        <div className="min-w-0 flex flex-col gap-1">
          <h2 className="text-xl md:text-2xl font-bold text-green-900 truncate">
            {companyName || 'Penyedia Kerja'}
          </h2>
          <span className="text-sm text-gray-500 font-medium">
            <span className="font-semibold text-green-800">Industri:</span> {industri || '-'}
          </span>
        </div>
      </div>
      {/* Kanan: Tombol */}
      <div className="flex-shrink-0 w-full md:w-auto flex items-center justify-end gap-2">
        <Link href="/company/edit-profile-company" className="block">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full px-5 py-2 text-green-800 font-semibold border-green-200 hover:border-green-400 hover:bg-green-50 transition shadow"
          >
            Edit Profil
          </Button>
        </Link>
        <Link href="/company/add-job" className="block">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full px-5 py-2 bg-green-500 text-white font-semibold hover:bg-green-600 border-0 shadow"
          >
            Tambah Lowongan
          </Button>
        </Link>
      </div>
    </header>
  )
}

export default HeaderCompany
