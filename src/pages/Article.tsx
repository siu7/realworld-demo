import { useEffect } from 'react'
import { Link, useRoute } from 'wouter'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { ArticleRow } from 'components/ArticleRow'
import { useIsAuthed } from 'features/user/hooks'
import { getOne } from 'features/articles/slice'
import { getMany } from 'features/comments/slice'

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
  }, [match, params?.username, dispatch])

  const { isAuthed } = useIsAuthed()
  //const article = {
  //title: 'Minima omnis reprehe',
  //slug: 'minima-omnis-reprehe-7mgcmp',
  //body: 'Pariatur Eos optio',
  //createdAt: '2021-03-16T20:38:12.218Z',
  //updatedAt: '2021-03-16T20:38:12.218Z',
  //tagList: [],
  //description: 'Et facilis ex volupt',
  //author: {
  //username: 'ivan_ivan',
  //bio: null,
  //image: '',
  //following: false,
  //},
  //favorited: false,
  //favoritesCount: 1,
  //}
  //const comments = [
  //{
  //id: 89416,
  //createdAt: '2021-03-16T20:38:22.467Z',
  //updatedAt: '2021-03-16T20:38:22.467Z',
  //body: 'Est totam tempora qu',
  //author: {
  //username: 'ivan_ivan',
  //bio: null,
  //image: '',
  //following: false,
  //},
  //},
  //]
  return (
    <>
      {article && (
        <>
          <h1>{article.title}</h1>
          <ArticleRow article={article} />
          <p>{article.body}</p>
          <ArticleRow article={article} />
        </>
      )}
      {isAuthed ? (
        <input />
      ) : (
        <span>
          <Link href="/login">login</Link>
          {' or '}
          <Link href="/signup">sign up</Link> to add comments on this article.
        </span>
      )}
      {comments && <div>{JSON.stringify(comments)}</div>}
    </>
  )
}
