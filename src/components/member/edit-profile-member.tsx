/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { startTransition, useRef, useState } from 'react'
import { ImagePlus } from 'lucide-react'
import { Button } from '../ui/button'
import { FormError } from '../auth/form-error'
import { FormSuccess } from '../auth/form-succsess'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { updateMemberSchema } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '../ui/input'
import Link from 'next/link'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import {
  updateImageMember,
  updateMemberPersonalInformation,
} from '@/actions/member-action'
import { Textarea } from '../ui/textarea'

interface EditProfileMemberProps {
  data: any
}

const EditProfileMember = ({ data }: EditProfileMemberProps) => {
  const [errorMessageImage, setErrorMessageImage] = useState('')
  const [successMessageImage, setSuccessMessageImage] = useState('')
  const [errorMessagePersonal, setErrorMessagePersonal] = useState('')
  const [successMessagePersonal, setSuccessMessagePersonal] = useState('')
  const [errorMessageResume, setErrorMessageResume] = useState('')
  const [successMessageResume, setSuccessMessageResume] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [srcImage, setSrcImage] = useState<string | null>(
    data?.image?.src || null
  )
  const fileInputRef = useRef<HTMLInputElement>(null)
  const gender = ['laki-laki', 'perempuan']
  const dataMemberType = [
    'Alumni Unila',
    'Mahasiswa Unila',
    'Alumni non Unila',
    'Mahasiswa non Unila',
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const maxSize = 100 * 1024 // 100 KB
      const validTypes = ['image/png', 'image/webp']

      if (!validTypes.includes(file.type)) {
        setErrorMessageImage('Only PNG and WebP files are allowed.')
        setSuccessMessageImage('')
        return
      }

      if (file.size > maxSize) {
        setErrorMessageImage('File size must be under 100 KB.')
        setSuccessMessageImage('')
        return
      }

      setErrorMessageImage('')
      setSuccessMessageImage('File successfully uploaded!')
      setImageFile(file)
      setSrcImage(URL.createObjectURL(file))
    }
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleEditImage = async () => {
    if (!imageFile) {
      // console.log(data.id, data.imageId, imageFile)
      setErrorMessageImage('No file selected.')
      return
    }

    setIsPending(true)
    try {
      const response = await updateImageMember(
        data.id,
        data.imageId || '',
        imageFile
      )
      if (response?.error) {
        setErrorMessageImage(response.error)
        setSuccessMessageImage('')
      } else {
        setErrorMessageImage('')
        setSuccessMessageImage(
          response?.success || 'Image updated successfully!'
        )
      }
    } catch (err) {
      console.error('Error updating image:', err)
      setErrorMessageImage('An error occurred while updating the image.')
      setSuccessMessageImage('')
    } finally {
      setIsPending(false)
    }
  }

  const formPersonal = useForm<z.infer<typeof updateMemberSchema>>({
    resolver: zodResolver(updateMemberSchema),
    defaultValues: {
      username: data.username || '',
      fullname: data.fullname || '',
      memberType: data.member.memberType || '',
      nim: data.member.nim || '',
      phone: data.member.phone || '',
      address: data.member.address || '',
      city: data.member.city || '',
      birthDate: data.member.birthDate || null,
      gender: data.member.gender || '',
      about: data.member.about || '',
      //   resume: data.resume || '',
      //   skills: data.skills || [],
      //   interests: data.interests || [],
    },
  })

  const formResume = useForm<z.infer<typeof updateMemberSchema>>({
    resolver: zodResolver(updateMemberSchema),
    defaultValues: {
      resume: data.resume || '',
      //   skills: data.skills || [],
      //   interests: data.interests || [],
    },
  })

  const onSubmitPersonal = (value: z.infer<typeof updateMemberSchema>) => {
    setErrorMessagePersonal('')
    setSuccessMessagePersonal('')
    startTransition(() => {
      setIsPending(true)
      updateMemberPersonalInformation(value, data.id, data.member.id)
        .then((response) => {
          setSuccessMessagePersonal(response?.success ?? '')
          setErrorMessagePersonal(response?.error ?? '')
          setIsPending(false)
        })
        .catch((err) => {
          console.error('Error updating personal information:', err)
          setErrorMessagePersonal(
            'Terjadi kesalahan saat memperbarui informasi personal.'
          )
          setSuccessMessagePersonal('')
          setIsPending(false)
        })
    })
  }

  const onSubmitResume = (value: z.infer<typeof updateMemberSchema>) => {
    setErrorMessageResume('')
    setSuccessMessageResume('')
    startTransition(() => {
      setIsPending(true)
      updateMemberPersonalInformation(value, data.id, data.member.id)
        .then((response) => {
          setSuccessMessageResume(response?.success ?? '')
          setErrorMessageResume(response?.error ?? '')
          setIsPending(false)
        })
        .catch((err) => {
          console.error('Error updating resume information:', err)
          setErrorMessageResume(
            'Terjadi kesalahan saat memperbarui informasi resume.'
          )
          setSuccessMessageResume('')
          setIsPending(false)
        })
    })
  }

  return (
    <div className='max-w-6xl mx-auto p-8 w-full'>
      <h1 className='text-3xl font-bold text-green-700 mb-6'>
        Edit Profile Member
      </h1>

      {/* section edit image */}
      <Card className='shadow-lg'>
        <CardHeader>
          <p className='text-lg font-semibold text-green-700 mb-4'>
            Edit Foto Profile
          </p>
          {errorMessageImage && <FormError message={errorMessageImage} />}
          {successMessageImage && <FormSuccess message={successMessageImage} />}
        </CardHeader>
        <CardContent>
          <div>
            <div className='mb-4 flex justify-between'>
              <p className='text-md font-medium text-gray-700 mb-4'>
                Foto Profile
              </p>
              <Button onClick={handleEditImage} disabled={isPending}>
                Simpan Perubahan
              </Button>
            </div>
            <div className='cursor-pointer rounded-lg border-2 border-dashed p-6 text-center h-80 flex flex-col gap-4 items-center justify-center'>
              <input
                type='file'
                accept='.png,.webp'
                className='hidden'
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <div className='flex flex-col items-center w-full h-full justify-center gap-4'>
                {srcImage ? (
                  <Image
                    src={srcImage}
                    width={100}
                    height={100}
                    alt='Profile Image'
                    className='rounded-md shadow'
                  />
                ) : (
                  <div className='flex flex-col items-center'>
                    <ImagePlus className='h-12 w-12 text-gray-400' />
                    <p className='text-sm text-gray-600'>No image selected</p>
                  </div>
                )}
                {imageFile && (
                  <p className='text-sm text-green-600'>
                    Selected File: {imageFile.name}
                  </p>
                )}
                <Button
                  variant='outline'
                  className='w-full hover:bg-green-100 hover:border-green-700 transition'
                  onClick={handleButtonClick}
                >
                  Select File
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* section personal data */}
      <Card className='shadow-lg'>
        <CardHeader>
          <p className='text-lg font-semibold text-green-700 mb-4'>
            Edit Personal Information
          </p>
          {errorMessagePersonal && <FormError message={errorMessagePersonal} />}
          {successMessagePersonal && (
            <FormSuccess message={successMessagePersonal} />
          )}
        </CardHeader>

        <CardContent>
          <Form {...formPersonal}>
            <form
              onSubmit={formPersonal.handleSubmit(onSubmitPersonal)}
              className='space-y-6'
            >
              <div className='mb-4 flex justify-between'>
                <p className='text-md font-medium text-gray-700 mb-4'>
                  Personal Information
                </p>
                <Button type='submit' disabled={isPending}>
                  Simpan Perubahan
                </Button>
              </div>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <div className='space-y-4'>
                  <FormField
                    control={formPersonal.control}
                    name='memberType'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status Member</FormLabel>
                        <FormControl>
                          <Select
                            disabled={isPending}
                            onValueChange={field.onChange}
                            value={field.value || ''}
                          >
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  field.value || 'Pilih Status Member'
                                }
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {dataMemberType.map((data) => (
                                <SelectItem
                                  key={data}
                                  value={data.toLowerCase()}
                                >
                                  {data}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formPersonal.control}
                    name='username'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={formPersonal.formState.isSubmitting}
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
                    control={formPersonal.control}
                    name='fullname'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Lengkap</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={formPersonal.formState.isSubmitting}
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
                    control={formPersonal.control}
                    name='nim'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>NIM</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={formPersonal.formState.isSubmitting}
                            placeholder='nim'
                            className='border-2 border-gray-100 shadow-sm'
                            type='text'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formPersonal.control}
                    name='phone'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nomor Telepon</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={formPersonal.formState.isSubmitting}
                            placeholder='Nomor Telepon'
                            className='border-2 border-gray-100 shadow-sm'
                            type='text'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formPersonal.control}
                    name='gender'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jenis Kelamin</FormLabel>
                        <FormControl>
                          <Select
                            disabled={isPending}
                            onValueChange={field.onChange}
                            value={field.value || ''}
                          >
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  field.value || 'Pilih Jenis Kelamin'
                                }
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {gender.map((note) => (
                                <SelectItem
                                  key={note}
                                  value={note.toLowerCase()}
                                >
                                  {note}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='space-y-4'>
                  <FormField
                    control={formPersonal.control}
                    name='address'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alamat</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={formPersonal.formState.isSubmitting}
                            placeholder='Alamat Anda'
                            className='border-2 border-gray-100 shadow-sm'
                            type='text'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formPersonal.control}
                    name='city'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kota</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={formPersonal.formState.isSubmitting}
                            placeholder='kota Anda'
                            className='border-2 border-gray-100 shadow-sm'
                            type='text'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formPersonal.control}
                    name='about'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tentang Anda</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={formPersonal.formState.isSubmitting}
                            placeholder='Tentang Anda'
                            className='border-2 border-gray-100 shadow-sm'
                            type='text'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formPersonal.control}
                    name='birthDate'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tanggal Lahir Anda</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .split('T')[0]
                                : ''
                            }
                            onChange={(e) =>
                              field.onChange(new Date(e.target.value))
                            }
                            disabled={formPersonal.formState.isSubmitting}
                            className='border-2 border-gray-100 shadow-sm'
                            type='date'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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

      {/* section resume data */}
      <Card className='shadow-lg'>
        <CardHeader>
          <p className='text-lg font-semibold text-green-700 mb-4'>
            Edit Resume Anda
          </p>
          {errorMessageResume && <FormError message={errorMessageResume} />}
          {successMessageResume && (
            <FormSuccess message={successMessageResume} />
          )}
        </CardHeader>

        <CardContent>
          <Form {...formResume}>
            <form
              onSubmit={formResume.handleSubmit(onSubmitResume)}
              className='space-y-6'
            >
              <div className='mb-4 flex justify-between'>
                <p className='text-md font-medium text-gray-700 mb-4'>
                  Personal Information
                </p>
                <Button type='submit' disabled={isPending}>
                  Simpan Perubahan
                </Button>
              </div>
              <div>
                <FormField
                  control={formResume.control}
                  name='resume'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resume</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          disabled={formResume.formState.isSubmitting}
                          placeholder='Resume Anda'
                          className='border-2 border-gray-100 shadow-sm h-[216px]'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
    </div>
  )
}

export default EditProfileMember
