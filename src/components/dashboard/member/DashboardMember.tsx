/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import Filter from './Filter'
import JobCard from './JobCard'
import JobDetail from './JobDetail'
import NavMenu from './NavMenu'
import Search from './Search'
import React, { useState } from 'react'
import { User } from '@prisma/client'

interface DashboardMemberProps {
  jobs: any
  user: User
}

const DashboardMember = ({ jobs, user }: DashboardMemberProps) => {
  const [selectedJob, setSelectedJob] = useState<any>(jobs[0] || null)
  const handleQuickApply = () => {
    console.log('Quick apply clicked')
  }

  const handleSelectJob = (job: any) => {
    setSelectedJob(job)
    console.log(`Selected job: ${job.title}`)
  }

  const handleClickForYou = () => {
    console.log('Untuk kamu clicked')
  }

  const handleClickFind = () => {
    console.log('Cari clicked')
  }

  const handleClickActivity = () => {
    console.log('Aktifitas clicked')
  }

  return (
    <div className='container mx-auto max-w-6xl p-4'>
      <div className='mb-6'>
        <Search />
        <hr className='h-1 w-full border-gray-200' />
        <Filter />
        <hr className='h-1 w-full border-gray-200' />
        <NavMenu
          handleClickForYou={handleClickForYou}
          handleClickFind={handleClickFind}
          handleClickActivity={handleClickActivity}
        />
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        {jobs.length > 0 ? (
          <>
            {/* Job List */}
            <ScrollArea className='h-[1000px] w-full rounded-md px-4 shadow-sm mb-4'>
              <div className='space-y-4'>
                {jobs.map(
                  (job: {
                    id: React.Key | null | undefined
                    companyLogo: string | undefined
                    companyName: string
                    title: string
                    location: string
                    deadline: Date
                    salary: string | undefined
                  }) => (
                    <JobCard
                      key={job.id}
                      jobId={job.id as string}
                      userId={user.id}
                      companyLogo={job.companyLogo}
                      companyName={job.companyName}
                      title={job.title}
                      location={job.location}
                      deadline={job.deadline}
                      salary={job.salary}
                      onSelectJob={() => handleSelectJob(job)}
                    />
                  )
                )}
              </div>
              <ScrollBar orientation='vertical' />
            </ScrollArea>

            {/* Job Detail */}
            <ScrollArea className='h-[1000px] md:col-span-2 w-full rounded-md px-4 shadow-sm mb-4'>
              <div className='w-full h-full'>
                <JobDetail
                  detailData={selectedJob}
                  onClickQuickApply={handleQuickApply}
                />
              </div>
              <ScrollBar orientation='vertical' />
            </ScrollArea>
          </>
        ) : (
          // No Jobs Available Message
          <div className='col-span-3 text-lg font-semibold text-gray-500 text-center'>
            Tidak ada lowongan
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardMember
