import * as z from 'zod'
import { JobSchema } from '../lib/zod'

export const addNewJob = async (data: z.infer<typeof JobSchema>) => {
  const validatedFields = JobSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }
  return { success: 'berhasil' }
}
