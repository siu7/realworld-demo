import { Link } from 'wouter'
import { useAppSelector, useAppDispatch } from 'app/hooks'
import { ArticleMeta } from 'components/ArticleMeta'
import { FavoriteButton } from 'components/FavoriteButton'
import styles from './ArticlesList.module.css'
import { setOffset } from 'features/articles/slice'

export function ArticlesList() {
  const { articles, offset, limit, articlesCount } = useAppSelector(
    (state) => state.articles.data
  )
  const { loading } = useAppSelector((state) => state.articles.getMany)
  return (
    <div>
      {loading ? (
        <label>loading...</label>
      ) : articlesCount === 0 ? (
        <p className={styles.listItem}>No articles are here... yet. </p>
      ) : (
        articles.map(
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
            <div key={slug} className={styles.listItem}>
              <div>
                <div className={styles.meta}>
                  <ArticleMeta author={author} createdAt={createdAt} />
                  <FavoriteButton
                    favorited={favorited}
                    slug={slug}
                    favoritesCount={favoritesCount}
                    isCompact={true}
                  />
                </div>
              </div>
              <Link href={`/article/${slug}`} className={styles.content}>
                <h2>{title}</h2>
                <p>{description}</p>
              </Link>
              <div className={styles.bottom}>
                <Link href={`/article/${slug}`}>Read more...</Link>
                <ArticleTags tags={tagList} slug={slug} />
              </div>
            </div>
          )
        )
      )}

      {typeof articlesCount === 'number' && articlesCount > limit && (
        <Pagination limit={limit} count={articlesCount} offset={offset} />
      )}
    </div>
  )
}

function Pagination({
  limit,
  count,
  offset,
}: {
  limit: number
  count: number
  offset: number
}) {
  const totalPages = Math.ceil(count / limit)
  const pages = Array.from(Array(totalPages).keys())
  const dispatch = useAppDispatch()
  function handlePageClick(index: number) {
    dispatch(setOffset(index))
  }

  return (
    <ul className={styles.pagination}>
      {pages.map((index) => (
        <li key={`page${index}`}>
          <Link
            href=""
            className={offset === index ? styles.active : undefined}
            onClick={() => handlePageClick(index)}
          >
            {index + 1}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export const ArticleTags = ({
  tags,
  slug,
}: {
  tags: string[]
  slug: string
}) => (
  <div className={styles.tags}>
    {tags.map((tag) => (
      <span key={`${slug}: ${tag}`}>{tag}</span>
    ))}
  </div>
)
