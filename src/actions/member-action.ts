'use server'

import prisma from '@/lib/prisma'
import { JobApplicationSchema } from '@/lib/zod'
import * as z from 'zod'

export const applyJob = async (
  jobId: string,
  userId: string,
  value: z.infer<typeof JobApplicationSchema>
) => {
  try {
    // Validate inputs
    if (!jobId || !userId) {
      return { error: 'Missing required parameters' }
    }

    // Validate form data
    const validatedFields = JobApplicationSchema.safeParse(value)
    if (!validatedFields.success) {
      const errorMessages = validatedFields.error.issues
        .map((issue) => issue.message)
        .join(', ')
      return { error: errorMessages }
    }

    const { data } = validatedFields
    const { notes, resumeMember } = data

    if (!resumeMember?.trim()) {
      return { error: 'Please provide your resume' }
    }

    // Check if job exists
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    })

    if (!job) {
      return { error: 'Job not found' }
    }

    // Check if member exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return { error: 'Member not found' }
    }

    const member = await prisma.member.findUnique({
      where: { userId: user.id },
    })

    // Check if application already exists
    const existingApplication = await prisma.jobApplication.findFirst({
      where: {
        jobId,
        memberId: member?.id,
      },
    })

    if (existingApplication) {
      return { error: 'You have already applied for this job' }
    }

    // Create job application
    await prisma.jobApplication.create({
      data: {
        jobId,
        memberId: member?.id ?? '',
        notes: notes || 'seleksi berkas',
        resumeMember: resumeMember,
      },
    })

    return {
      success: 'Job application submitted successfully!',
    }
  } catch {
    return {
      error:
        'An error occurred while submitting the job application. Please try again later.',
    }
  }
}

export const getDetailUserMemberFull = async (id: string) => {
  try {
    const data = await prisma.user.findUnique({
      where: { id },
      include: {
        member: {
          include: {
            experience: true,
            education: true,
            assessment: true,
            jobApplication: {
              include: {
                job: {
                  include: {
                    company: true,
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
