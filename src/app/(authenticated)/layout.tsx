import { getDetailUserCompanyFull } from '@/actions/company-action'
import { getDetailUserMemberFull } from '@/actions/member-action'
import HeaderCompany from '@/components/dashboard/company/Header'
import HeaderMember from '@/components/dashboard/member/Header'
import { currentUser } from '@/lib/authenticate'
import Nav from '@/components/layouts/nav'

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()
   // Default props
   let navUser = null
   let unreadFeedbacks: any[] = []

  if (!user) {
    return (
      <div>
        {/* <h1>ini layout guest</h1> */}
        {children}
      </div>
    )
  }

  if (user.role === 'ADMIN') {
    return (
      <div>
        {/* <h1>ini layout admin</h1> */}
        {children}
      </div>
    )
  }

  if (user.role === 'COMPANY') {
    const detailsUser = await getDetailUserCompanyFull(user?.id || '')
    // Pastikan data user untuk Nav sudah lengkap (fullname, img, companyLogo)
    const navUser = {
      role: 'COMPANY',
      fullname: detailsUser?.fullname || '',
      companyLogo: detailsUser?.company?.logo?.src || '', // ini untuk avatar di UserDropdown
      companyName: detailsUser?.company?.companyName || '',
      // tambah data lain kalau diperlukan
    }
    // Feedbacks company (opsional, biasanya kosong)
    let unreadFeedbacks: any[] = []
  
    return (
      <div>
        <Nav
          isLoggedIn={true}
          user={navUser}
          feedbacks={unreadFeedbacks}
        />
        {children}
      </div>
    )
  }
  

  if (user.role === 'MEMBER') {
    const detailsUser = await getDetailUserMemberFull(user?.id || '')
    navUser = {
      role: 'MEMBER',
      fullname: detailsUser?.fullname || '',
      img: detailsUser?.image?.src || '',
      membertype: detailsUser?.member?.memberType || '',
      studylevel: detailsUser?.member?.studyLevel || '',
      major: detailsUser?.member?.major || '',
    }    
    // Ambil unread feedbacks
  let unreadFeedbacks: any[] = []
  if (detailsUser?.member?.jobApplication) {
    unreadFeedbacks = detailsUser.member.jobApplication.filter((ja: any) =>
      ja.notes && (!ja.notesReadAt || new Date(ja.notesUpdatedAt) > new Date(ja.notesReadAt))
    )
  }
    return (
      <div>
        {detailsUser && (
          <Nav
          isLoggedIn={true}
          user={navUser}
          feedbacks={unreadFeedbacks}
        />        
        )}
        {/* <h1>ini layout member</h1> */}
        {children}
      </div>
    )
  }
}
