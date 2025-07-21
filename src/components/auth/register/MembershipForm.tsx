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
import { memberSchema } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { startTransition, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { FormSuccess } from '../form-succsess'
import { FormError } from '../form-error'
import { CardWrapper } from '../card-wrapper'
import { Role } from '@prisma/client'
import { registerMember } from '@/actions/register'

type MemberType =
  | 'ALUMNI_UNILA'
  | 'MAHASISWA_UNILA'
  | 'ALUMNI_NON_UNILA'
  | 'MAHASISWA_NON_UNILA'

interface MembershipFormProps {
  onBack: () => void
  data: {
    role: Role
    username: string
    fullname: string
    email: string
    password: string
  }
}

const MembershipForm = ({ onBack, data }: MembershipFormProps) => {
  const router = useRouter()
  const [memberType, setMemberType] = useState<MemberType>('MAHASISWA_UNILA')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isPending, setIsPending] = useState(false)
  const form = useForm<z.infer<typeof memberSchema>>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      role: data.role || 'MEMBER',
      username: data.username || '',
      fullname: data.fullname || '',
      email: data.email || '',
      password: data.password || '',
      confirmPassword: data.password || '',
      memberType: memberType || 'MAHASISWA_UNILA',
      nim: '',
      phone: '',
      studyLevel: '',
      major: '',
    },
  })

  // Sync state memberType dengan form field memberType
  useEffect(() => {
    form.setValue('memberType', memberType)
  }, [memberType, form])

  const handleSubmit = (data: z.infer<typeof memberSchema>) => {
    setErrorMessage('')
    setSuccessMessage('')
    startTransition(() => {
      setIsPending(true)
      registerMember(data).then((data) => {
        if (data?.error) {
          setErrorMessage(data.error)
          setIsPending(false)
          return
        }
        setSuccessMessage(data?.message ?? '')
        setIsPending(false)
        setTimeout(() => {
          router.push('/login')
        }, 1000)
      })
    })
  }

  return (
    <CardWrapper
      headerLabel='Daftar'
      description='Isi formulir di bawah ini untuk membuat akun'
      paragraphSwitchButton='Sudah punya akun? '
      switchButtonLabel='Masuk'
      switchButtonHref='/login'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
          <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
            {[
              { id: 'ALUMNI_UNILA', label: 'Alumni UNILA' },
              { id: 'MAHASISWA_UNILA', label: 'Mahasiswa UNILA' },
              { id: 'ALUMNI_NON_UNILA', label: 'Alumni Non UNILA' },
              { id: 'MAHASISWA_NON_UNILA', label: 'Mahasiswa Non UNILA' },
            ].map((type) => (
              <Button
                key={type.id}
                type='button'
                onClick={() => setMemberType(type.id as MemberType)}
                variant={memberType === type.id ? 'default' : 'secondary'}
                className={`h-auto whitespace-normal py-3 px-4 text-sm text-center rounded-lg transition-all duration-200 ${
                  memberType === type.id
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className='flex flex-col'>
                  {type.label.split(' ').map((word, i) => (
                    <span key={i}>{word}</span>
                  ))}
                </div>
              </Button>
            ))}
          </div>

          <div className='space-y-6'>
            <FormField
              control={form.control}
              name='nim'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NPM</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={
                        form.formState.isSubmitting ||
                        memberType === 'ALUMNI_NON_UNILA' ||
                        memberType === 'MAHASISWA_NON_UNILA'
                      }
                      placeholder='Masukkan NPM Unila'
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
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Telepon</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      placeholder='Nomor telepon'
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
              name='studyLevel'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenjang Pendidikan</FormLabel>
                  <p className="text-xs text-gray-500 mt-1">
  Boleh menggunakan jenjang pendidikan yang sedang berjalan.
</p>
                  <FormControl>
                    <select
                      {...field}
                      disabled={form.formState.isSubmitting}
                      className='border-2 border-gray-100 shadow-sm rounded px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
                    >
                      <option value=''>Pilih Jenjang Pendidikan</option>
                      <option value='SMP'>SMP</option>
                      <option value='SMA'>SMA/SMK Sederajat</option>
                      <option value='D3'>D3</option>
                      <option value='S1'>S1</option>
                      <option value='S2'>S2</option>
                      <option value='S3'>S3</option>
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='major'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program Studi / Jurusan</FormLabel>
                  <p className="text-xs text-gray-500 mt-1">
  Boleh menggunakan Program Studi / Jurusan yang sedang berjalan.
</p>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      placeholder='Masukkan Program Studi / Jurusan'
                      className='border-2 border-gray-100 shadow-sm'
                      type='text'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            {errorMessage && <FormError message={errorMessage} />}
            {successMessage && <FormSuccess message={successMessage} />}
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
                {isPending ? 'Loading...' : 'Lanjut'}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default MembershipForm
