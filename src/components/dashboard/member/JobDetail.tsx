'use client'

import { Button } from '@/components/ui/button'
import { Bookmark, Share2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface Job {
  title: string
  location: string
  isBookmarked?: boolean
  image?: string
  requirements?: string[]
  skills?: string[]
  description?: string
}

interface JobDetailProps {
  job: Job
  onClickQuickApply: () => void
}

const JobDetail = ({ job, onClickQuickApply }: JobDetailProps) => {
  const [isBookmarked, setIsBookmarked] = useState(job.isBookmarked || false)

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked)
  }

  return (
    <div className='space-y-6 rounded-md border border-gray-200 p-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>{job.title}</h2>
        <div className='space-x-2'>
          <Button variant='ghost' size='icon'>
            <Share2 className='h-4 w-4' />
          </Button>
          <Button variant='ghost' size='icon' onClick={handleBookmarkClick}>
            <Bookmark
              className={`h-5 w-5 ${isBookmarked ? 'text-blue-500' : 'text-gray-500'}`}
              fill={isBookmarked ? 'currentColor' : 'none'}
            />
          </Button>
          <Button onClick={onClickQuickApply}>Quick Apply</Button>
        </div>
      </div>

      <Image
        src={
          job.image ||
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
        }
        alt={job.title}
        width={1920}
        height={1080}
        priority
        className='h-96 w-full object-cover'
      />

      <div className='space-y-4'>
        {job.requirements && job.requirements.length > 0 && (
          <section>
            <h3 className='mb-2 font-semibold'>Persyaratan</h3>
            <ul className='list-disc space-y-1 pl-5'>
              {job.requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
          </section>
        )}

        {job.skills && job.skills.length > 0 && (
          <section>
            <h3 className='mb-2 font-semibold'>Skills</h3>
            <ul className='list-disc space-y-1 pl-5'>
              {job.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </section>
        )}

        {job.description && (
          <section>
            <h3 className='mb-2 font-semibold'>Deskripsi Pekerjaan</h3>
            <p className='text-gray-600'>{job.description}</p>
          </section>
        )}
      </div>
    </div>
  )
}

export default JobDetail
