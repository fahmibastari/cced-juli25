'use client'

import { useState } from 'react'
import DataNotFound from './DataNotFound'
import JobCard from './JobCard'
// import NavMenu from './NavMenu'
import Search from './Search'
import { ExtendedUser } from '@/next-auth'
import { Job } from '@prisma/client'
import { deleteJob } from '@/actions/company-action'

interface DashboardCompanyProps {
  user: ExtendedUser
  jobs: Job[]
}

const DashboardCompany = ({ user, jobs }: DashboardCompanyProps) => {
  const [jobsData, setJobsData] = useState<Job[]>(jobs)
  console.log(user)
  const handleClickDelete = async (id: string) => {
    setJobsData(jobsData.filter((job) => job.id !== id))
    deleteJob(id)
  }

  return (
    <div>
      <hr className='h-1 w-full' />
      <Search />
      <hr className='h-1 w-full' />
      {/* <NavMenu
        handleClickAll={handleClickAll}
        handleClickActive={handleClickActive}
        handleClickNonActive={handleClickNonActive}
        handleClickDone={handleClickDone}
        handleClickDraft={handleClickDraft}
      /> */}
      <div className='container mx-auto p-4'>
        {jobsData.length > 0 ? (
          <div className='flex flex-wrap justify-center gap-4'>
            {jobsData.map((job) => (
              <JobCard
                key={job.id}
                title={job.title}
                status={job.status || ''}
                location={job.location || ''}
                createdAt={job.createdAt.toLocaleDateString()}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                jobApplication={(job as any).jobApplication || []}
                handleDelete={() => handleClickDelete(job.id)}
              />
            ))}
          </div>
        ) : (
          <DataNotFound />
        )}
      </div>
    </div>
  )
}

export default DashboardCompany
