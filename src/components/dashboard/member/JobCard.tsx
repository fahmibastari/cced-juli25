'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User } from 'lucide-react'
import Link from 'next/link'

interface JobCardProps {
  jobId: string
  userId: string
  companyLogo?: string
  companyName: string
  title: string
  location: string
  deadline: Date
  salary?: string
  onSelectJob: () => void
}

const JobCard = ({
  jobId,
  userId,
  companyLogo,
  companyName,
  title,
  location,
  deadline,
  salary,
  onSelectJob,
}: JobCardProps) => {
  return (
    <Card
      className='relative mb-4 cursor-pointer focus:bg-gray-100'
      onClick={onSelectJob}
    >
      <CardHeader className='relative flex flex-col space-y-0 pb-2'>
        <div className='mb-2 flex justify-between'>
          <div className='flex items-center space-x-2'>
            <Avatar className='h-6 w-6'>
              <AvatarImage src={companyLogo} />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
            <div className='text-sm text-gray-500'>{companyName}</div>
          </div>
        </div>

        <CardTitle className='text-lg font-bold'>{title}</CardTitle>
        <div className='text-sm'>{location}</div>
      </CardHeader>
      <CardContent>
        <div className='flex items-center justify-between'>
          <div className='space-y-1'>
            <p className='text-sm text-gray-500'>
              Deadline: {deadline.toLocaleDateString('id-ID')}
            </p>
            {salary && <p className='text-sm font-medium'>{salary}</p>}
          </div>
          <Button>
            <Link href={`/member/apply-job?token=${jobId}&user=${userId}`}>
              apply
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default JobCard
