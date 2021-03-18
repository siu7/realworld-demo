import type { Article } from 'api/api'
import { ArticleMeta } from 'components/ArticleMeta'

export function ArticleRow({ article }: { article: Article }) {
  const { title, author, createdAt, favoritesCount, favorited } = article
  return (
    <div>
      <h1>{title}</h1>
      <div>
        <ArticleMeta author={author} createdAt={createdAt} />
        <button>Follow {author.username}</button>
        <button>Favorite Article ({favoritesCount})</button>
      </div>
    </div>
  )
}
