'use client'

import AddJob from '@/components/company/add-job-form'
import useCurrentUser from '@/hooks/useCurrentUser'

export default function Page() {
  const user = useCurrentUser()
  if (user?.role !== 'COMPANY') {
    return <div>You dont have a permission!</div>
  }
  return <AddJob />
}
