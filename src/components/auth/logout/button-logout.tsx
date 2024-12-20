'use client'

import { signOut } from '@/auth'
import { Button } from '@/components/ui/button'

const ButtonLogout = () => {
  const handleLogout = async () => {
    await signOut()
    console.log('Successfully logged out')
  }

  return (
    <Button variant='destructive' onClick={handleLogout}>
      Logout
    </Button>
  )
}

export default ButtonLogout
