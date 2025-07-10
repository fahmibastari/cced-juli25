'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { adminChangePasswordSchema } from '@/lib/zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { useState } from 'react'
import { changePasswordForAdmin } from '@/actions/change-password'
import { FormError } from '../auth/form-error'
import { FormSuccess } from '../auth/form-succsess'
import { Card, CardHeader, CardContent } from '../ui/card'

const AdminChangePasswordForm = () => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  

  // Inisialisasi useForm
  const methods = useForm({
    resolver: zodResolver(adminChangePasswordSchema),
    defaultValues: {
        userId: "", // Nilai default untuk userId
        newPassword: "", // Nilai default untuk newPassword
        confirmPassword: "" // Nilai default untuk confirmPassword
      }
  })

  const { control, handleSubmit, formState: { errors } } = methods

  const onSubmit = async (data: any) => {
    setError('')
    setSuccess('')
    try {
      const result = await changePasswordForAdmin(data.userId, data.newPassword)
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
          <p className="text-lg font-semibold text-green-700 mb-4">
            Ubah Kata Sandi Pengguna
          </p>
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
        </CardHeader>
        <CardContent>
          <Form {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <FormField
                  control={control}
                  name="userId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID Pengguna</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="ID Pengguna"
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
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Ubah Kata Sandi</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminChangePasswordForm
