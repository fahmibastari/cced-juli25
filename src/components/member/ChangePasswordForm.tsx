'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { changePasswordSchema } from '@/lib/zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { useState } from 'react'
import { changePasswordForUser } from '@/actions/change-password'
import { FormError } from '../auth/form-error'
import { FormSuccess } from '../auth/form-succsess'
import { Card, CardHeader, CardContent } from '../ui/card'

const ChangePasswordForm = ({ userId }: { userId: string }) => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  // Inisialisasi useForm dengan defaultValues
  const methods = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  })

  const { control, handleSubmit, formState: { errors } } = methods

  const onSubmit = async (data: any) => {
    setError('')
    setSuccess('')
    try {
      const result = await changePasswordForUser(data.oldPassword, data.newPassword, userId)
      if (result.error) {
        setError(result.error)
      } else {
        setSuccess(result.success)
      }
    } catch (err) {
      setError('Terjadi kesalahan saat mengubah kata sandi.')
    }
  }

  return (
    <div className="mt-8">
      <Card className="shadow-lg">
        <CardHeader>
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <FormField
                  control={control}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kata Sandi Lama</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Kata Sandi Lama"
                          value={field.value || ''}  // Menyediakan nilai default
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kata Sandi Baru</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Kata Sandi Baru"
                          value={field.value || ''}  // Menyediakan nilai default
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Konfirmasi Kata Sandi Baru</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Konfirmasi Kata Sandi Baru"
                          value={field.value || ''}  // Menyediakan nilai default
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Ubah Kata Sandi</Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  )
}

export default ChangePasswordForm
