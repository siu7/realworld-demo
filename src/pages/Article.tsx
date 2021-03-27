import { useEffect } from 'react'
import { Link, useRoute } from 'wouter'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { ArticleRow } from 'components/ArticleRow'
import { getOne } from 'features/articles/slice'
import {
  getMany,
  createOne,
  deleteOne,
  deleteComment,
} from 'features/comments/slice'
import styles from './Article.module.css'
import { formatDate } from 'utils/formatDate'
import type { Comment, CreateCommentBody } from 'api/api'
import { Avatar } from 'components/Avatar'
import { ArticleTags } from 'components/ArticlesList'
import { useForm } from 'utils/useForm'

export default function Article() {
  const dispatch = useAppDispatch()
  const { article } = useAppSelector((state) => state.articles.data)
  const { comments } = useAppSelector((state) => state.comments.data)
  const { profile } = useAppSelector((state) => state.profile.data)
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
  const selfArticle = user?.username === article?.author.username
  return (
    <>
      {!loading && article && (
        <>
          <div className={styles.wrapper}>
            <div className={`${styles.banner} container`}>
              <h1>{article.title}</h1>
              <ArticleRow
                article={article}
                selfArticle={selfArticle}
                following={profile.following}
              />
            </div>
          </div>
          <div className={`container ${styles.content}`}>
            <article>{article.body}</article>
            <ArticleTags tags={article.tagList} slug={article.slug} />
          </div>
          <div className={`${styles.comments} container mx-700`}>
            {article && (
              <ArticleRow
                article={article}
                selfArticle={selfArticle}
                following={profile.following}
              />
            )}
            {user ? (
              <PostCommentForm
                username={user.username}
                imageUrl={user.image || ''}
                slug={article.slug}
              />
            ) : (
              <UnAuthSpan />
            )}
            {comments && (
              <CommentsList comments={comments} slug={article.slug} />
            )}
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

function PostCommentForm({
  username,
  imageUrl,
  slug,
}: {
  username: string
  imageUrl: string
  slug: string
}) {
  const dispatch = useAppDispatch()
  const { formData, handleTextAreaChange, handleSubmit, resetForm } = useForm<
    CreateCommentBody['comment']
  >(
    {
      body: '',
    },
    () => handleFormSubmit()
  )
  async function handleFormSubmit() {
    await dispatch(
      createOne({
        slug,
        body: {
          comment: formData,
        },
      })
    )
    resetForm()
  }

  const { body } = formData
  return (
    <div className={styles.commentForm}>
      <form onSubmit={handleSubmit}>
        <textarea
          name="body"
          value={body}
          onChange={handleTextAreaChange}
          placeholder="Write your comment..."
        />
        <div className={styles.commentFormMeta}>
          <Avatar username={username} imageUrl={imageUrl} variant="small" />
          <button
            type="submit"
            className={`primary-btn ${styles.submitButton}`}
          >
            Post Comment
          </button>
        </div>
      </form>
    </div>
  )
}

function CommentsList({
  comments,
  slug,
}: {
  comments: Comment[]
  slug: string
}) {
  const dispatch = useAppDispatch()
  async function handleDeleteClick(slug: string, id: number) {
    await dispatch(deleteOne({ slug, id }))
    dispatch(deleteComment(id))
  }
  return (
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
            <button
              className={styles.iconButton}
              onClick={() => handleDeleteClick(slug, comment.id)}
            >
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
              </svg>{' '}
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
