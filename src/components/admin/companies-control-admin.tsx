'use client'

import { deleteCompany, verifyCompanyByUserId } from '@/actions/admin-action'
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
import { useState, useMemo } from 'react'
import { FormError } from '../auth/form-error'
import { FormSuccess } from '../auth/form-succsess'
import ExcelJS from 'exceljs'
import { Input } from '@/components/ui/input'
import { useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, flexRender, ColumnDef } from '@tanstack/react-table'
import { Company, User, File } from '@prisma/client'

interface CompaniesControlProps {
  companies: any[]
}

interface ExtendedCompany extends Company {
  user: User;  // Menambahkan relasi 'user' di ExtendedCompany
  berkas?: File;
}


const CompaniesControl = ({ companies }: CompaniesControlProps) => {
  const [companiesData, setCompaniesData] = useState<ExtendedCompany[]>(companies);
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const itemsPerPage = 10
  

  const sanitizeFileName = (name: string) => name.replace(/[/\\?%*:|"<>]/g, '-')

  const handleDownloadExcel = async () => {
    if (!companiesData.length) return

    const workbook = new ExcelJS.Workbook()
    const sheet = workbook.addWorksheet('Companies')

    sheet.columns = [
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Nama Perusahaan', key: 'companyName', width: 25 },
      { header: 'Industri', key: 'industry', width: 20 },
      { header: 'Status Kepemilikan', key: 'ownership', width: 20 },
      { header: 'Telepon', key: 'phone', width: 20 },
      { header: 'Telepon Perusahaan', key: 'companyPhone', width: 20 },
      { header: 'Website', key: 'website', width: 30 },
      { header: 'Alamat', key: 'address', width: 40 },
      { header: 'Kota', key: 'city', width: 20 },
      { header: 'Terverifikasi', key: 'isVerified', width: 15 },
      { header: 'ID', key: 'id', width: 30 },
    ]

    companiesData.forEach((company) => {
      sheet.addRow({
        email: company?.user?.email || '',
        companyName: company?.companyName || '',
        industry: company?.industry || '',
        ownership: company?.ownership || '',
        phone: company?.phone || '',
        companyPhone: company?.companyPhone || '',
        website: company?.website || '',
        address: company?.address || '',
        city: company?.city || '',
        isVerified: company?.isVerified ? 'Ya' : 'Tidak',
        id: company?.id || '',
      })
    })

    sheet.getRow(1).font = { bold: true }
    sheet.getRow(1).alignment = { horizontal: 'center' }

    const wrapKeys = ['address', 'website']
    wrapKeys.forEach((key) => {
      sheet.getColumn(key).alignment = { wrapText: true }
    })

    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `Daftar_Penyedia_Kerja.xlsx`
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 100)
  }


  const handleClickVerifikasi = async (id: string) => {
    try {
      const response = await verifyCompanyByUserId(id)
      if (response.success) {
        setSuccessMessage(response.success)
        setErrorMessage('')
        setCompaniesData((prev) =>
          prev.map((company) => company.id === id ? { ...company, isVerified: true } : company)
        )
      } else if (response.error) {
        setErrorMessage(response.error)
        setSuccessMessage('')
      }
    } catch {
      setErrorMessage('Terjadi kesalahan saat memverifikasi perusahaan')
      setSuccessMessage('Berhasil Memverivikasi Pengguna')
    }
  }

  const filteredData = useMemo(() => {
    return companiesData.filter((company) => {
      const email = company?.user?.email?.toLowerCase() || ''
      const name = company?.companyName?.toLowerCase() || ''
      return (
        email.includes(searchTerm.toLowerCase()) ||
        name.includes(searchTerm.toLowerCase())
      )
    })
  }, [companiesData, searchTerm])

  const columns = useMemo<ColumnDef<any>[]>(() => [
    {
      accessorKey: 'user.email',
      header: 'Email',
      cell: ({ row }) => row.original?.user?.email || '-',
    },
    {
      accessorKey: 'companyName',
      header: 'Nama Penyedia Kerja',
    },
    {
      accessorKey: 'industry',
      header: 'Industri',
    },
    {
      accessorKey: 'ownership',
      header: 'Status Kepemilikan',
    },
    {
      accessorKey: 'phone',
      header: 'Nomor Telepon',
    },
    {
      accessorKey: 'companyPhone',
      header: 'Nomor Telepon Penyedia Kerja',
    },
    {
      accessorKey: 'website',
      header: 'Website',
    },
    {
      accessorKey: 'address',
      header: 'Alamat',
    },
    {
      accessorKey: 'city',
      header: 'Kota',
    },
    {
      accessorKey: 'isVerified',
      header: 'Terverifikasi',
      cell: ({ row }) => row.original?.isVerified ? 'Ya' : 'Tidak',
    },
    {
      accessorKey: 'id',
      header: 'ID Penyedia Kerja',
    },
    {
      header: 'Aktivitas Akun',
      cell: ({ row }) => {
        const lastLogin = row.original?.user?.lastLogin
        return lastLogin
          ? new Date(lastLogin).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
          : <span className="italic text-gray-400">Belum Pernah Login</span>
      },
    },
    {
      accessorKey: 'berkas',
      header: 'Berkas',
      cell: ({ row }) => {
        return row.original?.berkas ? (
          <a href={row.original?.berkas.src} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            Download
          </a>
        ) : '-';
      },
    },
    {
      header: 'Login Sebagai',
      cell: ({ row }) => {
        return row.original?.berkas ? (
          <input value={row.original?.user?.email} />
        ) : '-';
      },
    },
    {
      header: 'Login Sebagai',
      cell: ({ row }) => {
        return row.original?.berkas ? (
          <input value={row.original?.user?.password} />
        ) : '-';
      },
    },
    {
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => (
        <div className="text-right">
          <ButtonAction
  id={row.original.user.id}  // Kirim user.id untuk verifikasi
  isVerified={row.original.isVerified}
  handleClickVerifikasi={() => handleClickVerifikasi(row.original.user.id)}  // Ganti dengan user.id
/>

        </div>
        
      ),
    },
  ], [handleClickVerifikasi])
  

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })
  const sortedRows = table.getRowModel().rows
  const paginatedRows = sortedRows.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalPages = Math.ceil(sortedRows.length / itemsPerPage)

  return (
    <main className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#025908] mb-2">Tabel Penyedia Kerja</h1>
          <Input
            type="text"
            placeholder="Cari berdasarkan nama atau email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full md:w-96"
          />
        </div>

        <button
          onClick={handleDownloadExcel}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Download Excel
        </button>
      </div>

      {errorMessage && <FormError message={errorMessage} />}
      {successMessage && <FormSuccess message={successMessage} />}

      <Table className="mt-4">
        <TableCaption>Daftar List Penyedia Kerja</TableCaption>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead
                  key={header.id}
                  onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                  className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() === 'asc' ? ' 🔼' : header.column.getIsSorted() === 'desc' ? ' 🔽' : null}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            paginatedRows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                Tidak ada data ditemukan
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-center items-center mt-4 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-2 text-sm text-gray-600">
          Halaman {currentPage} dari {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </main>
  )
}

export default CompaniesControl
