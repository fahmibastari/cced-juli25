import { getUserTypeById } from '@/data/userRole'
import { NextRequest } from 'next/server'
export async function GET(req: NextRequest) {
    try {
        const user = await getUserTypeById(req.nextUrl.searchParams.get('id')!)
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
} catch {
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
        status: 500,
    })
}
}