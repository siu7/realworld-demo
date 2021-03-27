import { Link, useLocation } from 'wouter'
import type { Article } from 'api/api'
import { useAppDispatch } from 'app/hooks'
import { ArticleMeta } from 'components/ArticleMeta'
import { FollowButton } from 'components/FollowButton'
import { FavoriteButton } from 'components/FavoriteButton'
import styles from './ArticleRow.module.css'
import { deleteOne } from 'features/articles/slice'

export function ArticleRow({
  article,
  selfArticle,
  following,
}: {
  article: Article
  selfArticle: boolean
  following: boolean
}) {
  const { author, createdAt, favoritesCount, favorited, slug } = article

  return (
    <div className={styles.row}>
      <ArticleMeta author={author} createdAt={createdAt} />
      {selfArticle ? (
        <>
          <EditArticleButton slug={article.slug} />
          <DeleteArticleButton slug={article.slug} username={author.username} />
        </>
      ) : (
        <>
          <FollowButton following={following} username={author.username} />
          <FavoriteButton
            favorited={favorited}
            slug={slug}
            favoritesCount={favoritesCount}
            isCompact={false}
          />
        </>
      )}
    </div>
  )
}

function EditArticleButton({ slug }: { slug: string }) {
  return (
    <Link to={`/editor/${slug}`}>
      <button className={styles.editArticleButton}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
        Edit Article
      </button>
    </Link>
  )
}

function DeleteArticleButton({
  slug,
  username,
}: {
  slug: string
  username: string
}) {
  const dispatch = useAppDispatch()
  const [, setLocation] = useLocation()
  async function handleDeleteClick() {
    await dispatch(deleteOne(slug))
    setLocation(`/${username}`)
  }
  return (
    <button className={styles.deleteArticleButton} onClick={handleDeleteClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
      Delete Article
    </button>
  )
}
