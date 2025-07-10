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

// Tambahkan 'className' ke dalam interface
interface DashboardCardProps {
  title: string
  description: string
  content: number
  href: string
  icon?: React.ReactNode // Menambahkan properti icon sebagai ReactNode
  className?: string // Menambahkan className sebagai opsional
}

const DasboardCard = ({
  title,
  description,
  content,
  href,
  icon,
  className, // Tambahkan className ke dalam destrukturisasi props
}: DashboardCardProps) => {
  return (
    <Card className={className}> {/* Pastikan className diteruskan ke Card */}
      <CardHeader>
        <div className="flex items-center space-x-4">
          {icon && <div className="text-3xl">{icon}</div>} {/* Menampilkan icon jika ada */}
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{content}</p>
      </CardContent>
      <CardFooter>
        <Button
          asChild
          className="w-full bg-green-200 hover:bg-green-600 hover:text-white"
          variant="outline"
        >
          <Link href={href}>Lihat Detail</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default DasboardCard
