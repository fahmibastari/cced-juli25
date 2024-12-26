import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

interface CardNewsBigProps {
  href: string
  srcImage?: string
  Title: string
  description: string
  publishedAt?: string
}

const CardNewsBig = ({
  href,
  srcImage = '/default-thumbnail.jpg',
  Title,
  description,
  publishedAt,
}: CardNewsBigProps) => {
  return (
    <Link href={href} className='block'>
      <Card className='mb-6 hover:shadow-lg transition-shadow'>
        <CardContent className='p-6'>
          <div className='relative mb-4 h-64 w-full'>
            <Image
              src={srcImage}
              alt={`Thumbnail untuk berita: ${Title}`}
              fill
              className='rounded-md object-cover'
              priority
            />
          </div>
          <CardTitle className='mb-2 text-2xl font-semibold'>{Title}</CardTitle>
          {publishedAt && (
            <p className='text-sm text-gray-500'>{publishedAt}</p>
          )}
          <p className='mb-4 text-gray-700'>{description}</p>
          <Button
            variant='link'
            className='h-auto p-0 font-normal text-blue-500'
          >
            Baca selengkapnya...
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}

export default CardNewsBig
