'use client'

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
import { userSchema } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import Link from 'next/link'
import { startTransition, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { FormSuccess } from '../form-succsess'
import { FormError } from '../form-error'
import { CardWrapper } from '../card-wrapper'

interface RegistrationFormProps {
  onSubmit: (formData: {
    username: string
    fullname: string
    email: string
    password: string
    confirmPassword: string
  }) => void
  onBack: () => void
  data: {
    username: string
    fullname: string
    email: string
    password: string
    confirmPassword: string
  }
}

const RegistrationFormCompany = ({
  onBack,
  onSubmit,
  data,
}: RegistrationFormProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isPending, setIsPending] = useState(false)
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      role: 'MEMBER',
      username: data.username || '',
      fullname: data.fullname || '',
      email: data.email || '',
      password: data.password || '',
      confirmPassword: data.confirmPassword || '',
    },
  })

  function handleClickShowPassword() {
    setShowPassword(!showPassword)
  }
  const handleSubmit = (data: z.infer<typeof userSchema>) => {
    setErrorMessage('')
    setSuccessMessage('')
    const { username, fullname, email, password, confirmPassword } = data
    const submitData = {
      username,
      fullname,
      email,
      password,
      confirmPassword,
    }
    startTransition(() => {
      onSubmit(submitData)
      setIsPending(true)
    })
  }
  return (
    <CardWrapper
      headerLabel='Register'
      description='Fill the form below to create an account'
      paragraphSwitchButton='Already have an account? '
      switchButtonLabel='Sign In'
      switchButtonHref='/login'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
          <div className='space-y-6'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      placeholder='Username'
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
              name='fullname'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      placeholder='fullname'
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
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      placeholder='Enter an email address'
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
                        placeholder='********'
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
            <div className='relative'>
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={form.formState.isSubmitting}
                        placeholder='********'
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
                <Link href={'/forgot-password'}>Forgot Password?</Link>
              </Button>
            </div>
            {errorMessage && <FormError message={errorMessage} />}
            {successMessage && <FormSuccess message={successMessage} />}
            <div className='flex justify-between pt-4'>
              <Button
                type='button'
                disabled={form.formState.isSubmitting || isPending}
                className='w-full bg-slate-500 text-white hover:bg-slate-600 mx-6'
                onClick={onBack}
              >
                {isPending ? 'Loading...' : 'kembali'}
              </Button>
              <Button
                type='submit'
                disabled={form.formState.isSubmitting || isPending}
                className='w-full bg-green-500 text-white hover:bg-green-600 mx-6'
              >
                {isPending ? 'Loading...' : 'lanjut'}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default RegistrationFormCompany
