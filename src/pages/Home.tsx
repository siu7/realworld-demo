import { useGetArticles } from 'features/articles/hooks'
import { useGetTags } from 'features/tags/hooks'
import ArticlesList from 'components/ArticlesList'

export default function Home() {
  //const { articles, loading: articlesLoading } = useGetArticles()
  //const { tags, loading: tagsLoading } = useGetTags()

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
