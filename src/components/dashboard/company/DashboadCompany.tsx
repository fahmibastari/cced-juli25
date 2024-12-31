import { getJobById } from '@/data/data'
import DataNotFound from './DataNotFound'
import JobCard from './JobCard'
// import NavMenu from './NavMenu'
import Search from './Search'
import { ExtendedUser } from '@/next-auth'

interface DashboardCompanyProps {
  user: ExtendedUser
}

const DashboardCompany = async ({ user }: DashboardCompanyProps) => {
  const jobs = await getJobById(user.id || '')
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
        {jobs ? (
          <div className='flex flex-wrap justify-center gap-4'>
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                title={job.title}
                location={job.location || ''}
                createdAt={job.createdAt.toLocaleDateString()}
                totalApplicants={2}
                inReview={2}
                inCommunication={2}
                notSuitable={2}
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
