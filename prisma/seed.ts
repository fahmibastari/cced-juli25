import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  // Seed News
  const newsData = Array.from({ length: 10 }).map(() => ({
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(3),
    thumbnail: faker.image.url(),
    slug: faker.helpers.slugify(faker.lorem.words(3).toLowerCase()),
    isPublished: faker.datatype.boolean(),
    publishedAt: faker.datatype.boolean() ? new Date() : null
  }))

  await prisma.news.createMany({
    data: newsData
  })

  // Seed Articles
  const articleData = Array.from({ length: 10 }).map(() => ({
    authorId: faker.string.uuid(),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(4),
    thumbnail: faker.image.url(),
    slug: faker.helpers.slugify(faker.lorem.words(3).toLowerCase()),
    tags: JSON.stringify([
      faker.word.noun(),
      faker.word.noun(),
      faker.word.noun()
    ]),
    category: faker.word.noun(),
    isPublished: faker.datatype.boolean(),
    publishedAt: faker.datatype.boolean() ? new Date() : null
  }))

  await prisma.article.createMany({
    data: articleData
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })