/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Filter from './Filter'
import JobCard from './JobCard'
import JobDetail from './JobDetail'
import NavMenu from './NavMenu'
import Search from './Search'
import React, { useState } from 'react'

interface DashboardMemberProps {
  jobs: any
}

const DashboardMember = ({ jobs }: DashboardMemberProps) => {
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
                    companyLogo={job.companyLogo}
                    companyName={job.companyName}
                    title={job.title}
                    location={job.location}
                    deadline={job.deadline}
                    salary={job.salary}
                    onClickQuickApply={handleQuickApply}
                    onSelectJob={() => handleSelectJob(job)}
                  />
                )
              )}
            </div>

            {/* Job Detail */}
            <div className='md:col-span-2'>
              <JobDetail
                detailData={selectedJob}
                onClickQuickApply={handleQuickApply}
              />
            </div>
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
