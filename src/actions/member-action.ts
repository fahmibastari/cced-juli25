'use server'

import { saveFile } from '@/lib/file-handler'
import prisma from '@/lib/prisma'
import { JobApplicationSchema, updateMemberSchema } from '@/lib/zod'
import { Gender, MemberType } from '@prisma/client'
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
        image: true,
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

export async function updateMemberPersonalInformation(
  formData: z.infer<typeof updateMemberSchema>,
  id: string,
  idMember: string
) {
  try {
    const validatedFields = updateMemberSchema.safeParse(formData)

    if (!validatedFields.success) {
      return {
        error: 'Invalid fields!',
        details: validatedFields.error.errors,
      }
    }
    const {
      username,
      fullname,
      phone,
      address,
      city,
      birthDate,
      gender,
      about,
      memberType,
      nim,
      resume,
      skills,
    } = validatedFields.data

    await prisma.user.update({
      where: { id: id },
      data: {
        username: username,
        fullname: fullname,
      },
    })
    const kelamin = gender === 'laki-laki' ? Gender.MALE : Gender.FEMALE
    let dataMemberType = null
    if (memberType === 'alumni unila') {
      dataMemberType = MemberType.ALUMNI_UNILA
    } else if (memberType === 'alumni non unila') {
      dataMemberType = MemberType.ALUMNI_NON_UNILA
    } else if (memberType === 'mahasiswa non unila') {
      dataMemberType = MemberType.MAHASISWA_NON_UNILA
    } else {
      dataMemberType = MemberType.MAHASISWA_UNILA
    }

    await prisma.member.update({
      where: { id: idMember },
      data: {
        phone: phone,
        address: address,
        city: city,
        birthDate: birthDate,
        gender: kelamin,
        about: about,
        memberType: dataMemberType,
        nim: nim,
        resume: resume,
        skills: skills,
      },
    })
    return {
      success: 'Member successfully updated!',
    }
  } catch {
    return {
      error: 'An error occurred while updating the member. Please try again.',
    }
  }
}

export const updateImageMember = async (
  id: string,
  idFile: string,
  image: File
) => {
  try {
    if (!image) {
      return { error: 'Image file is required' }
    }

    const imageFile = await saveFile('member-images', image)
    if (!imageFile) {
      return { error: 'Image file is invalid or could not be saved' }
    }

    // Check if an existing image exists
    const existingImage = await prisma.file.findUnique({
      where: { id: idFile },
    })

    // Delete the existing image if it exists
    if (existingImage) {
      await prisma.file.delete({
        where: { id: idFile },
      })
    }

    // Update user image reference in the database
    await prisma.user.update({
      where: { id },
      data: {
        imageId: imageFile.id,
      },
    })

    return { success: 'Profile image successfully updated!' }
  } catch (err) {
    console.error('Error during image update:', err)
    return {
      error: 'An unexpected error occurred while updating the profile image.',
    }
  }
}
