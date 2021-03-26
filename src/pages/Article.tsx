import { useEffect } from 'react'
import { Link, useRoute } from 'wouter'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { ArticleRow } from 'components/ArticleRow'
import { getOne } from 'features/articles/slice'
import { getMany } from 'features/comments/slice'
import styles from './Article.module.css'
import { formatDate } from 'utils/formatDate'
import type { Comment } from 'api/api'
import { Avatar } from 'components/Avatar'

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
  const { loading: getArticleLoading } = useAppSelector(
    (state) => state.articles.getOne
  )
  const { loading: getCommentsLoading } = useAppSelector(
    (state) => state.comments.getMany
  )
  const loading = getArticleLoading || getCommentsLoading
  return (
    <>
      {!loading && article && (
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
          <div className={`${styles.comments} container mx-700`}>
            {article && <ArticleRow article={article} />}
            {user ? <PostCommentForm avatar={user.image} /> : <UnAuthSpan />}
            {comments && <CommentsList comments={comments} />}
          </div>
        </>
      )}
    </>
  )
}

const UnAuthSpan = () => (
  <span>
    <Link href="/login">login</Link>
    {' or '}
    <Link href="/signup">sign up</Link> to add comments on this article.
  </span>
)

const PostCommentForm = ({ avatar }: { avatar: string | null }) => {
  return (
    <div className={styles.commentForm}>
      <textarea />
      <div className={styles.commentFormMeta}>
        <img src={avatar || ''} className={styles.commentAvatar} alt="" />
        <button className={`primary-btn ${styles.submitButton}`}>
          Post Comment
        </button>
      </div>
    </div>
  )
}

const CommentsList = ({ comments }: { comments: Comment[] }) => (
  <>
    {comments.map((comment) => (
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
  </>
)
