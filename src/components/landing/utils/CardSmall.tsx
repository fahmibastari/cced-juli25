import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface CardSmallProps {
  title: string
  description: string
  styleCard: string
  styleTitle: string
  styleDescription: string
}

const CardSmall = ({
  title,
  description,
  styleCard,
  styleTitle,
  styleDescription,
}: CardSmallProps) => {
  return (
    <div>
      <Card className={styleCard}>
        <CardHeader className={styleTitle}>{title}</CardHeader>
        <CardContent className={styleDescription}>{description}</CardContent>
      </Card>
    </div>
  )
}
export default CardSmall
