'use server'

import { saveFile } from '@/lib/file-handler'
import prisma from '@/lib/prisma'
import { JobApplicationSchema, updateMemberSchema, experienceSchema } from '@/lib/zod'
import * as z from 'zod'

export const applyJob = async (
  jobId: string,
  userId: string,
  value: z.infer<typeof JobApplicationSchema>
) => {
  try {
    // Validasi input
    if (!jobId || !userId) {
      return { error: 'Parameter yang dibutuhkan hilang' }
    }

    // Validasi data form
    const validatedFields = JobApplicationSchema.safeParse(value)
    if (!validatedFields.success) {
      const errorMessages = validatedFields.error.issues
        .map((issue) => issue.message)
        .join(', ')
      return { error: errorMessages }
    }

    const { data } = validatedFields
    const { notes } = data

    // Cek apakah lowongan ada
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    })

    if (!job) {
      return { error: 'Lowongan tidak ditemukan' }
    }

    // Cek apakah pencari kerja ada
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return { error: 'Pencari kerja tidak ditemukan' }
    }

    const member = await prisma.member.findUnique({
      where: { userId: user.id },
    })

    // Cek apakah aplikasi sudah ada
    const existingApplication = await prisma.jobApplication.findFirst({
      where: {
        jobId,
        memberId: member?.id,
      },
    })

    if (existingApplication) {
      return { error: 'Anda sudah melamar untuk lowongan ini' }
    }

    // Buat aplikasi lowongan
    await prisma.jobApplication.create({
      data: {
        jobId,
        memberId: member?.id ?? '',
        notes: notes || 'seleksi berkas',
        resumeMember: "null",
      },
    })

    return {
      success: 'Aplikasi lowongan berhasil diajukan!',
    }
  } catch {
    return {
      error:
        'Terjadi kesalahan saat mengajukan aplikasi lowongan. Silakan coba lagi nanti.',
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
                    company: {
                      include: {
                        logo: true, // ✅ logo perusahaan
                      },
                    },
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
        error: 'Bidang tidak valid!',
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
      interests,
      studyLevel,
      major,
    } = validatedFields.data

    await prisma.user.update({
      where: { id },
      data: { username, fullname },
    })

    await prisma.member.update({
      where: { id: idMember },
      data: {
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
        interests,
        studyLevel: studyLevel || '',
        major: major || '',
      },
    })
    return {
      success: 'Pencari kerja berhasil diperbarui!',
    }
  } catch {
    return {
      error: 'Terjadi kesalahan saat memperbarui pencari kerja. Silakan coba lagi.',
    }
  }
}

export const updateCvMember = async (id: string, cv: File) => {
  try {
    if (!cv) {
      return { error: 'File CV diperlukan' };
    }

    // Menyimpan file dan mendapatkan URL file
    const cvFile = await saveFile('member-cvs', cv);
    if (!cvFile) {
      return { error: 'File CV tidak valid atau tidak bisa disimpan' };
    }

    // Memperbarui kolom `cv` di tabel `member` berdasarkan userId = id
    await prisma.member.update({
      where: { userId: id }, // Pastikan `userId` adalah field yang benar
      data: { cv: cvFile.src }, // Menyimpan URL file di kolom `cv`
    });

    return { success: 'CV berhasil diperbarui!' };
  } catch (err) {
    console.error('Terjadi kesalahan saat memperbarui CV:', err);
    return {
      error: 'Terjadi kesalahan tak terduga saat memperbarui CV profil.',
    };
  }
};

export const updateImageMember = async (
  id: string,
  idFile: string,
  image: File
) => {
  try {
    if (!image) {
      return { error: 'File gambar diperlukan' }
    }

    const imageFile = await saveFile('member-images', image)
    if (!imageFile) {
      return { error: 'File gambar tidak valid atau tidak bisa disimpan' }
    }

    // Mengecek apakah gambar yang sudah ada ada
    const existingImage = await prisma.file.findUnique({
      where: { id: idFile },
    })

    // Menghapus gambar yang sudah ada jika ada
    if (existingImage) {
      await prisma.file.delete({
        where: { id: idFile },
      })
    }

    // Memperbarui referensi gambar pengguna di database
    await prisma.user.update({
      where: { id },
      data: {
        imageId: imageFile.id,
      },
    })

    return { success: 'Gambar profil berhasil diperbarui!' }
  } catch (err) {
    console.error('Terjadi kesalahan saat memperbarui gambar:', err)
    return {
      error: 'Terjadi kesalahan tak terduga saat memperbarui gambar profil.',
    }
  }
}

export const addExperienceMember = async (
  memberId: string,
  value: z.infer<typeof experienceSchema>
) => {
  try {
    const validated = experienceSchema.safeParse(value)
    if (!validated.success) {
      return { error: validated.error.errors.map((e) => e.message).join(', ') }
    }
    const {
      position, company, startDate, endDate, isCurrentJob, description,
    } = validated.data
    await prisma.experience.create({
      data: {
        memberId,
        position,
        company,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        isCurrentJob: isCurrentJob || false,
        description,
      },
    })
    return { success: 'Pengalaman berhasil ditambahkan!' }
  } catch (err) {
    return { error: 'Gagal menambah pengalaman kerja. Silakan coba lagi.' }
  }
}

export const updateExperienceMember = async (
  id: string,
  value: z.infer<typeof experienceSchema>
) => {
  try {
    const validated = experienceSchema.safeParse(value)
    if (!validated.success) {
      return { error: validated.error.errors.map((e) => e.message).join(', ') }
    }
    const {
      position, company, startDate, endDate, isCurrentJob, description,
    } = validated.data
    await prisma.experience.update({
      where: { id },
      data: {
        position,
        company,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        isCurrentJob: isCurrentJob || false,
        description,
      },
    })
    return { success: 'Pengalaman berhasil diubah!' }
  } catch (err) {
    return { error: 'Gagal mengubah pengalaman kerja. Silakan coba lagi.' }
  }
}

export const deleteExperienceMember = async (id: string) => {
  try {
    await prisma.experience.delete({ where: { id } })
    return { success: 'Pengalaman berhasil dihapus!' }
  } catch (err) {
    return { error: 'Gagal menghapus pengalaman kerja. Silakan coba lagi.' }
  }
}

export async function markNotesAsRead(jobAppId: string) {
  try {
    const updated = await prisma.jobApplication.update({
      where: { id: jobAppId },
      data: { notesReadAt: new Date() },
    })
    console.log('notesReadAt after update:', updated.notesReadAt); // Tambahkan ini!
    return { success: true, notesReadAt: updated.notesReadAt }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

// actions/member-action.ts
export const getUnreadFeedbacks = async (userId: string) => {
  // Ambil detail user lengkap + jobApplication
  const user = await getDetailUserMemberFull(userId);
  if (!user?.member?.jobApplication) return [];
  // Filter feedback yang belum dibaca
  return user.member.jobApplication.filter((ja: any) =>
    ja.notes && (!ja.notesReadAt || new Date(ja.notesUpdatedAt) > new Date(ja.notesReadAt))
  );
};


