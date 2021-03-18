import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { ArticlesList } from 'components/ArticlesList'
import { getMany } from 'features/articles/slice'
import { getMany as getTags } from 'features/tags/slice'

export default function Home() {
  //const dispatch = useAppDispatch()
  //const { articles, getArticlesFilter, offset, limit } = useAppSelector(
  //(state) => state.articles.data
  //)
  //const { tags } = useAppSelector((state) => state.tags.data)

  //useEffect(() => {
  //if (articles.length === 0)
  //dispatch(getMany({ ...getArticlesFilter, offset, limit }))
  //}, [dispatch, articles, getArticlesFilter, offset, limit])

  //useEffect(() => {
  //if (tags.length === 0) dispatch(getTags())
  //}, [dispatch, tags])

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
      image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
      following: false,
    },
    favorited: false,
    favoritesCount: 0,
  }
  return (
    <div>
      <label>Home</label>
      <ArticlesList articles={[article]} />
    </div>
  )
}
