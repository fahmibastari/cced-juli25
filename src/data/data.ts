import prisma from '@/lib/prisma'

export const getNews = async () => {
  const news = await prisma.news.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 10,
  })
  return news
}

export const getArticles = async () => {
  const news = await prisma.article.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 10,
  })
  return news
}

export const getJobById = async (companyId: string) => {
  const jobs = await prisma.job.findMany({
    where: {
      companyId: companyId,
    },
    orderBy: {
      updatedAt: 'desc',
    },
    include: {
      jobApplication: {
        select: {
          id: true,
          notes: true,
        },
      },
      posterFile: {
        select: {
          name: true, // ✅ tambahkan ini
        },
      },
      company: {
        include: {
          logo: true, // untuk konsistensi
        },
      },
    },
  })
  return jobs
}


export async function getJobs() {
  try {
    const data = await prisma.job.findMany({
      where: {
        status: 'aktif',
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        jobApplication: true,
        posterFile: true,
        company: {
          include: {
            logo: true,
            
          },
        },
      },
    });

    const jobsWithExtras = data.map((job) => ({
      ...job,

      companyName: job.company?.companyName ?? 'Nama Perusahaan',
      companyLogoUrl: job.company?.logo?.src || undefined,
      industry: job.company?.industry ?? 'Tidak Diketahui', 

      // Struktur ulang company agar sesuai expected type
      company: {
        companyName: job.company?.companyName,
        logo: job.company?.logo ? { src: job.company.logo.src } : undefined,
        industry: job.company?.industry || 'Tidak Diketahui', 
      },

      // Tambahkan posterFile jika tersedia
      posterFile: job.posterFile
        ? {
            name: job.posterFile.name,
            src: job.posterFile.src, // src = relative path ke public
          }
        : null,
    }));

    return { data: jobsWithExtras };
  } catch (error) {
    console.error('An error occurred while fetching the job:', error);
    return { data: [] };
  }
}




export async function getMemberById(id: string) {
  try {
    const member = await prisma.member.findUnique({ where: { id } })
    return member
  } catch {
    return null
  }
}
