import prisma from '@/lib/prisma'
import { NextRequest } from 'next/server'
export async function GET(req: NextRequest) {
  console.log(req)
  try {
    const articles = await prisma.article.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    })
    return new Response(JSON.stringify(articles), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
    })
  }
}