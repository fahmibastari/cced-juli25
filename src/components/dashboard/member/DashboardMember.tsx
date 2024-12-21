'use client'

import Filter from './Filter'
import JobCard from './JobCard'
import JobDetail from './JobDetail'
import NavMenu from './NavMenu'
import Search from './Search'
import { dummyJobs } from '@/data/dummyJob'
import React from 'react'

const DashboardMember = () => {
  const jobs = dummyJobs

  const handleQuickApply = () => {
    console.log('Quick apply clicked')
  }

  const handleSelectJob = () => {
    console.log('Selected job clicked')
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
        <div className='space-y-4'>
          {jobs.map((job, index) => (
            <JobCard
              key={index}
              job={job}
              onClickQuickApply={handleQuickApply}
              onSelectJob={() => handleSelectJob()}
            />
          ))}
        </div>

        <div className='md:col-span-2'>
          <JobDetail job={jobs[2]} onClickQuickApply={handleQuickApply} />
        </div>
      </div>
    </div>
  )
}

export default DashboardMember
