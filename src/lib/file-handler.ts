import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import fs from 'node:fs/promises'
import path from 'path'

async function ensureFolderExists(folder: string) {
  const storagePath = path.join(process.cwd(), 'storage', folder)
  try {
    await fs.access(storagePath) // Periksa apakah folder ada
  } catch {
    await fs.mkdir(storagePath, { recursive: true }) // Buat folder jika belum ada
  }
}

export async function saveFile(folder: string, file: File) {
  await ensureFolderExists(folder)

  const storagePath = path.join(process.cwd(), 'storage', folder)
  const hash = await bcrypt.hash(
    `${file.name}_${Date.now()}_${Math.random()}`,
    10
  )
  const fileType = file.type?.split('/')[1]
  if (!fileType) {
    throw new Error('Invalid file type')
  }
  const fileName = hash.replace(/\//g, '_')
  const newFilePath = path.join(storagePath, `${fileName}.${fileType}`)

  const arrayBuffer = await file.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)

  await fs.writeFile(newFilePath, buffer)

  return await prisma.file.create({
    data: {
      name: file.name,
      type: file.type,
      size: file.size,
      path: newFilePath,
    },
  })
}

export const updateFile = async (id: string, file: File) => {
  const fileToUpdate = await prisma.file.findUnique({ where: { id } })
  if (!fileToUpdate) {
    throw new Error('File not found')
  }

  const storagePath = path.dirname(fileToUpdate.path)
  await ensureFolderExists(path.basename(storagePath))

  const hash = await bcrypt.hash(
    `${file.name}_${Date.now()}_${Math.random()}`,
    10
  )
  const fileType = file.type?.split('/')[1]
  if (!fileType) {
    throw new Error('Invalid file type')
  }
  const fileName = hash.replace(/\//g, '_')
  const newFilePath = path.join(storagePath, `${fileName}.${fileType}`)

  const arrayBuffer = await file.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)

  await fs.writeFile(newFilePath, buffer)

  return await prisma.file.update({
    where: { id },
    data: {
      name: file.name,
      type: file.type,
      size: file.size,
      path: newFilePath,
    },
  })
}

export const deleteFile = async (id: string) => {
  const fileToDelete = await prisma.file.findUnique({ where: { id } })
  if (!fileToDelete) {
    throw new Error('File not found')
  }

  try {
    await fs.access(fileToDelete.path)
    await fs.unlink(fileToDelete.path)
  } catch {
    console.warn(`File already deleted or not found: ${fileToDelete.path}`)
  }

  await prisma.file.delete({ where: { id } })
}
