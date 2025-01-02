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
      salary,
      deadline,
    } = validatedFields.data

    const newJob = await prisma.job.create({
      data: {
        companyId: user.id,
        title,
        salary: salary ?? '',
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

export async function deleteJob(id: string) {
  try {
    await prisma.job.delete({ where: { id } })
    return {
      success: 'Job successfully deleted!',
    }
  } catch {
    return {
      error: 'An error occurred while deleting the job.',
    }
  }
}

export async function updateJob(
  formData: z.infer<typeof JobSchema>,
  id: string
) {
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
      salary,
      requirements,
      skills,
      location,
      status,
      type,
      deadline,
    } = validatedFields.data

    const newJob = await prisma.job.update({
      where: { id: id },
      data: {
        companyId: user.id,
        title,
        salary: salary ?? '',
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
      success: 'Job successfully updated!',
      data: newJob,
    }
  } catch {
    return {
      error: 'An error occurred while updating the job.',
    }
  }
}

export async function getJob(id: string) {
  try {
    const data = await prisma.job.findUnique({
      where: { id: id },
      include: {
        jobApplication: true,
        company: true,
      },
    })
    return { data }
  } catch (error) {
    console.error('An error occurred while fetching the job:', error)
  }
}
