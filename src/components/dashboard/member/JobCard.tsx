'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bookmark } from 'lucide-react'
import { useState } from 'react'

interface Job {
  companyLogo?: string
  company: string
  title: string
  location: string
  deadline: string
  salary?: string
  isBookmarked?: boolean
}

interface JobCardProps {
  job: Job
  onClickQuickApply: () => void
  onSelectJob: () => void
}

const JobCard = ({ job, onClickQuickApply, onSelectJob }: JobCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(job.isBookmarked || false)

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked)
  }

  return (
    <Card
      className='relative mb-4 cursor-pointer focus:bg-gray-100'
      onClick={onSelectJob}
    >
      <CardHeader className='relative flex flex-col space-y-0 pb-2'>
        <div className='mb-2 flex justify-between'>
          <div className='flex items-center space-x-2'>
            <Avatar className='h-6 w-6'>
              <AvatarImage src={job.companyLogo} />
              <AvatarFallback>logo</AvatarFallback>
            </Avatar>
            <div className='text-sm text-gray-500'>{job.company}</div>
          </div>
          {/* Bookmark Icon di Pojok Kanan */}
          <div className='cursor-pointer' onClick={handleBookmarkClick}>
            <Bookmark
              onClick={handleBookmarkClick}
              className={`h-5 w-5 ${isBookmarked ? 'fill-current text-blue-500' : 'text-gray-500'}`}
              fill={isBookmarked ? 'currentColor' : 'none'}
            />
          </div>
        </div>

        <CardTitle className='text-lg font-bold'>{job.title}</CardTitle>
        <div className='text-sm'>{job.location}</div>
      </CardHeader>
      <CardContent>
        <div className='flex items-center justify-between'>
          <div className='space-y-1'>
            <p className='text-sm text-gray-500'>Deadline: {job.deadline}</p>
            {job.salary && <p className='text-sm font-medium'>{job.salary}</p>}
          </div>
          <Button
            onClick={(e) => {
              e.stopPropagation()
              onClickQuickApply()
            }}
            size='sm'
          >
            Apply
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default JobCard
