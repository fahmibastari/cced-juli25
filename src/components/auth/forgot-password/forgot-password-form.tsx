'use client'

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
import { forgotPasswordSchema } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-succsess'
import { Button } from '@/components/ui/button'
import { reset } from '@/actions/reset'
import { CardWrapper } from '../card-wrapper'

const ForgotPasswordForm = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmitForm = (data: z.infer<typeof forgotPasswordSchema>) => {
    setError('')
    setSuccess('')
    console.log(data)
    startTransition(() => {
      reset(data)
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
    <CardWrapper
      headerLabel='Forgot Password'
      description='Reset Your Password'
      paragraphSwitchButton='already remember the password?'
      switchButtonLabel='Back to Login'
      switchButtonHref='/login'
    >
      <Form {...form}>
        <form
          action=''
          onSubmit={form.handleSubmit(onSubmitForm)}
          className='space-y-6 flex flex-col gap-4'
        >
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
            Send Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default ForgotPasswordForm
