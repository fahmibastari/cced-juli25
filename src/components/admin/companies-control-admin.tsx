/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { deleteCompany } from '@/actions/admin-action'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import ButtonAction from './utils/action-button'
import { useState } from 'react'
import { FormError } from '../auth/form-error'
import { FormSuccess } from '../auth/form-succsess'

interface CompaniesControlProps {
  companies: any[]
}

const CompaniesControl = ({ companies }: CompaniesControlProps) => {
  const [companiesData, setCompaniesData] = useState<any[]>(companies)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleClickDelete = async (id: string) => {
    try {
      const response = await deleteCompany(id)

      if (response.success) {
        setCompaniesData((prevcompanies) =>
          prevcompanies.filter((company) => company.id !== id)
        )
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
      <h1 className='text-2xl font-bold text-[#025908] mb-4'>
        Tabel Perusahaan
      </h1>
      {errorMessage && <FormError message={errorMessage} />}
      {successMessage && <FormSuccess message={successMessage} />}
      <Table>
        <TableCaption>Daftar List Perusahaan</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Email</TableHead>
            <TableHead>Nama Perusahaan</TableHead>
            <TableHead>Industri</TableHead>
            <TableHead>Status Kepemilikan</TableHead>
            <TableHead>Nomor Telepon</TableHead>
            <TableHead>Nomor Telepon Perusahaan</TableHead>
            <TableHead>Website</TableHead>
            <TableHead>Alamat</TableHead>
            <TableHead>Kota</TableHead>
            <TableHead>Terverisikasi</TableHead>
            <TableHead>ID Perusahaan</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companiesData.map((company: any) => (
            <TableRow key={company.id}>
              <TableCell className='font-medium'>
                {company?.user?.email}
              </TableCell>
              <TableCell>{company?.companyName || '-'}</TableCell>
              <TableCell>{company?.industry || '-'}</TableCell>
              <TableCell>{company?.ownership || '-'}</TableCell>
              <TableCell>{company?.phone || '-'}</TableCell>
              <TableCell>{company?.companyPhone || '-'}</TableCell>
              <TableCell>{company?.website || '-'}</TableCell>
              <TableCell>{company?.address || '-'}</TableCell>
              <TableCell>{company?.city || '-'}</TableCell>
              <TableCell>{company?.isVerified ? 'Ya' : 'Tidak'}</TableCell>
              <TableCell>{company.id}</TableCell>
              <TableCell className='text-right'>
                <ButtonAction
                  id={company.id}
                  handleClickDelete={() => handleClickDelete(company.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  )
}

export default CompaniesControl
