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
import { Switch } from '../ui/switch'
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

const AddJob = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isPending, setIsPending] = useState(false)

  const form = useForm<z.infer<typeof JobSchema>>({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      companyId: '',
      title: '',
      description: undefined,
      requirements: [],
      location: undefined,
      deadline: undefined,
      status: undefined,
      skills: [],
      isExternal: false,
      externalUrl: undefined,
      type: undefined,
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
  const jobStatus = ['Draft', 'Published', 'Closed']
  const skillOptions = ['React', 'Node.js', 'TypeScript', 'Python', 'Java']
  const requirementOptions = [
    'Bachelor Degree',
    '2+ Years Experience',
    'Remote Work',
    'Willing to Travel',
  ]

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
                    <FormLabel className='text-gray-700 font-medium'>
                      Job Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='Enter job title'
                        className='border border-gray-200 rounded-md focus:ring-2 focus:ring-green-500'
                      />
                    </FormControl>
                    <FormMessage className='text-red-600' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700 font-medium'>
                      Description
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='Enter job description'
                        className='border border-gray-200 rounded-md min-h-32 focus:ring-2 focus:ring-green-500'
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage className='text-red-600' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='requirements'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700 font-medium'>
                      Requirements
                    </FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={(value) =>
                        field.onChange([...(field.value || []), value])
                      }
                      value=''
                    >
                      <SelectTrigger className='border border-gray-200 focus:ring-2 focus:ring-green-500'>
                        <SelectValue placeholder='Add requirements' />
                      </SelectTrigger>
                      <SelectContent>
                        {requirementOptions.map((req) => (
                          <SelectItem key={req} value={req}>
                            {req}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className='mt-3 flex flex-wrap gap-2'>
                      {field.value?.map((req) => (
                        <div
                          key={req}
                          className='bg-green-50 text-green-700 px-3 py-1 rounded-full flex items-center gap-2 border border-green-200'
                        >
                          {req}
                          <button
                            type='button'
                            onClick={() =>
                              field.onChange(
                                field.value?.filter((r) => r !== req)
                              )
                            }
                            className='hover:text-red-500 transition-colors'
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <FormMessage className='text-red-600' />
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
                        disabled={isPending}
                        placeholder='Enter job location'
                        className='border-2 border-gray-100 shadow-sm'
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='deadline'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application Deadline</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='date'
                        disabled={isPending}
                        className='border-2 border-gray-100 shadow-sm'
                        value={
                          field.value
                            ? field.value.toISOString().split('T')[0]
                            : ''
                        }
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
                    <Select
                      disabled={isPending}
                      onValueChange={(value) =>
                        field.onChange([...(field.value || []), value])
                      }
                      value=''
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Add required skills' />
                      </SelectTrigger>
                      <SelectContent>
                        {skillOptions.map((skill) => (
                          <SelectItem key={skill} value={skill}>
                            {skill}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className='mt-2 flex flex-wrap gap-2'>
                      {field.value?.map((skill) => (
                        <div
                          key={skill}
                          className='bg-gray-100 px-2 py-1 rounded-md flex items-center gap-2'
                        >
                          {skill}
                          <button
                            type='button'
                            onClick={() =>
                              field.onChange(
                                field.value?.filter((s) => s !== skill)
                              )
                            }
                            className='text-gray-500 hover:text-gray-700'
                          >
                            ×
                          </button>
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
                name='isExternal'
                render={({ field }) => (
                  <FormItem className='flex items-center justify-between rounded-lg border p-4'>
                    <div className='space-y-0.5'>
                      <FormLabel>External Job Posting</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isPending}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {form.watch('isExternal') && (
                <FormField
                  control={form.control}
                  name='externalUrl'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>External URL</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder='Enter external job posting URL'
                          className='border-2 border-gray-100 shadow-sm'
                          value={field.value ?? ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

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
                  'Job Posted!'
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
