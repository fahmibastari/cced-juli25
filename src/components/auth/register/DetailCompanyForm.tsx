'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ImagePlus } from 'lucide-react'
import React from 'react'

interface CompanyFormProps {
  onSubmit: (formData: CompanyFormData) => void
  onBack: () => void
}

interface CompanyFormData {
  logo: File | null
  companyName: string
  industry: string
  ownership: string
  phoneNumber: string
  companyPhone: string
  website: string
  emailPublic: string
  bio: string
}

const CompanyRegistrationForm: React.FC<CompanyFormProps> = ({
  onSubmit,
  onBack,
}) => {
  const [formData, setFormData] = React.useState<CompanyFormData>({
    logo: null,
    companyName: '',
    industry: '',
    ownership: '',
    phoneNumber: '',
    companyPhone: '',
    website: '',
    emailPublic: '',
    bio: '',
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const maxSize = 100 * 1024 // 100kb
      const validTypes = ['image/png', 'image/webp']

      if (!validTypes.includes(file.type)) {
        alert('Hanya file PNG dan WebP yang diperbolehkan')
        return
      }

      if (file.size > maxSize) {
        alert('Ukuran file maksimal 100kb')
        return
      }

      setFormData((prev) => ({ ...prev, logo: file }))
    }
  }

  return (
    <div className='mx-auto w-full max-w-3xl p-4'>
      <Card>
        <CardHeader>
          <CardTitle className='text-xl font-semibold'>
            Data Perusahaan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className='space-y-6' onSubmit={handleSubmit}>
            {/* Logo Upload Section */}
            <div>
              <Label>Logo Perusahaan</Label>
              <div className='mt-2 cursor-pointer rounded-lg border-2 border-dashed p-4 text-center'>
                <input
                  type='file'
                  accept='.png,.webp'
                  className='hidden'
                  id='logo-upload'
                  onChange={handleFileChange}
                />
                <label htmlFor='logo-upload' className='cursor-pointer'>
                  <div className='flex flex-col items-center gap-2'>
                    <ImagePlus className='h-10 w-10 text-gray-400' />
                    <div className='text-sm text-gray-600'>
                      Set logo perusahaan. Hanya file berformat *.png and *.webp
                      dengan ukuran maksimal 100kb
                    </div>
                    {formData.logo && (
                      <div className='text-sm text-green-600'>
                        File terpilih: {formData.logo.name}
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              {/* Left Column */}
              <div className='space-y-4'>
                <div>
                  <Label htmlFor='companyName'>Nama Perusahaan</Label>
                  <Input
                    id='companyName'
                    placeholder='Precious Moment'
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        companyName: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <Label htmlFor='industry'>Bidang Industri</Label>
                  <Input
                    id='industry'
                    placeholder='Percetakan dan Publikasi'
                    value={formData.industry}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        industry: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <Label htmlFor='ownership'>Kepemilikan Perusahaan</Label>
                  <Input
                    id='ownership'
                    placeholder='Swasta'
                    value={formData.ownership}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        ownership: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <Label htmlFor='phoneNumber'>No Telpon</Label>
                  <Input
                    id='phoneNumber'
                    placeholder='081271662745'
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phoneNumber: e.target.value,
                      }))
                    }
                  />
                  <p className='mt-1 text-xs text-gray-500'>
                    Masukan no handphone aktif yang dapat di hubungi melalui
                    WhatApp
                  </p>
                </div>

                <div>
                  <Label htmlFor='companyPhone'>No Telpon Perusahaan</Label>
                  <Input
                    id='companyPhone'
                    placeholder='0721273957'
                    value={formData.companyPhone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        companyPhone: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className='space-y-4'>
                <div>
                  <Label htmlFor='website'>Alamat Website</Label>
                  <Input
                    id='website'
                    placeholder='www.instagram.com/@precious.momenttt'
                    value={formData.website}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        website: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <Label htmlFor='emailPublic'>Alamat Email Publik</Label>
                  <Input
                    id='emailPublic'
                    type='email'
                    placeholder='precious.momenttt@gmail.com'
                    value={formData.emailPublic}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        emailPublic: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <Label htmlFor='bio'>Bio Perusahaan</Label>
                  <Textarea
                    id='bio'
                    className='h-32'
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, bio: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>
            <div className='flex justify-between pt-4'>
              <Button type='button' variant='outline' onClick={onBack}>
                Kembali
              </Button>
              <Button type='submit' className='bg-green-500 hover:bg-green-600'>
                Daftar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CompanyRegistrationForm
