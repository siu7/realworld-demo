import { useEffect } from 'react'
import { Link, useRoute } from 'wouter'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { ArticleRow } from 'components/ArticleRow'
import { getOne } from 'features/articles/slice'
import { getMany } from 'features/comments/slice'
import styles from './Article.module.css'
import { formatDate } from 'utils/formatDate'

export default function Article() {
  const dispatch = useAppDispatch()
  const { article } = useAppSelector((state) => state.articles.data)
  const { comments } = useAppSelector((state) => state.comments.data)
  const [match, params] = useRoute('/article/:slug')
  useEffect(() => {
    if (match && params?.slug) {
      dispatch(getOne(params.slug))
      dispatch(getMany(params.slug))
    }
  }, [match, params?.slug, dispatch])

  const { user } = useAppSelector((state) => state.user.data)
  return (
    <>
      {article && (
        <>
          <div className={styles.wrapper}>
            <div className={`${styles.banner} container`}>
              <h1>{article.title}</h1>
              <ArticleRow article={article} />
            </div>
          </div>
          <div className={`container ${styles.content}`}>
            <article>{article.body}</article>
            <div className={styles.tags}>
              {article.tagList.map((tag) => (
                <span key={`${article.slug}: ${tag}`}>{tag}</span>
              ))}
            </div>
          </div>
        </>
      )}
      <div className={styles.comments}>
        {article && <ArticleRow article={article} />}
        {user ? (
          <div className={styles.comment}>
            <div className={styles.commentBody}>
              <input />
            </div>
            <div className={styles.commentMeta}>
              <img
                src={user.image || ''}
                className={styles.commentAvatar}
                alt=""
              />
              <button className={styles.submit}>Post Comment</button>
            </div>
          </div>
        ) : (
          <span>
            <Link href="/login">login</Link>
            {' or '}
            <Link href="/signup">sign up</Link> to add comments on this article.
          </span>
        )}
        {comments &&
          comments.map((comment) => (
            <div className={styles.comment} key={comment.id}>
              <div className={styles.commentBody}>{comment.body}</div>
              <div className={styles.commentMeta}>
                <img
                  src={comment.author.image || ''}
                  className={styles.commentAvatar}
                  alt=""
                />
                <Link href={`/profile/${comment.author.username}`}>
                  {comment.author.username}
                </Link>
                <span>{formatDate(comment.createdAt)}</span>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}
