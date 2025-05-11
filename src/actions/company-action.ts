'use server'

import * as z from 'zod'
import {
  JobApplicationSchema,
  JobSchema,
  updateCompanySchema,
} from '../lib/zod'
import { currentDetailUserCompany } from '@/lib/authenticate'
import prisma from '@/lib/prisma'
import { saveFile } from '@/lib/file-handler'

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
      employmentType,
      workTime,
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
        employmentType: formData.employmentType,  // Pastikan ini ditambahkan
        workTime: formData.workTime,              // Pastikan ini ditambahkan
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
        employmentType: formData.employmentType,  // Pastikan ini ditambahkan
        workTime: formData.workTime, 
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
  const data = await prisma.job.findUnique({
    where: { id },
    include: {
      jobApplication: {
        include: {
          member: {
            include: {
              user: true,
            },
          },
        },
      },
      company: true,
    },
  })

  return { data } // ✅ ini saja cukup!
}



export async function getDetailJobApplicant(id: string) {
  try {
    const data = await prisma.jobApplication.findUnique({
      where: { id: id },
      include: {
        member: {
          include: {
            user: true,
          },
        },
        job: {
          include: {
            company: true,
          },
        },
      },
    })
    return { data }
  } catch (error) {
    console.error('An error occurred while fetching the job:', error)
  }
}

export async function updateDetailJobApplicant(
  formData: z.infer<typeof JobApplicationSchema>,
  id: string
) {
  try {
    const validatedFields = JobApplicationSchema.safeParse(formData)

    if (!validatedFields.success) {
      return {
        error: 'Invalid fields!',
        details: validatedFields.error.errors,
      }
    }
    const { data } = validatedFields

    await prisma.jobApplication.update({
      where: { id: id },
      data: {
        notes: data.notes,
      },
    })
    return { success: 'Job successfully updated!', data: data.notes }
  } catch {
    return { error: 'An error occurred while updating the job.' }
  }
}

export const getDetailUserCompanyFull = async (id: string) => {
  try {
    const data = await prisma.user.findUnique({
      where: { id },
      include: {
        company: {
          include: {
            RequestVerified: true,
            logo: true,
            job: {
              include: {
                jobApplication: {
                  include: {
                    member: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    return data
  } catch {
    return null
  }
}

export const createRequestVerified = async (companyId: string) => {
  try {
    await prisma.requestVerified.create({
      data: {
        companyId,
      },
    })
    return {
      success: 'Request verified successfully!, please wait for admin approval',
    }
  } catch {
    return { error: 'An error occurred while creating the request verified.' }
  }
}

export const updateLogoCompany = async (
  idCompany: string,
  idFile: string,
  logo: File
) => {
  try {
    const logoFile = logo ? await saveFile('company-logos', logo) : undefined

    if (!logoFile) {
      return { error: 'Logo tidak valid' }
    }
    await prisma.company.update({
      where: { id: idCompany },
      data: {
        logoId: logoFile.id,
      },
    })

    await prisma.file.delete({
      where: {
        id: idFile,
      },
    })

    return { success: 'Logo successfully updated!' }
  } catch (err) {
    console.error('Error during update:', err)
    return { error: 'An error occurred while updating the logo.' }
  }
}

export async function updateCompanyPersonalInformation(
  formData: z.infer<typeof updateCompanySchema>,
  id: string,
  idCompany: string
) {
  try {
    const validatedFields = updateCompanySchema.safeParse(formData)

    if (!validatedFields.success) {
      return {
        error: 'Invalid fields!',
        details: validatedFields.error.errors,
      }
    }

    const {
      username,
      fullname,
      companyName,
      industry,
      ownership,
      phone,
      companyPhone,
      website,
      publicMail,
      bio,
      address,
      city,
    } = validatedFields.data

    await prisma.user.update({
      where: { id: id },
      data: {
        username,
        fullname,
      },
    })

    await prisma.company.update({
      where: { id: idCompany },
      data: {
        companyName,
        industry,
        ownership,
        phone,
        companyPhone,
        website,
        publicMail,
        bio,
        address,
        city,
      },
    })

    return { success: 'Company successfully updated!' }
  } catch {
    return { error: 'An error occurred while updating the company.' }
  }
}
