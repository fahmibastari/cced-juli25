'use client'

import { deleteUser } from '@/actions/admin-action'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import ButtonActionUsers from './utils/user-action-button'
import { useState } from 'react'
import { User } from '@prisma/client'
import { FormError } from '../auth/form-error'
import { FormSuccess } from '../auth/form-succsess'

interface UsersControlProps {
  users: User[]
}

const UsersControl = ({ users }: UsersControlProps) => {
  const [usersData, setUsersData] = useState<User[]>(users)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleClickDelete = async (id: string) => {
    try {
      const response = await deleteUser(id)

      if (response.success) {
        setUsersData((prevUsers) => prevUsers.filter((user) => user.id !== id))
        setSuccessMessage(response.success)
        setErrorMessage('')
      } else if (response.error) {
        setErrorMessage(response.error)
        setSuccessMessage('')
      }
    } catch {
      setErrorMessage('Terjadi kesalahan saat menghapus pengguna')
      setSuccessMessage('')
    }
  }

  return (
    <main className='p-6'>
      <h1 className='text-2xl font-bold text-[#025908] mb-4'>Tabel Pengguna</h1>
      {errorMessage && <FormError message={errorMessage} />}
      {successMessage && <FormSuccess message={successMessage} />}
      <Table>
        <TableCaption>Daftar List Pengguna</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Email</TableHead>
            <TableHead>Nama Lengkap</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>ID</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersData.map((user: User) => (
            <TableRow key={user.id}>
              <TableCell className='font-medium'>{user.email}</TableCell>
              <TableCell>{user.fullname}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.id}</TableCell>
              <TableCell className='text-right'>
                <ButtonActionUsers
                  id={user.id}
                  handleClickDelete={() => handleClickDelete(user.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  )
}

export default UsersControl
