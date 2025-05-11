'use client'

import { login } from '@/actions/login'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signInSchema } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import Link from 'next/link'
import { startTransition, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { FormSuccess } from '../form-succsess'
import { FormError } from '../form-error'
import { CardWrapper } from '../card-wrapper'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isPending, setIsPending] = useState(false)
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '12345678',
    },
  })
  function handleClickShowPassword() {
    setShowPassword(!showPassword)
  }
  const onSubmit = (data: z.infer<typeof signInSchema>) => {
    setErrorMessage('')
    setSuccessMessage('')
    startTransition(() => {
      setIsPending(true)
      login(data).then((data) => {
        setSuccessMessage(data?.success ?? '')
        setErrorMessage(data?.error ?? '')
        setIsPending(false)
      })
    })
  }
  return (
    <CardWrapper
      headerLabel='Selamat Datang!'
      description='Masuk menggunakan akun yang sudah kamu daftarkan'
      paragraphSwitchButton="Belum punya akun? "
      switchButtonLabel='Daftar'
      switchButtonHref='/register'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      placeholder='Masukkan alamat email'
                      className='border-2 border-gray-100 shadow-sm'
                      type='email'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='relative'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={form.formState.isSubmitting}
                        placeholder='Password'
                        className='border-2 border-gray-100 shadow-sm'
                        type={showPassword ? 'text' : 'password'}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='absolute right-2 top-3/4 -translate-y-1/2'
                onClick={handleClickShowPassword}
              >
                {showPassword ? (
                  <EyeOffIcon className='h-4 w-4' />
                ) : (
                  <EyeIcon className='h-4 w-4' />
                )}
              </Button>
            </div>
            <div className='flex justify-end'>
              <Button
                variant='link'
                className='p-0 text-green-500 hover:text-green-600'
              >
                <Link href={'/forgot-password'}>Lupa Password?</Link>
              </Button>
            </div>
            {errorMessage && <FormError message={errorMessage} />}
            {successMessage && <FormSuccess message={successMessage} />}
            <Button
              type='submit'
              disabled={form.formState.isSubmitting || isPending}
              className='w-full bg-green-500 text-white hover:bg-green-600'
            >
              {isPending ? 'Loading...' : 'Masuk'}
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  )
}
