'use client'

import DataNotFound from './DataNotFound'
import Header from './Header'
import JobCard from './JobCard'
import NavMenu from './NavMenu'
import Search from './Search'

// import { Label } from '@/components/ui/label'

const DashboardCompany = () => {
  const handleEdit = () => {
    console.log('Edit clicked')
  }

  const handleDelete = () => {
    console.log('Delete clicked')
  }

  const handleDetail = () => {
    console.log('Detail clicked')
  }

  const handleClickAll = () => {
    console.log('All clicked')
  }

  const handleClickActive = () => {
    console.log('Active clicked')
  }

  const handleClickNonActive = () => {
    console.log('Non active clicked')
  }

  const handleClickDone = () => {
    console.log('Done clicked')
  }

  const handleClickDraft = () => {
    console.log('Draft clicked')
  }

  const handleClickEdit = () => {
    console.log('Edit clicked')
  }

  const handleClickAddJob = () => {
    console.log('Add job clicked')
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <Header handleClickEdit={handleClickEdit} />
      <hr className='h-1 w-full' />
      <Search />
      <hr className='h-1 w-full' />
      <NavMenu
        handleClickAll={handleClickAll}
        handleClickActive={handleClickActive}
        handleClickNonActive={handleClickNonActive}
        handleClickDone={handleClickDone}
        handleClickDraft={handleClickDraft}
      />
      <div className='container mx-auto p-4'>
        <div className='flex flex-wrap justify-center gap-4'>
          <JobCard
            title='Asisten Operasional'
            location='Bandar Lampung'
            createdAt='7 July 2024'
            totalApplicants={15}
            inReview={8}
            inCommunication={5}
            notSuitable={2}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleDetail={handleDetail}
          />
          <JobCard
            title='Asisten Operasional'
            location='Bandar Lampung'
            createdAt='7 July 2024'
            totalApplicants={15}
            inReview={8}
            inCommunication={5}
            notSuitable={2}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleDetail={handleDetail}
          />
          <DataNotFound handleClickAddJob={handleClickAddJob} />
        </div>
      </div>
    </div>
  )
}

export default DashboardCompany
