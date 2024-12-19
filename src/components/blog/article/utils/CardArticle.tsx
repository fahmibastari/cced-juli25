import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

interface CardArticleProps {
  href: string
  title: string
  content: string
  thumbnail: string | null
  publishedAt: Date | null
}

const CardArticle = ({
  href,
  title,
  content,
  thumbnail,
  publishedAt,
}: CardArticleProps) => {
  return (
    <Link href={href}>
      <Card className='mx-auto w-full max-w-7xl text-[#025908] shadow-xl'>
        <div className='relative h-64 w-full md:h-96'>
          <Image
            src={thumbnail || '/default-thumbnail.jpg'}
            alt='Gambar Artikel'
            fill
            className='rounded-t-lg object-cover'
            priority
          />
        </div>

        <CardHeader>
          <CardTitle className='text-2xl font-bold md:text-3xl'>
            {title}
          </CardTitle>
          <p className='text-sm text-muted-foreground'>
            Dibuat pada {publishedAt?.toLocaleDateString()}
          </p>
        </CardHeader>

        <CardContent className='space-y-4'>
          <div className='prose prose-gray dark:prose-invert'>
            <p>{content}</p>
          </div>

          <div className='space-y-2'>
            <h3 className='font-medium'>Tags:</h3>
            <div className='flex flex-wrap gap-2'>
              <Badge variant='secondary'>Inspirasi</Badge>
              <Badge variant='secondary'>Keseimbangan</Badge>
              <Badge variant='secondary'>Motivasi</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default CardArticle
