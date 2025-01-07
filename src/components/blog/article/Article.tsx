import CardBig from '../utils/CardBig'
import CardSmall from '../utils/CardSmall'
import { type Article } from '@prisma/client'
import PaginationArticleArticle from '../utils/Pagination'
import { getArticles } from '@/data/data'

const ArticleContent = async () => {
  const articles = await getArticles()
  const featuredArticle = articles[0]

  return (
    <main className='container mx-auto my-8 p-4 flex-col space-y-14'>
      {/* Main Article Section */}
      <section>
        <h3 className='mb-4 text-2xl font-bold md:text-3xl text-[#025908]'>
          Article Terbaru
        </h3>
        {featuredArticle ? (
          <CardBig
            href='#'
            srcImage={featuredArticle.thumbnail}
            title={featuredArticle.title}
            description={featuredArticle.content.slice(0, 250)}
            createdAt={featuredArticle.createdAt ?? undefined}
          />
        ) : (
          <p>Loading Article terbaru...</p>
        )}
      </section>

      {/* Other Article Section */}
      <section>
        <h3 className='mb-4 text-xl font-bold md:text-2xl text-[#025908]'>
          Article Lainnya
        </h3>
        <div className='grid gap-4 md:grid-cols-3'>
          {articles.length > 0 ? (
            articles
              .slice(1)
              .map((data: Article) => (
                <CardSmall
                  href='#'
                  key={data.id}
                  srcImage={data.thumbnail}
                  title={data.title}
                  description={data.content.slice(0, 100)}
                  createdAt={data.createdAt ?? undefined}
                />
              ))
          ) : (
            <p>Loading Article lainnya...</p>
          )}
        </div>
      </section>
      <PaginationArticleArticle />
    </main>
  )
}

export default ArticleContent
