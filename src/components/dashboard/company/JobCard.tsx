import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'

interface JobCardProps {
  title: string
  location: string
  createdAt: string
  totalApplicants: number
  inReview: number
  inCommunication: number
  notSuitable: number
  handleEdit: () => void
  handleDelete: () => void
  handleDetail: () => void
}

const JobCard = ({
  title,
  location,
  createdAt,
  totalApplicants,
  inReview,
  inCommunication,
  notSuitable,
  handleEdit,
  handleDelete,
  handleDetail,
}: JobCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className='flex items-center justify-between'>
            <h3>{title}</h3>
            <Badge className='bg-green-500'>Aktif</Badge>
          </div>
        </CardTitle>
        <CardDescription className='flex flex-col pt-2'>
          <Label>{location}</Label>
          <Label className='text-sm text-gray-400'>
            Dibuat pada: {createdAt}
          </Label>
        </CardDescription>
      </CardHeader>
      <CardContent className='m-4 flex justify-between border border-gray-200 p-4'>
        <div className='flex flex-col px-4 text-center'>
          <Label className='text-3xl font-bold'>{totalApplicants}</Label>
          <Label className='text-sm font-medium'>Pelamar</Label>
        </div>
        <div className='flex flex-col px-4 text-center'>
          <Label className='text-3xl font-bold'>{inReview}</Label>
          <Label className='text-sm font-medium'>Seleksi Berkas</Label>
        </div>
        <div className='flex flex-col px-4 text-center'>
          <Label className='text-3xl font-bold'>{inCommunication}</Label>
          <Label className='text-sm font-medium'>Dalam Komunikasi</Label>
        </div>
        <div className='flex flex-col px-4 text-center'>
          <Label className='text-3xl font-bold'>{notSuitable}</Label>
          <Label className='text-sm font-medium'>Belum Sesuai</Label>
        </div>
      </CardContent>
      <hr className='h-0.5 w-full' />
      <CardFooter className='mt-3 flex justify-end gap-4'>
        <Button
          onClick={handleEdit}
          variant='secondary'
          className='w-24 bg-green-500 text-white hover:bg-green-400'
        >
          Edit
        </Button>
        <Button onClick={handleDelete} variant='destructive' className='w-24'>
          Hapus
        </Button>
        <Button
          onClick={handleDetail}
          variant='outline'
          className='w-24 bg-blue-400 text-white hover:bg-blue-300'
        >
          Detail
        </Button>
      </CardFooter>
    </Card>
  )
}

export default JobCard
