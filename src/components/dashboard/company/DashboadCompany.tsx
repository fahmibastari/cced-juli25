'use client'

import { useState } from 'react'
import DataNotFound from './DataNotFound'
import JobCard from './JobCard'
import Search from './Search'
import { Job } from '@prisma/client'
import { deleteJob } from '@/actions/company-action'
import NavMenu from './NavMenu'

interface DashboardCompanyProps {
  jobs: Job[]
}

const DashboardCompany = ({ jobs }: DashboardCompanyProps) => {
  const [jobsData, setJobsData] = useState<Job[]>(jobs)
  const [filter, setFilter] = useState<string>('all')

  const handleClickDelete = async (id: string) => {
    const updatedJobs = jobsData.filter((job) => job.id !== id)
    setJobsData(updatedJobs)
    await deleteJob(id)
  }

  const applyFilter = () => {
    switch (filter) {
      case 'aktif':
        return jobsData.filter((job) => job.status === 'aktif')
      case 'nonaktif':
        return jobsData.filter((job) => job.status === 'nonaktif')
      case 'selesai':
        return jobsData.filter((job) => job.status === 'selesai')
      case 'draft':
        return jobsData.filter((job) => job.status === 'draft')
      default:
        return jobsData
    }
  }

  const jobsDataFiltered = applyFilter()

  return (
    <div>
      <hr className='h-1 w-full' />
      <Search />
      <hr className='h-1 w-full' />
      <NavMenu
        handleClickAll={() => setFilter('all')}
        handleClickActive={() => setFilter('aktif')}
        handleClickNonActive={() => setFilter('nonaktif')}
        handleClickDone={() => setFilter('selesai')}
        handleClickDraft={() => setFilter('draft')}
      />
      <div className='container mx-auto p-4'>
        {jobsDataFiltered.length > 0 ? (
          <div className='flex flex-wrap justify-center gap-4'>
            {jobsDataFiltered.map((job) => (
              <JobCard
                key={job.id}
                title={job.title}
                id={job.id}
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
