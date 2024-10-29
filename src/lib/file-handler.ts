import db from '@/lib/db'
import bcrypt from 'bcryptjs'
import fs from 'node:fs/promises'
import path from 'path'

async function ensureFolderExists(folder: string) {
  const storagePath = path.join(process.cwd(), 'storage', folder)
  try {
    await fs.mkdir(storagePath, { recursive: true })
  } catch (error) {
    console.error(`Error creating folder: ${error}`)
    throw new Error('Failed to ensure folder exists')
  }
}

export async function saveFile(folder: string, file: File) {
  await ensureFolderExists(folder)

  const storagePath = path.join(process.cwd(), 'storage', folder)

  const hash = await bcrypt.hash(file.name + Date.now(), 10)
  const fileName = hash.replace(/\//g, '_')
  const newFilePath = path.join(
    storagePath,
    `${fileName}.${file.type.split('/')[1]}`,
  )

  const arrayBuffer = await file.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)

  await fs.writeFile(newFilePath, buffer)

  return await db.file.create({
    data: {
      name: file.name,
      type: file.type,
      size: file.size,
      path: newFilePath,
    },
  })
}

export const updateFile = async (id: string, file: File) => {
  const fileToUpdate = await db.file.findUnique({ where: { id } })
  if (!fileToUpdate) {
    throw new Error('File not found')
  }

  const storagePath = path.dirname(fileToUpdate.path)
  await ensureFolderExists(path.basename(storagePath))

  const hash = await bcrypt.hash(file.name + Date.now(), 10)
  const fileName = hash.replace(/\//g, '_')
  const newFilePath = path.join(
    storagePath,
    `${fileName}.${file.type.split('/')[1]}`,
  )

  const arrayBuffer = await file.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)

  await fs.writeFile(newFilePath, buffer)

  return await db.file.update({
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
  const fileToDelete = await db.file.findUnique({ where: { id } })
  if (!fileToDelete) {
    throw new Error('File not found')
  }

  await fs.unlink(fileToDelete.path)
  await db.file.delete({ where: { id } })
}
