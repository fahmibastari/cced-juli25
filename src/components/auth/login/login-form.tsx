'use client'

import { login } from '@/actions/login'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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
import Image from 'next/image'
import Link from 'next/link'
import { startTransition, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { FormSuccess } from '../form-succsess'
import { FormError } from '../form-error'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isPending, setIsPending] = useState(false)
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
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
      login(data)
        .then((data) => {
          setSuccessMessage(data?.success ?? '')
          setErrorMessage(data?.error ?? '')
          setIsPending(false)
        })
        .catch(() => {
          setErrorMessage(
            'An unexpected error occurred. Please try again later.'
          )
        })
    })
  }
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4'>
      <div className='w-full max-w-[400px] space-y-8'>
        {/* Logo */}
        <div className='flex justify-center'>
          <Image
            src=''
            alt='Logo'
            className='h-10 object-contain'
            width={1600}
            height={1600}
          />
        </div>
        <Card className='border-none shadow-lg'>
          <CardContent className='pt-6'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
              >
                <div className='mb-14 text-center'>
                  <h1 className='mb-0 pb-0 text-2xl font-semibold text-gray-700'>
                    👋Hello and Welcome Back!
                  </h1>
                </div>
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
                            placeholder='youremail@gmail.com'
                            type='email'
                            disabled={form.formState.isSubmitting}
                            className='border-0 bg-gray-100'
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
                              placeholder='******'
                              type={showPassword ? 'text' : 'password'}
                              disabled={form.formState.isSubmitting}
                              className='border-0 bg-gray-100'
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
                      className='absolute right-2 top-1/2 -translate-y-1/2'
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
                  <Button
                    type='submit'
                    disabled={form.formState.isSubmitting || isPending}
                    className='w-full bg-green-500 text-white hover:bg-green-600'
                  >
                    {isPending ? 'Loading...' : 'Sign In'}
                  </Button>
                </div>
                <div className='text-center'>
                  <p className='mx-0 mt-0 pt-0 text-sm text-gray-600'>
                    Don&lsquo;t have an account?{' '}
                    <Link
                      href={'/register'}
                      className={`${buttonVariants({
                        variant: 'link',
                      })} mx-0 p-0 text-sm text-green-500 hover:text-green-600`}
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
