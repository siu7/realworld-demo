import { Link } from 'wouter'
import { Article } from 'api/api'
import { ArticleMeta } from 'components/ArticleMeta'
import { FavoriteButton } from 'components/FavoriteButton'

export function ArticlesList({ articles }: { articles: Article[] }) {
  return (
    <div>
      {articles.map(
        ({
          title,
          slug,
          createdAt,
          description,
          favorited,
          favoritesCount,
          tagList,
          author,
        }) => (
          <div key={slug}>
            <div>
              <div>
                <ArticleMeta author={author} createdAt={createdAt} />
                <FavoriteButton
                  favorited={favorited}
                  slug={slug}
                  favoritesCount={favoritesCount}
                  isCompact={true}
                />
              </div>
            </div>
            <div>
              <h2>
                <Link href={`/article/${slug}`}>{title}</Link>
              </h2>
              <p>
                <Link href={`/article/${slug}`}>{description}</Link>
              </p>
            </div>
            <div>
              <Link href={`/article/${slug}`}>readmore</Link>
              {tagList}
            </div>
          </div>
        )
      )}
    </div>
  )
}
