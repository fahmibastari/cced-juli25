'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { resetPasswordSchema } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-succsess'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { changePassword } from '@/actions/change-password'

const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
    },
  })

  const token = useSearchParams().get('token')

  const onSubmitForm = (data: z.infer<typeof resetPasswordSchema>) => {
    setError('')
    setSuccess('')
    console.log(data)
    startTransition(() => {
      changePassword(data, token)
        .then((data) => {
          setError(data.error)
          setSuccess(data.success)
        })
        .catch(() => {
          setError('Something went wrong!')
        })
    })
  }
  return (
    <div className='w-full flex items-center justify-center h-screen'>
      <Card className='w-full max-w-lg p-4 items-center'>
        <CardHeader className='space-y-1 flex flex-col gap-3 items-center'>
          <CardTitle className='text-4xl font-semibold text-[#025908]'>
            Reset Password
          </CardTitle>
          <CardDescription>Reset Your Password</CardDescription>
        </CardHeader>
        <CardContent>
          {' '}
          <Form {...form}>
            <form
              action=''
              onSubmit={form.handleSubmit(onSubmitForm)}
              className='space-y-6 flex flex-col gap-4'
            >
              <div className='space-y-4'>
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='********'
                          type='password'
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {error && <FormError message={error} />}
              {success && <FormSuccess message={success} />}
              <Button
                variant={'default'}
                className='w-full text-center mx-auto'
                type='submit'
                disabled={isPending}
              >
                Reset Password
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          {' '}
          <Link
            href={'/login'}
            className='text-sm border px-6 py-2 rounded-lg w-full text-center font-semibold text-[#025908] bg-green-100'
          >
            Back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ResetPasswordForm
