'use client'

import { JobSchema } from '@/lib/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { BeatLoader } from 'react-spinners'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { FormSuccess } from '@/components/auth/form-succsess'
import { FormError } from '@/components/auth/form-error'
import { zodResolver } from '@hookform/resolvers/zod'
import { startTransition, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { addNewJob } from '@/actions/company-action'
import { X } from 'lucide-react'

const AddJob = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isPending, setIsPending] = useState(false)

  const form = useForm<z.infer<typeof JobSchema>>({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      title: '',
      description: '',
      requirements: [],
      location: '',
      deadline: new Date(),
      status: '',
      skills: [],
      type: '',
    },
  })

  const onSubmit = (data: z.infer<typeof JobSchema>) => {
    setErrorMessage('')
    setSuccessMessage('')
    startTransition(() => {
      setIsPending(true)
      // todo: implement submit logic
      addNewJob(data).then((data) => {
        setSuccessMessage(data?.success ?? '')
        setErrorMessage(data?.error ?? '')
      })
      console.log(data)
      setIsPending(false)
    })
  }

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship']
  const jobStatus = ['Aktif', 'NonAktif', 'Selesai', 'Draft']

  return (
    <Card className='mx-auto my-8 w-full max-w-3xl bg-white shadow-lg'>
      <CardHeader className='text-center space-y-2 pb-8 border-b'>
        <CardTitle className='text-3xl font-bold text-green-700'>
          Create New Job Posting
        </CardTitle>
        <CardDescription className='text-gray-600'>
          Fill in the details below to create a new job opportunity
        </CardDescription>
      </CardHeader>
      <CardContent className='pt-8'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-6'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={form.formState.isSubmitting}
                        placeholder='Enter an title for the job'
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
                name='location'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={form.formState.isSubmitting}
                        placeholder='Enter an location for the job'
                        className='border-2 border-gray-100 shadow-sm'
                        type='text'
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={form.formState.isSubmitting}
                        placeholder='Enter an description for the job'
                        className='border-2 border-gray-100 shadow-sm'
                        type='text'
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      value={field.value || ''}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select job status' />
                      </SelectTrigger>
                      <SelectContent>
                        {jobStatus.map((status) => (
                          <SelectItem key={status} value={status.toLowerCase()}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='skills'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Required Skills</FormLabel>
                    {/* Input untuk menambahkan skill manual */}
                    <FormControl>
                      <Input
                        placeholder='Type a skill and press Enter'
                        disabled={isPending}
                        onKeyDown={(e) => {
                          if (
                            e.key === 'Enter' &&
                            e.currentTarget.value.trim() !== ''
                          ) {
                            const newSkill = e.currentTarget.value.trim()
                            if (!field.value?.includes(newSkill)) {
                              field.onChange([...(field.value || []), newSkill])
                            }
                            e.currentTarget.value = '' // Reset input
                            e.preventDefault() // Prevent form submission
                          }
                        }}
                        className='border-2 border-gray-100 shadow-sm mb-2'
                      />
                    </FormControl>
                    {/* Menampilkan daftar skill */}
                    <div className='mt-2 flex flex-wrap gap-2'>
                      {field.value?.map((skill) => (
                        <div
                          key={skill}
                          className='bg-gray-100 px-2 py-1 rounded-md flex items-center gap-2'
                        >
                          {skill}
                          <Button
                            variant={'ghost'}
                            type='button'
                            onClick={() =>
                              field.onChange(
                                field.value?.filter((s) => s !== skill)
                              )
                            }
                            className='text-gray-500 hover:text-gray-700 w-4 h-4'
                          >
                            <X className='h-4 w-4 text-red-600 hover:text-red-700' />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      value={field.value || ''}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select job type' />
                      </SelectTrigger>
                      <SelectContent>
                        {jobTypes.map((type) => (
                          <SelectItem key={type} value={type.toLowerCase()}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='requirements'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requirements</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Type a skill and press Enter'
                        disabled={isPending}
                        onKeyDown={(e) => {
                          if (
                            e.key === 'Enter' &&
                            e.currentTarget.value.trim() !== ''
                          ) {
                            const newSkill = e.currentTarget.value.trim()
                            if (!field.value?.includes(newSkill)) {
                              field.onChange([...(field.value || []), newSkill])
                            }
                            e.currentTarget.value = '' // Reset input
                            e.preventDefault() // Prevent form submission
                          }
                        }}
                        className='border-2 border-gray-100 shadow-sm mb-2'
                      />
                    </FormControl>
                    <div className='mt-2 flex flex-wrap gap-2'>
                      {field.value?.map((skill) => (
                        <div
                          key={skill}
                          className='bg-gray-100 px-2 py-1 rounded-md flex items-center gap-2'
                        >
                          {skill}
                          <Button
                            variant={'ghost'}
                            type='button'
                            onClick={() =>
                              field.onChange(
                                field.value?.filter((s) => s !== skill)
                              )
                            }
                            className='text-gray-500 hover:text-gray-700 w-4 h-4'
                          >
                            <X className='h-4 w-4 text-red-600 hover:text-red-700' />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='deadline'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={
                          field.value
                            ? new Date(field.value).toISOString().split('T')[0]
                            : ''
                        }
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        }
                        disabled={form.formState.isSubmitting}
                        className='border-2 border-gray-100 shadow-sm'
                        type='date'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {errorMessage && <FormError message={errorMessage} />}
              {successMessage && <FormSuccess message={successMessage} />}

              <Button
                type='submit'
                disabled={isPending}
                className='w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-md transition-colors'
              >
                {isPending ? (
                  <div className='flex items-center justify-center gap-2'>
                    <BeatLoader />
                    Processing...
                  </div>
                ) : (
                  'Create Job'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='text-center pt-6 border-t'>
        <Link
          href='/dashboard'
          className='text-green-600 hover:text-green-700 font-medium'
        >
          Back to Dashboard
        </Link>
      </CardFooter>
    </Card>
  )
}
export default AddJob
