import { useEffect } from 'react'
import { Link, useRoute } from 'wouter'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { ArticleRow } from 'components/ArticleRow'
import { isAuthedSelector } from 'features/user/selectors'
import { getOne } from 'features/articles/slice'
import { getMany } from 'features/comments/slice'
import styles from './Article.module.css'
import { formatDate } from 'utils/formatDate'

export default function Article() {
  //const dispatch = useAppDispatch()
  //const { article } = useAppSelector((state) => state.articles.data)
  //const { comments } = useAppSelector((state) => state.comments.data)
  //const [match, params] = useRoute('/article/:slug')
  //useEffect(() => {
  //if (match && params?.slug) {
  //dispatch(getOne(params.slug))
  //dispatch(getMany(params.slug))
  //}
  //}, [match, params?.slug, dispatch])

  const isAuthed = useAppSelector(isAuthedSelector)
  const article = {
    title: 'Minima omnis reprehe',
    slug: 'minima-omnis-reprehe-7mgcmp',
    body: 'Pariatur Eos optio',
    createdAt: '2021-03-16T20:38:12.218Z',
    updatedAt: '2021-03-16T20:38:12.218Z',
    tagList: [],
    description: 'Et facilis ex volupt',
    author: {
      username: 'ivan_ivan',
      bio: null,
      image: '',
      following: false,
    },
    favorited: false,
    favoritesCount: 1,
  }
  const comments = [
    {
      id: 89416,
      createdAt: '2021-03-16T20:38:22.467Z',
      updatedAt: '2021-03-16T20:38:22.467Z',
      body: 'Est totam tempora qu',
      author: {
        username: 'ivan_ivan',
        bio: null,
        image: '',
        following: false,
      },
    },
    {
      id: 89416,
      createdAt: '2021-03-16T20:38:22.467Z',
      updatedAt: '2021-03-16T20:38:22.467Z',
      body: 'Est totam tempora qu',
      author: {
        username: 'ivan_ivan',
        bio: null,
        image: '',
        following: false,
      },
    },
  ]
  const { slug, tagList } = article
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
              {tagList.map((tag) => (
                <span key={`${slug}: ${tag}`}>{tag}</span>
              ))}
            </div>
          </div>
        </>
      )}
      <div className={styles.comments}>
        <ArticleRow article={article} />
        {isAuthed ? (
          <input />
        ) : (
          <span>
            <Link href="/login">login</Link>
            {' or '}
            <Link href="/signup">sign up</Link> to add comments on this article.
          </span>
        )}
        {comments &&
          comments.map((comment) => (
            <div className={styles.comment}>
              <div className={styles.commentBody}>{comment.body}</div>
              <div className={styles.commentMeta}>
                <img
                  src={comment.author.bio || ''}
                  className={styles.commentAvatar}
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
