'use server'

import prisma from '@/lib/prisma'
import { saveFile } from '@/lib/file-handler'

export const getUsers = async () => {
  try {
    const user = await prisma.user.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
    })
    return user
    
  } catch {
    return null
  }
}

export const getUsersWithBerkas = async () => {
  try {
    const users = await prisma.user.findMany({
      include: {
        company: {
          include: {
            berkas: {
              select: {
                src: true
              }
            }
          }
        }
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })
    return users
  } catch (err) {
    console.error(err)
    return null
  }
}

export const verifyCompanyByUserId = async (userId: string) => {
  try {
    // Fetch the user
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return { error: 'User not found.' }
    }

    // Update emailVerified timestamp
    await prisma.user.update({
      where: { id: userId },
      data: { emailVerified: new Date() },
    })

    // If the user is a COMPANY, verify the associated company too
    if (user.role === 'COMPANY') {
      const company = await prisma.company.findFirst({
        where: { userId },
      })

      if (!company) {
        return { error: 'Company not found for this user.' }
      }

      await prisma.company.update({
        where: { id: company.id },
        data: { isVerified: true },
      })

      // Optional: delete any requestVerified record
      await prisma.requestVerified.deleteMany({
        where: { companyId: company.id },
      })

      return {
        success: `Company "${company.companyName}" verified and user's email marked as verified.`,
      }
    }

    return { success: 'User email marked as verified.' }
  } catch (error) {
    console.error('Error verifying:', error)
    return {
      error: 'An error occurred while verifying. Please try again.',
    }
  }
}



export const getCompanies = async () => {
  try {
    const company = await prisma.company.findMany({
      include: { user: true },
      orderBy: {
        updatedAt: 'desc',
      },
    })
    return company
  } catch {
    return null
  }
}

export const getMembers = async () => {
  try {
    const member = await prisma.member.findMany({
      include: { user: true },
      orderBy: {
        updatedAt: 'desc',
      },
    })
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
      orderBy: {
        updatedAt: 'desc',
      },
    })
    return job
  } catch {
    return null
  }
}

export const getJobApplications = async () => {
  try {
    const jobApplication = await prisma.jobApplication.findMany({
      orderBy: {
        appliedAt: 'desc',
      },
    })
    return jobApplication
  } catch {
    return null
  }
}

export const getContents = async () => {
  try {
    const news = await prisma.news.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
    })
    const article = await prisma.article.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
    })
    return { news, article }
  } catch {
    return null
  }
}

export const getContent = async (id: string) => {
  try {
    const news = await prisma.news.findUnique({ where: { id } })
    if (news) return { type: 'news', content: news }

    const article = await prisma.article.findUnique({ where: { id } })
    if (article) return { type: 'article', content: article }

    return null
  } catch (error) {
    console.error('Error fetching content:', error)
    return null
  }
}

export const getRequestVerification = async () => {
  try {
    const request = await prisma.requestVerified.findMany({
      include: {
        company: true,
      },
      orderBy: {
        updatedAt: 'desc',
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


export const createContent = async (
  type: 'news' | 'article',
  title: string,
  content: string,
  thumbnail?: File // Accept File instead of string URL
) => {
  try {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // ✅ Upload thumbnail if provided
    let thumbnailUrl = ''
    if (thumbnail) {
      const uploadedFile = await saveFile('uploads/thumbnails', thumbnail)
      thumbnailUrl = uploadedFile.src // Store the file URL in DB
    }

    // ✅ Save content to the database
    if (type === 'news') {
      await prisma.news.create({
        data: { title, content, thumbnail: thumbnailUrl, slug },
      })
    } else {
      await prisma.article.create({
        data: { title, content, thumbnail: thumbnailUrl, slug },
      })
    }

    return { success: `${type.charAt(0).toUpperCase() + type.slice(1)} created successfully!` }
  } catch (error) {
    console.error(`Error creating ${type}:`, error)
    return { error: `An error occurred while creating the ${type}. Please try again.` }
  }
}