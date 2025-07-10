import { getCompanies, getJobs, getMembers, getUsers } from '@/actions/admin-action'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import { FaUsers, FaBuilding, FaBriefcase, FaUserTie, FaKey } from 'react-icons/fa'
import AdminChangePasswordForm from '@/components/admin/AdminChangePasswordForm'


interface DashboardCardProps {
  title: string
  description: string
  content: string | number | React.ReactNode 
  href: string
  icon?: React.ReactNode
  className?: string
}

const DasboardCard = ({
  title,
  description,
  content,
  href,
  icon,
  className,
}: DashboardCardProps) => {
  return (
    <Card
      className={`${className} transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:rotate-3`}
      style={{
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        borderRadius: '16px',
        overflow: 'hidden',
      }}
    >
      <CardHeader className="bg-gradient-to-r from-green-500 to-green-500 text-white">
        <div className="flex items-center space-x-4">
          {icon && <div className="text-4xl">{icon}</div>}
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold text-gray-800">{content}</p>
      </CardContent>
      <CardFooter className="bg-gray-100">
        <Button
          asChild
          className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:bg-gradient-to-l text-white"
          variant="outline"
        >
          <Link href={href}>Lihat Detail</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

const DashboardAdmin = async () => {
  const users = await getUsers()
  const companies = await getCompanies()
  const members = await getMembers()
  const jobs = await getJobs()

  return (
    <main className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Total Pengguna */}
        <DasboardCard
          title="Total Pengguna"
          description="Penyedia kerja terdaftar"
          content={users?.length || 0}
          href="/admin/users"
          icon={<FaUsers className="text-white text-4xl" />}
          className="bg-white"
        />  
        {/* Total Penyedia Kerja */}
        <DasboardCard
          title="Total Penyedia Kerja"
          description="Penyedia kerja terdaftar"
          content={companies?.length || 0}
          href="/admin/companies"
          icon={<FaBuilding className="text-white text-4xl" />}
          className="bg-white"
        />
        {/* Total Pencari Kerja */}
        <DasboardCard
          title="Total Pencari Kerja"
          description="Pencari kerja terdaftar"
          content={members?.length || 0}
          href="/admin/members"
          icon={<FaUserTie className="text-white text-4xl" />}
          className="bg-white"
        />
        {/* Total Lowongan */}
        <DasboardCard
          title="Total Lowongan"
          description="Lowongan aktif"
          content={0}
          href="/admin/jobs"
          icon={<FaBriefcase className="text-white text-4xl" />}
          className="bg-white"
        />
        {/* Total Lowongan */}
        <DasboardCard
          title="Ganti Password User"
          description="Untuk reset password user"
          href="/admin/passwords"
          icon={<FaKey className="text-white text-4xl" />}
          className="bg-white" content="-"        />
      </div>
    </main>
  )
}

export default DashboardAdmin
