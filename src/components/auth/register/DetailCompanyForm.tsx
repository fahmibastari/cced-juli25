'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { companySchema } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { startTransition, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { FormSuccess } from '../form-succsess'
import { FormError } from '../form-error'
import { CardWrapper } from '../card-wrapper'
import { Role } from '@prisma/client'
import { registerCompany } from '@/actions/register'
import { ImagePlus } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'

interface CompanyFormProps {
  onBack: () => void
  data: {
    role: Role
    username: string
    fullname: string
    email: string
    password: string
  }
}

const DetailCompanyForm = ({ onBack, data }: CompanyFormProps) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const router = useRouter()
  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      role: data.role || 'COMPANY',
      username: data.username || '',
      fullname: data.fullname || '',
      email: data.email || '',
      password: data.password || '',
      confirmPassword: data.password || '',
      companyName: '',
      industry: '',
      ownership: '',
      phone: '',
      companyPhone: '',
      website: '',
      publicMail: '',
      bio: '',
    },
  })

  const handleSubmit = (data: z.infer<typeof companySchema>) => {
    setErrorMessage('')
    setSuccessMessage('')
    if (logoFile) {
      data.logo = logoFile
    }
    startTransition(() => {
      setIsPending(true)
      registerCompany(data).then((response) => {
        if (response?.error) {
          setErrorMessage(response.error)
          setIsPending(false)
          return
        }
      
        setSuccessMessage(response?.message ?? '')
        setIsPending(false)
        setTimeout(() => {
          router.push('/login')
        }, 1000)
      })
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const maxSize = 100 * 1024 // 100 KB
      const validTypes = ['image/png', 'image/webp', 'image/jpeg', 'image/jpg']
  
      if (!validTypes.includes(file.type)) {
        setErrorMessage('Hanya file PNG, WebP, JPG, dan JPEG yang diperbolehkan.')
        return
      }
  
      if (file.size > maxSize) {
        setErrorMessage('Ukuran file maksimal 100 KB.')
        return
      }
  
      setErrorMessage('')
      setSuccessMessage('File Berhasil di Upload!')
      setLogoFile(file)
    }
  }
  

  return (
    <CardWrapper
      headerLabel='Register'
      description='Fill the form below to create an account'
      paragraphSwitchButton='Already have an account? '
      switchButtonLabel='Sign In'
      switchButtonHref='/login'
      size='w-full max-w-4xl'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
          {/* Logo Upload Section */}
          <div>
            <FormLabel>Logo Perusahaan</FormLabel>
            <div className='mt-2 cursor-pointer rounded-lg border-2 border-dashed p-4 text-center'>
              <input
                type='file'
                accept='.png,.webp,.jpg,.jpeg'
                className='hidden'
                id='logo-upload'
                onChange={handleFileChange}
              />
              <label htmlFor='logo-upload' className='cursor-pointer'>
                <div className='flex flex-col items-center w-full h-40 justify-center gap-8'>
                  <ImagePlus className='h-10 w-10 text-gray-400' />
                  <div className='text-sm text-gray-600'>
                    Set logo perusahaan. Hanya file berformat *.png, *.webp ,*.jpg dan *.jpeg
                    dengan ukuran maksimal 100 KB.
                  </div>
                  {logoFile && (
                    <div className='text-sm text-green-600'>
                      File terpilih: {logoFile.name}
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='companyName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Perusahaaan</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={form.formState.isSubmitting}
                        placeholder='Nama Perusahaan'
                        className='border-2 border-gray-100 shadow-sm'
                        type='text'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='industry'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bidang Industry</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={form.formState.isSubmitting}
                        placeholder='Bidang Industry'
                        className='border-2 border-gray-100 shadow-sm'
                        type='text'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField
              control={form.control}
              name='ownership'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kepemilikan Perusahaan</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      disabled={form.formState.isSubmitting}
                      className='w-full border-2 border-gray-100 bg-white shadow-sm rounded-md p-2'
                    >
                      <option value=''>Pilih Kepemilikan</option>
                      <option value='Perusahaan kecil'>Perusahaan kecil</option>
                      <option value='Perusahaan menengah'>Perusahaan menengah</option>
                      <option value='Perusahaan besar'>Perusahaan besar</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Telephone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={form.formState.isSubmitting}
                        placeholder='Nomor Telephone'
                        className='border-2 border-gray-100 shadow-sm'
                        type='text'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='companyPhone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Telephone Perusahaan</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={form.formState.isSubmitting}
                        placeholder='Nomor Telephone Perusahaan'
                        className='border-2 border-gray-100 shadow-sm'
                        type='text'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='website'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website Perusahaan</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={form.formState.isSubmitting}
                        placeholder='Website Perusahaan'
                        className='border-2 border-gray-100 shadow-sm'
                        type='text'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='publicMail'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat Email Public</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={form.formState.isSubmitting}
                        placeholder='Alamat Email Public'
                        className='border-2 border-gray-100 shadow-sm'
                        type='text'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='bio'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biodata Perusahaan</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={form.formState.isSubmitting}
                        placeholder='Biodata Perusahaan'
                        className='border-2 border-gray-100 shadow-sm h-[216px]'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Error and Success Messages */}
          {errorMessage && <FormError message={errorMessage} />}
          {successMessage && <FormSuccess message={successMessage} />}

          {/* Action Buttons */}
          <div className='flex justify-between pt-4'>
            <Button
              type='button'
              disabled={form.formState.isSubmitting || isPending}
              className='w-full bg-slate-500 text-white hover:bg-slate-600 mx-6'
              onClick={onBack}
            >
              {isPending ? 'Loading...' : 'Kembali'}
            </Button>
            <Button
              type='submit'
              disabled={form.formState.isSubmitting || isPending}
              className='w-full bg-green-500 text-white hover:bg-green-600 mx-6'
            >
              {isPending ? 'Loading...' : 'Daftar'}
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default DetailCompanyForm
