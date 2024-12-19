import CardArticle from './utils/CardArticle'
import { news } from '@/data/dummyNews'

const Article = () => {
  return (
    <main className='container mx-auto mt-10 flex flex-col gap-10 px-4 py-6'>
      {news.map((data, index) => (
        <CardArticle
          href='#'
          key={index}
          title={data.title}
          content={data.content}
          thumbnail={data.thumbnail}
          publishedAt={data.publishedAt}
        />
      ))}
    </main>
  )
}

export default Article
