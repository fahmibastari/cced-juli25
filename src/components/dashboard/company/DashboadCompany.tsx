'use client'

import useCurrentUser from '@/hooks/useCurrentUser'
import DataNotFound from './DataNotFound'
import Header from './Header'
import JobCard from './JobCard'
import NavMenu from './NavMenu'
import Search from './Search'
import { useEffect, useState } from 'react'

const DashboardCompany = () => {
  const user = useCurrentUser()
  const [detailsUser, setDetailsUser] = useState<{
    companyName: string
    industry: string
  } | null>(null)

  useEffect(() => {
    const fetchDetailUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/public/user/get-user-type?id=${user?.id}`
        )
        if (!response.ok) {
          throw new Error('Failed to fetch news')
        }
        const data = await response.json()
        setDetailsUser(data)
      } catch (error) {
        console.error('Error fetching news:', error)
      }
    }

    fetchDetailUser()
  }, [user])

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
      {detailsUser && (
        <Header
          companyName={detailsUser.companyName}
          industri={detailsUser.industry}
          handleClickEdit={handleClickEdit}
        />
      )}
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
        {detailsUser ? (
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
          </div>
        ) : (
          <DataNotFound handleClickAddJob={handleClickAddJob} />
        )}
      </div>
    </div>
  )
}

export default DashboardCompany
