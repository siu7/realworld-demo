import type { Article } from 'api/api'
import { ArticleMeta } from 'components/ArticleMeta'
import { FollowButton } from 'components/FollowButton'
import { FavoriteButton } from 'components/FavoriteButton'

export function ArticleRow({ article }: { article: Article }) {
  const { author, createdAt, favoritesCount, favorited, slug } = article

  return (
    <div>
      <ArticleMeta author={author} createdAt={createdAt} />
      <FollowButton following={author.following} username={author.username} />
      <FavoriteButton
        favorited={favorited}
        slug={slug}
        favoritesCount={favoritesCount}
        isCompact={false}
      />
    </div>
  )
}
