'use server'

import prisma from '@/lib/prisma'

export const getUsers = async () => {
  try {
    const user = await prisma.user.findMany()
    return user
  } catch {
    return null
  }
}

export const getCompanies = async () => {
  try {
    const company = await prisma.company.findMany({ include: { user: true } })
    return company
  } catch {
    return null
  }
}

export const getMembers = async () => {
  try {
    const member = await prisma.member.findMany({ include: { user: true } })
    return member
  } catch {
    return null
  }
}

export const getJobs = async () => {
  try {
    const job = await prisma.job.findMany({
      include: {
        company: true,
      },
    })
    return job
  } catch {
    return null
  }
}

export const getJobApplications = async () => {
  try {
    const jobApplication = await prisma.jobApplication.findMany()
    return jobApplication
  } catch {
    return null
  }
}

export const getContents = async () => {
  try {
    const news = await prisma.news.findMany()
    const article = await prisma.article.findMany()
    return { news, article }
  } catch {
    return null
  }
}

export const getRequestVerification = async () => {
  try {
    const request = await prisma.requestVerified.findMany({
      include: {
        company: true,
      },
    })
    return request
  } catch {
    return null
  }
}

export const deleteUser = async (id: string) => {
  try {
    await prisma.user.delete({ where: { id } })
    return { success: 'User successfully deleted!' }
  } catch {
    return {
      error: 'An error occurred while deleting the user. Please try again.',
    }
  }
}

export const deleteCompany = async (id: string) => {
  try {
    await prisma.company.delete({ where: { id } })
    return { success: 'Company successfully deleted!' }
  } catch {
    return {
      error: 'An error occurred while deleting the company. Please try again.',
    }
  }
}

export const deleteMember = async (id: string) => {
  try {
    await prisma.member.delete({ where: { id } })
    return { success: 'Member successfully deleted!' }
  } catch {
    return {
      error: 'An error occurred while deleting the member. Please try again.',
    }
  }
}

export const deleteNews = async (id: string) => {
  try {
    await prisma.news.delete({ where: { id } })
    return { success: 'News successfully deleted!' }
  } catch {
    return {
      error: 'An error occurred while deleting the news. Please try again.',
    }
  }
}

export const deleteArticle = async (id: string) => {
  try {
    await prisma.article.delete({ where: { id } })
    return { success: 'Article successfully deleted!' }
  } catch {
    return {
      error: 'An error occurred while deleting the article. Please try again.',
    }
  }
}

export const deleteJob = async (id: string) => {
  try {
    await prisma.job.delete({ where: { id } })
    return { success: 'Job successfully deleted!' }
  } catch {
    return {
      error: 'An error occurred while deleting the job. Please try again.',
    }
  }
}

export const deleteRequestVerified = async (id: string, companyId: string) => {
  try {
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    })
    if (!company) {
      return {
        error: 'Company not found. Please try again.',
      }
    }

    const request = await prisma.requestVerified.findUnique({ where: { id } })
    if (!request) {
      return {
        error: 'Request verified not found. Please try again.',
      }
    }

    await prisma.company.update({
      where: { id: companyId },
      data: {
        isVerified: true,
      },
    })

    await prisma.requestVerified.delete({ where: { id } })

    return { success: `Request ${company.companyName} verified successfully!` }
  } catch {
    return {
      error:
        'An error occurred while prosessing the request verified. Please try again.',
    }
  }
}
