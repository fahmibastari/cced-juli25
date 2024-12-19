import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

interface CardNewsSmallProps {
  href: string
  srcImage?: string // Opsional dengan default value
  title: string
  description: string
  publishedAt?: Date // Opsional dengan default value
}

const CardNewsSmall = ({
  href,
  srcImage = '/default-thumbnail.jpg',
  title,
  description,
  publishedAt = new Date(),
}: CardNewsSmallProps) => {
  return (
    <Link href={href} className='block'>
      <Card className='hover:shadow-md transition-shadow'>
        <CardHeader className='p-4'>
          <div className='relative h-40 w-full'>
            <Image
              src={srcImage}
              alt={`Thumbnail berita: ${title}`}
              fill
              className='rounded-md object-cover'
              priority
            />
          </div>
        </CardHeader>
        <CardContent className='p-4 pt-2'>
          <CardTitle className='mb-2 text-lg font-semibold'>{title}</CardTitle>
          {publishedAt && (
            <p className='text-sm text-gray-500 mb-2'>
              {publishedAt.toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}
          <p className='mb-4 text-gray-600'>{description}</p>
        </CardContent>
        <CardFooter className='p-4 pt-0'>
          <Button
            variant='link'
            className='h-auto p-0 font-normal text-blue-500'
          >
            Baca selengkapnya
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default CardNewsSmall
