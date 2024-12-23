'use client'

import { newVerification } from '@/actions/new-verification'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-succsess'

const NewVerificationForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)

  const onSubmit = useCallback(() => {
    if (!token) {
      setError('Missing Token!')
      return
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success)
        setError(data.error)
      })
      .catch(() => {
        setError('Something Went Wrong!')
      })
  }, [token])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])
  return (
    <div className='w-full flex items-center justify-center h-screen'>
      <Card className='w-full max-w-lg p-4 items-center'>
        <CardHeader className='space-y-1 flex flex-col gap-3 items-center'>
          <CardTitle className='text-4xl font-semibold text-[#025908]'>
            Verification Token
          </CardTitle>
          <CardDescription>Verif Your Account</CardDescription>
        </CardHeader>
        <CardContent>
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
        </CardContent>
        <CardFooter className='flex items-center justify-between flex-col gap-4 w-full'>
          {!error && !success && (
            <BeatLoader size={30} color={'#025908'} className='my-4' />
          )}
          <Link
            href={'/login'}
            className='text-lg border p-6 rounded-lg w-full text-center font-semibold text-[#025908] bg-green-100'
          >
            Back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default NewVerificationForm
