'use server'

import * as z from 'zod'
import { JobSchema } from '../lib/zod'
import { currentDetailUserCompany } from '@/lib/authenticate'
import prisma from '@/lib/prisma'

export async function addNewJob(formData: z.infer<typeof JobSchema>) {
  try {
    const user = await currentDetailUserCompany()

    if (!user?.id) {
      return {
        error: 'User is not authenticated or does not belong to a company!',
      }
    }

    const validatedFields = JobSchema.safeParse(formData)

    if (!validatedFields.success) {
      return {
        error: 'Invalid fields!',
        details: validatedFields.error.errors,
      }
    }

    const {
      title,
      description,
      requirements,
      skills,
      location,
      status,
      type,
      deadline,
    } = validatedFields.data

    const newJob = await prisma.job.create({
      data: {
        companyId: user.id,
        title,
        description: description ?? '',
        requirements,
        skills,
        location: location ?? null,
        status: status ?? null,
        type: type ?? null,
        deadline: deadline ?? null,
      },
    })

    return {
      success: 'Job successfully added!',
      data: newJob,
    }
  } catch {
    return {
      error: 'An error occurred while creating the job.',
    }
  }
}
