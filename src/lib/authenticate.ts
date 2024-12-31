import { auth } from '@/auth'
import { getUserTypeById } from '@/data/userRole'

export const currentUser = async () => {
  const data = await auth()
  return data?.user
}

export const currentUserRole = async () => {
  const data = await auth()
  return data?.user.role
}

export const currentDetailUser = async () => {
  const user = await auth()
  const data = await getUserTypeById(user?.user.id || '')
  return data
}
