import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'

interface CardWrapperProps {
  children: React.ReactNode
  headerLabel: string
  description: string
  switchButtonLabel: string
  switchButtonHref: string
  paragraphSwitchButton: string
}

export const CardWrapper = ({
  children,
  headerLabel,
  description,
  switchButtonLabel,
  switchButtonHref,
  paragraphSwitchButton,
}: CardWrapperProps) => {
  return (
    <Card className='w-full max-w-lg bg-white p-4 my-16'>
      <CardHeader className='space-y-1 flex flex-col gap-3 items-center mb-14 text-center'>
        <CardTitle className='mb-0 pb-0 text-2xl font-semibold text-gray-700'>
          {headerLabel}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className='flex justify-center'>
        <p className='mx-0 mt-0 pt-0 text-sm text-gray-600'>
          {paragraphSwitchButton}
        </p>
        <Link
          href={switchButtonHref}
          className={`${buttonVariants({ variant: 'link' })} mx-0 p-0 text-sm text-green-500 hover:text-green-600`}
        >
          {switchButtonLabel}
        </Link>
      </CardFooter>
    </Card>
  )
}
